"use strict";

exports.__esModule = true;
exports.collapseNode = collapseNode;
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
var _array = require("../../../../helpers/array");
var _expand = require("./expand");
var _tree = require("./utils/tree");
/**
 * Collapsing a node is a process where the processing node is collapsed
 * to the colspan width of the first child. All node children, except the
 * first one, are hidden. To prevent losing a current state of node children
 * on the right, all nodes are cloned (and restored while expanding), and
 * only then original nodes are modified (hidden in this case).
 *
 * @param {TreeNode} nodeToProcess A tree node to process.
 * @returns {object} Returns an object with properties:
 *                    - rollbackModification: The function that rollbacks
 *                      the tree to the previous state.
 *                    - affectedColumns: The list of the visual column
 *                      indexes which are affected. That list is passed
 *                      to the hiddens column logic.
 *                    - colspanCompensation: The number of colspan by
 *                      which the processed node colspan was reduced.
 */
function collapseNode(nodeToProcess) {
  var _getFirstChildPropert;
  var nodeData = nodeToProcess.data,
    nodeChilds = nodeToProcess.childs;
  if (nodeData.isCollapsed || nodeData.isHidden || nodeData.origColspan <= 1) {
    return {
      rollbackModification: function rollbackModification() {},
      affectedColumns: [],
      colspanCompensation: 0
    };
  }
  var isNodeReflected = (0, _tree.isNodeReflectsFirstChildColspan)(nodeToProcess);
  if (isNodeReflected) {
    return collapseNode(nodeChilds[0]);
  }
  nodeData.isCollapsed = true;
  var allLeavesExceptMostLeft = nodeChilds.slice(1);
  var affectedColumns = new Set();
  if (allLeavesExceptMostLeft.length > 0) {
    (0, _array.arrayEach)(allLeavesExceptMostLeft, function (node) {
      (0, _tree.traverseHiddenNodeColumnIndexes)(node, function (gridColumnIndex) {
        affectedColumns.add(gridColumnIndex);
      });

      // Clone the tree to preserve original tree state after header expanding.
      node.data.clonedTree = node.cloneTree();

      // Hide all leaves except the first leaf on the left (on headers context hide all
      // headers on the right).
      node.walkDown(function (_ref) {
        var data = _ref.data;
        data.isHidden = true;
      });
    });
  } else {
    var origColspan = nodeData.origColspan,
      columnIndex = nodeData.columnIndex;

    // Add column to "affected" started from 1. The header without children can not be
    // collapsed so the first have to be visible (untouched).
    for (var i = 1; i < origColspan; i++) {
      var gridColumnIndex = columnIndex + i;
      affectedColumns.add(gridColumnIndex);
    }
  }

  // Calculate by how many colspan it needs to reduce the headings to match them to
  // the first child colspan width.
  var colspanCompensation = nodeData.colspan - ((_getFirstChildPropert = (0, _tree.getFirstChildProperty)(nodeToProcess, 'colspan')) !== null && _getFirstChildPropert !== void 0 ? _getFirstChildPropert : 1);
  nodeToProcess.walkUp(function (node) {
    var data = node.data;
    data.colspan -= colspanCompensation;
    if (data.colspan <= 1) {
      data.colspan = 1;
      data.isCollapsed = true;
    } else if ((0, _tree.isNodeReflectsFirstChildColspan)(node)) {
      data.isCollapsed = (0, _tree.getFirstChildProperty)(node, 'isCollapsed');
    }
  });
  return {
    rollbackModification: function rollbackModification() {
      return (0, _expand.expandNode)(nodeToProcess);
    },
    affectedColumns: Array.from(affectedColumns),
    colspanCompensation: colspanCompensation
  };
}