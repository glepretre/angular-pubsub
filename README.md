angular-pubsub
==============

**Simple pubsub service for angularJS**

### Dependencies

* angular 1.3.x

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
* `subscribe()`
* `publish()`
* `unsubscribe()`

## Subscribing to a topic

The client (controller in most cases) which needs to receive messages has to
subscribe to a specific topic:

```javascript
PubSub.subscribe(topic, callback);
```

- `topic` - `{string}` - Name of the topic/event (BUS name)
- `callback` - `{function}` - Function to call when receiving a message

## Publishing into a topic

```javascript
PubSub.publish(topic, args);
```

- `args` - `{*}` - Optional one or more arguments
  which will be passed onto the subscribed clients

## Unsubscribing from a topic

When the client does not need to receive messages anymore,
and to avoid memory leaks, it is recommended to unsubscribe.

```javascript
PubSub.unsubscribe(topic, callbackToUnregister);
```
- `callbackToUnregister` - `{function}` - Registered `callback`

# Tests

Tests are based on Karma-runner and implemented with Jasmine 2.

* [Karma-runner](https://karma-runner.github.io/)
* [Jasmine](https://jasmine.github.io/)

angular-pubsub is tested on stable versions of Chrome and Firefox.

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
