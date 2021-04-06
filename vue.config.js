const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

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
                    mode:'hash',
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
            '/console-service': {
                target: 'http://localhost:9091',
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            },
            '/blsh-service': {
                target: 'http://localhost:9092',
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            },
            '/blsh-h5-service': {
                target: 'http://localhost:9093',
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
