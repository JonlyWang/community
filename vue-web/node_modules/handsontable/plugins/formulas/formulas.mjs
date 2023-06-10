function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.reverse.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
import { BasePlugin } from "../base/index.mjs";
import staticRegister from "../../utils/staticRegister.mjs";
import { error, warn } from "../../helpers/console.mjs";
import { isNumeric } from "../../helpers/number.mjs";
import { isDefined, isUndefined } from "../../helpers/mixed.mjs";
import { setupEngine, setupSheet, unregisterEngine, getRegisteredHotInstances } from "./engine/register.mjs";
import { isEscapedFormulaExpression, unescapeFormulaExpression } from "./utils.mjs";
import { getEngineSettingsWithOverrides } from "./engine/settings.mjs";
import { isArrayOfArrays } from "../../helpers/data.mjs";
import { toUpperCaseFirst } from "../../helpers/string.mjs";
import Hooks from "../../pluginHooks.mjs";
export var PLUGIN_KEY = 'formulas';
export var PLUGIN_PRIORITY = 260;
var ROW_MOVE_UNDO_REDO_NAME = 'row_move';
Hooks.getSingleton().register('afterNamedExpressionAdded');
Hooks.getSingleton().register('afterNamedExpressionRemoved');
Hooks.getSingleton().register('afterSheetAdded');
Hooks.getSingleton().register('afterSheetRemoved');
Hooks.getSingleton().register('afterSheetRenamed');
Hooks.getSingleton().register('afterFormulasValuesUpdate');

// This function will be used for detecting changes coming from the `UndoRedo` plugin. This kind of change won't be
// handled by whole body of listeners and therefore won't change undo/redo stack inside engine provided by HyperFormula.
// HyperFormula's `undo` and `redo` methods will do it instead. Please keep in mind that undo/redo stacks inside
// instances of Handsontable and HyperFormula should be synced (number of actions should be the same).
var isBlockedSource = function isBlockedSource(source) {
  return source === 'UndoRedo.undo' || source === 'UndoRedo.redo' || source === 'auto';
};

/**
 * This plugin allows you to perform Excel-like calculations in your business applications. It does it by an
 * integration with our other product, [HyperFormula](https://github.com/handsontable/hyperformula/), which is a
 * powerful calculation engine with an extensive number of features.
 *
 * To test out HyperFormula, see [this guide](@/guides/formulas/formula-calculation.md#available-functions).
 *
 * @plugin Formulas
 * @class Formulas
 */
