const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-mainfest.json')
      }),
        // 将dll注入到生成的html模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输入的目录
        outputPath: './vendor',
        includeSourcemap: false
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }])
  },
  devServer: {
      proxy: {
          '/console-service': {
              target: 'http://localhost:9091',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
              }
          },
      }
  },
  pwa: {
      iconPaths: {
          favicon32     : 'favicon.ico',
          favicon16     : 'favicon.ico',
          appleTouchIcon: 'favicon.ico',
          maskIcon      : 'favicon.ico',
          msTileImage   : 'favicon.ico'
      }
  }
}
