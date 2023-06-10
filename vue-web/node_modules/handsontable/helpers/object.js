"use strict";

exports.__esModule = true;
exports.clone = clone;
exports.createObjectPropListener = createObjectPropListener;
exports.deepClone = deepClone;
exports.deepExtend = deepExtend;
exports.deepObjectSize = deepObjectSize;
exports.defineGetter = defineGetter;
exports.duckSchema = duckSchema;
exports.extend = extend;
exports.getProperty = getProperty;
exports.hasOwnProperty = hasOwnProperty;
exports.inherit = inherit;
exports.isObject = isObject;
exports.isObjectEqual = isObjectEqual;
exports.mixin = mixin;
exports.objectEach = objectEach;
exports.setProperty = setProperty;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _array = require("./array");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Generate schema for passed object.
 *
 * @param {Array|object} object An object to analyze.
 * @returns {Array|object}
 */
function duckSchema(object) {
  var schema;
  if (Array.isArray(object)) {
    schema = [];
  } else {
    schema = {};
    objectEach(object, function (value, key) {
      if (key === '__children') {
        return;
      }
      if (value && _typeof(value) === 'object' && !Array.isArray(value)) {
        schema[key] = duckSchema(value);
      } else if (Array.isArray(value)) {
        if (value.length && _typeof(value[0]) === 'object' && !Array.isArray(value[0])) {
          schema[key] = [duckSchema(value[0])];
        } else {
          schema[key] = [];
        }
      } else {
        schema[key] = null;
      }
    });
  }
  return schema;
}

/**
 * Inherit without without calling parent constructor, and setting `Child.prototype.constructor` to `Child` instead of `Parent`.
 * Creates temporary dummy function to call it as constructor.
 * Described in ticket: https://github.com/handsontable/handsontable/pull/516.
 *
 * @param {object} Child The child class.
 * @param {object} Parent The parent class.
 * @returns {object}
 */
function inherit(Child, Parent) {
  Parent.prototype.constructor = Parent;
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
  return Child;
}

/**
 * Perform shallow extend of a target object with extension's own properties.
 *
 * @param {object} target An object that will receive the new properties.
 * @param {object} extension An object containing additional properties to merge into the target.
 * @param {string[]} [writableKeys] An array of keys that are writable to target object.
 * @returns {object}
 */
function extend(target, extension, writableKeys) {
  var hasWritableKeys = Array.isArray(writableKeys);
  objectEach(extension, function (value, key) {
    if (hasWritableKeys === false || writableKeys.includes(key)) {
      target[key] = value;
    }
  });
  return target;
}

/**
 * Perform deep extend of a target object with extension's own properties.
 *
 * @param {object} target An object that will receive the new properties.
 * @param {object} extension An object containing additional properties to merge into the target.
 */
function deepExtend(target, extension) {
  objectEach(extension, function (value, key) {
    if (extension[key] && _typeof(extension[key]) === 'object') {
      if (!target[key]) {
        if (Array.isArray(extension[key])) {
          target[key] = [];
        } else if (Object.prototype.toString.call(extension[key]) === '[object Date]') {
          target[key] = extension[key];
        } else {
          target[key] = {};
        }
      }
      deepExtend(target[key], extension[key]);
    } else {
      target[key] = extension[key];
    }
  });
}

/**
 * Perform deep clone of an object.
 * WARNING! Only clones JSON properties. Will cause error when `obj` contains a function, Date, etc.
 *
 * @param {object} obj An object that will be cloned.
 * @returns {object}
 */
function deepClone(obj) {
  if (_typeof(obj) === 'object') {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
}

/**
 * Shallow clone object.
 *
 * @param {object} object An object to clone.
 * @returns {object}
 */
function clone(object) {
  var result = {};
  objectEach(object, function (value, key) {
    result[key] = value;
  });
  return result;
}

/**
 * Extend the Base object (usually prototype) of the functionality the `mixins` objects.
 *
 * @param {object} Base Base object which will be extended.
 * @param {object} mixins The object of the functionality will be "copied".
 * @returns {object}
 */
function mixin(Base) {
  if (!Base.MIXINS) {
    Base.MIXINS = [];
  }
  for (var _len = arguments.length, mixins = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }
  (0, _array.arrayEach)(mixins, function (mixinItem) {
    Base.MIXINS.push(mixinItem.MIXIN_NAME);
    objectEach(mixinItem, function (value, key) {
      if (Base.prototype[key] !== void 0) {
        throw new Error("Mixin conflict. Property '".concat(key, "' already exist and cannot be overwritten."));
      }
      if (typeof value === 'function') {
        Base.prototype[key] = value;
      } else {
        var getter = function _getter(property, initialValue) {
          var propertyName = "_".concat(property);
          var initValue = function initValue(newValue) {
            var result = newValue;
            if (Array.isArray(result) || isObject(result)) {
              result = deepClone(result);
            }
            return result;
          };
          return function () {
            if (this[propertyName] === void 0) {
              this[propertyName] = initValue(initialValue);
            }
            return this[propertyName];
          };
        };
        var setter = function _setter(property) {
          var propertyName = "_".concat(property);
          return function (newValue) {
            this[propertyName] = newValue;
          };
        };
        Object.defineProperty(Base.prototype, key, {
          get: getter(key, value),
          set: setter(key),
          configurable: true
        });
      }
    });
  });
  return Base;
}

/**
 * Checks if two objects or arrays are (deep) equal.
 *
 * @param {object|Array} object1 The first object to compare.
 * @param {object|Array} object2 The second object to compare.
 * @returns {boolean}
 */
function isObjectEqual(object1, object2) {
  return JSON.stringify(object1) === JSON.stringify(object2);
}

/**
 * Determines whether given object is a plain Object.
 * Note: String and Array are not plain Objects.
 *
 * @param {*} object An object to check.
 * @returns {boolean}
 */
function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}

