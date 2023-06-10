"use strict";

exports.__esModule = true;
exports.RENDERER_TYPE = void 0;
exports.numericRenderer = numericRenderer;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.join.js");
var _numbro = _interopRequireDefault(require("numbro"));
var _textRenderer = require("../textRenderer");
var _number = require("../../helpers/number");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var RENDERER_TYPE = 'numeric';

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
exports.RENDERER_TYPE = RENDERER_TYPE;
function numericRenderer(instance, TD, row, col, prop, value, cellProperties) {
  var newValue = value;
  if ((0, _number.isNumeric)(newValue)) {
    var numericFormat = cellProperties.numericFormat;
    var cellCulture = numericFormat && numericFormat.culture || '-';
    var cellFormatPattern = numericFormat && numericFormat.pattern;
    var className = cellProperties.className || '';
    var classArr = className.length ? className.split(' ') : [];
    if (typeof cellCulture !== 'undefined' && !_numbro.default.languages()[cellCulture]) {
      var shortTag = cellCulture.replace('-', '');
      var langData = _numbro.default.allLanguages ? _numbro.default.allLanguages[cellCulture] : _numbro.default[shortTag];
      if (langData) {
        _numbro.default.registerLanguage(langData);
      }
    }
    _numbro.default.setLanguage(cellCulture);
    newValue = (0, _numbro.default)(newValue).format(cellFormatPattern || '0');
    if (classArr.indexOf('htLeft') < 0 && classArr.indexOf('htCenter') < 0 && classArr.indexOf('htRight') < 0 && classArr.indexOf('htJustify') < 0) {
      classArr.push('htRight');
    }
    if (classArr.indexOf('htNumeric') < 0) {
      classArr.push('htNumeric');
    }
    cellProperties.className = classArr.join(' ');
    TD.dir = 'ltr';
  }
  (0, _textRenderer.textRenderer)(instance, TD, row, col, prop, newValue, cellProperties);
}
numericRenderer.RENDERER_TYPE = RENDERER_TYPE;