self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {
      title: "Nieuwe Loaded Bowls order",
      body: "Open de orderapp om de bestelling te bekijken."
    };
  }

  const title = payload.title || "Nieuwe Loaded Bowls order";
  const options = {
    body: payload.body || "Open de orderapp om de bestelling te bekijken.",
    icon: "/assets/loaded-bowls-logo.jpeg",
    badge: "/assets/loaded-bowls-logo.jpeg",
    tag: payload.tag || "loaded-bowls-order",
    data: payload.data || { url: "/mobile-orders.html" },
    vibrate: [180, 80, 180],
    requireInteraction: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/mobile-orders.html";
  event.waitUntil((async () => {
    const clientsList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clientsList) {
      if (client.url.includes(url) && "focus" in client) return client.focus();
    }
    return self.clients.openWindow(url);
  })());
});
