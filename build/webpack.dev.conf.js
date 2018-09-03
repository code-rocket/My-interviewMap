'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const portfinder = require('portfinder');

const utils = require('./utils');

//webpack config
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

//page config information
const pageInfo = require('../src/pages/page.config');
const pagesConfig = pageInfo.pagesConfig;
const commandConfig = pageInfo.command;


const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);




//将两个配置对象，进行合并( 合并了base中的webpack配置项 )
const devWebpackConfig = merge(baseWebpackConfig, {

    //devSever的一些配置项了。其中包块客户端报错级别、端口、host等等
    devServer: {

        /**
         * 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息, 可能的值有 none, error, warning 或者 info（默认值）
         */
        clientLogLevel: 'warning',
        contentBase: config.dev.contentBase,// since we use CopyWebpackPlugin. false, 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        /**
         * 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
         * 通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制：
         */
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
            ],
        },
        publicPath: config.dev.assetsPublicPath,
        host: HOST || config.dev.host, //默认是 localhost
        port: PORT || config.dev.port,//指定要监听请求的端口号
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
        open: config.dev.autoOpenBrowser,//是否自动打开浏览器
        hot: config.dev.hot || true,//启用 webpack 的模块热替换特性
        overlay: config.dev.errorOverlay,//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
        quiet: config.dev.quiet,//启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。

    },
    //新增的plugins
    plugins: [
        require('autoprefixer'),
        //定义process.env
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),

        new ExtractTextPlugin({
            filename: 'static/css/[name].[hash:7].css'
        }),
        //设置每一次build之前先删除dist
        new CleanWebpackPlugin(
            ['dist/*',],　     //匹配删除的文件
            {
                root: __dirname,   //根目录
                verbose: true,    //开启在控制台输出信息
                dry: false     //启用删除文件
            }
        ),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
    ]
});

/**
 * creat public path List (script / style)
 * @param List
 * @returns {*}
 */
let creatPublicList = (List) => {
    return List.map(url => {
        return path.resolve(__dirname, `../src/` + url);
    });
};

/**
 * modulesConfigHandle
 * @param page
 */
let modulesConfigHandle = (page) => {
    const defaultTit = 'My interviewMap';
    const type = page.type || 'pages';
    //mormal page entry need common script and css
    devWebpackConfig.entry[page.name] = type === 'pages' ? [
        ...creatPublicList(commandConfig.css),//public style
        ...creatPublicList(commandConfig.js),//public script
    ] : [];
    //entry list concat
    devWebpackConfig.entry[page.name].push(
        path.resolve(__dirname, `../src/${type}/${page.jsEntry}`),//script for current page
        path.resolve(__dirname, `../src/${type}/${page.html}`)//page for current page
    );
    console.log(devWebpackConfig.entry[page.name]);
    devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
        filename: path.join(__dirname, (page.name === 'index' ? `../dist/` : `../dist/${type}/`) + `${page.name}.html`),
        template: path.join(__dirname, `../src/${type}/${page.html}`),
        inject: true,
        chunks: [page.name],
        inlineSource: '.(js|css)$',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        chunksSortMode: 'dependency',
        title: type === 'pages' ? (page.title || defaultTit) : defaultTit
    }))
};


//add entry and plugins
if (pagesConfig && Array.isArray(pagesConfig)) {
    pagesConfig.map(page => {
        modulesConfigHandle(page)
    })
}

//确保启动程序时，如果端口被占用时，会通过portfinder来发布新的端口，然后输出运行的host字符串。
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
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }));

            resolve(devWebpackConfig)
        }
    })
});
