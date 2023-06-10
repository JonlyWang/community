"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.keys.js");
exports.__esModule = true;
var _aggregatedCollection = require("./aggregatedCollection");
Object.keys(_aggregatedCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _aggregatedCollection[key]) return;
  exports[key] = _aggregatedCollection[key];
});
var _mapCollection = require("./mapCollection");
Object.keys(_mapCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mapCollection[key]) return;
  exports[key] = _mapCollection[key];
});