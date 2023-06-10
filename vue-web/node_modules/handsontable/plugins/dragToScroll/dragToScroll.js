"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.DragToScroll = void 0;
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _base = require("../base");
var _eventManager = _interopRequireDefault(require("../../eventManager"));
var _event = require("../../helpers/dom/event");
var _element = require("../../helpers/dom/element");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var PLUGIN_KEY = 'dragToScroll';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 100;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @description
 * Plugin used to scroll Handsontable by selecting a cell and dragging outside of the visible viewport.
 *
 *
 * @class DragToScroll
 * @plugin DragToScroll
 */
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var DragToScroll = /*#__PURE__*/function (_BasePlugin) {
  _inherits(DragToScroll, _BasePlugin);
  var _super = _createSuper(DragToScroll);
  function DragToScroll(hotInstance) {
    var _this;
    _classCallCheck(this, DragToScroll);
    _this = _super.call(this, hotInstance);
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    _this.eventManager = new _eventManager.default(_assertThisInitialized(_this));
    /**
     * Size of an element and its position relative to the viewport,
     * e.g. {bottom: 449, height: 441, left: 8, right: 814, top: 8, width: 806, x: 8, y:8}.
     *
     * @type {DOMRect}
     */
    _this.boundaries = null;
    /**
     * Callback function.
     *
     * @private
     * @type {Function}
     */
    _this.callback = null;
    /**
     * Flag indicates mouseDown/mouseUp.
     *
     * @private
     * @type {boolean}
     */
    _this.listening = false;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link DragToScroll#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(DragToScroll, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings()[PLUGIN_KEY];
    }

    /**
     * Enables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;
      if (this.enabled) {
        return;
      }
      this.addHook('afterOnCellMouseDown', function (event) {
        return _this2.setupListening(event);
      });
      this.addHook('afterOnCellCornerMouseDown', function (event) {
        return _this2.setupListening(event);
      });
      this.registerEvents();
      _get(_getPrototypeOf(DragToScroll.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`dragToScroll`](@/api/options.md#dragtoscroll)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(DragToScroll.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.unregisterEvents();
      _get(_getPrototypeOf(DragToScroll.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Sets the value of the visible element.
     *
     * @param {DOMRect} boundaries An object with coordinates compatible with DOMRect.
     */
  }, {
    key: "setBoundaries",
    value: function setBoundaries(boundaries) {
      this.boundaries = boundaries;
    }

    /**
     * Changes callback function.
     *
     * @param {Function} callback The callback function.
     */
  }, {
    key: "setCallback",
    value: function setCallback(callback) {
      this.callback = callback;
    }

    /**
     * Checks if the mouse position (X, Y) is outside of the viewport and fires a callback with calculated X an Y diffs
     * between passed boundaries.
     *
     * @param {number} x Mouse X coordinate to check.
     * @param {number} y Mouse Y coordinate to check.
     */
  }, {
    key: "check",
    value: function check(x, y) {
      var diffX = 0;
      var diffY = 0;
      if (y < this.boundaries.top) {
        // y is less than top
        diffY = y - this.boundaries.top;
      } else if (y > this.boundaries.bottom) {
        // y is more than bottom
        diffY = y - this.boundaries.bottom;
      }
      if (x < this.boundaries.left) {
        // x is less than left
        diffX = x - this.boundaries.left;
      } else if (x > this.boundaries.right) {
        // x is more than right
        diffX = x - this.boundaries.right;
      }
      this.callback(diffX, diffY);
    }

    /**
     * Enables listening on `mousemove` event.
     *
     * @private
     */
  }, {
    key: "listen",
    value: function listen() {
      this.listening = true;
    }

    /**
     * Disables listening on `mousemove` event.
     *
     * @private
     */
  }, {
    key: "unlisten",
    value: function unlisten() {
      this.listening = false;
    }

    /**
     * Returns current state of listening.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "isListening",
    value: function isListening() {
      return this.listening;
    }

    /**
     * Registers dom listeners.
     *
     * @private
     */
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this3 = this;
      var rootWindow = this.hot.rootWindow;
      var frame = rootWindow;
      while (frame) {
        this.eventManager.addEventListener(frame.document, 'contextmenu', function () {
          return _this3.unlisten();
        });
        this.eventManager.addEventListener(frame.document, 'mouseup', function () {
          return _this3.unlisten();
        });
        this.eventManager.addEventListener(frame.document, 'mousemove', function (event) {
          return _this3.onMouseMove(event);
        });
        frame = (0, _element.getParentWindow)(frame);
      }
    }

    /**
     * Unbinds the events used by the plugin.
     *
     * @private
     */
  }, {
    key: "unregisterEvents",
    value: function unregisterEvents() {
      this.eventManager.clear();
    }

    /**
     * On after on cell/cellCorner mouse down listener.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "setupListening",
    value: function setupListening(event) {
      if ((0, _event.isRightClick)(event)) {
        return;
      }
      var scrollHandler = this.hot.view._wt.wtTable.holder; // native scroll

      if (scrollHandler === this.hot.rootWindow) {
        // not much we can do currently
        return;
      }
      this.setBoundaries(scrollHandler.getBoundingClientRect());
      this.setCallback(function (scrollX, scrollY) {
        if (scrollX < 0) {
          scrollHandler.scrollLeft -= 50;
        } else if (scrollX > 0) {
          scrollHandler.scrollLeft += 50;
        }
        if (scrollY < 0) {
          scrollHandler.scrollTop -= 20;
        } else if (scrollY > 0) {
          scrollHandler.scrollTop += 20;
        }
      });
      this.listen();
    }

    /**
     * 'mouseMove' event callback.
     *
     * @private
     * @param {MouseEvent} event `mousemove` event properties.
     */
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      if (!this.isListening()) {
        return;
      }
      this.check(event.clientX, event.clientY);
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(DragToScroll.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);
  return DragToScroll;
}(_base.BasePlugin);
exports.DragToScroll = DragToScroll;