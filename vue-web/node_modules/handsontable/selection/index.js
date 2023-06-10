"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.keys.js");
exports.__esModule = true;
var _exportNames = {
  Highlight: true,
  Selection: true,
  handleMouseEvent: true,
  detectSelectionType: true,
  normalizeSelectionFactory: true
};
var _highlight = _interopRequireDefault(require("./highlight/highlight"));
exports.Highlight = _highlight.default;
var _selection = _interopRequireDefault(require("./selection"));
exports.Selection = _selection.default;
var _mouseEventHandler = require("./mouseEventHandler");
exports.handleMouseEvent = _mouseEventHandler.handleMouseEvent;
var _utils = require("./utils");
exports.detectSelectionType = _utils.detectSelectionType;
exports.normalizeSelectionFactory = _utils.normalizeSelectionFactory;
var _constants = require("./highlight/constants");
Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  exports[key] = _constants[key];
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }