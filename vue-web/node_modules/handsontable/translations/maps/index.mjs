import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { HidingMap } from "./hidingMap.mjs";
import { IndexMap } from "./indexMap.mjs";
import { LinkedPhysicalIndexToValueMap } from "./linkedPhysicalIndexToValueMap.mjs";
import { PhysicalIndexToValueMap } from "./physicalIndexToValueMap.mjs";
import { TrimmingMap } from "./trimmingMap.mjs";
export * from "./indexesSequence.mjs";
export * from "./utils/indexesSequence.mjs";
export { HidingMap, IndexMap, LinkedPhysicalIndexToValueMap, PhysicalIndexToValueMap, TrimmingMap };
var availableIndexMapTypes = new Map([['hiding', HidingMap], ['index', IndexMap], ['linkedPhysicalIndexToValue', LinkedPhysicalIndexToValueMap], ['physicalIndexToValue', PhysicalIndexToValueMap], ['trimming', TrimmingMap]]);

/**
 * Creates and returns new IndexMap instance.
 *
 * @param {string} mapType The type of the map.
 * @param {*} [initValueOrFn=null] Initial value or function for index map.
 * @returns {IndexMap}
 */
export function createIndexMap(mapType) {
  var initValueOrFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!availableIndexMapTypes.has(mapType)) {
    throw new Error("The provided map type (\"".concat(mapType, "\") does not exist."));
  }
  return new (availableIndexMapTypes.get(mapType))(initValueOrFn);
}