const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const glob = require("glob");
const purifyCssWebpack = require("purifycss-webpack");//消除冗余的css
const CopyWebpackPlugin = require("copy-webpack-plugin");//静态资源输出

const utils = require('./utils');
const config = require('../config');
const rules = require("./webpack.rules.conf.js");
const webpackCreateTemp = require('./webpack.create.temp');


const baseWebpackConfig = {
    entry: utils.getEntry(),
    module: {
        rules: [...rules]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    //将外部变量或者模块加载进来
    externals: {
        // 'jquery': 'window.jQuery'
    },
    plugins: [
        // 全局暴露统一入口
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default'],
        }),

        //copy custom static assets ( 静态资源输出 )
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, '../src/assets/img'),
                to: path.resolve(__dirname, '../dist/static/img'),
                ignore: ['.*']
            }
        ]),

        //消除冗余的css代码
        // new purifyCssWebpack({
        //     paths: glob.sync(path.join(__dirname, "../src/pages/*/*.hbs"))
        // }),

    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }

};

module.exports = merge(webpackCreateTemp, baseWebpackConfig);
