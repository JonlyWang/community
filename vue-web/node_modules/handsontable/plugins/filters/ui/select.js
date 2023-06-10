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
require("core-js/modules/es.function.name.js");
var _menu = _interopRequireDefault(require("../../../plugins/contextMenu/menu"));
var _object = require("../../../helpers/object");
var _array = require("../../../helpers/array");
var C = _interopRequireWildcard(require("../../../i18n/constants"));
var _predefinedItems = require("../../../plugins/contextMenu/predefinedItems");
var _base = _interopRequireDefault(require("./_base"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
 * @class SelectUI
 */
var SelectUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(SelectUI, _BaseUI);
  var _super = _createSuper(SelectUI);
  function SelectUI(hotInstance, options) {
    var _this;
    _classCallCheck(this, SelectUI);
    _this = _super.call(this, hotInstance, (0, _object.extend)(SelectUI.DEFAULTS, options));
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
      (0, _array.arrayEach)(items, function (item) {
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
      this.menu = new _menu.default(this.hot, {
        className: 'htSelectUI htFiltersConditionsMenu',
        keepInViewport: false,
        standalone: true,
        container: this.options.menuContainer
      });
      this.menu.setMenuItems(this.items);
      var caption = new _base.default(this.hot, {
        className: 'htUISelectCaption'
      });
      var dropdown = new _base.default(this.hot, {
        className: 'htUISelectDropdown'
      });
      var priv = privatePool.get(this);
      priv.caption = caption;
      priv.captionElement = caption.element;
      priv.dropdown = dropdown;
      (0, _array.arrayEach)([caption, dropdown], function (element) {
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
      if (command.name !== _predefinedItems.SEPARATOR) {
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
      return (0, _object.clone)({
        className: 'htUISelect',
        wrapIt: false
      });
    }
  }]);
  return SelectUI;
}(_base.default);
var _default = SelectUI;
exports.default = _default;