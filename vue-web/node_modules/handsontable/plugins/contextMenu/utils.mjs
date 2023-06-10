import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.reverse.js";
import { arrayEach, arrayMap } from "../../helpers/array.mjs";
import { hasClass } from "../../helpers/dom/element.mjs";
import { KEY as SEPARATOR } from "./predefinedItems/separator.mjs"; /**
                                                                     * @param {CellRange[]} selRanges An array of the cell ranges.
                                                                     * @returns {object[]}
                                                                     */
export function normalizeSelection(selRanges) {
  return arrayMap(selRanges, function (range) {
    return {
      start: range.getTopStartCorner(),
      end: range.getBottomEndCorner()
    };
  });
}

/**
 * @param {HTMLElement} cell The HTML cell element to check.
 * @returns {boolean}
 */
export function isSeparator(cell) {
  return hasClass(cell, 'htSeparator');
}

/**
 * @param {HTMLElement} cell The HTML cell element to check.
 * @returns {boolean}
 */
export function hasSubMenu(cell) {
  return hasClass(cell, 'htSubmenu');
}

/**
 * @param {HTMLElement} cell The HTML cell element to check.
 * @returns {boolean}
 */
export function isDisabled(cell) {
  return hasClass(cell, 'htDisabled');
}

/**
 * @param {HTMLElement} cell The HTML cell element to check.
 * @returns {boolean}
 */
export function isSelectionDisabled(cell) {
  return hasClass(cell, 'htSelectionDisabled');
}

/**
 * @param {Core} hot The Handsontable instance.
 * @returns {Array[]|null}
 */
export function getValidSelection(hot) {
  var selected = hot.getSelected();
  if (!selected) {
    return null;
  }
  if (selected[0] < 0) {
    return null;
  }
  return selected;
}

/**
 * @param {string} className The full element class name to process.
 * @param {string} alignment The slignment class name to compare with.
 * @returns {string}
 */
export function prepareVerticalAlignClass(className, alignment) {
  if (className.indexOf(alignment) !== -1) {
    return className;
  }
  var replacedClassName = className.replace('htTop', '').replace('htMiddle', '').replace('htBottom', '').replace('  ', '');
  return "".concat(replacedClassName, " ").concat(alignment);
}

/**
 * @param {string} className The full element class name to process.
 * @param {string} alignment The slignment class name to compare with.
 * @returns {string}
 */
export function prepareHorizontalAlignClass(className, alignment) {
  if (className.indexOf(alignment) !== -1) {
    return className;
  }
  var replacedClassName = className.replace('htLeft', '').replace('htCenter', '').replace('htRight', '').replace('htJustify', '').replace('  ', '');
  return "".concat(replacedClassName, " ").concat(alignment);
}

/**
 * @param {CellRange[]} ranges An array of the cell ranges.
 * @param {Function} callback The callback function.
 * @returns {object}
 */
export function getAlignmentClasses(ranges, callback) {
  var classes = {};
  arrayEach(ranges, function (range) {
    range.forAll(function (row, col) {
      // Alignment classes should only collected within cell ranges. We skip header coordinates.
      if (row >= 0 && col >= 0) {
        if (!classes[row]) {
          classes[row] = [];
        }
        classes[row][col] = callback(row, col);
      }
    });
  });
  return classes;
}

/**
 * @param {CellRange[]} ranges An array of the cell ranges.
 * @param {string} type The type of the alignment axis ('horizontal' or 'vertical').
 * @param {string} alignment CSS class name to add.
 * @param {Function} cellDescriptor The function which fetches the cell meta object based in passed coordinates.
 * @param {Function} propertySetter The function which contains logic for added/removed alignment.
 */
export function align(ranges, type, alignment, cellDescriptor, propertySetter) {
  arrayEach(ranges, function (range) {
    range.forAll(function (row, col) {
      // Alignment classes should only collected within cell ranges. We skip header coordinates.
      if (row >= 0 && col >= 0) {
        applyAlignClassName(row, col, type, alignment, cellDescriptor, propertySetter);
      }
    });
  });
}

/**
 * @param {number} row The visual row index.
 * @param {number} col The visual column index.
 * @param {string} type The type of the alignment axis ('horizontal' or 'vertical').
 * @param {string} alignment CSS class name to add.
 * @param {Function} cellDescriptor The function which fetches the cell meta object based in passed coordinates.
 * @param {Function} propertySetter The function which contains logic for added/removed alignment.
 */
function applyAlignClassName(row, col, type, alignment, cellDescriptor, propertySetter) {
  var cellMeta = cellDescriptor(row, col);
  var className = alignment;
  if (cellMeta.className) {
    if (type === 'vertical') {
      className = prepareVerticalAlignClass(cellMeta.className, alignment);
    } else {
      className = prepareHorizontalAlignClass(cellMeta.className, alignment);
    }
  }
  propertySetter(row, col, 'className', className);
}

/**
 * @param {CellRange[]} ranges An array of the cell ranges.
 * @param {Function} comparator The comparator function.
 * @returns {boolean}
 */
export function checkSelectionConsistency(ranges, comparator) {
  var result = false;
  if (Array.isArray(ranges)) {
    arrayEach(ranges, function (range) {
      range.forAll(function (row, col) {
        // Selection consistency should only check within cell ranges. We skip header coordinates.
        if (row >= 0 && col >= 0 && comparator(row, col)) {
          result = true;
          return false;
        }
      });
      return result;
    });
  }
  return result;
}

/**
 * @param {string} label The label text.
 * @returns {string}
 */
export function markLabelAsSelected(label) {
  // workaround for https://github.com/handsontable/handsontable/issues/1946
  return "<span class=\"selected\">".concat(String.fromCharCode(10003), "</span>").concat(label);
}

/**
 * @param {object} item The object which describes the context menu item properties.
 * @param {Core} instance The Handsontable instance.
 * @returns {boolean}
 */
export function isItemHidden(item, instance) {
  return !item.hidden || !(typeof item.hidden === 'function' && item.hidden.call(instance));
}

/**
 * @param {object[]} items The context menu items collection.
 * @param {string} separator The string which identifies the context menu separator item.
 * @returns {object[]}
 */
function shiftSeparators(items, separator) {
  var result = items.slice(0);
  for (var i = 0; i < result.length;) {
    if (result[i].name === separator) {
      result.shift();
    } else {
      break;
    }
  }
  return result;
}

/**
 * @param {object[]} items The context menu items collection.
 * @param {string} separator The string which identifies the context menu separator item.
 * @returns {object[]}
 */
function popSeparators(items, separator) {
  var result = items.slice(0);
  result.reverse();
  result = shiftSeparators(result, separator);
  result.reverse();
  return result;
}

/**
 * Removes duplicated menu separators from the context menu items collection.
 *
 * @param {object[]} items The context menu items collection.
 * @returns {object[]}
 */
function removeDuplicatedSeparators(items) {
  var result = [];
  arrayEach(items, function (value, index) {
    if (index > 0) {
      if (result[result.length - 1].name !== value.name) {
        result.push(value);
      }
    } else {
      result.push(value);
    }
  });
  return result;
}

/**
 * Removes menu separators from the context menu items collection.
 *
 * @param {object[]} items The context menu items collection.
 * @param {string} separator The string which identifies the context menu separator item.
 * @returns {object[]}
 */
export function filterSeparators(items) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SEPARATOR;
  var result = items.slice(0);
  result = shiftSeparators(result, separator);
  result = popSeparators(result, separator);
  result = removeDuplicatedSeparators(result);
  return result;
}