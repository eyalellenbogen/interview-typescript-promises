const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var config = {
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: [/node_modules/],
			enforce: "pre",
			use: ["tslint-loader"]
		}, {
			test: /\.ts$/,
			use: [{
				loader: "cache-loader"
			}, {
				loader: "thread-loader",
				options: {
					workers: require("os").cpus().length - 1
				}
			}, {
				loader: "ts-loader",
				options: {
					allowTsInNodeModules: true,
					happyPackMode: true
				}
			}]
		}, {
			test: /\.scss$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
				options: {}
			}, {
				loader: "css-loader",
				options: {
					sourceMap: true
				}
			}, {
				loader: "postcss-loader",
				options: {
					sourceMap: true,
					plugins: () => [require("autoprefixer")]
				}
			}, {
				loader: "resolve-url-loader",
				options: {
					sourceMap: true,
					fail: true,
					keepQuery: true
				}
			}, {
				loader: "sass-loader",
				options: {
					sourceMap: true,
					outputStyle: "expanded"
				}
			}]
		}, {
			test: /\.css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
				options: {}
			}, {
				loader: "css-loader",
				options: {
					sourceMap: true
				}
			}]
		}, {
			test: /\.html$/,
			use: ["raw-loader"]
		}, {
			test: /\.(woff2?|svg|ttf|eot|otf|png)\??.*$/,
			use: ["file-loader"]
		}]
	},

	plugins: [
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			async: false
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /main\..+\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { sourceMap: true },
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		})
	],

	resolve: {
		extensions: [".ts", ".js"]
	},

	output: {
		chunkFilename: "[name].[contenthash]",
		filename: "[name].[hash].js"
	},

	stats: {
		assets: false,
		chunks: false,
		modules: false,
		entrypoints: false
	},

	devtool: "cheap-module-source-map"
};

module.exports = config;
