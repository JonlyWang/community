"use strict";

exports.__esModule = true;
exports.CheckboxCellType = exports.CELL_TYPE = void 0;
var _checkboxEditor = require("../../editors/checkboxEditor");
var _checkboxRenderer = require("../../renderers/checkboxRenderer");
var CELL_TYPE = 'checkbox';
exports.CELL_TYPE = CELL_TYPE;
var CheckboxCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _checkboxEditor.CheckboxEditor,
  renderer: _checkboxRenderer.checkboxRenderer
};
exports.CheckboxCellType = CheckboxCellType;