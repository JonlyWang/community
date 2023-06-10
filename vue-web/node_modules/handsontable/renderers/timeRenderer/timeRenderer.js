"use strict";

exports.__esModule = true;
exports.RENDERER_TYPE = void 0;
exports.timeRenderer = timeRenderer;
var _textRenderer = require("../textRenderer");
var RENDERER_TYPE = 'time';

/**
 * Default time renderer.
 *
 * @private
 * @param {Core} instance The Handsontable instance.
 * @param {HTMLTableCellElement} TD The rendered cell element.
 * @param {number} row The visual row index.
 * @param {number} col The visual column index.
 * @param {number|string} prop The column property (passed when datasource is an array of objects).
 * @param {*} value The rendered value.
 * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
 */
exports.RENDERER_TYPE = RENDERER_TYPE;
function timeRenderer(instance, TD, row, col, prop, value, cellProperties) {
  _textRenderer.textRenderer.apply(this, [instance, TD, row, col, prop, value, cellProperties]);
  TD.dir = 'ltr';
}
timeRenderer.RENDERER_TYPE = RENDERER_TYPE;