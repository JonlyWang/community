import { textRenderer } from "../textRenderer/index.mjs";
import { fastInnerHTML } from "../../helpers/dom/element.mjs";
import { rangeEach } from "../../helpers/number.mjs";
export var RENDERER_TYPE = 'password';

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
export function passwordRenderer(instance, TD, row, col, prop, value, cellProperties) {
  textRenderer.apply(this, [instance, TD, row, col, prop, value, cellProperties]);
  var hashLength = cellProperties.hashLength || TD.innerHTML.length;
  var hashSymbol = cellProperties.hashSymbol || '*';
  var hash = '';
  rangeEach(hashLength - 1, function () {
    hash += hashSymbol;
  });
  fastInnerHTML(TD, hash);
}
passwordRenderer.RENDERER_TYPE = RENDERER_TYPE;