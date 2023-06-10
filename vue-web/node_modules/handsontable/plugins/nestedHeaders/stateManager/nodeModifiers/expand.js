"use strict";

exports.__esModule = true;
exports.expandNode = expandNode;
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
var _array = require("../../../../helpers/array");
var _collapse = require("./collapse");
var _tree = require("./utils/tree");
/**
 * Expanding a node is a process where the processing node is expanded to
 * its original colspan width. To restore an original state of all node
 * children on the right, the modified nodes are replaced with the cloned
 * nodes (they were cloned while collapsing).
 *
 * @param {TreeNode} nodeToProcess A tree node to process.
 * @returns {object} Returns an object with properties:
 *                    - rollbackModification: The function that rollbacks
 *                      the tree to the previous state.
 *                    - affectedColumns: The list of the visual column
 *                      indexes which are affected. That list is passed
 *                      to the hiddens column logic.
 *                    - colspanCompensation: The number of colspan by
 *                      which the processed node colspan was increased.
 */
function expandNode(nodeToProcess) {
  var nodeData = nodeToProcess.data,
    nodeChilds = nodeToProcess.childs;
  if (!nodeData.isCollapsed || nodeData.isHidden || nodeData.origColspan <= 1) {
    return {
      rollbackModification: function rollbackModification() {},
      affectedColumns: [],
      colspanCompensation: 0
    };
  }
  var isNodeReflected = (0, _tree.isNodeReflectsFirstChildColspan)(nodeToProcess);
  if (isNodeReflected) {
    return expandNode(nodeChilds[0]);
  }
  nodeData.isCollapsed = false;
  var allLeavesExceptMostLeft = nodeChilds.slice(1);
  var affectedColumns = new Set();
  var colspanCompensation = 0;
  if (allLeavesExceptMostLeft.length > 0) {
    (0, _array.arrayEach)(allLeavesExceptMostLeft, function (node) {
      // Restore original state of the collapsed headers.
      node.replaceTreeWith(node.data.clonedTree);
      node.data.clonedTree = null;
      var leafData = node.data;

      // Calculate by how many colspan it needs to increase the headings to match them to
      // the colspan width of all its children.
      colspanCompensation += leafData.colspan;
      (0, _tree.traverseHiddenNodeColumnIndexes)(node, function (gridColumnIndex) {
        affectedColumns.add(gridColumnIndex);
      });
    });
  } else {
    var colspan = nodeData.colspan,
      origColspan = nodeData.origColspan,
      columnIndex = nodeData.columnIndex;

    // In a case when the node doesn't have any children restore the colspan width to
    // its original state.
    colspanCompensation = origColspan - colspan;

    // Add column to "affected" started from 1. The header without children can not be
    // collapsed so the first column is already visible and we shouldn't touch it.
    for (var i = 1; i < origColspan; i++) {
      affectedColumns.add(columnIndex + i);
    }
  }
  nodeToProcess.walkUp(function (node) {
    var data = node.data;
    data.colspan += colspanCompensation;
    if (data.colspan >= data.origColspan) {
      data.colspan = data.origColspan;
      data.isCollapsed = false;
    } else if ((0, _tree.isNodeReflectsFirstChildColspan)(node)) {
      data.isCollapsed = (0, _tree.getFirstChildProperty)(node, 'isCollapsed');
    }
  });
  return {
    rollbackModification: function rollbackModification() {
      return (0, _collapse.collapseNode)(nodeToProcess);
    },
    affectedColumns: Array.from(affectedColumns),
    colspanCompensation: colspanCompensation
  };
}