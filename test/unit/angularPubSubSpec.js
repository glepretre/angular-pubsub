'use strict';

describe('angularPubsub', function() {
  var angularPubsub;

  beforeEach(module('angularPubsub'));

  beforeEach(inject(function($injector) {
    angularPubsub = $injector.get('angularPubsub');
  }));

  describe('publish', function() {
      var registeredCallbacks,
          topic = 'foo';

      beforeEach(function() {
        registeredCallbacks = [jasmine.createSpy(), jasmine.createSpy()];
        registeredCallbacks.forEach(function(callback) {
          angularPubsub.subscribe(topic, callback);
        });
      });

      it('should call registered callbacks once', function() {
        angularPubsub.publish(topic);

        registeredCallbacks.forEach(function(callback) {
          expect(callback).toHaveBeenCalled();
          expect(callback.calls.count()).toEqual(1);
        });
      });

      it('should call registered callback n times', function() {
        var n = 3,
            i;

        for (i = 0; i < n; i++) {
          angularPubsub.publish(topic);
        }

        registeredCallbacks.forEach(function(callback) {
          expect(callback).toHaveBeenCalled();
          expect(callback.calls.count()).toEqual(n);
        });
      });

      describe('with parameters', function() {
        it('should pass parameters to registered callbacks', function() {
          angularPubsub.publish(topic, 1, 2, 3, 4);

          registeredCallbacks.forEach(function(callback) {
            expect(callback).toHaveBeenCalledWith(1, 2, 3, 4);
          });
        });
      });

    describe('when a topic is not registered', function() {
      var unknownTopic = 'baz';

      it('should not throw', function() {
        expect(function() {
          angularPubsub.publish(unknownTopic)
        }).not.toThrow();
      });

      it('should not call other topics callbacks', function(){
        angularPubsub.publish(unknownTopic);

        registeredCallbacks.forEach(function(callback) {
          expect(callback).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('subscribe', function() {
    var callback,
        topic,
        subscribe;

    beforeEach(function() {
      callback = jasmine.createSpy();
      topic = 'foo';
    });

    it('should throw an exception when callback is not a function', function(){
      var errorMessage = 'callback must be a function';

      expect(function() {
        angularPubsub.subscribe(topic, {});
      }).toThrowError(errorMessage);
    });

    it('should only call callback once registered', function() {
      angularPubsub.publish(topic);
      angularPubsub.subscribe(topic, callback);

      angularPubsub.publish(topic);

      expect(callback).toHaveBeenCalled();
      expect(callback.calls.count()).toEqual(1);
    });

    it('should register callback n times', function() {
        var n = 3,
            i;

        for (i = 0; i < n; i++) {
          angularPubsub.subscribe(topic, callback);
        }

      angularPubsub.publish(topic);

      expect(callback.calls.count()).toEqual(n);
    });
  });

  describe('unsubscribe', function() {
    var registeredCallbacks,
        topic = 'foo';

    beforeEach(function() {
      registeredCallbacks = [jasmine.createSpy(), jasmine.createSpy()];
      registeredCallbacks.forEach(function(callback) {
        angularPubsub.subscribe(topic, callback);
      });
    });

    it('should not allow publish to registered callbacks after execution', function() {
      angularPubsub.publish(topic);

      registeredCallbacks.forEach(function(callback) {
        angularPubsub.unsubscribe(topic, callback);
      });
      angularPubsub.publish(topic);

      registeredCallbacks.forEach(function(callback) {
        expect(callback).toHaveBeenCalled();
        expect(callback.calls.count()).toEqual(1);
      });
    });

    it('should only unsubscribe passed callback', function(){
      var remainingCallback = registeredCallbacks[0],
          callbackToUnregister = registeredCallbacks[1];

      angularPubsub.unsubscribe(topic, callbackToUnregister);
      angularPubsub.publish(topic);

      expect(remainingCallback).toHaveBeenCalled();
      expect(callbackToUnregister).not.toHaveBeenCalled();
    });

    it('should not throw if callback is unregistered', function() {
      var unregisteredCallback = jasmine.createSpy();

      expect(function() {
        angularPubsub.unsubscribe(topic, unregisteredCallback);
      }).not.toThrow();
    });

    it('should not throw if topic does not exist', function() {
      var unknownTopic = 'quz';

      registeredCallbacks.forEach(function(callback) {
        expect(function(){
          angularPubsub.unsubscribe(unknownTopic, callback);
        }).not.toThrow();
      });
    });

  });
});