/**
 * @param {object} object The object on which to define the property.
 * @param {string} property The name of the property to be defined or modified.
 * @param {*} value The value associated with the property.
 * @param {object} options The descriptor for the property being defined or modified.
 */
function defineGetter(object, property, value, options) {
  options.value = value;
  options.writable = options.writable !== false;
  options.enumerable = options.enumerable !== false;
  options.configurable = options.configurable !== false;
  Object.defineProperty(object, property, options);
}

/**
 * A specialized version of `.forEach` for objects.
 *
 * @param {object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {object} Returns `object`.
 */
function objectEach(object, iteratee) {
  // eslint-disable-next-line no-restricted-syntax
  for (var key in object) {
    if (!object.hasOwnProperty || object.hasOwnProperty && Object.prototype.hasOwnProperty.call(object, key)) {
      if (iteratee(object[key], key, object) === false) {
        break;
      }
    }
  }
  return object;
}

/**
 * Get object property by its name. Access to sub properties can be achieved by dot notation (e.q. `'foo.bar.baz'`).
 *
 * @param {object} object Object which value will be exported.
 * @param {string} name Object property name.
 * @returns {*}
 */
function getProperty(object, name) {
  var names = name.split('.');
  var result = object;
  objectEach(names, function (nameItem) {
    result = result[nameItem];
    if (result === void 0) {
      result = void 0;
      return false;
    }
  });
  return result;
}

/**
 * Set a property value on the provided object. Works on nested object prop names as well (e.g. `first.name`).
 *
 * @param {object} object Object to work on.
 * @param {string} name Prop name.
 * @param {*} value Value to be assigned at the provided property.
 */
function setProperty(object, name, value) {
  var names = name.split('.');
  var workingObject = object;
  names.forEach(function (propName, index) {
    if (index !== names.length - 1) {
      if (!hasOwnProperty(workingObject, propName)) {
        workingObject[propName] = {};
      }
      workingObject = workingObject[propName];
    } else {
      workingObject[propName] = value;
    }
  });
}

/**
 * Return object length (recursively).
 *
 * @param {*} object Object for which we want get length.
 * @returns {number}
 */
function deepObjectSize(object) {
  if (!isObject(object)) {
    return 0;
  }
  var recursObjLen = function recursObjLen(obj) {
    var result = 0;
    if (isObject(obj)) {
      objectEach(obj, function (value, key) {
        if (key === '__children') {
          return;
        }
        result += recursObjLen(value);
      });
    } else {
      result += 1;
    }
    return result;
  };
  return recursObjLen(object);
}

/**
 * Create object with property where its value change will be observed.
 *
 * @param {*} [defaultValue=undefined] Default value.
 * @param {string} [propertyToListen='value'] Property to listen.
 * @returns {object}
 */
function createObjectPropListener(defaultValue) {
  var _holder;
  var propertyToListen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
  var privateProperty = "_".concat(propertyToListen);
  var holder = (_holder = {
    _touched: false
  }, _defineProperty(_holder, privateProperty, defaultValue), _defineProperty(_holder, "isTouched", function isTouched() {
    return this._touched;
  }), _holder);
  Object.defineProperty(holder, propertyToListen, {
    get: function get() {
      return this[privateProperty];
    },
    set: function set(value) {
      this._touched = true;
      this[privateProperty] = value;
    },
    enumerable: true,
    configurable: true
  });
  return holder;
}

/**
 * Check if at specified `key` there is any value for `object`.
 *
 * @param {object} object Object to search value at specyfic key.
 * @param {string} key String key to check.
 * @returns {boolean}
 */
function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}