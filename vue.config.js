const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')    //引入插件
const productionGzipExtensions = ['js', 'css']      //压缩js 和css文件

module.exports = {
    configureWebpack: config => {
        // 添加插件
        config.plugins.push(
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.join(__dirname, './src/utils/skeleton.js'),
                    }
                },
                minimize: true,
                quiet: true,
                router:{
                    mode:'history',
                    routes:[
                        // {
                        //     path: '/',
                        //     skeletonId: 'skeleton1'
                        // },
                        {
                            path: '/am',
                            skeletonId: 'skeleton2'
                        }
                    ]
                }
            }),
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
            }),
            // 配置压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            //maxChunks：使用大于或等于 1 的值，来限制 chunk 的最大数量。使用 1 防止添加任何其他额外的 chunk，这是因为entry/main chunk 也会包含在计数之中。
            //minChunkSize: 设置 chunk 的最小大小。
            //在合并 chunk 时，webpack 会尝试识别出具有重复模块的 chunk，并优先进行合并。任何模块都不会被合并到 entry   chunk 中，以免影响初始页面加载时间。
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
                minChunkSize: 100
            })
        );
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // configureWebpack: {
    //     plugins: [
    // new SkeletonWebpackPlugin({
    //     webpackConfig: {
    //         entry: {
    //             app: path.join(__dirname, './src/utils/skeleton.js'),
    //         },
    //     },
    //     minimize: true,
    //     quiet: true,
    //     router: {
    //         mode: 'hash',
    //         routes: [
    //             {
    //                 path: '/',
    //                 skeletonId: 'skeleton1'
    //             },
    //             {
    //                 path: '/am',
    //                 skeletonId: 'skeleton2'
    //             }
    //         ]
    //     }
    // }),
    // new webpack.DllReferencePlugin({
    //     context: process.cwd(),
    //     manifest: require('./public/vendor/vendor-mainfest.json')
    // }),
    // // 将dll注入到生成的html模板中
    // new AddAssetHtmlPlugin({
    //     // dll文件位置
    //     filepath: path.resolve(__dirname, './public/vendor/*.js'),
    //     // dll 引用路径
    //     publicPath: './vendor',
    //     // dll最终输入的目录
    //     outputPath: './vendor',
    //     includeSourcemap: false
    // })
    //     ]
    // },
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }])
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/web-service': {
                target: 'http://localhost:9092',
               /* target: 'http://114.212.174.143:9092',*/
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            },
            '/client-service': {
                target: 'http://localhost:9093',
             /*   target: 'http://114.212.174.143:9093',*/
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            },
            '/console-service': {
                target: 'http://114.212.174.143:9091',
               /* target: 'http://localhost:9091',*/
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            },
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}
