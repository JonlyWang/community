"use strict";

require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.keys.js");
exports.__esModule = true;
var _exportNames = {
  createIndexMap: true,
  HidingMap: true,
  IndexMap: true,
  LinkedPhysicalIndexToValueMap: true,
  PhysicalIndexToValueMap: true,
  TrimmingMap: true
};
exports.createIndexMap = createIndexMap;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _hidingMap = require("./hidingMap");
exports.HidingMap = _hidingMap.HidingMap;
var _indexMap = require("./indexMap");
exports.IndexMap = _indexMap.IndexMap;
var _linkedPhysicalIndexToValueMap = require("./linkedPhysicalIndexToValueMap");
exports.LinkedPhysicalIndexToValueMap = _linkedPhysicalIndexToValueMap.LinkedPhysicalIndexToValueMap;
var _physicalIndexToValueMap = require("./physicalIndexToValueMap");
exports.PhysicalIndexToValueMap = _physicalIndexToValueMap.PhysicalIndexToValueMap;
var _trimmingMap = require("./trimmingMap");
exports.TrimmingMap = _trimmingMap.TrimmingMap;
var _indexesSequence = require("./indexesSequence");
Object.keys(_indexesSequence).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _indexesSequence[key]) return;
  exports[key] = _indexesSequence[key];
});
var _indexesSequence2 = require("./utils/indexesSequence");
Object.keys(_indexesSequence2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _indexesSequence2[key]) return;
  exports[key] = _indexesSequence2[key];
});
var availableIndexMapTypes = new Map([['hiding', _hidingMap.HidingMap], ['index', _indexMap.IndexMap], ['linkedPhysicalIndexToValue', _linkedPhysicalIndexToValueMap.LinkedPhysicalIndexToValueMap], ['physicalIndexToValue', _physicalIndexToValueMap.PhysicalIndexToValueMap], ['trimming', _trimmingMap.TrimmingMap]]);

/**
 * Creates and returns new IndexMap instance.
 *
 * @param {string} mapType The type of the map.
 * @param {*} [initValueOrFn=null] Initial value or function for index map.
 * @returns {IndexMap}
 */
function createIndexMap(mapType) {
  var initValueOrFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!availableIndexMapTypes.has(mapType)) {
    throw new Error("The provided map type (\"".concat(mapType, "\") does not exist."));
  }
  return new (availableIndexMapTypes.get(mapType))(initValueOrFn);
}