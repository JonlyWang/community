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
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.ManualColumnMove = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/es.array.index-of.js");
var _base = require("../base");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _array = require("../../helpers/array");
var _element = require("../../helpers/dom/element");
var _number = require("../../helpers/number");
var _eventManager = _interopRequireDefault(require("../../eventManager"));
var _backlight = _interopRequireDefault(require("./ui/backlight"));
var _guideline = _interopRequireDefault(require("./ui/guideline"));
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
_pluginHooks.default.getSingleton().register('beforeColumnMove');
_pluginHooks.default.getSingleton().register('afterColumnMove');
var PLUGIN_KEY = 'manualColumnMove';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 120;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var privatePool = new WeakMap();
var CSS_PLUGIN = 'ht__manualColumnMove';
var CSS_SHOW_UI = 'show-ui';
var CSS_ON_MOVING = 'on-moving--columns';
var CSS_AFTER_SELECTION = 'after-selection--columns';

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin ManualColumnMove
 * @class ManualColumnMove
 *
 * @description
 * This plugin allows to change columns order. To make columns order persistent the {@link Options#persistentState}
 * plugin should be enabled.
 *
 * API:
 * - `moveColumn` - move single column to the new position.
 * - `moveColumns` - move many columns (as an array of indexes) to the new position.
 * - `dragColumn` - drag single column to the new position.
 * - `dragColumns` - drag many columns (as an array of indexes) to the new position.
 *
 * [Documentation](@/guides/columns/column-moving.md) explain differences between drag and move actions.
 * Please keep in mind that if you want apply visual changes,
 * you have to call manually the `render` method on the instance of Handsontable.
 *
 * The plugin creates additional components to make moving possibly using user interface:
 * - backlight - highlight of selected columns.
 * - guideline - line which shows where columns has been moved.
 *
 * @class ManualColumnMove
 * @plugin ManualColumnMove
 */
var ManualColumnMove = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ManualColumnMove, _BasePlugin);
  var _super = _createSuper(ManualColumnMove);
  function ManualColumnMove(hotInstance) {
    var _this;
    _classCallCheck(this, ManualColumnMove);
    _this = _super.call(this, hotInstance);

    /**
     * Set up WeakMap of plugin to sharing private parameters;.
     */
    privatePool.set(_assertThisInitialized(_this), {
      columnsToMove: [],
      countCols: 0,
      fixedColumns: 0,
      pressed: void 0,
      target: {
        eventPageX: void 0,
        coords: void 0,
        TD: void 0,
        col: void 0
      },
      cachedDropIndex: void 0
    });

    /**
     * Event Manager object.
     *
     * @private
     * @type {object}
     */
    _this.eventManager = new _eventManager.default(_assertThisInitialized(_this));
    /**
     * Backlight UI object.
     *
     * @private
     * @type {object}
     */
    _this.backlight = new _backlight.default(hotInstance);
    /**
     * Guideline UI object.
     *
     * @private
     * @type {object}
     */
    _this.guideline = new _guideline.default(hotInstance);
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link ManualColumnMove#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(ManualColumnMove, [{
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
      this.addHook('beforeOnCellMouseDown', function () {
        return _this2.onBeforeOnCellMouseDown.apply(_this2, arguments);
      });
      this.addHook('beforeOnCellMouseOver', function () {
        return _this2.onBeforeOnCellMouseOver.apply(_this2, arguments);
      });
      this.addHook('afterScrollVertically', function () {
        return _this2.onAfterScrollVertically();
      });
      this.addHook('afterLoadData', function () {
        return _this2.onAfterLoadData.apply(_this2, arguments);
      });
      this.buildPluginUI();
      this.registerEvents();

      // TODO: move adding plugin classname to BasePlugin.
      (0, _element.addClass)(this.hot.rootElement, CSS_PLUGIN);
      _get(_getPrototypeOf(ManualColumnMove.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`manualColumnMove`](@/api/options.md#manualcolumnmove)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      this.moveBySettingsOrLoad();
      _get(_getPrototypeOf(ManualColumnMove.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      (0, _element.removeClass)(this.hot.rootElement, CSS_PLUGIN);
      this.unregisterEvents();
      this.backlight.destroy();
      this.guideline.destroy();
      _get(_getPrototypeOf(ManualColumnMove.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Moves a single column.
     *
     * @param {number} column Visual column index to be moved.
     * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
     * @fires Hooks#beforeColumnMove
     * @fires Hooks#afterColumnMove
     * @returns {boolean}
     */
  }, {
    key: "moveColumn",
    value: function moveColumn(column, finalIndex) {
      return this.moveColumns([column], finalIndex);
    }

    /**
     * Moves a multiple columns.
     *
     * @param {Array} columns Array of visual column indexes to be moved.
     * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
     * @fires Hooks#beforeColumnMove
     * @fires Hooks#afterColumnMove
     * @returns {boolean}
     */
  }, {
    key: "moveColumns",
    value: function moveColumns(columns, finalIndex) {
      var priv = privatePool.get(this);
      var dropIndex = priv.cachedDropIndex;
      var movePossible = this.isMovePossible(columns, finalIndex);
      var beforeMoveHook = this.hot.runHooks('beforeColumnMove', columns, finalIndex, dropIndex, movePossible);
      priv.cachedDropIndex = void 0;
      if (beforeMoveHook === false) {
        return;
      }
      if (movePossible) {
        this.hot.columnIndexMapper.moveIndexes(columns, finalIndex);
      }
      var movePerformed = movePossible && this.isColumnOrderChanged(columns, finalIndex);
      this.hot.runHooks('afterColumnMove', columns, finalIndex, dropIndex, movePossible, movePerformed);
      return movePerformed;
    }

    /**
     * Drag a single column to drop index position.
     *
     * @param {number} column Visual column index to be dragged.
     * @param {number} dropIndex Visual column index, being a drop index for the moved columns. Points to where we are going to drop the moved elements.
     * To check visualization of drop index please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
     * @fires Hooks#beforeColumnMove
     * @fires Hooks#afterColumnMove
     * @returns {boolean}
     */
  }, {
    key: "dragColumn",
    value: function dragColumn(column, dropIndex) {
      return this.dragColumns([column], dropIndex);
    }

    /**
     * Drag multiple columns to drop index position.
     *
     * @param {Array} columns Array of visual column indexes to be dragged.
     * @param {number} dropIndex Visual column index, being a drop index for the moved columns. Points to where we are going to drop the moved elements.
     * To check visualization of drop index please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
     * @fires Hooks#beforeColumnMove
     * @fires Hooks#afterColumnMove
     * @returns {boolean}
     */
  }, {
    key: "dragColumns",
    value: function dragColumns(columns, dropIndex) {
      var finalIndex = this.countFinalIndex(columns, dropIndex);
      var priv = privatePool.get(this);
      priv.cachedDropIndex = dropIndex;
      return this.moveColumns(columns, finalIndex);
    }

    /**
     * Indicates if it's possible to move columns to the desired position. Some of the actions aren't
     * possible, i.e. You can’t move more than one element to the last position.
     *
     * @param {Array} movedColumns Array of visual column indexes to be moved.
     * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
     * @returns {boolean}
     */
  }, {
    key: "isMovePossible",
    value: function isMovePossible(movedColumns, finalIndex) {
      var length = this.hot.columnIndexMapper.getNotTrimmedIndexesLength();

      // An attempt to transfer more columns to start destination than is possible (only when moving from the top to the bottom).
      var tooHighDestinationIndex = movedColumns.length + finalIndex > length;
      var tooLowDestinationIndex = finalIndex < 0;
      var tooLowMovedColumnIndex = movedColumns.some(function (movedColumn) {
        return movedColumn < 0;
      });
      var tooHighMovedColumnIndex = movedColumns.some(function (movedColumn) {
        return movedColumn >= length;
      });
      if (tooHighDestinationIndex || tooLowDestinationIndex || tooLowMovedColumnIndex || tooHighMovedColumnIndex) {
        return false;
      }
      return true;
    }

    /**
     * Indicates if order of columns was changed.
     *
     * @private
     * @param {Array} movedColumns Array of visual column indexes to be moved.
     * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
     * @returns {boolean}
     */
  }, {
    key: "isColumnOrderChanged",
    value: function isColumnOrderChanged(movedColumns, finalIndex) {
      return movedColumns.some(function (column, nrOfMovedElement) {
        return column - nrOfMovedElement !== finalIndex;
      });
    }

    /**
     * Count the final column index from the drop index.
     *
     * @private
     * @param {Array} movedColumns Array of visual column indexes to be moved.
     * @param {number} dropIndex Visual column index, being a drop index for the moved columns.
     * @returns {number} Visual column index, being a start index for the moved columns.
     */
  }, {
    key: "countFinalIndex",
    value: function countFinalIndex(movedColumns, dropIndex) {
      var numberOfColumnsLowerThanDropIndex = (0, _array.arrayReduce)(movedColumns, function (numberOfColumns, currentColumnIndex) {
        if (currentColumnIndex < dropIndex) {
          numberOfColumns += 1;
        }
        return numberOfColumns;
      }, 0);
      return dropIndex - numberOfColumnsLowerThanDropIndex;
    }

    /**
     * Gets the sum of the widths of columns in the provided range.
     *
     * @private
     * @param {number} fromColumn Visual column index.
     * @param {number} toColumn Visual column index.
     * @returns {number}
     */
  }, {
    key: "getColumnsWidth",
    value: function getColumnsWidth(fromColumn, toColumn) {
      var columnMapper = this.hot.columnIndexMapper;
      var columnsWidth = 0;
      for (var visualColumnIndex = fromColumn; visualColumnIndex <= toColumn; visualColumnIndex += 1) {
        // We can't use just `getColWidth` (even without indexes translation) as it doesn't return proper values
        // when column is stretched.
        var renderableIndex = columnMapper.getRenderableFromVisualIndex(visualColumnIndex);
        if (visualColumnIndex < 0) {
          columnsWidth += this.hot.view._wt.wtViewport.getRowHeaderWidth() || 0;
        } else if (renderableIndex !== null) {
          columnsWidth += this.hot.view._wt.wtTable.getStretchedColumnWidth(renderableIndex) || 0;
        }
      }
      return columnsWidth;
    }

    /**
     * Loads initial settings when persistent state is saved or when plugin was initialized as an array.
     *
     * @private
     */
  }, {
    key: "moveBySettingsOrLoad",
    value: function moveBySettingsOrLoad() {
      var pluginSettings = this.hot.getSettings()[PLUGIN_KEY];
      if (Array.isArray(pluginSettings)) {
        this.moveColumns(pluginSettings, 0);
      } else if (pluginSettings !== void 0) {
        var persistentState = this.persistentStateLoad();
        if (persistentState.length) {
          this.moveColumns(persistentState, 0);
        }
      }
    }

    /**
     * Checks if the provided column is in the fixedColumnsTop section.
     *
     * @private
     * @param {number} column Visual column index to check.
     * @returns {boolean}
     */
  }, {
    key: "isFixedColumnsStart",
    value: function isFixedColumnsStart(column) {
      return column < this.hot.getSettings().fixedColumnsStart;
    }

    /**
     * Saves the manual column positions to the persistent state (the {@link Options#persistentState} option has to be enabled).
     *
     * @private
     * @fires Hooks#persistentStateSave
     */
  }, {
    key: "persistentStateSave",
    value: function persistentStateSave() {
      this.hot.runHooks('persistentStateSave', 'manualColumnMove', this.hot.columnIndexMapper.getIndexesSequence()); // The `PersistentState` plugin should be refactored.
    }

    /**
     * Loads the manual column positions from the persistent state (the {@link Options#persistentState} option has to be enabled).
     *
     * @private
     * @fires Hooks#persistentStateLoad
     * @returns {Array} Stored state.
     */
  }, {
    key: "persistentStateLoad",
    value: function persistentStateLoad() {
      var storedState = {};
      this.hot.runHooks('persistentStateLoad', 'manualColumnMove', storedState);
      return storedState.value ? storedState.value : [];
    }

    /**
     * Prepares an array of indexes based on actual selection.
     *
     * @private
     * @param {number} start The start index.
     * @param {number} end The end index.
     * @returns {Array}
     */
  }, {
    key: "prepareColumnsToMoving",
    value: function prepareColumnsToMoving(start, end) {
      var selectedColumns = [];
      (0, _number.rangeEach)(start, end, function (i) {
        selectedColumns.push(i);
      });
      return selectedColumns;
    }

    /**
     * Update the UI visual position.
     *
     * @private
     */
  }, {
    key: "refreshPositions",
    value: function refreshPositions() {
      var priv = privatePool.get(this);
      var firstVisible = this.hot.view.getFirstFullyVisibleColumn();
      if (this.isFixedColumnsStart(priv.hoveredColumn) && firstVisible > 0) {
        this.hot.scrollViewportTo(void 0, this.hot.columnIndexMapper.getNearestNotHiddenIndex(firstVisible - 1, -1));
      }
      var wtTable = this.hot.view._wt.wtTable;
      var scrollableElement = this.hot.view._wt.wtOverlays.scrollableElement;
      var scrollStart = typeof scrollableElement.scrollX === 'number' ? scrollableElement.scrollX : scrollableElement.scrollLeft;
      var tdOffsetStart = this.hot.view.THEAD.offsetLeft + this.getColumnsWidth(0, priv.hoveredColumn - 1);
      var hiderWidth = wtTable.hider.offsetWidth;
      var tbodyOffsetLeft = wtTable.TBODY.offsetLeft;
      var backlightElemMarginStart = this.backlight.getOffset().start;
      var backlightElemWidth = this.backlight.getSize().width;
      var rowHeaderWidth = 0;
      var mouseOffsetStart = 0;
      if (this.hot.isRtl()) {
        var rootWindow = this.hot.rootWindow;
        var containerWidth = (0, _element.outerWidth)(this.hot.rootElement);
        var gridMostRightPos = rootWindow.innerWidth - priv.rootElementOffset - containerWidth;
        mouseOffsetStart = rootWindow.innerWidth - priv.target.eventPageX - gridMostRightPos - (scrollableElement.scrollX === void 0 ? scrollStart : 0);
      } else {
        mouseOffsetStart = priv.target.eventPageX - (priv.rootElementOffset - (scrollableElement.scrollX === void 0 ? scrollStart : 0));
      }
      if (priv.hasRowHeaders) {
        rowHeaderWidth = this.hot.view._wt.wtOverlays.inlineStartOverlay.clone.wtTable.getColumnHeader(-1).offsetWidth;
      }
      if (this.isFixedColumnsStart(priv.hoveredColumn)) {
        tdOffsetStart += scrollStart;
      }
      tdOffsetStart += rowHeaderWidth;
      if (priv.hoveredColumn < 0) {
        // if hover on rowHeader
        if (priv.fixedColumnsStart > 0) {
          priv.target.col = 0;
        } else {
          priv.target.col = firstVisible > 0 ? firstVisible - 1 : firstVisible;
        }
      } else if (priv.target.TD.offsetWidth / 2 + tdOffsetStart <= mouseOffsetStart) {
        var newCoordsCol = priv.hoveredColumn >= priv.countCols ? priv.countCols - 1 : priv.hoveredColumn;

        // if hover on right part of TD
        priv.target.col = newCoordsCol + 1;
        // unfortunately first column is bigger than rest
        tdOffsetStart += priv.target.TD.offsetWidth;
      } else {
        // elsewhere on table
        priv.target.col = priv.hoveredColumn;
      }
      var backlightStart = mouseOffsetStart;
      var guidelineStart = tdOffsetStart;
      if (mouseOffsetStart + backlightElemWidth + backlightElemMarginStart >= hiderWidth) {
        // prevent display backlight on the right side of the table
        backlightStart = hiderWidth - backlightElemWidth - backlightElemMarginStart;
      } else if (mouseOffsetStart + backlightElemMarginStart < tbodyOffsetLeft + rowHeaderWidth) {
        // prevent display backlight on the left side of the table
        backlightStart = tbodyOffsetLeft + rowHeaderWidth + Math.abs(backlightElemMarginStart);
      }
      if (tdOffsetStart >= hiderWidth - 1) {
        // prevent display guideline outside the table
        guidelineStart = hiderWidth - 1;
      } else if (guidelineStart === 0) {
        // guideline has got `margin-left: -1px` as default
        guidelineStart = 1;
      } else if (scrollableElement.scrollX !== void 0 && priv.hoveredColumn < priv.fixedColumnsStart) {
        guidelineStart -= priv.rootElementOffset <= scrollableElement.scrollX ? priv.rootElementOffset : 0;
      }
      this.backlight.setPosition(null, backlightStart);
      this.guideline.setPosition(null, guidelineStart);
    }

    /**
     * Binds the events used by the plugin.
     *
     * @private
     */
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this3 = this;
      var documentElement = this.hot.rootDocument.documentElement;
      this.eventManager.addEventListener(documentElement, 'mousemove', function (event) {
        return _this3.onMouseMove(event);
      });
      this.eventManager.addEventListener(documentElement, 'mouseup', function () {
        return _this3.onMouseUp();
      });
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
     * Change the behavior of selection / dragging.
     *
     * @private
     * @param {MouseEvent} event `mousedown` event properties.
     * @param {CellCoords} coords Visual cell coordinates where was fired event.
     * @param {HTMLElement} TD Cell represented as HTMLElement.
     * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
     *                            a boolean value that allows or disallows changing the selection for that particular area.
     */
  }, {
    key: "onBeforeOnCellMouseDown",
    value: function onBeforeOnCellMouseDown(event, coords, TD, controller) {
      var wtTable = this.hot.view._wt.wtTable;
      var isHeaderSelection = this.hot.selection.isSelectedByColumnHeader();
      var selection = this.hot.getSelectedRangeLast();
      var priv = privatePool.get(this);
      // This block action shouldn't be handled below.
      var isSortingElement = (0, _element.hasClass)(event.target, 'sortAction');
      if (!selection || !isHeaderSelection || priv.pressed || event.button !== 0 || isSortingElement) {
        priv.pressed = false;
        priv.columnsToMove.length = 0;
        (0, _element.removeClass)(this.hot.rootElement, [CSS_ON_MOVING, CSS_SHOW_UI]);
        return;
      }
      var guidelineIsNotReady = this.guideline.isBuilt() && !this.guideline.isAppended();
      var backlightIsNotReady = this.backlight.isBuilt() && !this.backlight.isAppended();
      if (guidelineIsNotReady && backlightIsNotReady) {
        this.guideline.appendTo(wtTable.hider);
        this.backlight.appendTo(wtTable.hider);
      }
      var from = selection.from,
        to = selection.to;
      var start = Math.min(from.col, to.col);
      var end = Math.max(from.col, to.col);
      if (coords.row < 0 && coords.col >= start && coords.col <= end) {
        controller.column = true;
        priv.pressed = true;
        priv.target.eventPageX = event.pageX;
        priv.target.eventOffsetX = event.offsetX;
        priv.hoveredColumn = coords.col;
        priv.target.TD = TD;
        priv.target.col = coords.col;
        priv.columnsToMove = this.prepareColumnsToMoving(start, end);
        priv.hasRowHeaders = !!this.hot.getSettings().rowHeaders;
        priv.countCols = this.hot.countCols();
        priv.fixedColumnsStart = this.hot.getSettings().fixedColumnsStart;
        priv.rootElementOffset = (0, _element.offset)(this.hot.rootElement).left;
        var countColumnsFrom = priv.hasRowHeaders ? -1 : 0;
        var topPos = wtTable.holder.scrollTop + wtTable.getColumnHeaderHeight(0) + 1;
        var fixedColumnsStart = coords.col < priv.fixedColumnsStart;
        var horizontalScrollPosition = Math.abs(this.hot.view._wt.wtOverlays.inlineStartOverlay.getScrollPosition());
        var offsetX = Math.abs(event.offsetX - (this.hot.isRtl() ? event.target.offsetWidth : 0));
        var inlineOffset = this.getColumnsWidth(start, coords.col - 1) + offsetX;
        var inlinePos = this.getColumnsWidth(countColumnsFrom, start - 1) + (fixedColumnsStart ? horizontalScrollPosition : 0) + inlineOffset;
        this.backlight.setPosition(topPos, inlinePos);
        this.backlight.setSize(this.getColumnsWidth(start, end), wtTable.hider.offsetHeight - topPos);
        this.backlight.setOffset(null, -inlineOffset);
        (0, _element.addClass)(this.hot.rootElement, CSS_ON_MOVING);
      } else {
        (0, _element.removeClass)(this.hot.rootElement, CSS_AFTER_SELECTION);
        priv.pressed = false;
        priv.columnsToMove.length = 0;
      }
    }

    /**
     * 'mouseMove' event callback. Fired when pointer move on document.documentElement.
     *
     * @private
     * @param {MouseEvent} event `mousemove` event properties.
     */
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var priv = privatePool.get(this);
      if (!priv.pressed) {
        return;
      }

      // callback for browser which doesn't supports CSS pointer-event: none
      if (event.target === this.backlight.element) {
        var width = this.backlight.getSize().width;
        this.backlight.setSize(0);
        setTimeout(function () {
          this.backlight.setPosition(width);
        });
      }
      priv.target.eventPageX = event.pageX;
      this.refreshPositions();
    }

    /**
     * 'beforeOnCellMouseOver' hook callback. Fired when pointer was over cell.
     *
     * @private
     * @param {MouseEvent} event `mouseover` event properties.
     * @param {CellCoords} coords Visual cell coordinates where was fired event.
     * @param {HTMLElement} TD Cell represented as HTMLElement.
     * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
     *                            a boolean value that allows or disallows changing the selection for that particular area.
     */
  }, {
    key: "onBeforeOnCellMouseOver",
    value: function onBeforeOnCellMouseOver(event, coords, TD, controller) {
      var selectedRange = this.hot.getSelectedRangeLast();
      var priv = privatePool.get(this);
      if (!selectedRange || !priv.pressed) {
        return;
      }
      if (priv.columnsToMove.indexOf(coords.col) > -1) {
        (0, _element.removeClass)(this.hot.rootElement, CSS_SHOW_UI);
      } else {
        (0, _element.addClass)(this.hot.rootElement, CSS_SHOW_UI);
      }
      controller.row = true;
      controller.column = true;
      controller.cell = true;
      priv.hoveredColumn = coords.col;
      priv.target.TD = TD;
    }

    /**
     * `onMouseUp` hook callback.
     *
     * @private
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var priv = privatePool.get(this);
      var target = priv.target.col;
      var columnsLen = priv.columnsToMove.length;
      priv.hoveredColumn = void 0;
      priv.pressed = false;
      priv.backlightWidth = 0;
      (0, _element.removeClass)(this.hot.rootElement, [CSS_ON_MOVING, CSS_SHOW_UI, CSS_AFTER_SELECTION]);
      if (this.hot.selection.isSelectedByColumnHeader()) {
        (0, _element.addClass)(this.hot.rootElement, CSS_AFTER_SELECTION);
      }
      if (columnsLen < 1 || target === void 0) {
        return;
      }
      var firstMovedVisualColumn = priv.columnsToMove[0];
      var firstMovedPhysicalColumn = this.hot.toPhysicalColumn(firstMovedVisualColumn);
      var movePerformed = this.dragColumns(priv.columnsToMove, target);
      priv.columnsToMove.length = 0;
      if (movePerformed === true) {
        this.persistentStateSave();
        this.hot.render();
        this.hot.view.adjustElementsSize(true);
        var selectionStart = this.hot.toVisualColumn(firstMovedPhysicalColumn);
        var selectionEnd = selectionStart + columnsLen - 1;
        this.hot.selectColumns(selectionStart, selectionEnd);
      }
    }

    /**
     * `afterScrollHorizontally` hook callback. Fired the table was scrolled horizontally.
     *
     * @private
     */
  }, {
    key: "onAfterScrollVertically",
    value: function onAfterScrollVertically() {
      var wtTable = this.hot.view._wt.wtTable;
      var headerHeight = wtTable.getColumnHeaderHeight(0) + 1;
      var scrollTop = wtTable.holder.scrollTop;
      var posTop = headerHeight + scrollTop;
      this.backlight.setPosition(posTop);
      this.backlight.setSize(null, wtTable.hider.offsetHeight - posTop);
    }

    /**
     * Builds the plugin's UI.
     *
     * @private
     */
  }, {
    key: "buildPluginUI",
    value: function buildPluginUI() {
      this.backlight.build();
      this.guideline.build();
    }

    /**
     * Callback for the `afterLoadData` hook.
     *
     * @private
     */
  }, {
    key: "onAfterLoadData",
    value: function onAfterLoadData() {
      this.moveBySettingsOrLoad();
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.backlight.destroy();
      this.guideline.destroy();
      _get(_getPrototypeOf(ManualColumnMove.prototype), "destroy", this).call(this);
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
  return ManualColumnMove;
}(_base.BasePlugin);
exports.ManualColumnMove = ManualColumnMove;