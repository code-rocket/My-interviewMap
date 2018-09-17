const path = require('path');
const utils = require('./utils');
const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const webpackConfig = {
    mode: 'development', // 通过 mode 声明开发环境
    output: {
        path: config.dev.assetsRoot,
        // 打包多出口文件
        filename: utils.assetsPath('js/[name].bundle.js'),
        publicPath:config.dev.assetsPublicPath
    },
    // cheap-module-eval-source-map is faster for development
    // 增加了 devtools，通过注释的英文翻译，可以知道cheap-module-eval-source-map使得开发更快
    devtool: config.dev.devtool,

    devServer: {
        /**
         * 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息, 可能的值有 none, error, warning 或者 info（默认值）
         */
        clientLogLevel: 'warning',
        contentBase: config.dev.contentBase,// since we use CopyWebpackPlugin. false, 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        /**
         * 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 about.hbs。通过传入以下启用：
         * 通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制：
         */
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
            ],
        },
        publicPath: config.dev.assetsPublicPath,
        host: HOST || config.dev.host,//默认是 localhost
        port: PORT || config.dev.port,//指定要监听请求的端口号
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
        open: config.dev.autoOpenBrowser,//是否自动打开浏览器
        hot: config.dev.hot || true,//启用 webpack 的模块热替换特性
        overlay: config.dev.errorOverlay,//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
        /**
         * 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
         * 可在之后的 portfinder 中定义输出的内容
         **/
        quiet: config.dev.quiet,
        stats: "errors-only", //stats: "errors-only"表示只打印错误：
        //服务器代理配置项
        proxy: {
            '/test/*': {
                target: 'https://www.baidu.com',
                secure: true,
                changeOrigin: true
            }
        }
    },
    plugins: [
        //定义process.env
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),
        //显示模块加载相对路径插件
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
        new webpack.NoEmitOnErrorsPlugin(),

        // new webpack.DefinePlugin({
        //     'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
        // })
    ],

    module: {
        rules: []
    },
};

const devWebpackConfig = merge(baseWebpackConfig, webpackConfig);

/**
 * start by Portfinder
 * 确保启动程序时，如果端口被占用时，会通过portfinder来发布新的端口，然后输出运行的host字符串
 * https://npm.taobao.org/package/portfinder
 * https://npm.taobao.org/package/friendly-errors-webpack-plugin
 * @type {Promise<any>}
 */
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    notes: [`Create by Broccoli spring( gcx ) <Lensgcx@163.com>: https://github.com/Lensgcx`],
                    messages: [
                        `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
                    ],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }));

            resolve(devWebpackConfig)
        }
    })
});
