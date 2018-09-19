const utils = require('./utils');
const htmlWebpackPlugin = require("html-webpack-plugin");// html模板

/**
 * 获取html-webpack-plugin参数的方法
 * @param name
 * @param chunks
 * @returns {{template: string, filename: (*|string), inject: boolean, hash: boolean, chunks: *, minify: *}}
 */
let getHtmlConfig = function (name, chunks) {
    return {
        //webpack 默认dist下根目录 index.hbs 为入口文件，除非特别指定
        template: `./src/pages/${name}/index.hbs`,
        filename: `${name}.html`,
        favicon: './favicon.ico',
        title: `${name}`,
        description: ' | service for future',
        inject: true,
        inlineSource: '.(js|css)$',
        hash: true, //开启hash  ?[hash]
        chunks: chunks,
        chunksSortMode: 'dependency',//'dependency' - 按照不同文件的依赖关系来排序, 'manual' - 手动排序
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
    };
};

//配置页面
const entryObj = utils.getEntry();

const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: 'My interviewMap | ' + element,
        type: element === 'main' ? 'main' : 'normal',
        chunks: ['chunk-vendor', 'chunk-bootstrap', 'main', 'chunk-common', element],
    })
});

const webpackTempConf = {
    plugins: []
};

//自动生成html模板
htmlArray.forEach((element) => {
    if (element.type === 'normal') {
        webpackTempConf.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
    }
});

module.exports = webpackTempConf;
