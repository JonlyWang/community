import { registerCondition } from "../conditionRegisterer.mjs";
export var CONDITION_NAME = 'true';

/**
 * @returns {boolean}
 */
export function condition() {
  return true;
}
registerCondition(CONDITION_NAME, condition, {
  name: 'True'
});