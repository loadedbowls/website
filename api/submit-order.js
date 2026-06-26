import { saveOrder } from "./_order-store.js";
import { forwardToPrinter } from "./_print-forward.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const order = req.body;

  if (!order || !Array.isArray(order.items) || !order.items.length || !order.total) {
    return res.status(400).json({ error: "Ongeldige bestelling." });
  }

  if (!order.customer?.name || !order.customer?.phone || !order.customer?.method || !order.customer?.orderTime) {
    return res.status(400).json({ error: "Klantgegevens ontbreken." });
  }

  try {
    const orderId = order.id || `LB-${Date.now()}`;
    const payload = {
      paymentId: null,
      createdAt: new Date().toISOString(),
      paymentStatus: "pay_later",
      paymentLabel: order.paymentMethod || "Betalen bij afhaal/levering",
      amount: {
        currency: "EUR",
        value: Number(order.total || 0).toFixed(2)
      },
      order: {
        ...order,
        orderId
      }
    };

    const record = await saveOrder(payload);

    try {
      await forwardToPrinter(payload);
    } catch (error) {
      console.error("Could not forward pay-later order to printer app:", error);
    }

    return res.status(200).json({ ok: true, order: record });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
