"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.freeze.js");
exports.__esModule = true;
exports.warnAboutPluginsConflict = warnAboutPluginsConflict;
var _console = require("../../helpers/console");
var _templateLiteralTag = require("../../helpers/templateLiteralTag");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
/**
 * Warn users about problems when using `columnSorting` and `multiColumnSorting` plugins simultaneously.
 */
function warnAboutPluginsConflict() {
  (0, _console.warn)((0, _templateLiteralTag.toSingleLine)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Plugins `columnSorting` and `multiColumnSorting` should not be enabled simultaneously. \n    Only `multiColumnSorting` will work."], ["Plugins \\`columnSorting\\` and \\`multiColumnSorting\\` should not be enabled simultaneously. \n    Only \\`multiColumnSorting\\` will work."]))));
}