/* jshint node: true */

// requiring global requireJS config
require(['/base/config/require.conf.js'], function() {
  'use strict';

  // first require.config overload: Karma specific
  require.config({
    baseUrl: '/base/src',

    paths: {
      'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
    },

    shim: {
      'angular-mocks': {
        deps: ['angular']
      }
    }
  });

  require(['angular-mocks'], function() {

    var specFiles = [];
    for (var file in window.__karma__.files) {
      if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\/base\/src\/.*_test\.js$/.test(file)) {
          specFiles.push(file);
        }
      }
    }

    // second overload to include specFiles and start Karma
    require.config({
      deps: specFiles,
      callback: window.__karma__.start
    });
  });
});
