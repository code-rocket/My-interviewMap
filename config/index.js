'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');


module.exports = {
    dev: {
        assetsPublicPath: '',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsSubDirectory: 'static',// 编译输出的二级目录
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8028,//端口号
        inline: true,
        autoOpenBrowser: true,//是否自动打开浏览器
        errorOverlay: true,//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
        hot: true,//热启动
        quiet: true,//启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。

    },
    build: {}

};
