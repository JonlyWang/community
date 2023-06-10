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
exports.TouchScroll = exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = void 0;
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _element = require("../../helpers/dom/element");
var _array = require("../../helpers/array");
var _base = require("../base");
var _feature = require("../../helpers/feature");
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
var PLUGIN_KEY = 'touchScroll';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 200;

/**
 * @private
 * @plugin TouchScroll
 * @class TouchScroll
 */
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var TouchScroll = /*#__PURE__*/function (_BasePlugin) {
  _inherits(TouchScroll, _BasePlugin);
  var _super = _createSuper(TouchScroll);
  function TouchScroll(hotInstance) {
    var _this;
    _classCallCheck(this, TouchScroll);
    _this = _super.call(this, hotInstance);

    /**
     * Collection of scrollbars to update.
     *
     * @type {Array}
     */
    _this.scrollbars = [];
    /**
     * Collection of overlays to update.
     *
     * @type {Array}
     */
    _this.clones = [];
    /**
     * Flag which determines if collection of overlays should be refilled on every table render.
     *
     * @type {boolean}
     * @default false
     */
    _this.lockedCollection = false;
    /**
     * Flag which determines if walkontable should freeze overlays while scrolling.
     *
     * @type {boolean}
     * @default false
     */
    _this.freezeOverlays = false;
    return _this;
  }

  /**
   * Check if plugin is enabled.
   *
   * @returns {boolean}
   */
  _createClass(TouchScroll, [{
    key: "isEnabled",
    value: function isEnabled() {
      return (0, _feature.isTouchSupported)();
    }

    /**
     * Enable the plugin.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;
      if (this.enabled) {
        return;
      }
      this.addHook('afterViewRender', function () {
        return _this2.onAfterViewRender();
      });
      this.registerEvents();
      _get(_getPrototypeOf(TouchScroll.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin to use the latest options you have specified.
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.lockedCollection = false;
      _get(_getPrototypeOf(TouchScroll.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disable plugin for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      _get(_getPrototypeOf(TouchScroll.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Register all necessary events.
     *
     * @private
     */
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this3 = this;
      this.addHook('beforeTouchScroll', function () {
        return _this3.onBeforeTouchScroll();
      });
      this.addHook('afterMomentumScroll', function () {
        return _this3.onAfterMomentumScroll();
      });
    }

    /**
     * After view render listener.
     *
     * @private
     */
  }, {
    key: "onAfterViewRender",
    value: function onAfterViewRender() {
      if (this.lockedCollection) {
        return;
      }
      var _this$hot$view$_wt$wt = this.hot.view._wt.wtOverlays,
        topOverlay = _this$hot$view$_wt$wt.topOverlay,
        bottomOverlay = _this$hot$view$_wt$wt.bottomOverlay,
        inlineStartOverlay = _this$hot$view$_wt$wt.inlineStartOverlay,
        topInlineStartCornerOverlay = _this$hot$view$_wt$wt.topInlineStartCornerOverlay,
        bottomInlineStartCornerOverlay = _this$hot$view$_wt$wt.bottomInlineStartCornerOverlay;
      this.lockedCollection = true;
      this.scrollbars.length = 0;
      this.scrollbars.push(topOverlay);
      if (bottomOverlay.clone) {
        this.scrollbars.push(bottomOverlay);
      }
      this.scrollbars.push(inlineStartOverlay);
      if (topInlineStartCornerOverlay) {
        this.scrollbars.push(topInlineStartCornerOverlay);
      }
      if (bottomInlineStartCornerOverlay && bottomInlineStartCornerOverlay.clone) {
        this.scrollbars.push(bottomInlineStartCornerOverlay);
      }
      this.clones = [];
      if (topOverlay.needFullRender) {
        this.clones.push(topOverlay.clone.wtTable.holder.parentNode);
      }
      if (bottomOverlay.needFullRender) {
        this.clones.push(bottomOverlay.clone.wtTable.holder.parentNode);
      }
      if (inlineStartOverlay.needFullRender) {
        this.clones.push(inlineStartOverlay.clone.wtTable.holder.parentNode);
      }
      if (topInlineStartCornerOverlay) {
        this.clones.push(topInlineStartCornerOverlay.clone.wtTable.holder.parentNode);
      }
      if (bottomInlineStartCornerOverlay && bottomInlineStartCornerOverlay.clone) {
        this.clones.push(bottomInlineStartCornerOverlay.clone.wtTable.holder.parentNode);
      }
    }

    /**
     * Touch scroll listener.
     *
     * @private
     */
  }, {
    key: "onBeforeTouchScroll",
    value: function onBeforeTouchScroll() {
      this.freezeOverlays = true;
      (0, _array.arrayEach)(this.clones, function (clone) {
        (0, _element.addClass)(clone, 'hide-tween');
      });
    }

    /**
     * After momentum scroll listener.
     *
     * @private
     */
  }, {
    key: "onAfterMomentumScroll",
    value: function onAfterMomentumScroll() {
      var _this4 = this;
      this.freezeOverlays = false;
      (0, _array.arrayEach)(this.clones, function (clone) {
        (0, _element.removeClass)(clone, 'hide-tween');
        (0, _element.addClass)(clone, 'show-tween');
      });
      this.hot._registerTimeout(function () {
        (0, _array.arrayEach)(_this4.clones, function (clone) {
          (0, _element.removeClass)(clone, 'show-tween');
        });
      }, 400);
      (0, _array.arrayEach)(this.scrollbars, function (scrollbar) {
        scrollbar.refresh();
        scrollbar.resetFixedPosition();
      });
      this.hot.view._wt.wtOverlays.syncScrollWithMaster();
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
  }, {
    key: "SETTING_KEYS",
    get: function get() {
      return true;
    }
  }]);
  return TouchScroll;
}(_base.BasePlugin);
exports.TouchScroll = TouchScroll;