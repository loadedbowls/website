function getBaseUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${host}`;
}

function toAmountValue(total) {
  return Number(total || 0).toFixed(2);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.MOLLIE_API_KEY) {
    return res.status(500).json({ error: "MOLLIE_API_KEY ontbreekt in Vercel." });
  }

  const order = req.body;
  if (!order || !Array.isArray(order.items) || !order.items.length || !order.total) {
    return res.status(400).json({ error: "Ongeldige bestelling." });
  }

  if (!order.customer?.name || !order.customer?.phone || !order.customer?.email || !order.customer?.method || !order.customer?.orderTime) {
    return res.status(400).json({ error: "Klantgegevens ontbreken." });
  }

  const baseUrl = getBaseUrl(req);
  const orderId = order.id || `LB-${Date.now()}`;

  const payload = {
    amount: {
      currency: "EUR",
      value: toAmountValue(order.total)
    },
    description: `Loaded Bowls order ${orderId}`,
    redirectUrl: `${baseUrl}/payment-return.html?order=${encodeURIComponent(orderId)}`,
    webhookUrl: `${baseUrl}/api/mollie-webhook`,
    locale: "nl_BE",
    metadata: {
      orderId,
      customer: order.customer,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      promotion: order.promotion,
      total: order.total,
      paymentMethod: order.paymentMethod
    }
  };

  const mollieResponse = await fetch("https://api.mollie.com/v2/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await mollieResponse.json();

  if (!mollieResponse.ok) {
    return res.status(mollieResponse.status).json({
      error: data.detail || data.title || "Mollie betaling kon niet worden aangemaakt.",
      mollie: data
    });
  }

  return res.status(200).json({
    paymentId: data.id,
    checkoutUrl: data._links?.checkout?.href
  });
}
