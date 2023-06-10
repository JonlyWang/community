"use strict";

exports.__esModule = true;
exports.PasswordCellType = exports.CELL_TYPE = void 0;
var _passwordEditor = require("../../editors/passwordEditor");
var _passwordRenderer = require("../../renderers/passwordRenderer");
var CELL_TYPE = 'password';
exports.CELL_TYPE = CELL_TYPE;
var PasswordCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _passwordEditor.PasswordEditor,
  renderer: _passwordRenderer.passwordRenderer,
  copyable: false
};
exports.PasswordCellType = PasswordCellType;