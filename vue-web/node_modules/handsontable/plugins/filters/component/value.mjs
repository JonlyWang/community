function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.function.name.js";
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
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
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
import { arrayEach, arrayFilter, arrayMap } from "../../../helpers/array.mjs";
import { isKey } from "../../../helpers/unicode.mjs";
import * as C from "../../../i18n/constants.mjs";
import { unifyColumnValues, intersectValues, toEmptyString } from "../utils.mjs";
import BaseComponent from "./_base.mjs";
import MultipleSelectUI from "../ui/multipleSelect.mjs";
import { CONDITION_BY_VALUE, CONDITION_NONE } from "../constants.mjs";
import { getConditionDescriptor } from "../conditionRegisterer.mjs"; /**
                                                                      * @private
                                                                      * @class ValueComponent
                                                                      */
var ValueComponent = /*#__PURE__*/function (_BaseComponent) {
  _inherits(ValueComponent, _BaseComponent);
  var _super = _createSuper(ValueComponent);
  function ValueComponent(hotInstance, options) {
    var _this;
    _classCallCheck(this, ValueComponent);
    _this = _super.call(this, hotInstance, {
      id: options.id,
      stateless: false
    });
    _this.name = options.name;
    _this.elements.push(new MultipleSelectUI(_this.hot));
    _this.registerHooks();
    return _this;
  }

  /**
   * Register all necessary hooks.
   *
   * @private
   */
  _createClass(ValueComponent, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;
      this.getMultipleSelectElement().addLocalHook('keydown', function (event) {
        return _this2.onInputKeyDown(event);
      });
    }

    /**
     * Set state of the component.
     *
     * @param {object} value The component value.
     */
  }, {
    key: "setState",
    value: function setState(value) {
      this.reset();
      if (value && value.command.key === CONDITION_BY_VALUE) {
        var select = this.getMultipleSelectElement();
        select.setItems(value.itemsSnapshot);
        select.setValue(value.args[0]);
        select.setLocale(value.locale);
      }
    }

    /**
     * Export state of the component (get selected filter and filter arguments).
     *
     * @returns {object} Returns object where `command` key keeps used condition filter and `args` key its arguments.
     */
  }, {
    key: "getState",
    value: function getState() {
      var select = this.getMultipleSelectElement();
      var availableItems = select.getItems();
      return {
        command: {
          key: select.isSelectedAllValues() || !availableItems.length ? CONDITION_NONE : CONDITION_BY_VALUE
        },
        args: [select.getValue()],
        itemsSnapshot: availableItems
      };
    }

    /**
     * Update state of component.
     *
     * @param {object} stateInfo Information about state containing stack of edited column,
     * stack of dependent conditions, data factory and optional condition arguments change. It's described by object containing keys:
     * `editedConditionStack`, `dependentConditionStacks`, `visibleDataFactory` and `conditionArgsChange`.
     */
  }, {
    key: "updateState",
    value: function updateState(stateInfo) {
      var _this3 = this;
      var updateColumnState = function updateColumnState(physicalColumn, conditions, conditionArgsChange, filteredRowsFactory, conditionsStack) {
        var _arrayFilter = arrayFilter(conditions, function (condition) {
            return condition.name === CONDITION_BY_VALUE;
          }),
          _arrayFilter2 = _slicedToArray(_arrayFilter, 1),
          firstByValueCondition = _arrayFilter2[0];
        var state = {};
        var defaultBlankCellValue = _this3.hot.getTranslatedPhrase(C.FILTERS_VALUES_BLANK_CELLS);
        if (firstByValueCondition) {
          var rowValues = unifyColumnValues(arrayMap(filteredRowsFactory(physicalColumn, conditionsStack), function (row) {
            return row.value;
          }));
          if (conditionArgsChange) {
            firstByValueCondition.args[0] = conditionArgsChange;
          }
          var selectedValues = [];
          var itemsSnapshot = intersectValues(rowValues, firstByValueCondition.args[0], defaultBlankCellValue, function (item) {
            if (item.checked) {
              selectedValues.push(item.value);
            }
          });
          var column = stateInfo.editedConditionStack.column;
          state.locale = _this3.hot.getCellMeta(0, column).locale;
          state.args = [selectedValues];
          state.command = getConditionDescriptor(CONDITION_BY_VALUE);
          state.itemsSnapshot = itemsSnapshot;
        } else {
          state.args = [];
          state.command = getConditionDescriptor(CONDITION_NONE);
        }
        _this3.state.setValueAtIndex(physicalColumn, state);
      };
      updateColumnState(stateInfo.editedConditionStack.column, stateInfo.editedConditionStack.conditions, stateInfo.conditionArgsChange, stateInfo.filteredRowsFactory);

      // Update the next "by_value" component (filter column conditions added after this condition).
      // Its list of values has to be updated. As the new values by default are unchecked,
      // the further component update is unnecessary.
      if (stateInfo.dependentConditionStacks.length) {
        updateColumnState(stateInfo.dependentConditionStacks[0].column, stateInfo.dependentConditionStacks[0].conditions, stateInfo.conditionArgsChange, stateInfo.filteredRowsFactory, stateInfo.editedConditionStack);
      }
    }

    /**
     * Get multiple select element.
     *
     * @returns {MultipleSelectUI}
     */
  }, {
    key: "getMultipleSelectElement",
    value: function getMultipleSelectElement() {
      return this.elements.filter(function (element) {
        return element instanceof MultipleSelectUI;
      })[0];
    }

    /**
     * Get object descriptor for menu item entry.
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
          addClass(wrapper.parentNode, 'htFiltersMenuValue');
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
      var defaultBlankCellValue = this.hot.getTranslatedPhrase(C.FILTERS_VALUES_BLANK_CELLS);
      var values = unifyColumnValues(this._getColumnVisibleValues());
      var items = intersectValues(values, values, defaultBlankCellValue);
      this.getMultipleSelectElement().setItems(items);
      _get(_getPrototypeOf(ValueComponent.prototype), "reset", this).call(this);
      this.getMultipleSelectElement().setValue(values);
      var selectedColumn = this.hot.getPlugin('filters').getSelectedColumn();
      if (selectedColumn !== null) {
        this.getMultipleSelectElement().setLocale(this.hot.getCellMeta(0, selectedColumn.visualIndex).locale);
      }
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
      if (isKey(event.keyCode, 'ESCAPE')) {
        this.runLocalHooks('cancel');
        stopImmediatePropagation(event);
      }
    }

    /**
     * Get data for currently selected column.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: "_getColumnVisibleValues",
    value: function _getColumnVisibleValues() {
      var selectedColumn = this.hot.getPlugin('filters').getSelectedColumn();
      if (selectedColumn === null) {
        return [];
      }
      return arrayMap(this.hot.getDataAtCol(selectedColumn.visualIndex), function (v) {
        return toEmptyString(v);
      });
    }
  }]);
  return ValueComponent;
}(BaseComponent);
export default ValueComponent;