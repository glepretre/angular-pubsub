define([
  'angular-pubsub'
], function() {
  'use strict';

  describe('angularPubsub', function() {
    var PubSub;

    beforeEach(module('angularPubsub'));

    beforeEach(inject(function($injector) {
      PubSub = $injector.get('PubSub');
    }));

    describe('publish', function() {
      var registeredCallbacks,
          topic = 'foo';

      beforeEach(function() {
        registeredCallbacks = [jasmine.createSpy(), jasmine.createSpy()];
        registeredCallbacks.forEach(function(callback) {
          PubSub.subscribe(topic, callback);
        });
      });

      it('should call registered callbacks once', function() {
        PubSub.publish(topic);

        registeredCallbacks.forEach(function(callback) {
          expect(callback).toHaveBeenCalled();
          expect(callback.calls.count()).toEqual(1);
        });
      });

      it('should call registered callback n times', function() {
        var n = 3,
            i;

        for (i = 0; i < n; i++) {
          PubSub.publish(topic);
        }

        registeredCallbacks.forEach(function(callback) {
          expect(callback).toHaveBeenCalled();
          expect(callback.calls.count()).toEqual(n);
        });
      });

      describe('with parameters', function() {
        it('should pass parameters to registered callbacks', function() {
          PubSub.publish(topic, 1, 2, 3, 4);

          registeredCallbacks.forEach(function(callback) {
            expect(callback).toHaveBeenCalledWith(1, 2, 3, 4);
          });
        });
      });

      describe('when a topic is not registered', function() {
        var unknownTopic = 'baz';

        it('should not throw', function() {
          expect(function() {
            PubSub.publish(unknownTopic);
          }).not.toThrow();
        });

        it('should not call other topics callbacks', function() {
          PubSub.publish(unknownTopic);

          registeredCallbacks.forEach(function(callback) {
            expect(callback).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('subscribe', function() {
      var callback,
          topic;

      beforeEach(function() {
        callback = jasmine.createSpy();
        topic = 'foo';
      });

      it('should throw an exception ' +
         'when callback is not a function', function() {
        var ERROR_MESSAGE = 'callback must be a function';

        expect(function() {
          PubSub.subscribe(topic, {});
        }).toThrowError(ERROR_MESSAGE);
      });

      it('should only call callback once registered', function() {
        PubSub.publish(topic);
        PubSub.subscribe(topic, callback);

        PubSub.publish(topic);

        expect(callback).toHaveBeenCalled();
        expect(callback.calls.count()).toEqual(1);
      });

      it('should register callback n times', function() {
        var n = 3,
            i;

        for (i = 0; i < n; i++) {
          PubSub.subscribe(topic, callback);
        }

        PubSub.publish(topic);

        expect(callback.calls.count()).toEqual(n);
      });
    });

    describe('unsubscribe', function() {
      var registeredCallbacks,
          topic = 'foo';

      beforeEach(function() {
        registeredCallbacks = [jasmine.createSpy(), jasmine.createSpy()];
        registeredCallbacks.forEach(function(callback) {
          PubSub.subscribe(topic, callback);
        });
      });

      it('should not allow publish to registered callbacks ' +
         'after execution', function() {
        PubSub.publish(topic);

        registeredCallbacks.forEach(function(callback) {
          PubSub.unsubscribe(topic, callback);
        });
        PubSub.publish(topic);

        registeredCallbacks.forEach(function(callback) {
          expect(callback).toHaveBeenCalled();
          expect(callback.calls.count()).toEqual(1);
        });
      });

      it('should only unsubscribe passed callback', function() {
        var remainingCallback = registeredCallbacks[0],
            callbackToUnregister = registeredCallbacks[1];

        PubSub.unsubscribe(topic, callbackToUnregister);
        PubSub.publish(topic);

        expect(remainingCallback).toHaveBeenCalled();
        expect(callbackToUnregister).not.toHaveBeenCalled();
      });

      it('should not throw if callback is unregistered', function() {
        var unregisteredCallback = jasmine.createSpy();

        expect(function() {
          PubSub.unsubscribe(topic, unregisteredCallback);
        }).not.toThrow();
      });

      it('should not throw if topic does not exist', function() {
        var unknownTopic = 'quz';

        registeredCallbacks.forEach(function(callback) {
          expect(function() {
            PubSub.unsubscribe(unknownTopic, callback);
          }).not.toThrow();
        });
      });
    });
  });
});
