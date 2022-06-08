const path = require("path");
const axios = require('axios')
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        headless: true,
        maxConcurrentRoutes: 10,
        timeout: 0,
        staticDir: path.resolve("dist"),
        routes: ["/", "/packs", "/hebergementlibre", "/artisans"]
      })
    ]
  }
};
