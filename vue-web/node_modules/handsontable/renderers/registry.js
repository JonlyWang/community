"use strict";

exports.__esModule = true;
exports.getRegisteredRenderers = exports.getRegisteredRendererNames = void 0;
exports.getRenderer = _getItem;
exports.hasRenderer = void 0;
exports.registerRenderer = _register;
var _staticRegister2 = _interopRequireDefault(require("../utils/staticRegister"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _staticRegister = (0, _staticRegister2.default)('renderers'),
  register = _staticRegister.register,
  getItem = _staticRegister.getItem,
  hasItem = _staticRegister.hasItem,
  getNames = _staticRegister.getNames,
  getValues = _staticRegister.getValues;

/**
 * Retrieve renderer function.
 *
 * @param {string} name Renderer identification.
 * @returns {Function} Returns renderer function.
 */
exports.getRegisteredRenderers = getValues;
exports.getRegisteredRendererNames = getNames;
exports.hasRenderer = hasItem;
function _getItem(name) {
  if (typeof name === 'function') {
    return name;
  }
  if (!hasItem(name)) {
    throw Error("No registered renderer found under \"".concat(name, "\" name"));
  }
  return getItem(name);
}

/**
 * Register renderer under its alias.
 *
 * @param {string|Function} name Renderer's alias or renderer function with its descriptor.
 * @param {Function} [renderer] Renderer function.
 */
function _register(name, renderer) {
  if (typeof name !== 'string') {
    renderer = name;
    name = renderer.RENDERER_TYPE;
  }
  register(name, renderer);
}