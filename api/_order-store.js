import { kv } from "@vercel/kv";
import { createClient } from "redis";

const ORDER_LIST_KEY = "loaded-bowls:orders";
const ORDER_KEY_PREFIX = "loaded-bowls:order:";
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

function parseOrder(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
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
  const existing = await storeGet(key);
  if (existing) return parseOrder(existing);

  const record = {
    id,
    paymentId: payload.paymentId,
    paidAt: payload.paidAt || null,
    createdAt: payload.createdAt || payload.paidAt || new Date().toISOString(),
    paymentStatus: payload.paymentStatus || "paid",
    paymentLabel: payload.paymentLabel || "Online betaald",
    status: "Nieuw",
    emailEvents: {},
    amount: payload.amount,
    order: metadata
  };

  await storeSet(key, record);
  await storeLPush(ORDER_LIST_KEY, id);
  await storeLTrim(ORDER_LIST_KEY, 0, 199);
  return record;
}

export async function savePaidOrder(payload) {
  return saveOrder({
    ...payload,
    paymentStatus: "paid",
    paymentLabel: "Online betaald"
  });
}

export async function listOrders() {
  const ids = await storeLRange(ORDER_LIST_KEY, 0, 99);
  if (!Array.isArray(ids) || !ids.length) return [];

  const values = await storeMGet(ids.map((id) => `${ORDER_KEY_PREFIX}${id}`));
  return values.map(parseOrder).filter(Boolean);
}

export async function updateOrderStatus(id, status) {
  const key = `${ORDER_KEY_PREFIX}${id}`;
  const existing = parseOrder(await storeGet(key));
  if (!existing) return null;

  const updated = {
    ...existing,
    status,
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
