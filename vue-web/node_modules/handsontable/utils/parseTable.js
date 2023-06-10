"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
exports.__esModule = true;
exports._dataToHTML = _dataToHTML;
exports.htmlToGridSettings = htmlToGridSettings;
exports.instanceToHTML = instanceToHTML;
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.array.last-index-of.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _mixed = require("./../helpers/mixed");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var ESCAPED_HTML_CHARS = {
  '&nbsp;': '\x20',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>'
};
var regEscapedChars = new RegExp(Object.keys(ESCAPED_HTML_CHARS).map(function (key) {
  return "(".concat(key, ")");
}).join('|'), 'gi');

/**
 * Verifies if node is an HTMLTable element.
 *
 * @param {Node} element Node to verify if it's an HTMLTable.
 * @returns {boolean}
 */
function isHTMLTable(element) {
  return (element && element.nodeName || '') === 'TABLE';
}

/**
 * Converts Handsontable into HTMLTableElement.
 *
 * @param {Core} instance The Handsontable instance.
 * @returns {string} OuterHTML of the HTMLTableElement.
 */
function instanceToHTML(instance) {
  var hasColumnHeaders = instance.hasColHeaders();
  var hasRowHeaders = instance.hasRowHeaders();
  var coords = [hasColumnHeaders ? -1 : 0, hasRowHeaders ? -1 : 0, instance.countRows() - 1, instance.countCols() - 1];
  var data = instance.getData.apply(instance, coords);
  var countRows = data.length;
  var countCols = countRows > 0 ? data[0].length : 0;
  var TABLE = ['<table>', '</table>'];
  var THEAD = hasColumnHeaders ? ['<thead>', '</thead>'] : [];
  var TBODY = ['<tbody>', '</tbody>'];
  var rowModifier = hasRowHeaders ? 1 : 0;
  var columnModifier = hasColumnHeaders ? 1 : 0;
  for (var row = 0; row < countRows; row += 1) {
    var isColumnHeadersRow = hasColumnHeaders && row === 0;
    var CELLS = [];
    for (var column = 0; column < countCols; column += 1) {
      var isRowHeadersColumn = !isColumnHeadersRow && hasRowHeaders && column === 0;
      var cell = '';
      if (isColumnHeadersRow) {
        cell = "<th>".concat(instance.getColHeader(column - rowModifier), "</th>");
      } else if (isRowHeadersColumn) {
        cell = "<th>".concat(instance.getRowHeader(row - columnModifier), "</th>");
      } else {
        var cellData = data[row][column];
        var _instance$getCellMeta = instance.getCellMeta(row - columnModifier, column - rowModifier),
          hidden = _instance$getCellMeta.hidden,
          rowspan = _instance$getCellMeta.rowspan,
          colspan = _instance$getCellMeta.colspan;
        if (!hidden) {
          var attrs = [];
          if (rowspan) {
            attrs.push("rowspan=\"".concat(rowspan, "\""));
          }
          if (colspan) {
            attrs.push("colspan=\"".concat(colspan, "\""));
          }
          if ((0, _mixed.isEmpty)(cellData)) {
            cell = "<td ".concat(attrs.join(' '), "></td>");
          } else {
            var value = cellData.toString().replace('<', '&lt;').replace('>', '&gt;').replace(/(<br(\s*|\/)>(\r\n|\n)?|\r\n|\n)/g, '<br>\r\n').replace(/\x20/gi, '&nbsp;').replace(/\t/gi, '&#9;');
            cell = "<td ".concat(attrs.join(' '), ">").concat(value, "</td>");
          }
        }
      }
      CELLS.push(cell);
    }
    var TR = ['<tr>'].concat(CELLS, ['</tr>']).join('');
    if (isColumnHeadersRow) {
      THEAD.splice(1, 0, TR);
    } else {
      TBODY.splice(-1, 0, TR);
    }
  }
  TABLE.splice(1, 0, THEAD.join(''), TBODY.join(''));
  return TABLE.join('');
}

/**
 * Converts 2D array into HTMLTableElement.
 *
 * @param {Array} input Input array which will be converted to HTMLTable.
 * @returns {string} OuterHTML of the HTMLTableElement.
 */
// eslint-disable-next-line no-restricted-globals
function _dataToHTML(input) {
  var inputLen = input.length;
  var result = ['<table>'];
  for (var row = 0; row < inputLen; row += 1) {
    var rowData = input[row];
    var columnsLen = rowData.length;
    var columnsResult = [];
    if (row === 0) {
      result.push('<tbody>');
    }
    for (var column = 0; column < columnsLen; column += 1) {
      var cellData = rowData[column];
      var parsedCellData = (0, _mixed.isEmpty)(cellData) ? '' : cellData.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(<br(\s*|\/)>(\r\n|\n)?|\r\n|\n)/g, '<br>\r\n').replace(/\x20/gi, '&nbsp;').replace(/\t/gi, '&#9;');
      columnsResult.push("<td>".concat(parsedCellData, "</td>"));
    }
    result.push.apply(result, ['<tr>'].concat(columnsResult, ['</tr>']));
    if (row + 1 === inputLen) {
      result.push('</tbody>');
    }
  }
  result.push('</table>');
  return result.join('');
}

/**
 * Converts HTMLTable or string into Handsontable configuration object.
 *
 * @param {Element|string} element Node element which should contain `<table>...</table>`.
 * @param {Document} [rootDocument] The document window owner.
 * @returns {object} Return configuration object. Contains keys as DefaultSettings.
 */
