"use strict";

exports.__esModule = true;
exports.normalizeKeys = exports.normalizeEventKey = exports.getKeysList = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.map.js");
// This file handles key-name discrepancies between browsers.
// For the list of discrepancies, go to: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values.
var mappings = new Map([[' ', 'space'],
// custom mapping
['spacebar', 'space'], ['scroll', 'scrolllock'], ['del', 'delete'], ['esc', 'escape'], ['medianexttrack', 'mediatracknext'], ['mediaprevioustrack', 'mediatrackprevious'], ['volumeup', 'audiovolumeup'], ['volumedown', 'audiovolumedown'], ['volumemute', 'audiovolumemute'], ['multiply', '*'], ['add', '+'], ['divide', '/'], ['subtract', '-'], ['left', 'arrowleft'], ['right', 'arrowright'], ['up', 'arrowup'], ['down', 'arrowdown']]);

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * Get a single, normalized string from the list of the `KeyboardEvent.key` properties.
 *
 * @param {Array<string>} keys The list of the `KeyboardEvent.key` properties
 * @returns {string}
 */
var normalizeKeys = function normalizeKeys(keys) {
  return keys.map(function (key) {
    var lowercaseKey = key.toLowerCase();
    if (mappings.has(lowercaseKey)) {
      return mappings.get(lowercaseKey);
    }
    return lowercaseKey;
  }).sort().join('+');
};

/**
 * Get the list of the `KeyboardEvent.key` properties from a single, normalized string.
 *
 * @param {string} normalizedKeys A single, normalized string that contains the list of the `KeyboardEvent.key` properties
 * @returns {Array<string>}
 */
exports.normalizeKeys = normalizeKeys;
var getKeysList = function getKeysList(normalizedKeys) {
  return normalizedKeys.split('+');
};

/**
 * Normalize a `KeyboardEvent.key` property, to use it for keyboard shortcuts.
 *
 * @param {string} key KeyboardEvent's key property.
 * @returns {string}
 */
exports.getKeysList = getKeysList;
var normalizeEventKey = function normalizeEventKey(key) {
  return key.toLowerCase();
};
exports.normalizeEventKey = normalizeEventKey;