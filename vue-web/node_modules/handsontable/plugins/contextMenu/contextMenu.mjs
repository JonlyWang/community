function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
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
import { BasePlugin } from "../base/index.mjs";
import Hooks from "../../pluginHooks.mjs";
import { arrayEach } from "../../helpers/array.mjs";
import CommandExecutor from "./commandExecutor.mjs";
import EventManager from "../../eventManager.mjs";
import ItemsFactory from "./itemsFactory.mjs";
import Menu from "./menu.mjs";
import { getWindowScrollLeft, getWindowScrollTop, hasClass } from "../../helpers/dom/element.mjs";
import { ROW_ABOVE, ROW_BELOW, COLUMN_LEFT, COLUMN_RIGHT, REMOVE_ROW, REMOVE_COLUMN, UNDO, REDO, READ_ONLY, ALIGNMENT, SEPARATOR } from "./predefinedItems.mjs";
export var PLUGIN_KEY = 'contextMenu';
export var PLUGIN_PRIORITY = 70;
Hooks.getSingleton().register('afterContextMenuDefaultOptions');
Hooks.getSingleton().register('beforeContextMenuShow');
Hooks.getSingleton().register('afterContextMenuShow');
Hooks.getSingleton().register('afterContextMenuHide');
Hooks.getSingleton().register('afterContextMenuExecute');

