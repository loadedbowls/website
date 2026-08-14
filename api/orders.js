import { listOrders, requireAdmin, updateOrderDetails, updateOrderStatus } from "./_order-store.js";
import { sendOrderCancelledEmail, sendOrderOnTheWayEmail, sendOrderPreparingEmail } from "./_email.js";
import { sendDriverOrderPush } from "./_push.js";

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
      const orders = await listOrders(req.query?.limit);
      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    const { id, order, status, driverId, driverName, cancellationReason, cancelledBy } = req.body || {};
    if (!id) {
      return res.status(400).json({ error: "Order ontbreekt." });
    }

    if (order) {
      try {
        const updatedOrder = await updateOrderDetails(id, order);
        if (!updatedOrder) return res.status(404).json({ error: "Order niet gevonden." });
        return res.status(200).json({ order: updatedOrder });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Ongeldige status." });
    }

    if (status === "Geannuleerd" && !String(cancellationReason || "").trim()) {
      return res.status(400).json({ error: "Geef een reden voor de annulering." });
    }

    try {
      const statusPatch = {};
      if (driverId) statusPatch.driverId = String(driverId);
      if (driverName) statusPatch.driverName = String(driverName);
      if (status === "Onderweg" && driverId) statusPatch.assignedDriverAt = new Date().toISOString();
      if (status === "Geannuleerd") {
        statusPatch.cancellationReason = String(cancellationReason).trim().slice(0, 500);
        statusPatch.cancelledBy = String(cancelledBy || "Loaded Bowls").trim().slice(0, 80);
        statusPatch.cancelledAt = new Date().toISOString();
      }
      const order = await updateOrderStatus(id, status, statusPatch);
      if (!order) return res.status(404).json({ error: "Order niet gevonden." });

      try {
        if (status === "In bereiding") await sendOrderPreparingEmail(order);
        if (status === "Geannuleerd") await sendOrderCancelledEmail(order);
        if (status === "Onderweg") {
          await sendOrderOnTheWayEmail(order);
          await sendDriverOrderPush(order);
        }
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
