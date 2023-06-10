"use strict";

exports.__esModule = true;
exports.RENDER_TYPE = exports.PARTIALLY_VISIBLE_TYPE = exports.FULLY_VISIBLE_TYPE = void 0;
/**
 * Render type calculation calculates how many DOM nodes should be created and where placed
 * based on `startRow` and `endRow` properties.
 *
 * @type {number}
 */
var RENDER_TYPE = 1;
/**
 * Fully visible type calculation calculates rows that are fully visible in the viewport.
 * This type of calculation is used in scrolling by arrow keys navigation.
 *
 * @type {number}
 */
exports.RENDER_TYPE = RENDER_TYPE;
var FULLY_VISIBLE_TYPE = 2;
/**
 * Partially visible type calculation calculates rows that are fully and partially visible in
 * the viewport. This type of calculation is used to check `endRow` (or `startRow`) with properties
 * calculated in render calculator. If checking met the criteria slow render is
 * performed (which render calculator with new data).
 *
 * @type {number}
 */
exports.FULLY_VISIBLE_TYPE = FULLY_VISIBLE_TYPE;
var PARTIALLY_VISIBLE_TYPE = 3;
exports.PARTIALLY_VISIBLE_TYPE = PARTIALLY_VISIBLE_TYPE;