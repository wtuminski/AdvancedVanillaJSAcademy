// @ts-check
/** @param {string} path */
export const registerServiceWorker = (path) => {
  if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register(path);
  }
};

/**
 * @param {FetchEvent} event
 * @param {Response} response
 * @param {string} cacheName
 */
export const cacheResponse = (event, response, cacheName) => {
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
export const handleRequest = async (
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
