import { kv } from "@vercel/kv";
import { createClient } from "redis";

const SITE_CONFIG_KEY = "loaded-bowls:site-config";
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
