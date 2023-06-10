function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { addClass, hasClass, removeClass, getComputedStyle, getTrimmingContainer, innerWidth, innerHeight, offset, outerHeight, outerWidth } from "../../../helpers/dom/element.mjs";
import { stopImmediatePropagation } from "../../../helpers/dom/event.mjs";
import { objectEach } from "../../../helpers/object.mjs";
import { isMobileBrowser } from "../../../helpers/browser.mjs"; /**
                                                                 *
                                                                 */
var Border = /*#__PURE__*/function () {
  // TODO As this is an internal class, should be designed for using {Walkontable}. It uses the facade,
  // TODO Con. Because the class is created on place where the instance reference comes from external origin.
  // TODO Imho, the discrimination for handling both, facade and non-facade should be handled.
  /**
   * @param {WalkontableFacade} wotInstance The Walkontable instance.
   * @param {object} settings The border settings.
   */
  function Border(wotInstance, settings) {
    _classCallCheck(this, Border);
    if (!settings) {
      return;
    }
    this.eventManager = wotInstance.eventManager;
    this.instance = wotInstance;
    this.wot = wotInstance;
    this.settings = settings;
    this.mouseDown = false;
    this.main = null;
    this.top = null;
    this.bottom = null;
    this.start = null;
    this.end = null;
    this.topStyle = null;
    this.bottomStyle = null;
    this.startStyle = null;
    this.endStyle = null;
    this.cornerDefaultStyle = {
      width: '6px',
      height: '6px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#FFF'
    };
    // Offset to moving the corner to be centered relative to the grid.
    this.cornerCenterPointOffset = -(parseInt(this.cornerDefaultStyle.width, 10) / 2);
    this.corner = null;
    this.cornerStyle = null;
    this.createBorders(settings);
    this.registerListeners();
  }

  /**
   * Register all necessary events.
   */
  _createClass(Border, [{
    key: "registerListeners",
    value: function registerListeners() {
      var _this2 = this;
      var documentBody = this.wot.rootDocument.body;
      this.eventManager.addEventListener(documentBody, 'mousedown', function () {
        return _this2.onMouseDown();
      });
      this.eventManager.addEventListener(documentBody, 'mouseup', function () {
        return _this2.onMouseUp();
      });
      var _loop = function _loop(c, len) {
        var element = _this2.main.childNodes[c];
        _this2.eventManager.addEventListener(element, 'mouseenter', function (event) {
          return _this2.onMouseEnter(event, _this2.main.childNodes[c]);
        });
      };
      for (var c = 0, len = this.main.childNodes.length; c < len; c++) {
        _loop(c, len);
      }
    }

    /**
     * Mouse down listener.
     *
     * @private
     */
  }, {
    key: "onMouseDown",
    value: function onMouseDown() {
      this.mouseDown = true;
    }

    /**
     * Mouse up listener.
     *
     * @private
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      this.mouseDown = false;
    }

    /**
     * Mouse enter listener for fragment selection functionality.
     *
     * @private
     * @param {Event} event Dom event.
     * @param {HTMLElement} parentElement Part of border element.
     */
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(event, parentElement) {
      if (!this.mouseDown || !this.wot.getSetting('hideBorderOnMouseDownOver')) {
        return;
      }
      event.preventDefault();
      stopImmediatePropagation(event);
      var _this = this;
      var documentBody = this.wot.rootDocument.body;
      var bounds = parentElement.getBoundingClientRect();

      // Hide border to prevents selection jumping when fragmentSelection is enabled.
      parentElement.style.display = 'none';

      /**
       * @param {Event} mouseEvent The mouse event object.
       * @returns {boolean}
       */
      function isOutside(mouseEvent) {
        if (mouseEvent.clientY < Math.floor(bounds.top)) {
          return true;
        }
        if (mouseEvent.clientY > Math.ceil(bounds.top + bounds.height)) {
          return true;
        }
        if (mouseEvent.clientX < Math.floor(bounds.left)) {
          return true;
        }
        if (mouseEvent.clientX > Math.ceil(bounds.left + bounds.width)) {
          return true;
        }
      }

      /**
       * @param {Event} handlerEvent The mouse event object.
       */
      function handler(handlerEvent) {
        if (isOutside(handlerEvent)) {
          _this.eventManager.removeEventListener(documentBody, 'mousemove', handler);
          parentElement.style.display = 'block';
        }
      }
      this.eventManager.addEventListener(documentBody, 'mousemove', handler);
    }

    /**
     * Create border elements.
     *
     * @param {object} settings The border settings.
     */
  }, {
    key: "createBorders",
    value: function createBorders(settings) {
      var rootDocument = this.wot.rootDocument;
      this.main = rootDocument.createElement('div');
      var borderDivs = ['top', 'start', 'bottom', 'end', 'corner'];
      var style = this.main.style;
      style.position = 'absolute';
      style.top = 0;
      style.left = 0;
      for (var i = 0; i < 5; i++) {
        var position = borderDivs[i];
        var div = rootDocument.createElement('div');
        div.className = "wtBorder ".concat(this.settings.className || ''); // + borderDivs[i];

        if (this.settings[position] && this.settings[position].hide) {
          div.className += ' hidden';
        }
        style = div.style;
        style.backgroundColor = this.settings[position] && this.settings[position].color ? this.settings[position].color : settings.border.color;
        style.height = this.settings[position] && this.settings[position].width ? "".concat(this.settings[position].width, "px") : "".concat(settings.border.width, "px");
        style.width = this.settings[position] && this.settings[position].width ? "".concat(this.settings[position].width, "px") : "".concat(settings.border.width, "px");
        this.main.appendChild(div);
      }
      this.top = this.main.childNodes[0];
      this.start = this.main.childNodes[1];
      this.bottom = this.main.childNodes[2];
      this.end = this.main.childNodes[3];
      this.topStyle = this.top.style;
      this.startStyle = this.start.style;
      this.bottomStyle = this.bottom.style;
      this.endStyle = this.end.style;
      this.corner = this.main.childNodes[4];
      this.corner.className += ' corner';
      this.cornerStyle = this.corner.style;
      this.cornerStyle.width = this.cornerDefaultStyle.width;
      this.cornerStyle.height = this.cornerDefaultStyle.height;
      this.cornerStyle.border = [this.cornerDefaultStyle.borderWidth, this.cornerDefaultStyle.borderStyle, this.cornerDefaultStyle.borderColor].join(' ');
      if (isMobileBrowser()) {
        this.createMultipleSelectorHandles();
      }
      this.disappear();
      var wtTable = this.wot.wtTable;
      var bordersHolder = wtTable.bordersHolder;
      if (!bordersHolder) {
        bordersHolder = rootDocument.createElement('div');
        bordersHolder.className = 'htBorders';
        wtTable.bordersHolder = bordersHolder;
        wtTable.spreader.appendChild(bordersHolder);
      }
      bordersHolder.appendChild(this.main);
    }

    /**
     * Create multiple selector handler for mobile devices.
     */
  }, {
    key: "createMultipleSelectorHandles",
    value: function createMultipleSelectorHandles() {
      var _this3 = this;
      var rootDocument = this.wot.rootDocument;
      this.selectionHandles = {
        top: rootDocument.createElement('DIV'),
        topHitArea: rootDocument.createElement('DIV'),
        bottom: rootDocument.createElement('DIV'),
        bottomHitArea: rootDocument.createElement('DIV')
      };
      var width = 10;
      var hitAreaWidth = 40;
      this.selectionHandles.top.className = 'topSelectionHandle topLeftSelectionHandle';
      this.selectionHandles.topHitArea.className = 'topSelectionHandle-HitArea topLeftSelectionHandle-HitArea';
      this.selectionHandles.bottom.className = 'bottomSelectionHandle bottomRightSelectionHandle';
      this.selectionHandles.bottomHitArea.className = 'bottomSelectionHandle-HitArea bottomRightSelectionHandle-HitArea';
      this.selectionHandles.styles = {
        top: this.selectionHandles.top.style,
        topHitArea: this.selectionHandles.topHitArea.style,
        bottom: this.selectionHandles.bottom.style,
        bottomHitArea: this.selectionHandles.bottomHitArea.style
      };
      var hitAreaStyle = {
        position: 'absolute',
        height: "".concat(hitAreaWidth, "px"),
        width: "".concat(hitAreaWidth, "px"),
        'border-radius': "".concat(parseInt(hitAreaWidth / 1.5, 10), "px")
      };
      objectEach(hitAreaStyle, function (value, key) {
        _this3.selectionHandles.styles.bottomHitArea[key] = value;
        _this3.selectionHandles.styles.topHitArea[key] = value;
      });
      var handleStyle = {
        position: 'absolute',
        height: "".concat(width, "px"),
        width: "".concat(width, "px"),
        'border-radius': "".concat(parseInt(width / 1.5, 10), "px"),
        background: '#F5F5FF',
        border: '1px solid #4285c8'
      };
      objectEach(handleStyle, function (value, key) {
        _this3.selectionHandles.styles.bottom[key] = value;
        _this3.selectionHandles.styles.top[key] = value;
      });
      this.main.appendChild(this.selectionHandles.top);
      this.main.appendChild(this.selectionHandles.bottom);
      this.main.appendChild(this.selectionHandles.topHitArea);
      this.main.appendChild(this.selectionHandles.bottomHitArea);
    }

    /**
     * @param {number} row The visual row index.
     * @param {number} col The visual column index.
     * @returns {boolean}
     */
  }, {
    key: "isPartRange",
    value: function isPartRange(row, col) {
      var areaSelection = this.wot.selections.createOrGetArea();
      if (areaSelection.cellRange) {
        if (row !== areaSelection.cellRange.to.row || col !== areaSelection.cellRange.to.col) {
          return true;
        }
      }
      return false;
    }

    /**
     * @param {number} row The visual row index.
     * @param {number} col The visual column index.
     * @param {number} top The top position of the handler.
     * @param {number} left The left position of the handler.
     * @param {number} width The width of the handler.
     * @param {number} height The height of the handler.
     */
  }, {
    key: "updateMultipleSelectionHandlesPosition",
    value: function updateMultipleSelectionHandlesPosition(row, col, top, left, width, height) {
      var isRtl = this.wot.wtSettings.getSetting('rtlMode');
      var inlinePosProperty = isRtl ? 'right' : 'left';
      var _this$selectionHandle = this.selectionHandles.styles,
        topStyles = _this$selectionHandle.top,
        topHitAreaStyles = _this$selectionHandle.topHitArea,
        bottomStyles = _this$selectionHandle.bottom,
        bottomHitAreaStyles = _this$selectionHandle.bottomHitArea;
      var handleBorderSize = parseInt(topStyles.borderWidth, 10);
      var handleSize = parseInt(topStyles.width, 10);
      var hitAreaSize = parseInt(topHitAreaStyles.width, 10);
      var totalTableWidth = this.wot.wtTable.getWidth();
      var totalTableHeight = this.wot.wtTable.getHeight();
      topStyles.top = "".concat(parseInt(top - handleSize - 1, 10), "px");
      topStyles[inlinePosProperty] = "".concat(parseInt(left - handleSize - 1, 10), "px");
      topHitAreaStyles.top = "".concat(parseInt(top - hitAreaSize / 4 * 3, 10), "px");
      topHitAreaStyles[inlinePosProperty] = "".concat(parseInt(left - hitAreaSize / 4 * 3, 10), "px");
      var bottomHandlerInline = Math.min(parseInt(left + width, 10), totalTableWidth - handleSize - handleBorderSize * 2);
      var bottomHandlerAreaInline = Math.min(parseInt(left + width - hitAreaSize / 4, 10), totalTableWidth - hitAreaSize - handleBorderSize * 2);
      bottomStyles[inlinePosProperty] = "".concat(bottomHandlerInline, "px");
      bottomHitAreaStyles[inlinePosProperty] = "".concat(bottomHandlerAreaInline, "px");
      var bottomHandlerTop = Math.min(parseInt(top + height, 10), totalTableHeight - handleSize - handleBorderSize * 2);
      var bottomHandlerAreaTop = Math.min(parseInt(top + height - hitAreaSize / 4, 10), totalTableHeight - hitAreaSize - handleBorderSize * 2);
      bottomStyles.top = "".concat(bottomHandlerTop, "px");
      bottomHitAreaStyles.top = "".concat(bottomHandlerAreaTop, "px");
      if (this.settings.border.cornerVisible && this.settings.border.cornerVisible()) {
        topStyles.display = 'block';
        topHitAreaStyles.display = 'block';
        if (this.isPartRange(row, col)) {
          bottomStyles.display = 'none';
          bottomHitAreaStyles.display = 'none';
        } else {
          bottomStyles.display = 'block';
          bottomHitAreaStyles.display = 'block';
        }
      } else {
        topStyles.display = 'none';
        bottomStyles.display = 'none';
        topHitAreaStyles.display = 'none';
        bottomHitAreaStyles.display = 'none';
      }
      if (row === this.wot.wtSettings.getSetting('fixedRowsTop') || col === this.wot.wtSettings.getSetting('fixedColumnsStart')) {
        topStyles.zIndex = '9999';
        topHitAreaStyles.zIndex = '9999';
      } else {
        topStyles.zIndex = '';
        topHitAreaStyles.zIndex = '';
      }
    }

    /**
     * Show border around one or many cells.
     *
     * @param {Array} corners The corner coordinates.
     */
  }, {
    key: "appear",
    value: function appear(corners) {
      if (this.disabled) {
        return;
      }
      var _this$wot = this.wot,
        wtTable = _this$wot.wtTable,
        rootDocument = _this$wot.rootDocument,
        rootWindow = _this$wot.rootWindow; // todo refactoring: consider about using internal facade (it is given by external code)
      var fromRow;
      var toRow;
      var fromColumn;
      var toColumn;
      var rowHeader;
      var columnHeader;
      var rowsCount = wtTable.getRenderedRowsCount();
      for (var i = 0; i < rowsCount; i += 1) {
        var s = wtTable.rowFilter.renderedToSource(i);
        if (s >= corners[0] && s <= corners[2]) {
          fromRow = s;
          rowHeader = corners[0];
          break;
        }
      }
      for (var _i = rowsCount - 1; _i >= 0; _i -= 1) {
        var _s = wtTable.rowFilter.renderedToSource(_i);
        if (_s >= corners[0] && _s <= corners[2]) {
          toRow = _s;
          break;
        }
      }
      var columnsCount = wtTable.getRenderedColumnsCount();
      for (var _i2 = 0; _i2 < columnsCount; _i2 += 1) {
        var _s2 = wtTable.columnFilter.renderedToSource(_i2);
        if (_s2 >= corners[1] && _s2 <= corners[3]) {
          fromColumn = _s2;
          columnHeader = corners[1];
          break;
        }
      }
      for (var _i3 = columnsCount - 1; _i3 >= 0; _i3 -= 1) {
        var _s3 = wtTable.columnFilter.renderedToSource(_i3);
        if (_s3 >= corners[1] && _s3 <= corners[3]) {
          toColumn = _s3;
          break;
        }
      }
      if (fromRow === void 0 || fromColumn === void 0) {
        this.disappear();
        return;
      }
      var fromTD = wtTable.getCell(this.wot.createCellCoords(fromRow, fromColumn));
      var isMultiple = fromRow !== toRow || fromColumn !== toColumn;
      var toTD = isMultiple ? wtTable.getCell(this.wot.createCellCoords(toRow, toColumn)) : fromTD;
      var fromOffset = offset(fromTD);
      var toOffset = isMultiple ? offset(toTD) : fromOffset;
      var containerOffset = offset(wtTable.TABLE);
      var containerWidth = outerWidth(wtTable.TABLE);
      var minTop = fromOffset.top;
      var minLeft = fromOffset.left;
      var isRtl = this.wot.wtSettings.getSetting('rtlMode');
      var inlineStartPos = 0;
      var width = 0;
      if (isRtl) {
        var fromWidth = outerWidth(fromTD);
        var gridRightPos = rootWindow.innerWidth - containerOffset.left - containerWidth;
        width = minLeft + fromWidth - toOffset.left;
        inlineStartPos = rootWindow.innerWidth - minLeft - fromWidth - gridRightPos - 1;
      } else {
        width = toOffset.left + outerWidth(toTD) - minLeft;
        inlineStartPos = minLeft - containerOffset.left - 1;
      }
      if (this.isEntireColumnSelected(fromRow, toRow)) {
        var modifiedValues = this.getDimensionsFromHeader('columns', fromColumn, toColumn, rowHeader, containerOffset);
        var fromTH = null;
        if (modifiedValues) {
          var _modifiedValues = _slicedToArray(modifiedValues, 3);
          fromTH = _modifiedValues[0];
          inlineStartPos = _modifiedValues[1];
          width = _modifiedValues[2];
        }
        if (fromTH) {
          fromTD = fromTH;
        }
      }
      var top = minTop - containerOffset.top - 1;
      var height = toOffset.top + outerHeight(toTD) - minTop;
      if (this.isEntireRowSelected(fromColumn, toColumn)) {
        var _modifiedValues2 = this.getDimensionsFromHeader('rows', fromRow, toRow, columnHeader, containerOffset);
        var _fromTH = null;
        if (_modifiedValues2) {
          var _modifiedValues3 = _slicedToArray(_modifiedValues2, 3);
          _fromTH = _modifiedValues3[0];
          top = _modifiedValues3[1];
          height = _modifiedValues3[2];
        }
        if (_fromTH) {
          fromTD = _fromTH;
        }
      }
      var style = getComputedStyle(fromTD, rootWindow);
      if (parseInt(style.borderTopWidth, 10) > 0) {
        top += 1;
        height = height > 0 ? height - 1 : 0;
      }
      if (parseInt(style[isRtl ? 'borderRightWidth' : 'borderLeftWidth'], 10) > 0) {
        inlineStartPos += 1;
        width = width > 0 ? width - 1 : 0;
      }
      var inlinePosProperty = isRtl ? 'right' : 'left';
      this.topStyle.top = "".concat(top, "px");
      this.topStyle[inlinePosProperty] = "".concat(inlineStartPos, "px");
      this.topStyle.width = "".concat(width, "px");
      this.topStyle.display = 'block';
      this.startStyle.top = "".concat(top, "px");
      this.startStyle[inlinePosProperty] = "".concat(inlineStartPos, "px");
      this.startStyle.height = "".concat(height, "px");
      this.startStyle.display = 'block';
      var delta = Math.floor(this.settings.border.width / 2);
      this.bottomStyle.top = "".concat(top + height - delta, "px");
      this.bottomStyle[inlinePosProperty] = "".concat(inlineStartPos, "px");
      this.bottomStyle.width = "".concat(width, "px");
      this.bottomStyle.display = 'block';
      this.endStyle.top = "".concat(top, "px");
      this.endStyle[inlinePosProperty] = "".concat(inlineStartPos + width - delta, "px");
      this.endStyle.height = "".concat(height + 1, "px");
      this.endStyle.display = 'block';
      var cornerVisibleSetting = this.settings.border.cornerVisible;
      cornerVisibleSetting = typeof cornerVisibleSetting === 'function' ? cornerVisibleSetting(this.settings.layerLevel) : cornerVisibleSetting;
      var hookResult = this.wot.getSetting('onModifyGetCellCoords', toRow, toColumn);
      var checkRow = toRow,
        checkCol = toColumn;
      if (hookResult && Array.isArray(hookResult)) {
        var _hookResult = _slicedToArray(hookResult, 4);
        checkRow = _hookResult[2];
        checkCol = _hookResult[3];
      }
      if (isMobileBrowser() || !cornerVisibleSetting || this.isPartRange(checkRow, checkCol)) {
        this.cornerStyle.display = 'none';
      } else {
        this.cornerStyle.top = "".concat(top + height + this.cornerCenterPointOffset - 1, "px");
        this.cornerStyle[inlinePosProperty] = "".concat(inlineStartPos + width + this.cornerCenterPointOffset - 1, "px");
        this.cornerStyle.borderRightWidth = this.cornerDefaultStyle.borderWidth;
        this.cornerStyle.width = this.cornerDefaultStyle.width;

        // Hide the fill handle, so the possible further adjustments won't force unneeded scrollbars.
        this.cornerStyle.display = 'none';
        var trimmingContainer = getTrimmingContainer(wtTable.TABLE);
        var trimToWindow = trimmingContainer === rootWindow;
        if (trimToWindow) {
          trimmingContainer = rootDocument.documentElement;
        }
        var cornerHalfWidth = parseInt(this.cornerDefaultStyle.width, 10) / 2;
        var cornerHalfHeight = parseInt(this.cornerDefaultStyle.height, 10) / 2;
        if (toColumn === this.wot.getSetting('totalColumns') - 1) {
          var toTdOffsetLeft = trimToWindow ? toTD.getBoundingClientRect().left : toTD.offsetLeft;
          var cornerOverlappingContainer = false;
          var cornerEdge = 0;
          if (isRtl) {
            cornerEdge = toTdOffsetLeft - parseInt(this.cornerDefaultStyle.width, 10) / 2;
            cornerOverlappingContainer = cornerEdge < 0;
          } else {
            cornerEdge = toTdOffsetLeft + outerWidth(toTD) + parseInt(this.cornerDefaultStyle.width, 10) / 2;
            cornerOverlappingContainer = cornerEdge >= innerWidth(trimmingContainer);
          }
          if (cornerOverlappingContainer) {
            this.cornerStyle[inlinePosProperty] = "".concat(Math.floor(inlineStartPos + width + this.cornerCenterPointOffset - cornerHalfWidth), "px");
            this.cornerStyle[isRtl ? 'borderLeftWidth' : 'borderRightWidth'] = 0;
          }
        }
        if (toRow === this.wot.getSetting('totalRows') - 1) {
          var toTdOffsetTop = trimToWindow ? toTD.getBoundingClientRect().top : toTD.offsetTop;
          var cornerBottomEdge = toTdOffsetTop + outerHeight(toTD) + parseInt(this.cornerDefaultStyle.height, 10) / 2;
          var _cornerOverlappingContainer = cornerBottomEdge >= innerHeight(trimmingContainer);
          if (_cornerOverlappingContainer) {
            this.cornerStyle.top = "".concat(Math.floor(top + height + this.cornerCenterPointOffset - cornerHalfHeight), "px");
            this.cornerStyle.borderBottomWidth = 0;
          }
        }
        this.cornerStyle.display = 'block';
      }
      if (isMobileBrowser()) {
        this.updateMultipleSelectionHandlesPosition(toRow, toColumn, top, inlineStartPos, width, height);
      }
    }

    /**
     * Check whether an entire column of cells is selected.
     *
     * @private
     * @param {number} startRowIndex Start row index.
     * @param {number} endRowIndex End row index.
     * @returns {boolean}
     */
  }, {
    key: "isEntireColumnSelected",
    value: function isEntireColumnSelected(startRowIndex, endRowIndex) {
      return startRowIndex === this.wot.wtTable.getFirstRenderedRow() && endRowIndex === this.wot.wtTable.getLastRenderedRow();
    }

    /**
     * Check whether an entire row of cells is selected.
     *
     * @private
     * @param {number} startColumnIndex Start column index.
     * @param {number} endColumnIndex End column index.
     * @returns {boolean}
     */
  }, {
    key: "isEntireRowSelected",
    value: function isEntireRowSelected(startColumnIndex, endColumnIndex) {
      return startColumnIndex === this.wot.wtTable.getFirstRenderedColumn() && endColumnIndex === this.wot.wtTable.getLastRenderedColumn();
    }

    /**
     * Get left/top index and width/height depending on the `direction` provided.
     *
     * @private
     * @param {string} direction `rows` or `columns`, defines if an entire column or row is selected.
     * @param {number} fromIndex Start index of the selection.
     * @param {number} toIndex End index of the selection.
     * @param {number} headerIndex The header index as negative value.
     * @param {number} containerOffset Offset of the container.
     * @returns {Array|boolean} Returns an array of [headerElement, left, width] or [headerElement, top, height], depending on `direction` (`false` in case of an error getting the headers).
     */
  }, {
    key: "getDimensionsFromHeader",
    value: function getDimensionsFromHeader(direction, fromIndex, toIndex, headerIndex, containerOffset) {
      var wtTable = this.wot.wtTable;
      var rootHotElement = wtTable.wtRootElement.parentNode;
      var getHeaderFn = null;
      var dimensionFn = null;
      var entireSelectionClassname = null;
      var index = null;
      var dimension = null;
      var dimensionProperty = null;
      var startHeader = null;
      var endHeader = null;
      switch (direction) {
        case 'rows':
          getHeaderFn = function getHeaderFn() {
            return wtTable.getRowHeader.apply(wtTable, arguments);
          };
          dimensionFn = function dimensionFn() {
            return outerHeight.apply(void 0, arguments);
          };
          entireSelectionClassname = 'ht__selection--rows';
          dimensionProperty = 'top';
          break;
        case 'columns':
          getHeaderFn = function getHeaderFn() {
            return wtTable.getColumnHeader.apply(wtTable, arguments);
          };
          dimensionFn = function dimensionFn() {
            return outerWidth.apply(void 0, arguments);
          };
          entireSelectionClassname = 'ht__selection--columns';
          dimensionProperty = 'left';
          break;
        default:
      }
      if (rootHotElement.classList.contains(entireSelectionClassname)) {
        var columnHeaderLevelCount = this.wot.getSetting('columnHeaders').length;
        startHeader = getHeaderFn(fromIndex, columnHeaderLevelCount - headerIndex);
        endHeader = getHeaderFn(toIndex, columnHeaderLevelCount - headerIndex);
        if (!startHeader || !endHeader) {
          return false;
        }
        var startHeaderOffset = offset(startHeader);
        var endOffset = offset(endHeader);
        if (startHeader && endHeader) {
          index = startHeaderOffset[dimensionProperty] - containerOffset[dimensionProperty] - 1;
          dimension = endOffset[dimensionProperty] + dimensionFn(endHeader) - startHeaderOffset[dimensionProperty];
        }
        return [startHeader, index, dimension];
      }
      return false;
    }

    /**
     * Change border style.
     *
     * @private
     * @param {string} borderElement Coordinate where add/remove border: top, bottom, start, end.
     * @param {object} border The border object descriptor.
     */
  }, {
    key: "changeBorderStyle",
    value: function changeBorderStyle(borderElement, border) {
      var style = this[borderElement].style;
      var borderStyle = border[borderElement];
      if (!borderStyle || borderStyle.hide) {
        addClass(this[borderElement], 'hidden');
      } else {
        if (hasClass(this[borderElement], 'hidden')) {
          removeClass(this[borderElement], 'hidden');
        }
        style.backgroundColor = borderStyle.color;
        if (borderElement === 'top' || borderElement === 'bottom') {
          style.height = "".concat(borderStyle.width, "px");
        }
        if (borderElement === 'start' || borderElement === 'end') {
          style.width = "".concat(borderStyle.width, "px");
        }
      }
    }

    /**
     * Change border style to default.
     *
     * @private
     * @param {string} position The position type ("top", "bottom", "start", "end") to change.
     */
  }, {
    key: "changeBorderToDefaultStyle",
    value: function changeBorderToDefaultStyle(position) {
      var defaultBorder = {
        width: 1,
        color: '#000'
      };
      var style = this[position].style;
      style.backgroundColor = defaultBorder.color;
      style.width = "".concat(defaultBorder.width, "px");
      style.height = "".concat(defaultBorder.width, "px");
    }

    /**
     * Toggle class 'hidden' to element.
     *
     * @private
     * @param {string} borderElement Coordinate where add/remove border: top, bottom, start, end.
     * @param {boolean} [remove] Defines type of the action to perform.
     */
  }, {
    key: "toggleHiddenClass",
    value: function toggleHiddenClass(borderElement, remove) {
      this.changeBorderToDefaultStyle(borderElement);
      if (remove) {
        addClass(this[borderElement], 'hidden');
      } else {
        removeClass(this[borderElement], 'hidden');
      }
    }

    /**
     * Hide border.
     */
  }, {
    key: "disappear",
    value: function disappear() {
      this.topStyle.display = 'none';
      this.bottomStyle.display = 'none';
      this.startStyle.display = 'none';
      this.endStyle.display = 'none';
      this.cornerStyle.display = 'none';
      if (isMobileBrowser()) {
        this.selectionHandles.styles.top.display = 'none';
        this.selectionHandles.styles.topHitArea.display = 'none';
        this.selectionHandles.styles.bottom.display = 'none';
        this.selectionHandles.styles.bottomHitArea.display = 'none';
      }
    }

    /**
     * Cleans up all the DOM state related to a Border instance. Call this prior to deleting a Border instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.eventManager.destroyWithOwnEventsOnly();
      this.main.parentNode.removeChild(this.main);
    }
  }]);
  return Border;
}();
export default Border;