function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { Selection } from "./../../3rdparty/walkontable/src/index.mjs";
var VisualSelection = /*#__PURE__*/function (_Selection) {
  _inherits(VisualSelection, _Selection);
  var _super = _createSuper(VisualSelection);
  /**
   * Range of selection visually. Visual representation may have representation in a rendered selection.
   *
   * @type {null|CellRange}
   */

  function VisualSelection(settings, visualCellRange) {
    var _this;
    _classCallCheck(this, VisualSelection);
    _this = _super.call(this, settings, null);
    _defineProperty(_assertThisInitialized(_this), "visualCellRange", null);
    _this.visualCellRange = visualCellRange || null;
    _this.commit();
    return _this;
  }
  /**
   * Adds a cell coords to the selection.
   *
   * @param {CellCoords} coords Visual coordinates of a cell.
   * @returns {VisualSelection}
   */
  _createClass(VisualSelection, [{
    key: "add",
    value: function add(coords) {
      if (this.visualCellRange === null) {
        this.visualCellRange = this.settings.createCellRange(coords);
      } else {
        this.visualCellRange.expand(coords);
      }
      return this;
    }

    /**
     * Clears visual and renderable selection.
     *
     * @returns {VisualSelection}
     */
  }, {
    key: "clear",
    value: function clear() {
      this.visualCellRange = null;
      return _get(_getPrototypeOf(VisualSelection.prototype), "clear", this).call(this);
    }

    /**
     * Trims the passed cell range object by removing all coordinates that points to the hidden rows
     * or columns. The result is a new cell range object that points only to the visible indexes or `null`.
     *
     * @private
     * @param {CellRange} cellRange Cells range object to be trimmed.
     * @returns {CellRange} Visual non-hidden cells range coordinates.
     */
  }, {
    key: "trimToVisibleCellsRangeOnly",
    value: function trimToVisibleCellsRangeOnly(_ref) {
      var from = _ref.from,
        to = _ref.to;
      var visibleFromCoords = this.getNearestNotHiddenCoords(from, 1);
      var visibleToCoords = this.getNearestNotHiddenCoords(to, -1);
      if (visibleFromCoords === null || visibleToCoords === null) {
        return null;
      }
      if (visibleFromCoords.row > visibleToCoords.row || visibleFromCoords.col > visibleToCoords.col) {
        var isHeaderTypeSelection = this.settings.type === 'header' || this.settings.type === 'active-header';
        if (!isHeaderTypeSelection) {
          return null;
        }
        visibleFromCoords = from;
        visibleToCoords = to;
      }
      return this.settings.createCellRange(visibleFromCoords, visibleFromCoords, visibleToCoords);
    }

    /**
     * Gets nearest coordinates that points to the visible row and column indexes. If there are no visible
     * rows and/or columns the `null` value is returned.
     *
     * @private
     * @param {CellCoords} coords The coords object as starting point for finding the nearest visible coordinates.
     * @param {1|-1} rowSearchDirection The search direction. For value 1, it means searching from top to bottom for
     *                                  rows and from left to right for columns. For -1, it is the other way around.
     * @param {1|-1} columnSearchDirection The same as above but for rows.
     * @returns {CellCoords|null} Visual cell coordinates.
     */
  }, {
    key: "getNearestNotHiddenCoords",
    value: function getNearestNotHiddenCoords(coords, rowSearchDirection) {
      var columnSearchDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : rowSearchDirection;
      var nextVisibleRow = this.getNearestNotHiddenIndex(this.settings.rowIndexMapper(), coords.row, rowSearchDirection);

      // There are no more visual rows in the range.
      if (nextVisibleRow === null) {
        return null;
      }
      var nextVisibleColumn = this.getNearestNotHiddenIndex(this.settings.columnIndexMapper(), coords.col, columnSearchDirection);

      // There are no more visual columns in the range.
      if (nextVisibleColumn === null) {
        return null;
      }
      return this.settings.createCellCoords(nextVisibleRow, nextVisibleColumn);
    }

    /**
     * Gets nearest visual index. If there are no visible rows or columns the `null` value is returned.
     *
     * @private
     * @param {IndexMapper} indexMapper The IndexMapper instance for specific axis.
     * @param {number} visualIndex The index as starting point for finding the nearest visible index.
     * @param {1|-1} searchDirection The search direction. For value 1, it means searching from top to bottom for
     *                               rows and from left to right for columns. For -1, it is the other way around.
     * @returns {number|null} Visual row/column index.
     */
  }, {
    key: "getNearestNotHiddenIndex",
    value: function getNearestNotHiddenIndex(indexMapper, visualIndex, searchDirection) {
      if (visualIndex < 0) {
        return visualIndex;
      }
      var nearestVisualIndex = indexMapper.getNearestNotHiddenIndex(visualIndex, searchDirection);
      var isHeaderSelectionType = this.settings.type === 'header' || this.settings.type === 'active-header';
      if (isHeaderSelectionType && nearestVisualIndex === null) {
        return -1;
      }
      return nearestVisualIndex;
    }

    /**
     * Override internally stored visual indexes added by the Selection's `add` function. It should be executed
     * at the end of process of adding visual selection coordinates.
     *
     * @returns {VisualSelection}
     */
  }, {
    key: "commit",
    value: function commit() {
      // There is no information about visual ranges, thus no selection may be displayed.
      if (this.visualCellRange === null) {
        return this;
      }
      var trimmedCellRange = this.trimToVisibleCellsRangeOnly(this.visualCellRange);

      // There is no visual start point (and also visual end point) in the range.
      if (trimmedCellRange === null) {
        this.cellRange = null;
      } else {
        this.cellRange = this.createRenderableCellRange(trimmedCellRange.from, trimmedCellRange.to);
      }
      return this;
    }

    /**
     * Some selection may be a part of broader cell range. This function sync coordinates of current selection
     * and the broader cell range when needed (current selection can't be presented visually).
     *
     * @param {CellRange} broaderCellRange Visual range. Actual cell range may be contained in the broader cell range.
     * When there is no way to represent some cell range visually we try to find range containing just the first visible cell.
     *
     * Warn: Please keep in mind that this function may change coordinates of the handled broader range.
     *
     * @returns {VisualSelection}
     */
  }, {
    key: "syncWith",
    value: function syncWith(broaderCellRange) {
      var rowDirection = broaderCellRange.getVerticalDirection() === 'N-S' ? 1 : -1;
      var columnDirection = broaderCellRange.getHorizontalDirection() === 'W-E' ? 1 : -1;
      var singleCellRangeVisual = this.getNearestNotHiddenCoords(broaderCellRange.from.clone().normalize(), rowDirection, columnDirection);
      if (singleCellRangeVisual !== null && broaderCellRange.overlaps(singleCellRangeVisual)) {
        // We can't show selection visually now, but we found fist visible range in the broader cell range.
        if (this.cellRange === null) {
          var singleCellRangeRenderable = this.settings.visualToRenderableCoords(singleCellRangeVisual);
          this.cellRange = this.settings.createCellRange(singleCellRangeRenderable);
        }

        // We set new highlight as it might change (for example, when showing/hiding some cells from the broader selection range)
        // TODO: It is also handled by the `MergeCells` plugin while adjusting already modified coordinates. Should it?
        broaderCellRange.setHighlight(singleCellRangeVisual);
        return this;
      }

      // Fallback to the start of the range. It resets the previous highlight (for example, when all columns have been hidden).
      broaderCellRange.setHighlight(broaderCellRange.from);
      return this;
    }

    /**
     * Returns the top left (TL) and bottom right (BR) selection coordinates (renderable indexes).
     * The method overwrites the original method to support header selection for hidden cells.
     * To make the header selection working, the CellCoords and CellRange have to support not
     * complete coordinates (`null` values for example, `row: null`, `col: 2`).
     *
     * @returns {Array} Returns array of coordinates for example `[1, 1, 5, 5]`.
     */
  }, {
    key: "getCorners",
    value: function getCorners() {
      var _this$cellRange = this.cellRange,
        from = _this$cellRange.from,
        to = _this$cellRange.to;
      var isRowUndefined = from.row === null || to.row === null;
      var isColumnUndefined = from.col === null || to.col === null;
      var topLeftCorner = this.settings.createCellCoords(isRowUndefined ? null : Math.min(from.row, to.row), isColumnUndefined ? null : Math.min(from.col, to.col));
      var bottomRightCorner = this.settings.createCellCoords(isRowUndefined ? null : Math.max(from.row, to.row), isColumnUndefined ? null : Math.max(from.col, to.col));
      return [topLeftCorner.row, topLeftCorner.col, bottomRightCorner.row, bottomRightCorner.col];
    }

    /**
     * Returns the top left (or top right in RTL) and bottom right (or bottom left in RTL) selection
     * coordinates (visual indexes).
     *
     * @returns {Array} Returns array of coordinates for example `[1, 1, 5, 5]`.
     */
  }, {
    key: "getVisualCorners",
    value: function getVisualCorners() {
      var topStart = this.settings.renderableToVisualCoords(this.cellRange.getTopStartCorner());
      var bottomEnd = this.settings.renderableToVisualCoords(this.cellRange.getBottomEndCorner());
      return [topStart.row, topStart.col, bottomEnd.row, bottomEnd.col];
    }

    /**
     * Creates a new CellRange object based on visual coordinates which before object creation are
     * translated to renderable indexes.
     *
     * @param {CellCoords} visualFromCoords The CellCoords object which contains coordinates that
     *                                      points to the beginning of the selection.
     * @param {CellCoords} visualToCoords The CellCoords object which contains coordinates that
     *                                    points to the end of the selection.
     * @returns {CellRange}
     */
  }, {
    key: "createRenderableCellRange",
    value: function createRenderableCellRange(visualFromCoords, visualToCoords) {
      var renderableFromCoords = this.settings.visualToRenderableCoords(visualFromCoords);
      var renderableToCoords = this.settings.visualToRenderableCoords(visualToCoords);
      return this.settings.createCellRange(renderableFromCoords, renderableFromCoords, renderableToCoords);
    }
  }]);
  return VisualSelection;
}(Selection);
export default VisualSelection;