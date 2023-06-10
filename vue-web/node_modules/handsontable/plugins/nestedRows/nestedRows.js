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
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.NestedRows = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.set.js");
var _base = require("../base");
var _dataManager = _interopRequireDefault(require("./data/dataManager"));
var _collapsing = _interopRequireDefault(require("./ui/collapsing"));
var _headers = _interopRequireDefault(require("./ui/headers"));
var _contextMenu = _interopRequireDefault(require("./ui/contextMenu"));
var _console = require("../../helpers/console");
var _data = require("../../helpers/data");
var _translations = require("../../translations");
var _rowMoveController = _interopRequireDefault(require("./utils/rowMoveController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var PLUGIN_KEY = 'nestedRows';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 300;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var privatePool = new WeakMap();

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * Error message for the wrong data type error.
 */
var WRONG_DATA_TYPE_ERROR = 'The Nested Rows plugin requires an Array of Objects as a dataset to be' + ' provided. The plugin has been disabled.';

/**
 * @plugin NestedRows
 * @class NestedRows
 *
 * @description
 * Plugin responsible for displaying and operating on data sources with nested structures.
 */
var NestedRows = /*#__PURE__*/function (_BasePlugin) {
  _inherits(NestedRows, _BasePlugin);
  var _super = _createSuper(NestedRows);
  function NestedRows(hotInstance) {
    var _this;
    _classCallCheck(this, NestedRows);
    _this = _super.call(this, hotInstance);
    /**
     * Reference to the DataManager instance.
     *
     * @private
     * @type {object}
     */
    _this.dataManager = null;

    /**
     * Reference to the HeadersUI instance.
     *
     * @private
     * @type {object}
     */
    _this.headersUI = null;
    /**
     * Map of skipped rows by plugin.
     *
     * @private
     * @type {null|TrimmingMap}
     */
    _this.collapsedRowsMap = null;
    privatePool.set(_assertThisInitialized(_this), {
      movedToCollapsed: false,
      skipRender: null,
      skipCoreAPIModifiers: false
    });
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link NestedRows#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(NestedRows, [{
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
      this.collapsedRowsMap = this.hot.rowIndexMapper.registerMap('nestedRows', new _translations.TrimmingMap());
      this.dataManager = new _dataManager.default(this, this.hot);
      this.collapsingUI = new _collapsing.default(this, this.hot);
      this.headersUI = new _headers.default(this, this.hot);
      this.contextMenuUI = new _contextMenu.default(this, this.hot);
      this.rowMoveController = new _rowMoveController.default(this);
      this.addHook('afterInit', function () {
        return _this2.onAfterInit.apply(_this2, arguments);
      });
      this.addHook('beforeViewRender', function () {
        return _this2.onBeforeViewRender.apply(_this2, arguments);
      });
      this.addHook('modifyRowData', function () {
        return _this2.onModifyRowData.apply(_this2, arguments);
      });
      this.addHook('modifySourceLength', function () {
        return _this2.onModifySourceLength.apply(_this2, arguments);
      });
      this.addHook('beforeDataSplice', function () {
        return _this2.onBeforeDataSplice.apply(_this2, arguments);
      });
      this.addHook('filterData', function () {
        return _this2.onFilterData.apply(_this2, arguments);
      });
      this.addHook('afterContextMenuDefaultOptions', function () {
        return _this2.onAfterContextMenuDefaultOptions.apply(_this2, arguments);
      });
      this.addHook('afterGetRowHeader', function () {
        return _this2.onAfterGetRowHeader.apply(_this2, arguments);
      });
      this.addHook('beforeOnCellMouseDown', function () {
        return _this2.onBeforeOnCellMouseDown.apply(_this2, arguments);
      });
      this.addHook('beforeRemoveRow', function () {
        return _this2.onBeforeRemoveRow.apply(_this2, arguments);
      });
      this.addHook('afterRemoveRow', function () {
        return _this2.onAfterRemoveRow.apply(_this2, arguments);
      });
      this.addHook('beforeAddChild', function () {
        return _this2.onBeforeAddChild.apply(_this2, arguments);
      });
      this.addHook('afterAddChild', function () {
        return _this2.onAfterAddChild.apply(_this2, arguments);
      });
      this.addHook('beforeDetachChild', function () {
        return _this2.onBeforeDetachChild.apply(_this2, arguments);
      });
      this.addHook('afterDetachChild', function () {
        return _this2.onAfterDetachChild.apply(_this2, arguments);
      });
      this.addHook('modifyRowHeaderWidth', function () {
        return _this2.onModifyRowHeaderWidth.apply(_this2, arguments);
      });
      this.addHook('afterCreateRow', function () {
        return _this2.onAfterCreateRow.apply(_this2, arguments);
      });
      this.addHook('beforeRowMove', function () {
        return _this2.onBeforeRowMove.apply(_this2, arguments);
      });
      this.addHook('beforeLoadData', function (data) {
        return _this2.onBeforeLoadData(data);
      });
      _get(_getPrototypeOf(NestedRows.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.hot.rowIndexMapper.unregisterMap('nestedRows');
      _get(_getPrototypeOf(NestedRows.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`nestedRows`](@/api/options.md#nestedrows)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();

      // We store a state of the data manager.
      var currentSourceData = this.dataManager.getData();
      this.enablePlugin();

      // After enabling plugin previously stored data is restored.
      this.dataManager.updateWithData(currentSourceData);
      _get(_getPrototypeOf(NestedRows.prototype), "updatePlugin", this).call(this);
    }

    /**
     * `beforeRowMove` hook callback.
     *
     * @private
     * @param {Array} rows Array of visual row indexes to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements
     *   will be placed after the moving action. To check the visualization of the final index, please take a look at
     *   [documentation](@/guides/rows/row-summary.md).
     * @param {undefined|number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we
     *   are going to drop the moved elements. To check visualization of drop index please take a look at
     *   [documentation](@/guides/rows/row-summary.md).
     * @param {boolean} movePossible Indicates if it's possible to move rows to the desired position.
     * @fires Hooks#afterRowMove
     * @returns {boolean}
     */
  }, {
    key: "onBeforeRowMove",
    value: function onBeforeRowMove(rows, finalIndex, dropIndex, movePossible) {
      return this.rowMoveController.onBeforeRowMove(rows, finalIndex, dropIndex, movePossible);
    }

    /**
     * Enable the modify hook skipping flag - allows retrieving the data from Handsontable without this plugin's
     * modifications.
     */
  }, {
    key: "disableCoreAPIModifiers",
    value: function disableCoreAPIModifiers() {
      var priv = privatePool.get(this);
      priv.skipCoreAPIModifiers = true;
    }

    /**
     * Disable the modify hook skipping flag.
     */
  }, {
    key: "enableCoreAPIModifiers",
    value: function enableCoreAPIModifiers() {
      var priv = privatePool.get(this);
      priv.skipCoreAPIModifiers = false;
    }

    /**
     * `beforeOnCellMousedown` hook callback.
     *
     * @private
     * @param {MouseEvent} event Mousedown event.
     * @param {object} coords Cell coords.
     * @param {HTMLElement} TD Clicked cell.
     */
  }, {
    key: "onBeforeOnCellMouseDown",
    value: function onBeforeOnCellMouseDown(event, coords, TD) {
      this.collapsingUI.toggleState(event, coords, TD);
    }

    /**
     * The modifyRowData hook callback.
     *
     * @private
     * @param {number} row Visual row index.
     * @returns {boolean}
     */
  }, {
    key: "onModifyRowData",
    value: function onModifyRowData(row) {
      var priv = privatePool.get(this);
      if (priv.skipCoreAPIModifiers) {
        return;
      }
      return this.dataManager.getDataObject(row);
    }

    /**
     * Modify the source data length to match the length of the nested structure.
     *
     * @private
     * @returns {number}
     */
  }, {
    key: "onModifySourceLength",
    value: function onModifySourceLength() {
      var priv = privatePool.get(this);
      if (priv.skipCoreAPIModifiers) {
        return;
      }
      return this.dataManager.countAllRows();
    }

    /**
     * @private
     * @param {number} index The index where the data was spliced.
     * @param {number} amount An amount of items to remove.
     * @param {object} element An element to add.
     * @returns {boolean}
     */
  }, {
    key: "onBeforeDataSplice",
    value: function onBeforeDataSplice(index, amount, element) {
      var priv = privatePool.get(this);
      if (priv.skipCoreAPIModifiers || this.dataManager.isRowHighestLevel(index)) {
        return true;
      }
      this.dataManager.spliceData(index, amount, element);
      return false;
    }

    /**
     * Provide custom source data filtering. It's handled by core method and replaces the native filtering.
     *
     * @private
     * @param {number} index The index where the data filtering starts.
     * @param {number} amount An amount of rows which filtering applies to.
     * @param {number} physicalRows Physical row indexes.
     * @returns {Array}
     */
  }, {
    key: "onFilterData",
    value: function onFilterData(index, amount, physicalRows) {
      var priv = privatePool.get(this);
      this.collapsingUI.collapsedRowsStash.stash();
      this.collapsingUI.collapsedRowsStash.trimStash(physicalRows[0], amount);
      this.collapsingUI.collapsedRowsStash.shiftStash(physicalRows[0], null, -1 * amount);
      this.dataManager.filterData(index, amount, physicalRows);
      priv.skipRender = true;
      return this.dataManager.getData().slice(); // Data contains reference sometimes.
    }

    /**
     * `afterContextMenuDefaultOptions` hook callback.
     *
     * @private
     * @param {object} defaultOptions The default context menu items order.
     * @returns {boolean}
     */
  }, {
    key: "onAfterContextMenuDefaultOptions",
    value: function onAfterContextMenuDefaultOptions(defaultOptions) {
      return this.contextMenuUI.appendOptions(defaultOptions);
    }

    /**
     * `afterGetRowHeader` hook callback.
     *
     * @private
     * @param {number} row Row index.
     * @param {HTMLElement} TH Row header element.
     */
  }, {
    key: "onAfterGetRowHeader",
    value: function onAfterGetRowHeader(row, TH) {
      this.headersUI.appendLevelIndicators(row, TH);
    }

    /**
     * `modifyRowHeaderWidth` hook callback.
     *
     * @private
     * @param {number} rowHeaderWidth The initial row header width(s).
     * @returns {number}
     */
  }, {
    key: "onModifyRowHeaderWidth",
    value: function onModifyRowHeaderWidth(rowHeaderWidth) {
      return this.headersUI.rowHeaderWidthCache || rowHeaderWidth;
    }

    /**
     * `onAfterRemoveRow` hook callback.
     *
     * @private
     * @param {number} index Removed row.
     * @param {number} amount Amount of removed rows.
     * @param {Array} logicRows An array of the removed physical rows.
     * @param {string} source Source of action.
     */
  }, {
    key: "onAfterRemoveRow",
    value: function onAfterRemoveRow(index, amount, logicRows, source) {
      var _this3 = this;
      if (source === this.pluginName) {
        return;
      }
      var priv = privatePool.get(this);
      setTimeout(function () {
        priv.skipRender = null;
        _this3.headersUI.updateRowHeaderWidth();
        _this3.collapsingUI.collapsedRowsStash.applyStash();
      }, 0);
    }

    /**
     * Callback for the `beforeRemoveRow` change list of removed physical indexes by reference. Removing parent node
     * has effect in removing children nodes.
     *
     * @private
     * @param {number} index Visual index of starter row.
     * @param {number} amount Amount of rows to be removed.
     * @param {Array} physicalRows List of physical indexes.
     */
  }, {
    key: "onBeforeRemoveRow",
    value: function onBeforeRemoveRow(index, amount, physicalRows) {
      var _this4 = this;
      var modifiedPhysicalRows = Array.from(physicalRows.reduce(function (removedRows, physicalIndex) {
        if (_this4.dataManager.isParent(physicalIndex)) {
          var children = _this4.dataManager.getDataObject(physicalIndex).__children;

          // Preserve a parent in the list of removed rows.
          removedRows.add(physicalIndex);
          if (Array.isArray(children)) {
            // Add a children to the list of removed rows.
            children.forEach(function (child) {
              return removedRows.add(_this4.dataManager.getRowIndex(child));
            });
          }
          return removedRows;
        }

        // Don't modify list of removed rows when already checked element isn't a parent.
        return removedRows.add(physicalIndex);
      }, new Set()));

      // Modifying hook's argument by the reference.
      physicalRows.length = 0;
      physicalRows.push.apply(physicalRows, modifiedPhysicalRows);
    }

    /**
     * `beforeAddChild` hook callback.
     *
     * @private
     */
  }, {
    key: "onBeforeAddChild",
    value: function onBeforeAddChild() {
      this.collapsingUI.collapsedRowsStash.stash();
    }

    /**
     * `afterAddChild` hook callback.
     *
     * @private
     * @param {object} parent Parent element.
     * @param {object} element New child element.
     */
  }, {
    key: "onAfterAddChild",
    value: function onAfterAddChild(parent, element) {
      this.collapsingUI.collapsedRowsStash.shiftStash(this.dataManager.getRowIndex(element));
      this.collapsingUI.collapsedRowsStash.applyStash();
      this.headersUI.updateRowHeaderWidth();
    }

    /**
     * `beforeDetachChild` hook callback.
     *
     * @private
     */
  }, {
    key: "onBeforeDetachChild",
    value: function onBeforeDetachChild() {
      this.collapsingUI.collapsedRowsStash.stash();
    }

    /**
     * `afterDetachChild` hook callback.
     *
     * @private
     * @param {object} parent Parent element.
     * @param {object} element New child element.
     * @param {number} finalElementRowIndex The final row index of the detached element.
     */
  }, {
    key: "onAfterDetachChild",
    value: function onAfterDetachChild(parent, element, finalElementRowIndex) {
      this.collapsingUI.collapsedRowsStash.shiftStash(finalElementRowIndex, null, -1);
      this.collapsingUI.collapsedRowsStash.applyStash();
      this.headersUI.updateRowHeaderWidth();
    }

    /**
     * `afterCreateRow` hook callback.
     *
     * @private
     */
  }, {
    key: "onAfterCreateRow",
    value: function onAfterCreateRow() {
      this.dataManager.rewriteCache();
    }

    /**
     * `afterInit` hook callback.
     *
     * @private
     */
  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      var deepestLevel = Math.max.apply(Math, _toConsumableArray(this.dataManager.cache.levels));
      if (deepestLevel > 0) {
        this.headersUI.updateRowHeaderWidth(deepestLevel);
      }
    }

    /**
     * `beforeViewRender` hook callback.
     *
     * @param {boolean} force Indicates if the render call was trigered by a change of settings or data.
     * @param {object} skipRender An object, holder for skipRender functionality.
     * @private
     */
  }, {
    key: "onBeforeViewRender",
    value: function onBeforeViewRender(force, skipRender) {
      var priv = privatePool.get(this);
      if (priv.skipRender) {
        skipRender.skipRender = true;
      }
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(NestedRows.prototype), "destroy", this).call(this);
    }

    /**
     * `beforeLoadData` hook callback.
     *
     * @param {Array} data The source data.
     * @private
     */
  }, {
    key: "onBeforeLoadData",
    value: function onBeforeLoadData(data) {
      if (!(0, _data.isArrayOfObjects)(data)) {
        (0, _console.error)(WRONG_DATA_TYPE_ERROR);
        this.hot.getSettings()[PLUGIN_KEY] = false;
        this.disablePlugin();
        return;
      }
      this.dataManager.setData(data);
      this.dataManager.rewriteCache();
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
  return NestedRows;
}(_base.BasePlugin);
exports.NestedRows = NestedRows;