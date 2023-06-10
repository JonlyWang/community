function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.array.index-of.js";
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
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
import { BaseEditor, EDITOR_STATE } from "../baseEditor/index.mjs";
import EventManager from "../../eventManager.mjs";
import { isMobileBrowser, isIE, isEdge, isIOS } from "../../helpers/browser.mjs";
import { addClass, getComputedStyle, setCaretPosition, hasClass, removeClass } from "../../helpers/dom/element.mjs";
import { rangeEach } from "../../helpers/number.mjs";
import { KEY_CODES } from "../../helpers/unicode.mjs";
import { autoResize } from "../../3rdparty/autoResize/index.mjs";
import { isDefined } from "../../helpers/mixed.mjs";
import { SHORTCUTS_GROUP_NAVIGATION, SHORTCUTS_GROUP_EDITOR as EDITOR_MANAGER_GROUP } from "../../editorManager.mjs";
import { SHORTCUTS_GROUP_EDITOR } from "../baseEditor/baseEditor.mjs";
import { updateCaretPosition } from "./caretPositioner.mjs";
var EDITOR_VISIBLE_CLASS_NAME = 'ht_editor_visible';
var EDITOR_HIDDEN_CLASS_NAME = 'ht_editor_hidden';
var SHORTCUTS_GROUP = 'textEditor';
export var EDITOR_TYPE = 'text';

/**
 * @private
 * @class TextEditor
 */
