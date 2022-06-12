const webpack = require("webpack");

module.exports = {
    assetsDir: "assets",
	  filenameHashing: false,
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
        })
      ]
  }
}