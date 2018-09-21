const config = require('../config');
const utils = require('./utils');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const rules = [
    // {test: /\.(htm|html)/, use: ["html-withimg-loader"] /* html中的img标签*/},
    {test: /\.(htm|html)/, loader: 'html-loader'},
    {test: /\.(tpl|ejs)$/, loader: 'ejs-loader'},
    {
        test: /\.hbs$/, loader: 'handlebars-loader',
        query: {
            helperDirs: [
                path.resolve(__dirname, '..', 'entries/helpers')
            ],
            partialDirs: [
                path.join(__dirname, '../src', 'pages'),
                path.join(__dirname, '../src/pages', 'layouts'),

                path.join(__dirname, '../src', 'components'),
                path.join(__dirname, '../src', 'components/nav-bar'),
                path.join(__dirname, '../src', 'components/side-menu'),
                path.join(__dirname, '../src', 'components/hamburger'),
                path.join(__dirname, '../src', 'components/page-title'),
            ]
        }
    },
    {
        test: /\.js$/, use: ["babel-loader"],
        // 不检查node_modules下的js文件
        exclude: "/node_modules/",
        include: [resolve('src'), resolve('entries')]
    },
    {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [{
            loader: "url-loader",
            options: {
                limit: 5 * 1024, //小于这个时将会已base64位图片打包处理(生成js代码中混入)
                name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                publicPath: './'
            }
        }]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
            publicPath: '../../'
        }
    },
    {
        test: /\.svg$/,
        loader: 'file-loader',
    },
    //如要生成svg spring图的话自行额外处理
    // {
    //     test: /\.svg$/,
    //     loader: 'svg-sprite-loader',
    //     include: [resolve('src/assets/svg')],
    //     options: {
    //         symbolId: 'icon-[name]'
    //     }
    // },
];

const isDev = process.env.NODE_ENV === "development";

const styleRules = utils.styleLoaders(
    isDev ? {sourceMap: config.dev.devCssSourceMap, usePostCSS: config.dev.usePostCSS} :
        {
            sourceMap: config.build.prodCssSourceMap,
            extract: config.build.extract,//是否需要分离出js中的css代码,然后分别进行打包
            usePostCSS: config.build.usePostCSS,//补全css代码的兼容性前缀
        }
);

module.exports = [...rules, ...styleRules];
