module.exports = function(config){
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath : '../../',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files : [
      {pattern: 'test/lib/angular.js', watched: true, included: true, served: true},
      {pattern: 'test/lib/angular-*.js', watched: true, included: true, served: true},
      {pattern: 'test/lib/**/*.js', watched: true, included: true, served: true},
      {pattern: 'src/**/*.js', watched: true, included: true, served: true},
      {pattern: 'test/unit/**/*.js', watched: true, included: true, served: true},
    ],

    // list of files to exclude
    exclude: [

    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9877,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
//    logLevel: config.LOG_DEBUG,

    autoWatch : true,

    frameworks: ['jasmine'],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : [
              'Chrome',
              'Firefox',
              'PhantomJS'
              ],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-script-launcher',
            'karma-jasmine',
            ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