var _internalOperationPending = /*#__PURE__*/new WeakMap();
var _hotWasInitializedWithEmptyData = /*#__PURE__*/new WeakMap();
var _engineListeners = /*#__PURE__*/new WeakMap();
export var Formulas = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Formulas, _BasePlugin);
  var _super = _createSuper(Formulas);
  function Formulas() {
    var _this;
    _classCallCheck(this, Formulas);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _internalOperationPending, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _hotWasInitializedWithEmptyData, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _engineListeners, {
      writable: true,
      value: [['valuesUpdated', function () {
        var _this2;
        return (_this2 = _this).onEngineValuesUpdated.apply(_this2, arguments);
      }], ['namedExpressionAdded', function () {
        var _this3;
        return (_this3 = _this).onEngineNamedExpressionsAdded.apply(_this3, arguments);
      }], ['namedExpressionRemoved', function () {
        var _this4;
        return (_this4 = _this).onEngineNamedExpressionsRemoved.apply(_this4, arguments);
      }], ['sheetAdded', function () {
        var _this5;
        return (_this5 = _this).onEngineSheetAdded.apply(_this5, arguments);
      }], ['sheetRenamed', function () {
        var _this6;
        return (_this6 = _this).onEngineSheetRenamed.apply(_this6, arguments);
      }], ['sheetRemoved', function () {
        var _this7;
        return (_this7 = _this).onEngineSheetRemoved.apply(_this7, arguments);
      }]]
    });
    _defineProperty(_assertThisInitialized(_this), "staticRegister", staticRegister('formulas'));
    _defineProperty(_assertThisInitialized(_this), "engine", null);
    _defineProperty(_assertThisInitialized(_this), "sheetName", null);
    return _this;
  }
  _createClass(Formulas, [{
    key: "sheetId",
    get:
    /**
     * HyperFormula's sheet id.
     *
     * @type {number|null}
     */
    function get() {
      return this.sheetName === null ? null : this.engine.getSheetId(this.sheetName);
    }

    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` then the {@link Formulas#enablePlugin} method is called.
     *
     * @returns {boolean}
     */
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      /* eslint-disable no-unneeded-ternary */
      return this.hot.getSettings()[PLUGIN_KEY] ? true : false;
    }

    /**
     * Enables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _setupEngine,
        _this8 = this;
      if (this.enabled) {
        return;
      }
      this.engine = (_setupEngine = setupEngine(this.hot)) !== null && _setupEngine !== void 0 ? _setupEngine : this.engine;
      if (!this.engine) {
        warn('Missing the required `engine` key in the Formulas settings. Please fill it with either an' + ' engine class or an engine instance.');
        return;
      }

      // Useful for disabling -> enabling the plugin using `updateSettings` or the API.
      if (this.sheetName !== null && !this.engine.doesSheetExist(this.sheetName)) {
        var newSheetName = this.addSheet(this.sheetName, this.hot.getSourceDataArray());
        if (newSheetName !== false) {
          this.sheetName = newSheetName;
        }
      }
      this.addHook('beforeLoadData', function () {
        return _this8.onBeforeLoadData.apply(_this8, arguments);
      });
      this.addHook('afterLoadData', function () {
        return _this8.onAfterLoadData.apply(_this8, arguments);
      });
      this.addHook('modifyData', function () {
        return _this8.onModifyData.apply(_this8, arguments);
      });
      this.addHook('modifySourceData', function () {
        return _this8.onModifySourceData.apply(_this8, arguments);
      });
      this.addHook('beforeValidate', function () {
        return _this8.onBeforeValidate.apply(_this8, arguments);
      });
      this.addHook('afterSetSourceDataAtCell', function () {
        return _this8.onAfterSetSourceDataAtCell.apply(_this8, arguments);
      });
      this.addHook('afterSetDataAtCell', function () {
        return _this8.onAfterSetDataAtCell.apply(_this8, arguments);
      });
      this.addHook('afterSetDataAtRowProp', function () {
        return _this8.onAfterSetDataAtCell.apply(_this8, arguments);
      });
      this.addHook('beforeCreateRow', function () {
        return _this8.onBeforeCreateRow.apply(_this8, arguments);
      });
      this.addHook('beforeCreateCol', function () {
        return _this8.onBeforeCreateCol.apply(_this8, arguments);
      });
      this.addHook('afterCreateRow', function () {
        return _this8.onAfterCreateRow.apply(_this8, arguments);
      });
      this.addHook('afterCreateCol', function () {
        return _this8.onAfterCreateCol.apply(_this8, arguments);
      });
      this.addHook('beforeRemoveRow', function () {
        return _this8.onBeforeRemoveRow.apply(_this8, arguments);
      });
      this.addHook('beforeRemoveCol', function () {
        return _this8.onBeforeRemoveCol.apply(_this8, arguments);
      });
      this.addHook('afterRemoveRow', function () {
        return _this8.onAfterRemoveRow.apply(_this8, arguments);
      });
      this.addHook('afterRemoveCol', function () {
        return _this8.onAfterRemoveCol.apply(_this8, arguments);
      });

      // Handling undo actions on data just using HyperFormula's UndoRedo mechanism
      this.addHook('beforeUndo', function (action) {
        // TODO: Move action isn't handled by HyperFormula.
        if ((action === null || action === void 0 ? void 0 : action.actionType) === ROW_MOVE_UNDO_REDO_NAME) {
          return;
        }
        _this8.engine.undo();
      });

      // Handling redo actions on data just using HyperFormula's UndoRedo mechanism
      this.addHook('beforeRedo', function (action) {
        // TODO: Move action isn't handled by HyperFormula.
        if ((action === null || action === void 0 ? void 0 : action.actionType) === ROW_MOVE_UNDO_REDO_NAME) {
          return;
        }
        _this8.engine.redo();
      });
      this.addHook('afterDetachChild', function () {
        return _this8.onAfterDetachChild.apply(_this8, arguments);
      });
      this.addHook('beforeAutofill', function () {
        return _this8.onBeforeAutofill.apply(_this8, arguments);
      });
      _classPrivateFieldGet(this, _engineListeners).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          eventName = _ref2[0],
          listener = _ref2[1];
        return _this8.engine.on(eventName, listener);
      });
      _get(_getPrototypeOf(Formulas.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var _this9 = this;
      _classPrivateFieldGet(this, _engineListeners).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          eventName = _ref4[0],
          listener = _ref4[1];
        return _this9.engine.off(eventName, listener);
      });
      unregisterEngine(this.engine, this.hot);
      this.engine = null;
      _get(_getPrototypeOf(Formulas.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Triggered on `updateSettings`.
     *
     * @private
     * @param {object} newSettings New set of settings passed to the `updateSettings` method.
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin(newSettings) {
      this.engine.updateConfig(getEngineSettingsWithOverrides(this.hot.getSettings()));
      var pluginSettings = this.hot.getSettings()[PLUGIN_KEY];
      if (isDefined(pluginSettings) && isDefined(pluginSettings.sheetName) && pluginSettings.sheetName !== this.sheetName) {
        this.switchSheet(pluginSettings.sheetName);
      }

      // If no data was passed to the `updateSettings` method and no sheet is connected to the instance -> create a
      // new sheet using the currently used data. Otherwise, it will be handled by the `afterLoadData` call.
      if (!newSettings.data && this.sheetName === null) {
        var sheetName = this.hot.getSettings()[PLUGIN_KEY].sheetName;
        if (sheetName && this.engine.doesSheetExist(sheetName)) {
          this.switchSheet(this.sheetName);
        } else {
          this.sheetName = this.addSheet(sheetName !== null && sheetName !== void 0 ? sheetName : void 0, this.hot.getSourceDataArray());
        }
      }
      _get(_getPrototypeOf(Formulas.prototype), "updatePlugin", this).call(this, newSettings);
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var _this10 = this;
      _classPrivateFieldGet(this, _engineListeners).forEach(function (_ref5) {
        var _this10$engine;
        var _ref6 = _slicedToArray(_ref5, 2),
          eventName = _ref6[0],
          listener = _ref6[1];
        return (_this10$engine = _this10.engine) === null || _this10$engine === void 0 ? void 0 : _this10$engine.off(eventName, listener);
      });
      _classPrivateFieldSet(this, _engineListeners, null);
      unregisterEngine(this.engine, this.hot);
      this.engine = null;
      _get(_getPrototypeOf(Formulas.prototype), "destroy", this).call(this);
    }

    /**
     * Helper function for `toPhysicalRowPosition` and `toPhysicalColumnPosition`.
     *
     * @private
     * @param {number} visualIndex Visual entry index.
     * @param {number} physicalIndex Physical entry index.
     * @param {number} entriesCount Visual entries count.
     * @param {number} sourceEntriesCount Source entries count.
     * @param {boolean} contained `true` if it should return only indexes within boundaries of the table (basically
     * `toPhysical` alias.
     * @returns {*}
     */
  }, {
    key: "getPhysicalIndexPosition",
    value: function getPhysicalIndexPosition(visualIndex, physicalIndex, entriesCount, sourceEntriesCount, contained) {
      if (!contained) {
        if (visualIndex >= entriesCount) {
          return sourceEntriesCount + (visualIndex - entriesCount);
        }
      }
      return physicalIndex;
    }

    /**
     * Returns the physical row index. The difference between this and Core's `toPhysical` is that it doesn't return
     * `null` on rows with indexes higher than the number of rows.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {boolean} [contained] `true` if it should return only indexes within boundaries of the table (basically
     * `toPhysical` alias.
     * @returns {number} The physical row index.
     */
  }, {
    key: "toPhysicalRowPosition",
    value: function toPhysicalRowPosition(row) {
      var contained = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.getPhysicalIndexPosition(row, this.hot.toPhysicalRow(row), this.hot.countRows(), this.hot.countSourceRows(), contained);
    }

    /**
     * Returns the physical column index. The difference between this and Core's `toPhysical` is that it doesn't return
     * `null` on columns with indexes higher than the number of columns.
     *
     * @private
     * @param {number} column Visual column index.
     * @param {boolean} [contained] `true` if it should return only indexes within boundaries of the table (basically
     * `toPhysical` alias.
     * @returns {number} The physical column index.
     */
  }, {
    key: "toPhysicalColumnPosition",
    value: function toPhysicalColumnPosition(column) {
      var contained = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.getPhysicalIndexPosition(column, this.hot.toPhysicalColumn(column), this.hot.countCols(), this.hot.countSourceCols(), contained);
    }

    /**
     * Add a sheet to the shared HyperFormula instance.
     *
     * @param {string|null} [sheetName] The new sheet name. If not provided (or a null is passed), will be
     * auto-generated by HyperFormula.
     * @param {Array} [sheetData] Data passed to the shared HyperFormula instance. Has to be declared as an array of
     * arrays - array of objects is not supported in this scenario.
     * @returns {boolean|string} `false` if the data format is unusable or it is impossible to add a new sheet to the
     * engine, the created sheet name otherwise.
     */
  }, {
    key: "addSheet",
    value: function addSheet(sheetName, sheetData) {
      if (isDefined(sheetData) && !isArrayOfArrays(sheetData)) {
        warn('The provided data should be an array of arrays.');
        return false;
      }
      if (sheetName !== void 0 && sheetName !== null && this.engine.doesSheetExist(sheetName)) {
        warn('Sheet with the provided name already exists.');
        return false;
      }
      try {
        var actualSheetName = this.engine.addSheet(sheetName !== null && sheetName !== void 0 ? sheetName : void 0);
        if (sheetData) {
          this.engine.setSheetContent(this.engine.getSheetId(actualSheetName), sheetData);
        }
        return actualSheetName;
      } catch (e) {
        warn(e.message);
        return false;
      }
    }

    /**
     * Switch the sheet used as data in the Handsontable instance (it loads the data from the shared HyperFormula
     * instance).
     *
     * @param {string} sheetName Sheet name used in the shared HyperFormula instance.
     */
  }, {
    key: "switchSheet",
    value: function switchSheet(sheetName) {
      if (!this.engine.doesSheetExist(sheetName)) {
        error("The sheet named `".concat(sheetName, "` does not exist, switch aborted."));
        return;
      }
      this.sheetName = sheetName;
      var serialized = this.engine.getSheetSerialized(this.sheetId);
      if (serialized.length > 0) {
        this.hot.loadData(serialized, "".concat(toUpperCaseFirst(PLUGIN_KEY), ".switchSheet"));
      }
    }

    /**
     * Get the cell type under specified visual coordinates.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {number} [sheet] The target sheet id, defaults to the current sheet.
     * @returns {string} Possible values: 'FORMULA' | 'VALUE' | 'ARRAYFORMULA' | 'EMPTY'.
     */
  }, {
    key: "getCellType",
    value: function getCellType(row, column) {
      var sheet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.sheetId;
      var physicalRow = this.hot.toPhysicalRow(row);
      var physicalColumn = this.hot.toPhysicalColumn(column);
      if (physicalRow !== null && physicalColumn !== null) {
        return this.engine.getCellType({
          sheet: sheet,
          row: physicalRow,
          col: physicalColumn
        });
      } else {
        // Should return `EMPTY` when out of bounds (according to the test cases).
        return 'EMPTY';
      }
    }

    /**
     * Returns `true` if under specified visual coordinates is formula.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {number} [sheet] The target sheet id, defaults to the current sheet.
     * @returns {boolean}
     */
  }, {
    key: "isFormulaCellType",
    value: function isFormulaCellType(row, column) {
      var sheet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.sheetId;
      var physicalRow = this.hot.toPhysicalRow(row);
      var physicalColumn = this.hot.toPhysicalColumn(column);
      if (physicalRow === null || physicalColumn === null) {
        return false;
      }
      return this.engine.doesCellHaveFormula({
        sheet: sheet,
        row: physicalRow,
        col: physicalColumn
      });
    }

    /**
     * Renders dependent sheets (handsontable instances) based on the changes - list of the
     * recalculated dependent cells.
     *
     * @private
     * @param {object[]} dependentCells The values and location of applied changes within HF engine.
     * @param {boolean} [renderSelf] `true` if it's supposed to render itself, `false` otherwise.
     */
  }, {
    key: "renderDependentSheets",
    value: function renderDependentSheets(dependentCells) {
      var _this11 = this;
      var renderSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var affectedSheetIds = new Set();
      dependentCells.forEach(function (change) {
        var _change$address;
        // For the Named expression the address is empty, hence the `sheetId` is undefined.
        var sheetId = change === null || change === void 0 ? void 0 : (_change$address = change.address) === null || _change$address === void 0 ? void 0 : _change$address.sheet;
        if (sheetId !== void 0) {
          if (!affectedSheetIds.has(sheetId)) {
            affectedSheetIds.add(sheetId);
          }
        }
      });
      getRegisteredHotInstances(this.engine).forEach(function (relatedHot, sheetId) {
        if ((renderSelf || sheetId !== _this11.sheetId) && affectedSheetIds.has(sheetId)) {
          var _relatedHot$view;
          relatedHot.render();
          (_relatedHot$view = relatedHot.view) === null || _relatedHot$view === void 0 ? void 0 : _relatedHot$view.adjustElementsSize();
        }
      });
    }

    /**
     * Validates dependent cells based on the cells that are modified by the change.
     *
     * @private
     * @param {object[]} dependentCells The values and location of applied changes within HF engine.
     * @param {object[]} [changedCells] The values and location of applied changes by developer (through API or UI).
     */
  }, {
    key: "validateDependentCells",
    value: function validateDependentCells(dependentCells) {
      var _this12 = this;
      var changedCells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var stringifyAddress = function stringifyAddress(change) {
        var _change$address2;
        var _ref7 = (_change$address2 = change === null || change === void 0 ? void 0 : change.address) !== null && _change$address2 !== void 0 ? _change$address2 : {},
          row = _ref7.row,
          col = _ref7.col,
          sheet = _ref7.sheet;
        return isDefined(sheet) ? "".concat(sheet, ":").concat(row, "x").concat(col) : '';
      };
      var changedCellsSet = new Set(changedCells.map(function (change) {
        return stringifyAddress(change);
      }));
      dependentCells.forEach(function (change) {
        var _change$address3, _change$address4;
        var _ref8 = (_change$address3 = change.address) !== null && _change$address3 !== void 0 ? _change$address3 : {},
          row = _ref8.row,
          col = _ref8.col;
        var visualRow = isDefined(row) ? _this12.hot.toVisualRow(row) : null;
        var visualColumn = isDefined(col) ? _this12.hot.toVisualColumn(col) : null;

        // Don't try to validate cells outside of the visual part of the table.
        if (visualRow === null || visualColumn === null) {
          return;
        }

        // For the Named expression the address is empty, hence the `sheetId` is undefined.
        var sheetId = change === null || change === void 0 ? void 0 : (_change$address4 = change.address) === null || _change$address4 === void 0 ? void 0 : _change$address4.sheet;
        var addressId = stringifyAddress(change);

        // Validate the cells that depend on the calculated formulas. Skip that cells
        // where the user directly changes the values - the Core triggers those validators.
        if (sheetId !== void 0 && !changedCellsSet.has(addressId)) {
          var boundHot = getRegisteredHotInstances(_this12.engine).get(sheetId);

          // if `sheetId` is not bound to any Handsontable instance, skip the validation process
          if (!boundHot) {
            return;
          }

          // It will just re-render certain cell when necessary.
          boundHot.validateCell(boundHot.getDataAtCell(visualRow, visualColumn), boundHot.getCellMeta(visualRow, visualColumn), function () {});
        }
      });
    }

    /**
     * Sync a change from the change-related hooks with the engine.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {Handsontable.CellValue} newValue New value.
     * @returns {Array} Array of changes exported from the engine.
     */
  }, {
    key: "syncChangeWithEngine",
    value: function syncChangeWithEngine(row, column, newValue) {
      var address = {
        row: this.toPhysicalRowPosition(row),
        col: this.toPhysicalColumnPosition(column),
        sheet: this.sheetId
      };
      if (!this.engine.isItPossibleToSetCellContents(address)) {
        warn("Not possible to set cell data at ".concat(JSON.stringify(address)));
        return;
      }
      return this.engine.setCellContents(address, newValue);
    }

    /**
     * The hook allows to translate the formula value to calculated value before it goes to the
     * validator function.
     *
     * @private
     * @param {*} value The cell value to validate.
     * @param {number} visualRow The visual row index.
     * @param {number|string} prop The visual column index or property name of the column.
     * @returns {*} Returns value to validate.
     */
  }, {
    key: "onBeforeValidate",
    value: function onBeforeValidate(value, visualRow, prop) {
      var visualColumn = this.hot.propToCol(prop);
      if (this.isFormulaCellType(visualRow, visualColumn)) {
        var address = {
          row: this.hot.toPhysicalRow(visualRow),
          col: this.hot.toPhysicalColumn(visualColumn),
          sheet: this.sheetId
        };
        var cellValue = this.engine.getCellValue(address);

        // If `cellValue` is an object it is expected to be an error
        return _typeof(cellValue) === 'object' && cellValue !== null ? cellValue.value : cellValue;
      }
      return value;
    }

    /**
     * `onBeforeAutofill` hook callback.
     *
     * @private
     * @param {Array[]} fillData The data that was used to fill the `targetRange`. If `beforeAutofill` was used
     * and returned `[[]]`, this will be the same object that was returned from `beforeAutofill`.
     * @param {CellRange} sourceRange The range values will be filled from.
     * @param {CellRange} targetRange The range new values will be filled into.
     * @returns {boolean|*}
     */
  }, {
    key: "onBeforeAutofill",
    value: function onBeforeAutofill(fillData, sourceRange, targetRange) {
      var _this13 = this;
      var withSheetId = function withSheetId(range) {
        return _objectSpread(_objectSpread({}, range), {}, {
          sheet: _this13.sheetId
        });
      };
      var engineSourceRange = {
        start: withSheetId(sourceRange.getTopStartCorner()),
        end: withSheetId(sourceRange.getBottomEndCorner())
      };
      var engineTargetRange = {
        start: withSheetId(targetRange.getTopStartCorner()),
        end: withSheetId(targetRange.getBottomEndCorner())
      };

      // Blocks the autofill operation if HyperFormula says that at least one of
      // the underlying cell's contents cannot be set.
      if (this.engine.isItPossibleToSetCellContents(engineTargetRange) === false) {
        return false;
      }
      return this.engine.getFillRangeData(engineSourceRange, engineTargetRange);
    }

    /**
     * `beforeLoadData` hook callback.
     *
     * @param {Array} sourceData Array of arrays or array of objects containing data.
     * @param {boolean} initialLoad Flag that determines whether the data has been loaded during the initialization.
     * @param {string} [source] Source of the call.
     * @private
     */
  }, {
    key: "onBeforeLoadData",
    value: function onBeforeLoadData(sourceData, initialLoad) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      if (source.includes(toUpperCaseFirst(PLUGIN_KEY))) {
        return;
      }

      // This flag needs to be defined, because not passing data to HOT results in HOT auto-generating a `null`-filled
      // initial dataset.
      _classPrivateFieldSet(this, _hotWasInitializedWithEmptyData, isUndefined(this.hot.getSettings().data));
    }

    /**
     * `afterLoadData` hook callback.
     *
     * @param {Array} sourceData Array of arrays or array of objects containing data.
     * @param {boolean} initialLoad Flag that determines whether the data has been loaded during the initialization.
     * @param {string} [source] Source of the call.
     * @private
     */
  }, {
    key: "onAfterLoadData",
    value: function onAfterLoadData(sourceData, initialLoad) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      if (source.includes(toUpperCaseFirst(PLUGIN_KEY))) {
        return;
      }
      this.sheetName = setupSheet(this.engine, this.hot.getSettings()[PLUGIN_KEY].sheetName);
      if (!_classPrivateFieldGet(this, _hotWasInitializedWithEmptyData)) {
        var sourceDataArray = this.hot.getSourceDataArray();
        if (this.engine.isItPossibleToReplaceSheetContent(this.sheetId, sourceDataArray)) {
          _classPrivateFieldSet(this, _internalOperationPending, true);
          var dependentCells = this.engine.setSheetContent(this.sheetId, this.hot.getSourceDataArray());
          this.renderDependentSheets(dependentCells);
          _classPrivateFieldSet(this, _internalOperationPending, false);
        }
      } else {
        this.switchSheet(this.sheetName);
      }
    }

    /**
     * `modifyData` hook callback.
     *
     * @private
     * @param {number} row Physical row height.
     * @param {number} column Physical column index.
     * @param {object} valueHolder Object which contains original value which can be modified by overwriting `.value`
     *   property.
     * @param {string} ioMode String which indicates for what operation hook is fired (`get` or `set`).
     */
  }, {
    key: "onModifyData",
    value: function onModifyData(row, column, valueHolder, ioMode) {
      if (ioMode !== 'get' || _classPrivateFieldGet(this, _internalOperationPending) || this.sheetName === null || !this.engine.doesSheetExist(this.sheetName)) {
        return;
      }
      var visualRow = this.hot.toVisualRow(row);

      // `column` is here as visual index because of inconsistencies related to hook execution in `src/dataMap`.
      var isFormulaCellType = this.isFormulaCellType(visualRow, column);
      if (!isFormulaCellType) {
        var cellType = this.getCellType(visualRow, column);
        if (cellType !== 'ARRAY') {
          if (isEscapedFormulaExpression(valueHolder.value)) {
            valueHolder.value = unescapeFormulaExpression(valueHolder.value);
          }
          return;
        }
      }

      // `toPhysicalColumn` is here because of inconsistencies related to hook execution in `DataMap`.
      var address = {
        row: row,
        col: this.toPhysicalColumnPosition(column),
        sheet: this.sheetId
      };
      var cellValue = this.engine.getCellValue(address);

      // If `cellValue` is an object it is expected to be an error
      var value = _typeof(cellValue) === 'object' && cellValue !== null ? cellValue.value : cellValue;
      valueHolder.value = value;
    }

    /**
     * `modifySourceData` hook callback.
     *
     * @private
     * @param {number} row Physical row index.
     * @param {number|string} columnOrProp Physical column index or prop.
     * @param {object} valueHolder Object which contains original value which can be modified by overwriting `.value`
     *   property.
     * @param {string} ioMode String which indicates for what operation hook is fired (`get` or `set`).
     */
  }, {
    key: "onModifySourceData",
    value: function onModifySourceData(row, columnOrProp, valueHolder, ioMode) {
      if (ioMode !== 'get' || _classPrivateFieldGet(this, _internalOperationPending) || this.sheetName === null || !this.engine.doesSheetExist(this.sheetName)) {
        return;
      }
      var visualRow = this.hot.toVisualRow(row);
      var visualColumn = this.hot.propToCol(columnOrProp);

      // `column` is here as visual index because of inconsistencies related to hook execution in `src/dataMap`.
      var isFormulaCellType = this.isFormulaCellType(visualRow, visualColumn);
      if (!isFormulaCellType) {
        var cellType = this.getCellType(visualRow, visualColumn);
        if (cellType !== 'ARRAY') {
          return;
        }
      }
      var dimensions = this.engine.getSheetDimensions(this.engine.getSheetId(this.sheetName));

      // Don't actually change the source data if HyperFormula is not
      // initialized yet. This is done to allow the `afterLoadData` hook to
      // load the existing source data with `Handsontable#getSourceDataArray`
      // properly.
      if (dimensions.width === 0 && dimensions.height === 0) {
        return;
      }
      var address = {
        row: row,
        // Workaround for inconsistencies in `src/dataSource.js`
        col: this.toPhysicalColumnPosition(visualColumn),
        sheet: this.sheetId
      };
      valueHolder.value = this.engine.getCellSerialized(address);
    }

    /**
     * `onAfterSetDataAtCell` hook callback.
     *
     * @private
     * @param {Array[]} changes An array of changes in format [[row, prop, oldValue, value], ...].
     * @param {string} [source] String that identifies source of hook call
     *                          ([list of all available sources]{@link http://docs.handsontable.com/tutorial-using-callbacks.html#page-source-definition}).
     */
  }, {
    key: "onAfterSetDataAtCell",
    value: function onAfterSetDataAtCell(changes, source) {
      var _this14 = this;
      if (isBlockedSource(source)) {
        return;
      }
      var outOfBoundsChanges = [];
      var changedCells = [];
      var dependentCells = this.engine.batch(function () {
        changes.forEach(function (_ref9) {
          var _ref10 = _slicedToArray(_ref9, 4),
            row = _ref10[0],
            prop = _ref10[1],
            newValue = _ref10[3];
          var column = _this14.hot.propToCol(prop);
          var physicalRow = _this14.hot.toPhysicalRow(row);
          var physicalColumn = _this14.hot.toPhysicalColumn(column);
          var address = {
            row: physicalRow,
            col: physicalColumn,
            sheet: _this14.sheetId
          };
          if (physicalRow !== null && physicalColumn !== null) {
            _this14.syncChangeWithEngine(row, column, newValue);
          } else {
            outOfBoundsChanges.push([row, column, newValue]);
          }
          changedCells.push({
            address: address
          });
        });
      });
      if (outOfBoundsChanges.length) {
        // Workaround for rows/columns being created two times (by HOT and the engine).
        // (unfortunately, this requires an extra re-render)
        this.hot.addHookOnce('afterChange', function () {
          var outOfBoundsDependentCells = _this14.engine.batch(function () {
            outOfBoundsChanges.forEach(function (_ref11) {
              var _ref12 = _slicedToArray(_ref11, 3),
                row = _ref12[0],
                column = _ref12[1],
                newValue = _ref12[2];
              _this14.syncChangeWithEngine(row, column, newValue);
            });
          });
          _this14.renderDependentSheets(outOfBoundsDependentCells, true);
        });
      }
      this.renderDependentSheets(dependentCells);
      this.validateDependentCells(dependentCells, changedCells);
    }

    /**
     * `onAfterSetSourceDataAtCell` hook callback.
     *
     * @private
     * @param {Array[]} changes An array of changes in format [[row, column, oldValue, value], ...].
     * @param {string} [source] String that identifies source of hook call
     *                          ([list of all available sources]{@link http://docs.handsontable.com/tutorial-using-callbacks.html#page-source-definition}).
     */
  }, {
    key: "onAfterSetSourceDataAtCell",
    value: function onAfterSetSourceDataAtCell(changes, source) {
      var _this15 = this;
      if (isBlockedSource(source)) {
        return;
      }
      var dependentCells = [];
      var changedCells = [];
      changes.forEach(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 4),
          row = _ref14[0],
          prop = _ref14[1],
          newValue = _ref14[3];
        var column = _this15.hot.propToCol(prop);
        if (!isNumeric(column)) {
          return;
        }
        var address = {
          row: row,
          col: _this15.toPhysicalColumnPosition(column),
          sheet: _this15.sheetId
        };
        if (!_this15.engine.isItPossibleToSetCellContents(address)) {
          warn("Not possible to set source cell data at ".concat(JSON.stringify(address)));
          return;
        }
        changedCells.push({
          address: address
        });
        dependentCells.push.apply(dependentCells, _toConsumableArray(_this15.engine.setCellContents(address, newValue)));
      });
      this.renderDependentSheets(dependentCells);
      this.validateDependentCells(dependentCells, changedCells);
    }

    /**
     * `beforeCreateRow` hook callback.
     *
     * @private
     * @param {number} row Represents the visual index of first newly created row in the data source array.
     * @param {number} amount Number of newly created rows in the data source array.
     * @returns {*|boolean} If false is returned the action is canceled.
     */
  }, {
    key: "onBeforeCreateRow",
    value: function onBeforeCreateRow(row, amount) {
      if (this.sheetId === null || !this.engine.doesSheetExist(this.sheetName) || !this.engine.isItPossibleToAddRows(this.sheetId, [this.toPhysicalRowPosition(row), amount])) {
        return false;
      }
    }

    /**
     * `beforeCreateCol` hook callback.
     *
     * @private
     * @param {number} col Represents the visual index of first newly created column in the data source.
     * @param {number} amount Number of newly created columns in the data source.
     * @returns {*|boolean} If false is returned the action is canceled.
     */
  }, {
    key: "onBeforeCreateCol",
    value: function onBeforeCreateCol(col, amount) {
      if (this.sheetId === null || !this.engine.doesSheetExist(this.sheetName) || !this.engine.isItPossibleToAddColumns(this.sheetId, [this.toPhysicalColumnPosition(col), amount])) {
        return false;
      }
    }

    /**
     * `beforeRemoveRow` hook callback.
     *
     * @private
     * @param {number} row Visual index of starter row.
     * @param {number} amount Amount of rows to be removed.
     * @param {number[]} physicalRows An array of physical rows removed from the data source.
     * @returns {*|boolean} If false is returned the action is canceled.
     */
  }, {
    key: "onBeforeRemoveRow",
    value: function onBeforeRemoveRow(row, amount, physicalRows) {
      var _this16 = this;
      var possible = physicalRows.every(function (physicalRow) {
        return _this16.engine.isItPossibleToRemoveRows(_this16.sheetId, [physicalRow, 1]);
      });
      return possible === false ? false : void 0;
    }

    /**
     * `beforeRemoveCol` hook callback.
     *
     * @private
     * @param {number} col Visual index of starter column.
     * @param {number} amount Amount of columns to be removed.
     * @param {number[]} physicalColumns An array of physical columns removed from the data source.
     * @returns {*|boolean} If false is returned the action is canceled.
     */
  }, {
    key: "onBeforeRemoveCol",
    value: function onBeforeRemoveCol(col, amount, physicalColumns) {
      var _this17 = this;
      var possible = physicalColumns.every(function (physicalColumn) {
        return _this17.engine.isItPossibleToRemoveColumns(_this17.sheetId, [physicalColumn, 1]);
      });
      return possible === false ? false : void 0;
    }

    /**
     * `afterCreateRow` hook callback.
     *
     * @private
     * @param {number} row Represents the visual index of first newly created row in the data source array.
     * @param {number} amount Number of newly created rows in the data source array.
     * @param {string} [source] String that identifies source of hook call
     *                          ([list of all available sources]{@link http://docs.handsontable.com/tutorial-using-callbacks.html#page-source-definition}).
     */
  }, {
    key: "onAfterCreateRow",
    value: function onAfterCreateRow(row, amount, source) {
      if (isBlockedSource(source)) {
        return;
      }
      var changes = this.engine.addRows(this.sheetId, [this.toPhysicalRowPosition(row), amount]);
      this.renderDependentSheets(changes);
    }

    /**
     * `afterCreateCol` hook callback.
     *
     * @private
     * @param {number} col Represents the visual index of first newly created column in the data source.
     * @param {number} amount Number of newly created columns in the data source.
     * @param {string} [source] String that identifies source of hook call
     *                          ([list of all available sources]{@link http://docs.handsontable.com/tutorial-using-callbacks.html#page-source-definition}).
     */
  }, {
    key: "onAfterCreateCol",
    value: function onAfterCreateCol(col, amount, source) {
      if (isBlockedSource(source)) {
        return;
      }
      var changes = this.engine.addColumns(this.sheetId, [this.toPhysicalColumnPosition(col), amount]);
      this.renderDependentSheets(changes);
    }

    /**
     * `afterRemoveRow` hook callback.
     *
     * @private
     * @param {number} row Visual index of starter row.
     * @param {number} amount An amount of removed rows.
     * @param {number[]} physicalRows An array of physical rows removed from the data source.
     * @param {string} [source] String that identifies source of hook call
     *                          ([list of all available sources]{@link http://docs.handsontable.com/tutorial-using-callbacks.html#page-source-definition}).
     */
  }, {
    key: "onAfterRemoveRow",
    value: function onAfterRemoveRow(row, amount, physicalRows, source) {
      var _this18 = this;
      if (isBlockedSource(source)) {
        return;
      }
      var descendingPhysicalRows = physicalRows.sort().reverse();
      var changes = this.engine.batch(function () {
        descendingPhysicalRows.forEach(function (physicalRow) {
          _this18.engine.removeRows(_this18.sheetId, [physicalRow, 1]);
        });
      });
      this.renderDependentSheets(changes);
    }

    /**
     * `afterRemoveCol` hook callback.
     *
     * @private
     * @param {number} col Visual index of starter column.
     * @param {number} amount An amount of removed columns.
     * @param {number[]} physicalColumns An array of physical columns removed from the data source.
     * @param {string} [source] String that identifies source of hook call
     *                          ([list of all available sources]{@link http://docs.handsontable.com/tutorial-using-callbacks.html#page-source-definition}).
     */
  }, {
    key: "onAfterRemoveCol",
    value: function onAfterRemoveCol(col, amount, physicalColumns, source) {
      var _this19 = this;
      if (isBlockedSource(source)) {
        return;
      }
      var descendingPhysicalColumns = physicalColumns.sort().reverse();
      var changes = this.engine.batch(function () {
        descendingPhysicalColumns.forEach(function (physicalColumn) {
          _this19.engine.removeColumns(_this19.sheetId, [physicalColumn, 1]);
        });
      });
      this.renderDependentSheets(changes);
    }

    /**
     * `afterDetachChild` hook callback.
     * Used to sync the data of the rows detached in the Nested Rows plugin with the engine's dataset.
     *
     * @private
     * @param {object} parent An object representing the parent from which the element was detached.
     * @param {object} element The detached element.
     * @param {number} finalElementRowIndex The final row index of the detached element.
     */
  }, {
    key: "onAfterDetachChild",
    value: function onAfterDetachChild(parent, element, finalElementRowIndex) {
      var _element$__children,
        _this20 = this;
      _classPrivateFieldSet(this, _internalOperationPending, true);
      var rowsData = this.hot.getSourceDataArray(finalElementRowIndex, 0, finalElementRowIndex + (((_element$__children = element.__children) === null || _element$__children === void 0 ? void 0 : _element$__children.length) || 0), this.hot.countSourceCols());
      _classPrivateFieldSet(this, _internalOperationPending, false);
      rowsData.forEach(function (row, relativeRowIndex) {
        row.forEach(function (value, colIndex) {
          _this20.engine.setCellContents({
            col: colIndex,
            row: finalElementRowIndex + relativeRowIndex,
            sheet: _this20.sheetId
          }, [[value]]);
        });
      });
    }

    /**
     * Called when a value is updated in the engine.
     *
     * @private
     * @fires Hooks#afterFormulasValuesUpdate
     * @param {Array} changes The values and location of applied changes.
     */
  }, {
    key: "onEngineValuesUpdated",
    value: function onEngineValuesUpdated(changes) {
      this.hot.runHooks('afterFormulasValuesUpdate', changes);
    }

    /**
     * Called when a named expression is added to the engine instance.
     *
     * @private
     * @fires Hooks#afterNamedExpressionAdded
     * @param {string} namedExpressionName The name of the added expression.
     * @param {Array} changes The values and location of applied changes.
     */
  }, {
    key: "onEngineNamedExpressionsAdded",
    value: function onEngineNamedExpressionsAdded(namedExpressionName, changes) {
      this.hot.runHooks('afterNamedExpressionAdded', namedExpressionName, changes);
    }

    /**
     * Called when a named expression is removed from the engine instance.
     *
     * @private
     * @fires Hooks#afterNamedExpressionRemoved
     * @param {string} namedExpressionName The name of the removed expression.
     * @param {Array} changes The values and location of applied changes.
     */
  }, {
    key: "onEngineNamedExpressionsRemoved",
    value: function onEngineNamedExpressionsRemoved(namedExpressionName, changes) {
      this.hot.runHooks('afterNamedExpressionRemoved', namedExpressionName, changes);
    }

    /**
     * Called when a new sheet is added to the engine instance.
     *
     * @private
     * @fires Hooks#afterSheetAdded
     * @param {string} addedSheetDisplayName The name of the added sheet.
     */
  }, {
    key: "onEngineSheetAdded",
    value: function onEngineSheetAdded(addedSheetDisplayName) {
      this.hot.runHooks('afterSheetAdded', addedSheetDisplayName);
    }

    /**
     * Called when a sheet in the engine instance is renamed.
     *
     * @private
     * @fires Hooks#afterSheetRenamed
     * @param {string} oldDisplayName The old name of the sheet.
     * @param {string} newDisplayName The new name of the sheet.
     */
  }, {
    key: "onEngineSheetRenamed",
    value: function onEngineSheetRenamed(oldDisplayName, newDisplayName) {
      this.hot.runHooks('afterSheetRenamed', oldDisplayName, newDisplayName);
    }

    /**
     * Called when a sheet is removed from the engine instance.
     *
     * @private
     * @fires Hooks#afterSheetRemoved
     * @param {string} removedSheetDisplayName The removed sheet name.
     * @param {Array} changes The values and location of applied changes.
     */
  }, {
    key: "onEngineSheetRemoved",
    value: function onEngineSheetRemoved(removedSheetDisplayName, changes) {
      this.hot.runHooks('afterSheetRemoved', removedSheetDisplayName, changes);
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

    /**
     * Flag used to bypass hooks in internal operations.
     *
     * @private
     * @type {boolean}
     */
  }]);
  return Formulas;
}(BasePlugin);