function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { addClass, hasClass } from "./../../../helpers/dom/element.mjs";
import Border from "./border.mjs"; /**
                                    * @class Selection
                                    */
var Selection = /*#__PURE__*/function () {
  /**
   * @param {object} settings The selection settings object. @todo type.
   * @param {CellRange} cellRange The cell range instance.
   */
  function Selection(settings, cellRange) {
    _classCallCheck(this, Selection);
    this.settings = settings;
    this.cellRange = cellRange || null;
    this.instanceBorders = {};
    this.classNames = [this.settings.className];
    this.classNameGenerator = this.linearClassNameGenerator(this.settings.className, this.settings.layerLevel);
  }

  /**
   * Each Walkontable clone requires it's own border for every selection. This method creates and returns selection
   * borders per instance.
   *
   * @param {WalkontableFacade} wotInstance The Walkontable instance.
   * @returns {Border}
   */
  _createClass(Selection, [{
    key: "getBorder",
    value: function getBorder(wotInstance) {
      if (!this.instanceBorders[wotInstance.guid]) {
        this.instanceBorders[wotInstance.guid] = new Border(wotInstance, this.settings);
      }
      return this.instanceBorders[wotInstance.guid];
    }

    /**
     * Checks if selection is empty.
     *
     * @returns {boolean}
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.cellRange === null;
    }

    /**
     * Adds a cell coords to the selection.
     *
     * @param {CellCoords} coords The cell coordinates to add.
     * @returns {Selection}
     */
  }, {
    key: "add",
    value: function add(coords) {
      if (this.isEmpty()) {
        this.cellRange = this.settings.createCellRange(coords);
      } else {
        this.cellRange.expand(coords);
      }
      return this;
    }

    /**
     * If selection range from or to property equals oldCoords, replace it with newCoords. Return boolean
     * information about success.
     *
     * @param {CellCoords} oldCoords An old cell coordinates to replace.
     * @param {CellCoords} newCoords The new cell coordinates.
     * @returns {boolean}
     */
  }, {
    key: "replace",
    value: function replace(oldCoords, newCoords) {
      if (!this.isEmpty()) {
        if (this.cellRange.from.isEqual(oldCoords)) {
          this.cellRange.from = newCoords;
          return true;
        }
        if (this.cellRange.to.isEqual(oldCoords)) {
          this.cellRange.to = newCoords;
          return true;
        }
      }
      return false;
    }

    /**
     * Clears selection.
     *
     * @returns {Selection}
     */
  }, {
    key: "clear",
    value: function clear() {
      this.cellRange = null;
      return this;
    }

    /**
     * Returns the top left (or top right in RTL) and bottom right (or bottom left in RTL) selection coordinates.
     *
     * @returns {Array} Returns array of coordinates for example `[1, 1, 5, 5]`.
     */
  }, {
    key: "getCorners",
    value: function getCorners() {
      var topStart = this.cellRange.getOuterTopStartCorner();
      var bottomEnd = this.cellRange.getOuterBottomEndCorner();
      return [topStart.row, topStart.col, bottomEnd.row, bottomEnd.col];
    }

    /**
     * Adds class name to cell element at given coords.
     *
     * @param {WalkontableFacade} wotInstance Walkontable instance.
     * @param {number} sourceRow Cell row coord.
     * @param {number} sourceColumn Cell column coord.
     * @param {string} className Class name.
     * @param {boolean} [markIntersections=false] If `true`, linear className generator will be used to add CSS classes
     *                                            in a continuous way.
     * @returns {Selection}
     */
  }, {
    key: "addClassAtCoords",
    value: function addClassAtCoords(wotInstance, sourceRow, sourceColumn, className) {
      var markIntersections = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var TD = wotInstance.wtTable.getCell(this.settings.createCellCoords(sourceRow, sourceColumn));
      if (_typeof(TD) === 'object') {
        var cellClassName = className;
        if (markIntersections) {
          cellClassName = this.classNameGenerator(TD);
          if (!this.classNames.includes(cellClassName)) {
            this.classNames.push(cellClassName);
          }
        }
        addClass(TD, cellClassName);
      }
      return this;
    }

    /**
     * Generate helper for calculating classNames based on previously added base className.
     * The generated className is always generated as a continuation of the previous className. For example, when
     * the currently checked element has 'area-2' className the generated new className will be 'area-3'. When
     * the element doesn't have any classNames than the base className will be returned ('area');.
     *
     * @param {string} baseClassName Base className to be used.
     * @param {number} layerLevelOwner Layer level which the instance of the Selection belongs to.
     * @returns {Function}
     */
  }, {
    key: "linearClassNameGenerator",
    value: function linearClassNameGenerator(baseClassName, layerLevelOwner) {
      // TODO: Make this recursive function Proper Tail Calls (TCO/PTC) friendly.
      return function calcClassName(element) {
        var previousIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        if (layerLevelOwner === 0 || previousIndex === 0) {
          return baseClassName;
        }
        var index = previousIndex >= 0 ? previousIndex : layerLevelOwner;
        var className = baseClassName;
        index -= 1;
        var previousClassName = index === 0 ? baseClassName : "".concat(baseClassName, "-").concat(index);
        if (hasClass(element, previousClassName)) {
          var currentLayer = index + 1;
          className = "".concat(baseClassName, "-").concat(currentLayer);
        } else {
          className = calcClassName(element, index);
        }
        return className;
      };
    }

    /**
     * @param {WalkontableFacade} wotInstance The Walkontable instance.
     */
  }, {
    key: "draw",
    value: function draw(wotInstance) {
      if (this.isEmpty()) {
        if (this.settings.border) {
          this.getBorder(wotInstance).disappear();
        }
        return;
      }
      var renderedRows = wotInstance.wtTable.getRenderedRowsCount();
      var renderedColumns = wotInstance.wtTable.getRenderedColumnsCount();
      var corners = this.getCorners();
      var _corners = _slicedToArray(corners, 4),
        topRow = _corners[0],
        topColumn = _corners[1],
        bottomRow = _corners[2],
        bottomColumn = _corners[3];
      var _this$settings = this.settings,
        highlightHeaderClassName = _this$settings.highlightHeaderClassName,
        highlightColumnClassName = _this$settings.highlightColumnClassName,
        highlightRowClassName = _this$settings.highlightRowClassName,
        highlightOnlyClosestHeader = _this$settings.highlightOnlyClosestHeader,
        selectionType = _this$settings.selectionType;
      var isHeaderSelectionType = selectionType === void 0 || ['active-header', 'header'].includes(selectionType);
      if (isHeaderSelectionType && topColumn !== null && bottomColumn !== null) {
        var selectionColumnCursor = 0;
        for (var column = 0; column < renderedColumns; column += 1) {
          var sourceCol = wotInstance.wtTable.columnFilter.renderedToSource(column);
          if (sourceCol >= topColumn && sourceCol <= bottomColumn) {
            var THs = wotInstance.wtTable.getColumnHeaders(sourceCol);
            var closestHeaderLevel = THs.length - 1;
            if (highlightOnlyClosestHeader && THs.length > 1) {
              THs = [THs[closestHeaderLevel]];
            }
            for (var headerLevel = 0; headerLevel < THs.length; headerLevel += 1) {
              var newClasses = [];
              var TH = THs[headerLevel];
              if (highlightHeaderClassName) {
                newClasses.push(highlightHeaderClassName);
              }
              if (highlightColumnClassName) {
                newClasses.push(highlightColumnClassName);
              }
              headerLevel = highlightOnlyClosestHeader ? closestHeaderLevel : headerLevel;
              var newSourceCol = wotInstance.getSetting('onBeforeHighlightingColumnHeader', sourceCol, headerLevel, {
                selectionType: selectionType,
                columnCursor: selectionColumnCursor,
                selectionWidth: bottomColumn - topColumn + 1,
                classNames: newClasses
              });
              if (newSourceCol !== sourceCol) {
                TH = wotInstance.wtTable.getColumnHeader(newSourceCol, headerLevel);
              }
              addClass(TH, newClasses);
            }
            selectionColumnCursor += 1;
          }
        }
      }
      if (topRow !== null && bottomRow !== null) {
        var selectionRowCursor = 0;
        for (var row = 0; row < renderedRows; row += 1) {
          var sourceRow = wotInstance.wtTable.rowFilter.renderedToSource(row);
          if (isHeaderSelectionType && sourceRow >= topRow && sourceRow <= bottomRow) {
            var _THs = wotInstance.wtTable.getRowHeaders(sourceRow);
            var _closestHeaderLevel = _THs.length - 1;
            if (highlightOnlyClosestHeader && _THs.length > 1) {
              _THs = [_THs[_closestHeaderLevel]];
            }
            for (var _headerLevel = 0; _headerLevel < _THs.length; _headerLevel += 1) {
              var _newClasses = [];
              var _TH = _THs[_headerLevel];
              if (highlightHeaderClassName) {
                _newClasses.push(highlightHeaderClassName);
              }
              if (highlightRowClassName) {
                _newClasses.push(highlightRowClassName);
              }
              _headerLevel = highlightOnlyClosestHeader ? _closestHeaderLevel : _headerLevel;
              var newSourceRow = wotInstance.getSetting('onBeforeHighlightingRowHeader', sourceRow, _headerLevel, {
                selectionType: selectionType,
                rowCursor: selectionRowCursor,
                selectionHeight: bottomRow - topRow + 1,
                classNames: _newClasses
              });
              if (newSourceRow !== sourceRow) {
                _TH = wotInstance.wtTable.getRowHeader(newSourceRow, _headerLevel);
              }
              addClass(_TH, _newClasses);
            }
            selectionRowCursor += 1;
          }
          if (topColumn !== null && bottomColumn !== null) {
            for (var _column = 0; _column < renderedColumns; _column += 1) {
              var _sourceCol = wotInstance.wtTable.columnFilter.renderedToSource(_column);
              if (sourceRow >= topRow && sourceRow <= bottomRow && _sourceCol >= topColumn && _sourceCol <= bottomColumn) {
                // selected cell
                if (this.settings.className) {
                  this.addClassAtCoords(wotInstance, sourceRow, _sourceCol, this.settings.className, this.settings.markIntersections);
                }
              } else if (sourceRow >= topRow && sourceRow <= bottomRow) {
                // selection is in this row
                if (highlightRowClassName) {
                  this.addClassAtCoords(wotInstance, sourceRow, _sourceCol, highlightRowClassName);
                }
              } else if (_sourceCol >= topColumn && _sourceCol <= bottomColumn) {
                // selection is in this column
                if (highlightColumnClassName) {
                  this.addClassAtCoords(wotInstance, sourceRow, _sourceCol, highlightColumnClassName);
                }
              }
              var additionalSelectionClass = wotInstance.getSetting('onAfterDrawSelection', sourceRow, _sourceCol, this.settings.layerLevel);
              if (typeof additionalSelectionClass === 'string') {
                this.addClassAtCoords(wotInstance, sourceRow, _sourceCol, additionalSelectionClass);
              }
            }
          }
        }
      }
      wotInstance.getSetting('onBeforeDrawBorders', corners, this.settings.className);
      if (this.settings.border) {
        // warning! border.appear modifies corners!
        this.getBorder(wotInstance).appear(corners);
      }
    }

    /**
     * Cleans up all the DOM state related to a Selection instance. Call this prior to deleting a Selection instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      Object.values(this.instanceBorders).forEach(function (border) {
        return border.destroy();
      });
    }
  }]);
  return Selection;
}();
export default Selection;