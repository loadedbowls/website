import { kv } from "@vercel/kv";
import { createClient } from "redis";

const DRIVER_LIST_KEY = "loaded-bowls:drivers";
const DRIVER_LOCATION_KEY = "loaded-bowls:driver-locations";
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

function parseValue(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function normalizeDrivers(value) {
  const parsed = parseValue(value);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.drivers)) return parsed.drivers;
  return [];
}

function normalizeLocations(value) {
  const parsed = parseValue(value);
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
  return {};
}

function driverId() {
  return `drv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function publicDriver(driver) {
  return {
    id: driver.id,
    name: driver.name,
    active: driver.active !== false,
    createdAt: driver.createdAt || null,
    updatedAt: driver.updatedAt || null
  };
}

export async function listDrivers({ includePins = false } = {}) {
  const drivers = normalizeDrivers(await storeGet(DRIVER_LIST_KEY));
  return includePins ? drivers : drivers.map(publicDriver);
}

export async function saveDriver(input) {
  const drivers = normalizeDrivers(await storeGet(DRIVER_LIST_KEY));
  const now = new Date().toISOString();
  const cleanName = String(input?.name || "").trim();
  const cleanPin = String(input?.pin || "").trim();

  if (!cleanName) throw new Error("Naam van chauffeur ontbreekt.");
  if (!/^\d{4,8}$/.test(cleanPin)) throw new Error("Pincode moet uit 4 tot 8 cijfers bestaan.");

  const existingIndex = drivers.findIndex((driver) => driver.id === input.id);
  const nextDriver = {
    ...(existingIndex >= 0 ? drivers[existingIndex] : {}),
    id: existingIndex >= 0 ? drivers[existingIndex].id : driverId(),
    name: cleanName,
    pin: cleanPin,
    active: input.active !== false,
    createdAt: existingIndex >= 0 ? drivers[existingIndex].createdAt : now,
    updatedAt: now
  };

  if (existingIndex >= 0) drivers[existingIndex] = nextDriver;
  else drivers.push(nextDriver);

  await storeSet(DRIVER_LIST_KEY, drivers);
  return nextDriver;
}

export async function removeDriver(id) {
  const drivers = normalizeDrivers(await storeGet(DRIVER_LIST_KEY));
  const nextDrivers = drivers.filter((driver) => driver.id !== id);
  await storeSet(DRIVER_LIST_KEY, nextDrivers);
  return true;
}

export async function findDriverByPin(pin) {
  const cleanPin = String(pin || "").trim();
  const drivers = normalizeDrivers(await storeGet(DRIVER_LIST_KEY));
  return drivers.find((driver) => driver.active !== false && driver.pin === cleanPin) || null;
}

export async function listDriverLocations() {
  return normalizeLocations(await storeGet(DRIVER_LOCATION_KEY));
}

export async function saveDriverLocation(driver, input) {
  const latitude = Number(input?.latitude ?? input?.lat);
  const longitude = Number(input?.longitude ?? input?.lng);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Locatie ontbreekt.");
  }

  const now = new Date().toISOString();
  let updatedAt = now;
  if (input?.timestamp) {
    const timestamp = new Date(input.timestamp);
    if (!Number.isNaN(timestamp.getTime())) updatedAt = timestamp.toISOString();
  }

  const locations = await listDriverLocations();
  const location = {
    driverId: driver.id,
    driverName: driver.name,
    latitude,
    longitude,
    accuracy: Number.isFinite(Number(input?.accuracy)) ? Number(input.accuracy) : null,
    updatedAt
  };

  locations[driver.id] = location;
  await storeSet(DRIVER_LOCATION_KEY, locations);
  return location;
}
