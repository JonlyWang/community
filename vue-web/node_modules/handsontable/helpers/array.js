"use strict";

exports.__esModule = true;
exports.arrayAvg = arrayAvg;
exports.arrayEach = arrayEach;
exports.arrayFilter = arrayFilter;
exports.arrayFlatten = arrayFlatten;
exports.arrayMap = arrayMap;
exports.arrayMax = arrayMax;
exports.arrayMin = arrayMin;
exports.arrayReduce = arrayReduce;
exports.arraySum = arraySum;
exports.arrayUnique = arrayUnique;
exports.extendArray = extendArray;
exports.getDifferenceOfArrays = getDifferenceOfArrays;
exports.getIntersectionOfArrays = getIntersectionOfArrays;
exports.getUnionOfArrays = getUnionOfArrays;
exports.pivot = pivot;
exports.stringToArray = stringToArray;
exports.to2dArray = to2dArray;
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.set.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.split.js");
/**
 * @param {Array} arr An array to process.
 */
function to2dArray(arr) {
  var ilen = arr.length;
  var i = 0;
  while (i < ilen) {
    arr[i] = [arr[i]];
    i += 1;
  }
}

/**
 * @param {Array} arr An array to extend.
 * @param {Array} extension The data to extend from.
 */
function extendArray(arr, extension) {
  var ilen = extension.length;
  var i = 0;
  while (i < ilen) {
    arr.push(extension[i]);
    i += 1;
  }
}

/**
 * @param {Array} arr An array to pivot.
 * @returns {Array}
 */
function pivot(arr) {
  var pivotedArr = [];
  if (!arr || arr.length === 0 || !arr[0] || arr[0].length === 0) {
    return pivotedArr;
  }
  var rowCount = arr.length;
  var colCount = arr[0].length;
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < colCount; j++) {
      if (!pivotedArr[j]) {
        pivotedArr[j] = [];
      }
      pivotedArr[j][i] = arr[i][j];
    }
  }
  return pivotedArr;
}

/**
 * A specialized version of `.reduce` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * {@link https://github.com/lodash/lodash/blob/master/lodash.js}.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initFromArray] Specify using the first element of `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initFromArray) {
  var index = -1;
  var iterable = array;
  var result = accumulator;
  if (!Array.isArray(array)) {
    iterable = Array.from(array);
  }
  var length = iterable.length;
  if (initFromArray && length) {
    index += 1;
    result = iterable[index];
  }
  index += 1;
  while (index < length) {
    result = iteratee(result, iterable[index], index, iterable);
    index += 1;
  }
  return result;
}

/**
 * A specialized version of `.filter` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * {@link https://github.com/lodash/lodash/blob/master/lodash.js}.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = 0;
  var iterable = array;
  if (!Array.isArray(array)) {
    iterable = Array.from(array);
  }
  var length = iterable.length;
  var result = [];
  var resIndex = -1;
  while (index < length) {
    var value = iterable[index];
    if (predicate(value, index, iterable)) {
      resIndex += 1;
      result[resIndex] = value;
    }
    index += 1;
  }
  return result;
}

/**
 * A specialized version of `.map` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayMap(array, iteratee) {
  var index = 0;
  var iterable = array;
  if (!Array.isArray(array)) {
    iterable = Array.from(array);
  }
  var length = iterable.length;
  var result = [];
  var resIndex = -1;
  while (index < length) {
    var value = iterable[index];
    resIndex += 1;
    result[resIndex] = iteratee(value, index, iterable);
    index += 1;
  }
  return result;
}

/**
 * A specialized version of `.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * {@link https://github.com/lodash/lodash/blob/master/lodash.js}.
 *
 * @param {Array|*} array The array to iterate over or an any element with implemented iterator protocol.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = 0;
  var iterable = array;
  if (!Array.isArray(array)) {
    iterable = Array.from(array);
  }
  var length = iterable.length;
  while (index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
    index += 1;
  }
  return array;
}

/**
 * Calculate sum value for each item of the array.
 *
 * @param {Array} array The array to process.
 * @returns {number} Returns calculated sum value.
 */