// eslint-disable-next-line no-restricted-globals
function htmlToGridSettings(element) {
  var rootDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var settingsObj = {};
  var fragment = rootDocument.createDocumentFragment();
  var tempElem = rootDocument.createElement('div');
  fragment.appendChild(tempElem);
  var checkElement = element;
  if (typeof checkElement === 'string') {
    var escapedAdjacentHTML = checkElement.replace(/<td\b[^>]*?>([\s\S]*?)<\/\s*td>/g, function (cellFragment) {
      var openingTag = cellFragment.match(/<td\b[^>]*?>/g)[0];
      var cellValue = cellFragment.substring(openingTag.length, cellFragment.lastIndexOf('<')).replace(/(<(?!br)([^>]+)>)/gi, '');
      var closingTag = '</td>';
      return "".concat(openingTag).concat(cellValue).concat(closingTag);
    });
    tempElem.insertAdjacentHTML('afterbegin', "".concat(escapedAdjacentHTML));
    checkElement = tempElem.querySelector('table');
  }
  if (!checkElement || !isHTMLTable(checkElement)) {
    return;
  }
  var generator = tempElem.querySelector('meta[name$="enerator"]');
  var hasRowHeaders = checkElement.querySelector('tbody th') !== null;
  var trElement = checkElement.querySelector('tr');
  var countCols = !trElement ? 0 : Array.from(trElement.cells).reduce(function (cols, cell) {
    return cols + cell.colSpan;
  }, 0) - (hasRowHeaders ? 1 : 0);
  var fixedRowsBottom = checkElement.tFoot && Array.from(checkElement.tFoot.rows) || [];
  var fixedRowsTop = [];
  var hasColHeaders = false;
  var thRowsLen = 0;
  var countRows = 0;
  if (checkElement.tHead) {
    var thRows = Array.from(checkElement.tHead.rows).filter(function (tr) {
      var isDataRow = tr.querySelector('td') !== null;
      if (isDataRow) {
        fixedRowsTop.push(tr);
      }
      return !isDataRow;
    });
    thRowsLen = thRows.length;
    hasColHeaders = thRowsLen > 0;
    if (thRowsLen > 1) {
      settingsObj.nestedHeaders = Array.from(thRows).reduce(function (rows, row) {
        var headersRow = Array.from(row.cells).reduce(function (headers, header, currentIndex) {
          if (hasRowHeaders && currentIndex === 0) {
            return headers;
          }
          var colspan = header.colSpan,
            innerHTML = header.innerHTML;
          var nextHeader = colspan > 1 ? {
            label: innerHTML,
            colspan: colspan
          } : innerHTML;
          headers.push(nextHeader);
          return headers;
        }, []);
        rows.push(headersRow);
        return rows;
      }, []);
    } else if (hasColHeaders) {
      settingsObj.colHeaders = Array.from(thRows[0].children).reduce(function (headers, header, index) {
        if (hasRowHeaders && index === 0) {
          return headers;
        }
        headers.push(header.innerHTML);
        return headers;
      }, []);
    }
  }
  if (fixedRowsTop.length) {
    settingsObj.fixedRowsTop = fixedRowsTop.length;
  }
  if (fixedRowsBottom.length) {
    settingsObj.fixedRowsBottom = fixedRowsBottom.length;
  }
  var dataRows = [].concat(fixedRowsTop, _toConsumableArray(Array.from(checkElement.tBodies).reduce(function (sections, section) {
    sections.push.apply(sections, _toConsumableArray(Array.from(section.rows)));
    return sections;
  }, [])), _toConsumableArray(fixedRowsBottom));
  countRows = dataRows.length;
  var dataArr = new Array(countRows);
  for (var r = 0; r < countRows; r++) {
    dataArr[r] = new Array(countCols);
  }
  var mergeCells = [];
  var rowHeaders = [];
  for (var row = 0; row < countRows; row++) {
    var tr = dataRows[row];
    var cells = Array.from(tr.cells);
    var cellsLen = cells.length;
    for (var cellId = 0; cellId < cellsLen; cellId++) {
      var cell = cells[cellId];
      var nodeName = cell.nodeName,
        innerHTML = cell.innerHTML,
        rowspan = cell.rowSpan,
        colspan = cell.colSpan;
      var col = dataArr[row].findIndex(function (value) {
        return value === void 0;
      });
      if (nodeName === 'TD') {
        if (rowspan > 1 || colspan > 1) {
          for (var rstart = row; rstart < row + rowspan; rstart++) {
            if (rstart < countRows) {
              for (var cstart = col; cstart < col + colspan; cstart++) {
                dataArr[rstart][cstart] = null;
              }
            }
          }
          var styleAttr = cell.getAttribute('style');
          var ignoreMerge = styleAttr && styleAttr.includes('mso-ignore:colspan');
          if (!ignoreMerge) {
            mergeCells.push({
              col: col,
              row: row,
              rowspan: rowspan,
              colspan: colspan
            });
          }
        }
        var cellValue = '';
        if (generator && /excel/gi.test(generator.content)) {
          cellValue = innerHTML.replace(/[\r\n][\x20]{0,2}/g, '\x20').replace(/<br(\s*|\/)>[\r\n]?[\x20]{0,3}/gim, '\r\n');
        } else {
          cellValue = innerHTML.replace(/<br(\s*|\/)>[\r\n]?/gim, '\r\n');
        }
        dataArr[row][col] = cellValue.replace(regEscapedChars, function (match) {
          return ESCAPED_HTML_CHARS[match];
        });
      } else {
        rowHeaders.push(innerHTML);
      }
    }
  }
  if (mergeCells.length) {
    settingsObj.mergeCells = mergeCells;
  }
  if (rowHeaders.length) {
    settingsObj.rowHeaders = rowHeaders;
  }
  if (dataArr.length) {
    settingsObj.data = dataArr;
  }
  return settingsObj;
}