(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
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
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
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