import { cacheResponse, handleRequest } from "./utils/serviceWorkerUtils.js";
import { includesOneOf } from "./utils/stringUtils.js";

const coreAssets = ["offline.html", "css/main.css", "favicon.ico"];

self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open("core").then((cache) => {
      coreAssets.forEach((asset) => cache.add(new Request(asset)));
      return cache;
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Get the request
  const request = event.request;

  if (includesOneOf(request.url, coreAssets)) return;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // network-first files
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      handleRequest(request, "network-first", "offline.html", (response) =>
        cacheResponse(event, response, "pages")
      )
    );
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
    const cacheName = request.url.includes(".css")
      ? "css"
      : request.url.includes(".js")
      ? "js"
      : "images";
    // @ts-check
    event.respondWith(
      handleRequest(request, "cache-first", undefined, (response) =>
        cacheResponse(event, response, cacheName)
      )
    );
    return;
  }
});
