function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
import { addClass, getScrollbarWidth, getScrollLeft, getWindowScrollTop, hasClass, outerWidth, removeClass, setOverlayPosition, resetCssTransform } from "../../../../helpers/dom/element.mjs";
import InlineStartOverlayTable from "../table/inlineStart.mjs";
import { Overlay } from "./_base.mjs";
import { CLONE_INLINE_START } from "./constants.mjs"; /**
                                                       * @class InlineStartOverlay
                                                       */
export var InlineStartOverlay = /*#__PURE__*/function (_Overlay) {
  _inherits(InlineStartOverlay, _Overlay);
  var _super = _createSuper(InlineStartOverlay);
  /**
   * @param {Walkontable} wotInstance The Walkontable instance. @TODO refactoring: check if can be deleted.
   * @param {FacadeGetter} facadeGetter Function which return proper facade.
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {DomBindings} domBindings Dom elements bound to the current instance.
   */
  function InlineStartOverlay(wotInstance, facadeGetter, wtSettings, domBindings) {
    _classCallCheck(this, InlineStartOverlay);
    return _super.call(this, wotInstance, facadeGetter, CLONE_INLINE_START, wtSettings, domBindings);
  }

  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {InlineStartOverlayTable}
   */
  _createClass(InlineStartOverlay, [{
    key: "createTable",
    value: function createTable() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _construct(InlineStartOverlayTable, args);
    }

    /**
     * Checks if overlay should be fully rendered.
     *
     * @returns {boolean}
     */
  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      return this.wtSettings.getSetting('shouldRenderInlineStartOverlay');
    }

    /**
     * Updates the left overlay position.
     *
     * @returns {boolean}
     */
  }, {
    key: "resetFixedPosition",
    value: function resetFixedPosition() {
      var wtTable = this.wot.wtTable;
      if (!this.needFullRender || !wtTable.holder.parentNode) {
        // removed from DOM
        return false;
      }
      var rootWindow = this.domBindings.rootWindow;
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      var overlayPosition = 0;
      if (this.trimmingContainer === rootWindow && (!preventOverflow || preventOverflow !== 'horizontal')) {
        overlayPosition = this.getOverlayOffset() * (this.isRtl() ? -1 : 1);
        setOverlayPosition(overlayRoot, "".concat(overlayPosition, "px"), '0px');
      } else {
        overlayPosition = this.getScrollPosition();
        resetCssTransform(overlayRoot);
      }
      var positionChanged = this.adjustHeaderBordersPosition(overlayPosition);
      this.adjustElementsSize();
      return positionChanged;
    }

    /**
     * Sets the main overlay's horizontal scroll position.
     *
     * @param {number} pos The scroll position.
     * @returns {boolean}
     */
  }, {
    key: "setScrollPosition",
    value: function setScrollPosition(pos) {
      var rootWindow = this.domBindings.rootWindow;
      var result = false;
      if (this.isRtl()) {
        pos = -pos;
      }
      if (this.mainTableScrollableElement === rootWindow && rootWindow.scrollX !== pos) {
        rootWindow.scrollTo(pos, getWindowScrollTop(rootWindow));
        result = true;
      } else if (this.mainTableScrollableElement.scrollLeft !== pos) {
        this.mainTableScrollableElement.scrollLeft = pos;
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
      this.wtSettings.getSetting('onScrollVertically');
    }

    /**
     * Calculates total sum cells width.
     *
     * @param {number} from Column index which calculates started from.
     * @param {number} to Column index where calculation is finished.
     * @returns {number} Width sum.
     */
  }, {
    key: "sumCellSizes",
    value: function sumCellSizes(from, to) {
      var defaultColumnWidth = this.wtSettings.getSetting('defaultColumnWidth');
      var column = from;
      var sum = 0;
      while (column < to) {
        sum += this.wot.wtTable.getStretchedColumnWidth(column) || defaultColumnWidth;
        column += 1;
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
      var scrollbarHeight = getScrollbarWidth(rootDocument);
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var overlayRootStyle = overlayRoot.style;
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      if (this.trimmingContainer !== rootWindow || preventOverflow === 'vertical') {
        var height = this.wot.wtViewport.getWorkspaceHeight();
        if (this.wot.wtOverlays.hasScrollbarBottom) {
          height -= scrollbarHeight;
        }
        height = Math.min(height, wtTable.wtRootElement.scrollHeight);
        overlayRootStyle.height = "".concat(height, "px");
      } else {
        overlayRootStyle.height = '';
      }
      this.clone.wtTable.holder.style.height = overlayRootStyle.height;
      var tableWidth = outerWidth(this.clone.wtTable.TABLE);
      overlayRootStyle.width = "".concat(tableWidth, "px");
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
      this.clone.wtTable.hider.style.height = this.hider.style.height;
      holder.style.height = holder.parentNode.style.height;
      // Add selection corner protruding part to the holder total width to make sure that
      // borders' corner won't be cut after horizontal scroll (#6937).
      holder.style.width = "".concat(parseInt(holder.parentNode.style.width, 10) + selectionCornerOffset, "px");
    }

    /**
     * Adjust the overlay dimensions and position.
     */
  }, {
    key: "applyToDOM",
    value: function applyToDOM() {
      var total = this.wtSettings.getSetting('totalColumns');
      var styleProperty = this.isRtl() ? 'right' : 'left';
      if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
        this.spreader.style[styleProperty] = "".concat(this.wot.wtViewport.columnsRenderCalculator.startPosition, "px");
      } else if (total === 0) {
        this.spreader.style[styleProperty] = '0';
      } else {
        throw new Error('Incorrect value of the columnsRenderCalculator');
      }
      if (this.isRtl()) {
        this.spreader.style.left = '';
      } else {
        this.spreader.style.right = '';
      }
      if (this.needFullRender) {
        this.syncOverlayOffset();
      }
    }

    /**
     * Synchronize calculated top position to an element.
     */
  }, {
    key: "syncOverlayOffset",
    value: function syncOverlayOffset() {
      if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
        this.clone.wtTable.spreader.style.top = "".concat(this.wot.wtViewport.rowsRenderCalculator.startPosition, "px");
      } else {
        this.clone.wtTable.spreader.style.top = '';
      }
    }

    /**
     * Scrolls horizontally to a column at the left edge of the viewport.
     *
     * @param {number} sourceCol  Column index which you want to scroll to.
     * @param {boolean} [beyondRendered]  If `true`, scrolls according to the right
     *                                    edge (left edge is by default).
     * @returns {boolean}
     */
  }, {
    key: "scrollTo",
    value: function scrollTo(sourceCol, beyondRendered) {
      var newX = this.getTableParentOffset();
      var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
      var mainHolder = sourceInstance.wtTable.holder;
      var scrollbarCompensation = 0;
      if (beyondRendered) {
        var columnWidth = this.wot.wtTable.getColumnWidth(sourceCol);
        var viewportWidth = this.wot.wtViewport.getViewportWidth();
        if (columnWidth > viewportWidth) {
          beyondRendered = false;
        }
      }
      if (beyondRendered && mainHolder.offsetWidth !== mainHolder.clientWidth) {
        scrollbarCompensation = getScrollbarWidth(this.domBindings.rootDocument);
      }
      if (beyondRendered) {
        newX += this.sumCellSizes(0, sourceCol + 1);
        newX -= this.wot.wtViewport.getViewportWidth();
      } else {
        newX += this.sumCellSizes(this.wtSettings.getSetting('fixedColumnsStart'), sourceCol);
      }
      newX += scrollbarCompensation;
      return this.setScrollPosition(newX);
    }

    /**
     * Gets table parent left position.
     *
     * @returns {number}
     */
  }, {
    key: "getTableParentOffset",
    value: function getTableParentOffset() {
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      var offset = 0;
      if (!preventOverflow && this.trimmingContainer === this.domBindings.rootWindow) {
        offset = this.wot.wtTable.holderOffset.left;
      }
      return offset;
    }

    /**
     * Gets the main overlay's horizontal scroll position.
     *
     * @returns {number} Main table's horizontal scroll position.
     */
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      return Math.abs(getScrollLeft(this.mainTableScrollableElement, this.domBindings.rootWindow));
    }

    /**
     * Gets the main overlay's horizontal overlay offset.
     *
     * @returns {number} Main table's horizontal overlay offset.
     */
  }, {
    key: "getOverlayOffset",
    value: function getOverlayOffset() {
      var rootWindow = this.domBindings.rootWindow;
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      var overlayOffset = 0;
      if (this.trimmingContainer === rootWindow && (!preventOverflow || preventOverflow !== 'horizontal')) {
        if (this.isRtl()) {
          overlayOffset = Math.abs(Math.min(this.getTableParentOffset() - this.getScrollPosition(), 0));
        } else {
          overlayOffset = Math.max(this.getScrollPosition() - this.getTableParentOffset(), 0);
        }
        var rootWidth = this.wot.wtTable.getTotalWidth();
        var overlayRootWidth = this.clone.wtTable.getTotalWidth();
        var maxOffset = rootWidth - overlayRootWidth;
        if (overlayOffset > maxOffset) {
          overlayOffset = 0;
        }
      }
      return overlayOffset;
    }

    /**
     * Adds css classes to hide the header border's header (cell-selection border hiding issue).
     *
     * @param {number} position Header X position if trimming container is window or scroll top if not.
     * @returns {boolean}
     */
  }, {
    key: "adjustHeaderBordersPosition",
    value: function adjustHeaderBordersPosition(position) {
      var masterParent = this.wot.wtTable.holder.parentNode;
      var rowHeaders = this.wtSettings.getSetting('rowHeaders');
      var fixedColumnsStart = this.wtSettings.getSetting('fixedColumnsStart');
      var totalRows = this.wtSettings.getSetting('totalRows');
      if (totalRows) {
        removeClass(masterParent, 'emptyRows');
      } else {
        addClass(masterParent, 'emptyRows');
      }
      var positionChanged = false;
      if (fixedColumnsStart && !rowHeaders.length) {
        // "innerBorderLeft" is for backward compatibility
        addClass(masterParent, 'innerBorderLeft innerBorderInlineStart');
      } else if (!fixedColumnsStart && rowHeaders.length) {
        var previousState = hasClass(masterParent, 'innerBorderInlineStart');
        if (position) {
          addClass(masterParent, 'innerBorderLeft innerBorderInlineStart');
          positionChanged = !previousState;
        } else {
          removeClass(masterParent, 'innerBorderLeft innerBorderInlineStart');
          positionChanged = previousState;
        }
      }
      return positionChanged;
    }
  }]);
  return InlineStartOverlay;
}(Overlay);