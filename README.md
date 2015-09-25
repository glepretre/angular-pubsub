angular-pubsub
==============

**Simple pubsub service for angularJS**

### Dependencies

* angular 1.3+

# Installing angular-pubsub

Download the [latest version](https://raw.github.com/glepretre/angular-pubsub/master/dist/angular-pubsub.js)

or install it with Bower:

    bower install angular-pubsub

Then include it:

```html
<script src='angular-pubsub.js'></script>
```

When using [Require.JS](http://requirejs.org/):

```javascript
define(['angular-pubsub'], function(angularPubsub) {
  // Write good code here
});
```

## Include it into your app

```javascript
angular.module('myApp',['angularPubsub']);
```

Then where you need it :

```javascript
angular.module('myApp').controller('myAppCtrl',['PubSub', function (Pubsub) {
  // Do awesome things with
}]);
```

# Using angular-pubsub

angular-pubsub provides 3 methods :
* subscribe()
* publish()
* unsubscribe()

## Subscribing to a topic

The client (controller in most cases) which need to receive messages have to
subscribe to a specific topic:

```javascript
PubSub.subscribe(topic, callback);
```


- 'topic' must be a string describing a topic/event (BUS name)
- 'callback' must be a function, the callback executed when receiving a message

## Publishing into a topic

```javascript
PubSub.publish(topic, other, parameters);
```

- 'other', 'parameters' : publish accept parameters

## Unsubscribing from a topic

When the client don't need to receive messages anymore, and to avoid memory leaks,
it is recommanded to unsubscribe

```javascript
PubSub.unsubscribe(topic, callbackToUnregister);
```
- 'callbackToUnregister' must be strictly equal to the registered callback.

# Tests

Tests are based on Karma-runner and implemented with Jasmine 2.

* [Karma-runner](https://karma-runner.github.io/)
* [Jasmine](https://jasmine.github.io/)

angular-pubsub is tested on stable versions of Chrome, Firefox and PhantomJS.

# Contribute!

Feedback and contributions are welcomed.

## Tests

    npm install
    bower install

then

    scripts/unit-tests.sh

or

    npm test

## Building

    make build

Library is built into dist/
