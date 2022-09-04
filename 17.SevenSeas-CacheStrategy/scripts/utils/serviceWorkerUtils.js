// @ts-check
/** @param {string} path */
export const registerServiceWorker = (path) => {
  if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register(path);
  }
};

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
export const handleRequest = async (
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
