import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
/**
 * Utility to register editors and common namespace for keeping reference to all editor classes.
 */import Hooks from "../pluginHooks.mjs";
import staticRegister from "../utils/staticRegister.mjs";
var registeredEditorClasses = new WeakMap();
var _staticRegister = staticRegister('editors'),
  register = _staticRegister.register,
  getItem = _staticRegister.getItem,
  hasItem = _staticRegister.hasItem,
  getNames = _staticRegister.getNames,
  getValues = _staticRegister.getValues;

/**
 * @param {BaseEditor} editorClass The editor constructor.
 */
export function RegisteredEditor(editorClass) {
  var instances = {};
  var Clazz = editorClass;
  this.getConstructor = function () {
    return editorClass;
  };
  this.getInstance = function (hotInstance) {
    if (!(hotInstance.guid in instances)) {
      instances[hotInstance.guid] = new Clazz(hotInstance);
    }
    return instances[hotInstance.guid];
  };
  Hooks.getSingleton().add('afterDestroy', function () {
    instances[this.guid] = null;
  });
}

/**
 * Returns instance (singleton) of editor class.
 *
 * @param {string} name Name of an editor under which it has been stored.
 * @param {object} hotInstance Instance of Handsontable.
 * @returns {Function} Returns instance of editor.
 */
export function _getEditorInstance(name, hotInstance) {
  var editor;
  if (typeof name === 'function') {
    if (!registeredEditorClasses.get(name)) {
      _register(null, name);
    }
    editor = registeredEditorClasses.get(name);
  } else if (typeof name === 'string') {
    editor = getItem(name);
  } else {
    throw Error('Only strings and functions can be passed as "editor" parameter');
  }
  if (!editor) {
    throw Error("No editor registered under name \"".concat(name, "\""));
  }
  return editor.getInstance(hotInstance);
}

/**
 * Retrieve editor class.
 *
 * @param {string} name Editor identification.
 * @returns {Function} Returns editor class.
 */
function _getItem(name) {
  if (!hasItem(name)) {
    throw Error("No registered editor found under \"".concat(name, "\" name"));
  }
  return getItem(name).getConstructor();
}

/**
 * Register editor class under specified name.
 *
 * @param {string} name Editor identification.
 * @param {Function} editorClass Editor class.
 */
function _register(name, editorClass) {
  if (name && typeof name !== 'string') {
    editorClass = name;
    name = editorClass.EDITOR_TYPE;
  }
  var editorWrapper = new RegisteredEditor(editorClass);
  if (typeof name === 'string') {
    register(name, editorWrapper);
  }
  registeredEditorClasses.set(editorClass, editorWrapper);
}
export { _register as registerEditor, _getItem as getEditor, _getEditorInstance as getEditorInstance, hasItem as hasEditor, getNames as getRegisteredEditorNames, getValues as getRegisteredEditors };