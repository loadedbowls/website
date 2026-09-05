import { createHash } from "node:crypto";
import { kv } from "@vercel/kv";
import { createClient } from "redis";

const SITE_CONFIG_KEY = "loaded-bowls:site-config";
const ANALYTICS_PREFIX = "loaded-bowls:analytics";
const VISITOR_MARKER_SECONDS = 60 * 60 * 48;
let redisClient;

async function getRedisClient() {
  if (!process.env.REDIS_URL) return null;
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (error) => console.error("Redis error:", error));
  }
  if (!redisClient.isOpen) await redisClient.connect();
  return redisClient;
}

function parseValue(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try { return JSON.parse(value); } catch { return null; }
}

function brusselsDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function recentDateKeys(days) {
  const [year, month, day] = brusselsDateKey().split("-").map(Number);
  const todayAtNoonUtc = Date.UTC(year, month - 1, day, 12);
  return Array.from({ length: days }, (_, index) => (
    new Date(todayAtNoonUtc - index * 86400000).toISOString().slice(0, 10)
  )).reverse();
}

function analyticsCountKey(date, metric) {
  return `${ANALYTICS_PREFIX}:${date}:${metric}`;
}

async function readMany(keys) {
  if (!keys.length) return [];
  const redis = await getRedisClient();
  if (redis) return redis.mGet(keys);
  return kv.mget(...keys);
}

export async function getSiteConfig() {
  const redis = await getRedisClient();
  const value = redis ? await redis.get(SITE_CONFIG_KEY) : await kv.get(SITE_CONFIG_KEY);
  return parseValue(value);
}

export async function setSiteConfig(config) {
  const value = {
    ...config,
    version: Number(config.version || 1),
    updatedAt: new Date().toISOString()
  };
  const redis = await getRedisClient();
  if (redis) await redis.set(SITE_CONFIG_KEY, JSON.stringify(value));
  else await kv.set(SITE_CONFIG_KEY, value);
  return value;
}

export async function recordSiteVisit(visitorId) {
  const date = brusselsDateKey();
  const visitorHash = createHash("sha256").update(visitorId).digest("hex");
  const pageViewsKey = analyticsCountKey(date, "pageviews");
  const uniqueVisitorsKey = analyticsCountKey(date, "unique");
  const visitorMarkerKey = `${ANALYTICS_PREFIX}:${date}:visitor:${visitorHash}`;
  const redis = await getRedisClient();

  if (redis) {
    const pageViews = await redis.incr(pageViewsKey);
    const firstVisitToday = await redis.set(visitorMarkerKey, "1", {
      NX: true,
      EX: VISITOR_MARKER_SECONDS
    });
    const uniqueVisitors = firstVisitToday
      ? await redis.incr(uniqueVisitorsKey)
      : Number(await redis.get(uniqueVisitorsKey) || 0);
    return { date, uniqueVisitors, pageViews };
  }

  const pageViews = await kv.incr(pageViewsKey);
  const firstVisitToday = await kv.set(visitorMarkerKey, "1", {
    nx: true,
    ex: VISITOR_MARKER_SECONDS
  });
  const uniqueVisitors = firstVisitToday
    ? await kv.incr(uniqueVisitorsKey)
    : Number(await kv.get(uniqueVisitorsKey) || 0);
  return { date, uniqueVisitors, pageViews };
}

export async function getSiteVisitStats(days = 30) {
  const dates = recentDateKeys(days);
  const keys = dates.flatMap((date) => [
    analyticsCountKey(date, "unique"),
    analyticsCountKey(date, "pageviews")
  ]);
  const values = await readMany(keys);
  return dates.map((date, index) => ({
    date,
    uniqueVisitors: Number(values[index * 2] || 0),
    pageViews: Number(values[index * 2 + 1] || 0)
  }));
}

export function requireSiteAdmin(req, res) {
  const configuredSecret = String(process.env.ADMIN_ORDERS_SECRET || "").trim();
  if (!configuredSecret) {
    res.status(500).json({ error: "ADMIN_ORDERS_SECRET ontbreekt." });
    return false;
  }
  const suppliedSecret = String(req.headers["x-admin-secret"] || "").trim();
  if (suppliedSecret !== configuredSecret) {
    res.status(401).json({ error: "Geen toegang tot webshopbeheer." });
    return false;
  }
  return true;
}
