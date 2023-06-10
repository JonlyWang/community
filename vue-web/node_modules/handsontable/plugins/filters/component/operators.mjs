function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
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
import { toSingleLine } from "../../../helpers/templateLiteralTag.mjs";
import BaseComponent from "./_base.mjs";
import { getOperationName } from "../logicalOperationRegisterer.mjs";
import { OPERATION_ID as OPERATION_AND } from "../logicalOperations/conjunction.mjs";
import { OPERATION_ID as OPERATION_OR } from "../logicalOperations/disjunction.mjs";
import { OPERATION_ID as OPERATION_OR_THEN_VARIABLE } from "../logicalOperations/disjunctionWithExtraCondition.mjs";
import RadioInputUI from "../ui/radioInput.mjs";
var SELECTED_AT_START_ELEMENT_INDEX = 0;

/**
 * @private
 * @class OperatorsComponent
 */
var OperatorsComponent = /*#__PURE__*/function (_BaseComponent) {
  _inherits(OperatorsComponent, _BaseComponent);
  var _super = _createSuper(OperatorsComponent);
  function OperatorsComponent(hotInstance, options) {
    var _this;
    _classCallCheck(this, OperatorsComponent);
    _this = _super.call(this, hotInstance, {
      id: options.id,
      stateless: false
    });
    _this.name = options.name;
    _this.buildOperatorsElement();
    return _this;
  }

  /**
   * Get menu object descriptor.
   *
   * @returns {object}
   */
  _createClass(OperatorsComponent, [{
    key: "getMenuItemDescriptor",
    value: function getMenuItemDescriptor() {
      var _this2 = this;
      return {
        key: this.id,
        name: this.name,
        isCommand: false,
        disableSelection: true,
        hidden: function hidden() {
          return _this2.isHidden();
        },
        renderer: function renderer(hot, wrapper) {
          addClass(wrapper.parentNode, 'htFiltersMenuOperators');
          if (!wrapper.parentNode.hasAttribute('ghost-table')) {
            arrayEach(_this2.elements, function (ui) {
              return wrapper.appendChild(ui.element);
            });
          }
          return wrapper;
        }
      };
    }

    /**
     * Add RadioInputUI elements to component.
     *
     * @private
     */
  }, {
    key: "buildOperatorsElement",
    value: function buildOperatorsElement() {
      var _this3 = this;
      var operationKeys = [OPERATION_AND, OPERATION_OR];
      arrayEach(operationKeys, function (operation) {
        var radioInput = new RadioInputUI(_this3.hot, {
          name: 'operator',
          label: {
            htmlFor: operation,
            textContent: getOperationName(operation)
          },
          value: operation,
          checked: operation === operationKeys[SELECTED_AT_START_ELEMENT_INDEX],
          id: operation
        });
        radioInput.addLocalHook('change', function (event) {
          return _this3.onRadioInputChange(event);
        });
        _this3.elements.push(radioInput);
      });
    }

    /**
     * Set state of operators component to check radio input at specific `index`.
     *
     * @param {number} searchedIndex Index of radio input to check.
     */
  }, {
    key: "setChecked",
    value: function setChecked(searchedIndex) {
      if (this.elements.length < searchedIndex) {
        throw Error(toSingleLine(_templateObject || (_templateObject = _taggedTemplateLiteral(["Radio button with index ", " doesn't exist."])), searchedIndex));
      }
      arrayEach(this.elements, function (element, index) {
        element.setChecked(index === searchedIndex);
      });
    }

    /**
     * Get `id` of active operator.
     *
     * @returns {string}
     */
  }, {
    key: "getActiveOperationId",
    value: function getActiveOperationId() {
      var operationElement = this.elements.find(function (element) {
        return element instanceof RadioInputUI && element.isChecked();
      });
      if (operationElement) {
        return operationElement.getValue();
      }
      return OPERATION_AND;
    }

    /**
     * Export state of the component (get selected operator).
     *
     * @returns {string} Returns `id` of selected operator.
     */
  }, {
    key: "getState",
    value: function getState() {
      return this.getActiveOperationId();
    }

    /**
     * Set state of the component.
     *
     * @param {object} value State to restore.
     */
  }, {
    key: "setState",
    value: function setState(value) {
      this.reset();
      if (value && this.getActiveOperationId() !== value) {
        arrayEach(this.elements, function (element) {
          element.setChecked(element.getValue() === value);
        });
      }
    }

    /**
     * Update state of component.
     *
     * @param {string} [operationId='conjunction'] Id of selected operation.
     * @param {number} column Physical column index.
     */
  }, {
    key: "updateState",
    value: function updateState() {
      var operationId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPERATION_AND;
      var column = arguments.length > 1 ? arguments[1] : undefined;
      var selectedOperationId = operationId;
      if (selectedOperationId === OPERATION_OR_THEN_VARIABLE) {
        selectedOperationId = OPERATION_OR;
      }
      this.state.setValueAtIndex(column, selectedOperationId);
    }

    /**
     * Reset elements to their initial state.
     */
  }, {
    key: "reset",
    value: function reset() {
      this.setChecked(SELECTED_AT_START_ELEMENT_INDEX);
    }

    /**
     * OnChange listener.
     *
     * @private
     * @param {Event} event The DOM event object.
     */
  }, {
    key: "onRadioInputChange",
    value: function onRadioInputChange(event) {
      this.setState(event.target.value);
    }
  }]);
  return OperatorsComponent;
}(BaseComponent);
export default OperatorsComponent;