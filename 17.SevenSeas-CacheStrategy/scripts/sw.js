import { handleRequest } from "./utils/serviceWorkerUtils.js";
import { includesOneOf } from "./utils/stringUtils.js";

const coreAssets = [
  "index.html",
  "dice.html",
  "treasure.html",
  "offline.html",
  "homePage.js",
  "dicePage.js",
  "treasurePage.js",
  "css/main.css",
  "favicon.ico",
];

self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open("SevenSeas").then((cache) => {
      coreAssets.forEach((asset) => cache.add(new Request(asset)));
      return cache;
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Get the request
  const request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // network-first files
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(handleRequest(request, "network-first", "offline.html"));
    return;
  }

  // cache-first files
  if (
    includesOneOf(request.headers.get("Accept"), [
      "text/css",
      "text/javascript",
      "image",
    ]) ||
    request.url.includes(".js")
  ) {
    event.respondWith(handleRequest(request, "cache-first"));
    return;
  }
});
