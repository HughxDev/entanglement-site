const webpack = require( 'webpack' );
const path = require( 'path' );
const glob = require( 'glob' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const PurgeCSSPlugin = require( 'purgecss-webpack-plugin' );

// const devMode = process.env.NODE_ENV !== 'production';

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
  "module": {
    "rules": [
      {
        "test": /\.(sa|sc|c)ss$/,
        "use": [
          {
            "loader": MiniCssExtractPlugin.loader,
            "options": {
              "hmr": process.env.NODE_ENV === 'development',
            },
          },
          {
            "loader": 'css-loader',
            "options": {
              "importLoaders": 2,
            },
          },
          // 'postcss-loader',
          {
            "loader": 'postcss-loader', // Run post css actions
            "options": {
              "postcssOptions": {
                "plugins": function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require( 'precss' ),
                    require( 'autoprefixer' ),
                    // [
                    //   "@fullhuman/postcss-purgecss", // use @fullhuman/postcss-purgecss
                    //   {
                    //     "content": [
                    //       path.join( __dirname, "./public/index.html" ),
                    //     ],
                    //   },
                    // ],
                  ];
                },
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        "test": /\.(png|svg|jpe?g|gif|webp)$/,
        "use": [
          'file-loader',
        ],
      },
    ],
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
          "to": "dist",
        },
      ],
    } ),
    new MiniCssExtractPlugin(),
    new PurgeCSSPlugin( {
      "paths": glob.sync( `public/index.html`, { "nodir": true } ),
    } ),
  ],
};
