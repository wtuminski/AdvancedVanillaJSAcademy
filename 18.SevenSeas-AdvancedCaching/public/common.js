(function () {
  'use strict';

  // @ts-check
  /** @param {string} path */
  const registerServiceWorker = (path) => {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.register(path);
    }
  };

  //@ts-check

  //
  // Inits & Event Listeners
  //

  registerServiceWorker("sw.js");

})();
