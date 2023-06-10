"use strict";

require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.from.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.CopyPaste = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.array.concat.js");
var _base = require("../base");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _SheetClip = require("../../3rdparty/SheetClip");
var _array = require("../../helpers/array");
var _number = require("../../helpers/number");
var _string = require("../../helpers/string");
var _element = require("../../helpers/dom/element");
var _copy = _interopRequireDefault(require("./contextMenuItem/copy"));
var _cut = _interopRequireDefault(require("./contextMenuItem/cut"));
var _pasteEvent = _interopRequireDefault(require("./pasteEvent"));
var _focusableElement = require("./focusableElement");
var _parseTable = require("../../utils/parseTable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
_pluginHooks.default.getSingleton().register('afterCopyLimit');
_pluginHooks.default.getSingleton().register('modifyCopyableRange');
_pluginHooks.default.getSingleton().register('beforeCut');
_pluginHooks.default.getSingleton().register('afterCut');
_pluginHooks.default.getSingleton().register('beforePaste');
_pluginHooks.default.getSingleton().register('afterPaste');
_pluginHooks.default.getSingleton().register('beforeCopy');
_pluginHooks.default.getSingleton().register('afterCopy');
var PLUGIN_KEY = 'copyPaste';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 80;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var SETTING_KEYS = ['fragmentSelection'];
var ROWS_LIMIT = Infinity;
var COLUMNS_LIMIT = Infinity;
var privatePool = new WeakMap();
var META_HEAD = ['<meta name="generator" content="Handsontable"/>', '<style type="text/css">td{white-space:normal}br{mso-data-placement:same-cell}</style>'].join('');

/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @description
 * This plugin enables the copy/paste functionality in the Handsontable. The functionality works for API, Context Menu,
 * using keyboard shortcuts and menu bar from the browser.
 * Possible values:
 * * `true` (to enable default options),
 * * `false` (to disable completely).
 *
 * or an object with values:
 * * `'columnsLimit'` (see {@link CopyPaste#columnsLimit})
 * * `'rowsLimit'` (see {@link CopyPaste#rowsLimit})
 * * `'pasteMode'` (see {@link CopyPaste#pasteMode})
 * * `'uiContainer'` (see {@link CopyPaste#uiContainer}).
 *
 * See [the copy/paste demo](@/guides/cell-features/clipboard.md) for examples.
 *
 * @example
 * ```js
 * // Enables the plugin with default values
 * copyPaste: true,
 * // Enables the plugin with custom values
 * copyPaste: {
 *   columnsLimit: 25,
 *   rowsLimit: 50,
 *   pasteMode: 'shift_down',
 *   uiContainer: document.body,
 * },
 * ```
 * @class CopyPaste
 * @plugin CopyPaste
 */
var CopyPaste = /*#__PURE__*/function (_BasePlugin) {
  _inherits(CopyPaste, _BasePlugin);
  var _super = _createSuper(CopyPaste);
  function CopyPaste(hotInstance) {
    var _this;
    _classCallCheck(this, CopyPaste);
    _this = _super.call(this, hotInstance);
    /**
     * Maximum number of columns than can be copied to clipboard using <kbd>**Ctrl**</kbd>/<kbd>**Cmd**</kbd> + <kbd>**C**</kbd>.
     *
     * @type {number}
     * @default Infinity
     */
    _this.columnsLimit = COLUMNS_LIMIT;
    /**
     * Ranges of the cells coordinates, which should be used to copy/cut/paste actions.
     *
     * @private
     * @type {Array}
     */
    _this.copyableRanges = [];
    /**
     * Provides focusable element to support IME and copy/paste/cut actions.
     *
     * @private
     * @type {FocusableWrapper}
     */
    _this.focusableElement = void 0;
    /**
     * Defines paste (<kbd>**Ctrl**</kbd>/<kbd>**Cmd**</kbd> + <kbd>**V**</kbd>) behavior.
     * * Default value `"overwrite"` will paste clipboard value over current selection.
     * * When set to `"shift_down"`, clipboard data will be pasted in place of current selection, while all selected cells are moved down.
     * * When set to `"shift_right"`, clipboard data will be pasted in place of current selection, while all selected cells are moved right.
     *
     * @type {string}
     * @default 'overwrite'
     */
    _this.pasteMode = 'overwrite';
    /**
     * Maximum number of rows than can be copied to clipboard using <kbd>**Ctrl**</kbd>/<kbd>**Cmd**</kbd> + <kbd>**C**</kbd>.
     *
     * @type {number}
     * @default Infinity
     */
    _this.rowsLimit = ROWS_LIMIT;

    /**
     * UI container for the secondary focusable element.
     *
     * @type {HTMLElement}
     */
    _this.uiContainer = _this.hot.rootDocument.body;
    privatePool.set(_assertThisInitialized(_this), {
      isTriggeredByCopy: false,
      isTriggeredByCut: false,
      isBeginEditing: false,
      isFragmentSelectionEnabled: false
    });
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link CopyPaste#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(CopyPaste, [{
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
      var _this$hot$getSettings = this.hot.getSettings(),
        settings = _this$hot$getSettings[PLUGIN_KEY],
        fragmentSelection = _this$hot$getSettings.fragmentSelection;
      var priv = privatePool.get(this);
      priv.isFragmentSelectionEnabled = !!fragmentSelection;
      if (_typeof(settings) === 'object') {
        this.pasteMode = settings.pasteMode || this.pasteMode;
        this.rowsLimit = isNaN(settings.rowsLimit) ? this.rowsLimit : settings.rowsLimit;
        this.columnsLimit = isNaN(settings.columnsLimit) ? this.columnsLimit : settings.columnsLimit;
        this.uiContainer = settings.uiContainer || this.uiContainer;
      }
      this.addHook('afterContextMenuDefaultOptions', function (options) {
        return _this2.onAfterContextMenuDefaultOptions(options);
      });
      this.addHook('afterOnCellMouseUp', function () {
        return _this2.onAfterOnCellMouseUp();
      });
      this.addHook('afterSelectionEnd', function () {
        return _this2.onAfterSelectionEnd();
      });
      this.addHook('beforeKeyDown', function () {
        return _this2.onBeforeKeyDown();
      });
      this.focusableElement = (0, _focusableElement.createElement)(this.uiContainer);
      this.focusableElement.addLocalHook('copy', function (event) {
        return _this2.onCopy(event);
      }).addLocalHook('cut', function (event) {
        return _this2.onCut(event);
      }).addLocalHook('paste', function (event) {
        return _this2.onPaste(event);
      });
      _get(_getPrototypeOf(CopyPaste.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`copyPaste`](@/api/options.md#copypaste)
     *  - [`fragmentSelection`](@/api/options.md#fragmentselection)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      this.getOrCreateFocusableElement();
      _get(_getPrototypeOf(CopyPaste.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      if (this.focusableElement) {
        (0, _focusableElement.destroyElement)(this.focusableElement);
      }
      _get(_getPrototypeOf(CopyPaste.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Copies the selected cell into the clipboard.
     */
  }, {
    key: "copy",
    value: function copy() {
      var priv = privatePool.get(this);
      priv.isTriggeredByCopy = true;
      this.getOrCreateFocusableElement();
      this.focusableElement.focus();
      this.hot.rootDocument.execCommand('copy');
    }

    /**
     * Cuts the selected cell into the clipboard.
     */
  }, {
    key: "cut",
    value: function cut() {
      var priv = privatePool.get(this);
      priv.isTriggeredByCut = true;
      this.getOrCreateFocusableElement();
      this.focusableElement.focus();
      this.hot.rootDocument.execCommand('cut');
    }

    /**
     * Creates copyable text releated to range objects.
     *
     * @param {object[]} ranges Array of objects with properties `startRow`, `endRow`, `startCol` and `endCol`.
     * @returns {string} Returns string which will be copied into clipboard.
     */
  }, {
    key: "getRangedCopyableData",
    value: function getRangedCopyableData(ranges) {
      var _this3 = this;
      var dataSet = [];
      var copyableRows = [];
      var copyableColumns = [];

      // Count all copyable rows and columns
      (0, _array.arrayEach)(ranges, function (range) {
        (0, _number.rangeEach)(range.startRow, range.endRow, function (row) {
          if (copyableRows.indexOf(row) === -1) {
            copyableRows.push(row);
          }
        });
        (0, _number.rangeEach)(range.startCol, range.endCol, function (column) {
          if (copyableColumns.indexOf(column) === -1) {
            copyableColumns.push(column);
          }
        });
      });
      // Concat all rows and columns data defined in ranges into one copyable string
      (0, _array.arrayEach)(copyableRows, function (row) {
        var rowSet = [];
        (0, _array.arrayEach)(copyableColumns, function (column) {
          rowSet.push(_this3.hot.getCopyableData(row, column));
        });
        dataSet.push(rowSet);
      });
      return (0, _SheetClip.stringify)(dataSet);
    }

    /**
     * Creates copyable text releated to range objects.
     *
     * @param {object[]} ranges Array of objects with properties `startRow`, `startCol`, `endRow` and `endCol`.
     * @returns {Array[]} Returns array of arrays which will be copied into clipboard.
     */
  }, {
    key: "getRangedData",
    value: function getRangedData(ranges) {
      var _this4 = this;
      var dataSet = [];
      var copyableRows = [];
      var copyableColumns = [];

      // Count all copyable rows and columns
      (0, _array.arrayEach)(ranges, function (range) {
        (0, _number.rangeEach)(range.startRow, range.endRow, function (row) {
          if (copyableRows.indexOf(row) === -1) {
            copyableRows.push(row);
          }
        });
        (0, _number.rangeEach)(range.startCol, range.endCol, function (column) {
          if (copyableColumns.indexOf(column) === -1) {
            copyableColumns.push(column);
          }
        });
      });
      // Concat all rows and columns data defined in ranges into one copyable string
      (0, _array.arrayEach)(copyableRows, function (row) {
        var rowSet = [];
        (0, _array.arrayEach)(copyableColumns, function (column) {
          rowSet.push(_this4.hot.getCopyableData(row, column));
        });
        dataSet.push(rowSet);
      });
      return dataSet;
    }

    /**
     * Simulates the paste action.
     *
     * Due to security reasons, modern browsers disallow reading from the system clipboard.
     *
     * @param {string} pastableText Value as raw string to paste.
     * @param {string} [pastableHtml=''] Value as HTML to paste.
     */
  }, {
    key: "paste",
    value: function paste() {
      var pastableText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var pastableHtml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pastableText;
      if (!pastableText && !pastableHtml) {
        return;
      }
      var pasteData = new _pasteEvent.default();
      if (pastableText) {
        pasteData.clipboardData.setData('text/plain', pastableText);
      }
      if (pastableHtml) {
        pasteData.clipboardData.setData('text/html', pastableHtml);
      }
      this.getOrCreateFocusableElement();
      this.onPaste(pasteData);
    }

    /**
     * Prepares copyable text from the cells selection in the invisible textarea.
     */
  }, {
    key: "setCopyableText",
    value: function setCopyableText() {
      var selRange = this.hot.getSelectedRangeLast();
      if (!selRange) {
        return;
      }
      var topStart = selRange.getTopStartCorner();
      var bottomEnd = selRange.getBottomEndCorner();
      var startRow = topStart.row;
      var startCol = topStart.col;
      var endRow = bottomEnd.row;
      var endCol = bottomEnd.col;
      var finalEndRow = Math.min(endRow, startRow + this.rowsLimit - 1);
      var finalEndCol = Math.min(endCol, startCol + this.columnsLimit - 1);
      this.copyableRanges.length = 0;
      this.copyableRanges.push({
        startRow: startRow,
        startCol: startCol,
        endRow: finalEndRow,
        endCol: finalEndCol
      });
      this.copyableRanges = this.hot.runHooks('modifyCopyableRange', this.copyableRanges);
      if (endRow !== finalEndRow || endCol !== finalEndCol) {
        this.hot.runHooks('afterCopyLimit', endRow - startRow + 1, endCol - startCol + 1, this.rowsLimit, this.columnsLimit);
      }
    }

    /**
     * Force focus on editable element.
     *
     * @private
     */
  }, {
    key: "getOrCreateFocusableElement",
    value: function getOrCreateFocusableElement() {
      var editor = this.hot.getActiveEditor();
      var editableElement = editor ? editor.TEXTAREA : void 0;
      if (editableElement) {
        this.focusableElement.setFocusableElement(editableElement);
      } else {
        this.focusableElement.useSecondaryElement();
      }
    }

    /**
     * Verifies if editor exists and is open.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "isEditorOpened",
    value: function isEditorOpened() {
      var editor = this.hot.getActiveEditor();
      return editor && editor.isOpened();
    }

    /**
     * Prepares new values to populate them into datasource.
     *
     * @private
     * @param {Array} inputArray An array of the data to populate.
     * @param {Array} [selection] The selection which indicates from what position the data will be populated.
     * @returns {Array} Range coordinates after populate data.
     */
  }, {
    key: "populateValues",
    value: function populateValues(inputArray) {
      var selection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.hot.getSelectedRangeLast();
      if (!inputArray.length) {
        return;
      }
      var populatedRowsLength = inputArray.length;
      var populatedColumnsLength = inputArray[0].length;
      var newRows = [];
      var _selection$getTopStar = selection.getTopStartCorner(),
        startRow = _selection$getTopStar.row,
        startColumn = _selection$getTopStar.col;
      var _selection$getBottomE = selection.getBottomEndCorner(),
        endRowFromSelection = _selection$getBottomE.row,
        endColumnFromSelection = _selection$getBottomE.col;
      var visualRowForPopulatedData = startRow;
      var visualColumnForPopulatedData = startColumn;
      var lastVisualRow = startRow;
      var lastVisualColumn = startColumn;

      // We try to populate just all copied data or repeat copied data within a selection. Please keep in mind that we
      // don't know whether populated data is bigger than selection on start as there are some cells for which values
      // should be not inserted (it's known right after getting cell meta).
      while (newRows.length < populatedRowsLength || visualRowForPopulatedData <= endRowFromSelection) {
        var _this$hot$getCellMeta = this.hot.getCellMeta(visualRowForPopulatedData, startColumn),
          skipRowOnPaste = _this$hot$getCellMeta.skipRowOnPaste,
          visualRow = _this$hot$getCellMeta.visualRow;
        visualRowForPopulatedData = visualRow + 1;
        if (skipRowOnPaste === true) {
          /* eslint-disable no-continue */
          continue;
        }
        lastVisualRow = visualRow;
        visualColumnForPopulatedData = startColumn;
        var newRow = [];
        var insertedRow = newRows.length % populatedRowsLength;
        while (newRow.length < populatedColumnsLength || visualColumnForPopulatedData <= endColumnFromSelection) {
          var _this$hot$getCellMeta2 = this.hot.getCellMeta(startRow, visualColumnForPopulatedData),
            skipColumnOnPaste = _this$hot$getCellMeta2.skipColumnOnPaste,
            visualCol = _this$hot$getCellMeta2.visualCol;
          visualColumnForPopulatedData = visualCol + 1;
          if (skipColumnOnPaste === true) {
            /* eslint-disable no-continue */
            continue;
          }
          lastVisualColumn = visualCol;
          var insertedColumn = newRow.length % populatedColumnsLength;
          newRow.push(inputArray[insertedRow][insertedColumn]);
        }
        newRows.push(newRow);
      }
      this.hot.populateFromArray(startRow, startColumn, newRows, void 0, void 0, 'CopyPaste.paste', this.pasteMode);
      return [startRow, startColumn, lastVisualRow, lastVisualColumn];
    }

    /**
     * `copy` event callback on textarea element.
     *
     * @param {Event} event ClipboardEvent.
     * @private
     */
  }, {
    key: "onCopy",
    value: function onCopy(event) {
      var priv = privatePool.get(this);
      if (!this.hot.isListening() && !priv.isTriggeredByCopy || this.isEditorOpened()) {
        return;
      }
      this.setCopyableText();
      priv.isTriggeredByCopy = false;
      var rangedData = this.getRangedData(this.copyableRanges);
      var allowCopying = !!this.hot.runHooks('beforeCopy', rangedData, this.copyableRanges);
      if (allowCopying) {
        var textPlain = (0, _SheetClip.stringify)(rangedData);
        if (event && event.clipboardData) {
          var textHTML = (0, _parseTable._dataToHTML)(rangedData, this.hot.rootDocument);
          event.clipboardData.setData('text/plain', textPlain);
          event.clipboardData.setData('text/html', [META_HEAD, textHTML].join(''));
        } else if (typeof ClipboardEvent === 'undefined') {
          this.hot.rootWindow.clipboardData.setData('Text', textPlain);
        }
        this.hot.runHooks('afterCopy', rangedData, this.copyableRanges);
      }
      event.preventDefault();
    }

    /**
     * `cut` event callback on textarea element.
     *
     * @param {Event} event ClipboardEvent.
     * @private
     */
  }, {
    key: "onCut",
    value: function onCut(event) {
      var priv = privatePool.get(this);
      if (!this.hot.isListening() && !priv.isTriggeredByCut || this.isEditorOpened()) {
        return;
      }
      this.setCopyableText();
      priv.isTriggeredByCut = false;
      var rangedData = this.getRangedData(this.copyableRanges);
      var allowCuttingOut = !!this.hot.runHooks('beforeCut', rangedData, this.copyableRanges);
      if (allowCuttingOut) {
        var textPlain = (0, _SheetClip.stringify)(rangedData);
        if (event && event.clipboardData) {
          var textHTML = (0, _parseTable._dataToHTML)(rangedData, this.hot.rootDocument);
          event.clipboardData.setData('text/plain', textPlain);
          event.clipboardData.setData('text/html', [META_HEAD, textHTML].join(''));
        } else if (typeof ClipboardEvent === 'undefined') {
          this.hot.rootWindow.clipboardData.setData('Text', textPlain);
        }
        this.hot.emptySelectedCells('CopyPaste.cut');
        this.hot.runHooks('afterCut', rangedData, this.copyableRanges);
      }
      event.preventDefault();
    }

    /**
     * `paste` event callback on textarea element.
     *
     * @param {Event} event ClipboardEvent or pseudo ClipboardEvent, if paste was called manually.
     * @private
     */
  }, {
    key: "onPaste",
    value: function onPaste(event) {
      if (!this.hot.isListening() || this.isEditorOpened()) {
        return;
      }
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      var pastedData;
      if (event && typeof event.clipboardData !== 'undefined') {
        var textHTML = (0, _string.sanitize)(event.clipboardData.getData('text/html'), {
          ADD_TAGS: ['meta'],
          ADD_ATTR: ['content'],
          FORCE_BODY: true
        });
        if (textHTML && /(<table)|(<TABLE)/g.test(textHTML)) {
          var parsedConfig = (0, _parseTable.htmlToGridSettings)(textHTML, this.hot.rootDocument);
          pastedData = parsedConfig.data;
        } else {
          pastedData = event.clipboardData.getData('text/plain');
        }
      } else if (typeof ClipboardEvent === 'undefined' && typeof this.hot.rootWindow.clipboardData !== 'undefined') {
        pastedData = this.hot.rootWindow.clipboardData.getData('Text');
      }
      if (typeof pastedData === 'string') {
        pastedData = (0, _SheetClip.parse)(pastedData);
      }
      if (pastedData && pastedData.length === 0) {
        return;
      }
      if (this.hot.runHooks('beforePaste', pastedData, this.copyableRanges) === false) {
        return;
      }
      var _this$populateValues = this.populateValues(pastedData),
        _this$populateValues2 = _slicedToArray(_this$populateValues, 4),
        startRow = _this$populateValues2[0],
        startColumn = _this$populateValues2[1],
        endRow = _this$populateValues2[2],
        endColumn = _this$populateValues2[3];
      this.hot.selectCell(startRow, startColumn, Math.min(this.hot.countRows() - 1, endRow), Math.min(this.hot.countCols() - 1, endColumn));
      this.hot.runHooks('afterPaste', pastedData, this.copyableRanges);
    }

    /**
     * Add copy and cut options to the Context Menu.
     *
     * @private
     * @param {object} options Contains default added options of the Context Menu.
     */
  }, {
    key: "onAfterContextMenuDefaultOptions",
    value: function onAfterContextMenuDefaultOptions(options) {
      options.items.push({
        name: '---------'
      }, (0, _copy.default)(this), (0, _cut.default)(this));
    }

    /**
     * Force focus on focusableElement.
     *
     * @private
     */
  }, {
    key: "onAfterOnCellMouseUp",
    value: function onAfterOnCellMouseUp() {
      // Changing focused element will remove current selection. It's unnecessary in case when we give possibility
      // for fragment selection
      if (!this.hot.isListening() || this.isEditorOpened() || this.hot.getSettings().fragmentSelection) {
        return;
      }
      this.getOrCreateFocusableElement();
      this.focusableElement.focus();
    }

    /**
     * Force focus on focusableElement after end of the selection.
     *
     * @private
     */
  }, {
    key: "onAfterSelectionEnd",
    value: function onAfterSelectionEnd() {
      var _privatePool$get = privatePool.get(this),
        isFragmentSelectionEnabled = _privatePool$get.isFragmentSelectionEnabled;
      if (this.isEditorOpened()) {
        return;
      }
      this.getOrCreateFocusableElement();
      if (isFragmentSelectionEnabled && this.focusableElement.getFocusableElement() !== this.hot.rootDocument.activeElement && (0, _element.getSelectionText)()) {
        return;
      }
      this.setCopyableText();
      this.focusableElement.focus();
    }

    /**
     * `beforeKeyDown` listener to force focus of focusableElement.
     *
     * @private
     */
  }, {
    key: "onBeforeKeyDown",
    value: function onBeforeKeyDown() {
      if (!this.hot.isListening() || this.isEditorOpened()) {
        return;
      }
      var activeElement = this.hot.rootDocument.activeElement;
      var activeEditor = this.hot.getActiveEditor();
      if (!activeEditor || activeElement !== this.focusableElement.getFocusableElement() && activeElement !== activeEditor.select) {
        return;
      }
      this.getOrCreateFocusableElement();
      this.focusableElement.focus();
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.focusableElement) {
        (0, _focusableElement.destroyElement)(this.focusableElement);
        this.focusableElement = null;
      }
      _get(_getPrototypeOf(CopyPaste.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "SETTING_KEYS",
    get: function get() {
      return [PLUGIN_KEY].concat(SETTING_KEYS);
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);
  return CopyPaste;
}(_base.BasePlugin);
exports.CopyPaste = CopyPaste;