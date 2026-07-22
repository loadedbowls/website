import { getSiteConfig, requireSiteAdmin, setSiteConfig } from "./_site-store.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      return res.status(200).json({ config: await getSiteConfig() });
    } catch (error) {
      return res.status(500).json({ error: error.message });
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

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
