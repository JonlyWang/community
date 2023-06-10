import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
/**
 * @typedef {'top'|'bottom'|'inline_start'|'top_inline_start_corner'|'bottom_inline_start_corner'} CLONE_TYPES_ENUM
 */
export var CLONE_TOP = 'top';
export var CLONE_BOTTOM = 'bottom';
export var CLONE_INLINE_START = 'inline_start';
export var CLONE_TOP_INLINE_START_CORNER = 'top_inline_start_corner';
export var CLONE_BOTTOM_INLINE_START_CORNER = 'bottom_inline_start_corner';
export var CLONE_TYPES = [CLONE_TOP, CLONE_BOTTOM, CLONE_INLINE_START, CLONE_TOP_INLINE_START_CORNER, CLONE_BOTTOM_INLINE_START_CORNER];
export var CLONE_CLASS_NAMES = new Map([[CLONE_TOP, "ht_clone_".concat(CLONE_TOP)], [CLONE_BOTTOM, "ht_clone_".concat(CLONE_BOTTOM)], [CLONE_INLINE_START, "ht_clone_".concat(CLONE_INLINE_START, " ht_clone_left")], [CLONE_TOP_INLINE_START_CORNER, "ht_clone_".concat(CLONE_TOP_INLINE_START_CORNER, " ht_clone_top_left_corner")], [CLONE_BOTTOM_INLINE_START_CORNER, "ht_clone_".concat(CLONE_BOTTOM_INLINE_START_CORNER, " ht_clone_bottom_left_corner")]]);