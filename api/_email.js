import { markOrderEmailSent } from "./_order-store.js";

const EMAIL_FROM = process.env.ORDER_EMAIL_FROM || "Loaded Bowls <bestellingen@loadedbowls.be>";

function getCustomer(record) {
  return record?.order?.customer || {};
}

function orderNumber(record) {
  return record?.order?.orderId || record?.order?.id || record?.id || "je bestelling";
}

function itemList(record) {
  const items = Array.isArray(record?.order?.items) ? record.order.items : [];
  if (!items.length) return "";
  return `
    <ul>
      ${items.map((item) => `<li>${item.quantity || 1}x ${item.name || "Item"}${item.details ? `<br><small>${item.details}</small>` : ""}</li>`).join("")}
    </ul>
  `;
}

async function sendMail({ to, subject, html }) {
  if (!to || !process.env.RESEND_API_KEY) {
    console.log("Mail skipped: RESEND_API_KEY or recipient missing.");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject,
      html
    })
  });

  if (!response.ok) {
    const data = await response.text().catch(() => "");
    throw new Error(`Mail kon niet worden verstuurd: ${data || response.status}`);
  }

  return true;
}

export async function sendOrderReceivedEmail(record) {
  const customer = getCustomer(record);
  const sent = record?.emailEvents?.receivedAt;
  if (sent || !customer.email) return false;

  const subject = "We hebben je bestelling ontvangen";
  const html = `
    <div style="font-family:Arial,sans-serif;color:#151515;line-height:1.5">
      <h2>Loaded Bowls</h2>
      <p>Dag ${customer.name || ""},</p>
      <p>We hebben je bestelling ontvangen en starten met voorbereiden.</p>
      <p><strong>Order:</strong> ${orderNumber(record)}<br>
      <strong>Keuze:</strong> ${customer.method || "-"}<br>
      <strong>Gewenst uur:</strong> ${customer.orderTime || "-"}</p>
      ${itemList(record)}
      <p>Tot straks,<br>Loaded Bowls</p>
    </div>
  `;

  const ok = await sendMail({ to: customer.email, subject, html });
  if (ok) await markOrderEmailSent(record.id, "receivedAt");
  return ok;
}

export async function sendOrderPreparingEmail(record) {
  const customer = getCustomer(record);
  const sent = record?.emailEvents?.preparingAt;
  if (sent || !customer.email) return false;

  const subject = "Je bestelling is in bereiding";
  const html = `
    <div style="font-family:Arial,sans-serif;color:#151515;line-height:1.5">
      <h2>Loaded Bowls</h2>
      <p>Dag ${customer.name || ""},</p>
      <p>Je bestelling is nu in bereiding.</p>
      <p><strong>Order:</strong> ${orderNumber(record)}<br>
      <strong>Gewenst uur:</strong> ${customer.orderTime || "-"}</p>
      <p>Tot straks,<br>Loaded Bowls</p>
    </div>
  `;

  const ok = await sendMail({ to: customer.email, subject, html });
  if (ok) await markOrderEmailSent(record.id, "preparingAt");
  return ok;
}

export async function sendOrderOnTheWayEmail(record) {
  const customer = getCustomer(record);
  const sent = record?.emailEvents?.onTheWayAt;
  if (sent || !customer.email || customer.method !== "Levering") return false;

  const subject = "Je bestelling is onderweg";
  const html = `
    <div style="font-family:Arial,sans-serif;color:#151515;line-height:1.5">
      <h2>Loaded Bowls</h2>
      <p>Dag ${customer.name || ""},</p>
      <p>Je bestelling is klaar en onderweg naar jou.</p>
      <p><strong>Order:</strong> ${orderNumber(record)}<br>
      <strong>Adres:</strong> ${customer.address || "-"}</p>
      <p>Smakelijk,<br>Loaded Bowls</p>
    </div>
  `;

  const ok = await sendMail({ to: customer.email, subject, html });
  if (ok) await markOrderEmailSent(record.id, "onTheWayAt");
  return ok;
}
