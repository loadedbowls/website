import { recordVisit } from "./_analytics-store.js";

const BOT_USER_AGENT = /bot|crawler|spider|crawling|preview|facebookexternalhit|slurp|bingpreview|whatsapp/i;
const VISITOR_ID_PATTERN = /^[a-zA-Z0-9_-]{16,100}$/;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userAgent = String(req.headers["user-agent"] || "");
  const purpose = String(req.headers["sec-purpose"] || req.headers.purpose || "");
  if (!userAgent || BOT_USER_AGENT.test(userAgent) || /prefetch|preview/i.test(purpose)) {
    return res.status(200).json({ ok: true, counted: false });
  }

  const visitorId = String(req.body?.visitorId || "").trim();
  if (!VISITOR_ID_PATTERN.test(visitorId)) {
    return res.status(400).json({ error: "Ongeldige bezoeker-ID." });
  }

  try {
    const result = await recordVisit(visitorId);
    return res.status(200).json({ ok: true, counted: true, ...result });
  } catch (error) {
    console.error("Could not record analytics visit:", error);
    return res.status(500).json({ error: "Bezoek kon niet worden geregistreerd." });
  }
}
