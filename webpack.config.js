const path = require('path')
const glob = require('glob')
const webpack = require('webpack');
const { readdirSync } = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const moduleDirectories = getDirectories("./skewer/build/Page/")
let entryObject = {}
moduleDirectories.forEach(moduleFolder => {
  function createEntryObjectFor(asset) {
    const assetDir = `./skewer/build/Page/${moduleFolder}/web/${asset}/`;
    const devDir = `./skewer/build/Page/${moduleFolder}/web/${asset}/dev/`;
    const files = glob.sync(`*.${asset}`, { cwd: devDir, nodir: true })
    if (files.length) {
      files.forEach(entryName => {
        // для сss нужно специальный массив, где name пишется без своего файлового расширения
        assetName = asset === "css"
          ? path.basename(entryName, ".css")
          : entryName
        name = `${assetDir}${assetName}`
        looker = `${devDir}${entryName}`
        entryObject[name] = looker
      })
    }
  }
  createEntryObjectFor('js')
  createEntryObjectFor('css')
})

module.exports = {

  mode: 'development',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true
      })
    ],
  },
  entry: entryObject,
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          // style-loaders
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: false,
            }
          },
          { loader: 'postcss-loader', },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',

      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  stats: 'minimal'
};