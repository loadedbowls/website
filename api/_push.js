import { kv } from "@vercel/kv";
import { createClient } from "redis";

const PUSH_SUBSCRIPTIONS_KEY = "loaded-bowls:push-subscriptions";
const DRIVER_PUSH_PREFIX = "loaded-bowls:driver-push:";
let redisClient;

async function getRedisClient() {
  if (!process.env.REDIS_URL) return null;

  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (error) => console.error("Redis push error:", error));
  }

  if (!redisClient.isOpen) await redisClient.connect();
  return redisClient;
}

function parseJson(value, fallback) {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function getSubscriptions() {
  const redis = await getRedisClient();
  const value = redis ? await redis.get(PUSH_SUBSCRIPTIONS_KEY) : await kv.get(PUSH_SUBSCRIPTIONS_KEY);
  const subscriptions = parseJson(value, []);
  return Array.isArray(subscriptions) ? subscriptions : [];
}

async function setSubscriptions(subscriptions) {
  const clean = subscriptions.filter((subscription) => subscription?.endpoint).slice(-25);
  const redis = await getRedisClient();
  if (redis) return redis.set(PUSH_SUBSCRIPTIONS_KEY, JSON.stringify(clean));
  return kv.set(PUSH_SUBSCRIPTIONS_KEY, clean);
}

export function getVapidPublicKey() {
  return process.env.VAPID_PUBLIC_KEY || "";
}

export async function savePushSubscription(subscription) {
  if (!subscription?.endpoint) return 0;
  const subscriptions = await getSubscriptions();
  const next = [
    ...subscriptions.filter((existing) => existing.endpoint !== subscription.endpoint),
    subscription
  ];
  await setSubscriptions(next);
  return next.length;
}

export async function saveDriverPushSubscription(driverId, subscription) {
  if (!driverId || !subscription?.endpoint) return 0;
  const key = `${DRIVER_PUSH_PREFIX}${driverId}`;
  const redis = await getRedisClient();
  const value = redis ? await redis.get(key) : await kv.get(key);
  const subscriptions = parseJson(value, []);
  const next = [
    ...subscriptions.filter((existing) => existing.endpoint !== subscription.endpoint),
    subscription
  ].slice(-5);
  if (redis) await redis.set(key, JSON.stringify(next));
  else await kv.set(key, next);
  return next.length;
}

function money(value) {
  return `€${Number(value || 0).toFixed(2).replace(".", ",")}`;
}

function orderTitle(record) {
  const order = record.order || {};
  const customer = order.customer || {};
  const number = record.displayOrderNumber || record.localOrderNumber || "Nieuwe order";
  return `${number} - ${customer.method || "Bestelling"} ${customer.orderTime || ""}`.trim();
}

function orderBody(record) {
  const order = record.order || {};
  const customer = order.customer || {};
  const total = order.total || record.amount?.value || 0;
  return `${customer.name || "Klant"} - ${money(total)} - ${order.items?.length || 0} item(s)`;
}

export async function sendNewOrderPush(record) {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey || !record) return false;

  const subscriptions = await getSubscriptions();
  if (!subscriptions.length) return false;

  const webpush = await import("web-push");
  webpush.default.setVapidDetails("mailto:orders@loadedbowls.be", publicKey, privateKey);

  const payload = JSON.stringify({
    title: "Nieuwe Loaded Bowls order",
    body: orderBody(record),
    data: {
      url: "/mobile-orders.html",
      id: record.id
    },
    tag: record.id || "loaded-bowls-order"
  });

  const stillValid = [];
  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webpush.default.sendNotification(subscription, payload);
      stillValid.push(subscription);
    } catch (error) {
      if (![404, 410].includes(error.statusCode)) {
        console.error("Push notification failed:", error.message);
        stillValid.push(subscription);
      }
    }
  }));

  if (stillValid.length !== subscriptions.length) await setSubscriptions(stillValid);
  return true;
}

export async function sendDriverOrderPush(record) {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const driverId = record?.driverId;
  if (!publicKey || !privateKey || !record || !driverId) return false;

  const key = `${DRIVER_PUSH_PREFIX}${driverId}`;
  const redis = await getRedisClient();
  const value = redis ? await redis.get(key) : await kv.get(key);
  const subscriptions = parseJson(value, []);
  if (!subscriptions.length) return false;

  const webpush = await import("web-push");
  webpush.default.setVapidDetails("mailto:orders@loadedbowls.be", publicKey, privateKey);

  const order = record.order || {};
  const customer = order.customer || {};
  const payload = JSON.stringify({
    title: "Nieuwe levering toegewezen",
    body: `${customer.name || "Klant"} - ${customer.orderTime || ""} - ${customer.address || "Adres openen"}`,
    data: {
      url: "/delivery.html",
      id: record.id
    },
    tag: `driver-${driverId}-${record.id}`
  });

  const stillValid = [];
  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webpush.default.sendNotification(subscription, payload);
      stillValid.push(subscription);
    } catch (error) {
      if (![404, 410].includes(error.statusCode)) {
        console.error("Driver push notification failed:", error.message);
        stillValid.push(subscription);
      }
    }
  }));

  if (stillValid.length !== subscriptions.length) {
    if (redis) await redis.set(key, JSON.stringify(stillValid));
    else await kv.set(key, stillValid);
  }

  return true;
}
