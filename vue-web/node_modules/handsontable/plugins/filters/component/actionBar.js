"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _element = require("../../../helpers/dom/element");
var _array = require("../../../helpers/array");
var C = _interopRequireWildcard(require("../../../i18n/constants"));
var _base = _interopRequireDefault(require("./_base"));
var _input = _interopRequireDefault(require("../ui/input"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
/**
 * @private
 * @class ActionBarComponent
 */var ActionBarComponent = /*#__PURE__*/function (_BaseComponent) {
  _inherits(ActionBarComponent, _BaseComponent);
  var _super = _createSuper(ActionBarComponent);
  function ActionBarComponent(hotInstance, options) {
    var _this;
    _classCallCheck(this, ActionBarComponent);
    _this = _super.call(this, hotInstance, {
      id: options.id,
      stateless: true
    });
    _this.name = options.name;
    _this.elements.push(new _input.default(_this.hot, {
      type: 'button',
      value: C.FILTERS_BUTTONS_OK,
      className: 'htUIButton htUIButtonOK',
      identifier: ActionBarComponent.BUTTON_OK
    }));
    _this.elements.push(new _input.default(_this.hot, {
      type: 'button',
      value: C.FILTERS_BUTTONS_CANCEL,
      className: 'htUIButton htUIButtonCancel',
      identifier: ActionBarComponent.BUTTON_CANCEL
    }));
    _this.registerHooks();
    return _this;
  }

  /**
   * Register all necessary hooks.
   *
   * @private
   */
  _createClass(ActionBarComponent, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;
      (0, _array.arrayEach)(this.elements, function (element) {
        element.addLocalHook('click', function (event, button) {
          return _this2.onButtonClick(event, button);
        });
      });
    }

    /**
     * Get menu object descriptor.
     *
     * @returns {object}
     */
  }, {
    key: "getMenuItemDescriptor",
    value: function getMenuItemDescriptor() {
      var _this3 = this;
      return {
        key: this.id,
        name: this.name,
        isCommand: false,
        disableSelection: true,
        hidden: function hidden() {
          return _this3.isHidden();
        },
        renderer: function renderer(hot, wrapper) {
          (0, _element.addClass)(wrapper.parentNode, 'htFiltersMenuActionBar');
          if (!wrapper.parentNode.hasAttribute('ghost-table')) {
            (0, _array.arrayEach)(_this3.elements, function (ui) {
              return wrapper.appendChild(ui.element);
            });
          }
          return wrapper;
        }
      };
    }

    /**
     * Fire accept event.
     */
  }, {
    key: "accept",
    value: function accept() {
      this.runLocalHooks('accept');
    }

    /**
     * Fire cancel event.
     */
  }, {
    key: "cancel",
    value: function cancel() {
      this.runLocalHooks('cancel');
    }

    /**
     * On button click listener.
     *
     * @private
     * @param {Event} event DOM event.
     * @param {InputUI} button InputUI object.
     */
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event, button) {
      if (button.options.identifier === ActionBarComponent.BUTTON_OK) {
        this.accept();
      } else {
        this.cancel();
      }
    }
  }], [{
    key: "BUTTON_OK",
    get: function get() {
      return 'ok';
    }
  }, {
    key: "BUTTON_CANCEL",
    get: function get() {
      return 'cancel';
    }
  }]);
  return ActionBarComponent;
}(_base.default);
var _default = ActionBarComponent;
exports.default = _default;