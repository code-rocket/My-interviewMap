/**
 * utils - 为整个脚手架提供方法
 */

'use strict';
const path = require('path');//path模块提供了用于处理文件和目录路径的使用工具
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('../config');//config目录中的index文件


//这是一个json文件，加载过来之后，会变成一个对象
const packageConfig = require('../package123213.json');

/**
 * assetsPath
 * 它根据 nodejs 的 proccess.env.NODE_ENV 变量，来判断当前运行的环境。
 * 返回不同环境下面的不同static目录位置拼接给定的_path参数。
 * @param _path  接受一个_path参数
 * @returns {*|string} 返回static目录位置拼接的路径
 */
exports.assetsPath = function (_path) {

    /*
     * 1、 path.join(__dirname, url),  __dirname变量值代表 程序 运行的根目录。
     * 2、 path.resolve 方法该方法以应用程序 根目录 为起点
     */

    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};


/**
 * get webpack entry
 */
exports.getEntry = function () {
    let entry = {};
    //读取src目录所有page入口
    glob.sync(config.build.entryFolderPath).forEach(function (name) {
        const start = name.indexOf('src/') + 4,
            end = name.length - 3;
        const eArr = [];
        let n = name.slice(start, end);
        n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口
        n = n.split('/')[1];
        eArr.push(name);
        entry[n] = eArr;
    });
    entry['main'] = './src/main.js';//额外挂载 main.js 作为入口文件
    return entry;
};


/**
 * styleLoaders
 * Generate loaders for standalone style files (outside of .vue)
 * 该方法只是根据cssLoaders中的方法配置，生成不同loaders。然后将其返回。
 * @param options
 * @returns {Array}
 */
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }
    return output;
};

/**
 * cssLoaders
 * @param options   接受一个options参数，参数还有的属性：sourceMap、usePostCSS。
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
exports.cssLoaders = function (options) {
    options = options || {};

    //定义 'style-loader' , 'css-loader' 和 'postcss-loader',作为基础配置
    const styleLoader = {
        loader: 'style-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    /*-----------------------------------------------------------------------------*/
    /*   补全css代码的兼容性前缀             			                               */
    /*   需要在根目录新建一个.postcssrc.js 配置文件，不然会报找不到 postcss config 的错  */
    /*   还需要依次安装：
    /*   cnpm i postcss-import postcss-loader postcss-url --save-dev                */
    /*-----------------------------------------------------------------------------*/
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
        }
    };

    /**
     * 生成加载器 - generate loader string to be used with extract text plugin
     * @param loader                loader 的名称
     * @param loaderOptions         loader 的配置项
     * @returns {*}
     */
    function generateLoaders(loader, loaderOptions) {
        const loaders = [];
        /*----------------------------------------------------------------------------------------*/
        /*  Extract CSS when that option is specified (which is the case during production build) */
        /*  是否需要分离出js中的css代码,然后分别进行打包                                               */
        /*  此项目中，development 时不分离， production 时 分离                                      */
        /*----------------------------------------------------------------------------------------*/
        if (options.extract) {
            loaders.push({
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            });
        }

        /**
         * 在 开发环境 我们还是使用 style-loader, 在 生产环境 使用 miniCssExtractPlugin.loader
         * 否则将会报错：window is not define
         * https://github.com/webpack-contrib/mini-css-extract-plugin
         */
        if (process.env.NODE_ENV === "development") {
            loaders.push(styleLoader);//注入 styleLoader
        }

        loaders.push(cssLoader); //注入 cssLoader

        //注入loader的相关配置
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        //是否需要补全css代码的兼容性前缀配置，需要的话把 postcssLoader 注入
        if (options.usePostCSS) {
            loaders.push(postcssLoader);
        }
        return loaders;
    }

    /**
     * 同时，它返回一个对象，其中包含了css预编译器(less、sass、stylus)loader生成方法等,
     * 如果你的文档明确只需要一门css语言，那么可以稍微清楚一些语言，同时可以减少npm包的大小(毕竟这是一个令人烦躁的东西)
     */
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
    // 以上参考 ： https://vue-loader.vuejs.org/en/configurations/extract-css.html
};
