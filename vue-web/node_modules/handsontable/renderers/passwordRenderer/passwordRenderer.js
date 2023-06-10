"use strict";

exports.__esModule = true;
exports.RENDERER_TYPE = void 0;
exports.passwordRenderer = passwordRenderer;
var _textRenderer = require("../textRenderer");
var _element = require("../../helpers/dom/element");
var _number = require("../../helpers/number");
var RENDERER_TYPE = 'password';

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
function passwordRenderer(instance, TD, row, col, prop, value, cellProperties) {
  _textRenderer.textRenderer.apply(this, [instance, TD, row, col, prop, value, cellProperties]);
  var hashLength = cellProperties.hashLength || TD.innerHTML.length;
  var hashSymbol = cellProperties.hashSymbol || '*';
  var hash = '';
  (0, _number.rangeEach)(hashLength - 1, function () {
    hash += hashSymbol;
  });
  (0, _element.fastInnerHTML)(TD, hash);
}
passwordRenderer.RENDERER_TYPE = RENDERER_TYPE;