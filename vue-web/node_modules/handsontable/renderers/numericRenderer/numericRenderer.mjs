import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.join.js";
import numbro from 'numbro';
import { textRenderer } from "../textRenderer/index.mjs";
import { isNumeric } from "../../helpers/number.mjs";
export var RENDERER_TYPE = 'numeric';

/**
 * Numeric cell renderer.
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
export function numericRenderer(instance, TD, row, col, prop, value, cellProperties) {
  var newValue = value;
  if (isNumeric(newValue)) {
    var numericFormat = cellProperties.numericFormat;
    var cellCulture = numericFormat && numericFormat.culture || '-';
    var cellFormatPattern = numericFormat && numericFormat.pattern;
    var className = cellProperties.className || '';
    var classArr = className.length ? className.split(' ') : [];
    if (typeof cellCulture !== 'undefined' && !numbro.languages()[cellCulture]) {
      var shortTag = cellCulture.replace('-', '');
      var langData = numbro.allLanguages ? numbro.allLanguages[cellCulture] : numbro[shortTag];
      if (langData) {
        numbro.registerLanguage(langData);
      }
    }
    numbro.setLanguage(cellCulture);
    newValue = numbro(newValue).format(cellFormatPattern || '0');
    if (classArr.indexOf('htLeft') < 0 && classArr.indexOf('htCenter') < 0 && classArr.indexOf('htRight') < 0 && classArr.indexOf('htJustify') < 0) {
      classArr.push('htRight');
    }
    if (classArr.indexOf('htNumeric') < 0) {
      classArr.push('htNumeric');
    }
    cellProperties.className = classArr.join(' ');
    TD.dir = 'ltr';
  }
  textRenderer(instance, TD, row, col, prop, newValue, cellProperties);
}
numericRenderer.RENDERER_TYPE = RENDERER_TYPE;