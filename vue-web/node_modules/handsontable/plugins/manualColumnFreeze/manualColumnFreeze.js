"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.ManualColumnFreeze = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _base = require("../base");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _freezeColumn = _interopRequireDefault(require("./contextMenuItem/freezeColumn"));
var _unfreezeColumn = _interopRequireDefault(require("./contextMenuItem/unfreezeColumn"));
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
_pluginHooks.default.getSingleton().register('beforeColumnFreeze');
_pluginHooks.default.getSingleton().register('afterColumnFreeze');
_pluginHooks.default.getSingleton().register('beforeColumnUnfreeze');
_pluginHooks.default.getSingleton().register('afterColumnUnfreeze');
var PLUGIN_KEY = 'manualColumnFreeze';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 110;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var privatePool = new WeakMap();

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin ManualColumnFreeze
 * @class ManualColumnFreeze
 *
 * @description
 * This plugin allows to manually "freeze" and "unfreeze" a column using an entry in the Context Menu or using API.
 * You can turn it on by setting a {@link Options#manualColumnFreeze} property to `true`.
 *
 * @example
 * ```js
 * // Enables the plugin
 * manualColumnFreeze: true,
 * ```
 */
var ManualColumnFreeze = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ManualColumnFreeze, _BasePlugin);
  var _super = _createSuper(ManualColumnFreeze);
  function ManualColumnFreeze(hotInstance) {
    var _this;
    _classCallCheck(this, ManualColumnFreeze);
    _this = _super.call(this, hotInstance);
    privatePool.set(_assertThisInitialized(_this), {
      afterFirstUse: false
    });
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link ManualColumnFreeze#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(ManualColumnFreeze, [{
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
      this.addHook('afterContextMenuDefaultOptions', function (options) {
        return _this2.addContextMenuEntry(options);
      });
      this.addHook('beforeColumnMove', function (columns, finalIndex) {
        return _this2.onBeforeColumnMove(columns, finalIndex);
      });
      _get(_getPrototypeOf(ManualColumnFreeze.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var priv = privatePool.get(this);
      priv.afterFirstUse = false;
      _get(_getPrototypeOf(ManualColumnFreeze.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`manualColumnFreeze`](@/api/options.md#manualcolumnfreeze)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(ManualColumnFreeze.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Freezes the specified column (adds it to fixed columns).
     *
     * `freezeColumn()` doesn't re-render the table,
     * so you need to call the `render()` method afterward.
     *
     * @param {number} column Visual column index.
     */
  }, {
    key: "freezeColumn",
    value: function freezeColumn(column) {
      var priv = privatePool.get(this);
      var settings = this.hot.getSettings();
      // columns are already fixed (frozen)
      var freezePerformed = settings.fixedColumnsStart < this.hot.countCols() && column > settings.fixedColumnsStart - 1;
      if (!priv.afterFirstUse) {
        priv.afterFirstUse = true;
      }
      var beforeColumnFreezeHook = this.hot.runHooks('beforeColumnFreeze', column, freezePerformed);
      if (beforeColumnFreezeHook === false) {
        return;
      }
      if (freezePerformed) {
        this.hot.columnIndexMapper.moveIndexes(column, settings.fixedColumnsStart);

        // Since 12.0.0, the "fixedColumnsLeft" is replaced with the "fixedColumnsStart" option.
        // However, keeping the old name still in effect. When both option names are used together,
        // the error is thrown. To prevent that, the plugin needs to modify the original option key
        // to bypass the validation.
        settings._fixedColumnsStart += 1;
      }
      this.hot.runHooks('afterColumnFreeze', column, freezePerformed);
    }

    /**
     * Unfreezes the given column (remove it from fixed columns and bring to it's previous position).
     *
     * @param {number} column Visual column index.
     */
  }, {
    key: "unfreezeColumn",
    value: function unfreezeColumn(column) {
      var priv = privatePool.get(this);
      var settings = this.hot.getSettings();
      // columns are not fixed (not frozen)
      var unfreezePerformed = settings.fixedColumnsStart > 0 && column <= settings.fixedColumnsStart - 1;
      if (!priv.afterFirstUse) {
        priv.afterFirstUse = true;
      }
      var beforeColumnUnfreezeHook = this.hot.runHooks('beforeColumnUnfreeze', column, unfreezePerformed);
      if (beforeColumnUnfreezeHook === false) {
        return;
      }
      if (unfreezePerformed) {
        // Since 12.0.0, the "fixedColumnsLeft" is replaced with the "fixedColumnsStart" option.
        // However, keeping the old name still in effect. When both option names are used together,
        // the error is thrown. To prevent that, the plugin needs to modify the original option key
        // to bypass the validation.
        settings._fixedColumnsStart -= 1;
        this.hot.columnIndexMapper.moveIndexes(column, settings.fixedColumnsStart);
      }
      this.hot.runHooks('afterColumnUnfreeze', column, unfreezePerformed);
    }

    /**
     * Adds the manualColumnFreeze context menu entries.
     *
     * @private
     * @param {object} options Context menu options.
     */
  }, {
    key: "addContextMenuEntry",
    value: function addContextMenuEntry(options) {
      options.items.push({
        name: '---------'
      }, (0, _freezeColumn.default)(this), (0, _unfreezeColumn.default)(this));
    }

    /**
     * Prevents moving the columns from/to fixed area.
     *
     * @private
     * @param {Array} columns Array of visual column indexes to be moved.
     * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
     * @returns {boolean|undefined}
     */
  }, {
    key: "onBeforeColumnMove",
    value: function onBeforeColumnMove(columns, finalIndex) {
      var priv = privatePool.get(this);
      if (priv.afterFirstUse) {
        var freezeLine = this.hot.getSettings().fixedColumnsStart;

        // Moving any column before the "freeze line" isn't possible.
        if (finalIndex < freezeLine) {
          return false;
        }

        // Moving frozen column isn't possible.
        if (columns.some(function (column) {
          return column < freezeLine;
        })) {
          return false;
        }
      }
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
  return ManualColumnFreeze;
}(_base.BasePlugin);
exports.ManualColumnFreeze = ManualColumnFreeze;