/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @class ContextMenu
 * @description
 * This plugin creates the Handsontable Context Menu. It allows to create a new row or column at any place in the
 * grid among [other features](@/guides/accessories-and-menus/context-menu.md#context-menu-with-specific-options).
 * Possible values:
 * * `true` (to enable default options),
 * * `false` (to disable completely)
 * * `{ uiContainer: containerDomElement }` (to declare a container for all of the Context Menu's dom elements to be placed in).
 *
 * or array of any available strings:
 * * `'row_above'`
 * * `'row_below'`
 * * `'col_left'`
 * * `'col_right'`
 * * `'remove_row'`
 * * `'remove_col'`
 * * `'undo'`
 * * `'redo'`
 * * `'make_read_only'`
 * * `'alignment'`
 * * `'---------'` (menu item separator)
 * * `'borders'` (with {@link Options#customBorders} turned on)
 * * `'commentsAddEdit'` (with {@link Options#comments} turned on)
 * * `'commentsRemove'` (with {@link Options#comments} turned on).
 *
 * See [the context menu demo](@/guides/accessories-and-menus/context-menu.md) for examples.
 *
 * @example
 * ```js
 * // as a boolean
 * contextMenu: true
 * // as a array
 * contextMenu: ['row_above', 'row_below', '---------', 'undo', 'redo']
 * ```
 *
 * @plugin ContextMenu
 */
export var ContextMenu = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ContextMenu, _BasePlugin);
  var _super = _createSuper(ContextMenu);
  /**
   * @param {Core} hotInstance Handsontable instance.
   */
  function ContextMenu(hotInstance) {
    var _this;
    _classCallCheck(this, ContextMenu);
    _this = _super.call(this, hotInstance);
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    _this.eventManager = new EventManager(_assertThisInitialized(_this));
    /**
     * Instance of {@link CommandExecutor}.
     *
     * @private
     * @type {CommandExecutor}
     */
    _this.commandExecutor = new CommandExecutor(_this.hot);
    /**
     * Instance of {@link ItemsFactory}.
     *
     * @private
     * @type {ItemsFactory}
     */
    _this.itemsFactory = null;
    /**
     * Instance of {@link Menu}.
     *
     * @private
     * @type {Menu}
     */
    _this.menu = null;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link ContextMenu#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(ContextMenu, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings()[PLUGIN_KEY];
    }

    /**
     * Enables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;
      if (this.enabled) {
        return;
      }
      var settings = this.hot.getSettings()[PLUGIN_KEY];
      if (typeof settings.callback === 'function') {
        this.commandExecutor.setCommonCallback(settings.callback);
      }
      this.menu = new Menu(this.hot, {
        className: 'htContextMenu',
        keepInViewport: true,
        container: settings.uiContainer || this.hot.rootDocument.body
      });
      this.menu.addLocalHook('beforeOpen', function () {
        return _this2.onMenuBeforeOpen();
      });
      this.menu.addLocalHook('afterOpen', function () {
        return _this2.onMenuAfterOpen();
      });
      this.menu.addLocalHook('afterClose', function () {
        return _this2.onMenuAfterClose();
      });
      this.menu.addLocalHook('executeCommand', function () {
        var _this2$executeCommand;
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }
        return (_this2$executeCommand = _this2.executeCommand).call.apply(_this2$executeCommand, [_this2].concat(params));
      });
      this.addHook('afterOnCellContextMenu', function (event) {
        return _this2.onAfterOnCellContextMenu(event);
      });
      _get(_getPrototypeOf(ContextMenu.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`contextMenu`](@/api/options.md#contextmenu)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(ContextMenu.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.close();
      if (this.menu) {
        this.menu.destroy();
        this.menu = null;
      }
      _get(_getPrototypeOf(ContextMenu.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Opens menu and re-position it based on the passed coordinates.
     *
     * @param {Event} event The mouse event object.
     */
  }, {
    key: "open",
    value: function open(event) {
      if (!this.menu) {
        return;
      }
      this.prepareMenuItems();
      this.menu.open();
      if (!this.menu.isOpened()) {
        return;
      }
      var offsetTop = 0;
      var offsetLeft = 0;
      if (this.hot.rootDocument !== this.menu.container.ownerDocument) {
        var frameElement = this.hot.rootWindow.frameElement;
        var _frameElement$getBoun = frameElement.getBoundingClientRect(),
          top = _frameElement$getBoun.top,
          left = _frameElement$getBoun.left;
        offsetTop = top - getWindowScrollTop(event.view);
        offsetLeft = left - getWindowScrollLeft(event.view);
      } else {
        offsetTop = -1 * getWindowScrollTop(this.menu.hotMenu.rootWindow);
        offsetLeft = -1 * getWindowScrollLeft(this.menu.hotMenu.rootWindow);
      }
      this.menu.setPosition({
        top: parseInt(event.pageY, 10) + offsetTop,
        left: parseInt(event.pageX, 10) + offsetLeft
      });
    }

    /**
     * Closes the menu.
     */
  }, {
    key: "close",
    value: function close() {
      if (!this.menu) {
        return;
      }
      this.menu.close();
      this.itemsFactory = null;
    }

    /**
     * Execute context menu command.
     *
     * The `executeCommand()` method works only for selected cells.
     *
     * When no cells are selected, `executeCommand()` doesn't do anything.
     *
     * You can execute all predefined commands:
     *  * `'row_above'` - Insert row above
     *  * `'row_below'` - Insert row below
     *  * `'col_left'` - Insert column left
     *  * `'col_right'` - Insert column right
     *  * `'clear_column'` - Clear selected column
     *  * `'remove_row'` - Remove row
     *  * `'remove_col'` - Remove column
     *  * `'undo'` - Undo last action
     *  * `'redo'` - Redo last action
     *  * `'make_read_only'` - Make cell read only
     *  * `'alignment:left'` - Alignment to the left
     *  * `'alignment:top'` - Alignment to the top
     *  * `'alignment:right'` - Alignment to the right
     *  * `'alignment:bottom'` - Alignment to the bottom
     *  * `'alignment:middle'` - Alignment to the middle
     *  * `'alignment:center'` - Alignment to the center (justify).
     *
     * Or you can execute command registered in settings where `key` is your command name.
     *
     * @param {string} commandName The command name to be executed.
     * @param {*} params Additional parameters passed to command executor module.
     */
  }, {
    key: "executeCommand",
    value: function executeCommand(commandName) {
      var _this$commandExecutor;
      if (this.itemsFactory === null) {
        this.prepareMenuItems();
      }
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      (_this$commandExecutor = this.commandExecutor).execute.apply(_this$commandExecutor, [commandName].concat(params));
    }

    /**
     * Prepares available contextMenu's items list and registers them in commandExecutor.
     *
     * @private
     * @fires Hooks#afterContextMenuDefaultOptions
     * @fires Hooks#beforeContextMenuSetItems
     */
  }, {
    key: "prepareMenuItems",
    value: function prepareMenuItems() {
      var _this3 = this;
      this.itemsFactory = new ItemsFactory(this.hot, ContextMenu.DEFAULT_ITEMS);
      var settings = this.hot.getSettings()[PLUGIN_KEY];
      var predefinedItems = {
        items: this.itemsFactory.getItems(settings)
      };
      this.hot.runHooks('afterContextMenuDefaultOptions', predefinedItems);
      this.itemsFactory.setPredefinedItems(predefinedItems.items);
      var menuItems = this.itemsFactory.getItems(settings);
      this.hot.runHooks('beforeContextMenuSetItems', menuItems);
      this.menu.setMenuItems(menuItems);

      // Register all commands. Predefined and added by user or by plugins
      arrayEach(menuItems, function (command) {
        return _this3.commandExecutor.registerCommand(command.key, command);
      });
    }

    /**
     * On contextmenu listener.
     *
     * @private
     * @param {Event} event The mouse event object.
     */
  }, {
    key: "onAfterOnCellContextMenu",
    value: function onAfterOnCellContextMenu(event) {
      var settings = this.hot.getSettings();
      var showRowHeaders = settings.rowHeaders;
      var showColHeaders = settings.colHeaders;

      /**
       * @private
       * @param {HTMLElement} element The element to validate.
       * @returns {boolean}
       */
      function isValidElement(element) {
        return element.nodeName === 'TD' || element.parentNode.nodeName === 'TD';
      }
      var element = event.target;
      this.close();
      if (hasClass(element, 'handsontableInput')) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (!(showRowHeaders || showColHeaders)) {
        if (!isValidElement(element) && !(hasClass(element, 'current') && hasClass(element, 'wtBorder'))) {
          return;
        }
      }
      this.open(event);
    }

    /**
     * On menu before open listener.
     *
     * @private
     */
  }, {
    key: "onMenuBeforeOpen",
    value: function onMenuBeforeOpen() {
      this.hot.runHooks('beforeContextMenuShow', this);
    }

    /**
     * On menu after open listener.
     *
     * @private
     */
  }, {
    key: "onMenuAfterOpen",
    value: function onMenuAfterOpen() {
      this.hot.runHooks('afterContextMenuShow', this);
    }

    /**
     * On menu after close listener.
     *
     * @private
     */
  }, {
    key: "onMenuAfterClose",
    value: function onMenuAfterClose() {
      this.hot.listen();
      this.hot.runHooks('afterContextMenuHide', this);
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.close();
      if (this.menu) {
        this.menu.destroy();
      }
      _get(_getPrototypeOf(ContextMenu.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }, {
    key: "PLUGIN_DEPS",
    get: function get() {
      return ['plugin:AutoColumnSize'];
    }

    /**
     * Context menu default items order when `contextMenu` options is set as `true`.
     *
     * @returns {string[]}
     */
  }, {
    key: "DEFAULT_ITEMS",
    get: function get() {
      return [ROW_ABOVE, ROW_BELOW, SEPARATOR, COLUMN_LEFT, COLUMN_RIGHT, SEPARATOR, REMOVE_ROW, REMOVE_COLUMN, SEPARATOR, UNDO, REDO, SEPARATOR, READ_ONLY, SEPARATOR, ALIGNMENT];
    }
  }]);
  return ContextMenu;
}(BasePlugin);
ContextMenu.SEPARATOR = {
  name: SEPARATOR
};