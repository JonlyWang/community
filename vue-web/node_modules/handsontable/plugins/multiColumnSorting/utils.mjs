import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { warn } from "../../helpers/console.mjs";
import { toSingleLine } from "../../helpers/templateLiteralTag.mjs"; /**
                                                                      * Warn users about problems when using `columnSorting` and `multiColumnSorting` plugins simultaneously.
                                                                      */
export function warnAboutPluginsConflict() {
  warn(toSingleLine(_templateObject || (_templateObject = _taggedTemplateLiteral(["Plugins `columnSorting` and `multiColumnSorting` should not be enabled simultaneously. \n    Only `multiColumnSorting` will work."], ["Plugins \\`columnSorting\\` and \\`multiColumnSorting\\` should not be enabled simultaneously. \n    Only \\`multiColumnSorting\\` will work."]))));
}