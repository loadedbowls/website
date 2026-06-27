import { markOrderEmailSent } from "./_order-store.js";

const EMAIL_FROM = process.env.ORDER_EMAIL_FROM || "Loaded Bowls <bestellingen@loadedbowls.be>";

function getCustomer(record) {
  return record?.order?.customer || {};
}

function orderNumber(record) {
  return record?.displayOrderNumber || record?.order?.orderNumber || record?.order?.orderId || record?.order?.id || record?.id || "je bestelling";
}

function itemList(record) {
  const items = Array.isArray(record?.order?.items) ? record.order.items : [];
  if (!items.length) return "";
  return `
    <ul style="padding-left:18px;margin:12px 0">
      ${items.map((item) => `<li style="margin-bottom:8px"><strong>${item.quantity || 1}x ${item.name || "Item"}</strong>${item.details ? `<br><span style="color:#666">${item.details}</span>` : ""}</li>`).join("")}
    </ul>
  `;
}

function baseEmail({ title, intro, record, extra }) {
  const customer = getCustomer(record);
  return `
    <div style="margin:0;padding:0;background:#f7f2e9;font-family:Arial,sans-serif;color:#171717">
      <div style="max-width:560px;margin:0 auto;padding:24px">
        <div style="background:#071018;color:#fff8e8;border-radius:14px;padding:24px">
          <div style="font-size:24px;font-weight:800;letter-spacing:.5px;color:#e1a72f">LOADED BOWLS</div>
          <h1 style="font-size:26px;margin:18px 0 8px">${title}</h1>
          <p style="font-size:16px;line-height:1.5;margin:0 0 18px">Dag ${customer.name || ""}, ${intro}</p>
          <div style="background:#101922;border:1px solid #263444;border-radius:10px;padding:16px;margin:18px 0">
            <p style="margin:0 0 8px"><strong>Ordernummer:</strong> ${orderNumber(record)}</p>
            <p style="margin:0 0 8px"><strong>Keuze:</strong> ${customer.method || "-"}</p>
            <p style="margin:0 0 8px"><strong>Gewenst uur:</strong> ${customer.orderTime || "-"}</p>
            ${customer.address ? `<p style="margin:0"><strong>Adres:</strong> ${customer.address}</p>` : ""}
          </div>
          ${extra || ""}
          <p style="font-size:15px;line-height:1.5;margin:18px 0 0">Tot straks,<br><strong>Loaded Bowls</strong></p>
        </div>
        <p style="font-size:12px;color:#777;line-height:1.4;margin:12px 4px 0">Je ontvangt deze mail omdat je een bestelling plaatste via loadedbowls.be. Controleer ook je spamfolder als je onze mails niet ziet.</p>
      </div>
    </div>
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
  const deliveryNote = customer.method === "Levering"
    ? `<p style="margin:14px 0 0;color:#e1a72f"><strong>Levering:</strong> je krijgt nog een mail zodra je bestelling onderweg is.</p>`
    : "";
  const html = baseEmail({
    title: "Bestelling ontvangen",
    intro: "we hebben je bestelling goed ontvangen en starten met voorbereiden.",
    record,
    extra: `${itemList(record)}${deliveryNote}`
  });

  const ok = await sendMail({ to: customer.email, subject, html });
  if (ok) await markOrderEmailSent(record.id, "receivedAt");
  return ok;
}

export async function sendOrderPreparingEmail(record) {
  const customer = getCustomer(record);
  const sent = record?.emailEvents?.preparingAt;
  if (sent || !customer.email) return false;

  const subject = "Je bestelling is in bereiding";
  const html = baseEmail({
    title: "Je bestelling is in bereiding",
    intro: "je bestelling is nu in bereiding.",
    record
  });

  const ok = await sendMail({ to: customer.email, subject, html });
  if (ok) await markOrderEmailSent(record.id, "preparingAt");
  return ok;
}

export async function sendOrderOnTheWayEmail(record) {
  const customer = getCustomer(record);
  const sent = record?.emailEvents?.onTheWayAt;
  if (sent || !customer.email || customer.method !== "Levering") return false;

  const subject = "Je bestelling is onderweg";
  const html = baseEmail({
    title: "Je bestelling is onderweg",
    intro: "je bestelling is klaar en onderweg naar jou.",
    record,
    extra: `<p style="font-size:16px;line-height:1.5;margin:0">Smakelijk alvast.</p>`
  });

  const ok = await sendMail({ to: customer.email, subject, html });
  if (ok) await markOrderEmailSent(record.id, "onTheWayAt");
  return ok;
}
