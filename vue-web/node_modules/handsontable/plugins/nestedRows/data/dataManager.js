"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
var _number = require("../../../helpers/number");
var _object = require("../../../helpers/object");
var _array = require("../../../helpers/array");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Class responsible for making data operations.
 *
 * @private
 */var DataManager = /*#__PURE__*/function () {
  function DataManager(nestedRowsPlugin, hotInstance) {
    _classCallCheck(this, DataManager);
    /**
     * Main Handsontable instance reference.
     *
     * @type {object}
     */
    this.hot = hotInstance;
    /**
     * Reference to the source data object.
     *
     * @type {Handsontable.CellValue[][]|Handsontable.RowObject[]}
     */
    this.data = null;
    /**
     * Reference to the NestedRows plugin.
     *
     * @type {object}
     */
    this.plugin = nestedRowsPlugin;
    /**
     * Map of row object parents.
     *
     * @type {WeakMap}
     */
    this.parentReference = new WeakMap();
    /**
     * Nested structure cache.
     *
     * @type {object}
     */
    this.cache = {
      levels: [],
      levelCount: 0,
      rows: [],
      nodeInfo: new WeakMap()
    };
  }

  /**
   * Set the data for the manager.
   *
   * @param {Handsontable.CellValue[][]|Handsontable.RowObject[]} data Data for the manager.
   */
  _createClass(DataManager, [{
    key: "setData",
    value: function setData(data) {
      this.data = data;
    }

    /**
     * Get the data cached in the manager.
     *
     * @returns {Handsontable.CellValue[][]|Handsontable.RowObject[]}
     */
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }

    /**
     * Load the "raw" source data, without NestedRows' modifications.
     *
     * @returns {Handsontable.CellValue[][]|Handsontable.RowObject[]}
     */
  }, {
    key: "getRawSourceData",
    value: function getRawSourceData() {
      var rawSourceData = null;
      this.plugin.disableCoreAPIModifiers();
      rawSourceData = this.hot.getSourceData();
      this.plugin.enableCoreAPIModifiers();
      return rawSourceData;
    }

    /**
     * Update the Data Manager with new data and refresh cache.
     *
     * @param {Handsontable.CellValue[][]|Handsontable.RowObject[]} data Data for the manager.
     */
  }, {
    key: "updateWithData",
    value: function updateWithData(data) {
      this.setData(data);
      this.rewriteCache();
    }

    /**
     * Rewrite the nested structure cache.
     *
     * @private
     */
  }, {
    key: "rewriteCache",
    value: function rewriteCache() {
      var _this = this;
      this.cache = {
        levels: [],
        levelCount: 0,
        rows: [],
        nodeInfo: new WeakMap()
      };
      (0, _number.rangeEach)(0, this.data.length - 1, function (i) {
        _this.cacheNode(_this.data[i], 0, null);
      });
    }

    /**
     * Cache a data node.
     *
     * @private
     * @param {object} node Node to cache.
     * @param {number} level Level of the node.
     * @param {object} parent Parent of the node.
     */
  }, {
    key: "cacheNode",
    value: function cacheNode(node, level, parent) {
      var _this2 = this;
      if (!this.cache.levels[level]) {
        this.cache.levels[level] = [];
        this.cache.levelCount += 1;
      }
      this.cache.levels[level].push(node);
      this.cache.rows.push(node);
      this.cache.nodeInfo.set(node, {
        parent: parent,
        row: this.cache.rows.length - 1,
        level: level
      });
      if (this.hasChildren(node)) {
        (0, _array.arrayEach)(node.__children, function (elem) {
          _this2.cacheNode(elem, level + 1, node);
        });
      }
    }

    /**
     * Get the date for the provided visual row number.
     *
     * @param {number} row Row index.
     * @returns {object}
     */
  }, {
    key: "getDataObject",
    value: function getDataObject(row) {
      return row === null || row === void 0 ? null : this.cache.rows[row];
    }

    /**
     * Read the row tree in search for a specific row index or row object.
     *
     * @private
     * @param {object} parent The initial parent object.
     * @param {number} readCount Number of read nodes.
     * @param {number} neededIndex The row index we search for.
     * @param {object} neededObject The row object we search for.
     * @returns {number|object}
     */
  }, {
    key: "readTreeNodes",
    value: function readTreeNodes(parent, readCount, neededIndex, neededObject) {
      var _this3 = this;
      var rootLevel = false;
      var readNodesCount = readCount;
      if (isNaN(readNodesCount) && readNodesCount.end) {
        return readNodesCount;
      }
      var parentObj = parent;
      if (!parentObj) {
        parentObj = {
          __children: this.data
        };
        rootLevel = true;
        readNodesCount -= 1;
      }
      if (neededIndex !== null && neededIndex !== void 0 && readNodesCount === neededIndex) {
        return {
          result: parentObj,
          end: true
        };
      }
      if (neededObject !== null && neededObject !== void 0 && parentObj === neededObject) {
        return {
          result: readNodesCount,
          end: true
        };
      }
      readNodesCount += 1;
      if (parentObj.__children) {
        (0, _array.arrayEach)(parentObj.__children, function (val) {
          _this3.parentReference.set(val, rootLevel ? null : parentObj);
          readNodesCount = _this3.readTreeNodes(val, readNodesCount, neededIndex, neededObject);
          if (isNaN(readNodesCount) && readNodesCount.end) {
            return false;
          }
        });
      }
      return readNodesCount;
    }

    /**
     * Mock a parent node.
     *
     * @private
     * @returns {*}
     */
  }, {
    key: "mockParent",
    value: function mockParent() {
      var fakeParent = this.mockNode();
      fakeParent.__children = this.data;
      return fakeParent;
    }

    /**
     * Mock a data node.
     *
     * @private
     * @returns {{}}
     */
  }, {
    key: "mockNode",
    value: function mockNode() {
      var fakeNode = {};
      (0, _object.objectEach)(this.data[0], function (val, key) {
        fakeNode[key] = null;
      });
      return fakeNode;
    }

    /**
     * Get the row index for the provided row object.
     *
     * @param {object} rowObj The row object.
     * @returns {number} Row index.
     */
  }, {
    key: "getRowIndex",
    value: function getRowIndex(rowObj) {
      return rowObj === null || rowObj === void 0 ? null : this.cache.nodeInfo.get(rowObj).row;
    }

    /**
     * Get the index of the provided row index/row object within its parent.
     *
     * @param {number|object} row Row index / row object.
     * @returns {number}
     */
  }, {
    key: "getRowIndexWithinParent",
    value: function getRowIndexWithinParent(row) {
      var rowObj = null;
      if (isNaN(row)) {
        rowObj = row;
      } else {
        rowObj = this.getDataObject(row);
      }
      var parent = this.getRowParent(row);
      if (parent === null || parent === void 0) {
        return this.data.indexOf(rowObj);
      }
      return parent.__children.indexOf(rowObj);
    }

    /**
     * Count all rows (including all parents and children).
     *
     * @returns {number}
     */
  }, {
    key: "countAllRows",
    value: function countAllRows() {
      var rootNodeMock = {
        __children: this.data
      };
      return this.countChildren(rootNodeMock);
    }

    /**
     * Count children of the provided parent.
     *
     * @param {object|number} parent Parent node.
     * @returns {number} Children count.
     */
  }, {
    key: "countChildren",
    value: function countChildren(parent) {
      var _this4 = this;
      var rowCount = 0;
      var parentNode = parent;
      if (!isNaN(parentNode)) {
        parentNode = this.getDataObject(parentNode);
      }
      if (!parentNode || !parentNode.__children) {
        return 0;
      }
      (0, _array.arrayEach)(parentNode.__children, function (elem) {
        rowCount += 1;
        if (elem.__children) {
          rowCount += _this4.countChildren(elem);
        }
      });
      return rowCount;
    }

    /**
     * Get the parent of the row at the provided index.
     *
     * @param {number|object} row Physical row index.
     * @returns {object}
     */
  }, {
    key: "getRowParent",
    value: function getRowParent(row) {
      var rowObject;
      if (isNaN(row)) {
        rowObject = row;
      } else {
        rowObject = this.getDataObject(row);
      }
      return this.getRowObjectParent(rowObject);
    }

    /**
     * Get the parent of the provided row object.
     *
     * @private
     * @param {object} rowObject The row object (tree node).
     * @returns {object|null}
     */
  }, {
    key: "getRowObjectParent",
    value: function getRowObjectParent(rowObject) {
      if (!rowObject || _typeof(rowObject) !== 'object') {
        return null;
      }
      return this.cache.nodeInfo.get(rowObject).parent;
    }

    /**
     * Get the nesting level for the row with the provided row index.
     *
     * @param {number} row Row index.
     * @returns {number|null} Row level or null, when row doesn't exist.
     */
  }, {
    key: "getRowLevel",
    value: function getRowLevel(row) {
      var rowObject = null;
      if (isNaN(row)) {
        rowObject = row;
      } else {
        rowObject = this.getDataObject(row);
      }
      return rowObject ? this.getRowObjectLevel(rowObject) : null;
    }

    /**
     * Get the nesting level for the row with the provided row index.
     *
     * @private
     * @param {object} rowObject Row object.
     * @returns {number} Row level.
     */
  }, {
    key: "getRowObjectLevel",
    value: function getRowObjectLevel(rowObject) {
      return rowObject === null || rowObject === void 0 ? null : this.cache.nodeInfo.get(rowObject).level;
    }

    /**
     * Check if the provided row/row element has children.
     *
     * @param {number|object} row Row number or row element.
     * @returns {boolean}
     */
  }, {
    key: "hasChildren",
    value: function hasChildren(row) {
      var rowObj = row;
      if (!isNaN(rowObj)) {
        rowObj = this.getDataObject(rowObj);
      }
      return !!(rowObj.__children && rowObj.__children.length);
    }

    /**
     * Returns `true` if the row at the provided index has a parent.
     *
     * @param {number} index Row index.
     * @returns {boolean} `true` if the row at the provided index has a parent, `false` otherwise.
     */
  }, {
    key: "isChild",
    value: function isChild(index) {
      return this.getRowParent(index) !== null;
    }

    /**
     * Get child at a provided index from the parent element.
     *
     * @param {object} parent The parent row object.
     * @param {number} index Index of the child element to be retrieved.
     * @returns {object|null} The child element or `null` if the child doesn't exist.
     */
  }, {
    key: "getChild",
    value: function getChild(parent, index) {
      var _parent$__children;
      return ((_parent$__children = parent.__children) === null || _parent$__children === void 0 ? void 0 : _parent$__children[index]) || null;
    }

    /**
     * Return `true` of the row at the provided index is located at the topmost level.
     *
     * @param {number} index Row index.
     * @returns {boolean} `true` of the row at the provided index is located at the topmost level, `false` otherwise.
     */
  }, {
    key: "isRowHighestLevel",
    value: function isRowHighestLevel(index) {
      return !this.isChild(index);
    }

    /**
     * Return `true` if the provided row index / row object represents a parent in the nested structure.
     *
     * @param {number|object} row Row index / row object.
     * @returns {boolean} `true` if the row is a parent, `false` otherwise.
     */
  }, {
    key: "isParent",
    value: function isParent(row) {
      var _rowObj$__children;
      var rowObj = row;
      if (!isNaN(rowObj)) {
        rowObj = this.getDataObject(rowObj);
      }
      return rowObj && !!rowObj.__children && ((_rowObj$__children = rowObj.__children) === null || _rowObj$__children === void 0 ? void 0 : _rowObj$__children.length) !== 0;
    }

    /**
     * Add a child to the provided parent. It's optional to add a row object as the "element".
     *
     * @param {object} parent The parent row object.
     * @param {object} [element] The element to add as a child.
     */
  }, {
    key: "addChild",
    value: function addChild(parent, element) {
      var childElement = element;
      this.hot.runHooks('beforeAddChild', parent, childElement);
      var parentIndex = null;
      if (parent) {
        parentIndex = this.getRowIndex(parent);
      }
      this.hot.runHooks('beforeCreateRow', parentIndex + this.countChildren(parent) + 1, 1);
      var functionalParent = parent;
      if (!parent) {
        functionalParent = this.mockParent();
      }
      if (!functionalParent.__children) {
        functionalParent.__children = [];
      }
      if (!childElement) {
        childElement = this.mockNode();
      }
      functionalParent.__children.push(childElement);
      this.rewriteCache();
      var newRowIndex = this.getRowIndex(childElement);
      this.hot.rowIndexMapper.insertIndexes(newRowIndex, 1);
      this.hot.runHooks('afterCreateRow', newRowIndex, 1);
      this.hot.runHooks('afterAddChild', parent, childElement);
    }

    /**
     * Add a child node to the provided parent at a specified index.
     *
     * @param {object} parent Parent node.
     * @param {number} index Index to insert the child element at.
     * @param {object} [element] Element (node) to insert.
     */
  }, {
    key: "addChildAtIndex",
    value: function addChildAtIndex(parent, index, element) {
      var childElement = element;
      var flattenedIndex;
      if (!childElement) {
        childElement = this.mockNode();
      }
      this.hot.runHooks('beforeAddChild', parent, childElement, index);
      if (parent) {
        var parentIndex = this.getRowIndex(parent);
        var finalChildIndex = parentIndex + index + 1;
        this.hot.runHooks('beforeCreateRow', finalChildIndex, 1);
        parent.__children.splice(index, null, childElement);
        this.rewriteCache();
        this.plugin.disableCoreAPIModifiers();
        this.hot.setSourceDataAtCell(this.getRowIndexWithinParent(parent), '__children', parent.__children, 'NestedRows.addChildAtIndex');
        this.hot.rowIndexMapper.insertIndexes(finalChildIndex, 1);
        this.plugin.enableCoreAPIModifiers();
        this.hot.runHooks('afterCreateRow', finalChildIndex, 1);
        flattenedIndex = finalChildIndex;
      } else {
        this.plugin.disableCoreAPIModifiers();
        this.hot.alter('insert_row_above', index, 1, 'NestedRows.addChildAtIndex');
        this.plugin.enableCoreAPIModifiers();
        flattenedIndex = this.getRowIndex(this.data[index]);
      }

      // Workaround for refreshing cache losing the reference to the mocked row.
      childElement = this.getDataObject(flattenedIndex);
      this.hot.runHooks('afterAddChild', parent, childElement, index);
    }

    /**
     * Add a sibling element at the specified index.
     *
     * @param {number} index New element sibling's index.
     * @param {('above'|'below')} where Direction in which the sibling is to be created.
     */
  }, {
    key: "addSibling",
    value: function addSibling(index) {
      var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'below';
      var translatedIndex = this.translateTrimmedRow(index);
      var parent = this.getRowParent(translatedIndex);
      var indexWithinParent = this.getRowIndexWithinParent(translatedIndex);
      switch (where) {
        case 'below':
          this.addChildAtIndex(parent, indexWithinParent + 1, null);
          break;
        case 'above':
          this.addChildAtIndex(parent, indexWithinParent, null);
          break;
        default:
          break;
      }
    }

    /**
     * Detach the provided element from its parent and add it right after it.
     *
     * @param {object|Array} elements Row object or an array of selected coordinates.
     * @param {boolean} [forceRender=true] If true (default), it triggers render after finished.
     */
  }, {
    key: "detachFromParent",
    value: function detachFromParent(elements) {
      var _this5 = this;
      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var element = null;
      var rowObjects = [];
      if (Array.isArray(elements)) {
        (0, _number.rangeEach)(elements[0], elements[2], function (i) {
          var translatedIndex = _this5.translateTrimmedRow(i);
          rowObjects.push(_this5.getDataObject(translatedIndex));
        });
        (0, _number.rangeEach)(0, rowObjects.length - 2, function (i) {
          _this5.detachFromParent(rowObjects[i], false);
        });
        element = rowObjects[rowObjects.length - 1];
      } else {
        element = elements;
      }
      var childRowIndex = this.getRowIndex(element);
      var childCount = this.countChildren(element);
      var indexWithinParent = this.getRowIndexWithinParent(element);
      var parent = this.getRowParent(element);
      var grandparent = this.getRowParent(parent);
      var grandparentRowIndex = this.getRowIndex(grandparent);
      var movedElementRowIndex = null;
      this.hot.runHooks('beforeDetachChild', parent, element);
      if (indexWithinParent !== null && indexWithinParent !== void 0) {
        var removedRowIndexes = Array.from(new Array(childRowIndex + childCount + 1).keys()).splice(-1 * (childCount + 1));
        this.hot.runHooks('beforeRemoveRow', childRowIndex, childCount + 1, removedRowIndexes, this.plugin.pluginName);
        parent.__children.splice(indexWithinParent, 1);
        this.rewriteCache();
        this.hot.runHooks('afterRemoveRow', childRowIndex, childCount + 1, removedRowIndexes, this.plugin.pluginName);
        if (grandparent) {
          movedElementRowIndex = grandparentRowIndex + this.countChildren(grandparent);
          var lastGrandparentChild = this.getChild(grandparent, this.countChildren(grandparent) - 1);
          var lastGrandparentChildIndex = this.getRowIndex(lastGrandparentChild);
          this.hot.runHooks('beforeCreateRow', lastGrandparentChildIndex + 1, childCount + 1, this.plugin.pluginName);
          grandparent.__children.push(element);
        } else {
          movedElementRowIndex = this.hot.countRows() + 1;
          this.hot.runHooks('beforeCreateRow', movedElementRowIndex - 2, childCount + 1, this.plugin.pluginName);
          this.data.push(element);
        }
      }
      this.rewriteCache();
      this.hot.runHooks('afterCreateRow', movedElementRowIndex - 2, childCount + 1, this.plugin.pluginName);
      this.hot.runHooks('afterDetachChild', parent, element, this.getRowIndex(element));
      if (forceRender) {
        this.hot.render();
      }
    }

    /**
     * Filter the data by the `logicRows` array.
     *
     * @private
     * @param {number} index Index of the first row to remove.
     * @param {number} amount Number of elements to remove.
     * @param {Array} logicRows Array of indexes to remove.
     */
  }, {
    key: "filterData",
    value: function filterData(index, amount, logicRows) {
      var _this6 = this;
      // TODO: why are the first 2 arguments not used?

      var elementsToRemove = [];
      (0, _array.arrayEach)(logicRows, function (elem) {
        elementsToRemove.push(_this6.getDataObject(elem));
      });
      (0, _array.arrayEach)(elementsToRemove, function (elem) {
        var indexWithinParent = _this6.getRowIndexWithinParent(elem);
        var tempParent = _this6.getRowParent(elem);
        if (tempParent === null) {
          _this6.data.splice(indexWithinParent, 1);
        } else {
          tempParent.__children.splice(indexWithinParent, 1);
        }
      });
      this.rewriteCache();
    }

    /**
     * Used to splice the source data. Needed to properly modify the nested structure, which wouldn't work with the
     * default script.
     *
     * @private
     * @param {number} index Physical index of the element at the splice beginning.
     * @param {number} amount Number of elements to be removed.
     * @param {object[]} elements Array of row objects to add.
     */
  }, {
    key: "spliceData",
    value: function spliceData(index, amount, elements) {
      var previousElement = this.getDataObject(index - 1);
      var newRowParent = null;
      var indexWithinParent = index;
      if (previousElement && previousElement.__children && previousElement.__children.length === 0) {
        newRowParent = previousElement;
        indexWithinParent = 0;
      } else if (index < this.countAllRows()) {
        newRowParent = this.getRowParent(index);
        indexWithinParent = this.getRowIndexWithinParent(index);
      }
      if (newRowParent) {
        if (elements) {
          var _newRowParent$__child;
          (_newRowParent$__child = newRowParent.__children).splice.apply(_newRowParent$__child, [indexWithinParent, amount].concat(_toConsumableArray(elements)));
        } else {
          newRowParent.__children.splice(indexWithinParent, amount);
        }
      } else if (elements) {
        var _this$data;
        (_this$data = this.data).splice.apply(_this$data, [indexWithinParent, amount].concat(_toConsumableArray(elements)));
      } else {
        this.data.splice(indexWithinParent, amount);
      }
      this.rewriteCache();
    }

    /**
     * Update the `__children` key of the upmost parent of the provided row object.
     *
     * @private
     * @param {object} rowElement Row object.
     */
  }, {
    key: "syncRowWithRawSource",
    value: function syncRowWithRawSource(rowElement) {
      var upmostParent = rowElement;
      var tempParent = null;
      do {
        tempParent = this.getRowParent(tempParent);
        if (tempParent !== null) {
          upmostParent = tempParent;
        }
      } while (tempParent !== null);
      this.plugin.disableCoreAPIModifiers();
      this.hot.setSourceDataAtCell(this.getRowIndex(upmostParent), '__children', upmostParent.__children, 'NestedRows.syncRowWithRawSource');
      this.plugin.enableCoreAPIModifiers();
    }

    /* eslint-disable jsdoc/require-param */
    /**
     * Move a single row.
     *
     * @param {number} fromIndex Index of the row to be moved.
     * @param {number} toIndex Index of the destination.
     * @param {boolean} moveToCollapsed `true` if moving a row to a collapsed parent.
     * @param {boolean} moveToLastChild `true` if moving a row to be a last child of the new parent.
     */

    /* eslint-enable jsdoc/require-param */
  }, {
    key: "moveRow",
    value: function moveRow(fromIndex, toIndex, moveToCollapsed, moveToLastChild) {
      var moveToLastRow = toIndex === this.hot.countRows();
      var fromParent = this.getRowParent(fromIndex);
      var indexInFromParent = this.getRowIndexWithinParent(fromIndex);
      var elemToMove = fromParent.__children.slice(indexInFromParent, indexInFromParent + 1);
      var movingUp = fromIndex > toIndex;
      var toParent = moveToLastRow ? this.getRowParent(toIndex - 1) : this.getRowParent(toIndex);
      if (toParent === null || toParent === void 0) {
        toParent = this.getRowParent(toIndex - 1);
      }
      if (toParent === null || toParent === void 0) {
        toParent = this.getDataObject(toIndex - 1);
      }
      if (!toParent) {
        toParent = this.getDataObject(toIndex);
        toParent.__children = [];
      } else if (!toParent.__children) {
        toParent.__children = [];
      }
      var indexInTargetParent = moveToLastRow || moveToCollapsed || moveToLastChild ? toParent.__children.length : this.getRowIndexWithinParent(toIndex);
      var sameParent = fromParent === toParent;
      toParent.__children.splice(indexInTargetParent, 0, elemToMove[0]);
      fromParent.__children.splice(indexInFromParent + (movingUp && sameParent ? 1 : 0), 1);

      // Sync the changes in the cached data with the actual data stored in HOT.
      this.syncRowWithRawSource(fromParent);
      if (!sameParent) {
        this.syncRowWithRawSource(toParent);
      }
    }

    /**
     * Translate the visual row index to the physical index, taking into consideration the state of collapsed rows.
     *
     * @private
     * @param {number} row Row index.
     * @returns {number}
     */
  }, {
    key: "translateTrimmedRow",
    value: function translateTrimmedRow(row) {
      if (this.plugin.collapsingUI) {
        return this.plugin.collapsingUI.translateTrimmedRow(row);
      }
      return row;
    }

    /**
     * Translate the physical row index to the visual index, taking into consideration the state of collapsed rows.
     *
     * @private
     * @param {number} row Row index.
     * @returns {number}
     */
  }, {
    key: "untranslateTrimmedRow",
    value: function untranslateTrimmedRow(row) {
      if (this.plugin.collapsingUI) {
        return this.plugin.collapsingUI.untranslateTrimmedRow(row);
      }
      return row;
    }
  }]);
  return DataManager;
}();
var _default = DataManager;
exports.default = _default;