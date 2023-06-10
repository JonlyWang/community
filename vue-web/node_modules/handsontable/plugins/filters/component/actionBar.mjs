function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
import { addClass } from "../../../helpers/dom/element.mjs";
import { arrayEach } from "../../../helpers/array.mjs";
import * as C from "../../../i18n/constants.mjs";
import BaseComponent from "./_base.mjs";
import InputUI from "../ui/input.mjs"; /**
                                        * @private
                                        * @class ActionBarComponent
                                        */
var ActionBarComponent = /*#__PURE__*/function (_BaseComponent) {
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
    _this.elements.push(new InputUI(_this.hot, {
      type: 'button',
      value: C.FILTERS_BUTTONS_OK,
      className: 'htUIButton htUIButtonOK',
      identifier: ActionBarComponent.BUTTON_OK
    }));
    _this.elements.push(new InputUI(_this.hot, {
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
      arrayEach(this.elements, function (element) {
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
          addClass(wrapper.parentNode, 'htFiltersMenuActionBar');
          if (!wrapper.parentNode.hasAttribute('ghost-table')) {
            arrayEach(_this3.elements, function (ui) {
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
}(BaseComponent);
export default ActionBarComponent;