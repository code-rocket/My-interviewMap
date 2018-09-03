let path = require('path');
const webpack = require('webpack');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	// 配置入口
	entry: ['./src/main.js'],
	// 配置出口
	output: {
		path: path.join(__dirname, "../dist"),
		filename: 'static/js/[name].[hash:7].js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.hbs', '.json'],
		alias: {
			'@': resolve('src'),
		}
	},
	devServer: {},
	//加载器
	module: {
		rules: [
			{test: /\.(htm|html)/, loader: 'html-loader'},
			{test: /\.(tpl|ejs)$/, loader: 'ejs-loader'},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				query: {
					helperDirs: [
						path.join(__dirname, '../src', 'helpers')
					],
					partialDirs: [
						path.join(__dirname, '../src', 'layouts'),
						path.join(__dirname, '../src', 'components'),
						path.join(__dirname, '../src', 'pages')
					]
				}
			},
			{
				test: /\.(scss|sass|css)$/,  // pack sass and css files
				// loader: ExtractTextPlugin.extract({
				//         fallback: "style-loader",
				//         use: "css-loader!postcss-loader!sass-loader"
				//     }
				// )
				use: [
					'style-loader',
					{loader: 'css-loader', options: {importLoaders: 2}},  //2代表css-loader后还需要几个loader
					{loader: 'postcss-loader', options: {plugins: [require("autoprefixer")("last 100 versions")]}},
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			},
			{
				//图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
				//如下配置，将小于8192byte的图片转成base64码
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader?limit=8192&name=img/[hash].[ext]',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
				}
			},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			"window.jQuery": "jquery",
			Tether: 'tether',
			'window.Tether': 'tether',
			Popper: ['popper.js', 'default'],
		})
	],
};
