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
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import Menu from "../../../plugins/contextMenu/menu.mjs";
import { clone, extend } from "../../../helpers/object.mjs";
import { arrayEach } from "../../../helpers/array.mjs";
import * as C from "../../../i18n/constants.mjs";
import { SEPARATOR } from "../../../plugins/contextMenu/predefinedItems.mjs";
import BaseUI from "./_base.mjs";
var privatePool = new WeakMap();

/**
 * @private
 * @class SelectUI
 */
var SelectUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(SelectUI, _BaseUI);
  var _super = _createSuper(SelectUI);
  function SelectUI(hotInstance, options) {
    var _this;
    _classCallCheck(this, SelectUI);
    _this = _super.call(this, hotInstance, extend(SelectUI.DEFAULTS, options));
    privatePool.set(_assertThisInitialized(_this), {});
    /**
     * Instance of {@link Menu}.
     *
     * @type {Menu}
     */
    _this.menu = null;
    /**
     * List of available select options.
     *
     * @type {Array}
     */
    _this.items = [];
    _this.registerHooks();
    return _this;
  }

  /**
   * Register all necessary hooks.
   */
  _createClass(SelectUI, [{
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;
      this.addLocalHook('click', function () {
        return _this2.onClick();
      });
    }

    /**
     * Set options which can be selected in the list.
     *
     * @param {Array} items Array of objects with required keys `key` and `name`.
     */
  }, {
    key: "setItems",
    value: function setItems(items) {
      this.items = this.translateNames(items);
      if (this.menu) {
        this.menu.setMenuItems(this.items);
      }
    }

    /**
     * Translate names of menu items.
     *
     * @param {Array} items Array of objects with required keys `key` and `name`.
     * @returns {Array} Items with translated `name` keys.
     */
  }, {
    key: "translateNames",
    value: function translateNames(items) {
      var _this3 = this;
      arrayEach(items, function (item) {
        item.name = _this3.translateIfPossible(item.name);
      });
      return items;
    }

    /**
     * Build DOM structure.
     */
  }, {
    key: "build",
    value: function build() {
      var _this4 = this;
      _get(_getPrototypeOf(SelectUI.prototype), "build", this).call(this);
      this.menu = new Menu(this.hot, {
        className: 'htSelectUI htFiltersConditionsMenu',
        keepInViewport: false,
        standalone: true,
        container: this.options.menuContainer
      });
      this.menu.setMenuItems(this.items);
      var caption = new BaseUI(this.hot, {
        className: 'htUISelectCaption'
      });
      var dropdown = new BaseUI(this.hot, {
        className: 'htUISelectDropdown'
      });
      var priv = privatePool.get(this);
      priv.caption = caption;
      priv.captionElement = caption.element;
      priv.dropdown = dropdown;
      arrayEach([caption, dropdown], function (element) {
        return _this4._element.appendChild(element.element);
      });
      this.menu.addLocalHook('select', function (command) {
        return _this4.onMenuSelect(command);
      });
      this.menu.addLocalHook('afterClose', function () {
        return _this4.onMenuClosed();
      });
      this.update();
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
      var conditionName;
      if (this.options.value) {
        conditionName = this.options.value.name;
      } else {
        conditionName = this.menu.hot.getTranslatedPhrase(C.FILTERS_CONDITIONS_NONE);
      }
      privatePool.get(this).captionElement.textContent = conditionName;
      _get(_getPrototypeOf(SelectUI.prototype), "update", this).call(this);
    }

    /**
     * Open select dropdown menu with available options.
     */
  }, {
    key: "openOptions",
    value: function openOptions() {
      var rect = this.element.getBoundingClientRect();
      if (this.menu) {
        this.menu.open();
        this.menu.setPosition({
          left: this.hot.isLtr() ? rect.left - 5 : rect.left - 31,
          top: rect.top - 1,
          width: rect.width,
          height: rect.height
        });
      }
    }

    /**
     * Close select dropdown menu.
     */
  }, {
    key: "closeOptions",
    value: function closeOptions() {
      if (this.menu) {
        this.menu.close();
      }
    }

    /**
     * On menu selected listener.
     *
     * @private
     * @param {object} command Selected item.
     */
  }, {
    key: "onMenuSelect",
    value: function onMenuSelect(command) {
      if (command.name !== SEPARATOR) {
        this.options.value = command;
        this.update();
        this.runLocalHooks('select', this.options.value);
      }
    }

    /**
     * On menu closed listener.
     *
     * @private
     */
  }, {
    key: "onMenuClosed",
    value: function onMenuClosed() {
      this.runLocalHooks('afterClose');
    }

    /**
     * On element click listener.
     *
     * @private
     */
  }, {
    key: "onClick",
    value: function onClick() {
      this.openOptions();
    }

    /**
     * Destroy instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.menu) {
        this.menu.destroy();
        this.menu = null;
      }
      var _privatePool$get = privatePool.get(this),
        caption = _privatePool$get.caption,
        dropdown = _privatePool$get.dropdown;
      if (caption) {
        caption.destroy();
      }
      if (dropdown) {
        dropdown.destroy();
      }
      _get(_getPrototypeOf(SelectUI.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "DEFAULTS",
    get: function get() {
      return clone({
        className: 'htUISelect',
        wrapIt: false
      });
    }
  }]);
  return SelectUI;
}(BaseUI);
export default SelectUI;