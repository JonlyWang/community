"use strict";

exports.__esModule = true;
exports.TimeCellType = exports.CELL_TYPE = void 0;
var _timeEditor = require("../../editors/timeEditor");
var _timeRenderer = require("../../renderers/timeRenderer");
var _timeValidator = require("../../validators/timeValidator");
var CELL_TYPE = 'time';
exports.CELL_TYPE = CELL_TYPE;
var TimeCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _timeEditor.TimeEditor,
  renderer: _timeRenderer.timeRenderer,
  validator: _timeValidator.timeValidator
};
exports.TimeCellType = TimeCellType;