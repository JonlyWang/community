function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
import { BasePlugin } from "../base/index.mjs";
import Storage from "./storage.mjs";
import Hooks from "../../pluginHooks.mjs";
Hooks.getSingleton().register('persistentStateSave');
Hooks.getSingleton().register('persistentStateLoad');
Hooks.getSingleton().register('persistentStateReset');
export var PLUGIN_KEY = 'persistentState';
export var PLUGIN_PRIORITY = 0;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin PersistentState
 * @class PersistentState
 *
 * @description
 * Save the state of column sorting, column positions and column sizes in local storage to preserve table state
 * between page reloads.
 *
 * In order to enable data storage mechanism, {@link Options#persistentState} option must be set to `true`.
 *
 * When persistentState is enabled it exposes 3 hooks:
 * - {@link Hooks#persistentStateSave} - Saves value under given key in browser local storage.
 * - {@link Hooks#persistentStateLoad} - Loads value, saved under given key, from browser local storage. The loaded
 * value will be saved in `saveTo.value`.
 * - {@link Hooks#persistentStateReset} - Clears the value saved under key. If no key is given, all values associated
 * with table will be cleared.
 *
 * __Note:__ The main reason behind using `persistentState` hooks rather than regular LocalStorage API is that it
 * ensures separation of data stored by multiple Handsontable instances. In other words, if you have two (or more)
 * instances of Handsontable on one page, data saved by one instance won't be accessible by the second instance.
 * Those two instances can store data under the same key and no data would be overwritten.
 *
 * __Important:__ In order for the data separation to work properly, make sure that each instance of Handsontable has a unique `id`.
 *
 */
export var PersistentState = /*#__PURE__*/function (_BasePlugin) {
  _inherits(PersistentState, _BasePlugin);
  var _super = _createSuper(PersistentState);
  function PersistentState(hotInstance) {
    var _this;
    _classCallCheck(this, PersistentState);
    _this = _super.call(this, hotInstance);
    /**
     * Instance of {@link Storage}.
     *
     * @private
     * @type {Storage}
     */
    _this.storage = void 0;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link PersistentState#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(PersistentState, [{
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
      if (!this.storage) {
        this.storage = new Storage(this.hot.rootElement.id, this.hot.rootWindow);
      }
      this.addHook('persistentStateSave', function (key, value) {
        return _this2.saveValue(key, value);
      });
      this.addHook('persistentStateLoad', function (key, saveTo) {
        return _this2.loadValue(key, saveTo);
      });
      this.addHook('persistentStateReset', function () {
        return _this2.resetValue();
      });
      _get(_getPrototypeOf(PersistentState.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.storage = void 0;
      _get(_getPrototypeOf(PersistentState.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`persistentState`](@/api/options.md#persistentstate)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(PersistentState.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Loads the value from local storage.
     *
     * @param {string} key Storage key.
     * @param {object} saveTo Saved value from local storage.
     */
  }, {
    key: "loadValue",
    value: function loadValue(key, saveTo) {
      saveTo.value = this.storage.loadValue(key);
    }

    /**
     * Saves the data to local storage.
     *
     * @param {string} key Storage key.
     * @param {Mixed} value Value to save.
     */
  }, {
    key: "saveValue",
    value: function saveValue(key, value) {
      this.storage.saveValue(key, value);
    }

    /**
     * Resets the data or all data from local storage.
     *
     * @param {string} key [optional] Storage key.
     */
  }, {
    key: "resetValue",
    value: function resetValue(key) {
      if (typeof key === 'undefined') {
        this.storage.resetAll();
      } else {
        this.storage.reset(key);
      }
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(PersistentState.prototype), "destroy", this).call(this);
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
  return PersistentState;
}(BasePlugin);