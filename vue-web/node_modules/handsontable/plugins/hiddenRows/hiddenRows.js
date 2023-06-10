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
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.HiddenRows = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.weak-map.js");
var _base = require("../base");
var _element = require("../../helpers/dom/element");
var _number = require("../../helpers/number");
var _array = require("../../helpers/array");
var _object = require("../../helpers/object");
var _mixed = require("../../helpers/mixed");
var _predefinedItems = require("../contextMenu/predefinedItems");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _hideRow = _interopRequireDefault(require("./contextMenuItem/hideRow"));
var _showRow = _interopRequireDefault(require("./contextMenuItem/showRow"));
var _translations = require("../../translations");
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
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
_pluginHooks.default.getSingleton().register('beforeHideRows');
_pluginHooks.default.getSingleton().register('afterHideRows');
_pluginHooks.default.getSingleton().register('beforeUnhideRows');
_pluginHooks.default.getSingleton().register('afterUnhideRows');
var PLUGIN_KEY = 'hiddenRows';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 320;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin HiddenRows
 * @class HiddenRows
 *
 * @description
 * The `HiddenRows` plugin lets you [hide specified rows](@/guides/rows/row-hiding.md).
 *
 * "Hiding a row" means that the hidden row doesn't get rendered as a DOM element.
 *
 * The `HiddenRows` plugin doesn't modify the source data,
 * and doesn't participate in data transformation
 * (the shape of the data returned by the [`getData*()` methods](@/api/core.md#getdata) stays intact).
 *
 * You can set the following configuration options:
 *
 * | Option | Required | Type | Default | Description |
 * |---|---|---|---|---|
 * | `rows` | No | Array | - | [Hides specified rows by default](@/guides/rows/row-hiding.md#step-1-specify-rows-hidden-by-default) |
 * | `indicators` | No | Boolean | `false` | [Shows UI indicators](@/guides/rows/row-hiding.md#step-2-show-ui-indicators) |
 * | `copyPasteEnabled` | No | Boolean | `true` | [Sets up copy/paste behavior](@/guides/rows/row-hiding.md#step-4-set-up-copy-and-paste-behavior) |
 *
 * @example
 *
 * ::: only-for javascript
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData(),
 *   hiddenRows: {
 *     copyPasteEnabled: true,
 *     indicators: true,
 *     rows: [1, 2, 5]
 *   }
 * });
 *
 * // access the `HiddenRows` plugin's instance
 * const hiddenRowsPlugin = hot.getPlugin('hiddenRows');
 *
 * // hide a single row
 * hiddenRowsPlugin.hideRow(1);
 *
 * // hide multiple rows
 * hiddenRowsPlugin.hideRow(1, 2, 9);
 *
 * // hide multiple rows as an array
 * hiddenRowsPlugin.hideRows([1, 2, 9]);
 *
 * // unhide a single row
 * hiddenRowsPlugin.showRow(1);
 *
 * // unhide multiple rows
 * hiddenRowsPlugin.showRow(1, 2, 9);
 *
 * // unhide multiple rows as an array
 * hiddenRowsPlugin.showRows([1, 2, 9]);
 *
 * // to see your changes, re-render your Handsontable instance
 * hot.render();
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * const hotRef = useRef(null);
 *
 * ...
 *
 * <HotTable
 *   ref={hotRef}
 *   data={getData()}
 *   hiddenRows={{
 *     copyPasteEnabled: true,
 *     indicators: true,
 *     rows: [1, 2, 5]
 *   }}
 * />
 *
 * // access the `HiddenRows` plugin's instance
 * const hot = hotRef.current.hotInstance;
 * const hiddenRowsPlugin = hot.getPlugin('hiddenRows');
 *
 * // hide a single row
 * hiddenRowsPlugin.hideRow(1);
 *
 * // hide multiple rows
 * hiddenRowsPlugin.hideRow(1, 2, 9);
 *
 * // hide multiple rows as an array
 * hiddenRowsPlugin.hideRows([1, 2, 9]);
 *
 * // unhide a single row
 * hiddenRowsPlugin.showRow(1);
 *
 * // unhide multiple rows
 * hiddenRowsPlugin.showRow(1, 2, 9);
 *
 * // unhide multiple rows as an array
 * hiddenRowsPlugin.showRows([1, 2, 9]);
 *
 * // to see your changes, re-render your Handsontable instance
 * hot.render();
 * ```
 * :::
 */
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var _settings = /*#__PURE__*/new WeakMap();
var _hiddenRowsMap = /*#__PURE__*/new WeakMap();
var HiddenRows = /*#__PURE__*/function (_BasePlugin) {
  _inherits(HiddenRows, _BasePlugin);
  var _super = _createSuper(HiddenRows);
  function HiddenRows() {
    var _this;
    _classCallCheck(this, HiddenRows);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _settings, {
      writable: true,
      value: {}
    });
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _hiddenRowsMap, {
      writable: true,
      value: null
    });
    return _this;
  }
  _createClass(HiddenRows, [{
    key: "isEnabled",
    value:
    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` then the {@link HiddenRows#enablePlugin} method is called.
     *
     * @returns {boolean}
     */
    function isEnabled() {
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
      var pluginSettings = this.hot.getSettings()[PLUGIN_KEY];
      if ((0, _object.isObject)(pluginSettings)) {
        _classPrivateFieldSet(this, _settings, pluginSettings);
        if ((0, _mixed.isUndefined)(pluginSettings.copyPasteEnabled)) {
          pluginSettings.copyPasteEnabled = true;
        }
      }
      _classPrivateFieldSet(this, _hiddenRowsMap, new _translations.HidingMap());
      _classPrivateFieldGet(this, _hiddenRowsMap).addLocalHook('init', function () {
        return _this2.onMapInit();
      });
      this.hot.rowIndexMapper.registerMap(this.pluginName, _classPrivateFieldGet(this, _hiddenRowsMap));
      this.addHook('afterContextMenuDefaultOptions', function () {
        return _this2.onAfterContextMenuDefaultOptions.apply(_this2, arguments);
      });
      this.addHook('afterGetCellMeta', function (row, col, cellProperties) {
        return _this2.onAfterGetCellMeta(row, col, cellProperties);
      });
      this.addHook('modifyRowHeight', function (height, row) {
        return _this2.onModifyRowHeight(height, row);
      });
      this.addHook('afterGetRowHeader', function () {
        return _this2.onAfterGetRowHeader.apply(_this2, arguments);
      });
      this.addHook('modifyCopyableRange', function (ranges) {
        return _this2.onModifyCopyableRange(ranges);
      });
      _get(_getPrototypeOf(HiddenRows.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`hiddenRows`](@/api/options.md#hiddenrows)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(HiddenRows.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.hot.rowIndexMapper.unregisterMap(this.pluginName);
      _classPrivateFieldSet(this, _settings, {});
      _get(_getPrototypeOf(HiddenRows.prototype), "disablePlugin", this).call(this);
      this.resetCellsMeta();
    }

    /**
     * Shows the rows provided in the array.
     *
     * @param {number[]} rows Array of visual row indexes.
     */
  }, {
    key: "showRows",
    value: function showRows(rows) {
      var _this3 = this;
      var currentHideConfig = this.getHiddenRows();
      var isValidConfig = this.isValidConfig(rows);
      var destinationHideConfig = currentHideConfig;
      var hidingMapValues = _classPrivateFieldGet(this, _hiddenRowsMap).getValues().slice();
      var isAnyRowShowed = rows.length > 0;
      if (isValidConfig && isAnyRowShowed) {
        var physicalRows = rows.map(function (visualRow) {
          return _this3.hot.toPhysicalRow(visualRow);
        });

        // Preparing new values for hiding map.
        (0, _array.arrayEach)(physicalRows, function (physicalRow) {
          hidingMapValues[physicalRow] = false;
        });

        // Preparing new hiding config.
        destinationHideConfig = (0, _array.arrayReduce)(hidingMapValues, function (hiddenIndexes, isHidden, physicalIndex) {
          if (isHidden) {
            hiddenIndexes.push(_this3.hot.toVisualRow(physicalIndex));
          }
          return hiddenIndexes;
        }, []);
      }
      var continueHiding = this.hot.runHooks('beforeUnhideRows', currentHideConfig, destinationHideConfig, isValidConfig && isAnyRowShowed);
      if (continueHiding === false) {
        return;
      }
      if (isValidConfig && isAnyRowShowed) {
        _classPrivateFieldGet(this, _hiddenRowsMap).setValues(hidingMapValues);
      }
      this.hot.runHooks('afterUnhideRows', currentHideConfig, destinationHideConfig, isValidConfig && isAnyRowShowed, isValidConfig && destinationHideConfig.length < currentHideConfig.length);
    }

    /**
     * Shows the row provided as row index (counting from 0).
     *
     * @param {...number} row Visual row index.
     */
  }, {
    key: "showRow",
    value: function showRow() {
      for (var _len2 = arguments.length, row = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        row[_key2] = arguments[_key2];
      }
      this.showRows(row);
    }

    /**
     * Hides the rows provided in the array.
     *
     * @param {number[]} rows Array of visual row indexes.
     */
  }, {
    key: "hideRows",
    value: function hideRows(rows) {
      var _this4 = this;
      var currentHideConfig = this.getHiddenRows();
      var isConfigValid = this.isValidConfig(rows);
      var destinationHideConfig = currentHideConfig;
      if (isConfigValid) {
        destinationHideConfig = Array.from(new Set(currentHideConfig.concat(rows)));
      }
      var continueHiding = this.hot.runHooks('beforeHideRows', currentHideConfig, destinationHideConfig, isConfigValid);
      if (continueHiding === false) {
        return;
      }
      if (isConfigValid) {
        this.hot.batchExecution(function () {
          (0, _array.arrayEach)(rows, function (visualRow) {
            _classPrivateFieldGet(_this4, _hiddenRowsMap).setValueAtIndex(_this4.hot.toPhysicalRow(visualRow), true);
          });
        }, true);
      }
      this.hot.runHooks('afterHideRows', currentHideConfig, destinationHideConfig, isConfigValid, isConfigValid && destinationHideConfig.length > currentHideConfig.length);
    }

    /**
     * Hides the row provided as row index (counting from 0).
     *
     * @param {...number} row Visual row index.
     */
  }, {
    key: "hideRow",
    value: function hideRow() {
      for (var _len3 = arguments.length, row = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        row[_key3] = arguments[_key3];
      }
      this.hideRows(row);
    }

    /**
     * Returns an array of visual indexes of hidden rows.
     *
     * @returns {number[]}
     */
  }, {
    key: "getHiddenRows",
    value: function getHiddenRows() {
      var _this5 = this;
      return (0, _array.arrayMap)(_classPrivateFieldGet(this, _hiddenRowsMap).getHiddenIndexes(), function (physicalRowIndex) {
        return _this5.hot.toVisualRow(physicalRowIndex);
      });
    }

    /**
     * Checks if the provided row is hidden.
     *
     * @param {number} row Visual row index.
     * @returns {boolean}
     */
  }, {
    key: "isHidden",
    value: function isHidden(row) {
      return _classPrivateFieldGet(this, _hiddenRowsMap).getValueAtIndex(this.hot.toPhysicalRow(row)) || false;
    }

    /**
     * Checks whether all of the provided row indexes are within the bounds of the table.
     *
     * @param {Array} hiddenRows List of hidden visual row indexes.
     * @returns {boolean}
     */
  }, {
    key: "isValidConfig",
    value: function isValidConfig(hiddenRows) {
      var nrOfRows = this.hot.countRows();
      if (Array.isArray(hiddenRows) && hiddenRows.length > 0) {
        return hiddenRows.every(function (visualRow) {
          return Number.isInteger(visualRow) && visualRow >= 0 && visualRow < nrOfRows;
        });
      }
      return false;
    }

    /**
     * Resets all rendered cells meta.
     *
     * @private
     */
  }, {
    key: "resetCellsMeta",
    value: function resetCellsMeta() {
      (0, _array.arrayEach)(this.hot.getCellsMeta(), function (meta) {
        if (meta) {
          meta.skipRowOnPaste = false;
        }
      });
    }

    /**
     * Adds the additional row height for the hidden row indicators.
     *
     * @private
     * @param {number|undefined} height Row height.
     * @param {number} row Visual row index.
     * @returns {number}
     */
  }, {
    key: "onModifyRowHeight",
    value: function onModifyRowHeight(height, row) {
      // Hook is triggered internally only for the visible rows. Conditional will be handled for the API
      // calls of the `getRowHeight` function on not visible indexes.
      if (this.isHidden(row)) {
        return 0;
      }
      return height;
    }

    /**
     * Sets the copy-related cell meta.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {object} cellProperties Object containing the cell properties.
     */
  }, {
    key: "onAfterGetCellMeta",
    value: function onAfterGetCellMeta(row, column, cellProperties) {
      if (_classPrivateFieldGet(this, _settings).copyPasteEnabled === false && this.isHidden(row)) {
        // Cell property handled by the `Autofill` and the `CopyPaste` plugins.
        cellProperties.skipRowOnPaste = true;
      }
      if (this.isHidden(row - 1)) {
        cellProperties.className = cellProperties.className || '';
        if (cellProperties.className.indexOf('afterHiddenRow') === -1) {
          cellProperties.className += ' afterHiddenRow';
        }
      } else if (cellProperties.className) {
        var classArr = cellProperties.className.split(' ');
        if (classArr.length > 0) {
          var containAfterHiddenRow = classArr.indexOf('afterHiddenRow');
          if (containAfterHiddenRow > -1) {
            classArr.splice(containAfterHiddenRow, 1);
          }
          cellProperties.className = classArr.join(' ');
        }
      }
    }

    /**
     * Modifies the copyable range, accordingly to the provided config.
     *
     * @private
     * @param {Array} ranges An array of objects defining copyable cells.
     * @returns {Array}
     */
  }, {
    key: "onModifyCopyableRange",
    value: function onModifyCopyableRange(ranges) {
      var _this6 = this;
      // Ranges shouldn't be modified when `copyPasteEnabled` option is set to `true` (by default).
      if (_classPrivateFieldGet(this, _settings).copyPasteEnabled) {
        return ranges;
      }
      var newRanges = [];
      var pushRange = function pushRange(startRow, endRow, startCol, endCol) {
        newRanges.push({
          startRow: startRow,
          endRow: endRow,
          startCol: startCol,
          endCol: endCol
        });
      };
      (0, _array.arrayEach)(ranges, function (range) {
        var isHidden = true;
        var rangeStart = 0;
        (0, _number.rangeEach)(range.startRow, range.endRow, function (visualRow) {
          if (_this6.isHidden(visualRow)) {
            if (!isHidden) {
              pushRange(rangeStart, visualRow - 1, range.startCol, range.endCol);
            }
            isHidden = true;
          } else {
            if (isHidden) {
              rangeStart = visualRow;
            }
            if (visualRow === range.endRow) {
              pushRange(rangeStart, visualRow, range.startCol, range.endCol);
            }
            isHidden = false;
          }
        });
      });
      return newRanges;
    }

    /**
     * Adds the needed classes to the headers.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {HTMLElement} TH Header's TH element.
     */
  }, {
    key: "onAfterGetRowHeader",
    value: function onAfterGetRowHeader(row, TH) {
      if (!_classPrivateFieldGet(this, _settings).indicators || row < 0) {
        return;
      }
      var classList = [];
      if (row >= 1 && this.isHidden(row - 1)) {
        classList.push('afterHiddenRow');
      }
      if (row < this.hot.countRows() - 1 && this.isHidden(row + 1)) {
        classList.push('beforeHiddenRow');
      }
      (0, _element.addClass)(TH, classList);
    }

    /**
     * Add Show-hide rows to context menu.
     *
     * @private
     * @param {object} options An array of objects containing information about the pre-defined Context Menu items.
     */
  }, {
    key: "onAfterContextMenuDefaultOptions",
    value: function onAfterContextMenuDefaultOptions(options) {
      options.items.push({
        name: _predefinedItems.SEPARATOR
      }, (0, _hideRow.default)(this), (0, _showRow.default)(this));
    }

    /**
     * On map initialized hook callback.
     *
     * @private
     */
  }, {
    key: "onMapInit",
    value: function onMapInit() {
      if (Array.isArray(_classPrivateFieldGet(this, _settings).rows)) {
        this.hideRows(_classPrivateFieldGet(this, _settings).rows);
      }
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _classPrivateFieldSet(this, _settings, null);
      _classPrivateFieldSet(this, _hiddenRowsMap, null);
      _get(_getPrototypeOf(HiddenRows.prototype), "destroy", this).call(this);
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
     * Cached settings from Handsontable settings.
     *
     * @private
     * @type {object}
     */
  }]);
  return HiddenRows;
}(_base.BasePlugin);
exports.HiddenRows = HiddenRows;