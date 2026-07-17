import { findDriverByPin, publicDriver } from "./_driver-store.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const driver = await findDriverByPin(req.body?.pin);
  if (!driver) return res.status(401).json({ error: "Pincode niet herkend." });

  return res.status(200).json({ driver: publicDriver(driver) });
}
