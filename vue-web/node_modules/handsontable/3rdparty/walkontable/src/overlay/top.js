"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.TopOverlay = void 0;
var _element = require("../../../../helpers/dom/element");
var _top = _interopRequireDefault(require("./../table/top"));
var _base = require("./_base");
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * @class TopOverlay
 */var TopOverlay = /*#__PURE__*/function (_Overlay) {
  _inherits(TopOverlay, _Overlay);
  var _super = _createSuper(TopOverlay);
  /**
   * Cached value which holds the previous value of the `fixedRowsTop` option.
   * It is used as a comparison value that can be used to detect changes in this value.
   *
   * @type {number}
   */

  /**
   * @param {Walkontable} wotInstance The Walkontable instance. @TODO refactoring: check if can be deleted.
   * @param {FacadeGetter} facadeGetter Function which return proper facade.
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {DomBindings} domBindings Dom elements bound to the current instance.
   */
  function TopOverlay(wotInstance, facadeGetter, wtSettings, domBindings) {
    var _this;
    _classCallCheck(this, TopOverlay);
    _this = _super.call(this, wotInstance, facadeGetter, _constants.CLONE_TOP, wtSettings, domBindings);
    _defineProperty(_assertThisInitialized(_this), "cachedFixedRowsTop", -1);
    _this.cachedFixedRowsTop = _this.wtSettings.getSetting('fixedRowsTop');
    return _this;
  }

  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {TopOverlayTable}
   */
  _createClass(TopOverlay, [{
    key: "createTable",
    value: function createTable() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _construct(_top.default, args);
    }

    /**
     * Checks if overlay should be fully rendered.
     *
     * @returns {boolean}
     */
  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      return this.wtSettings.getSetting('shouldRenderTopOverlay');
    }

    /**
     * Updates the top overlay position.
     *
     * @returns {boolean}
     */
  }, {
    key: "resetFixedPosition",
    value: function resetFixedPosition() {
      if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
        // removed from DOM
        return false;
      }
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var rootWindow = this.domBindings.rootWindow;
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      var overlayPosition = 0;
      var skipInnerBorderAdjusting = false;
      if (this.trimmingContainer === rootWindow && (!preventOverflow || preventOverflow !== 'vertical')) {
        var wtTable = this.wot.wtTable;
        var hiderRect = wtTable.hider.getBoundingClientRect();
        var bottom = Math.ceil(hiderRect.bottom);
        var rootHeight = overlayRoot.offsetHeight;

        // This checks if the overlay is going to an infinite loop caused by added (or removed)
        // `innerBorderTop` class name. Toggling the class name shifts the viewport by 1px and
        // triggers the `scroll` event. It causes the table to render. The new render cycle takes into,
        // account the shift and toggles the class name again. This causes the next loops. This
        // happens only on Chrome (#7256).
        //
        // When we detect that the table bottom position is the same as the overlay bottom,
        // do not toggle the class name.
        //
        // This workaround will be able to be cleared after merging the SVG borders, which introduces
        // frozen lines (no more `innerBorderTop` workaround).
        skipInnerBorderAdjusting = bottom === rootHeight;
        overlayPosition = this.getOverlayOffset();
        (0, _element.setOverlayPosition)(overlayRoot, '0px', "".concat(overlayPosition, "px"));
      } else {
        overlayPosition = this.getScrollPosition();
        (0, _element.resetCssTransform)(overlayRoot);
      }
      var positionChanged = this.adjustHeaderBordersPosition(overlayPosition, skipInnerBorderAdjusting);
      this.adjustElementsSize();
      return positionChanged;
    }

    /**
     * Sets the main overlay's vertical scroll position.
     *
     * @param {number} pos The scroll position.
     * @returns {boolean}
     */
  }, {
    key: "setScrollPosition",
    value: function setScrollPosition(pos) {
      var rootWindow = this.domBindings.rootWindow;
      var result = false;
      if (this.mainTableScrollableElement === rootWindow && rootWindow.scrollY !== pos) {
        rootWindow.scrollTo((0, _element.getWindowScrollLeft)(rootWindow), pos);
        result = true;
      } else if (this.mainTableScrollableElement.scrollTop !== pos) {
        this.mainTableScrollableElement.scrollTop = pos;
        result = true;
      }
      return result;
    }

    /**
     * Triggers onScroll hook callback.
     */
  }, {
    key: "onScroll",
    value: function onScroll() {
      this.wtSettings.getSetting('onScrollHorizontally');
    }

    /**
     * Calculates total sum cells height.
     *
     * @param {number} from Row index which calculates started from.
     * @param {number} to Row index where calculation is finished.
     * @returns {number} Height sum.
     */
  }, {
    key: "sumCellSizes",
    value: function sumCellSizes(from, to) {
      var defaultRowHeight = this.wtSettings.getSetting('defaultRowHeight');
      var row = from;
      var sum = 0;
      while (row < to) {
        var height = this.wot.wtTable.getRowHeight(row);
        sum += height === void 0 ? defaultRowHeight : height;
        row += 1;
      }
      return sum;
    }

    /**
     * Adjust overlay root element, childs and master table element sizes (width, height).
     *
     * @param {boolean} [force=false] When `true`, it adjusts the DOM nodes sizes for that overlay.
     */
  }, {
    key: "adjustElementsSize",
    value: function adjustElementsSize() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.updateTrimmingContainer();
      if (this.needFullRender || force) {
        this.adjustRootElementSize();
        this.adjustRootChildrenSize();
      }
    }

    /**
     * Adjust overlay root element size (width and height).
     */
  }, {
    key: "adjustRootElementSize",
    value: function adjustRootElementSize() {
      var wtTable = this.wot.wtTable;
      var _this$domBindings = this.domBindings,
        rootDocument = _this$domBindings.rootDocument,
        rootWindow = _this$domBindings.rootWindow;
      var scrollbarWidth = (0, _element.getScrollbarWidth)(rootDocument);
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var overlayRootStyle = overlayRoot.style;
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      if (this.trimmingContainer !== rootWindow || preventOverflow === 'horizontal') {
        var width = this.wot.wtViewport.getWorkspaceWidth();
        if (this.wot.wtOverlays.hasScrollbarRight) {
          width -= scrollbarWidth;
        }
        width = Math.min(width, wtTable.wtRootElement.scrollWidth);
        overlayRootStyle.width = "".concat(width, "px");
      } else {
        overlayRootStyle.width = '';
      }
      this.clone.wtTable.holder.style.width = overlayRootStyle.width;
      var tableHeight = (0, _element.outerHeight)(this.clone.wtTable.TABLE);
      if (!this.wot.wtTable.hasDefinedSize()) {
        tableHeight = 0;
      }
      overlayRootStyle.height = "".concat(tableHeight, "px");
    }

    /**
     * Adjust overlay root childs size.
     */
  }, {
    key: "adjustRootChildrenSize",
    value: function adjustRootChildrenSize() {
      var _selections$getCell$g;
      var holder = this.clone.wtTable.holder;
      var selections = this.wot.selections;
      var facade = this.facadeGetter();
      var selectionCornerOffset = Math.abs((_selections$getCell$g = selections === null || selections === void 0 ? void 0 : selections.getCell().getBorder(facade).cornerCenterPointOffset) !== null && _selections$getCell$g !== void 0 ? _selections$getCell$g : 0);
      this.clone.wtTable.hider.style.width = this.hider.style.width;
      holder.style.width = holder.parentNode.style.width;
      // Add selection corner protruding part to the holder total height to make sure that
      // borders' corner won't be cut after vertical scroll (#6937).
      holder.style.height = "".concat(parseInt(holder.parentNode.style.height, 10) + selectionCornerOffset, "px");
    }

    /**
     * Adjust the overlay dimensions and position.
     */
  }, {
    key: "applyToDOM",
    value: function applyToDOM() {
      var total = this.wtSettings.getSetting('totalRows');
      if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
        this.spreader.style.top = "".concat(this.wot.wtViewport.rowsRenderCalculator.startPosition, "px");
      } else if (total === 0) {
        // can happen if there are 0 rows
        this.spreader.style.top = '0';
      } else {
        throw new Error('Incorrect value of the rowsRenderCalculator');
      }
      this.spreader.style.bottom = '';
      if (this.needFullRender) {
        this.syncOverlayOffset();
      }
    }

    /**
     * Synchronize calculated left position to an element.
     */
  }, {
    key: "syncOverlayOffset",
    value: function syncOverlayOffset() {
      var styleProperty = this.isRtl() ? 'right' : 'left';
      var spreader = this.clone.wtTable.spreader;
      if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
        spreader.style[styleProperty] = "".concat(this.wot.wtViewport.columnsRenderCalculator.startPosition, "px");
      } else {
        spreader.style[styleProperty] = '';
      }
    }

    /**
     * Scrolls vertically to a row.
     *
     * @param {number} sourceRow Row index which you want to scroll to.
     * @param {boolean} [bottomEdge] If `true`, scrolls according to the bottom edge (top edge is by default).
     * @returns {boolean}
     */
  }, {
    key: "scrollTo",
    value: function scrollTo(sourceRow, bottomEdge) {
      var wot = this.wot,
        wtSettings = this.wtSettings;
      var sourceInstance = wot.cloneSource ? wot.cloneSource : wot;
      var mainHolder = sourceInstance.wtTable.holder;
      var newY = this.getTableParentOffset();
      var scrollbarCompensation = 0;
      if (bottomEdge) {
        var rowHeight = this.wot.wtTable.getRowHeight(sourceRow);
        var viewportHeight = this.wot.wtViewport.getViewportHeight();
        if (rowHeight > viewportHeight) {
          bottomEdge = false;
        }
      }
      if (bottomEdge && mainHolder.offsetHeight !== mainHolder.clientHeight) {
        scrollbarCompensation = (0, _element.getScrollbarWidth)(this.domBindings.rootDocument);
      }
      if (bottomEdge) {
        var fixedRowsBottom = wtSettings.getSetting('fixedRowsBottom');
        var totalRows = wtSettings.getSetting('totalRows');
        newY += this.sumCellSizes(0, sourceRow + 1);
        newY -= wot.wtViewport.getViewportHeight() - this.sumCellSizes(totalRows - fixedRowsBottom, totalRows);
        // Fix 1 pixel offset when cell is selected
        newY += 1;
      } else {
        newY += this.sumCellSizes(wtSettings.getSetting('fixedRowsTop'), sourceRow);
      }
      newY += scrollbarCompensation;
      return this.setScrollPosition(newY);
    }

    /**
     * Gets table parent top position.
     *
     * @returns {number}
     */
  }, {
    key: "getTableParentOffset",
    value: function getTableParentOffset() {
      if (this.mainTableScrollableElement === this.domBindings.rootWindow) {
        return this.wot.wtTable.holderOffset.top;
      }
      return 0;
    }

    /**
     * Gets the main overlay's vertical scroll position.
     *
     * @returns {number} Main table's vertical scroll position.
     */
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      return (0, _element.getScrollTop)(this.mainTableScrollableElement, this.domBindings.rootWindow);
    }

    /**
     * Gets the main overlay's vertical overlay offset.
     *
     * @returns {number} Main table's vertical overlay offset.
     */
  }, {
    key: "getOverlayOffset",
    value: function getOverlayOffset() {
      var rootWindow = this.domBindings.rootWindow;
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      var overlayOffset = 0;
      if (this.trimmingContainer === rootWindow && (!preventOverflow || preventOverflow !== 'vertical')) {
        var rootHeight = this.wot.wtTable.getTotalHeight();
        var overlayRootHeight = this.clone.wtTable.getTotalHeight();
        var maxOffset = rootHeight - overlayRootHeight;
        overlayOffset = Math.max(this.getScrollPosition() - this.getTableParentOffset(), 0);
        if (overlayOffset > maxOffset) {
          overlayOffset = 0;
        }
      }
      return overlayOffset;
    }

    /**
     * Adds css classes to hide the header border's header (cell-selection border hiding issue).
     *
     * @param {number} position Header Y position if trimming container is window or scroll top if not.
     * @param {boolean} [skipInnerBorderAdjusting=false] If `true` the inner border adjusting will be skipped.
     * @returns {boolean}
     */
  }, {
    key: "adjustHeaderBordersPosition",
    value: function adjustHeaderBordersPosition(position) {
      var skipInnerBorderAdjusting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var masterParent = this.wot.wtTable.holder.parentNode;
      var totalColumns = this.wtSettings.getSetting('totalColumns');
      if (totalColumns) {
        (0, _element.removeClass)(masterParent, 'emptyColumns');
      } else {
        (0, _element.addClass)(masterParent, 'emptyColumns');
      }
      var positionChanged = false;
      if (!skipInnerBorderAdjusting) {
        var fixedRowsTop = this.wtSettings.getSetting('fixedRowsTop');
        var areFixedRowsTopChanged = this.cachedFixedRowsTop !== fixedRowsTop;
        var columnHeaders = this.wtSettings.getSetting('columnHeaders');
        if ((areFixedRowsTopChanged || fixedRowsTop === 0) && columnHeaders.length > 0) {
          var previousState = (0, _element.hasClass)(masterParent, 'innerBorderTop');
          this.cachedFixedRowsTop = this.wtSettings.getSetting('fixedRowsTop');
          if (position || this.wtSettings.getSetting('totalRows') === 0) {
            (0, _element.addClass)(masterParent, 'innerBorderTop');
            positionChanged = !previousState;
          } else {
            (0, _element.removeClass)(masterParent, 'innerBorderTop');
            positionChanged = previousState;
          }
        }
      }
      return positionChanged;
    }
  }]);
  return TopOverlay;
}(_base.Overlay);
exports.TopOverlay = TopOverlay;