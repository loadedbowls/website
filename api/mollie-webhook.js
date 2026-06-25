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
    console.log("Paid Loaded Bowls order:", JSON.stringify(payment.metadata || {}));
  } else {
    console.log("Mollie payment update:", payment.id, payment.status);
  }

  return res.status(200).send("ok");
}
