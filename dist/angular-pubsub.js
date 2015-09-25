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
    define('pubsub-core',[], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  }
  else {
    // Browser globals (root is window)
    root.pubsubCore = factory();
  }
}(this, function() {
  'use strict';
  return function() {
    var channels = {};
    return {
      publish: function(topic) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (!channels[topic]) {
          return;
        }

        channels[topic].forEach(function(callback) {
          callback.apply(null, args);
        });
      },

      subscribe: function(topic, callback) {
        if (!(callback instanceof Function)){
          throw new Error('callback must be a function');
        }
        if (!channels[topic]) {
          channels[topic] = [];
        }
        channels[topic].push(callback);
      },

      unsubscribe: function(topic, callback) {
        if (!channels[topic]) {
          return;
        }

        channels[topic].forEach(function(value, index) {
          if (value === callback) {
            channels[topic].splice(index, 1);
          }
        });
      }
    };
  };
}));

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
    define('angular-pubsub',['angular', 'pubsub-core'], factory);
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

