"use strict";

exports.__esModule = true;
exports.NumericCellType = exports.CELL_TYPE = void 0;
var _numericEditor = require("../../editors/numericEditor");
var _numericRenderer = require("../../renderers/numericRenderer");
var _numericValidator = require("../../validators/numericValidator");
var CELL_TYPE = 'numeric';
exports.CELL_TYPE = CELL_TYPE;
var NumericCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _numericEditor.NumericEditor,
  renderer: _numericRenderer.numericRenderer,
  validator: _numericValidator.numericValidator,
  dataType: 'number'
};
exports.NumericCellType = NumericCellType;