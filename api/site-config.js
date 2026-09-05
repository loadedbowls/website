import {
  getSiteConfig,
  getSiteVisitStats,
  recordSiteVisit,
  requireSiteAdmin,
  setSiteConfig
} from "./_site-store.js";

const BOT_USER_AGENT = /bot|crawler|spider|crawling|preview|facebookexternalhit|slurp|bingpreview|whatsapp/i;
const VISITOR_ID_PATTERN = /^[a-zA-Z0-9_-]{16,100}$/;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    if (req.query?.analytics === "stats") {
      if (!requireSiteAdmin(req, res)) return;
      const requestedDays = Number.parseInt(req.query?.days, 10);
      const days = Number.isFinite(requestedDays)
        ? Math.min(730, Math.max(1, requestedDays))
        : 30;
      try {
        return res.status(200).json({ daily: await getSiteVisitStats(days) });
      } catch (error) {
        return res.status(500).json({ error: "Bezoekersstatistieken konden niet worden geladen." });
      }
    }

    try {
      return res.status(200).json({ config: await getSiteConfig() });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
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
      await recordSiteVisit(visitorId);
      return res.status(200).json({ ok: true, counted: true });
    } catch (error) {
      console.error("Could not record website visit:", error);
      return res.status(500).json({ error: "Bezoek kon niet worden geregistreerd." });
    }
  }

  if (req.method === "PUT") {
    if (!requireSiteAdmin(req, res)) return;
    const config = req.body?.config;
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      return res.status(400).json({ error: "Ongeldige webshopinstellingen." });
    }
    const serialized = JSON.stringify(config);
    if (serialized.length > 250000) {
      return res.status(413).json({ error: "De instellingen zijn te groot. Gebruik bestandslinks voor foto's." });
    }
    try {
      return res.status(200).json({ config: await setSiteConfig(config) });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", "GET, POST, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
