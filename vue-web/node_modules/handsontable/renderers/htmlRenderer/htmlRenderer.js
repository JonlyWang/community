"use strict";

exports.__esModule = true;
exports.RENDERER_TYPE = void 0;
exports.htmlRenderer = htmlRenderer;
var _baseRenderer = require("../baseRenderer");
var _element = require("../../helpers/dom/element");
var RENDERER_TYPE = 'html';

/**
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
function htmlRenderer(instance, TD, row, col, prop, value, cellProperties) {
  _baseRenderer.baseRenderer.apply(this, [instance, TD, row, col, prop, value, cellProperties]);
  (0, _element.fastInnerHTML)(TD, value === null || value === void 0 ? '' : value, false);
}
htmlRenderer.RENDERER_TYPE = RENDERER_TYPE;