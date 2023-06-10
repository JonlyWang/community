import staticRegister from "../utils/staticRegister.mjs";
var _staticRegister = staticRegister('renderers'),
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
export { _register as registerRenderer, _getItem as getRenderer, hasItem as hasRenderer, getNames as getRegisteredRendererNames, getValues as getRegisteredRenderers };