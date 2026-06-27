import { requireAdmin, saveOrder } from "./_order-store.js";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const order = req.body || {};

  if (!Array.isArray(order.items) || !order.items.length || !order.total) {
    return res.status(400).json({ error: "Ongeldige kassa-order." });
  }

  try {
    const orderId = order.onlineOrderId || `POS-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const record = await saveOrder({
      paymentId: orderId,
      createdAt: order.createdAt || new Date().toISOString(),
      paymentStatus: order.paymentStatus === "Open" ? "pay_later" : "paid",
      paymentLabel: order.payment || "Kassa",
      amount: {
        currency: "EUR",
        value: Number(order.total || 0).toFixed(2)
      },
      order: {
        ...order,
        source: "kassa",
        orderId
      }
    });

    return res.status(200).json({ ok: true, order: record });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
