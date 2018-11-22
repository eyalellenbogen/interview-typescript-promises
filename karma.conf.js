var webpackConfig = require("./webpack.common");
webpackConfig.mode = "development";

module.exports = function (config) {
	config.set({

		plugins: [
			"karma-chrome-launcher",
			"karma-jasmine",
			"karma-jasmine-html-reporter",
			"karma-html-detailed-reporter",
			"karma-webpack",
			"karma-sourcemap-loader"
		],

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: "",

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ["jasmine"],

		// list of files / patterns to load in the browser
		files: [
			"src/**/*.spec.ts"
		],

		mime: {
			"text/x-typescript": ["ts", "tsx"]
		},

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"src/**/*.ts": ["webpack", "sourcemap"]
		},

		webpack: webpackConfig,

		// test results reporter to use
		// possible values: "dots", "progress"
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ["progress", "kjhtml"],

		junitReporter: {
			outputDir: "test-results", // results will be saved as $outputDir/$browserName.xml
			useBrowserName: true, // add browser name to report and classes names
		},
		notifyReporter: {
			reportEachFailure: false, // Default: false, Will notify on every failed spec 
			reportSuccess: true, // Default: true, Will notify when a suite was successfull 
		},
		port: 9876,
		colors: true,
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ["Chrome"],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		client: {
			captureConsole: true,
			random: false
		}
	});
};