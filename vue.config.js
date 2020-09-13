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
  devServer: {
      proxy: {
          '/portal-service': {
              target: 'http://localhost:9090',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
              }
          }
      }
  },
}
