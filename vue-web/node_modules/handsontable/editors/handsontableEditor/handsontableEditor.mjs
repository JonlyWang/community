function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import { TextEditor } from "../textEditor/index.mjs";
import { setCaretPosition } from "../../helpers/dom/element.mjs";
import { stopImmediatePropagation } from "../../helpers/dom/event.mjs";
import { extend } from "../../helpers/object.mjs";
import { SHORTCUTS_GROUP_NAVIGATION } from "../../editorManager.mjs";
var SHORTCUTS_GROUP = 'handsontableEditor';
export var EDITOR_TYPE = 'handsontable';

/**
 * @private
 * @class HandsontableEditor
 */
export var HandsontableEditor = /*#__PURE__*/function (_TextEditor) {
  _inherits(HandsontableEditor, _TextEditor);
  var _super = _createSuper(HandsontableEditor);
  function HandsontableEditor() {
    _classCallCheck(this, HandsontableEditor);
    return _super.apply(this, arguments);
  }
  _createClass(HandsontableEditor, [{
    key: "open",
    value:
    /**
     * Opens the editor and adjust its size.
     */
    function open() {
      _get(_getPrototypeOf(HandsontableEditor.prototype), "open", this).call(this);
      if (this.htEditor) {
        this.htEditor.destroy();
      }
      if (this.htContainer.style.display === 'none') {
        this.htContainer.style.display = '';
      }

      // Constructs and initializes a new Handsontable instance
      this.htEditor = new this.hot.constructor(this.htContainer, this.htOptions);
      this.htEditor.init();
      this.htEditor.rootElement.style.display = '';
      if (this.cellProperties.strict) {
        this.htEditor.selectCell(0, 0);
      } else {
        this.htEditor.deselectCell();
      }
      setCaretPosition(this.TEXTAREA, 0, this.TEXTAREA.value.length);
      this.refreshDimensions();
    }

    /**
     * Closes the editor.
     */
  }, {
    key: "close",
    value: function close() {
      if (this.htEditor) {
        this.htEditor.rootElement.style.display = 'none';
      }
      this.removeHooksByKey('beforeKeyDown');
      _get(_getPrototypeOf(HandsontableEditor.prototype), "close", this).call(this);
    }

    /**
     * Prepares editor's meta data and configuration of the internal Handsontable's instance.
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
      _get(_getPrototypeOf(HandsontableEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);
      var parent = this;
      var options = {
        startRows: 0,
        startCols: 0,
        minRows: 0,
        minCols: 0,
        className: 'listbox',
        copyPaste: false,
        autoColumnSize: false,
        autoRowSize: false,
        readOnly: true,
        fillHandle: false,
        autoWrapCol: false,
        autoWrapRow: false,
        afterOnCellMouseDown: function afterOnCellMouseDown(_, coords) {
          var sourceValue = this.getSourceData(coords.row, coords.col);

          // if the value is undefined then it means we don't want to set the value
          if (sourceValue !== void 0) {
            parent.setValue(sourceValue);
          }
          parent.instance.destroyEditor();
        },
        preventWheel: true,
        layoutDirection: this.hot.isRtl() ? 'rtl' : 'ltr'
      };
      if (this.cellProperties.handsontable) {
        extend(options, cellProperties.handsontable);
      }
      this.htOptions = options;
    }

    /**
     * Begins editing on a highlighted cell and hides fillHandle corner if was present.
     *
     * @param {*} newInitialValue The editor initial value.
     * @param {*} event The keyboard event object.
     */
  }, {
    key: "beginEditing",
    value: function beginEditing(newInitialValue, event) {
      var onBeginEditing = this.hot.getSettings().onBeginEditing;
      if (onBeginEditing && onBeginEditing() === false) {
        return;
      }
      _get(_getPrototypeOf(HandsontableEditor.prototype), "beginEditing", this).call(this, newInitialValue, event);
    }

    /**
     * Creates an editor's elements and adds necessary CSS classnames.
     */
  }, {
    key: "createElements",
    value: function createElements() {
      _get(_getPrototypeOf(HandsontableEditor.prototype), "createElements", this).call(this);
      var DIV = this.hot.rootDocument.createElement('DIV');
      DIV.className = 'handsontableEditor';
      this.TEXTAREA_PARENT.appendChild(DIV);
      this.htContainer = DIV;
      this.assignHooks();
    }

    /**
     * Finishes editing and start saving or restoring process for editing cell or last selected range.
     *
     * @param {boolean} restoreOriginalValue If true, then closes editor without saving value from the editor into a cell.
     * @param {boolean} ctrlDown If true, then saveValue will save editor's value to each cell in the last selected range.
     * @param {Function} callback The callback function, fired after editor closing.
     */
  }, {
    key: "finishEditing",
    value: function finishEditing(restoreOriginalValue, ctrlDown, callback) {
      if (this.htEditor && this.htEditor.isListening()) {
        // if focus is still in the HOT editor
        this.hot.listen(); // return the focus to the parent HOT instance
      }

      if (this.htEditor && this.htEditor.getSelectedLast()) {
        var value = this.htEditor.getInstance().getValue();
        if (value !== void 0) {
          // if the value is undefined then it means we don't want to set the value
          this.setValue(value);
        }
      }
      _get(_getPrototypeOf(HandsontableEditor.prototype), "finishEditing", this).call(this, restoreOriginalValue, ctrlDown, callback);
    }

    /**
     * Assings afterDestroy callback to prevent memory leaks.
     *
     * @private
     */
  }, {
    key: "assignHooks",
    value: function assignHooks() {
      var _this = this;
      this.hot.addHook('afterDestroy', function () {
        if (_this.htEditor) {
          _this.htEditor.destroy();
        }
      });
    }

    /**
     * Register shortcuts responsible for handling editor.
     *
     * @private
     */
  }, {
    key: "registerShortcuts",
    value: function registerShortcuts() {
      var _this2 = this;
      var shortcutManager = this.hot.getShortcutManager();
      var editorContext = shortcutManager.getContext('editor');
      _get(_getPrototypeOf(HandsontableEditor.prototype), "registerShortcuts", this).call(this);
      var contextConfig = {
        group: SHORTCUTS_GROUP,
        relativeToGroup: SHORTCUTS_GROUP_NAVIGATION,
        position: 'before'
      };
      var action = function action(rowToSelect, event) {
        var innerHOT = _this2.htEditor.getInstance();
        if (rowToSelect !== void 0) {
          if (rowToSelect < 0 || innerHOT.flipped && rowToSelect > innerHOT.countRows() - 1) {
            innerHOT.deselectCell();
          } else {
            innerHOT.selectCell(rowToSelect, 0);
          }
          if (innerHOT.getData().length) {
            event.preventDefault();
            stopImmediatePropagation(event);
            _this2.hot.listen();
            _this2.TEXTAREA.focus();
            return false;
          }
        }
      };
      editorContext.addShortcuts([{
        keys: [['ArrowUp']],
        callback: function callback(event) {
          var innerHOT = _this2.htEditor.getInstance();
          var rowToSelect;
          var selectedRow;
          if (!innerHOT.getSelectedLast() && innerHOT.flipped) {
            rowToSelect = innerHOT.countRows() - 1;
          } else if (innerHOT.getSelectedLast()) {
            if (innerHOT.flipped) {
              selectedRow = innerHOT.getSelectedLast()[0];
              rowToSelect = Math.max(0, selectedRow - 1);
            } else {
              selectedRow = innerHOT.getSelectedLast()[0];
              rowToSelect = selectedRow - 1;
            }
          }
          return action(rowToSelect, event);
        },
        preventDefault: false // Doesn't block default behaviour (navigation) for a `textArea` HTMLElement.
      }, {
        keys: [['ArrowDown']],
        callback: function callback(event) {
          var innerHOT = _this2.htEditor.getInstance();
          var rowToSelect;
          var selectedRow;
          if (!innerHOT.getSelectedLast() && !innerHOT.flipped) {
            rowToSelect = 0;
          } else if (innerHOT.getSelectedLast()) {
            if (innerHOT.flipped) {
              rowToSelect = innerHOT.getSelectedLast()[0] + 1;
            } else if (!innerHOT.flipped) {
              var lastRow = innerHOT.countRows() - 1;
              selectedRow = innerHOT.getSelectedLast()[0];
              rowToSelect = Math.min(lastRow, selectedRow + 1);
            }
          }
          return action(rowToSelect, event);
        },
        preventDefault: false // Doesn't block default behaviour (navigation) for a `textArea` HTMLElement.
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
      _get(_getPrototypeOf(HandsontableEditor.prototype), "unregisterShortcuts", this).call(this);
      var shortcutManager = this.hot.getShortcutManager();
      var editorContext = shortcutManager.getContext('editor');
      editorContext.removeShortcutsByGroup(SHORTCUTS_GROUP);
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);
  return HandsontableEditor;
}(TextEditor);