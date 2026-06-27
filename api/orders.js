import { listOrders, requireAdmin, updateOrderStatus } from "./_order-store.js";
import { sendOrderOnTheWayEmail, sendOrderPreparingEmail } from "./_email.js";

const allowedStatuses = ["Nieuw", "In bereiding", "Klaar", "Onderweg", "Afgehaald", "Geleverd", "Geannuleerd"];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (!requireAdmin(req, res)) return;

  if (req.method === "GET") {
    try {
      const orders = await listOrders();
      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    const { id, status } = req.body || {};
    if (!id || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Ongeldige status." });
    }

    try {
      const order = await updateOrderStatus(id, status);
      if (!order) return res.status(404).json({ error: "Order niet gevonden." });

      try {
        if (status === "In bereiding") await sendOrderPreparingEmail(order);
        if (status === "Onderweg") await sendOrderOnTheWayEmail(order);
      } catch (error) {
        console.error("Could not send status email:", error);
      }

      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", "GET, PATCH");
  return res.status(405).json({ error: "Method not allowed" });
}
