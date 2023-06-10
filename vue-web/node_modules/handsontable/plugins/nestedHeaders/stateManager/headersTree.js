"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.weak-map.js");
var _array = require("../../../helpers/array");
var _tree = _interopRequireDefault(require("../../../utils/dataStructures/tree"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _rootNodes = /*#__PURE__*/new WeakMap();
var _rootsIndex = /*#__PURE__*/new WeakMap();
var _sourceSettings = /*#__PURE__*/new WeakMap();
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @private
 * @class HeadersTree
 *
 * The header tree class keeps nested header settings in the tree
 * structure for easier node manipulation (e.q collapse or expand column).
 * That trees represent the current state of the nested headers. From the
 * trees, the matrix is generated for nested header renderers.
 *
 * The second role of the module is validation. While building the tree,
 * there is check whether the configuration contains overlapping
 * headers. If true, then the exception is thrown.
 *
 * The tree is static; it means that its column indexing never changes
 * even when a collapsing header is performed. The structure is based
 * on visual column indexes.
 *
 * For example, for that header configuration:
 *   +----+----+----+----+----+
 *   │ A1                │ A2 │
 *   +----+----+----+----+----+
 *   │ B1           │ B2 │ B3 │
 *   +----+----+----+----+----+
 *   │ C1      │ C2 │ C3 │ C4 │
 *   +----+----+----+----+----+
 *
 * The tree structures look like:
 *                (0)                      (4)           // a visual column index
 *                 │                        │
 *        .------(A1)------.              (A2)--.
 *   .--(B1)--.           (B2)--.              (B3)--.
 *  (C1)     (C2)              (C3)                 (C4)
 *
 */
/* eslint-enable jsdoc/require-description-complete-sentence */
var HeadersTree = /*#__PURE__*/function () {
  /**
   * The collection of nested headers settings structured into trees. The root trees are stored
   * under the visual column index.
   *
   * @private
   * @type {Map<number, TreeNode>}
   */

  /**
   * A map that translates the visual column indexes that intersect the range
   * defined by the header colspan width to the root index.
   *
   * @private
   * @type {Map<number, number>}
   */

  /**
   * The instance of the SourceSettings class.
   *
   * @private
   * @type {SourceSettings}
   */

  function HeadersTree(sourceSettings) {
    _classCallCheck(this, HeadersTree);
    _classPrivateFieldInitSpec(this, _rootNodes, {
      writable: true,
      value: new Map()
    });
    _classPrivateFieldInitSpec(this, _rootsIndex, {
      writable: true,
      value: new Map()
    });
    _classPrivateFieldInitSpec(this, _sourceSettings, {
      writable: true,
      value: null
    });
    _classPrivateFieldSet(this, _sourceSettings, sourceSettings);
  }

  /**
   * Gets an array of the all root nodes.
   *
   * @returns {TreeNode[]}
   */
  _createClass(HeadersTree, [{
    key: "getRoots",
    value: function getRoots() {
      return Array.from(_classPrivateFieldGet(this, _rootNodes).values());
    }

    /**
     * Gets a root node by specified visual column index.
     *
     * @param {number} columnIndex A visual column index.
     * @returns {TreeNode|undefined}
     */
  }, {
    key: "getRootByColumn",
    value: function getRootByColumn(columnIndex) {
      var node;
      if (_classPrivateFieldGet(this, _rootsIndex).has(columnIndex)) {
        node = _classPrivateFieldGet(this, _rootNodes).get(_classPrivateFieldGet(this, _rootsIndex).get(columnIndex));
      }
      return node;
    }

    /**
     * Gets a tree node by its position in the grid settings.
     *
     * @param {number} headerLevel Header level index (there is support only for positive values).
     * @param {number} columnIndex A visual column index.
     * @returns {TreeNode|undefined}
     */
  }, {
    key: "getNode",
    value: function getNode(headerLevel, columnIndex) {
      var rootNode = this.getRootByColumn(columnIndex);
      if (!rootNode) {
        return;
      }

      // Normalize the visual column index to a 0-based system for a specific "box" defined
      // by root node colspan width.
      var normColumnIndex = columnIndex - _classPrivateFieldGet(this, _rootsIndex).get(columnIndex);
      var columnCursor = 0;
      var treeNode;

      // Collect all parent nodes that depend on the collapsed node.
      rootNode.walkDown(function (node) {
        var _node$data = node.data,
          origColspan = _node$data.origColspan,
          nodeHeaderLevel = _node$data.headerLevel;
        if (headerLevel === nodeHeaderLevel) {
          if (normColumnIndex >= columnCursor && normColumnIndex <= columnCursor + origColspan - 1) {
            treeNode = node;
            return false; // Cancel tree traversing.
          }

          columnCursor += origColspan;
        }
      });
      return treeNode;
    }

    /**
     * Builds (or rebuilds if called again) root nodes indexes.
     */
  }, {
    key: "rebuildTreeIndex",
    value: function rebuildTreeIndex() {
      var _this = this;
      var columnIndex = 0;
      _classPrivateFieldGet(this, _rootsIndex).clear();
      (0, _array.arrayEach)(_classPrivateFieldGet(this, _rootNodes), function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          colspan = _ref2[1].data.colspan;
        // Map tree range (colspan range/width) into visual column index of the root node.
        for (var i = columnIndex; i < columnIndex + colspan; i++) {
          _classPrivateFieldGet(_this, _rootsIndex).set(i, columnIndex);
        }
        columnIndex += colspan;
      });
    }

    /**
     * Builds trees based on SourceSettings class. Calling a method causes clearing the tree state built
     * from the previous call.
     */
  }, {
    key: "buildTree",
    value: function buildTree() {
      this.clear();
      var columnsCount = _classPrivateFieldGet(this, _sourceSettings).getColumnsCount();
      var columnIndex = 0;
      while (columnIndex < columnsCount) {
        var columnSettings = _classPrivateFieldGet(this, _sourceSettings).getHeaderSettings(0, columnIndex);
        var rootNode = new _tree.default();
        _classPrivateFieldGet(this, _rootNodes).set(columnIndex, rootNode);
        this.buildLeaves(rootNode, columnIndex, 0, columnSettings.origColspan);
        columnIndex += columnSettings.origColspan;
      }
      this.rebuildTreeIndex();
    }

    /**
     * Builds leaves for specified tree node.
     *
     * @param {TreeNode} parentNode A node to which the leaves applies.
     * @param {number} columnIndex A visual column index.
     * @param {number} headerLevel Currently processed header level.
     * @param {number} [extractionLength=1] Determines column extraction length for node children.
     */
  }, {
    key: "buildLeaves",
    value: function buildLeaves(parentNode, columnIndex, headerLevel) {
      var _this2 = this;
      var extractionLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var columnsSettings = _classPrivateFieldGet(this, _sourceSettings).getHeadersSettings(headerLevel, columnIndex, extractionLength);
      headerLevel += 1;
      (0, _array.arrayEach)(columnsSettings, function (columnSettings) {
        var nodeData = _objectSpread(_objectSpread({}, columnSettings), {}, {
          /**
           * The header level (tree node depth level).
           *
           * @type {number}
           */
          headerLevel: headerLevel - 1,
          /**
           * A visual column index.
           *
           * @type {number}
           */
          columnIndex: columnIndex
        });
        var node;
        if (headerLevel === 1) {
          // fill the root node
          parentNode.data = nodeData;
          node = parentNode;
        } else {
          node = new _tree.default(nodeData);
          parentNode.addChild(node);
        }
        if (headerLevel < _classPrivateFieldGet(_this2, _sourceSettings).getLayersCount()) {
          _this2.buildLeaves(node, columnIndex, headerLevel, columnSettings.origColspan);
        }
        columnIndex += columnSettings.origColspan;
      });
    }

    /**
     * Clears the tree to the initial state.
     */
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldGet(this, _rootNodes).clear();
      _classPrivateFieldGet(this, _rootsIndex).clear();
    }
  }]);
  return HeadersTree;
}();
exports.default = HeadersTree;