export var TextEditor = /*#__PURE__*/function (_BaseEditor) {
  _inherits(TextEditor, _BaseEditor);
  var _super = _createSuper(TextEditor);
  /**
   * @param {Core} instance The Handsontable instance.
   */
  function TextEditor(instance) {
    var _this;
    _classCallCheck(this, TextEditor);
    _this = _super.call(this, instance);
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    _this.eventManager = new EventManager(_assertThisInitialized(_this));
    /**
     * Autoresize instance. Automagically resizes editor after changes.
     *
     * @private
     * @type {autoResize}
     */
    _this.autoResize = autoResize();
    /**
     * An TEXTAREA element.
     *
     * @private
     * @type {HTMLTextAreaElement}
     */
    _this.TEXTAREA = void 0;
    /**
     * Style declaration object of the TEXTAREA element.
     *
     * @private
     * @type {CSSStyleDeclaration}
     */
    _this.textareaStyle = void 0;
    /**
     * Parent element of the TEXTAREA.
     *
     * @private
     * @type {HTMLDivElement}
     */
    _this.TEXTAREA_PARENT = void 0;
    /**
     * Style declaration object of the TEXTAREA_PARENT element.
     *
     * @private
     * @type {CSSStyleDeclaration}
     */
    _this.textareaParentStyle = void 0;
    /**
     * Z-index class style for the editor.
     *
     * @private
     * @type {string}
     */
    _this.layerClass = void 0;
    _this.createElements();
    _this.bindEvents();
    _this.hot.addHookOnce('afterDestroy', function () {
      return _this.destroy();
    });
    return _this;
  }

  /**
   * Gets current value from editable element.
   *
   * @returns {number}
   */
  _createClass(TextEditor, [{
    key: "getValue",
    value: function getValue() {
      return this.TEXTAREA.value;
    }

    /**
     * Sets new value into editable element.
     *
     * @param {*} newValue The editor value.
     */
  }, {
    key: "setValue",
    value: function setValue(newValue) {
      this.TEXTAREA.value = newValue;
    }

    /**
     * Opens the editor and adjust its size.
     */
  }, {
    key: "open",
    value: function open() {
      var _this2 = this;
      this.refreshDimensions(); // need it instantly, to prevent https://github.com/handsontable/handsontable/issues/348
      this.showEditableElement();
      var shortcutManager = this.hot.getShortcutManager();
      shortcutManager.setActiveContextName('editor');
      this.addHook('afterDocumentKeyDown', function (event) {
        return _this2.onAfterDocumentKeyDown(event);
      });
      this.registerShortcuts();
    }

    /**
     * Closes the editor.
     */
  }, {
    key: "close",
    value: function close() {
      this.autoResize.unObserve();
      if (this.hot.rootDocument.activeElement === this.TEXTAREA) {
        this.hot.listen(); // don't refocus the table if user focused some cell outside of HT on purpose
      }

      this.hideEditableElement();
      this.unregisterShortcuts();
      this.removeHooksByKey('afterDocumentKeyDown');
    }

    /**
     * Prepares editor's meta data.
     *
     * @param {number} row The visual row index.
     * @param {number} col The visual column index.
     * @param {number|string} prop The column property (passed when datasource is an array of objects).
     * @param {HTMLTableCellElement} td The rendered cell element.
     * @param {*} value The rendered value.
     * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
     */
  }, {
    key: "prepare",
    value: function prepare(row, col, prop, td, value, cellProperties) {
      var previousState = this.state;
      _get(_getPrototypeOf(TextEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);
      if (!cellProperties.readOnly) {
        this.refreshDimensions(true);
        var allowInvalid = cellProperties.allowInvalid,
          fragmentSelection = cellProperties.fragmentSelection;
        if (allowInvalid) {
          // Remove an empty space from textarea (added by copyPaste plugin to make copy/paste
          // functionality work with IME)
          this.TEXTAREA.value = '';
        }
        if (previousState !== EDITOR_STATE.FINISHED) {
          this.hideEditableElement();
        }

        // @TODO: The fragmentSelection functionality is conflicted with IME. For this feature
        // refocus has to be disabled (to make IME working).
        var restoreFocus = !fragmentSelection;
        if (restoreFocus && !isMobileBrowser()) {
          this.focus();
        }
      }
    }

    /**
     * Begins editing on a highlighted cell and hides fillHandle corner if was present.
     *
     * @param {*} newInitialValue The editor initial value.
     * @param {Event} event The keyboard event object.
     */
  }, {
    key: "beginEditing",
    value: function beginEditing(newInitialValue, event) {
      if (this.state !== EDITOR_STATE.VIRGIN) {
        return;
      }
      this.TEXTAREA.value = ''; // Remove an empty space from textarea (added by copyPaste plugin to make copy/paste functionality work with IME).
      _get(_getPrototypeOf(TextEditor.prototype), "beginEditing", this).call(this, newInitialValue, event);
    }

    /**
     * Sets focus state on the select element.
     */
  }, {
    key: "focus",
    value: function focus() {
      // For IME editor textarea element must be focused using ".select" method.
      // Using ".focus" browser automatically scroll into the focused element which
      // is undesired effect.
      this.TEXTAREA.select();
      setCaretPosition(this.TEXTAREA, this.TEXTAREA.value.length);
    }

    /**
     * Creates an editor's elements and adds necessary CSS classnames.
     */
  }, {
    key: "createElements",
    value: function createElements() {
      var rootDocument = this.hot.rootDocument;
      this.TEXTAREA = rootDocument.createElement('TEXTAREA');
      this.TEXTAREA.setAttribute('data-hot-input', ''); // Makes the element recognizable by Hot as its own component's element.
      this.TEXTAREA.tabIndex = -1;
      addClass(this.TEXTAREA, 'handsontableInput');
      this.textareaStyle = this.TEXTAREA.style;
      this.textareaStyle.width = 0;
      this.textareaStyle.height = 0;
      this.textareaStyle.overflowY = 'visible';
      this.TEXTAREA_PARENT = rootDocument.createElement('DIV');
      addClass(this.TEXTAREA_PARENT, 'handsontableInputHolder');
      if (hasClass(this.TEXTAREA_PARENT, this.layerClass)) {
        removeClass(this.TEXTAREA_PARENT, this.layerClass);
      }
      addClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME);
      this.textareaParentStyle = this.TEXTAREA_PARENT.style;
      this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);
      this.hot.rootElement.appendChild(this.TEXTAREA_PARENT);
    }

    /**
     * Moves an editable element out of the viewport, but element must be able to hold focus for IME support.
     *
     * @private
     */
  }, {
    key: "hideEditableElement",
    value: function hideEditableElement() {
      if (isIE() || isEdge()) {
        this.textareaStyle.textIndent = '-99999px';
      }
      this.textareaStyle.overflowY = 'visible';
      this.textareaParentStyle.opacity = '0';
      this.textareaParentStyle.height = '1px';
      removeClass(this.TEXTAREA_PARENT, this.layerClass);
      addClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME);
    }

    /**
     * Resets an editable element position.
     *
     * @private
     */
  }, {
    key: "showEditableElement",
    value: function showEditableElement() {
      this.textareaParentStyle.height = '';
      this.textareaParentStyle.overflow = '';
      this.textareaParentStyle.position = '';
      this.textareaParentStyle[this.hot.isRtl() ? 'left' : 'right'] = 'auto';
      this.textareaParentStyle.opacity = '1';
      this.textareaStyle.textIndent = '';
      this.textareaStyle.overflowY = 'hidden';
      var childNodes = this.TEXTAREA_PARENT.childNodes;
      var hasClassHandsontableEditor = false;
      rangeEach(childNodes.length - 1, function (index) {
        var childNode = childNodes[index];
        if (hasClass(childNode, 'handsontableEditor')) {
          hasClassHandsontableEditor = true;
          return false;
        }
      });
      if (hasClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME)) {
        removeClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME);
      }
      if (hasClassHandsontableEditor) {
        this.layerClass = EDITOR_VISIBLE_CLASS_NAME;
        addClass(this.TEXTAREA_PARENT, this.layerClass);
      } else {
        this.layerClass = this.getEditedCellsLayerClass();
        addClass(this.TEXTAREA_PARENT, this.layerClass);
      }
    }

    /**
     * Refreshes editor's value using source data.
     *
     * @private
     */
  }, {
    key: "refreshValue",
    value: function refreshValue() {
      var physicalRow = this.hot.toPhysicalRow(this.row);
      var sourceData = this.hot.getSourceDataAtCell(physicalRow, this.col);
      this.originalValue = sourceData;
      this.setValue(sourceData);
      this.refreshDimensions();
    }

    /**
     * Refreshes editor's size and position.
     *
     * @private
     * @param {boolean} force Indicates if the refreshing editor dimensions should be triggered.
     */
  }, {
    key: "refreshDimensions",
    value: function refreshDimensions() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.state !== EDITOR_STATE.EDITING && !force) {
        return;
      }
      this.TD = this.getEditedCell();

      // TD is outside of the viewport.
      if (!this.TD) {
        if (!force) {
          this.close(); // TODO shouldn't it be this.finishEditing() ?
        }

        return;
      }
      var _this$getEditedCellRe = this.getEditedCellRect(),
        top = _this$getEditedCellRe.top,
        start = _this$getEditedCellRe.start,
        width = _this$getEditedCellRe.width,
        maxWidth = _this$getEditedCellRe.maxWidth,
        height = _this$getEditedCellRe.height,
        maxHeight = _this$getEditedCellRe.maxHeight;
      this.textareaParentStyle.top = "".concat(top, "px");
      this.textareaParentStyle[this.hot.isRtl() ? 'right' : 'left'] = "".concat(start, "px");
      this.showEditableElement();
      var cellComputedStyle = getComputedStyle(this.TD, this.hot.rootWindow);
      this.TEXTAREA.style.fontSize = cellComputedStyle.fontSize;
      this.TEXTAREA.style.fontFamily = cellComputedStyle.fontFamily;
      this.TEXTAREA.style.backgroundColor = this.TD.style.backgroundColor;
      var textareaComputedStyle = getComputedStyle(this.TEXTAREA);
      var horizontalPadding = parseInt(textareaComputedStyle.paddingLeft, 10) + parseInt(textareaComputedStyle.paddingRight, 10);
      var verticalPadding = parseInt(textareaComputedStyle.paddingTop, 10) + parseInt(textareaComputedStyle.paddingBottom, 10);
      var finalWidth = width - horizontalPadding;
      var finalHeight = height - verticalPadding;
      var finalMaxWidth = maxWidth - horizontalPadding;
      var finalMaxHeight = maxHeight - verticalPadding;
      this.autoResize.init(this.TEXTAREA, {
        minWidth: Math.min(finalWidth, finalMaxWidth),
        minHeight: Math.min(finalHeight, finalMaxHeight),
        // TEXTAREA should never be wider than visible part of the viewport (should not cover the scrollbar)
        maxWidth: finalMaxWidth,
        maxHeight: finalMaxHeight
      }, true);
    }

    /**
     * Binds events and hooks.
     *
     * @private
     */
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this3 = this;
      this.eventManager.addEventListener(this.TEXTAREA, 'cut', function (event) {
        return event.stopPropagation();
      });
      this.eventManager.addEventListener(this.TEXTAREA, 'paste', function (event) {
        return event.stopPropagation();
      });
      if (isIOS()) {
        // on iOS after click "Done" the edit isn't hidden by default, so we need to handle it manually.
        this.eventManager.addEventListener(this.TEXTAREA, 'focusout', function () {
          return _this3.finishEditing(false);
        });
      }
      this.addHook('afterScrollHorizontally', function () {
        return _this3.refreshDimensions();
      });
      this.addHook('afterScrollVertically', function () {
        return _this3.refreshDimensions();
      });
      this.addHook('afterColumnResize', function () {
        _this3.refreshDimensions();
        _this3.focus();
      });
      this.addHook('afterRowResize', function () {
        _this3.refreshDimensions();
        _this3.focus();
      });
    }

    /**
     * Ugly hack for autocompleteEditor.
     *
     * @private
     */
  }, {
    key: "allowKeyEventPropagation",
    value: function allowKeyEventPropagation() {}

    /**
     * Destroys the internal event manager and clears attached hooks.
     *
     * @private
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.eventManager.destroy();
      this.clearHooks();
    }

    /**
     * Register shortcuts responsible for handling editor.
     *
     * @private
     */
  }, {
    key: "registerShortcuts",
    value: function registerShortcuts() {
      var _this4 = this;
      var shortcutManager = this.hot.getShortcutManager();
      var editorContext = shortcutManager.getContext('editor');
      var contextConfig = {
        runOnlyIf: function runOnlyIf() {
          return isDefined(_this4.hot.getSelected());
        },
        group: SHORTCUTS_GROUP
      };
      var insertNewLine = function insertNewLine() {
        _this4.hot.rootDocument.execCommand('insertText', false, '\n');
      };
      editorContext.addShortcuts([{
        keys: [['Tab']],
        // TODO: Duplicated part of code (callback to shortcut).
        callback: function callback(event) {
          var tableMeta = _this4.hot.getSettings();
          var tabMoves = typeof tableMeta.tabMoves === 'function' ? tableMeta.tabMoves(event) : tableMeta.tabMoves;
          _this4.hot.selection.transformStart(tabMoves.row, tabMoves.col, true);
        }
      }, {
        keys: [['Shift', 'Tab']],
        // TODO: Duplicated part of code (callback to shortcut).
        callback: function callback(event) {
          var tableMeta = _this4.hot.getSettings();
          var tabMoves = typeof tableMeta.tabMoves === 'function' ? tableMeta.tabMoves(event) : tableMeta.tabMoves;
          _this4.hot.selection.transformStart(-tabMoves.row, -tabMoves.col);
        }
      }, {
        keys: [['Control', 'Enter']],
        callback: function callback() {
          insertNewLine();
          return false; // Will block closing editor.
        },

        runOnlyIf: function runOnlyIf(event) {
          return !_this4.hot.selection.isMultiple() &&
          // We trigger a data population for multiple selection.
          // catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)
          !event.altKey;
        },
        relativeToGroup: EDITOR_MANAGER_GROUP,
        position: 'before'
      }, {
        keys: [['Meta', 'Enter']],
        callback: function callback() {
          insertNewLine();
          return false; // Will block closing editor.
        },

        runOnlyIf: function runOnlyIf() {
          return !_this4.hot.selection.isMultiple();
        },
        // We trigger a data population for multiple selection.
        relativeToGroup: EDITOR_MANAGER_GROUP,
        position: 'before'
      }, {
        keys: [['Alt', 'Enter']],
        callback: function callback() {
          insertNewLine();
          return false; // Will block closing editor.
        },

        relativeToGroup: EDITOR_MANAGER_GROUP,
        position: 'before'
      }, {
        // TODO: Duplicated part of code (callback to shortcut)
        keys: [['PageUp']],
        callback: function callback() {
          _this4.hot.selection.transformStart(-_this4.hot.countVisibleRows(), 0);
        }
      }, {
        // TODO: Duplicated part of code (callback to shortcut)
        keys: [['PageDown']],
        callback: function callback() {
          _this4.hot.selection.transformStart(_this4.hot.countVisibleRows(), 0);
        }
      }, {
        keys: [['Home']],
        callback: function callback(event, _ref) {
          var _ref2 = _slicedToArray(_ref, 1),
            keyName = _ref2[0];
          updateCaretPosition(keyName, _this4.TEXTAREA);
        }
      }, {
        keys: [['End']],
        callback: function callback(event, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 1),
            keyName = _ref4[0];
          updateCaretPosition(keyName, _this4.TEXTAREA);
        }
      }, {
        keys: [['Control/Meta', 'Z']],
        preventDefault: false,
        callback: function callback() {
          _this4.hot._registerTimeout(function () {
            _this4.autoResize.resize();
          }, 10);
        }
      }, {
        keys: [['Control/Meta', 'Shift', 'Z']],
        preventDefault: false,
        callback: function callback() {
          _this4.hot._registerTimeout(function () {
            _this4.autoResize.resize();
          }, 10);
        }
      }], contextConfig);
    }

    /**
     * Unregister shortcuts responsible for handling editor.
     *
     * @private
     */
  }, {
    key: "unregisterShortcuts",
    value: function unregisterShortcuts() {
      var shortcutManager = this.hot.getShortcutManager();
      var editorContext = shortcutManager.getContext('editor');
      editorContext.removeShortcutsByGroup(SHORTCUTS_GROUP_NAVIGATION);
      editorContext.removeShortcutsByGroup(SHORTCUTS_GROUP);
      editorContext.removeShortcutsByGroup(SHORTCUTS_GROUP_EDITOR);
    }

    /**
     * OnAfterDocumentKeyDown callback.
     *
     * @private
     * @param {KeyboardEvent} event The keyboard event object.
     */
  }, {
    key: "onAfterDocumentKeyDown",
    value: function onAfterDocumentKeyDown(event) {
      var arrowKeyCodes = [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT];
      if (arrowKeyCodes.indexOf(event.keyCode) === -1) {
        this.autoResize.resize(String.fromCharCode(event.keyCode));
      }
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);
  return TextEditor;
}(BaseEditor);