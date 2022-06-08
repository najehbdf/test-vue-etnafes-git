const path = require("path");
const axios = require('axios')
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        headless: true,
        maxConcurrentRoutes: 20,
        timeout: 0,
        staticDir: path.resolve("dist"),
        //routes: ["/", "/packs", "/hebergementlibre", "/artisans", "/allvilles"]
       routes: ["/", "/packs", "/hebergementlibre", "/artisans", "/allvilles", "/contact"]
      //  routes: ["/", "/packs", "/hebergementlibre", "/artisans", "/allvilles", "/contact", "/resultatsHome", "/resultats"]
      })
    ]
  }
};
