import { findDriverByPin, publicDriver } from "./_driver-store.js";
import { getOrderById, listOrders, updateOrderStatus } from "./_order-store.js";

const driverStatuses = ["Onderweg"];

function isDelivery(record) {
  return String(record?.order?.customer?.method || "").toLowerCase() === "levering";
}

function assignedTo(record, driver) {
  return record?.driverId === driver.id;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  const driver = await findDriverByPin(req.body?.pin);
  if (!driver) return res.status(401).json({ error: "Pincode niet herkend." });

  if (req.method === "POST") {
    const orders = await listOrders();
    const filtered = orders
      .filter(isDelivery)
      .filter((record) => assignedTo(record, driver))
      .filter((record) => driverStatuses.includes(record.status))
      .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

    return res.status(200).json({ driver: publicDriver(driver), orders: filtered });
  }

  if (req.method === "PATCH") {
    const { id, status } = req.body || {};
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

  res.setHeader("Allow", "POST, PATCH");
  return res.status(405).json({ error: "Method not allowed" });
}
