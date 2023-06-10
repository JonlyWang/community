function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/web.timers.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import { BasePlugin } from "../base/index.mjs";
import { addClass, closest, hasClass, removeClass, outerWidth, isDetached } from "../../helpers/dom/element.mjs";
import EventManager from "../../eventManager.mjs";
import { arrayEach } from "../../helpers/array.mjs";
import { rangeEach } from "../../helpers/number.mjs";
import { PhysicalIndexToValueMap as IndexToValueMap } from "../../translations/index.mjs";
import { ViewportRowsCalculator } from "../../3rdparty/walkontable/src/index.mjs"; // Developer note! Whenever you make a change in this file, make an analogous change in manualColumnResize.js
export var PLUGIN_KEY = 'manualRowResize';
export var PLUGIN_PRIORITY = 30;
var PERSISTENT_STATE_KEY = 'manualRowHeights';
var privatePool = new WeakMap();

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin ManualRowResize
 * @class ManualRowResize
 *
 * @description
 * This plugin allows to change rows height. To make rows height persistent the {@link Options#persistentState}
 * plugin should be enabled.
 *
 * The plugin creates additional components to make resizing possibly using user interface:
 * - handle - the draggable element that sets the desired height of the row.
 * - guide - the helper guide that shows the desired height as a horizontal guide.
 */
export var ManualRowResize = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ManualRowResize, _BasePlugin);
  var _super = _createSuper(ManualRowResize);
  function ManualRowResize(hotInstance) {
    var _this;
    _classCallCheck(this, ManualRowResize);
    _this = _super.call(this, hotInstance);
    var rootDocument = _this.hot.rootDocument;
    _this.currentTH = null;
    _this.currentRow = null;
    _this.selectedRows = [];
    _this.currentHeight = null;
    _this.newSize = null;
    _this.startY = null;
    _this.startHeight = null;
    _this.startOffset = null;
    _this.handle = rootDocument.createElement('DIV');
    _this.guide = rootDocument.createElement('DIV');
    _this.eventManager = new EventManager(_assertThisInitialized(_this));
    _this.pressed = null;
    _this.dblclick = 0;
    _this.autoresizeTimeout = null;

    /**
     * PhysicalIndexToValueMap to keep and track widths for physical row indexes.
     *
     * @private
     * @type {PhysicalIndexToValueMap}
     */
    _this.rowHeightsMap = void 0;
    /**
     * Private pool to save configuration from updateSettings.
     */
    privatePool.set(_assertThisInitialized(_this), {
      config: void 0
    });
    addClass(_this.handle, 'manualRowResizer');
    addClass(_this.guide, 'manualRowResizerGuide');
    return _this;
  }

  /**
   * @private
   * @returns {string}
   */
  _createClass(ManualRowResize, [{
    key: "inlineDir",
    get: function get() {
      return this.hot.isRtl() ? 'right' : 'left';
    }

    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` then the {@link ManualRowResize#enablePlugin} method is called.
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
      this.rowHeightsMap = new IndexToValueMap();
      this.rowHeightsMap.addLocalHook('init', function () {
        return _this2.onMapInit();
      });
      this.hot.rowIndexMapper.registerMap(this.pluginName, this.rowHeightsMap);
      this.addHook('modifyRowHeight', function (height, row) {
        return _this2.onModifyRowHeight(height, row);
      });
      this.bindEvents();
      _get(_getPrototypeOf(ManualRowResize.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`manualRowResize`](@/api/options.md#manualrowresize)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(ManualRowResize.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var priv = privatePool.get(this);
      priv.config = this.rowHeightsMap.getValues();
      this.hot.rowIndexMapper.unregisterMap(this.pluginName);
      _get(_getPrototypeOf(ManualRowResize.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Saves the current sizes using the persistentState plugin (the {@link Options#persistentState} option has to be
     * enabled).
     *
     * @fires Hooks#persistentStateSave
     */
  }, {
    key: "saveManualRowHeights",
    value: function saveManualRowHeights() {
      this.hot.runHooks('persistentStateSave', PERSISTENT_STATE_KEY, this.rowHeightsMap.getValues());
    }

    /**
     * Loads the previously saved sizes using the persistentState plugin (the {@link Options#persistentState} option
     * has be enabled).
     *
     * @returns {Array}
     * @fires Hooks#persistentStateLoad
     */
  }, {
    key: "loadManualRowHeights",
    value: function loadManualRowHeights() {
      var storedState = {};
      this.hot.runHooks('persistentStateLoad', PERSISTENT_STATE_KEY, storedState);
      return storedState.value;
    }

    /**
     * Sets the new height for specified row index.
     *
     * @param {number} row Visual row index.
     * @param {number} height Row height.
     * @returns {number} Returns new height.
     */
  }, {
    key: "setManualSize",
    value: function setManualSize(row, height) {
      var physicalRow = this.hot.toPhysicalRow(row);
      var newHeight = Math.max(height, ViewportRowsCalculator.DEFAULT_HEIGHT);
      this.rowHeightsMap.setValueAtIndex(physicalRow, newHeight);
      return newHeight;
    }

    /**
     * Sets the resize handle position.
     *
     * @private
     * @param {HTMLCellElement} TH TH HTML element.
     */
  }, {
    key: "setupHandlePosition",
    value: function setupHandlePosition(TH) {
      var _this3 = this;
      this.currentTH = TH;
      var view = this.hot.view;
      var wt = view._wt;
      var cellCoords = wt.wtTable.getCoords(this.currentTH);
      var row = cellCoords.row;

      // Ignore row headers.
      if (row < 0) {
        return;
      }
      var headerWidth = outerWidth(this.currentTH);
      var box = this.currentTH.getBoundingClientRect();
      // Read "fixedRowsTop" and "fixedRowsBottom" through the Walkontable as in that context, the fixed
      // rows are modified (reduced by the number of hidden rows) by TableView module.
      var fixedRowTop = row < wt.getSetting('fixedRowsTop');
      var fixedRowBottom = row >= view.countNotHiddenRowIndexes(0, 1) - wt.getSetting('fixedRowsBottom');
      var relativeHeaderPosition;
      if (fixedRowTop) {
        relativeHeaderPosition = wt.wtOverlays.topInlineStartCornerOverlay.getRelativeCellPosition(this.currentTH, cellCoords.row, cellCoords.col);
      } else if (fixedRowBottom) {
        relativeHeaderPosition = wt.wtOverlays.bottomInlineStartCornerOverlay.getRelativeCellPosition(this.currentTH, cellCoords.row, cellCoords.col);
      }

      // If the TH is not a child of the top-left/bottom-left overlay, recalculate using
      // the left overlay - as this overlay contains the rest of the headers.
      if (!relativeHeaderPosition) {
        relativeHeaderPosition = wt.wtOverlays.inlineStartOverlay.getRelativeCellPosition(this.currentTH, cellCoords.row, cellCoords.col);
      }
      this.currentRow = this.hot.rowIndexMapper.getVisualFromRenderableIndex(row);
      this.selectedRows = [];
      var isFullRowSelected = this.hot.selection.isSelectedByCorner() || this.hot.selection.isSelectedByRowHeader();
      if (this.hot.selection.isSelected() && isFullRowSelected) {
        var selectionRanges = this.hot.getSelectedRange();
        arrayEach(selectionRanges, function (selectionRange) {
          var fromRow = selectionRange.getTopStartCorner().row;
          var toRow = selectionRange.getBottomStartCorner().row;

          // Add every selected row for resize action.
          rangeEach(fromRow, toRow, function (rowIndex) {
            if (!_this3.selectedRows.includes(rowIndex)) {
              _this3.selectedRows.push(rowIndex);
            }
          });
        });
      }

      // Resizing element beyond the current selection (also when there is no selection).
      if (!this.selectedRows.includes(this.currentRow)) {
        this.selectedRows = [this.currentRow];
      }
      this.startOffset = relativeHeaderPosition.top - 6;
      this.startHeight = parseInt(box.height, 10);
      this.handle.style.top = "".concat(this.startOffset + this.startHeight, "px");
      this.handle.style[this.inlineDir] = "".concat(relativeHeaderPosition.start, "px");
      this.handle.style.width = "".concat(headerWidth, "px");
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
      this.handle.style.top = "".concat(this.startOffset + this.currentHeight, "px");
    }

    /**
     * Sets the resize guide position.
     *
     * @private
     */
  }, {
    key: "setupGuidePosition",
    value: function setupGuidePosition() {
      var handleWidth = parseInt(outerWidth(this.handle), 10);
      var handleEndPosition = parseInt(this.handle.style[this.inlineDir], 10) + handleWidth;
      var maximumVisibleElementWidth = parseInt(this.hot.view.maximumVisibleElementWidth(0), 10);
      addClass(this.handle, 'active');
      addClass(this.guide, 'active');
      this.guide.style.top = this.handle.style.top;
      this.guide.style[this.inlineDir] = "".concat(handleEndPosition, "px");
      this.guide.style.width = "".concat(maximumVisibleElementWidth - handleWidth, "px");
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
      this.guide.style.top = this.handle.style.top;
    }

    /**
     * Hides both the resize handle and resize guide.
     *
     * @private
     */
  }, {
    key: "hideHandleAndGuide",
    value: function hideHandleAndGuide() {
      removeClass(this.handle, 'active');
      removeClass(this.guide, 'active');
    }

    /**
     * Checks if provided element is considered as a row header.
     *
     * @private
     * @param {HTMLElement} element HTML element.
     * @returns {boolean}
     */
  }, {
    key: "checkIfRowHeader",
    value: function checkIfRowHeader(element) {
      var _element$parentNode, _element$parentNode$p;
      var thElement = closest(element, ['TH'], this.hot.rootElement);
      return thElement && ((_element$parentNode = element.parentNode) === null || _element$parentNode === void 0 ? void 0 : (_element$parentNode$p = _element$parentNode.parentNode) === null || _element$parentNode$p === void 0 ? void 0 : _element$parentNode$p.tagName) === 'TBODY';
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
     * Returns the actual height for the provided row index.
     *
     * @private
     * @param {number} row Visual row index.
     * @returns {number} Actual row height.
     */
  }, {
    key: "getActualRowHeight",
    value: function getActualRowHeight(row) {
      // TODO: this should utilize `this.hot.getRowHeight` after it's fixed and working properly.
      var walkontableHeight = this.hot.view._wt.wtTable.getRowHeight(row);
      if (walkontableHeight !== void 0 && this.newSize < walkontableHeight) {
        return walkontableHeight;
      }
      return this.newSize;
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
      if (isDetached(event.target)) {
        return;
      }
      if (this.checkIfRowHeader(event.target)) {
        var th = this.getClosestTHParent(event.target);
        if (th) {
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
     * @fires Hooks#beforeRowResize
     * @fires Hooks#afterRowResize
     */
  }, {
    key: "afterMouseDownTimeout",
    value: function afterMouseDownTimeout() {
      var _this4 = this;
      var render = function render() {
        _this4.hot.forceFullRender = true;
        _this4.hot.view.render(); // updates all
        _this4.hot.view.adjustElementsSize(true);
      };
      var resize = function resize(row, forceRender) {
        var hookNewSize = _this4.hot.runHooks('beforeRowResize', _this4.getActualRowHeight(row), row, true);
        if (hookNewSize !== void 0) {
          _this4.newSize = hookNewSize;
        }
        _this4.setManualSize(row, _this4.newSize); // double click sets auto row size

        _this4.hot.runHooks('afterRowResize', _this4.getActualRowHeight(row), row, true);
        if (forceRender) {
          render();
        }
      };
      if (this.dblclick >= 2) {
        var selectedRowsLength = this.selectedRows.length;
        if (selectedRowsLength > 1) {
          arrayEach(this.selectedRows, function (selectedRow) {
            resize(selectedRow);
          });
          render();
        } else {
          arrayEach(this.selectedRows, function (selectedRow) {
            resize(selectedRow, true);
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
      var _this5 = this;
      if (hasClass(event.target, 'manualRowResizer')) {
        this.setupHandlePosition(this.currentTH);
        this.setupGuidePosition();
        this.pressed = true;
        if (this.autoresizeTimeout === null) {
          this.autoresizeTimeout = setTimeout(function () {
            return _this5.afterMouseDownTimeout();
          }, 500);
          this.hot._registerTimeout(this.autoresizeTimeout);
        }
        this.dblclick += 1;
        this.startY = event.pageY;
        this.newSize = this.startHeight;
      }
    }

    /**
     * 'mousemove' event callback - refresh the handle and guide positions, cache the new row height.
     *
     * @private
     * @param {MouseEvent} event The mouse event.
     */
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var _this6 = this;
      if (this.pressed) {
        this.currentHeight = this.startHeight + (event.pageY - this.startY);
        arrayEach(this.selectedRows, function (selectedRow) {
          _this6.newSize = _this6.setManualSize(selectedRow, _this6.currentHeight);
        });
        this.refreshHandlePosition();
        this.refreshGuidePosition();
      }
    }

    /**
     * 'mouseup' event callback - apply the row resizing.
     *
     * @private
     *
     * @fires Hooks#beforeRowResize
     * @fires Hooks#afterRowResize
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var _this7 = this;
      var render = function render() {
        _this7.hot.forceFullRender = true;
        _this7.hot.view.render(); // updates all
        _this7.hot.view.adjustElementsSize(true);
      };
      var runHooks = function runHooks(row, forceRender) {
        _this7.hot.runHooks('beforeRowResize', _this7.getActualRowHeight(row), row, false);
        if (forceRender) {
          render();
        }
        _this7.saveManualRowHeights();
        _this7.hot.runHooks('afterRowResize', _this7.getActualRowHeight(row), row, false);
      };
      if (this.pressed) {
        this.hideHandleAndGuide();
        this.pressed = false;
        if (this.newSize !== this.startHeight) {
          var selectedRowsLength = this.selectedRows.length;
          if (selectedRowsLength > 1) {
            arrayEach(this.selectedRows, function (selectedRow) {
              runHooks(selectedRow);
            });
            render();
          } else {
            arrayEach(this.selectedRows, function (selectedRow) {
              runHooks(selectedRow, true);
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
      var _this8 = this;
      var _this$hot = this.hot,
        rootElement = _this$hot.rootElement,
        rootWindow = _this$hot.rootWindow;
      this.eventManager.addEventListener(rootElement, 'mouseover', function (e) {
        return _this8.onMouseOver(e);
      });
      this.eventManager.addEventListener(rootElement, 'mousedown', function (e) {
        return _this8.onMouseDown(e);
      });
      this.eventManager.addEventListener(rootWindow, 'mousemove', function (e) {
        return _this8.onMouseMove(e);
      });
      this.eventManager.addEventListener(rootWindow, 'mouseup', function () {
        return _this8.onMouseUp();
      });
    }

    /**
     * Modifies the provided row height, based on the plugin settings.
     *
     * @private
     * @param {number} height Row height.
     * @param {number} row Visual row index.
     * @returns {number}
     */
  }, {
    key: "onModifyRowHeight",
    value: function onModifyRowHeight(height, row) {
      var newHeight = height;
      if (this.enabled) {
        var physicalRow = this.hot.toPhysicalRow(row);
        var rowHeight = this.rowHeightsMap.getValueAtIndex(physicalRow);
        if (this.hot.getSettings()[PLUGIN_KEY] && rowHeight) {
          newHeight = rowHeight;
        }
      }
      return newHeight;
    }

    /**
     * Callback to call on map's `init` local hook.
     *
     * @private
     */
  }, {
    key: "onMapInit",
    value: function onMapInit() {
      var _this9 = this;
      var priv = privatePool.get(this);
      var initialSetting = this.hot.getSettings()[PLUGIN_KEY];
      var loadedManualRowHeights = this.loadManualRowHeights();
      this.hot.batchExecution(function () {
        if (typeof loadedManualRowHeights !== 'undefined') {
          loadedManualRowHeights.forEach(function (height, index) {
            _this9.rowHeightsMap.setValueAtIndex(index, height);
          });
        } else if (Array.isArray(initialSetting)) {
          initialSetting.forEach(function (height, index) {
            _this9.rowHeightsMap.setValueAtIndex(index, height);
          });
          priv.config = initialSetting;
        } else if (initialSetting === true && Array.isArray(priv.config)) {
          priv.config.forEach(function (height, index) {
            _this9.rowHeightsMap.setValueAtIndex(index, height);
          });
        }
      }, true);
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ManualRowResize.prototype), "destroy", this).call(this);
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
  return ManualRowResize;
}(BasePlugin);