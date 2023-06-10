import staticRegister from "../utils/staticRegister.mjs";
import { registerEditor } from "../editors/registry.mjs";
import { registerRenderer } from "../renderers/registry.mjs";
import { registerValidator } from "../validators/registry.mjs";
var _staticRegister = staticRegister('cellTypes'),
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
    registerEditor(name, editor);
  }
  if (renderer) {
    registerRenderer(name, renderer);
  }
  if (validator) {
    registerValidator(name, validator);
  }
  register(name, type);
}
export { _register as registerCellType, _getItem as getCellType, hasItem as hasCellType, getNames as getRegisteredCellTypeNames, getValues as getRegisteredCellTypes };