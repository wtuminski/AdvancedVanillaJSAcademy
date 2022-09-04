(function () {
  'use strict';

  // @ts-check

  /** @param {Request} request */
  const makeQuery = (request) =>
    fetch(request).then((response) => {
      return response;
    });

  /**
   * @param {Request} request
   * @param {'network-first' | 'cache-first'} cachingStrategy
   * @param {string} alternativeCacheFilePath Used in "network-first"
   * @return {Promise<Response>}
   */
  const handleRequest = async (
    request,
    cachingStrategy = "network-first",
    alternativeCacheFilePath
  ) => {
    switch (cachingStrategy) {
      case "cache-first":
        const responseFromCache = await caches.match(request);
        return responseFromCache ?? makeQuery(request);
      case "network-first":
      default:
        try {
          return await makeQuery(request);
        } catch {
          return (
            (await caches.match(request)) ??
            caches.match(alternativeCacheFilePath)
          );
        }
    }
  };

  // @ts-check
  /**
   * @param {string} value
   * @param {string[]} searchStrings
   */
  const includesOneOf = (value, searchStrings) =>
    searchStrings.some((searchString) => value.includes(searchString));

  const coreAssets = ["css/main.css", "favicon.ico"];

  self.addEventListener("install", (event) => {
    // Activate immediately
    self.skipWaiting();

    event.waitUntil(
      caches.open("SevenSeas").then((cache) => {
        cache.add(new Request("offline.html"));
        coreAssets.forEach((asset) => cache.add(asset));
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
    if (includesOneOf(request.headers.get("Accept"), ["text/css", "image"])) {
      event.respondWith(handleRequest(request, "cache-first"));
      return;
    }
  });

})();
