import { getVisitStats } from "./_analytics-store.js";
import { requireAdmin } from "./_order-store.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) return;

  const requestedDays = Number.parseInt(req.query?.days, 10);
  const days = Number.isFinite(requestedDays)
    ? Math.min(730, Math.max(1, requestedDays))
    : 30;

  try {
    const daily = await getVisitStats(days);
    return res.status(200).json({
      daily,
      definition: "Eenzelfde browser of toestel telt maximaal een keer per kalenderdag als unieke bezoeker."
    });
  } catch (error) {
    console.error("Could not load analytics stats:", error);
    return res.status(500).json({ error: "Bezoekersstatistieken konden niet worden geladen." });
  }
}
