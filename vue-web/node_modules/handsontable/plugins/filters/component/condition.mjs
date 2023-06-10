function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/web.timers.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
import { addClass } from "../../../helpers/dom/element.mjs";
import { stopImmediatePropagation } from "../../../helpers/dom/event.mjs";
import { arrayEach } from "../../../helpers/array.mjs";
import { isKey } from "../../../helpers/unicode.mjs";
import { clone } from "../../../helpers/object.mjs";
import * as C from "../../../i18n/constants.mjs";
import BaseComponent from "./_base.mjs";
import getOptionsList, { CONDITION_NONE } from "../constants.mjs";
import InputUI from "../ui/input.mjs";
import SelectUI from "../ui/select.mjs";
import { getConditionDescriptor } from "../conditionRegisterer.mjs"; /**
                                                                      * @private
                                                                      * @class ConditionComponent
                                                                      */
var ConditionComponent = /*#__PURE__*/function (_BaseComponent) {
  _inherits(ConditionComponent, _BaseComponent);
  var _super = _createSuper(ConditionComponent);
  function ConditionComponent(hotInstance, options) {
    var _this;
    _classCallCheck(this, ConditionComponent);
    _this = _super.call(this, hotInstance, {
      id: options.id,
      stateless: false
    });
    _this.name = options.name;
    _this.addSeparator = options.addSeparator;
    _this.elements.push(new SelectUI(_this.hot, {
      menuContainer: options.menuContainer
    }));
    _this.elements.push(new InputUI(_this.hot, {
      placeholder: C.FILTERS_BUTTONS_PLACEHOLDER_VALUE
    }));
    _this.elements.push(new InputUI(_this.hot, {
      placeholder: C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE
    }));
    _this.registerHooks();
    return _this;
  }

  /**
   * Register all necessary hooks.
   *
   * @private
   */
  _createClass(ConditionComponent, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;
      this.getSelectElement().addLocalHook('select', function (command) {
        return _this2.onConditionSelect(command);
      });
      this.getSelectElement().addLocalHook('afterClose', function () {
        return _this2.onSelectUIClosed();
      });
      arrayEach(this.getInputElements(), function (input) {
        input.addLocalHook('keydown', function (event) {
          return _this2.onInputKeyDown(event);
        });
      });
    }

    /**
     * Set state of the component.
     *
     * @param {object} value State to restore.
     */
  }, {
    key: "setState",
    value: function setState(value) {
      var _this3 = this;
      this.reset();
      if (!value) {
        return;
      }
      var copyOfCommand = clone(value.command);
      if (copyOfCommand.name.startsWith(C.FILTERS_CONDITIONS_NAMESPACE)) {
        copyOfCommand.name = this.hot.getTranslatedPhrase(copyOfCommand.name);
      }
      this.getSelectElement().setValue(copyOfCommand);
      arrayEach(value.args, function (arg, index) {
        if (index > copyOfCommand.inputsCount - 1) {
          return false;
        }
        var element = _this3.getInputElement(index);
        element.setValue(arg);
        element[copyOfCommand.inputsCount > index ? 'show' : 'hide']();
        if (!index) {
          setTimeout(function () {
            return element.focus();
          }, 10);
        }
      });
    }

    /**
     * Export state of the component (get selected filter and filter arguments).
     *
     * @returns {object} Returns object where `command` key keeps used condition filter and `args` key its arguments.
     */
  }, {
    key: "getState",
    value: function getState() {
      var command = this.getSelectElement().getValue() || getConditionDescriptor(CONDITION_NONE);
      var args = [];
      arrayEach(this.getInputElements(), function (element, index) {
        if (command.inputsCount > index) {
          args.push(element.getValue());
        }
      });
      return {
        command: command,
        args: args
      };
    }

    /**
     * Update state of component.
     *
     * @param {object} condition The condition object.
     * @param {object} condition.command The command object with condition name as `key` property.
     * @param {Array} condition.args An array of values to compare.
     * @param {number} column Physical column index.
     */
  }, {
    key: "updateState",
    value: function updateState(condition, column) {
      var command = condition ? getConditionDescriptor(condition.name) : getConditionDescriptor(CONDITION_NONE);
      this.state.setValueAtIndex(column, {
        command: command,
        args: condition ? condition.args : []
      });
      if (!condition) {
        arrayEach(this.getInputElements(), function (element) {
          return element.setValue(null);
        });
      }
    }

    /**
     * Get select element.
     *
     * @returns {SelectUI}
     */
  }, {
    key: "getSelectElement",
    value: function getSelectElement() {
      return this.elements.filter(function (element) {
        return element instanceof SelectUI;
      })[0];
    }

    /**
     * Get input element.
     *
     * @param {number} index Index an array of elements.
     * @returns {InputUI}
     */
  }, {
    key: "getInputElement",
    value: function getInputElement() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.getInputElements()[index];
    }

    /**
     * Get input elements.
     *
     * @returns {Array}
     */
  }, {
    key: "getInputElements",
    value: function getInputElements() {
      return this.elements.filter(function (element) {
        return element instanceof InputUI;
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
      var _this4 = this;
      return {
        key: this.id,
        name: this.name,
        isCommand: false,
        disableSelection: true,
        hidden: function hidden() {
          return _this4.isHidden();
        },
        renderer: function renderer(hot, wrapper, row, col, prop, value) {
          addClass(wrapper.parentNode, 'htFiltersMenuCondition');
          if (_this4.addSeparator) {
            addClass(wrapper.parentNode, 'border');
          }
          var label = _this4.hot.rootDocument.createElement('div');
          addClass(label, 'htFiltersMenuLabel');
          label.textContent = value;
          wrapper.appendChild(label);
          if (!wrapper.parentNode.hasAttribute('ghost-table')) {
            arrayEach(_this4.elements, function (ui) {
              return wrapper.appendChild(ui.element);
            });
          }
          return wrapper;
        }
      };
    }

    /**
     * Reset elements to their initial state.
     */
  }, {
    key: "reset",
    value: function reset() {
      var selectedColumn = this.hot.getPlugin('filters').getSelectedColumn();
      var items = [getConditionDescriptor(CONDITION_NONE)];
      if (selectedColumn !== null) {
        var visualIndex = selectedColumn.visualIndex;
        items = getOptionsList(this.hot.getDataType(0, visualIndex, this.hot.countRows(), visualIndex));
      }
      arrayEach(this.getInputElements(), function (element) {
        return element.hide();
      });
      this.getSelectElement().setItems(items);
      _get(_getPrototypeOf(ConditionComponent.prototype), "reset", this).call(this);
      // Select element as default 'None'
      this.getSelectElement().setValue(items[0]);
    }

    /**
     * On condition select listener.
     *
     * @private
     * @param {object} command Menu item object (command).
     */
  }, {
    key: "onConditionSelect",
    value: function onConditionSelect(command) {
      arrayEach(this.getInputElements(), function (element, index) {
        element[command.inputsCount > index ? 'show' : 'hide']();
        if (index === 0) {
          setTimeout(function () {
            return element.focus();
          }, 10);
        }
      });
      this.runLocalHooks('change', command);
    }

    /**
     * On component SelectUI closed listener.
     *
     * @private
     */
  }, {
    key: "onSelectUIClosed",
    value: function onSelectUIClosed() {
      this.runLocalHooks('afterClose');
    }

    /**
     * Key down listener.
     *
     * @private
     * @param {Event} event The DOM event object.
     */
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      if (isKey(event.keyCode, 'ENTER')) {
        this.runLocalHooks('accept');
        stopImmediatePropagation(event);
      } else if (isKey(event.keyCode, 'ESCAPE')) {
        this.runLocalHooks('cancel');
        stopImmediatePropagation(event);
      }
    }
  }]);
  return ConditionComponent;
}(BaseComponent);
export default ConditionComponent;