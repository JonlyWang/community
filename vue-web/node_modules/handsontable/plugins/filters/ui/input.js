"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _element = require("../../../helpers/dom/element");
var _object = require("../../../helpers/object");
var _base = _interopRequireDefault(require("./_base"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var privatePool = new WeakMap();

/**
 * @private
 * @class InputUI
 */
var InputUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(InputUI, _BaseUI);
  var _super = _createSuper(InputUI);
  function InputUI(hotInstance, options) {
    var _this;
    _classCallCheck(this, InputUI);
    _this = _super.call(this, hotInstance, (0, _object.extend)(InputUI.DEFAULTS, options));
    privatePool.set(_assertThisInitialized(_this), {});
    _this.registerHooks();
    return _this;
  }

  /**
   * Register all necessary hooks.
   */
  _createClass(InputUI, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;
      this.addLocalHook('click', function () {
        return _this2.onClick();
      });
      this.addLocalHook('keyup', function (event) {
        return _this2.onKeyup(event);
      });
    }

    /**
     * Build DOM structure.
     */
  }, {
    key: "build",
    value: function build() {
      _get(_getPrototypeOf(InputUI.prototype), "build", this).call(this);
      var priv = privatePool.get(this);
      var icon = this.hot.rootDocument.createElement('div');
      priv.input = this._element.firstChild;
      (0, _element.addClass)(this._element, 'htUIInput');
      (0, _element.addClass)(icon, 'htUIInputIcon');
      this._element.appendChild(icon);
      this.update();
    }

    /**
     * Update element.
     */
  }, {
    key: "update",
    value: function update() {
      if (!this.isBuilt()) {
        return;
      }
      var input = privatePool.get(this).input;
      input.type = this.options.type;
      input.placeholder = this.translateIfPossible(this.options.placeholder);
      input.value = this.translateIfPossible(this.options.value);
    }

    /**
     * Focus element.
     */
  }, {
    key: "focus",
    value: function focus() {
      if (this.isBuilt()) {
        privatePool.get(this).input.focus();
      }
    }

    /**
     * OnClick listener.
     */
  }, {
    key: "onClick",
    value: function onClick() {}

    /**
     * OnKeyup listener.
     *
     * @param {Event} event The mouse event object.
     */
  }, {
    key: "onKeyup",
    value: function onKeyup(event) {
      this.options.value = event.target.value;
    }
  }], [{
    key: "DEFAULTS",
    get: function get() {
      return (0, _object.clone)({
        placeholder: '',
        type: 'text',
        tagName: 'input'
      });
    }
  }]);
  return InputUI;
}(_base.default);
var _default = InputUI;
exports.default = _default;