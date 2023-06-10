"use strict";

exports.__esModule = true;
exports.hasValidParameter = hasValidParameter;
exports.holder = void 0;
exports.isRootInstance = isRootInstance;
exports.registerAsRootInstance = registerAsRootInstance;
exports.rootInstanceSymbol = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
var holder = new WeakMap();
exports.holder = holder;
var rootInstanceSymbol = Symbol('rootInstance');

/**
 * Register an object as a root instance.
 *
 * @param  {object} object An object to associate with root instance flag.
 */
exports.rootInstanceSymbol = rootInstanceSymbol;
function registerAsRootInstance(object) {
  holder.set(object, true);
}

/**
 * Check if the source of the root indication call is valid.
 *
 * @param  {symbol} rootSymbol A symbol as a source of truth.
 * @returns {boolean}
 */
function hasValidParameter(rootSymbol) {
  return rootSymbol === rootInstanceSymbol;
}

/**
 * Check if passed an object was flagged as a root instance.
 *
 * @param  {object} object An object to check.
 * @returns {boolean}
 */
function isRootInstance(object) {
  return holder.has(object);
}