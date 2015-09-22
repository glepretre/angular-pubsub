angular-pubsub
==============

**Simple pubsub service for angularJS**

Forked from: https://gist.github.com/floatingmonkey/3384419#file-gistfile1-js

###Dependencies

**None.** angular-pubsub only requires angular!

Rewritten and added tests.

#Installing angular-pubsub

##Copy the latest version

Here it is :
https://github.com/glepretre/angular-pubsub/blob/master/src/angular-pubsub.js

##Include it into your app

    angular.module('myApp',['angularPubsub']);

Then where you need it :

    angular.module('myApp').controller('myAppCtrl',
      function ($scope, angularPubsub) {...});

#Using angular-pubsub

angular-pubsub provides 3 methods :
* subscribe()
* publish()
* unsubscribe()

##subscribing to a topic

The client (controller in most cases) which need to receive messages have to
subscribe to a specific topic:

    angularPubsub.subscribe(topic, callback);

- 'topic' must be a string describing a topic/event (BUS name)
- 'callback' must be a function, the callback executed when receiving a message

##publishing into a topic

    angularPubsub.publish(topic, other, parameters);

- 'other', 'parameters' : publish accept parameters

##unsubscribing from a topic

When the client don't need to receive messages anymore, and to avoid memory leaks,
it is recommanded to unsubscribe

    angularPubsub.unsubscribe(topic, callbackToUnregister);

- 'callbackToUnregister' must be strictly equal to the registered callback.

#Tests

Tests are based on Karma-runner and implemented with Jasmine.

* Karma-runner: http://karma-runner.github.io/
* Jasmine: http://pivotal.github.io/jasmine/

angular-pubsub is tested on Chrome, Firefox and PhantomJS.

#Contribute

Feedback and contributions are welcomed.
