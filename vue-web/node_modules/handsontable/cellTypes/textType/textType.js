"use strict";

exports.__esModule = true;
exports.TextCellType = exports.CELL_TYPE = void 0;
var _textEditor = require("../../editors/textEditor");
var _textRenderer = require("../../renderers/textRenderer");
var CELL_TYPE = 'text';
exports.CELL_TYPE = CELL_TYPE;
var TextCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _textEditor.TextEditor,
  renderer: _textRenderer.textRenderer
};
exports.TextCellType = TextCellType;