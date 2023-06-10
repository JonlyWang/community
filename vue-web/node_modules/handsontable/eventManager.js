"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.getListenersCounter = getListenersCounter;
require("core-js/modules/es.array.splice.js");
var _feature = require("./helpers/feature");
var _event = require("./helpers/dom/event");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Counter which tracks unregistered listeners (useful for detecting memory leaks).
 *
 * @type {number}
 */
var listenersCounter = 0;

/**
 * Event DOM manager for internal use in Handsontable.
 *
 * @class EventManager
 * @util
 */
var EventManager = /*#__PURE__*/function () {
  /**
   * @param {object} [context=null] An object to which event listeners will be stored.
   * @private
   */
  function EventManager() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, EventManager);
    this.context = context || this;

    // TODO it modify external object. Rethink that.
    if (!this.context.eventListeners) {
      this.context.eventListeners = []; // TODO perf It would be more performant if every instance of EventManager tracked its own listeners only
    }
  }

  /**
   * Register specified listener (`eventName`) to the element.
   *
   * @param {Element} element Target element.
   * @param {string} eventName Event name.
   * @param {Function} callback Function which will be called after event occur.
   * @param {AddEventListenerOptions|boolean} [options] Listener options if object or useCapture if boolean.
   * @returns {Function} Returns function which you can easily call to remove that event.
   */
  _createClass(EventManager, [{
    key: "addEventListener",
    value: function addEventListener(element, eventName, callback) {
      var _this = this;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      /**
       * @param {Event} event The event object.
       */
      function callbackProxy(event) {
        callback.call(this, extendEvent(event));
      }
      if (typeof options !== 'boolean' && !(0, _feature.isPassiveEventSupported)()) {
        options = false;
      }
      this.context.eventListeners.push({
        element: element,
        event: eventName,
        callback: callback,
        callbackProxy: callbackProxy,
        options: options,
        eventManager: this
      });
      element.addEventListener(eventName, callbackProxy, options);
      listenersCounter += 1;
      return function () {
        _this.removeEventListener(element, eventName, callback);
      };
    }

    /**
     * Remove the event listener previously registered.
     *
     * @param {Element} element Target element.
     * @param {string} eventName Event name.
     * @param {Function} callback Function to remove from the event target. It must be the same as during registration listener.
     * @param {boolean} [onlyOwnEvents] Whether whould remove only events registered using this instance of EventManager.
     */
  }, {
    key: "removeEventListener",
    value: function removeEventListener(element, eventName, callback) {
      var onlyOwnEvents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var len = this.context.eventListeners.length;
      var tmpEvent;
      while (len) {
        len -= 1;
        tmpEvent = this.context.eventListeners[len];
        if (tmpEvent.event === eventName && tmpEvent.element === element) {
          if (callback && callback !== tmpEvent.callback) {
            /* eslint-disable no-continue */
            continue;
          }
          // TODO rethink that, main bulk is that it needs multi instances to handle same context, but with a different scopes.
          // TODO I suppose much more efficient way will be comparing string with scope id, or any similar approach.
          if (onlyOwnEvents && tmpEvent.eventManager !== this) {
            continue;
          }
          this.context.eventListeners.splice(len, 1);
          tmpEvent.element.removeEventListener(tmpEvent.event, tmpEvent.callbackProxy, tmpEvent.options);
          listenersCounter -= 1;
        }
      }
    }

    /**
     * Clear all previously registered events.
     *
     * @private
     * @since 0.15.0-beta3
     * @param {boolean} [onlyOwnEvents] Whether whould remove only events registered using this instance of EventManager.
     */
  }, {
    key: "clearEvents",
    value: function clearEvents() {
      var onlyOwnEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.context) {
        return;
      }
      var len = this.context.eventListeners.length;
      while (len) {
        len -= 1;
        var event = this.context.eventListeners[len];
        if (onlyOwnEvents && event.eventManager !== this) {
          continue;
        }
        this.context.eventListeners.splice(len, 1);
        event.element.removeEventListener(event.event, event.callbackProxy, event.options);
        listenersCounter -= 1;
      }
    }

    /**
     * Clear all previously registered events.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.clearEvents();
    }

    /**
     * Destroy instance of EventManager, clearing all events of the context.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.clearEvents();
      this.context = null;
    }

    /**
     * Destroy instance of EventManager, clearing only the own events.
     */
  }, {
    key: "destroyWithOwnEventsOnly",
    value: function destroyWithOwnEventsOnly() {
      this.clearEvents(true);
      this.context = null;
    }

    /**
     * Trigger event at the specified target element.
     *
     * @param {Element} element Target element.
     * @param {string} eventName Event name.
     */
  }, {
    key: "fireEvent",
    value: function fireEvent(element, eventName) {
      var rootDocument = element.document;
      var rootWindow = element;
      if (!rootDocument) {
        rootDocument = element.ownerDocument ? element.ownerDocument : element;
        rootWindow = rootDocument.defaultView;
      }
      var options = {
        bubbles: true,
        cancelable: eventName !== 'mousemove',
        view: rootWindow,
        detail: 0,
        screenX: 0,
        screenY: 0,
        clientX: 1,
        clientY: 1,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: undefined
      };
      var event;
      if (rootDocument.createEvent) {
        event = rootDocument.createEvent('MouseEvents');
        event.initMouseEvent(eventName, options.bubbles, options.cancelable, options.view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.relatedTarget || rootDocument.body.parentNode);
      } else {
        event = rootDocument.createEventObject();
      }
      if (element.dispatchEvent) {
        element.dispatchEvent(event);
      } else {
        element.fireEvent("on".concat(eventName), event);
      }
    }
  }]);
  return EventManager;
}(); /**
      * @private
      * @param {Event} event The event object.
      * @returns {Event}
      */
function extendEvent(event) {
  var nativeStopImmediatePropagation = event.stopImmediatePropagation;
  event.stopImmediatePropagation = function () {
    nativeStopImmediatePropagation.apply(this);
    (0, _event.stopImmediatePropagation)(this);
  };
  return event;
}
var _default = EventManager; /**
                              * @returns {number}
                              */
exports.default = _default;
function getListenersCounter() {
  return listenersCounter;
}