function arraySum(array) {
  return arrayReduce(array, function (a, b) {
    return a + b;
  }, 0);
}

/**
 * Returns the highest value from an array. Can be array of numbers or array of strings.
 * NOTICE: Mixed values is not supported.
 *
 * @param {Array} array The array to process.
 * @returns {number} Returns the highest value from an array.
 */
function arrayMax(array) {
  return arrayReduce(array, function (a, b) {
    return a > b ? a : b;
  }, Array.isArray(array) ? array[0] : void 0);
}

/**
 * Returns the lowest value from an array. Can be array of numbers or array of strings.
 * NOTICE: Mixed values is not supported.
 *
 * @param {Array} array The array to process.
 * @returns {number} Returns the lowest value from an array.
 */
function arrayMin(array) {
  return arrayReduce(array, function (a, b) {
    return a < b ? a : b;
  }, Array.isArray(array) ? array[0] : void 0);
}

/**
 * Calculate average value for each item of the array.
 *
 * @param {Array} array The array to process.
 * @returns {number} Returns calculated average value.
 */
function arrayAvg(array) {
  if (!array.length) {
    return 0;
  }
  return arraySum(array) / array.length;
}

/**
 * Flatten multidimensional array.
 *
 * @param {Array} array Array of Arrays.
 * @returns {Array}
 */
function arrayFlatten(array) {
  return arrayReduce(array, function (initial, value) {
    return initial.concat(Array.isArray(value) ? arrayFlatten(value) : value);
  }, []);
}

/**
 * Unique values in the array.
 *
 * @param {Array} array The array to process.
 * @returns {Array}
 */
function arrayUnique(array) {
  var unique = [];
  arrayEach(array, function (value) {
    if (unique.indexOf(value) === -1) {
      unique.push(value);
    }
  });
  return unique;
}

/**
 * Differences from two or more arrays.
 *
 * @param {...Array} arrays Array of strings or array of numbers.
 * @returns {Array} Returns the difference between arrays.
 */
function getDifferenceOfArrays() {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }
  var _ref = [].concat(arrays),
    first = _ref[0],
    rest = _ref.slice(1);
  var filteredFirstArray = first;
  arrayEach(rest, function (array) {
    filteredFirstArray = filteredFirstArray.filter(function (value) {
      return !array.includes(value);
    });
  });
  return filteredFirstArray;
}

/**
 * Intersection of two or more arrays.
 *
 * @param {...Array} arrays Array of strings or array of numbers.
 * @returns {Array} Returns elements that exists in every array.
 */
function getIntersectionOfArrays() {
  for (var _len2 = arguments.length, arrays = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arrays[_key2] = arguments[_key2];
  }
  var _ref2 = [].concat(arrays),
    first = _ref2[0],
    rest = _ref2.slice(1);
  var filteredFirstArray = first;
  arrayEach(rest, function (array) {
    filteredFirstArray = filteredFirstArray.filter(function (value) {
      return array.includes(value);
    });
  });
  return filteredFirstArray;
}

/**
 * Union of two or more arrays.
 *
 * @param {...Array} arrays Array of strings or array of numbers.
 * @returns {Array} Returns the elements that exist in any of the arrays, without duplicates.
 */
function getUnionOfArrays() {
  for (var _len3 = arguments.length, arrays = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    arrays[_key3] = arguments[_key3];
  }
  var _ref3 = [].concat(arrays),
    first = _ref3[0],
    rest = _ref3.slice(1);
  var set = new Set(first);
  arrayEach(rest, function (array) {
    arrayEach(array, function (value) {
      if (!set.has(value)) {
        set.add(value);
      }
    });
  });
  return Array.from(set);
}

/**
 * Convert a separated strings to an array of strings.
 *
 * @param {string} value A string of class name(s).
 * @param {string|RegExp} delimiter The pattern describing where each split should occur.
 * @returns {string[]} Returns array of string or empty array.
 */
function stringToArray(value) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  return value.split(delimiter);
}