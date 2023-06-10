"use strict";

exports.__esModule = true;
exports.DropdownCellType = exports.CELL_TYPE = void 0;
var _dropdownEditor = require("../../editors/dropdownEditor");
var _autocompleteRenderer = require("../../renderers/autocompleteRenderer");
var _autocompleteValidator = require("../../validators/autocompleteValidator");
var CELL_TYPE = 'dropdown';
exports.CELL_TYPE = CELL_TYPE;
var DropdownCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _dropdownEditor.DropdownEditor,
  // displays small gray arrow on right side of the cell
  renderer: _autocompleteRenderer.autocompleteRenderer,
  validator: _autocompleteValidator.autocompleteValidator
};
exports.DropdownCellType = DropdownCellType;