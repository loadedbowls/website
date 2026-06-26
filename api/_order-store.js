import { kv } from "@vercel/kv";

const ORDER_LIST_KEY = "loaded-bowls:orders";
const ORDER_KEY_PREFIX = "loaded-bowls:order:";

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
  const existing = await kv.get(key);
  if (existing) return parseOrder(existing);

  const record = {
    id,
    paymentId: payload.paymentId,
    paidAt: payload.paidAt || null,
    createdAt: payload.createdAt || payload.paidAt || new Date().toISOString(),
    paymentStatus: payload.paymentStatus || "paid",
    paymentLabel: payload.paymentLabel || "Online betaald",
    status: "Nieuw",
    amount: payload.amount,
    order: metadata
  };

  await kv.set(key, record);
  await kv.lpush(ORDER_LIST_KEY, id);
  await kv.ltrim(ORDER_LIST_KEY, 0, 199);
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
  const ids = await kv.lrange(ORDER_LIST_KEY, 0, 99);
  if (!Array.isArray(ids) || !ids.length) return [];

  const values = await kv.mget(...ids.map((id) => `${ORDER_KEY_PREFIX}${id}`));
  return values.map(parseOrder).filter(Boolean);
}

export async function updateOrderStatus(id, status) {
  const key = `${ORDER_KEY_PREFIX}${id}`;
  const existing = parseOrder(await kv.get(key));
  if (!existing) return null;

  const updated = {
    ...existing,
    status,
    updatedAt: new Date().toISOString()
  };

  await kv.set(key, updated);
  return updated;
}
