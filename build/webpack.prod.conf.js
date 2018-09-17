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
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
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

//打包情况概览插件调用
if (config.build.bundleAnalyzerReport) {
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
