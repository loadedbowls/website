import { kv } from "@vercel/kv";
import { createClient } from "redis";
import { randomBytes } from "node:crypto";

const ORDER_LIST_KEY = "loaded-bowls:orders";
const ORDER_KEY_PREFIX = "loaded-bowls:order:";
const PENDING_ORDER_KEY_PREFIX = "loaded-bowls:pending-order:";
const ORDER_COUNTER_PREFIX = "loaded-bowls:counter:";
const CANCEL_TOKEN_KEY_PREFIX = "loaded-bowls:cancel-token:";
let redisClient;

async function getRedisClient() {
  if (!process.env.REDIS_URL) return null;

  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL
    });

    redisClient.on("error", (error) => {
      console.error("Redis error:", error);
    });
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

async function storeGet(key) {
  const redis = await getRedisClient();
  if (redis) return redis.get(key);
  return kv.get(key);
}

async function storeSet(key, value) {
  const redis = await getRedisClient();
  if (redis) return redis.set(key, JSON.stringify(value));
  return kv.set(key, value);
}

async function storeLPush(key, value) {
  const redis = await getRedisClient();
  if (redis) return redis.lPush(key, value);
  return kv.lpush(key, value);
}

async function storeLTrim(key, start, stop) {
  const redis = await getRedisClient();
  if (redis) return redis.lTrim(key, start, stop);
  return kv.ltrim(key, start, stop);
}

async function storeLRange(key, start, stop) {
  const redis = await getRedisClient();
  if (redis) return redis.lRange(key, start, stop);
  return kv.lrange(key, start, stop);
}

async function storeMGet(keys) {
  const redis = await getRedisClient();
  if (redis) return redis.mGet(keys);
  return kv.mget(...keys);
}

async function storeIncr(key) {
  const redis = await getRedisClient();
  if (redis) return redis.incr(key);
  return kv.incr(key);
}

