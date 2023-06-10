"use strict";

exports.__esModule = true;
exports.getClassesToAdd = getClassesToAdd;
exports.getClassesToRemove = getClassesToRemove;
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
var COLUMN_ORDER_PREFIX = 'sort';

/**
 * Get CSS classes which should be added to particular column header.
 *
 * @param {object} columnStatesManager Instance of column state manager.
 * @param {number} column Visual column index.
 * @param {boolean} showSortIndicator Indicates if indicator should be shown for the particular column.
 * @returns {Array} Array of CSS classes.
 */
function getClassesToAdd(columnStatesManager, column, showSortIndicator) {
  var cssClasses = [];
  if (showSortIndicator === false) {
    return cssClasses;
  }
  if (columnStatesManager.isColumnSorted(column) && columnStatesManager.getNumberOfSortedColumns() > 1) {
    cssClasses.push("".concat(COLUMN_ORDER_PREFIX, "-").concat(columnStatesManager.getIndexOfColumnInSortQueue(column) + 1));
  }
  return cssClasses;
}

/**
 * Get CSS classes which should be removed from column header.
 *
 * @param {HTMLElement} htmlElement An element to process.
 * @returns {Array} Array of CSS classes.
 */
function getClassesToRemove(htmlElement) {
  var cssClasses = htmlElement.className.split(' ');
  var sortSequenceRegExp = new RegExp("^".concat(COLUMN_ORDER_PREFIX, "-[0-9]{1,2}$"));
  return cssClasses.filter(function (cssClass) {
    return sortSequenceRegExp.test(cssClass);
  });
}