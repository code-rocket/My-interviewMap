'use strict';

const path = require('path');

module.exports = {
    dev: {
        assetsPublicPath: '/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsSubDirectory: 'static',// 编译输出的二级目录
        contentBase: path.join(__dirname, '../dist'),       //"./dist/"
        entryFolderPath: './src/pages/**/*.js',//入口文件夹目录，从中寻找目标文件

        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8027,//端口号
        inline: true,
        autoOpenBrowser: true,//是否自动打开浏览器
        errorOverlay: true,//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
        hot: true,//热启动
        quiet: true,//启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
        usePostCSS: true,//补全css代码的兼容性前缀

        /** Source Maps */
        devCssSourceMap: true,// 是否开启 cssSourceMap
        devJsSourceMap: false,// 是否开启 jsSourceMap
    },
    build: {
        // Paths
        assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsRoot: path.resolve(__dirname, '../dist'),// 编译输出的静态资源路径
        assetsSubDirectory: 'static',// 编译输出的二级目录
        entryFolderPath: './src/pages/**/*.js',//入口文件夹目录，从中寻找目标文件

        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, // 是否开启 gzip
        productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report || false,

        extract: true,//是否需要分离出js中的css代码,然后分别进行打包
        usePostCSS: true,//补全css代码的兼容性前缀

        /** Source Maps */
        prodCssSourceMap: false,// 是否开启 cssSourceMap
        prodJsSourceMap: false,// 是否开启 jsSourceMap
    }
};
