import { requireAdmin } from "./_order-store.js";
import { savePushSubscription } from "./_push.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!requireAdmin(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const count = await savePushSubscription(req.body?.subscription || req.body);
    return res.status(200).json({ ok: true, count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
