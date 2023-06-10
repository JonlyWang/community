"use strict";

exports.__esModule = true;
exports.CONDITION_NAME = void 0;
exports.condition = condition;
var _conditionRegisterer = require("../conditionRegisterer");
var CONDITION_NAME = 'false';

/**
 * @returns {boolean}
 */
exports.CONDITION_NAME = CONDITION_NAME;
function condition() {
  return false;
}
(0, _conditionRegisterer.registerCondition)(CONDITION_NAME, condition, {
  name: 'False'
});