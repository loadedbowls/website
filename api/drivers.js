import { listDrivers, publicDriver, removeDriver, saveDriver } from "./_driver-store.js";
import { requireAdmin } from "./_order-store.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!requireAdmin(req, res)) return;

  try {
    if (req.method === "GET") {
      const drivers = await listDrivers({ includePins: true });
      return res.status(200).json({ drivers });
    }

    if (req.method === "POST") {
      const driver = await saveDriver(req.body || {});
      return res.status(200).json({ driver });
    }

    if (req.method === "DELETE") {
      const id = req.query?.id || req.body?.id;
      if (!id) return res.status(400).json({ error: "Chauffeur ontbreekt." });
      await removeDriver(id);
      return res.status(200).json({ ok: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
