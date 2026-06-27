const DELIVERY_RADIUS_KM = 6;

const SHOP = {
  lat: 51.0472,
  lon: 3.7274,
  radiusKm: DELIVERY_RADIUS_KM
};

function distanceKm(a, b) {
  const earthKm = 6371;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return earthKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const address = String(req.body?.address || "").trim();

  if (address.length < 6) {
    return res.status(400).json({
      ok: false,
      error: "Vul een volledig leveradres in."
    });
  }

  try {
    const query = `${address}, Gent, Belgium`;
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("q", query);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "LoadedBowls/1.0 (loadedbowls.be)"
      }
    });

    if (!response.ok) {
      throw new Error("Adres kon niet gecontroleerd worden.");
    }

    const results = await response.json();
    const match = results[0];

    if (!match) {
      return res.status(404).json({
        ok: false,
        error: "We konden dit adres niet vinden. Controleer straat, nummer en gemeente."
      });
    }

    const customer = {
      lat: Number(match.lat),
      lon: Number(match.lon)
    };
    const distance = distanceKm(SHOP, customer);
    const insideRadius = distance <= SHOP.radiusKm;

    return res.status(200).json({
      ok: insideRadius,
      distanceKm: Number(distance.toFixed(2)),
      radiusKm: SHOP.radiusKm,
      address: match.display_name,
      error: insideRadius
        ? null
        : `Levering kan enkel binnen ${SHOP.radiusKm} km van Loaded Bowls in Gent. Dit adres ligt ongeveer ${distance.toFixed(1)} km ver.`
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || "Adres kon niet gecontroleerd worden."
    });
  }
}
