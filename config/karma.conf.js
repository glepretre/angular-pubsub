/* jshint node: true */

module.exports = function(config) {
  'use strict';

  var chromeBrowser = 'Chrome',
      firefoxBrowser = 'Firefox';

  var headless = !!process.env.NOWINDOW;
  var HEADLESS_SUFFIX = 'Headless';

  if (headless) {
    chromeBrowser += HEADLESS_SUFFIX;
    firefoxBrowser += HEADLESS_SUFFIX;
  }

  config.set({
    basePath: '..',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      // Must be before 'src/**/*.js' to be included
      { pattern: 'src/test-main.js' },
      { pattern: 'config/require.conf.js', included: false },
      { pattern: 'bower_components/**/*.js', included: false },
      { pattern: 'src/**/*.js', included: false },
    ],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,

    /*
     * level of logging
     * possible values:
     * - config.LOG_DISABLE
     * - config.LOG_WARN
     * - config.LOG_INFO
     * - config.LOG_DEBUG
     * - config.LOG_ERROR
     */
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      chromeBrowser,
      firefoxBrowser
    ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 10000,

    /*
     * Continuous Integration mode
     * if true, it capture browsers, run tests and exit
     */
    singleRun: !!headless
  });
};
