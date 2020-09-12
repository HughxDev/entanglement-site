const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
  // "entry": path.join( __dirname, "src/index.html" ),
  "mode": "development",
  "output": {
    "path": path.resolve( __dirname, "dist" ),
    "publicPath": "/",
    "filename": "index.bundle.js",
  },
  "devServer": {
    "compress": true,
    "port": 9000,
  },
  "plugins": [
    new HtmlWebpackPlugin( {
      "template": "public/index.html",
    } ),
    // new Dotenv(),
    new CopyPlugin( {
      "patterns": [
        {
          "from": "public",
        },
      ],
    } ),
  ],
};
