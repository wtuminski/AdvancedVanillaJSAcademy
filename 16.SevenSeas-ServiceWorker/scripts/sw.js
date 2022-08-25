self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open("SevenSeas").then(function (cache) {
      cache.add(new Request("./offline.html"));
      return cache;
    })
  );
});

self.addEventListener("fetch", function (event) {
  // Get the request
  let request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // HTML files
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return caches.match("offline.html");
        })
    );
  }
});
