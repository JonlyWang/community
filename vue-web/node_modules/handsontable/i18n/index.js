"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.keys.js");
exports.__esModule = true;
var _languages = require("./languages");
Object.keys(_languages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _languages[key]) return;
  exports[key] = _languages[key];
});
var _registry = require("./registry");
Object.keys(_registry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _registry[key]) return;
  exports[key] = _registry[key];
});