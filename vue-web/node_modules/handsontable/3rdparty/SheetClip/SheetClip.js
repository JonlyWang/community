"use strict";

exports.__esModule = true;
exports.parse = parse;
exports.stringify = stringify;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.fill.js");
require("core-js/modules/es.array.index-of.js");
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * SheetClip - Spreadsheet Clipboard Parser.
 * version 0.2
 *
 * This tiny library transforms JavaScript arrays to strings that are pasteable by LibreOffice, OpenOffice,
 * Google Docs and Microsoft Excel.
 *
 * Copyright 2012, Marcin Warpechowski
 * Licensed under the MIT license.
 * http://github.com/warpech/sheetclip/
 */

var regUniversalNewLine = /^(\r\n|\n\r|\r|\n)/;
var regNextCellNoQuotes = /^[^\t\r\n]+/;
var regNextEmptyCell = /^\t/;

/**
 * Decode spreadsheet string into array.
 *
 * @param {string} str The string to parse.
 * @returns {Array}
 */
function parse(str) {
  var arr = [['']];
  if (str.length === 0) {
    return arr;
  }
  var column = 0;
  var row = 0;
  var lastLength;
  while (str.length > 0) {
    if (lastLength === str.length) {
      // In the case If in last cycle we didn't match anything, we have to leave the infinite loop
      break;
    }
    lastLength = str.length;
    if (str.match(regNextEmptyCell)) {
      str = str.replace(regNextEmptyCell, '');
      column += 1;
      arr[row][column] = '';
    } else if (str.match(regUniversalNewLine)) {
      str = str.replace(regUniversalNewLine, '');
      column = 0;
      row += 1;
      arr[row] = [''];
    } else {
      var nextCell = '';
      if (str.startsWith('"')) {
        var quoteNo = 0;
        var isStillCell = true;
        while (isStillCell) {
          var nextChar = str.slice(0, 1);
          if (nextChar === '"') {
            quoteNo += 1;
          }
          nextCell += nextChar;
          str = str.slice(1);
          if (str.length === 0 || str.match(/^[\t\r\n]/) && quoteNo % 2 === 0) {
            isStillCell = false;
          }
        }
        nextCell = nextCell.replace(/^"/, '').replace(/"$/, '').replace(/["]*/g, function (match) {
          return new Array(Math.floor(match.length / 2)).fill('"').join('');
        });
      } else {
        var matchedText = str.match(regNextCellNoQuotes);
        nextCell = matchedText ? matchedText[0] : '';
        str = str.slice(nextCell.length);
      }
      arr[row][column] = nextCell;
    }
  }
  return arr;
}

/**
 * Encode array into valid spreadsheet string.
 *
 * @param {Array} arr An array of arrays to stringify.
 * @returns {string}
 */
function stringify(arr) {
  var r;
  var rLen;
  var c;
  var cLen;
  var str = '';
  var val;
  for (r = 0, rLen = arr.length; r < rLen; r += 1) {
    cLen = arr[r].length;
    for (c = 0; c < cLen; c += 1) {
      if (c > 0) {
        str += '\t';
      }
      val = arr[r][c];
      if (typeof val === 'string') {
        if (val.indexOf('\n') > -1) {
          str += "\"".concat(val.replace(/"/g, '""'), "\"");
        } else {
          str += val;
        }
      } else if (val === null || val === void 0) {
        // void 0 resolves to undefined
        str += '';
      } else {
        str += val;
      }
    }
    if (r !== rLen - 1) {
      str += '\n';
    }
  }
  return str;
}