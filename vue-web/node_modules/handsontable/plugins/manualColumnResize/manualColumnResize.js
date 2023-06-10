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
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.ManualColumnResize = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.timers.js");
var _base = require("../base");
var _element = require("../../helpers/dom/element");
var _eventManager = _interopRequireDefault(require("../../eventManager"));
var _array = require("../../helpers/array");
var _number = require("../../helpers/number");
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
// Developer note! Whenever you make a change in this file, make an analogous change in manualRowResize.js

var PLUGIN_KEY = 'manualColumnResize';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 130;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var PERSISTENT_STATE_KEY = 'manualColumnWidths';
var privatePool = new WeakMap();

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin ManualColumnResize
 * @class ManualColumnResize
 *
 * @description
 * This plugin allows to change columns width. To make columns width persistent the {@link Options#persistentState}
 * plugin should be enabled.
 *
 * The plugin creates additional components to make resizing possibly using user interface:
 * - handle - the draggable element that sets the desired width of the column.
 * - guide - the helper guide that shows the desired width as a vertical guide.
 */
var ManualColumnResize = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ManualColumnResize, _BasePlugin);
  var _super = _createSuper(ManualColumnResize);
  function ManualColumnResize(hotInstance) {
    var _this;
    _classCallCheck(this, ManualColumnResize);
    _this = _super.call(this, hotInstance);
    var rootDocument = _this.hot.rootDocument;
    _this.currentTH = null;
    _this.currentCol = null;
    _this.selectedCols = [];
    _this.currentWidth = null;
    _this.newSize = null;
    _this.startY = null;
    _this.startWidth = null;
    _this.startOffset = null;
    _this.handle = rootDocument.createElement('DIV');
    _this.guide = rootDocument.createElement('DIV');
    _this.eventManager = new _eventManager.default(_assertThisInitialized(_this));
    _this.pressed = null;
    _this.dblclick = 0;
    _this.autoresizeTimeout = null;

    /**
     * PhysicalIndexToValueMap to keep and track widths for physical column indexes.
     *
     * @private
     * @type {PhysicalIndexToValueMap}
     */
    _this.columnWidthsMap = void 0;
    /**
     * Private pool to save configuration from updateSettings.
     */
    privatePool.set(_assertThisInitialized(_this), {
      config: void 0
    });
    (0, _element.addClass)(_this.handle, 'manualColumnResizer');
    (0, _element.addClass)(_this.guide, 'manualColumnResizerGuide');
    return _this;
  }

  /**
   * @private
   * @returns {string}
   */
  _createClass(ManualColumnResize, [{
    key: "inlineDir",
    get: function get() {
      return this.hot.isRtl() ? 'right' : 'left';
    }

    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` then the {@link ManualColumnResize#enablePlugin} method is called.
     *
     * @returns {boolean}
     */
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.hot.getSettings()[PLUGIN_KEY];
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
      this.columnWidthsMap = new _translations.PhysicalIndexToValueMap();
      this.columnWidthsMap.addLocalHook('init', function () {
        return _this2.onMapInit();
      });
      this.hot.columnIndexMapper.registerMap(this.pluginName, this.columnWidthsMap);
      this.addHook('modifyColWidth', function (width, col) {
        return _this2.onModifyColWidth(width, col);
      });
      this.addHook('beforeStretchingColumnWidth', function (stretchedWidth, column) {
        return _this2.onBeforeStretchingColumnWidth(stretchedWidth, column);
      });
      this.addHook('beforeColumnResize', function (newSize, column, isDoubleClick) {
        return _this2.onBeforeColumnResize(newSize, column, isDoubleClick);
      });
      this.bindEvents();
      _get(_getPrototypeOf(ManualColumnResize.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`manualColumnResize`](@/api/options.md#manualcolumnresize)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(ManualColumnResize.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var priv = privatePool.get(this);
      priv.config = this.columnWidthsMap.getValues();
      this.hot.columnIndexMapper.unregisterMap(this.pluginName);
      _get(_getPrototypeOf(ManualColumnResize.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Saves the current sizes using the persistentState plugin (the {@link Options#persistentState} option has to be enabled).
     *
     * @fires Hooks#persistentStateSave
     */
  }, {
    key: "saveManualColumnWidths",
    value: function saveManualColumnWidths() {
      this.hot.runHooks('persistentStateSave', PERSISTENT_STATE_KEY, this.columnWidthsMap.getValues());
    }

    /**
     * Loads the previously saved sizes using the persistentState plugin (the {@link Options#persistentState} option has to be enabled).
     *
     * @returns {Array}
     * @fires Hooks#persistentStateLoad
     */
  }, {
    key: "loadManualColumnWidths",
    value: function loadManualColumnWidths() {
      var storedState = {};
      this.hot.runHooks('persistentStateLoad', PERSISTENT_STATE_KEY, storedState);
      return storedState.value;
    }

    /**
     * Sets the new width for specified column index.
     *
     * @param {number} column Visual column index.
     * @param {number} width Column width (no less than 20px).
     * @returns {number} Returns new width.
     */
  }, {
    key: "setManualSize",
    value: function setManualSize(column, width) {
      var newWidth = Math.max(width, 20);
      var physicalColumn = this.hot.toPhysicalColumn(column);
      this.columnWidthsMap.setValueAtIndex(physicalColumn, newWidth);
      return newWidth;
    }

    /**
     * Clears the cache for the specified column index.
     *
     * @param {number} column Visual column index.
     */
  }, {
    key: "clearManualSize",
    value: function clearManualSize(column) {
      var physicalColumn = this.hot.toPhysicalColumn(column);
      this.columnWidthsMap.setValueAtIndex(physicalColumn, null);
    }

    /**
     * Callback to call on map's `init` local hook.
     *
     * @private
     */
  }, {
    key: "onMapInit",
    value: function onMapInit() {
      var _this3 = this;
      var priv = privatePool.get(this);
      var initialSetting = this.hot.getSettings()[PLUGIN_KEY];
      var loadedManualColumnWidths = this.loadManualColumnWidths();
      if (typeof loadedManualColumnWidths !== 'undefined') {
        this.hot.batchExecution(function () {
          loadedManualColumnWidths.forEach(function (width, physicalIndex) {
            _this3.columnWidthsMap.setValueAtIndex(physicalIndex, width);
          });
        }, true);
      } else if (Array.isArray(initialSetting)) {
        this.hot.batchExecution(function () {
          initialSetting.forEach(function (width, physicalIndex) {
            _this3.columnWidthsMap.setValueAtIndex(physicalIndex, width);
          });
        }, true);
        priv.config = initialSetting;
      } else if (initialSetting === true && Array.isArray(priv.config)) {
        this.hot.batchExecution(function () {
          priv.config.forEach(function (width, physicalIndex) {
            _this3.columnWidthsMap.setValueAtIndex(physicalIndex, width);
          });
        }, true);
      }
    }

    /**
     * Set the resize handle position.
     *
     * @private
     * @param {HTMLCellElement} TH TH HTML element.
     */
  }, {
    key: "setupHandlePosition",
    value: function setupHandlePosition(TH) {
      var _this4 = this;
      if (!TH.parentNode) {
        return;
      }
      this.currentTH = TH;
      var wt = this.hot.view._wt;
      var cellCoords = wt.wtTable.getCoords(this.currentTH);
      var col = cellCoords.col;

      // Ignore column headers.
      if (col < 0) {
        return;
      }
      var headerHeight = (0, _element.outerHeight)(this.currentTH);
      var box = this.currentTH.getBoundingClientRect();
      // Read "fixedColumnsStart" through the Walkontable as in that context, the fixed columns
      // are modified (reduced by the number of hidden columns) by TableView module.
      var fixedColumn = col < wt.getSetting('fixedColumnsStart');
      var relativeHeaderPosition;
      if (fixedColumn) {
        relativeHeaderPosition = wt.wtOverlays.topInlineStartCornerOverlay.getRelativeCellPosition(this.currentTH, cellCoords.row, cellCoords.col);
      }

      // If the TH is not a child of the top-left overlay, recalculate using
      // the top overlay - as this overlay contains the rest of the headers.
      if (!relativeHeaderPosition) {
        relativeHeaderPosition = wt.wtOverlays.topOverlay.getRelativeCellPosition(this.currentTH, cellCoords.row, cellCoords.col);
      }
      this.currentCol = this.hot.columnIndexMapper.getVisualFromRenderableIndex(col);
      this.selectedCols = [];
      var isFullColumnSelected = this.hot.selection.isSelectedByCorner() || this.hot.selection.isSelectedByColumnHeader();
      if (this.hot.selection.isSelected() && isFullColumnSelected) {
        var selectionRanges = this.hot.getSelectedRange();
        (0, _array.arrayEach)(selectionRanges, function (selectionRange) {
          var fromColumn = selectionRange.getTopStartCorner().col;
          var toColumn = selectionRange.getBottomEndCorner().col;

          // Add every selected column for resize action.
          (0, _number.rangeEach)(fromColumn, toColumn, function (columnIndex) {
            if (!_this4.selectedCols.includes(columnIndex)) {
              _this4.selectedCols.push(columnIndex);
            }
          });
        });
      }

      // Resizing element beyond the current selection (also when there is no selection).
      if (!this.selectedCols.includes(this.currentCol)) {
        this.selectedCols = [this.currentCol];
      }
      this.startOffset = relativeHeaderPosition.start - 6;
      this.startWidth = parseInt(box.width, 10);
      this.handle.style.top = "".concat(relativeHeaderPosition.top, "px");
      this.handle.style[this.inlineDir] = "".concat(this.startOffset + this.startWidth, "px");
      this.handle.style.height = "".concat(headerHeight, "px");
      this.hot.rootElement.appendChild(this.handle);
    }

    /**
     * Refresh the resize handle position.
     *
     * @private
     */
  }, {
    key: "refreshHandlePosition",
    value: function refreshHandlePosition() {
      this.handle.style[this.inlineDir] = "".concat(this.startOffset + this.currentWidth, "px");
    }

    /**
     * Sets the resize guide position.
     *
     * @private
     */
  }, {
    key: "setupGuidePosition",
    value: function setupGuidePosition() {
      var handleHeight = parseInt((0, _element.outerHeight)(this.handle), 10);
      var handleBottomPosition = parseInt(this.handle.style.top, 10) + handleHeight;
      var maximumVisibleElementHeight = parseInt(this.hot.view.maximumVisibleElementHeight(0), 10);
      (0, _element.addClass)(this.handle, 'active');
      (0, _element.addClass)(this.guide, 'active');
      this.guide.style.top = "".concat(handleBottomPosition, "px");
      this.refreshGuidePosition();
      this.guide.style.height = "".concat(maximumVisibleElementHeight - handleHeight, "px");
      this.hot.rootElement.appendChild(this.guide);
    }

    /**
     * Refresh the resize guide position.
     *
     * @private
     */
  }, {
    key: "refreshGuidePosition",
    value: function refreshGuidePosition() {
      this.guide.style[this.inlineDir] = this.handle.style[this.inlineDir];
    }

    /**
     * Hides both the resize handle and resize guide.
     *
     * @private
     */
  }, {
    key: "hideHandleAndGuide",
    value: function hideHandleAndGuide() {
      (0, _element.removeClass)(this.handle, 'active');
      (0, _element.removeClass)(this.guide, 'active');
    }

    /**
     * Checks if provided element is considered a column header.
     *
     * @private
     * @param {HTMLElement} element HTML element.
     * @returns {boolean}
     */
  }, {
    key: "checkIfColumnHeader",
    value: function checkIfColumnHeader(element) {
      return !!(0, _element.closest)(element, ['THEAD'], this.hot.rootElement);
    }

    /**
     * Gets the TH element from the provided element.
     *
     * @private
     * @param {HTMLElement} element HTML element.
     * @returns {HTMLElement}
     */
  }, {
    key: "getClosestTHParent",
    value: function getClosestTHParent(element) {
      if (element.tagName !== 'TABLE') {
        if (element.tagName === 'TH') {
          return element;
        }
        return this.getClosestTHParent(element.parentNode);
      }
      return null;
    }

    /**
     * 'mouseover' event callback - set the handle position.
     *
     * @private
     * @param {MouseEvent} event The mouse event.
     */
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      // Workaround for #6926 - if the `event.target` is temporarily detached, we can skip this callback and wait for
      // the next `onmouseover`.
      if ((0, _element.isDetached)(event.target)) {
        return;
      }
      if (this.checkIfColumnHeader(event.target)) {
        var th = this.getClosestTHParent(event.target);
        if (!th) {
          return;
        }
        var colspan = th.getAttribute('colspan');
        if (th && (colspan === null || colspan === '1')) {
          if (!this.pressed) {
            this.setupHandlePosition(th);
          }
        }
      }
    }

    /**
     * Auto-size row after doubleclick - callback.
     *
     * @private
     * @fires Hooks#beforeColumnResize
     * @fires Hooks#afterColumnResize
     */
  }, {
    key: "afterMouseDownTimeout",
    value: function afterMouseDownTimeout() {
      var _this5 = this;
      var render = function render() {
        _this5.hot.forceFullRender = true;
        _this5.hot.view.render(); // updates all
        _this5.hot.view.adjustElementsSize(true);
      };
      var resize = function resize(column, forceRender) {
        var hookNewSize = _this5.hot.runHooks('beforeColumnResize', _this5.newSize, column, true);
        if (hookNewSize !== void 0) {
          _this5.newSize = hookNewSize;
        }
        if (_this5.hot.getSettings().stretchH === 'all') {
          _this5.clearManualSize(column);
        } else {
          _this5.setManualSize(column, _this5.newSize); // double click sets by auto row size plugin
        }

        _this5.saveManualColumnWidths();
        _this5.hot.runHooks('afterColumnResize', _this5.newSize, column, true);
        if (forceRender) {
          render();
        }
      };
      if (this.dblclick >= 2) {
        var selectedColsLength = this.selectedCols.length;
        if (selectedColsLength > 1) {
          (0, _array.arrayEach)(this.selectedCols, function (selectedCol) {
            resize(selectedCol);
          });
          render();
        } else {
          (0, _array.arrayEach)(this.selectedCols, function (selectedCol) {
            resize(selectedCol, true);
          });
        }
      }
      this.dblclick = 0;
      this.autoresizeTimeout = null;
    }

    /**
     * 'mousedown' event callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event.
     */
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var _this6 = this;
      if ((0, _element.hasClass)(event.target, 'manualColumnResizer')) {
        this.setupHandlePosition(this.currentTH);
        this.setupGuidePosition();
        this.pressed = true;
        if (this.autoresizeTimeout === null) {
          this.autoresizeTimeout = setTimeout(function () {
            return _this6.afterMouseDownTimeout();
          }, 500);
          this.hot._registerTimeout(this.autoresizeTimeout);
        }
        this.dblclick += 1;
        this.startX = event.pageX;
        this.newSize = this.startWidth;
      }
    }

    /**
     * 'mousemove' event callback - refresh the handle and guide positions, cache the new column width.
     *
     * @private
     * @param {MouseEvent} event The mouse event.
     */
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var _this7 = this;
      if (this.pressed) {
        var change = (event.pageX - this.startX) * this.hot.getDirectionFactor();
        this.currentWidth = this.startWidth + change;
        (0, _array.arrayEach)(this.selectedCols, function (selectedCol) {
          _this7.newSize = _this7.setManualSize(selectedCol, _this7.currentWidth);
        });
        this.refreshHandlePosition();
        this.refreshGuidePosition();
      }
    }

    /**
     * 'mouseup' event callback - apply the column resizing.
     *
     * @private
     *
     * @fires Hooks#beforeColumnResize
     * @fires Hooks#afterColumnResize
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var _this8 = this;
      var render = function render() {
        _this8.hot.forceFullRender = true;
        _this8.hot.view.render(); // updates all
        _this8.hot.view.adjustElementsSize(true);
      };
      var resize = function resize(column, forceRender) {
        _this8.hot.runHooks('beforeColumnResize', _this8.newSize, column, false);
        if (forceRender) {
          render();
        }
        _this8.saveManualColumnWidths();
        _this8.hot.runHooks('afterColumnResize', _this8.newSize, column, false);
      };
      if (this.pressed) {
        this.hideHandleAndGuide();
        this.pressed = false;
        if (this.newSize !== this.startWidth) {
          var selectedColsLength = this.selectedCols.length;
          if (selectedColsLength > 1) {
            (0, _array.arrayEach)(this.selectedCols, function (selectedCol) {
              resize(selectedCol);
            });
            render();
          } else {
            (0, _array.arrayEach)(this.selectedCols, function (selectedCol) {
              resize(selectedCol, true);
            });
          }
        }
        this.setupHandlePosition(this.currentTH);
      }
    }

    /**
     * Binds the mouse events.
     *
     * @private
     */
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this9 = this;
      var _this$hot = this.hot,
        rootWindow = _this$hot.rootWindow,
        rootElement = _this$hot.rootElement;
      this.eventManager.addEventListener(rootElement, 'mouseover', function (e) {
        return _this9.onMouseOver(e);
      });
      this.eventManager.addEventListener(rootElement, 'mousedown', function (e) {
        return _this9.onMouseDown(e);
      });
      this.eventManager.addEventListener(rootWindow, 'mousemove', function (e) {
        return _this9.onMouseMove(e);
      });
      this.eventManager.addEventListener(rootWindow, 'mouseup', function () {
        return _this9.onMouseUp();
      });
    }

    /**
     * Modifies the provided column width, based on the plugin settings.
     *
     * @private
     * @param {number} width Column width.
     * @param {number} column Visual column index.
     * @returns {number}
     */
  }, {
    key: "onModifyColWidth",
    value: function onModifyColWidth(width, column) {
      var newWidth = width;
      if (this.enabled) {
        var physicalColumn = this.hot.toPhysicalColumn(column);
        var columnWidth = this.columnWidthsMap.getValueAtIndex(physicalColumn);
        if (this.hot.getSettings()[PLUGIN_KEY] && columnWidth) {
          newWidth = columnWidth;
        }
      }
      return newWidth;
    }

    /**
     * Modifies the provided column stretched width. This hook decides if specified column should be stretched or not.
     *
     * @private
     * @param {number} stretchedWidth Stretched width.
     * @param {number} column Visual column index.
     * @returns {number}
     */
  }, {
    key: "onBeforeStretchingColumnWidth",
    value: function onBeforeStretchingColumnWidth(stretchedWidth, column) {
      var width = this.columnWidthsMap.getValueAtIndex(column);
      if (width === null) {
        width = stretchedWidth;
      }
      return width;
    }

    /**
     * `beforeColumnResize` hook callback.
     *
     * @private
     */
  }, {
    key: "onBeforeColumnResize",
    value: function onBeforeColumnResize() {
      // clear the header height cache information
      this.hot.view._wt.wtViewport.resetHasOversizedColumnHeadersMarked();
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ManualColumnResize.prototype), "destroy", this).call(this);
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
  return ManualColumnResize;
}(_base.BasePlugin);
exports.ManualColumnResize = ManualColumnResize;