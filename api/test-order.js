import { requireAdmin, saveOrder } from "./_order-store.js";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const orderId = `TEST-${Date.now()}`;

  try {
    const record = await saveOrder({
      paymentId: null,
      createdAt: new Date().toISOString(),
      paymentStatus: "test",
      paymentLabel: "Testorder",
      amount: {
        currency: "EUR",
        value: "12.99"
      },
      order: {
        id: orderId,
        orderId,
        customer: {
          name: "Test klant",
          phone: "000000000",
          email: "test@example.com",
          method: "Afhalen",
          orderTime: "12:30",
          address: "",
          note: "Dit is een testorder."
        },
        items: [
          {
            key: "test-bowl",
            name: "Test Loaded Bowl",
            quantity: 1,
            price: 12.99,
            details: "Basis: frieten, saus: samurai"
          }
        ],
        total: 12.99,
        paymentMethod: "Testorder"
      }
    });

    return res.status(200).json({ ok: true, order: record });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
