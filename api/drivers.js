import { findDriverByPin, listDrivers, publicDriver, removeDriver, saveDriver } from "./_driver-store.js";
import { getOrderById, listOrders, requireAdmin, updateOrderStatus } from "./_order-store.js";
import { saveDriverPushSubscription } from "./_push.js";

function isAdmin(req) {
  const expected = process.env.ADMIN_ORDERS_SECRET;
  const received = req.headers["x-admin-secret"] || req.query?.secret;
  return Boolean(expected && received === expected);
}

function isDelivery(record) {
  return String(record?.order?.customer?.method || "").toLowerCase() === "levering";
}

function assignedTo(record, driver) {
  return record?.driverId === driver.id;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");

  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      if (!requireAdmin(req, res)) return;
      const drivers = await listDrivers({ includePins: true });
      return res.status(200).json({ drivers });
    }

    if (req.method === "POST") {
      const { action, pin, subscription } = req.body || {};

      if (action === "login") {
        const driver = await findDriverByPin(pin);
        if (!driver) return res.status(401).json({ error: "Pincode niet herkend." });
        return res.status(200).json({ driver: publicDriver(driver) });
      }

      if (action === "orders") {
        const driver = await findDriverByPin(pin);
        if (!driver) return res.status(401).json({ error: "Pincode niet herkend." });
        const orders = await listOrders();
        const filtered = orders
          .filter(isDelivery)
          .filter((record) => assignedTo(record, driver))
          .filter((record) => record.status === "Onderweg")
          .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        return res.status(200).json({ driver: publicDriver(driver), orders: filtered });
      }

      if (action === "subscribe") {
        const driver = await findDriverByPin(pin);
        if (!driver) return res.status(401).json({ error: "Pincode niet herkend." });
        const count = await saveDriverPushSubscription(driver.id, subscription);
        return res.status(200).json({ ok: true, count });
      }

      if (!requireAdmin(req, res)) return;
      const driver = await saveDriver(req.body || {});
      return res.status(200).json({ driver });
    }

    if (req.method === "PATCH") {
      const { id, pin, status } = req.body || {};
      const driver = await findDriverByPin(pin);
      if (!driver) return res.status(401).json({ error: "Pincode niet herkend." });
      if (!id) return res.status(400).json({ error: "Order ontbreekt." });
      if (status !== "Geleverd") return res.status(400).json({ error: "Chauffeur mag alleen op geleverd zetten." });

      const existing = await getOrderById(id);
      if (!existing || !isDelivery(existing) || !assignedTo(existing, driver)) {
        return res.status(404).json({ error: "Deze levering is niet aan jou toegewezen." });
      }

      const order = await updateOrderStatus(id, "Geleverd", {
        deliveredById: driver.id,
        deliveredByName: driver.name,
        deliveredAt: new Date().toISOString()
      });

      return res.status(200).json({ order });
    }

    if (req.method === "DELETE") {
      if (!requireAdmin(req, res)) return;
      const id = req.query?.id || req.body?.id;
      if (!id) return res.status(400).json({ error: "Chauffeur ontbreekt." });
      await removeDriver(id);
      return res.status(200).json({ ok: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.setHeader("Allow", "GET, POST, PATCH, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
