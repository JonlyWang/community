function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { isFunctionKey, isCtrlMetaKey } from "./helpers/unicode.mjs";
import { stopImmediatePropagation } from "./helpers/dom/event.mjs";
import { getEditorInstance } from "./editors/registry.mjs";
import EventManager from "./eventManager.mjs";
import { isDefined } from "./helpers/mixed.mjs";
export var SHORTCUTS_GROUP_NAVIGATION = 'editorManager.navigation';
export var SHORTCUTS_GROUP_EDITOR = 'editorManager.handlingEditor';
var EditorManager = /*#__PURE__*/function () {
  /**
   * @param {Core} instance The Handsontable instance.
   * @param {TableMeta} tableMeta The table meta instance.
   * @param {Selection} selection The selection instance.
   */
  function EditorManager(instance, tableMeta, selection) {
    var _this = this;
    _classCallCheck(this, EditorManager);
    /**
     * Instance of {@link Handsontable}.
     *
     * @private
     * @type {Handsontable}
     */
    this.instance = instance;
    /**
     * Reference to an instance's private GridSettings object.
     *
     * @private
     * @type {GridSettings}
     */
    this.tableMeta = tableMeta;
    /**
     * Instance of {@link Selection}.
     *
     * @private
     * @type {Selection}
     */
    this.selection = selection;
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    this.eventManager = new EventManager(instance);
    /**
     * Determines if EditorManager is destroyed.
     *
     * @private
     * @type {boolean}
     */
    this.destroyed = false;
    /**
     * Determines if EditorManager is locked.
     *
     * @private
     * @type {boolean}
     */
    this.lock = false;
    /**
     * A reference to an instance of the activeEditor.
     *
     * @private
     * @type {BaseEditor}
     */
    this.activeEditor = void 0;
    /**
     * Keeps a reference to the cell's properties object.
     *
     * @type {object}
     */
    this.cellProperties = void 0;
    var shortcutManager = this.instance.getShortcutManager();
    shortcutManager.addContext('editor');
    this.registerShortcuts();
    this.instance.addHook('afterDocumentKeyDown', function (event) {
      return _this.onAfterDocumentKeyDown(event);
    });

    // Open editor when text composition is started (IME editor)
    this.eventManager.addEventListener(this.instance.rootDocument.documentElement, 'compositionstart', function (event) {
      if (!_this.destroyed && _this.instance.isListening()) {
        _this.openEditor('', event);
      }
    });
    this.instance.view._wt.update('onCellDblClick', function (event, coords, elem) {
      return _this.onCellDblClick(event, coords, elem);
    });
  }

  /**
   * Register shortcuts responsible for handling some actions related to an editor.
   *
   * @private
   */
  _createClass(EditorManager, [{
    key: "registerShortcuts",
    value: function registerShortcuts() {
      var _this2 = this;
      var shortcutManager = this.instance.getShortcutManager();
      var gridContext = shortcutManager.getContext('grid');
      var editorContext = shortcutManager.getContext('editor');
      var config = {
        group: SHORTCUTS_GROUP_EDITOR
      };
      editorContext.addShortcuts([{
        keys: [['Enter'], ['Enter', 'Shift'], ['Enter', 'Control/Meta'], ['Enter', 'Control/Meta', 'Shift']],
        callback: function callback(event, keys) {
          _this2.closeEditorAndSaveChanges(shortcutManager.isCtrlPressed());
          _this2.moveSelectionAfterEnter(keys.includes('shift'));
        }
      }, {
        keys: [['Escape'], ['Escape', 'Control/Meta']],
        callback: function callback() {
          _this2.closeEditorAndRestoreOriginalValue(shortcutManager.isCtrlPressed());
          _this2.activeEditor.focus();
        }
      }], config);
      gridContext.addShortcuts([{
        keys: [['F2']],
        callback: function callback(event) {
          _this2.openEditor(null, event, true);
        }
      }, {
        keys: [['Backspace'], ['Delete']],
        callback: function callback() {
          _this2.instance.emptySelectedCells();
          _this2.prepareEditor();
        }
      }, {
        keys: [['Enter'], ['Enter', 'Shift']],
        callback: function callback(event, keys) {
          if (_this2.instance.getSettings().enterBeginsEditing) {
            if (_this2.cellProperties.readOnly) {
              _this2.moveSelectionAfterEnter();
            } else {
              _this2.openEditor(null, event, true);
            }
          } else {
            _this2.moveSelectionAfterEnter(keys.includes('shift'));
          }
          stopImmediatePropagation(event); // required by HandsontableEditor
        }
      }], config);
    }

    /**
     * Lock the editor from being prepared and closed. Locking the editor prevents its closing and
     * reinitialized after selecting the new cell. This feature is necessary for a mobile editor.
     */
  }, {
    key: "lockEditor",
    value: function lockEditor() {
      this.lock = true;
    }

    /**
     * Unlock the editor from being prepared and closed. This method restores the original behavior of
     * the editors where for every new selection its instances are closed.
     */
  }, {
    key: "unlockEditor",
    value: function unlockEditor() {
      this.lock = false;
    }

    /**
     * Destroy current editor, if exists.
     *
     * @param {boolean} revertOriginal If `false` and the cell using allowInvalid option,
     *                                 then an editor won't be closed until validation is passed.
     */
  }, {
    key: "destroyEditor",
    value: function destroyEditor(revertOriginal) {
      if (!this.lock) {
        this.closeEditor(revertOriginal);
      }
    }

    /**
     * Get active editor.
     *
     * @returns {BaseEditor}
     */
  }, {
    key: "getActiveEditor",
    value: function getActiveEditor() {
      return this.activeEditor;
    }

    /**
     * Prepare text input to be displayed at given grid cell.
     */
  }, {
    key: "prepareEditor",
    value: function prepareEditor() {
      var _this3 = this;
      if (this.lock) {
        return;
      }
      if (this.activeEditor && this.activeEditor.isWaiting()) {
        this.closeEditor(false, false, function (dataSaved) {
          if (dataSaved) {
            _this3.prepareEditor();
          }
        });
        return;
      }
      var _this$instance$getSel = this.instance.getSelectedRangeLast().highlight,
        row = _this$instance$getSel.row,
        col = _this$instance$getSel.col;
      var modifiedCellCoords = this.instance.runHooks('modifyGetCellCoords', row, col);
      var visualRowToCheck = row;
      var visualColumnToCheck = col;
      if (Array.isArray(modifiedCellCoords)) {
        var _modifiedCellCoords = _slicedToArray(modifiedCellCoords, 2);
        visualRowToCheck = _modifiedCellCoords[0];
        visualColumnToCheck = _modifiedCellCoords[1];
      }

      // Getting values using the modified coordinates.
      this.cellProperties = this.instance.getCellMeta(visualRowToCheck, visualColumnToCheck);
      var activeElement = this.instance.rootDocument.activeElement;
      if (activeElement) {
        // Blurring the activeElement removes unwanted border around the focusable element
        // (and resets activeElement prop). Without blurring the activeElement points to the
        // previously focusable element after clicking onto the cell (#6877).
        activeElement.blur();
      }
      if (!this.isCellEditable()) {
        this.clearActiveEditor();
        return;
      }
      var td = this.instance.getCell(row, col, true);

      // Skip the preparation when the cell is not rendered in the DOM. The cell is scrolled out of
      // the table's viewport.
      if (td) {
        var editorClass = this.instance.getCellEditor(this.cellProperties);
        var prop = this.instance.colToProp(visualColumnToCheck);
        var originalValue = this.instance.getSourceDataAtCell(this.instance.toPhysicalRow(visualRowToCheck), visualColumnToCheck);
        this.activeEditor = getEditorInstance(editorClass, this.instance);
        // Using not modified coordinates, as we need to get the table element using selection coordinates.
        // There is an extra translation in the editor for saving value.
        this.activeEditor.prepare(row, col, prop, td, originalValue, this.cellProperties);
      }
    }

    /**
     * Check is editor is opened/showed.
     *
     * @returns {boolean}
     */
  }, {
    key: "isEditorOpened",
    value: function isEditorOpened() {
      return this.activeEditor && this.activeEditor.isOpened();
    }

    /**
     * Open editor with initial value.
     *
     * @param {null|string} newInitialValue New value from which editor will start if handled property it's not the `null`.
     * @param {Event} event The event object.
     * @param {boolean} [enableFullEditMode=false] When true, an editor works in full editing mode. Mode disallows closing an editor
     *                                             when arrow keys are pressed.
     */
  }, {
    key: "openEditor",
    value: function openEditor(newInitialValue, event) {
      var enableFullEditMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!this.isCellEditable()) {
        this.clearActiveEditor();
        return;
      }
      if (!this.activeEditor) {
        var _this$instance$getSel2 = this.instance.getSelectedRangeLast().highlight,
          row = _this$instance$getSel2.row,
          col = _this$instance$getSel2.col;
        var renderableRowIndex = this.instance.rowIndexMapper.getRenderableFromVisualIndex(row);
        var renderableColumnIndex = this.instance.columnIndexMapper.getRenderableFromVisualIndex(col);
        this.instance.view.scrollViewport(this.instance._createCellCoords(renderableRowIndex, renderableColumnIndex));
        this.instance.view.render();
        this.prepareEditor();
      }
      if (this.activeEditor) {
        if (enableFullEditMode) {
          this.activeEditor.enableFullEditMode();
        }
        this.activeEditor.beginEditing(newInitialValue, event);
      }
    }

    /**
     * Close editor, finish editing cell.
     *
     * @param {boolean} restoreOriginalValue If `true`, then closes editor without saving value from the editor into a cell.
     * @param {boolean} isCtrlPressed If `true`, then editor will save value to each cell in the last selected range.
     * @param {Function} callback The callback function, fired after editor closing.
     */
  }, {
    key: "closeEditor",
    value: function closeEditor(restoreOriginalValue, isCtrlPressed, callback) {
      if (this.activeEditor) {
        this.activeEditor.finishEditing(restoreOriginalValue, isCtrlPressed, callback);
      } else if (callback) {
        callback(false);
      }
    }

    /**
     * Close editor and save changes.
     *
     * @param {boolean} isCtrlPressed If `true`, then editor will save value to each cell in the last selected range.
     */
  }, {
    key: "closeEditorAndSaveChanges",
    value: function closeEditorAndSaveChanges(isCtrlPressed) {
      this.closeEditor(false, isCtrlPressed);
    }

    /**
     * Close editor and restore original value.
     *
     * @param {boolean} isCtrlPressed Indication of whether the CTRL button is pressed.
     */
  }, {
    key: "closeEditorAndRestoreOriginalValue",
    value: function closeEditorAndRestoreOriginalValue(isCtrlPressed) {
      this.closeEditor(true, isCtrlPressed);
    }

    /**
     * Clears reference to an instance of the active editor.
     *
     * @private
     */
  }, {
    key: "clearActiveEditor",
    value: function clearActiveEditor() {
      this.activeEditor = void 0;
    }

    /**
     * Checks if the currently selected cell (pointed by selection highlight coords) is editable.
     * Editable cell is when:
     *   - the cell has defined an editor type;
     *   - the cell is not marked as read-only;
     *   - the cell is not hidden.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "isCellEditable",
    value: function isCellEditable() {
      var editorClass = this.instance.getCellEditor(this.cellProperties);
      var _this$instance$getSel3 = this.instance.getSelectedRangeLast().highlight,
        row = _this$instance$getSel3.row,
        col = _this$instance$getSel3.col;
      var _this$instance = this.instance,
        rowIndexMapper = _this$instance.rowIndexMapper,
        columnIndexMapper = _this$instance.columnIndexMapper;
      var isCellHidden = rowIndexMapper.isHidden(this.instance.toPhysicalRow(row)) || columnIndexMapper.isHidden(this.instance.toPhysicalColumn(col));
      if (this.cellProperties.readOnly || !editorClass || isCellHidden) {
        return false;
      }
      return true;
    }

    /**
     * Controls selection's behaviour after clicking `Enter`.
     *
     * @private
     * @param {boolean} isShiftPressed If `true`, then the selection will move up after hit enter.
     */
  }, {
    key: "moveSelectionAfterEnter",
    value: function moveSelectionAfterEnter(isShiftPressed) {
      var enterMoves = typeof this.tableMeta.enterMoves === 'function' ? this.tableMeta.enterMoves(event) : this.tableMeta.enterMoves;
      if (isShiftPressed) {
        // move selection up
        this.selection.transformStart(-enterMoves.row, -enterMoves.col);
      } else {
        // move selection down (add a new row if needed)
        this.selection.transformStart(enterMoves.row, enterMoves.col, true);
      }
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
      var _this4 = this;
      if (!this.instance.isListening()) {
        return;
      }
      var keyCode = event.keyCode;
      if (!this.selection.isSelected()) {
        return;
      }

      // catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)
      var isCtrlPressed = (event.ctrlKey || event.metaKey) && !event.altKey;
      if (!this.activeEditor || this.activeEditor && !this.activeEditor.isWaiting()) {
        if (!isFunctionKey(keyCode) && !isCtrlMetaKey(keyCode) && !isCtrlPressed && !this.isEditorOpened()) {
          var shortcutManager = this.instance.getShortcutManager();
          var editorContext = shortcutManager.getContext('editor');
          var runOnlySelectedConfig = {
            runOnlyIf: function runOnlyIf() {
              return isDefined(_this4.instance.getSelected());
            },
            group: SHORTCUTS_GROUP_NAVIGATION
          };
          editorContext.addShortcuts([{
            keys: [['ArrowUp']],
            callback: function callback() {
              _this4.instance.selection.transformStart(-1, 0);
            }
          }, {
            keys: [['ArrowDown']],
            callback: function callback() {
              _this4.instance.selection.transformStart(1, 0);
            }
          }, {
            keys: [['ArrowLeft']],
            callback: function callback() {
              _this4.instance.selection.transformStart(0, -1 * _this4.instance.getDirectionFactor());
            }
          }, {
            keys: [['ArrowRight']],
            callback: function callback() {
              _this4.instance.selection.transformStart(0, _this4.instance.getDirectionFactor());
            }
          }], runOnlySelectedConfig);
          this.openEditor('', event);
        }
      }
    }

    /**
     * OnCellDblClick callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     * @param {object} coords The cell coordinates.
     * @param {HTMLTableCellElement|HTMLTableHeaderCellElement} elem The element which triggers the action.
     */
  }, {
    key: "onCellDblClick",
    value: function onCellDblClick(event, coords, elem) {
      // may be TD or TH
      if (elem.nodeName === 'TD') {
        this.openEditor(null, event, true);
      }
    }

    /**
     * Destroy the instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;
      this.eventManager.destroy();
    }
  }]);
  return EditorManager;
}();
var instances = new WeakMap();

/**
 * @param {Core} hotInstance The Handsontable instance.
 * @param {TableMeta} tableMeta The table meta class instance.
 * @param {Selection} selection The selection instance.
 * @returns {EditorManager}
 */
EditorManager.getInstance = function (hotInstance, tableMeta, selection) {
  var editorManager = instances.get(hotInstance);
  if (!editorManager) {
    editorManager = new EditorManager(hotInstance, tableMeta, selection);
    instances.set(hotInstance, editorManager);
  }
  return editorManager;
};
export default EditorManager;