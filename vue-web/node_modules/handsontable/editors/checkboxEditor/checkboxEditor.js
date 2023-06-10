"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.EDITOR_TYPE = exports.CheckboxEditor = void 0;
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _baseEditor = require("../baseEditor");
var _element = require("../../helpers/dom/element");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var EDITOR_TYPE = 'checkbox';

/**
 * @private
 * @class CheckboxEditor
 */
exports.EDITOR_TYPE = EDITOR_TYPE;
var CheckboxEditor = /*#__PURE__*/function (_BaseEditor) {
  _inherits(CheckboxEditor, _BaseEditor);
  var _super = _createSuper(CheckboxEditor);
  function CheckboxEditor() {
    _classCallCheck(this, CheckboxEditor);
    return _super.apply(this, arguments);
  }
  _createClass(CheckboxEditor, [{
    key: "beginEditing",
    value: function beginEditing(initialValue, event) {
      // Just some events connected with checkbox editor are delegated here. Some `keydown` events like `enter` and `space` key press
      // are handled inside `checkboxRenderer`. Some events come here from `editorManager`. Below `if` statement was created by author
      // for purpose of handling only `doubleclick` event which may be done on a cell with checkbox.

      if (event && event.type === 'mouseup') {
        var checkbox = this.TD.querySelector('input[type="checkbox"]');
        if (!(0, _element.hasClass)(checkbox, 'htBadValue')) {
          checkbox.click();
        }
      }
    }
  }, {
    key: "finishEditing",
    value: function finishEditing() {}
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "open",
    value: function open() {}
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "getValue",
    value: function getValue() {}
  }, {
    key: "setValue",
    value: function setValue() {}
  }, {
    key: "focus",
    value: function focus() {}
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);
  return CheckboxEditor;
}(_baseEditor.BaseEditor);
exports.CheckboxEditor = CheckboxEditor;