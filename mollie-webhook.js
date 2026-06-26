import { savePaidOrder } from "./_order-store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method not allowed");
  }

  const paymentId = req.body?.id || req.query?.id;

  if (!paymentId || !process.env.MOLLIE_API_KEY) {
    return res.status(200).send("ok");
  }

  const response = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`
    }
  });

  const payment = await response.json();

  if (payment.status === "paid") {
    const order = payment.metadata || {};
    console.log("Paid Loaded Bowls order:", JSON.stringify(order));

    try {
      await savePaidOrder({
        paymentId: payment.id,
        paidAt: new Date().toISOString(),
        amount: payment.amount,
        order
      });
    } catch (error) {
      console.error("Could not save paid order:", error);
    }

    if (process.env.PRINT_WEBHOOK_URL && process.env.PRINT_WEBHOOK_SECRET) {
      try {
        await fetch(process.env.PRINT_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Loaded-Bowls-Secret": process.env.PRINT_WEBHOOK_SECRET
          },
          body: JSON.stringify({
            paymentId: payment.id,
            paidAt: new Date().toISOString(),
            amount: payment.amount,
            order
          })
        });
      } catch (error) {
        console.error("Could not forward order to printer app:", error);
      }
    }
  } else {
    console.log("Mollie payment update:", payment.id, payment.status);
  }

  return res.status(200).send("ok");
}
