/*
 * UMD (Universal Module Definition) pattern
 * https://github.com/umdjs/umd
 * returnExports snippet
 * https://github.com/umdjs/umd/blob/master/returnExports.js
 */
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular', 'pubsub-core'], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'),
                             require('pubsub-core'));
  }
  else {
    // Browser globals (root is window)
    root.angularPubsub = factory(root.angular,
                                 root.pubsubCore);
  }
}(this, function(angular, pubsubCore) {
  'use strict';
  var angularPubsub = angular.module('angularPubsub', []);

  return angularPubsub.factory('PubSub', pubsubCore);
}));
