function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import { clone, extend } from "../../../helpers/object.mjs";
import BaseUI from "./_base.mjs";
var privatePool = new WeakMap();

/**
 * @private
 * @class RadioInputUI
 */
var RadioInputUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(RadioInputUI, _BaseUI);
  var _super = _createSuper(RadioInputUI);
  function RadioInputUI(hotInstance, options) {
    var _this;
    _classCallCheck(this, RadioInputUI);
    _this = _super.call(this, hotInstance, extend(RadioInputUI.DEFAULTS, options));
    privatePool.set(_assertThisInitialized(_this), {});
    return _this;
  }

  /**
   * Build DOM structure.
   */
  _createClass(RadioInputUI, [{
    key: "build",
    value: function build() {
      _get(_getPrototypeOf(RadioInputUI.prototype), "build", this).call(this);
      var priv = privatePool.get(this);
      priv.input = this._element.firstChild;
      var label = this.hot.rootDocument.createElement('label');
      label.textContent = this.translateIfPossible(this.options.label.textContent);
      label.htmlFor = this.translateIfPossible(this.options.label.htmlFor);
      priv.label = label;
      this._element.appendChild(label);
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
      var priv = privatePool.get(this);
      priv.input.checked = this.options.checked;
      priv.label.textContent = this.translateIfPossible(this.options.label.textContent);
    }

    /**
     * Check if radio button is checked.
     *
     * @returns {boolean}
     */
  }, {
    key: "isChecked",
    value: function isChecked() {
      return this.options.checked;
    }

    /**
     * Set input checked attribute.
     *
     * @param {boolean} value Set the component state.
     */
  }, {
    key: "setChecked",
    value: function setChecked() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.options.checked = value;
      this.update();
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
  }], [{
    key: "DEFAULTS",
    get: function get() {
      return clone({
        type: 'radio',
        tagName: 'input',
        className: 'htUIRadio',
        label: {}
      });
    }
  }]);
  return RadioInputUI;
}(BaseUI);
export default RadioInputUI;