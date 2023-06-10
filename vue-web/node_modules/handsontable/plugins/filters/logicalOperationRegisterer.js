"use strict";

exports.__esModule = true;
exports.getOperationFunc = getOperationFunc;
exports.getOperationName = getOperationName;
exports.operations = void 0;
exports.registerOperation = registerOperation;
require("core-js/modules/es.function.name.js");
var operations = {};

/**
 * Get operation closure with pre-bound arguments.
 *
 * @param {string} id Operator `id`.
 * @returns {Function}
 */
exports.operations = operations;
function getOperationFunc(id) {
  if (!operations[id]) {
    throw Error("Operation with id \"".concat(id, "\" does not exist."));
  }
  var func = operations[id].func;
  return function (conditions, value) {
    return func(conditions, value);
  };
}

/**
 * Return name of operation which is displayed inside UI component, basing on it's `id`.
 *
 * @param {string} id `Id` of operation.
 * @returns {string}
 */
function getOperationName(id) {
  return operations[id].name;
}

/**
 * Operator registerer.
 *
 * @param {string} id Operation `id`.
 * @param {string} name Operation name which is displayed inside UI component.
 * @param {Function} func Operation function.
 */
function registerOperation(id, name, func) {
  operations[id] = {
    name: name,
    func: func
  };
}