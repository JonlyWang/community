import "core-js/modules/es.object.to-string.js";
import * as C from "../../../i18n/constants.mjs";
import { registerOperation } from "../logicalOperationRegisterer.mjs";
export var OPERATION_ID = 'disjunction';
export var SHORT_NAME_FOR_COMPONENT = C.FILTERS_LABELS_DISJUNCTION;
// (p OR q OR w OR x OR...) === TRUE?

/**
 * @param {Array} conditions An array with values to check.
 * @param {*} value The comparable value.
 * @returns {boolean}
 */
export function operationResult(conditions, value) {
  return conditions.some(function (condition) {
    return condition.func(value);
  });
}
registerOperation(OPERATION_ID, SHORT_NAME_FOR_COMPONENT, operationResult);