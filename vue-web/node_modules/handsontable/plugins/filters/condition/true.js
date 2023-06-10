"use strict";

exports.__esModule = true;
exports.CONDITION_NAME = void 0;
exports.condition = condition;
var _conditionRegisterer = require("../conditionRegisterer");
var CONDITION_NAME = 'true';

/**
 * @returns {boolean}
 */
exports.CONDITION_NAME = CONDITION_NAME;
function condition() {
  return true;
}
(0, _conditionRegisterer.registerCondition)(CONDITION_NAME, condition, {
  name: 'True'
});