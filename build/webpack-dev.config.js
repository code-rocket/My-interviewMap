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
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const utils = require('./utils');

//webpack config
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');


const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const Port = PORT || config.dev.port;


/*-------------------------------------------------------*/
/*   merge config (base and dev)             						 */
/*   将两个配置对象，进行合并( 合并了base中的webpack配置项 )  */
/*-------------------------------------------------------*/
const devWebpackConfig = merge(baseWebpackConfig, {
    devServer: {
        /**
         * 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息, 可能的值有 none, error, warning 或者 info（默认值）
         */
        clientLogLevel: 'warning',
        contentBase: config.dev.contentBase,// since we use CopyWebpackPlugin. false, 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        /**
         * 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html(定向到特定页面)。通过传入以下启用：
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
        compress: false,
        //这个配置属性用来控制编译的时候shell上的输出内容
        stats: {
            chunks: false
        },
    },
    //add plugins
    plugins: [
        //定义process.env
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),

        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),

        //autoprefixer
        require('autoprefixer'),

        //单独提取css
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

        new BrowserSyncPlugin({
            host: 'localhost',
            port: Port,//指定要监听请求的端口号
            proxy: 'http://localhost:' + Port + '/',
            open: true,
            files: [
                {
                    match: ['**/*.hbs'],
                    fn: function (event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
        }, {
            reload: false
        })
    ],
});


//page config information
const commandConf = require('../src/page.config').command;
const pageConf = require('../src/page.config').pages;

/*-------------------------------*/
/*       add command entry       */
/*-------------------------------*/
if (commandConf) {
    const CommandJSConf = commandConf.js;
    if (CommandJSConf && Array.isArray(CommandJSConf)) {
        CommandJSConf.map(conf => {
            devWebpackConfig.entry[conf.name] = conf.path;
        })
    }
}

/*-------------------------------*/
/*     add entry and plugins     */
/*-------------------------------*/
if (pageConf && Array.isArray(pageConf)) {
    pageConf.map(page => {
        if (page.jsEntry && page.name) {
            let _Entry = [];
            //entry list push new js-entry script
            _Entry.push(
                path.resolve(page.jsEntry),//script for current page
            );
            devWebpackConfig.entry[page.name] = _Entry;
        }

        const defaultTit = 'My interviewMap';//default page title

        //add new htmlWebpackPlugin to plugins list
        devWebpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                /*
                * 1、 path.join(__dirname, url),  __dirname变量值代表 程序 运行的根目录。
                * 2、 path.resolve 方法该方法以应用程序 根目录 为起点
                */
                template: path.resolve(page.template),
                filename: path.resolve(page.output),
                title: page.content.title || defaultTit,
                description: page.content.description,
                inject: true,//js 插入位置（ true, body, head, false ）
                inlineSource: '.(js|css)$',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options: https://github.com/kangax/html-minifier#options-quick-reference
                },
                chunks: ['main', page.name], // 排序顺序
                chunksSortMode: 'dependency',//'dependency' - 按照不同文件的依赖关系来排序, 'manual' - 手动排序
            })
        )
    });
}
//

/*-------------------------------------------------------------------------------------*/
/*   start by Portfinder           						 															 					 */
/*   确保启动程序时，如果端口被占用时，会通过portfinder来发布新的端口，然后输出运行的host字符串  */
/*-------------------------------------------------------------------------------------*/
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = Port;
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


