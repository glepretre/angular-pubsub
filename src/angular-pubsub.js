/*
 * UMD (Universal Module Definition) pattern
 * https://github.com/umdjs/umd
 * amdWeb snippet
 * https://github.com/umdjs/umd/blob/master/amdWeb.js
 */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular', 'pubsub-core'], factory);
  }
  else {
    // Browser globals
    root.angularPubsub = factory(root.angular,
                                 root.pubsubCore);
  }
}(this, function(angular, pubsubCore) {
  'use strict';

  var angularPubsub = angular.module('angularPubsub', []);

  return angularPubsub.factory('PubSub', pubsubCore);
}));
