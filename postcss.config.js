module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 5 versions']
        }),

        // require("postcss-plugin-px2rem")({'remUnit': 75, 'baseDpr': 2}),

        /**
         * postcss-url 和 postcss-import 与 extract-text-webpack-plugin或者 mini-css-extract-plugin 有直接冲突，
         * 将导致打包后的css内引用路径的错误，以及import的路径错误
         * 去掉 postcss.config 中的相关配置即可
         **/
        // require('postcss-url')(),
        // require('postcss-import')(),
    ]
};
