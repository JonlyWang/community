"use strict";

exports.__esModule = true;
exports.Overlay = void 0;
require("core-js/modules/es.array.index-of.js");
var _element = require("../../../../helpers/dom/element");
var _object = require("../../../../helpers/object");
var _array = require("../../../../helpers/array");
var _console = require("../../../../helpers/console");
var _constants = require("./constants");
var _clone = _interopRequireDefault(require("../core/clone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Creates an overlay over the original Walkontable instance. The overlay renders the clone of the original Walkontable
 * and (optionally) implements behavior needed for native horizontal and vertical scrolling.
 *
 * @abstract
 * @class Overlay
 * @property {Walkontable} wot The Walkontable instance.
 */var Overlay = /*#__PURE__*/function () {
  /**
   *  The Walkontable settings.
   *
   * @private
   * @type {Settings}
   */

  /**
   * @param {Walkontable} wotInstance The Walkontable instance. @TODO refactoring: check if can be deleted.
   * @param {FacadeGetter} facadeGetter Function which return proper facade.
   * @param {CLONE_TYPES_ENUM} type The overlay type name (clone name).
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {DomBindings} domBindings Dom elements bound to the current instance.
   */
  function Overlay(wotInstance, facadeGetter, type, wtSettings, domBindings) {
    _classCallCheck(this, Overlay);
    _defineProperty(this, "wtSettings", null);
    (0, _object.defineGetter)(this, 'wot', wotInstance, {
      writable: false
    });
    this.domBindings = domBindings;
    this.facadeGetter = facadeGetter;
    this.wtSettings = wtSettings;
    var _this$wot$wtTable = this.wot.wtTable,
      TABLE = _this$wot$wtTable.TABLE,
      hider = _this$wot$wtTable.hider,
      spreader = _this$wot$wtTable.spreader,
      holder = _this$wot$wtTable.holder,
      wtRootElement = _this$wot$wtTable.wtRootElement; // todo ioc

    // legacy support, deprecated in the future
    this.instance = this.wot;
    this.type = type;
    this.mainTableScrollableElement = null;
    this.TABLE = TABLE;
    this.hider = hider;
    this.spreader = spreader;
    this.holder = holder;
    this.wtRootElement = wtRootElement;
    this.trimmingContainer = (0, _element.getTrimmingContainer)(this.hider.parentNode.parentNode);
    this.updateStateOfRendering();
    this.clone = this.makeClone();
  }

  /**
   * Update internal state of object with an information about the need of full rendering of the overlay.
   *
   * @returns {boolean} Returns `true` if the state has changed since the last check.
   */
  _createClass(Overlay, [{
    key: "updateStateOfRendering",
    value: function updateStateOfRendering() {
      // todo refactoring: conceive introducing final state machine, normal -> changed (once) -> needs-full-render -> ...? -> normal
      var previousState = this.needFullRender;
      this.needFullRender = this.shouldBeRendered();
      var changed = previousState !== this.needFullRender;
      if (changed && !this.needFullRender) {
        this.reset();
      }
      return changed;
    }

    /**
     * Checks if overlay should be fully rendered.
     *
     * @returns {boolean}
     */
  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      return true;
    }

    /**
     * Update the trimming container.
     */
  }, {
    key: "updateTrimmingContainer",
    value: function updateTrimmingContainer() {
      this.trimmingContainer = (0, _element.getTrimmingContainer)(this.hider.parentNode.parentNode);
    }

    /**
     * Update the main scrollable element.
     */
  }, {
    key: "updateMainScrollableElement",
    value: function updateMainScrollableElement() {
      var wtTable = this.wot.wtTable;
      var rootWindow = this.domBindings.rootWindow;
      if (rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden') {
        this.mainTableScrollableElement = this.wot.wtTable.holder;
      } else {
        this.mainTableScrollableElement = (0, _element.getScrollableElement)(wtTable.TABLE);
      }
    }

    /**
     * Calculates coordinates of the provided element, relative to the root Handsontable element.
     * NOTE: The element needs to be a child of the overlay in order for the method to work correctly.
     *
     * @param {HTMLElement} element The cell element to calculate the position for.
     * @param {number} rowIndex Visual row index.
     * @param {number} columnIndex Visual column index.
     * @returns {{top: number, start: number}|undefined}
     */
  }, {
    key: "getRelativeCellPosition",
    value: function getRelativeCellPosition(element, rowIndex, columnIndex) {
      if (this.clone.wtTable.holder.contains(element) === false) {
        (0, _console.warn)("The provided element is not a child of the ".concat(this.type, " overlay"));
        return;
      }
      var windowScroll = this.mainTableScrollableElement === this.domBindings.rootWindow;
      var fixedColumnStart = columnIndex < this.wtSettings.getSetting('fixedColumnsStart');
      var fixedRowTop = rowIndex < this.wtSettings.getSetting('fixedRowsTop');
      var fixedRowBottom = rowIndex >= this.wtSettings.getSetting('totalRows') - this.wtSettings.getSetting('fixedRowsBottom');
      var spreader = this.clone.wtTable.spreader;
      var spreaderOffset = {
        start: this.getRelativeStartPosition(spreader),
        top: spreader.offsetTop
      };
      var elementOffset = {
        start: this.getRelativeStartPosition(element),
        top: element.offsetTop
      };
      var offsetObject = null;
      if (windowScroll) {
        offsetObject = this.getRelativeCellPositionWithinWindow(fixedRowTop, fixedColumnStart, elementOffset, spreaderOffset);
      } else {
        offsetObject = this.getRelativeCellPositionWithinHolder(fixedRowTop, fixedRowBottom, fixedColumnStart, elementOffset, spreaderOffset);
      }
      return offsetObject;
    }

    /**
     * Get inline start value depending of direction.
     *
     * @param {HTMLElement} el Element.
     * @returns {number}
     */
  }, {
    key: "getRelativeStartPosition",
    value: function getRelativeStartPosition(el) {
      return this.isRtl() ? el.offsetParent.offsetWidth - el.offsetLeft - el.offsetWidth : el.offsetLeft;
    }

    /**
     * Calculates coordinates of the provided element, relative to the root Handsontable element within a table with window
     * as a scrollable element.
     *
     * @private
     * @param {boolean} onFixedRowTop `true` if the coordinates point to a place within the top fixed rows.
     * @param {boolean} onFixedColumn `true` if the coordinates point to a place within the fixed columns.
     * @param {number} elementOffset Offset position of the cell element.
     * @param {number} spreaderOffset Offset position of the spreader element.
     * @returns {{top: number, left: number}}
     */
  }, {
    key: "getRelativeCellPositionWithinWindow",
    value: function getRelativeCellPositionWithinWindow(onFixedRowTop, onFixedColumn, elementOffset, spreaderOffset) {
      var absoluteRootElementPosition = this.wot.wtTable.wtRootElement.getBoundingClientRect(); // todo refactoring: DEMETER
      var horizontalOffset = 0;
      var verticalOffset = 0;
      if (!onFixedColumn) {
        horizontalOffset = spreaderOffset.start;
      } else {
        var absoluteRootElementStartPosition = absoluteRootElementPosition.left;
        if (this.isRtl()) {
          absoluteRootElementStartPosition = this.domBindings.rootWindow.innerWidth - (absoluteRootElementPosition.left + absoluteRootElementPosition.width + (0, _element.getScrollbarWidth)());
        }
        horizontalOffset = absoluteRootElementStartPosition <= 0 ? -1 * absoluteRootElementStartPosition : 0;
      }
      if (onFixedRowTop) {
        var absoluteOverlayPosition = this.clone.wtTable.TABLE.getBoundingClientRect();
        verticalOffset = absoluteOverlayPosition.top - absoluteRootElementPosition.top;
      } else {
        verticalOffset = spreaderOffset.top;
      }
      return {
        start: elementOffset.start + horizontalOffset,
        top: elementOffset.top + verticalOffset
      };
    }

    /**
     * Calculates coordinates of the provided element, relative to the root Handsontable element within a table with window
     * as a scrollable element.
     *
     * @private
     * @param {boolean} onFixedRowTop `true` if the coordinates point to a place within the top fixed rows.
     * @param {boolean} onFixedRowBottom `true` if the coordinates point to a place within the bottom fixed rows.
     * @param {boolean} onFixedColumn `true` if the coordinates point to a place within the fixed columns.
     * @param {number} elementOffset Offset position of the cell element.
     * @param {number} spreaderOffset Offset position of the spreader element.
     * @returns {{top: number, left: number}}
     */
  }, {
    key: "getRelativeCellPositionWithinHolder",
    value: function getRelativeCellPositionWithinHolder(onFixedRowTop, onFixedRowBottom, onFixedColumn, elementOffset, spreaderOffset) {
      var tableScrollPosition = {
        horizontal: this.wot.wtOverlays.inlineStartOverlay.getScrollPosition(),
        vertical: this.wot.wtOverlays.topOverlay.getScrollPosition()
      };
      var horizontalOffset = 0;
      var verticalOffset = 0;
      if (!onFixedColumn) {
        horizontalOffset = tableScrollPosition.horizontal - spreaderOffset.start;
      }
      if (onFixedRowBottom) {
        var absoluteRootElementPosition = this.wot.wtTable.wtRootElement.getBoundingClientRect(); // todo refactoring: DEMETER
        var absoluteOverlayPosition = this.clone.wtTable.TABLE.getBoundingClientRect(); // todo refactoring: DEMETER

        verticalOffset = absoluteOverlayPosition.top * -1 + absoluteRootElementPosition.top;
      } else if (!onFixedRowTop) {
        verticalOffset = tableScrollPosition.vertical - spreaderOffset.top;
      }
      return {
        start: elementOffset.start - horizontalOffset,
        top: elementOffset.top - verticalOffset
      };
    }

    /**
     * Make a clone of table for overlay.
     *
     * @returns {Clone}
     */
  }, {
    key: "makeClone",
    value: function makeClone() {
      if (_constants.CLONE_TYPES.indexOf(this.type) === -1) {
        throw new Error("Clone type \"".concat(this.type, "\" is not supported."));
      }
      var wtTable = this.wot.wtTable;
      var _this$domBindings = this.domBindings,
        rootDocument = _this$domBindings.rootDocument,
        rootWindow = _this$domBindings.rootWindow;
      var clone = rootDocument.createElement('DIV');
      var clonedTable = rootDocument.createElement('TABLE');
      var tableParent = wtTable.wtRootElement.parentNode;
      clone.className = "".concat(_constants.CLONE_CLASS_NAMES.get(this.type), " handsontable");
      clone.setAttribute('dir', this.isRtl() ? 'rtl' : 'ltr');
      clone.style.position = 'absolute';
      clone.style.top = 0;
      clone.style.overflow = 'visible';
      if (this.isRtl()) {
        clone.style.right = 0;
      } else {
        clone.style.left = 0;
      }
      clonedTable.className = wtTable.TABLE.className;
      clone.appendChild(clonedTable);
      tableParent.appendChild(clone);
      var preventOverflow = this.wtSettings.getSetting('preventOverflow');
      if (preventOverflow === true || preventOverflow === 'horizontal' && this.type === _constants.CLONE_TOP || preventOverflow === 'vertical' && this.type === _constants.CLONE_INLINE_START) {
        this.mainTableScrollableElement = rootWindow;
      } else if (rootWindow.getComputedStyle(tableParent).getPropertyValue('overflow') === 'hidden') {
        this.mainTableScrollableElement = wtTable.holder;
      } else {
        this.mainTableScrollableElement = (0, _element.getScrollableElement)(wtTable.TABLE);
      }

      // Create a new instance of the Walkontable class
      return new _clone.default(clonedTable, this.wtSettings, {
        // todo ioc factory
        source: this.wot,
        overlay: this,
        viewport: this.wot.wtViewport,
        // todo ioc , or factor func if used only here
        event: this.wot.wtEvent,
        // todo ioc , or factory func if used only here
        selections: this.wot.selections // todo ioc , or factory func if used only here
      });
    }

    /**
     * Refresh/Redraw overlay.
     *
     * @param {boolean} [fastDraw=false] When `true`, try to refresh only the positions of borders without rerendering
     *                                   the data. It will only work if Table.draw() does not force
     *                                   rendering anyway.
     */
  }, {
    key: "refresh",
    value: function refresh() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // When hot settings are changed we allow to refresh overlay once before blocking
      var nextCycleRenderFlag = this.shouldBeRendered();
      if (this.clone && (this.needFullRender || nextCycleRenderFlag)) {
        this.clone.draw(fastDraw);
      }
      this.needFullRender = nextCycleRenderFlag;
    }

    /**
     * Reset overlay styles to initial values.
     */
  }, {
    key: "reset",
    value: function reset() {
      if (!this.clone) {
        return;
      }
      var holder = this.clone.wtTable.holder; // todo refactoring: DEMETER
      var hider = this.clone.wtTable.hider; // todo refactoring: DEMETER
      var holderStyle = holder.style;
      var hiderStyle = hider.style;
      var rootStyle = holder.parentNode.style;
      (0, _array.arrayEach)([holderStyle, hiderStyle, rootStyle], function (style) {
        style.width = '';
        style.height = '';
      });
    }

    /**
     * Determine if Walkontable is running in RTL mode.
     *
     * @returns {boolean}
     */
  }, {
    key: "isRtl",
    value: function isRtl() {
      return this.wtSettings.getSetting('rtlMode');
    }

    /**
     * Destroy overlay instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.clone.eventManager.destroy(); // todo check if it is good place for that operation
    }
  }]);
  return Overlay;
}();
exports.Overlay = Overlay;