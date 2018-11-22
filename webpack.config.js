const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = require("./webpack.common.js");

config.entry = "./src/app/main.ts";
config.mode = "development";
config.plugins.push(
	new HtmlWebpackPlugin({
		template: "!!html-loader!src/index.html",
		//title: pkg.title,
		inject: true
    }),
    new CopyWebpackPlugin([{
		from: "./data.json"
	}]),
);

config.devServer = {
	contentBase: "./src",
	port: 9000,
	overlay: true
};

module.exports = config;
