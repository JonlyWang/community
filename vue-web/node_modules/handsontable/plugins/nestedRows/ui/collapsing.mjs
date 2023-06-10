function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.splice.js";
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
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
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
import { stopImmediatePropagation } from "../../../helpers/dom/event.mjs";
import { arrayEach } from "../../../helpers/array.mjs";
import { rangeEach } from "../../../helpers/number.mjs";
import { hasClass } from "../../../helpers/dom/element.mjs";
import BaseUI from "./_base.mjs";
import HeadersUI from "./headers.mjs"; /**
                                        * Class responsible for the UI for collapsing and expanding groups.
                                        *
                                        * @private
                                        * @class
                                        * @augments BaseUI
                                        */
var CollapsingUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(CollapsingUI, _BaseUI);
  var _super = _createSuper(CollapsingUI);
  function CollapsingUI(nestedRowsPlugin, hotInstance) {
    var _this;
    _classCallCheck(this, CollapsingUI);
    _this = _super.call(this, nestedRowsPlugin, hotInstance);

    /**
     * Reference to the TrimRows plugin.
     */
    _this.dataManager = _this.plugin.dataManager;
    _this.collapsedRows = [];
    _this.collapsedRowsStash = {
      stash: function stash() {
        var forceRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        _this.lastCollapsedRows = _this.collapsedRows.slice(0);

        // Workaround for wrong indexes being set in the trimRows plugin
        _this.expandMultipleChildren(_this.lastCollapsedRows, forceRender);
      },
      shiftStash: function shiftStash(baseIndex, targetIndex) {
        var delta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        if (targetIndex === null || targetIndex === void 0) {
          targetIndex = Infinity;
        }
        arrayEach(_this.lastCollapsedRows, function (elem, i) {
          if (elem >= baseIndex && elem < targetIndex) {
            _this.lastCollapsedRows[i] = elem + delta;
          }
        });
      },
      applyStash: function applyStash() {
        var forceRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        _this.collapseMultipleChildren(_this.lastCollapsedRows, forceRender);
        _this.lastCollapsedRows = void 0;
      },
      trimStash: function trimStash(realElementIndex, amount) {
        rangeEach(realElementIndex, realElementIndex + amount - 1, function (i) {
          var indexOfElement = _this.lastCollapsedRows.indexOf(i);
          if (indexOfElement > -1) {
            _this.lastCollapsedRows.splice(indexOfElement, 1);
          }
        });
      }
    };
    return _this;
  }

  /**
   * Collapse the children of the row passed as an argument.
   *
   * @param {number|object} row The parent row.
   * @param {boolean} [forceRender=true] Whether to render the table after the function ends.
   * @param {boolean} [doTrimming=true] I determine whether collapsing should envolve trimming rows.
   * @returns {Array}
   */
  _createClass(CollapsingUI, [{
    key: "collapseChildren",
    value: function collapseChildren(row) {
      var _this2 = this;
      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var doTrimming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var rowsToCollapse = [];
      var rowObject = null;
      var rowIndex = null;
      var rowsToTrim = null;
      if (isNaN(row)) {
        rowObject = row;
        rowIndex = this.dataManager.getRowIndex(rowObject);
      } else {
        rowObject = this.dataManager.getDataObject(row);
        rowIndex = row;
      }
      if (this.dataManager.hasChildren(rowObject)) {
        arrayEach(rowObject.__children, function (elem) {
          rowsToCollapse.push(_this2.dataManager.getRowIndex(elem));
        });
      }
      rowsToTrim = this.collapseRows(rowsToCollapse, true, false);
      if (doTrimming) {
        this.trimRows(rowsToTrim);
      }
      if (forceRender) {
        this.renderAndAdjust();
      }
      if (this.collapsedRows.indexOf(rowIndex) === -1) {
        this.collapsedRows.push(rowIndex);
      }
      return rowsToTrim;
    }

    /**
     * Collapse multiple children.
     *
     * @param {Array} rows Rows to collapse (including their children).
     * @param {boolean} [forceRender=true] `true` if the table should be rendered after finishing the function.
     * @param {boolean} [doTrimming=true] I determine whether collapsing should envolve trimming rows.
     */
  }, {
    key: "collapseMultipleChildren",
    value: function collapseMultipleChildren(rows) {
      var _this3 = this;
      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var doTrimming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var rowsToTrim = [];
      arrayEach(rows, function (elem) {
        rowsToTrim.push.apply(rowsToTrim, _toConsumableArray(_this3.collapseChildren(elem, false, false)));
      });
      if (doTrimming) {
        this.trimRows(rowsToTrim);
      }
      if (forceRender) {
        this.renderAndAdjust();
      }
    }

    /**
     * Collapse a single row.
     *
     * @param {number} rowIndex Index of the row to collapse.
     * @param {boolean} [recursive=true] `true` if it should collapse the row's children.
     */
  }, {
    key: "collapseRow",
    value: function collapseRow(rowIndex) {
      var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.collapseRows([rowIndex], recursive);
    }

    /**
     * Collapse multiple rows.
     *
     * @param {Array} rowIndexes Array of row indexes to collapse.
     * @param {boolean} [recursive=true] `true` if it should collapse the rows' children.
     * @param {boolean} [doTrimming=true] I determine whether collapsing should envolve trimming rows.
     * @returns {Array} Rows prepared for trimming (or trimmed, if doTrimming == true).
     */
  }, {
    key: "collapseRows",
    value: function collapseRows(rowIndexes) {
      var _this4 = this;
      var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var doTrimming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rowsToTrim = [];
      arrayEach(rowIndexes, function (elem) {
        rowsToTrim.push(elem);
        if (recursive) {
          _this4.collapseChildRows(elem, rowsToTrim);
        }
      });
      if (doTrimming) {
        this.trimRows(rowsToTrim);
      }
      return rowsToTrim;
    }

    /**
     * Collapse child rows of the row at the provided index.
     *
     * @param {number} parentIndex Index of the parent node.
     * @param {Array} [rowsToTrim=[]] Array of rows to trim. Defaults to an empty array.
     * @param {boolean} [recursive] `true` if the collapsing process should be recursive.
     * @param {boolean} [doTrimming=true] I determine whether collapsing should envolve trimming rows.
     */
  }, {
    key: "collapseChildRows",
    value: function collapseChildRows(parentIndex) {
      var _this5 = this;
      var rowsToTrim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var recursive = arguments.length > 2 ? arguments[2] : undefined;
      var doTrimming = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (this.dataManager.hasChildren(parentIndex)) {
        var parentObject = this.dataManager.getDataObject(parentIndex);
        arrayEach(parentObject.__children, function (elem) {
          var elemIndex = _this5.dataManager.getRowIndex(elem);
          rowsToTrim.push(elemIndex);
          _this5.collapseChildRows(elemIndex, rowsToTrim);
        });
      }
      if (doTrimming) {
        this.trimRows(rowsToTrim);
      }
    }

    /**
     * Expand a single row.
     *
     * @param {number} rowIndex Index of the row to expand.
     * @param {boolean} [recursive=true] `true` if it should expand the row's children recursively.
     */
  }, {
    key: "expandRow",
    value: function expandRow(rowIndex) {
      var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.expandRows([rowIndex], recursive);
    }

    /**
     * Expand multiple rows.
     *
     * @param {Array} rowIndexes Array of indexes of the rows to expand.
     * @param {boolean} [recursive=true] `true` if it should expand the rows' children recursively.
     * @param {boolean} [doTrimming=true] I determine whether collapsing should envolve trimming rows.
     * @returns {Array} Array of row indexes to be untrimmed.
     */
  }, {
    key: "expandRows",
    value: function expandRows(rowIndexes) {
      var _this6 = this;
      var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var doTrimming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rowsToUntrim = [];
      arrayEach(rowIndexes, function (elem) {
        rowsToUntrim.push(elem);
        if (recursive) {
          _this6.expandChildRows(elem, rowsToUntrim);
        }
      });
      if (doTrimming) {
        this.untrimRows(rowsToUntrim);
      }
      return rowsToUntrim;
    }

    /**
     * Expand child rows of the provided index.
     *
     * @param {number} parentIndex Index of the parent row.
     * @param {Array} [rowsToUntrim=[]] Array of the rows to be untrimmed.
     * @param {boolean} [recursive] `true` if it should expand the rows' children recursively.
     * @param {boolean} [doTrimming=false] I determine whether collapsing should envolve trimming rows.
     */
  }, {
    key: "expandChildRows",
    value: function expandChildRows(parentIndex) {
      var _this7 = this;
      var rowsToUntrim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var recursive = arguments.length > 2 ? arguments[2] : undefined;
      var doTrimming = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (this.dataManager.hasChildren(parentIndex)) {
        var parentObject = this.dataManager.getDataObject(parentIndex);
        arrayEach(parentObject.__children, function (elem) {
          if (!_this7.isAnyParentCollapsed(elem)) {
            var elemIndex = _this7.dataManager.getRowIndex(elem);
            rowsToUntrim.push(elemIndex);
            _this7.expandChildRows(elemIndex, rowsToUntrim);
          }
        });
      }
      if (doTrimming) {
        this.untrimRows(rowsToUntrim);
      }
    }

    /**
     * Expand the children of the row passed as an argument.
     *
     * @param {number|object} row Parent row.
     * @param {boolean} [forceRender=true] Whether to render the table after the function ends.
     * @param {boolean} [doTrimming=true] If set to `true`, the trimming will be applied when the function finishes.
     * @returns {number[]}
     */
  }, {
    key: "expandChildren",
    value: function expandChildren(row) {
      var _this8 = this;
      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var doTrimming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var rowsToExpand = [];
      var rowObject = null;
      var rowIndex = null;
      var rowsToUntrim = null;
      if (isNaN(row)) {
        rowObject = row;
        rowIndex = this.dataManager.getRowIndex(row);
      } else {
        rowObject = this.dataManager.getDataObject(row);
        rowIndex = row;
      }
      this.collapsedRows.splice(this.collapsedRows.indexOf(rowIndex), 1);
      if (this.dataManager.hasChildren(rowObject)) {
        arrayEach(rowObject.__children, function (elem) {
          var childIndex = _this8.dataManager.getRowIndex(elem);
          rowsToExpand.push(childIndex);
        });
      }
      rowsToUntrim = this.expandRows(rowsToExpand, true, false);
      if (doTrimming) {
        this.untrimRows(rowsToUntrim);
      }
      if (forceRender) {
        this.renderAndAdjust();
      }
      return rowsToUntrim;
    }

    /**
     * Expand multiple rows' children.
     *
     * @param {Array} rows Array of rows which children are about to be expanded.
     * @param {boolean} [forceRender=true] `true` if the table should render after finishing the function.
     * @param {boolean} [doTrimming=true] `true` if the rows should be untrimmed after finishing the function.
     */
  }, {
    key: "expandMultipleChildren",
    value: function expandMultipleChildren(rows) {
      var _this9 = this;
      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var doTrimming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var rowsToUntrim = [];
      arrayEach(rows, function (elem) {
        rowsToUntrim.push.apply(rowsToUntrim, _toConsumableArray(_this9.expandChildren(elem, false, false)));
      });
      if (doTrimming) {
        this.untrimRows(rowsToUntrim);
      }
      if (forceRender) {
        this.renderAndAdjust();
      }
    }

    /**
     * Collapse all collapsable rows.
     */
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      var _this10 = this;
      var data = this.dataManager.getData();
      var parentsToCollapse = [];
      arrayEach(data, function (elem) {
        if (_this10.dataManager.hasChildren(elem)) {
          parentsToCollapse.push(elem);
        }
      });
      this.collapseMultipleChildren(parentsToCollapse);
      this.renderAndAdjust();
    }

    /**
     * Expand all collapsable rows.
     */
  }, {
    key: "expandAll",
    value: function expandAll() {
      var _this11 = this;
      var data = this.dataManager.getData();
      var parentsToExpand = [];
      arrayEach(data, function (elem) {
        if (_this11.dataManager.hasChildren(elem)) {
          parentsToExpand.push(elem);
        }
      });
      this.expandMultipleChildren(parentsToExpand);
      this.renderAndAdjust();
    }

    /**
     * Trim rows.
     *
     * @param {Array} rows Physical row indexes.
     */
  }, {
    key: "trimRows",
    value: function trimRows(rows) {
      var _this12 = this;
      this.hot.batchExecution(function () {
        arrayEach(rows, function (physicalRow) {
          _this12.plugin.collapsedRowsMap.setValueAtIndex(physicalRow, true);
        });
      }, true);
    }

    /**
     * Untrim rows.
     *
     * @param {Array} rows Physical row indexes.
     */
  }, {
    key: "untrimRows",
    value: function untrimRows(rows) {
      var _this13 = this;
      this.hot.batchExecution(function () {
        arrayEach(rows, function (physicalRow) {
          _this13.plugin.collapsedRowsMap.setValueAtIndex(physicalRow, false);
        });
      }, true);
    }

    /**
     * Check if all child rows are collapsed.
     *
     * @private
     * @param {number|object|null} row The parent row. `null` for the top level.
     * @returns {boolean}
     */
  }, {
    key: "areChildrenCollapsed",
    value: function areChildrenCollapsed(row) {
      var _this14 = this;
      var rowObj = isNaN(row) ? row : this.dataManager.getDataObject(row);
      var allCollapsed = true;

      // Checking the children of the top-level "parent"
      if (rowObj === null) {
        rowObj = {
          __children: this.dataManager.data
        };
      }
      if (this.dataManager.hasChildren(rowObj)) {
        arrayEach(rowObj.__children, function (elem) {
          var rowIndex = _this14.dataManager.getRowIndex(elem);
          if (!_this14.plugin.collapsedRowsMap.getValueAtIndex(rowIndex)) {
            allCollapsed = false;
            return false;
          }
        });
      }
      return allCollapsed;
    }

    /**
     * Check if any of the row object parents are collapsed.
     *
     * @private
     * @param {object} rowObj Row object.
     * @returns {boolean}
     */
  }, {
    key: "isAnyParentCollapsed",
    value: function isAnyParentCollapsed(rowObj) {
      var parent = rowObj;
      while (parent !== null) {
        parent = this.dataManager.getRowParent(parent);
        var parentIndex = this.dataManager.getRowIndex(parent);
        if (this.collapsedRows.indexOf(parentIndex) > -1) {
          return true;
        }
      }
      return false;
    }

    /**
     * Toggle collapsed state. Callback for the `beforeOnCellMousedown` hook.
     *
     * @private
     * @param {MouseEvent} event `mousedown` event.
     * @param {object} coords Coordinates of the clicked cell/header.
     */
  }, {
    key: "toggleState",
    value: function toggleState(event, coords) {
      if (coords.col >= 0) {
        return;
      }
      var row = this.translateTrimmedRow(coords.row);
      if (hasClass(event.target, HeadersUI.CSS_CLASSES.button)) {
        if (this.areChildrenCollapsed(row)) {
          this.expandChildren(row);
        } else {
          this.collapseChildren(row);
        }
        stopImmediatePropagation(event);
      }
    }

    /**
     * Translate visual row after trimming to physical base row index.
     *
     * @private
     * @param {number} row Row index.
     * @returns {number} Base row index.
     */
  }, {
    key: "translateTrimmedRow",
    value: function translateTrimmedRow(row) {
      return this.hot.toPhysicalRow(row);
    }

    /**
     * Translate physical row after trimming to visual base row index.
     *
     * @private
     * @param {number} row Row index.
     * @returns {number} Base row index.
     */
  }, {
    key: "untranslateTrimmedRow",
    value: function untranslateTrimmedRow(row) {
      return this.hot.toVisualRow(row);
    }

    /**
     * Helper function to render the table and call the `adjustElementsSize` method.
     *
     * @private
     */
  }, {
    key: "renderAndAdjust",
    value: function renderAndAdjust() {
      this.hot.render();

      // Dirty workaround to prevent scroll height not adjusting to the table height. Needs refactoring in the future.
      this.hot.view.adjustElementsSize();
    }
  }]);
  return CollapsingUI;
}(BaseUI);
export default CollapsingUI;