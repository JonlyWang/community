"use strict";

exports.__esModule = true;
exports.HandsontableCellType = exports.CELL_TYPE = void 0;
var _handsontableEditor = require("../../editors/handsontableEditor");
var _autocompleteRenderer = require("../../renderers/autocompleteRenderer");
var CELL_TYPE = 'handsontable';
exports.CELL_TYPE = CELL_TYPE;
var HandsontableCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _handsontableEditor.HandsontableEditor,
  // displays small gray arrow on right side of the cell
  renderer: _autocompleteRenderer.autocompleteRenderer
};
exports.HandsontableCellType = HandsontableCellType;