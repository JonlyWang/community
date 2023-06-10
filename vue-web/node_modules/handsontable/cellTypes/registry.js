"use strict";

exports.__esModule = true;
exports.getCellType = _getItem;
exports.hasCellType = exports.getRegisteredCellTypes = exports.getRegisteredCellTypeNames = void 0;
exports.registerCellType = _register;
var _staticRegister2 = _interopRequireDefault(require("../utils/staticRegister"));
var _registry = require("../editors/registry");
var _registry2 = require("../renderers/registry");
var _registry3 = require("../validators/registry");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _staticRegister = (0, _staticRegister2.default)('cellTypes'),
  register = _staticRegister.register,
  getItem = _staticRegister.getItem,
  hasItem = _staticRegister.hasItem,
  getNames = _staticRegister.getNames,
  getValues = _staticRegister.getValues;

/**
 * Retrieve cell type object.
 *
 * @param {string} name Cell type identification.
 * @returns {object} Returns cell type object.
 */
exports.getRegisteredCellTypes = getValues;
exports.getRegisteredCellTypeNames = getNames;
exports.hasCellType = hasItem;
function _getItem(name) {
  if (!hasItem(name)) {
    throw Error("You declared cell type \"".concat(name, "\" as a string that is not mapped to a known object.\n                 Cell type must be an object or a string mapped to an object registered by\n                 \"Handsontable.cellTypes.registerCellType\" method"));
  }
  return getItem(name);
}

/**
 * Register cell type under specified name.
 *
 * @param {string} name Cell type identification.
 * @param {object} type An object with contains keys (eq: `editor`, `renderer`, `validator`) which describes specified behaviour of the cell.
 */
function _register(name, type) {
  if (typeof name !== 'string') {
    type = name;
    name = type.CELL_TYPE;
  }
  var _type = type,
    editor = _type.editor,
    renderer = _type.renderer,
    validator = _type.validator;
  if (editor) {
    (0, _registry.registerEditor)(name, editor);
  }
  if (renderer) {
    (0, _registry2.registerRenderer)(name, renderer);
  }
  if (validator) {
    (0, _registry3.registerValidator)(name, validator);
  }
  register(name, type);
}