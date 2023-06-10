"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.EDITOR_TYPE = exports.DateEditor = void 0;
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _moment = _interopRequireDefault(require("moment"));
var _pikaday = _interopRequireDefault(require("pikaday"));
var _textEditor = require("../textEditor");
var _eventManager = _interopRequireDefault(require("../../eventManager"));
var _element = require("../../helpers/dom/element");
var _object = require("../../helpers/object");
var _unicode = require("../../helpers/unicode");
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
var EDITOR_TYPE = 'date';
exports.EDITOR_TYPE = EDITOR_TYPE;
var SHORTCUTS_GROUP_EDITOR = 'dateEditor';

/**
 * @private
 * @class DateEditor
 */
var DateEditor = /*#__PURE__*/function (_TextEditor) {
  _inherits(DateEditor, _TextEditor);
  var _super = _createSuper(DateEditor);
  /**
   * @param {Core} hotInstance Handsontable instance.
   * @private
   */
  function DateEditor(hotInstance) {
    var _this;
    _classCallCheck(this, DateEditor);
    _this = _super.call(this, hotInstance);

    // TODO: Move this option to general settings
    _this.defaultDateFormat = 'DD/MM/YYYY';
    _this.isCellEdited = false;
    _this.parentDestroyed = false;
    _this.$datePicker = null;
    return _this;
  }
  _createClass(DateEditor, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      if (typeof _moment.default !== 'function') {
        throw new Error('You need to include moment.js to your project.');
      }
      if (typeof _pikaday.default !== 'function') {
        throw new Error('You need to include Pikaday to your project.');
      }
      _get(_getPrototypeOf(DateEditor.prototype), "init", this).call(this);
      this.instance.addHook('afterDestroy', function () {
        _this2.parentDestroyed = true;
        _this2.destroyElements();
      });
    }

    /**
     * Create data picker instance.
     */
  }, {
    key: "createElements",
    value: function createElements() {
      _get(_getPrototypeOf(DateEditor.prototype), "createElements", this).call(this);
      this.datePicker = this.hot.rootDocument.createElement('DIV');
      this.datePickerStyle = this.datePicker.style;
      this.datePickerStyle.position = 'absolute';
      this.datePickerStyle.top = 0;
      this.datePickerStyle.left = 0;
      this.datePickerStyle.zIndex = 9999;
      this.datePicker.setAttribute('dir', this.hot.isRtl() ? 'rtl' : 'ltr');
      (0, _element.addClass)(this.datePicker, 'htDatepickerHolder');
      this.hot.rootDocument.body.appendChild(this.datePicker);
      var eventManager = new _eventManager.default(this);

      /**
       * Prevent recognizing clicking on datepicker as clicking outside of table.
       */
      eventManager.addEventListener(this.datePicker, 'mousedown', function (event) {
        return event.stopPropagation();
      });
    }

    /**
     * Destroy data picker instance.
     */
  }, {
    key: "destroyElements",
    value: function destroyElements() {
      var datePickerParentElement = this.datePicker.parentNode;
      if (this.$datePicker) {
        this.$datePicker.destroy();
      }
      if (datePickerParentElement) {
        datePickerParentElement.removeChild(this.datePicker);
      }
    }

    /**
     * Prepare editor to appear.
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
      _get(_getPrototypeOf(DateEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);
    }

    /**
     * Open editor.
     *
     * @param {Event} [event=null] The event object.
     */
  }, {
    key: "open",
    value: function open() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var shortcutManager = this.hot.getShortcutManager();
      var editorContext = shortcutManager.getContext('editor');
      _get(_getPrototypeOf(DateEditor.prototype), "open", this).call(this);
      this.showDatepicker(event);
      editorContext.addShortcut({
        keys: [['Enter']],
        callback: function callback(keyboardEvent) {
          // Extra Pikaday's `onchange` listener captures events and performing extra `setDate` method call which causes
          // flickering quite often.
          keyboardEvent.stopPropagation();
        },
        group: SHORTCUTS_GROUP_EDITOR
      });
    }

    /**
     * Close editor.
     */
  }, {
    key: "close",
    value: function close() {
      var _this$$datePicker,
        _this3 = this;
      this._opened = false;

      // If the date picker was never initialized (e.g. during autofill), there's nothing to destroy.
      if ((_this$$datePicker = this.$datePicker) !== null && _this$$datePicker !== void 0 && _this$$datePicker.destroy) {
        this.$datePicker.destroy();
      }
      this.instance._registerTimeout(function () {
        _this3.instance._refreshBorders();
      });
      var shortcutManager = this.hot.getShortcutManager();
      var editorContext = shortcutManager.getContext('editor');
      editorContext.removeShortcutsByGroup(SHORTCUTS_GROUP_EDITOR);
      _get(_getPrototypeOf(DateEditor.prototype), "close", this).call(this);
    }

    /**
     * Finishes editing and start saving or restoring process for editing cell or last selected range.
     *
     * @param {boolean} restoreOriginalValue If true, then closes editor without saving value from the editor into a cell.
     * @param {boolean} ctrlDown If true, then saveValue will save editor's value to each cell in the last selected range.
     */
  }, {
    key: "finishEditing",
    value: function finishEditing() {
      var restoreOriginalValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var ctrlDown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (restoreOriginalValue) {
        // pressed ESC, restore original value
        // var value = this.instance.getDataAtCell(this.row, this.col);
        var value = this.originalValue;
        if (value !== void 0) {
          this.setValue(value);
        }
      }
      _get(_getPrototypeOf(DateEditor.prototype), "finishEditing", this).call(this, restoreOriginalValue, ctrlDown);
    }

    /**
     * Show data picker.
     *
     * @param {Event} event The event object.
     */
  }, {
    key: "showDatepicker",
    value: function showDatepicker(event) {
      var offset = this.TD.getBoundingClientRect();
      var dateFormat = this.cellProperties.dateFormat || this.defaultDateFormat;
      var isMouseDown = this.instance.view.isMouseDown();
      var isMeta = event ? (0, _unicode.isFunctionKey)(event.keyCode) : false;
      var dateStr;
      this.datePicker.style.display = 'block';
      this.$datePicker = new _pikaday.default(this.getDatePickerConfig());
      this.$datePicker._onInputFocus = function () {};
      this.datePickerStyle.top = "".concat(this.hot.rootWindow.pageYOffset + offset.top + (0, _element.outerHeight)(this.TD), "px");
      var pickerLeftPosition = this.hot.rootWindow.pageXOffset;
      if (this.hot.isRtl()) {
        pickerLeftPosition = offset.right - (0, _element.outerWidth)(this.datePicker);
      } else {
        pickerLeftPosition = offset.left;
      }
      this.datePickerStyle.left = "".concat(pickerLeftPosition, "px");
      if (this.originalValue) {
        dateStr = this.originalValue;
        if ((0, _moment.default)(dateStr, dateFormat, true).isValid()) {
          this.$datePicker.setMoment((0, _moment.default)(dateStr, dateFormat), true);
        }

        // workaround for date/time cells - pikaday resets the cell value to 12:00 AM by default, this will overwrite the value.
        if (this.getValue() !== this.originalValue) {
          this.setValue(this.originalValue);
        }
        if (!isMeta && !isMouseDown) {
          this.setValue('');
        }
      } else if (this.cellProperties.defaultDate) {
        dateStr = this.cellProperties.defaultDate;
        if ((0, _moment.default)(dateStr, dateFormat, true).isValid()) {
          this.$datePicker.setMoment((0, _moment.default)(dateStr, dateFormat), true);
        }
        if (!isMeta && !isMouseDown) {
          this.setValue('');
        }
      } else {
        // if a default date is not defined, set a soft-default-date: display the current day and month in the
        // datepicker, but don't fill the editor input
        this.$datePicker.gotoToday();
      }
    }

    /**
     * Hide data picker.
     */
  }, {
    key: "hideDatepicker",
    value: function hideDatepicker() {
      this.datePickerStyle.display = 'none';
      this.$datePicker.hide();
    }

    /**
     * Get date picker options.
     *
     * @returns {object}
     */
  }, {
    key: "getDatePickerConfig",
    value: function getDatePickerConfig() {
      var _this4 = this;
      var htInput = this.TEXTAREA;
      var options = {};
      if (this.cellProperties && this.cellProperties.datePickerConfig) {
        (0, _object.deepExtend)(options, this.cellProperties.datePickerConfig);
      }
      var origOnSelect = options.onSelect;
      var origOnClose = options.onClose;
      options.field = htInput;
      options.trigger = htInput;
      options.container = this.datePicker;
      options.bound = false;
      options.format = options.format || this.defaultDateFormat;
      options.reposition = options.reposition || false;
      // Set the RTL to `false`. Due to the https://github.com/Pikaday/Pikaday/issues/647 bug, the layout direction
      // of the date picker is controlled by juggling the "dir" attribute of the root date picker element.
      // See line @64 of this file.
      options.isRTL = false;
      options.onSelect = function (value) {
        var dateStr = value;
        if (!isNaN(dateStr.getTime())) {
          dateStr = (0, _moment.default)(dateStr).format(_this4.cellProperties.dateFormat || _this4.defaultDateFormat);
        }
        _this4.setValue(dateStr);
        _this4.hideDatepicker();
        if (origOnSelect) {
          origOnSelect();
        }
      };
      options.onClose = function () {
        if (!_this4.parentDestroyed) {
          _this4.finishEditing(false);
        }
        if (origOnClose) {
          origOnClose();
        }
      };
      return options;
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);
  return DateEditor;
}(_textEditor.TextEditor);
exports.DateEditor = DateEditor;