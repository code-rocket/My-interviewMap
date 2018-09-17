const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const utils = require('./utils');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const env = require('../config/' + process.env.env_config + '.env');

const prodWebpackConfig = {
    mode: 'production', // 通过 mode 声明生产环境
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[contenthash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[contenthash:8].js'),
        publicPath: config.build.assetsPublicPath
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [

        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),

        //删除dist目录
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),

        // extract css into its own file 在打包的css文件也增加了块和hash尾缀
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:10].css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash:10].css')
        }),
    ],
    optimization: {
        /**
         * 它的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
         * 所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了
         * 在多页面项目中，盲目设置，会造成所依赖引用的js模块无法正常运行使用
         **/
        // runtimeChunk: {
        //     name: 'manifest'
        // },
        /**
         * webpack4只需要设置 mode:produciton，默认optimization.minimize是true,所以js可以自动帮你打包混淆js代码.
         * 但是自定义minimizer后，webpack默认配置会取消掉,所以还需要添加 uglifyjs压缩js.
         */
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        safari10: true
                    }
                },
                sourceMap: config.build.prodJsSourceMap,
                cache: true,
                parallel: true
            }),
            // Compress extracted CSS. We are using this plugin so that possible
            // duplicated CSS from different components can be deduped.
            //优化css文件的，主要就是压缩css代码
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),//用于优化CSS的CSS处理器
                cssProcessorOptions: config.build.prodCssSourceMap ?
                    {
                        parser: require('postcss-safe-parser'), //in some case , safe is remove, use parser
                        // safe: true,
                        map: {inline: false}
                    } :
                    {parser: require('postcss-safe-parser')},
                canPrint: true,//指示插件是否可以以將消息列印到控制台
            }),
        ],
        // 提取公共代码
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    name: 'chunk-vendor',  // 打包后的文件名，任意命名
                    test: /[\\/]node_modules[\\/]/,  // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    priority: 10,// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                bootstrap: {
                    name: 'chunk-bootstrap', // 单独将 bootstrap 拆包
                    priority: 20, // 权重要大于 vendor 和 app 不然会被打包进 vendor 或者 app
                    test: /[\\/]node_modules[\\/]bootstrap[\\/]/
                },
                utils: { // 抽离自己写的公共代码，common这个名字可以随意起
                    name: 'chunk-common',  // 任意命名
                    // test: /[\\/]src[\\/]js[\\/]/,  // ‘src/js’ 下的js文件
                    chunks: 'initial',
                    minSize: 0,    // 只要超出0字节就生成一个新包
                    minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
                },
            }
        },
    },
    module: {
        rules: []
    },

};


/**
 * 开启 gzip
 * 打包后你生成的文件就会包含一个xx.xx.gz二进制格式的压缩文件
 * 但是我们打包后引用的是xx.xx.js，并不是这个.gz的压缩文件，需要后端配合修改一下nginx的配置，
 * 增加gzip_static on。所以仅仅有gzip on是不行滴。
 * ================================================
 * Request Header ：
 *      Accept-Encoding: gzip, deflate, br
 * Response Header ：
 *      Content-Encoding: gzip
 * ================================================
 * 注意: compression-webpack-plugin 如果是1.X的版本，则参数asset 存在。如果是2.x的版本，那么参数 asset必须换成 filename
 * 参考：
 * https://github.com/webpack-contrib/compression-webpack-plugin
 * http://www.css88.com/doc/webpack2/plugins/compression-webpack-plugin/
 */
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    prodWebpackConfig.plugins.push(
        new CompressionWebpackPlugin(
            {
                //目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
                filename: '[path].gz[query]',
                //可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
                algorithm: 'gzip',
                //所有匹配该正则的资源都会被处理。默认值是全部资源。
                test: new RegExp(
                    '\\.(' +
                    config.build.productionGzipExtensions.join('|') +
                    ')$'
                ),
                //只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
                threshold: 10240,
                //只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
                minRatio: 0.8,
            })
    )
}

//打包情况概览插件调用
if (config.build.bundleAnalyzerReport) {
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