function parseOrder(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parseScalar(value) {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function createCancelToken() {
  return randomBytes(24).toString("hex");
}

export function requireAdmin(req, res) {
  const expected = process.env.ADMIN_ORDERS_SECRET;
  const received = req.headers["x-admin-secret"] || req.query?.secret;

  if (!expected) {
    res.status(500).json({ error: "ADMIN_ORDERS_SECRET ontbreekt in Vercel." });
    return false;
  }

  if (received !== expected) {
    res.status(401).json({ error: "Geen toegang." });
    return false;
  }

  return true;
}

export async function saveOrder(payload) {
  const metadata = payload.order || {};
  const id = metadata.orderId || metadata.id || payload.paymentId;
  if (!id) return null;

  const key = `${ORDER_KEY_PREFIX}${id}`;
  const existing = parseOrder(await storeGet(key));
  if (existing) {
    if (existing.cancelToken) return existing;
    const cancelToken = createCancelToken();
    const updated = { ...existing, cancelToken };
    await storeSet(key, updated);
    await storeSet(`${CANCEL_TOKEN_KEY_PREFIX}${cancelToken}`, id);
    return updated;
  }

  const orderDate = new Date(payload.createdAt || payload.paidAt || Date.now());
  const year = orderDate.toLocaleDateString("nl-BE", {
    timeZone: "Europe/Brussels",
    year: "2-digit"
  });
  const source = String(metadata.source || "").toLowerCase();
  const prefix = source === "kassa" || source === "pos" ? "KLB" : "WLB";
  const sequence = await storeIncr(`${ORDER_COUNTER_PREFIX}${prefix}:${year}`);
  const displayOrderNumber = `${prefix}${year}${String(sequence).padStart(4, "0")}`;

  const record = {
    id,
    displayOrderNumber,
    paymentId: payload.paymentId,
    paidAt: payload.paidAt || null,
    createdAt: payload.createdAt || payload.paidAt || new Date().toISOString(),
    paymentStatus: payload.paymentStatus || "paid",
    paymentLabel: payload.paymentLabel || "Online betaald",
    status: "Nieuw",
    cancelToken: createCancelToken(),
    emailEvents: {},
    amount: payload.amount,
    order: metadata
  };

  await storeSet(key, record);
  await storeSet(`${CANCEL_TOKEN_KEY_PREFIX}${record.cancelToken}`, id);
  await storeLPush(ORDER_LIST_KEY, id);
  await storeLTrim(ORDER_LIST_KEY, 0, 4999);
  return record;
}

export async function getOrderByCancelToken(token) {
  if (!token || !/^[a-f0-9]{48}$/i.test(String(token))) return null;
  const id = parseScalar(await storeGet(`${CANCEL_TOKEN_KEY_PREFIX}${token}`));
  if (!id) return null;
  return getOrderById(String(id));
}

export async function cancelOrderByToken(token, reason) {
  const existing = await getOrderByCancelToken(token);
  if (!existing) return { outcome: "not-found", order: null };
  if (existing.status === "Geannuleerd") return { outcome: "already-cancelled", order: existing };
  if ((existing.status || "Nieuw") !== "Nieuw") return { outcome: "too-late", order: existing };

  const cleanReason = String(reason || "").trim().slice(0, 500);
  if (!cleanReason) return { outcome: "reason-required", order: existing };

  const order = await updateOrderStatus(existing.id, "Geannuleerd", {
    cancellationReason: cleanReason,
    cancelledBy: "Klant",
    cancelledAt: new Date().toISOString()
  });
  return { outcome: "cancelled", order };
}

export async function savePendingOrder(order) {
  const id = order?.orderId || order?.id;
  if (!id) return null;

  const pending = {
    ...order,
    orderId: id,
    savedAt: new Date().toISOString()
  };

  await storeSet(`${PENDING_ORDER_KEY_PREFIX}${id}`, pending);
  return pending;
}

export async function getPendingOrder(id) {
  if (!id) return null;
  return parseOrder(await storeGet(`${PENDING_ORDER_KEY_PREFIX}${id}`));
}

export async function savePaidOrder(payload) {
  return saveOrder({
    ...payload,
    paymentStatus: "paid",
    paymentLabel: "Online betaald"
  });
}

export async function listOrders(requestedLimit = 100) {
  const limit = Math.min(Math.max(Number(requestedLimit) || 100, 1), 5000);
  const ids = await storeLRange(ORDER_LIST_KEY, 0, limit - 1);
  if (!Array.isArray(ids) || !ids.length) return [];

  const keys = ids.map((id) => `${ORDER_KEY_PREFIX}${id}`);
  const values = [];
  for (let index = 0; index < keys.length; index += 250) {
    values.push(...await storeMGet(keys.slice(index, index + 250)));
  }
  return values.map(parseOrder).filter(Boolean);
}

export async function getOrderById(id) {
  if (!id) return null;
  return parseOrder(await storeGet(`${ORDER_KEY_PREFIX}${id}`));
}

export async function updateOrderStatus(id, status, patch = {}) {
  const key = `${ORDER_KEY_PREFIX}${id}`;
  const existing = parseOrder(await storeGet(key));
  if (!existing) return null;

  const updated = {
    ...existing,
    ...patch,
    status,
    updatedAt: new Date().toISOString()
  };

  await storeSet(key, updated);
  return updated;
}

export async function updateOrderDetails(id, orderPatch) {
  const key = `${ORDER_KEY_PREFIX}${id}`;
  const existing = parseOrder(await storeGet(key));
  if (!existing) return null;

  const currentOrder = existing.order || {};
  const nextOrder = {
    ...currentOrder,
    ...orderPatch,
    customer: {
      ...(currentOrder.customer || {}),
      ...(orderPatch.customer || {})
    },
    items: Array.isArray(orderPatch.items) ? orderPatch.items : (currentOrder.items || [])
  };

  const total = Number(nextOrder.total ?? 0);
  const amount = Number.isFinite(total) && total > 0
    ? { ...(existing.amount || { currency: "EUR" }), value: total.toFixed(2), currency: "EUR" }
    : existing.amount;

  const updated = {
    ...existing,
    amount,
    order: nextOrder,
    editedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await storeSet(key, updated);
  return updated;
}

export async function markOrderEmailSent(id, eventName) {
  const key = `${ORDER_KEY_PREFIX}${id}`;
  const existing = parseOrder(await storeGet(key));
  if (!existing) return null;

  const updated = {
    ...existing,
    emailEvents: {
      ...(existing.emailEvents || {}),
      [eventName]: new Date().toISOString()
    }
  };

  await storeSet(key, updated);
  return updated;
}
