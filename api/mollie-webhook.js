import { getPendingOrder, savePaidOrder } from "./_order-store.js";
import { forwardToPrinter } from "./_print-forward.js";
import { sendOrderReceivedEmail } from "./_email.js";

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
    const metadata = payment.metadata || {};
    const pendingOrder = await getPendingOrder(metadata.orderId);
    const order = pendingOrder || metadata;
    console.log("Paid Loaded Bowls order:", JSON.stringify(order));

    try {
      const record = await savePaidOrder({
        paymentId: payment.id,
        paidAt: new Date().toISOString(),
        amount: payment.amount,
        order
      });

      try {
        await sendOrderReceivedEmail(record);
      } catch (error) {
        console.error("Could not send received email:", error);
      }
    } catch (error) {
      console.error("Could not save paid order:", error);
    }

    try {
      await forwardToPrinter({
        paymentId: payment.id,
        paidAt: new Date().toISOString(),
        paymentLabel: "Online betaald",
        amount: payment.amount,
        order
      });
    } catch (error) {
      console.error("Could not forward order to printer app:", error);
    }
  } else {
    console.log("Mollie payment update:", payment.id, payment.status);
  }

  return res.status(200).send("ok");
}
