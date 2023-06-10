"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
exports.__esModule = true;
exports.default = exports.TRAVERSAL_DF_PRE = exports.TRAVERSAL_DF_POST = exports.TRAVERSAL_BF = void 0;
exports.depthFirstPreOrder = depthFirstPreOrder;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Depth-first pre-order strategy (https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)).
 *
 * @type {string}
 */
var TRAVERSAL_DF_PRE = 'DF-pre-order';
/**
 * @param {Function} callback A callback which will be called on each visited node.
 * @param {*} context A context to pass through.
 * @returns {boolean}
 */
exports.TRAVERSAL_DF_PRE = TRAVERSAL_DF_PRE;
function depthFirstPreOrder(callback, context) {
  var continueTraverse = callback.call(context, this);
  for (var i = 0; i < this.childs.length; i++) {
    if (continueTraverse === false) {
      return false;
    }
    continueTraverse = depthFirstPreOrder.call(this.childs[i], callback, context);
  }
  return continueTraverse;
}

/**
 * Depth-first post-order strategy (https://en.wikipedia.org/wiki/Tree_traversal#Post-order_(NLR)).
 *
 * @type {string}
 */
var TRAVERSAL_DF_POST = 'DF-post-order';
/**
 * @param {Function} callback A callback which will be called on each visited node.
 * @param {*} context A context to pass through.
 * @returns {boolean}
 */
exports.TRAVERSAL_DF_POST = TRAVERSAL_DF_POST;
function depthFirstPostOrder(callback, context) {
  for (var i = 0; i < this.childs.length; i++) {
    var continueTraverse = depthFirstPostOrder.call(this.childs[i], callback, context);
    if (continueTraverse === false) {
      return false;
    }
  }
  return callback.call(context, this);
}

/**
 * Breadth-first traversal strategy (https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search_/_level_order).
 *
 * @type {string}
 */
var TRAVERSAL_BF = 'BF';
/**
 * @param {Function} callback A callback which will be called on each visited node.
 * @param {*} context A context to pass through.
 */
exports.TRAVERSAL_BF = TRAVERSAL_BF;
function breadthFirst(callback, context) {
  var queue = [this];

  /**
   * Internal processor.
   */
  function process() {
    if (queue.length === 0) {
      return;
    }
    var node = queue.shift();
    queue.push.apply(queue, _toConsumableArray(node.childs));
    if (callback.call(context, node) !== false) {
      process();
    }
  }
  process();
}

/**
 * Default strategy for tree traversal.
 *
 * @type {string}
 */
var DEFAULT_TRAVERSAL_STRATEGY = TRAVERSAL_BF;
/**
 * Collection of all available tree traversal strategies.
 *
 * @type {Map<string, Function>}
 */
var TRAVERSAL_STRATEGIES = new Map([[TRAVERSAL_DF_PRE, depthFirstPreOrder], [TRAVERSAL_DF_POST, depthFirstPostOrder], [TRAVERSAL_BF, breadthFirst]]);

/**
 *
 */
var TreeNode = /*#__PURE__*/function () {
  /**
   * A tree data.
   *
   * @type {object}
   */

  /**
   * A parent node.
   *
   * @type {TreeNode}
   */

  /**
   * A tree leaves.
   *
   * @type {TreeNode[]}
   */

  function TreeNode(data) {
    _classCallCheck(this, TreeNode);
    _defineProperty(this, "data", {});
    _defineProperty(this, "parent", null);
    _defineProperty(this, "childs", []);
    this.data = data;
  }

  /**
   * Adds a node to tree leaves. Added node is linked with the parent node through "parent" property.
   *
   * @param {TreeNode} node A TreeNode to add.
   */
  _createClass(TreeNode, [{
    key: "addChild",
    value: function addChild(node) {
      node.parent = this;
      this.childs.push(node);
    }

    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * @memberof TreeNode#
     * @function cloneTree
     *
     * Clones a tree structure deeply.
     *
     * For example, for giving a tree structure:
     *      .--(B1)--.
     *   .-(C1)   .-(C2)-.----.
     *  (D1)     (D2)   (D3) (D4)
     *
     * Cloning a tree starting from C2 node creates a mirrored tree structure.
     *     .-(C2')-.-----.
     *    (D2')   (D3') (D4')
     *
     * The cloned tree can be safely modified without affecting the original structure.
     * After modification, the clone can be merged with a tree using the "replaceTreeWith" method.
     *
     * @param {TreeNode} [nodeTree=this] A TreeNode to clone.
     * @returns {TreeNode}
     */
    /* eslint-enable jsdoc/require-description-complete-sentence */
  }, {
    key: "cloneTree",
    value: function cloneTree() {
      var nodeTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      var clonedNode = new TreeNode(_objectSpread({}, nodeTree.data));
      for (var i = 0; i < nodeTree.childs.length; i++) {
        clonedNode.addChild(this.cloneTree(nodeTree.childs[i]));
      }
      return clonedNode;
    }

    /**
     * Replaces the current node with a passed tree structure.
     *
     * @param {TreeNode} nodeTree A TreeNode to replace with.
     */
  }, {
    key: "replaceTreeWith",
    value: function replaceTreeWith(nodeTree) {
      this.data = _objectSpread({}, nodeTree.data);
      this.childs = [];
      for (var i = 0; i < nodeTree.childs.length; i++) {
        this.addChild(nodeTree.childs[i]);
      }
    }

    /**
     * Traverses the tree structure through node childs. The walk down traversing supports
     * a three different strategies.
     *  - Depth-first pre-order strategy (https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR));
     *  - Depth-first post-order strategy (https://en.wikipedia.org/wiki/Tree_traversal#Post-order_(NLR));
     *  - Breadth-first traversal strategy (https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search_/_level_order).
     *
     * @param {Function} callback The callback function which will be called for each node.
     * @param {string} [traversalStrategy=DEFAULT_TRAVERSAL_STRATEGY] Traversing strategy.
     */
  }, {
    key: "walkDown",
    value: function walkDown(callback) {
      var traversalStrategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_TRAVERSAL_STRATEGY;
      if (!TRAVERSAL_STRATEGIES.has(traversalStrategy)) {
        throw new Error("Traversal strategy \"".concat(traversalStrategy, "\" does not exist"));
      }
      TRAVERSAL_STRATEGIES.get(traversalStrategy).call(this, callback, this);
    }

    /**
     * Traverses the tree structure through node parents.
     *
     * @param {Function} callback The callback function which will be called for each node.
     */
  }, {
    key: "walkUp",
    value: function walkUp(callback) {
      var context = this;
      var process = function process(node) {
        var continueTraverse = callback.call(context, node);
        if (continueTraverse !== false && node.parent !== null) {
          process(node.parent);
        }
      };
      process(this);
    }
  }]);
  return TreeNode;
}();
exports.default = TreeNode;