(function () {
  'use strict';

  // @ts-check

  /**
   * @param {FetchEvent} event
   * @param {Response} response
   * @param {string} cacheName
   */
  const cacheResponse = (event, response, cacheName) => {
    const responseCopy = response.clone();
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        return cache.put(event.request, responseCopy);
      })
    );
  };

  /**
   * @param {Request} request
   * @param {(response: Response)=>void=} cacheResponse
   */
  const makeQuery = (request, cacheResponse) =>
    fetch(request).then((response) => {
      cacheResponse?.(response);
      return response;
    });

  /**
   * @param {Request} request
   * @param {'network-first' | 'cache-first'} cachingStrategy Defaults to "network-first"
   * @param {string} alternativeCachedFile
   * @param {(response: Response)=>void=} cacheResponse
   * @return {Promise<Response>}
   */
  const handleRequest = async (
    request,
    cachingStrategy = "network-first",
    alternativeCachedFile,
    cacheResponse
  ) => {
    switch (cachingStrategy) {
      case "cache-first":
        const responseFromCache = await caches.match(request);
        if (responseFromCache) return responseFromCache;
        try {
          return await makeQuery(request, cacheResponse);
        } catch {
          return caches.match(alternativeCachedFile);
        }
      case "network-first":
      default:
        try {
          return await makeQuery(request, cacheResponse);
        } catch {
          return (
            (await caches.match(request)) ?? caches.match(alternativeCachedFile)
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

})();
