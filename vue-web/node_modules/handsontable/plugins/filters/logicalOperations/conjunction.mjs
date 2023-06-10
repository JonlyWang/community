import "core-js/modules/es.object.to-string.js";
import * as C from "../../../i18n/constants.mjs";
import { registerOperation } from "../logicalOperationRegisterer.mjs";
export var OPERATION_ID = 'conjunction';
export var SHORT_NAME_FOR_COMPONENT = C.FILTERS_LABELS_CONJUNCTION;
// p AND q AND w AND x AND... === TRUE?

/**
 * @param {Array} conditions An array with values to check.
 * @param {*} value The comparable value.
 * @returns {boolean}
 */
export function operationResult(conditions, value) {
  return conditions.every(function (condition) {
    return condition.func(value);
  });
}
registerOperation(OPERATION_ID, SHORT_NAME_FOR_COMPONENT, operationResult);