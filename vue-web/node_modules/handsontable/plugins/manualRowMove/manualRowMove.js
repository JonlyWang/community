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
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.ManualRowMove = void 0;
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
_pluginHooks.default.getSingleton().register('beforeRowMove');
_pluginHooks.default.getSingleton().register('afterRowMove');
var PLUGIN_KEY = 'manualRowMove';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 140;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var privatePool = new WeakMap();
var CSS_PLUGIN = 'ht__manualRowMove';
var CSS_SHOW_UI = 'show-ui';
var CSS_ON_MOVING = 'on-moving--rows';
var CSS_AFTER_SELECTION = 'after-selection--rows';

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin ManualRowMove
 * @class ManualRowMove
 *
 * @description
 * This plugin allows to change rows order. To make rows order persistent the {@link Options#persistentState}
 * plugin should be enabled.
 *
 * API:
 * - `moveRow` - move single row to the new position.
 * - `moveRows` - move many rows (as an array of indexes) to the new position.
 * - `dragRow` - drag single row to the new position.
 * - `dragRows` - drag many rows (as an array of indexes) to the new position.
 *
 * [Documentation](@/guides/rows/row-moving.md) explain differences between drag and move actions. Please keep in mind that if you want apply visual changes,
 * you have to call manually the `render` method on the instance of Handsontable.
 *
 * The plugin creates additional components to make moving possibly using user interface:
 * - backlight - highlight of selected rows.
 * - guideline - line which shows where rows has been moved.
 *
 * @class ManualRowMove
 * @plugin ManualRowMove
 */
var ManualRowMove = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ManualRowMove, _BasePlugin);
  var _super = _createSuper(ManualRowMove);
  function ManualRowMove(hotInstance) {
    var _this;
    _classCallCheck(this, ManualRowMove);
    _this = _super.call(this, hotInstance);

    /**
     * Set up WeakMap of plugin to sharing private parameters;.
     */
    privatePool.set(_assertThisInitialized(_this), {
      rowsToMove: [],
      pressed: void 0,
      target: {
        eventPageY: void 0,
        coords: void 0,
        TD: void 0,
        row: void 0
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
   * hook and if it returns `true` then the {@link ManualRowMove#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(ManualRowMove, [{
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
      this.addHook('afterScrollHorizontally', function () {
        return _this2.onAfterScrollHorizontally();
      });
      this.addHook('afterLoadData', function () {
        return _this2.onAfterLoadData.apply(_this2, arguments);
      });
      this.buildPluginUI();
      this.registerEvents();

      // TODO: move adding plugin classname to BasePlugin.
      (0, _element.addClass)(this.hot.rootElement, CSS_PLUGIN);
      _get(_getPrototypeOf(ManualRowMove.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`manualRowMove`](@/api/options.md#manualrowmove)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      this.moveBySettingsOrLoad();
      _get(_getPrototypeOf(ManualRowMove.prototype), "updatePlugin", this).call(this);
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
      _get(_getPrototypeOf(ManualRowMove.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Moves a single row.
     *
     * @param {number} row Visual row index to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/rows/row-moving.md#drag-and-move-actions-of-manualrowmove-plugin).
     * @fires Hooks#beforeRowMove
     * @fires Hooks#afterRowMove
     * @returns {boolean}
     */
  }, {
    key: "moveRow",
    value: function moveRow(row, finalIndex) {
      return this.moveRows([row], finalIndex);
    }

    /**
     * Moves a multiple rows.
     *
     * @param {Array} rows Array of visual row indexes to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/rows/row-moving.md#drag-and-move-actions-of-manualrowmove-plugin).
     * @fires Hooks#beforeRowMove
     * @fires Hooks#afterRowMove
     * @returns {boolean}
     */
  }, {
    key: "moveRows",
    value: function moveRows(rows, finalIndex) {
      var priv = privatePool.get(this);
      var dropIndex = priv.cachedDropIndex;
      var movePossible = this.isMovePossible(rows, finalIndex);
      var beforeMoveHook = this.hot.runHooks('beforeRowMove', rows, finalIndex, dropIndex, movePossible);
      priv.cachedDropIndex = void 0;
      if (beforeMoveHook === false) {
        return;
      }
      if (movePossible) {
        this.hot.rowIndexMapper.moveIndexes(rows, finalIndex);
      }
      var movePerformed = movePossible && this.isRowOrderChanged(rows, finalIndex);
      this.hot.runHooks('afterRowMove', rows, finalIndex, dropIndex, movePossible, movePerformed);
      return movePerformed;
    }

    /**
     * Drag a single row to drop index position.
     *
     * @param {number} row Visual row index to be dragged.
     * @param {number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we are going to drop the moved elements.
     * To check visualization of drop index please take a look at [documentation](@/guides/rows/row-moving.md#drag-and-move-actions-of-manualrowmove-plugin).
     * @fires Hooks#beforeRowMove
     * @fires Hooks#afterRowMove
     * @returns {boolean}
     */
  }, {
    key: "dragRow",
    value: function dragRow(row, dropIndex) {
      return this.dragRows([row], dropIndex);
    }

    /**
     * Drag multiple rows to drop index position.
     *
     * @param {Array} rows Array of visual row indexes to be dragged.
     * @param {number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we are going to drop the moved elements.
     * To check visualization of drop index please take a look at [documentation](@/guides/rows/row-moving.md#drag-and-move-actions-of-manualrowmove-plugin).
     * @fires Hooks#beforeRowMove
     * @fires Hooks#afterRowMove
     * @returns {boolean}
     */
  }, {
    key: "dragRows",
    value: function dragRows(rows, dropIndex) {
      var finalIndex = this.countFinalIndex(rows, dropIndex);
      var priv = privatePool.get(this);
      priv.cachedDropIndex = dropIndex;
      return this.moveRows(rows, finalIndex);
    }

    /**
     * Indicates if it's possible to move rows to the desired position. Some of the actions aren't possible, i.e. You can’t move more than one element to the last position.
     *
     * @param {Array} movedRows Array of visual row indexes to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/rows/row-moving.md#drag-and-move-actions-of-manualrowmove-plugin).
     * @returns {boolean}
     */
  }, {
    key: "isMovePossible",
    value: function isMovePossible(movedRows, finalIndex) {
      var length = this.hot.rowIndexMapper.getNotTrimmedIndexesLength();

      // An attempt to transfer more rows to start destination than is possible (only when moving from the top to the bottom).
      var tooHighDestinationIndex = movedRows.length + finalIndex > length;
      var tooLowDestinationIndex = finalIndex < 0;
      var tooLowMovedRowIndex = movedRows.some(function (movedRow) {
        return movedRow < 0;
      });
      var tooHighMovedRowIndex = movedRows.some(function (movedRow) {
        return movedRow >= length;
      });
      if (tooHighDestinationIndex || tooLowDestinationIndex || tooLowMovedRowIndex || tooHighMovedRowIndex) {
        return false;
      }
      return true;
    }

    /**
     * Indicates if order of rows was changed.
     *
     * @private
     * @param {Array} movedRows Array of visual row indexes to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/rows/row-moving.md#drag-and-move-actions-of-manualrowmove-plugin).
     * @returns {boolean}
     */
  }, {
    key: "isRowOrderChanged",
    value: function isRowOrderChanged(movedRows, finalIndex) {
      return movedRows.some(function (row, nrOfMovedElement) {
        return row - nrOfMovedElement !== finalIndex;
      });
    }

    /**
     * Count the final row index from the drop index.
     *
     * @private
     * @param {Array} movedRows Array of visual row indexes to be moved.
     * @param {number} dropIndex Visual row index, being a drop index for the moved rows.
     * @returns {number} Visual row index, being a start index for the moved rows.
     */
  }, {
    key: "countFinalIndex",
    value: function countFinalIndex(movedRows, dropIndex) {
      var numberOfRowsLowerThanDropIndex = (0, _array.arrayReduce)(movedRows, function (numberOfRows, currentRowIndex) {
        if (currentRowIndex < dropIndex) {
          numberOfRows += 1;
        }
        return numberOfRows;
      }, 0);
      return dropIndex - numberOfRowsLowerThanDropIndex;
    }

    /**
     * Gets the sum of the heights of rows in the provided range.
     *
     * @private
     * @param {number} fromRow Visual row index.
     * @param {number} toRow Visual row index.
     * @returns {number}
     */
  }, {
    key: "getRowsHeight",
    value: function getRowsHeight(fromRow, toRow) {
      var rowMapper = this.hot.rowIndexMapper;
      var rowsHeight = 0;
      for (var visualRowIndex = fromRow; visualRowIndex <= toRow; visualRowIndex++) {
        var renderableIndex = rowMapper.getRenderableFromVisualIndex(visualRowIndex);
        if (renderableIndex !== null) {
          rowsHeight += this.hot.view._wt.wtTable.getRowHeight(renderableIndex) || 23;
        }
      }
      return rowsHeight;
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
        this.moveRows(pluginSettings, 0);
      } else if (pluginSettings !== void 0) {
        var persistentState = this.persistentStateLoad();
        if (persistentState.length) {
          this.moveRows(persistentState, 0);
        }
      }
    }

    /**
     * Checks if the provided row is in the fixedRowsTop section.
     *
     * @private
     * @param {number} row Visual row index to check.
     * @returns {boolean}
     */
  }, {
    key: "isFixedRowTop",
    value: function isFixedRowTop(row) {
      return row < this.hot.getSettings().fixedRowsTop;
    }

    /**
     * Checks if the provided row is in the fixedRowsBottom section.
     *
     * @private
     * @param {number} row Visual row index to check.
     * @returns {boolean}
     */
  }, {
    key: "isFixedRowBottom",
    value: function isFixedRowBottom(row) {
      return row > this.hot.countRows() - 1 - this.hot.getSettings().fixedRowsBottom;
    }

    /**
     * Saves the manual row positions to the persistent state (the {@link Options#persistentState} option has to be enabled).
     *
     * @private
     * @fires Hooks#persistentStateSave
     */
  }, {
    key: "persistentStateSave",
    value: function persistentStateSave() {
      // The `PersistentState` plugin should be refactored.
      this.hot.runHooks('persistentStateSave', 'manualRowMove', this.hot.rowIndexMapper.getIndexesSequence());
    }

    /**
     * Loads the manual row positions from the persistent state (the {@link Options#persistentState} option has to be enabled).
     *
     * @private
     * @fires Hooks#persistentStateLoad
     * @returns {Array} Stored state.
     */
  }, {
    key: "persistentStateLoad",
    value: function persistentStateLoad() {
      var storedState = {};
      this.hot.runHooks('persistentStateLoad', 'manualRowMove', storedState);
      return storedState.value ? storedState.value : [];
    }

    /**
     * Prepares an array of indexes based on actual selection.
     *
     * @private
     * @returns {Array}
     */
  }, {
    key: "prepareRowsToMoving",
    value: function prepareRowsToMoving() {
      var selection = this.hot.getSelectedRangeLast();
      var selectedRows = [];
      if (!selection) {
        return selectedRows;
      }
      var from = selection.from,
        to = selection.to;
      var start = Math.min(from.row, to.row);
      var end = Math.max(from.row, to.row);
      (0, _number.rangeEach)(start, end, function (i) {
        selectedRows.push(i);
      });
      return selectedRows;
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
      var coords = priv.target.coords;
      var firstVisible = this.hot.view.getFirstFullyVisibleRow();
      var lastVisible = this.hot.view.getLastFullyVisibleRow();
      var countRows = this.hot.countRows();
      if (this.isFixedRowTop(coords.row) && firstVisible > 0) {
        this.hot.scrollViewportTo(this.hot.rowIndexMapper.getNearestNotHiddenIndex(firstVisible - 1, -1));
      }
      if (this.isFixedRowBottom(coords.row) && lastVisible < countRows) {
        this.hot.scrollViewportTo(this.hot.rowIndexMapper.getNearestNotHiddenIndex(lastVisible + 1, 1), undefined, true);
      }
      var wtTable = this.hot.view._wt.wtTable;
      var TD = priv.target.TD;
      var rootElementOffset = (0, _element.offset)(this.hot.rootElement);
      var tdOffsetTop = this.hot.view.THEAD.offsetHeight + this.getRowsHeight(0, coords.row - 1);
      var mouseOffsetTop = priv.target.eventPageY - rootElementOffset.top + wtTable.holder.scrollTop;
      var hiderHeight = wtTable.hider.offsetHeight;
      var tbodyOffsetTop = wtTable.TBODY.offsetTop;
      var backlightElemMarginTop = this.backlight.getOffset().top;
      var backlightElemHeight = this.backlight.getSize().height;
      if (this.isFixedRowTop(coords.row)) {
        tdOffsetTop += wtTable.holder.scrollTop;
      }
      if (coords.row < 0) {
        // if hover on colHeader
        priv.target.row = firstVisible > 0 ? firstVisible - 1 : firstVisible;
      } else if (TD.offsetHeight / 2 + tdOffsetTop <= mouseOffsetTop) {
        // if hover on lower part of TD
        priv.target.row = coords.row + 1;
        // unfortunately first row is bigger than rest
        tdOffsetTop += coords.row === 0 ? TD.offsetHeight - 1 : TD.offsetHeight;
      } else {
        // elsewhere on table
        priv.target.row = coords.row;
      }
      var backlightTop = mouseOffsetTop;
      var guidelineTop = tdOffsetTop;
      if (mouseOffsetTop + backlightElemHeight + backlightElemMarginTop >= hiderHeight) {
        // prevent display backlight below table
        backlightTop = hiderHeight - backlightElemHeight - backlightElemMarginTop;
      } else if (mouseOffsetTop + backlightElemMarginTop < tbodyOffsetTop) {
        // prevent display above below table
        backlightTop = tbodyOffsetTop + Math.abs(backlightElemMarginTop);
      }
      if (tdOffsetTop >= hiderHeight - 1) {
        // prevent display guideline below table
        guidelineTop = hiderHeight - 1;
      }
      this.backlight.setPosition(backlightTop);
      this.guideline.setPosition(guidelineTop);
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
      var _this$hot$view$_wt = this.hot.view._wt,
        wtTable = _this$hot$view$_wt.wtTable,
        wtViewport = _this$hot$view$_wt.wtViewport;
      var isHeaderSelection = this.hot.selection.isSelectedByRowHeader();
      var selection = this.hot.getSelectedRangeLast();
      var priv = privatePool.get(this);
      if (!selection || !isHeaderSelection || priv.pressed || event.button !== 0) {
        priv.pressed = false;
        priv.rowsToMove.length = 0;
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
      var start = Math.min(from.row, to.row);
      var end = Math.max(from.row, to.row);
      if (coords.col < 0 && coords.row >= start && coords.row <= end) {
        controller.row = true;
        priv.pressed = true;
        priv.target.eventPageY = event.pageY;
        priv.target.coords = coords;
        priv.target.TD = TD;
        priv.rowsToMove = this.prepareRowsToMoving();
        var leftPos = wtTable.holder.scrollLeft + wtViewport.getRowHeaderWidth();
        this.backlight.setPosition(null, leftPos);
        this.backlight.setSize(wtTable.hider.offsetWidth - leftPos, this.getRowsHeight(start, end));
        this.backlight.setOffset((this.getRowsHeight(start, coords.row - 1) + event.offsetY) * -1, null);
        (0, _element.addClass)(this.hot.rootElement, CSS_ON_MOVING);
        this.refreshPositions();
      } else {
        (0, _element.removeClass)(this.hot.rootElement, CSS_AFTER_SELECTION);
        priv.pressed = false;
        priv.rowsToMove.length = 0;
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
        var height = this.backlight.getSize().height;
        this.backlight.setSize(null, 0);
        setTimeout(function () {
          this.backlight.setPosition(null, height);
        });
      }
      priv.target.eventPageY = event.pageY;
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
      if (priv.rowsToMove.indexOf(coords.row) > -1) {
        (0, _element.removeClass)(this.hot.rootElement, CSS_SHOW_UI);
      } else {
        (0, _element.addClass)(this.hot.rootElement, CSS_SHOW_UI);
      }
      controller.row = true;
      controller.column = true;
      controller.cell = true;
      priv.target.coords = coords;
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
      var target = priv.target.row;
      var rowsLen = priv.rowsToMove.length;
      priv.pressed = false;
      priv.backlightHeight = 0;
      (0, _element.removeClass)(this.hot.rootElement, [CSS_ON_MOVING, CSS_SHOW_UI, CSS_AFTER_SELECTION]);
      if (this.hot.selection.isSelectedByRowHeader()) {
        (0, _element.addClass)(this.hot.rootElement, CSS_AFTER_SELECTION);
      }
      if (rowsLen < 1 || target === void 0) {
        return;
      }
      var firstMovedVisualRow = priv.rowsToMove[0];
      var firstMovedPhysicalRow = this.hot.toPhysicalRow(firstMovedVisualRow);
      var movePerformed = this.dragRows(priv.rowsToMove, target);
      priv.rowsToMove.length = 0;
      if (movePerformed === true) {
        this.persistentStateSave();
        this.hot.render();
        this.hot.view.adjustElementsSize(true);
        var selectionStart = this.hot.toVisualRow(firstMovedPhysicalRow);
        var selectionEnd = selectionStart + rowsLen - 1;
        this.hot.selectRows(selectionStart, selectionEnd);
      }
    }

    /**
     * `afterScrollHorizontally` hook callback. Fired the table was scrolled horizontally.
     *
     * @private
     */
  }, {
    key: "onAfterScrollHorizontally",
    value: function onAfterScrollHorizontally() {
      var wtTable = this.hot.view._wt.wtTable;
      var headerWidth = this.hot.view._wt.wtViewport.getRowHeaderWidth();
      var scrollLeft = wtTable.holder.scrollLeft;
      var posLeft = headerWidth + scrollLeft;
      this.backlight.setPosition(null, posLeft);
      this.backlight.setSize(wtTable.hider.offsetWidth - posLeft);
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
      _get(_getPrototypeOf(ManualRowMove.prototype), "destroy", this).call(this);
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
  return ManualRowMove;
}(_base.BasePlugin);
exports.ManualRowMove = ManualRowMove;