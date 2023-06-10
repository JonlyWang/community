function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
import "core-js/modules/web.timers.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import { addClass, getScrollbarWidth } from "../../../helpers/dom/element.mjs";
import { clone, extend } from "../../../helpers/object.mjs";
import { arrayFilter, arrayMap, arrayEach } from "../../../helpers/array.mjs";
import { isKey } from "../../../helpers/unicode.mjs";
import { partial } from "../../../helpers/function.mjs";
import { dataRowToChangesArray } from "../../../helpers/data.mjs";
import * as C from "../../../i18n/constants.mjs";
import { stopImmediatePropagation } from "../../../helpers/dom/event.mjs";
import BaseUI from "./_base.mjs";
import InputUI from "./input.mjs";
import LinkUI from "./link.mjs";
import { createArrayAssertion } from "../utils.mjs";
var privatePool = new WeakMap();
var SHORTCUTS_GROUP = 'multipleSelect.itemBox';

/**
 * @private
 * @class MultipleSelectUI
 */
var MultipleSelectUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(MultipleSelectUI, _BaseUI);
  var _super = _createSuper(MultipleSelectUI);
  function MultipleSelectUI(hotInstance, options) {
    var _this;
    _classCallCheck(this, MultipleSelectUI);
    _this = _super.call(this, hotInstance, extend(MultipleSelectUI.DEFAULTS, options));
    privatePool.set(_assertThisInitialized(_this), {});
    /**
     * Input element.
     *
     * @type {InputUI}
     */
    _this.searchInput = new InputUI(_this.hot, {
      placeholder: C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH,
      className: 'htUIMultipleSelectSearch'
    });
    /**
     * "Select all" UI element.
     *
     * @type {BaseUI}
     */
    _this.selectAllUI = new LinkUI(_this.hot, {
      textContent: C.FILTERS_BUTTONS_SELECT_ALL,
      className: 'htUISelectAll'
    });
    /**
     * "Clear" UI element.
     *
     * @type {BaseUI}
     */
    _this.clearAllUI = new LinkUI(_this.hot, {
      textContent: C.FILTERS_BUTTONS_CLEAR,
      className: 'htUIClearAll'
    });
    /**
     * List of available select options.
     *
     * @type {Array}
     */
    _this.items = [];
    /**
     * Handsontable instance used as items list element.
     *
     * @type {Handsontable}
     */
    _this.itemsBox = null;
    _this.registerHooks();
    return _this;
  }

  /**
   * Register all necessary hooks.
   */
  _createClass(MultipleSelectUI, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;
      this.searchInput.addLocalHook('keydown', function (event) {
        return _this2.onInputKeyDown(event);
      });
      this.searchInput.addLocalHook('input', function (event) {
        return _this2.onInput(event);
      });
      this.selectAllUI.addLocalHook('click', function (event) {
        return _this2.onSelectAllClick(event);
      });
      this.clearAllUI.addLocalHook('click', function (event) {
        return _this2.onClearAllClick(event);
      });
    }

    /**
     * Set available options.
     *
     * @param {Array} items Array of objects with `checked` and `label` property.
     */
  }, {
    key: "setItems",
    value: function setItems(items) {
      this.items = items;
      if (this.itemsBox) {
        this.itemsBox.loadData(this.items);
      }
    }

    /**
     * Set a locale for the component.
     *
     * @param {string} locale Locale used for filter actions performed on data, ie. `en-US`.
     */
  }, {
    key: "setLocale",
    value: function setLocale(locale) {
      this.locale = locale;
    }

    /**
     * Get a locale for the component.
     *
     * @returns {string}
     */
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }

    /**
     * Get all available options.
     *
     * @returns {Array}
     */
  }, {
    key: "getItems",
    value: function getItems() {
      return _toConsumableArray(this.items);
    }

    /**
     * Get element value.
     *
     * @returns {Array} Array of selected values.
     */
  }, {
    key: "getValue",
    value: function getValue() {
      return itemsToValue(this.items);
    }

    /**
     * Check if all values listed in element are selected.
     *
     * @returns {boolean}
     */
  }, {
    key: "isSelectedAllValues",
    value: function isSelectedAllValues() {
      return this.items.length === this.getValue().length;
    }

    /**
     * Build DOM structure.
     */
  }, {
    key: "build",
    value: function build() {
      var _this3 = this;
      _get(_getPrototypeOf(MultipleSelectUI.prototype), "build", this).call(this);
      var rootDocument = this.hot.rootDocument;
      var itemsBoxWrapper = rootDocument.createElement('div');
      var selectionControl = new BaseUI(this.hot, {
        className: 'htUISelectionControls',
        children: [this.selectAllUI, this.clearAllUI]
      });
      this._element.appendChild(this.searchInput.element);
      this._element.appendChild(selectionControl.element);
      this._element.appendChild(itemsBoxWrapper);
      var hotInitializer = function hotInitializer(wrapper) {
        if (!_this3._element) {
          return;
        }
        if (_this3.itemsBox) {
          _this3.itemsBox.destroy();
        }
        addClass(wrapper, 'htUIMultipleSelectHot');
        // Constructs and initializes a new Handsontable instance
        _this3.itemsBox = new _this3.hot.constructor(wrapper, {
          data: _this3.items,
          columns: [{
            data: 'checked',
            type: 'checkbox',
            label: {
              property: 'visualValue',
              position: 'after'
            }
          }],
          beforeRenderer: function beforeRenderer(TD, row, col, prop, value, cellProperties) {
            TD.title = cellProperties.instance.getDataAtRowProp(row, cellProperties.label.property);
          },
          maxCols: 1,
          autoWrapCol: true,
          height: 110,
          // Workaround for #151.
          colWidths: function colWidths() {
            return _this3.itemsBox.container.scrollWidth - getScrollbarWidth(rootDocument);
          },
          copyPaste: false,
          disableVisualSelection: 'area',
          fillHandle: false,
          fragmentSelection: 'cell',
          tabMoves: {
            row: 1,
            col: 0
          },
          layoutDirection: _this3.hot.isRtl() ? 'rtl' : 'ltr'
        });
        _this3.itemsBox.init();
        var shortcutManager = _this3.itemsBox.getShortcutManager();
        var gridContext = shortcutManager.getContext('grid');
        gridContext.addShortcut({
          // TODO: Is this shortcut really needed? We have one test for that case, but focus is performed programmatically.
          keys: [['Escape']],
          callback: function callback(event) {
            _this3.runLocalHooks('keydown', event, _this3);
          },
          group: SHORTCUTS_GROUP
        });
      };
      hotInitializer(itemsBoxWrapper);
      setTimeout(function () {
        return hotInitializer(itemsBoxWrapper);
      }, 100);
    }

    /**
     * Reset DOM structure.
     */
  }, {
    key: "reset",
    value: function reset() {
      this.searchInput.reset();
      this.selectAllUI.reset();
      this.clearAllUI.reset();
    }

    /**
     * Update DOM structure.
     */
  }, {
    key: "update",
    value: function update() {
      if (!this.isBuilt()) {
        return;
      }
      this.itemsBox.loadData(valueToItems(this.items, this.options.value));
      _get(_getPrototypeOf(MultipleSelectUI.prototype), "update", this).call(this);
    }

    /**
     * Destroy instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.itemsBox) {
        this.itemsBox.destroy();
      }
      this.searchInput.destroy();
      this.clearAllUI.destroy();
      this.selectAllUI.destroy();
      this.searchInput = null;
      this.clearAllUI = null;
      this.selectAllUI = null;
      this.itemsBox = null;
      this.items = null;
      _get(_getPrototypeOf(MultipleSelectUI.prototype), "destroy", this).call(this);
    }

    /**
     * 'input' event listener for input element.
     *
     * @private
     * @param {Event} event DOM event.
     */
  }, {
    key: "onInput",
    value: function onInput(event) {
      var _this4 = this;
      var value = event.target.value.toLocaleLowerCase(this.getLocale());
      var filteredItems;
      if (value === '') {
        filteredItems = _toConsumableArray(this.items);
      } else {
        filteredItems = arrayFilter(this.items, function (item) {
          return "".concat(item.value).toLocaleLowerCase(_this4.getLocale()).indexOf(value) >= 0;
        });
      }
      this.itemsBox.loadData(filteredItems);
    }

    /**
     * 'keydown' event listener for input element.
     *
     * @private
     * @param {Event} event DOM event.
     */
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      this.runLocalHooks('keydown', event, this);
      var isKeyCode = partial(isKey, event.keyCode);
      if (isKeyCode('ARROW_DOWN|TAB') && !this.itemsBox.isListening()) {
        stopImmediatePropagation(event);
        this.itemsBox.listen();
        this.itemsBox.selectCell(0, 0);
      }
    }

    /**
     * On click listener for "Select all" link.
     *
     * @private
     * @param {DOMEvent} event The mouse event object.
     */
  }, {
    key: "onSelectAllClick",
    value: function onSelectAllClick(event) {
      var changes = [];
      event.preventDefault();
      arrayEach(this.itemsBox.getSourceData(), function (row, rowIndex) {
        row.checked = true;
        changes.push(dataRowToChangesArray(row, rowIndex)[0]);
      });
      this.itemsBox.setSourceDataAtCell(changes);
    }

    /**
     * On click listener for "Clear" link.
     *
     * @private
     * @param {DOMEvent} event The mouse event object.
     */
  }, {
    key: "onClearAllClick",
    value: function onClearAllClick(event) {
      var changes = [];
      event.preventDefault();
      arrayEach(this.itemsBox.getSourceData(), function (row, rowIndex) {
        row.checked = false;
        changes.push(dataRowToChangesArray(row, rowIndex)[0]);
      });
      this.itemsBox.setSourceDataAtCell(changes);
    }
  }], [{
    key: "DEFAULTS",
    get: function get() {
      return clone({
        className: 'htUIMultipleSelect',
        value: []
      });
    }
  }]);
  return MultipleSelectUI;
}(BaseUI);
export default MultipleSelectUI;

/**
 * Pick up object items based on selected values.
 *
 * @param {Array} availableItems Base collection to compare values.
 * @param {Array} selectedValue Flat array with selected values.
 * @returns {Array}
 */
function valueToItems(availableItems, selectedValue) {
  var arrayAssertion = createArrayAssertion(selectedValue);
  return arrayMap(availableItems, function (item) {
    item.checked = arrayAssertion(item.value);
    return item;
  });
}

/**
 * Convert all checked items into flat array.
 *
 * @param {Array} availableItems Base collection.
 * @returns {Array}
 */
function itemsToValue(availableItems) {
  var items = [];
  arrayEach(availableItems, function (item) {
    if (item.checked) {
      items.push(item.value);
    }
  });
  return items;
}