const DELIVERY_RADIUS_KM = 6;

const SHOP = {
  lat: 51.042810087083,
  lon: 3.7247852080627,
  radiusKm: DELIVERY_RADIUS_KM
};

function roundRouteMinutes(seconds) {
  return Math.max(5, Math.ceil(Number(seconds || 0) / 300) * 5);
}

function fallbackRouteMinutes(distance) {
  const estimatedMinutes = (Number(distance || 0) / 20) * 60 + 5;
  return Math.max(10, Math.ceil(estimatedMinutes / 5) * 5);
}

async function drivingRoute(customer, straightLineDistance) {
  const routeUrl = new URL(
    `https://router.project-osrm.org/route/v1/driving/${SHOP.lon},${SHOP.lat};${customer.lon},${customer.lat}`
  );
  routeUrl.searchParams.set("overview", "false");
  routeUrl.searchParams.set("steps", "false");

  try {
    const response = await fetch(routeUrl, {
      headers: { "User-Agent": "LoadedBowls/1.0 (loadedbowls.be)" },
      signal: AbortSignal.timeout(7000)
    });
    const data = await response.json().catch(() => ({}));
    const route = data.routes?.[0];
    if (!response.ok || !route?.duration) throw new Error("Geen autoroute gevonden.");

    return {
      routeMinutes: roundRouteMinutes(route.duration),
      routeDistanceKm: Number((Number(route.distance || 0) / 1000).toFixed(2)),
      routeSource: "road"
    };
  } catch {
    return {
      routeMinutes: fallbackRouteMinutes(straightLineDistance),
      routeDistanceKm: null,
      routeSource: "estimate"
    };
  }
}

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

function normalizePlace(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function requestedPostcode(address) {
  return String(address).match(/\b([1-9]\d{3})\b/)?.[1] || "";
}

function explicitlyRequestsGent(address) {
  return /\b(gent|ghent)\b/i.test(String(address));
}

function resultIsInGent(match) {
  const details = match?.address || {};
  const placeFields = [
    details.city,
    details.town,
    details.village,
    details.municipality,
    details.city_district
  ].map(normalizePlace);

  return placeFields.some((place) => place === "gent" || place === "ghent");
}

function resultHasPostcode(match, postcode) {
  if (!postcode) return true;
  const resultPostcodes = String(match?.address?.postcode || "")
    .split(/[;,]/)
    .map((value) => value.trim());
  return resultPostcodes.includes(postcode);
}

function selectAddressMatch(results, address) {
  const postcode = requestedPostcode(address);
  const requiresGent = explicitlyRequestsGent(address);

  return results.find((match) => {
    if (requiresGent && !resultIsInGent(match)) return false;
    if (postcode && !resultHasPostcode(match, postcode)) return false;
    return Number.isFinite(Number(match?.lat)) && Number.isFinite(Number(match?.lon));
  }) || null;
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
    const query = /\b(belgie|belgië|belgium|belgique)\b/i.test(address)
      ? address
      : `${address}, Belgium`;
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "8");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("countrycodes", "be");
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
    const match = selectAddressMatch(Array.isArray(results) ? results : [], address);

    if (!match) {
      return res.status(404).json({
        ok: false,
        error: explicitlyRequestsGent(address)
          ? "We konden dit adres niet eenduidig in Gent vinden. Voeg de postcode toe en controleer straat en huisnummer."
          : "We konden dit adres niet vinden. Controleer straat, huisnummer, postcode en gemeente."
      });
    }

    const customer = {
      lat: Number(match.lat),
      lon: Number(match.lon)
    };
    const distance = distanceKm(SHOP, customer);
    const insideRadius = distance <= SHOP.radiusKm;
    const route = insideRadius
      ? await drivingRoute(customer, distance)
      : { routeMinutes: null, routeDistanceKm: null, routeSource: null };

    return res.status(200).json({
      ok: insideRadius,
      distanceKm: Number(distance.toFixed(2)),
      radiusKm: SHOP.radiusKm,
      address: match.display_name,
      latitude: customer.lat,
      longitude: customer.lon,
      routeMinutes: route.routeMinutes,
      routeDistanceKm: route.routeDistanceKm,
      routeSource: route.routeSource,
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
