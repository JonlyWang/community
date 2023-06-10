"use strict";

exports.__esModule = true;
exports.CLONE_TYPES = exports.CLONE_TOP_INLINE_START_CORNER = exports.CLONE_TOP = exports.CLONE_INLINE_START = exports.CLONE_CLASS_NAMES = exports.CLONE_BOTTOM_INLINE_START_CORNER = exports.CLONE_BOTTOM = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
/**
 * @typedef {'top'|'bottom'|'inline_start'|'top_inline_start_corner'|'bottom_inline_start_corner'} CLONE_TYPES_ENUM
 */
var CLONE_TOP = 'top';
exports.CLONE_TOP = CLONE_TOP;
var CLONE_BOTTOM = 'bottom';
exports.CLONE_BOTTOM = CLONE_BOTTOM;
var CLONE_INLINE_START = 'inline_start';
exports.CLONE_INLINE_START = CLONE_INLINE_START;
var CLONE_TOP_INLINE_START_CORNER = 'top_inline_start_corner';
exports.CLONE_TOP_INLINE_START_CORNER = CLONE_TOP_INLINE_START_CORNER;
var CLONE_BOTTOM_INLINE_START_CORNER = 'bottom_inline_start_corner';
exports.CLONE_BOTTOM_INLINE_START_CORNER = CLONE_BOTTOM_INLINE_START_CORNER;
var CLONE_TYPES = [CLONE_TOP, CLONE_BOTTOM, CLONE_INLINE_START, CLONE_TOP_INLINE_START_CORNER, CLONE_BOTTOM_INLINE_START_CORNER];
exports.CLONE_TYPES = CLONE_TYPES;
var CLONE_CLASS_NAMES = new Map([[CLONE_TOP, "ht_clone_".concat(CLONE_TOP)], [CLONE_BOTTOM, "ht_clone_".concat(CLONE_BOTTOM)], [CLONE_INLINE_START, "ht_clone_".concat(CLONE_INLINE_START, " ht_clone_left")], [CLONE_TOP_INLINE_START_CORNER, "ht_clone_".concat(CLONE_TOP_INLINE_START_CORNER, " ht_clone_top_left_corner")], [CLONE_BOTTOM_INLINE_START_CORNER, "ht_clone_".concat(CLONE_BOTTOM_INLINE_START_CORNER, " ht_clone_bottom_left_corner")]]);
exports.CLONE_CLASS_NAMES = CLONE_CLASS_NAMES;