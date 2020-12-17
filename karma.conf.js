// Karma configuration
// Generated on Fri Jul 03 2020 20:15:52 GMT+0700 (Western Indonesia Time)
module.exports = (config) => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'specs/**/*Spec.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/**/*Spec.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
      devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [{
          test: /\.html$/i,
          use: ['html-loader'],
        },
        {
          test: /\.css$/i,
          exclude: /styles/,
          use: ['to-string-loader', 'css-loader?url=false'],
        },
        {
          test: /\.css$/i,
          include: /styles/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(scss)$/,
          include: /styles/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/i,
          use: 'url-loader?limit=1024',
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['file-loader', 'image-webpack-loader?bypassOnDebug'],
        },
        ],
      },
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    /* possible values: config.LOG_DISABLE || config.LOG_ERROR
    || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
