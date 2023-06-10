"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
exports.__esModule = true;
exports.default = exports.PLUGIN_KEY = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.concat.js");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _array = require("../../helpers/array");
var _number = require("../../helpers/number");
var _object = require("../../helpers/object");
var _utils = require("../contextMenu/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var SHORTCUTS_GROUP = 'undoRedo';
var PLUGIN_KEY = 'undoRedo';

/**
 * @description
 * Handsontable UndoRedo plugin allows to undo and redo certain actions done in the table.
 *
 * __Note__, that not all actions are currently undo-able. The UndoRedo plugin is enabled by default.
 * @example
 * ```js
 * undo: true
 * ```
 * @class UndoRedo
 * @plugin UndoRedo
 * @param {Core} instance The Handsontable instance.
 */
exports.PLUGIN_KEY = PLUGIN_KEY;
function UndoRedo(instance) {
  var plugin = this;
  this.instance = instance;
  this.doneActions = [];
  this.undoneActions = [];
  this.ignoreNewActions = false;
  this.enabled = false;
  instance.addHook('afterChange', function (changes, source) {
    var _this = this;
    var changesLen = changes && changes.length;
    if (!changesLen) {
      return;
    }
    var hasDifferences = changes.find(function (change) {
      var _change = _slicedToArray(change, 4),
        oldValue = _change[2],
        newValue = _change[3];
      return oldValue !== newValue;
    });
    if (!hasDifferences) {
      return;
    }
    var wrappedAction = function wrappedAction() {
      var clonedChanges = changes.reduce(function (arr, change) {
        arr.push(_toConsumableArray(change));
        return arr;
      }, []);
      (0, _array.arrayEach)(clonedChanges, function (change) {
        change[1] = instance.propToCol(change[1]);
      });
      var selected = changesLen > 1 ? _this.getSelected() : [[clonedChanges[0][0], clonedChanges[0][1]]];
      return new UndoRedo.ChangeAction(clonedChanges, selected);
    };
    plugin.done(wrappedAction, source);
  });
  instance.addHook('afterCreateRow', function (index, amount, source) {
    plugin.done(function () {
      return new UndoRedo.CreateRowAction(index, amount);
    }, source);
  });
  instance.addHook('beforeRemoveRow', function (index, amount, logicRows, source) {
    var wrappedAction = function wrappedAction() {
      var originalData = plugin.instance.getSourceDataArray();
      var rowIndex = (originalData.length + index) % originalData.length;
      var physicalRowIndex = instance.toPhysicalRow(rowIndex);
      var removedData = (0, _object.deepClone)(originalData.slice(physicalRowIndex, physicalRowIndex + amount));
      return new UndoRedo.RemoveRowAction(rowIndex, removedData, instance.getSettings().fixedRowsBottom, instance.getSettings().fixedRowsTop);
    };
    plugin.done(wrappedAction, source);
  });
  instance.addHook('afterCreateCol', function (index, amount, source) {
    plugin.done(function () {
      return new UndoRedo.CreateColumnAction(index, amount);
    }, source);
  });
  instance.addHook('beforeRemoveCol', function (index, amount, logicColumns, source) {
    var wrappedAction = function wrappedAction() {
      var originalData = plugin.instance.getSourceDataArray();
      var columnIndex = (plugin.instance.countCols() + index) % plugin.instance.countCols();
      var removedData = [];
      var headers = [];
      var indexes = [];
      (0, _number.rangeEach)(originalData.length - 1, function (i) {
        var column = [];
        var origRow = originalData[i];
        (0, _number.rangeEach)(columnIndex, columnIndex + (amount - 1), function (j) {
          column.push(origRow[instance.toPhysicalColumn(j)]);
        });
        removedData.push(column);
      });
      (0, _number.rangeEach)(amount - 1, function (i) {
        indexes.push(instance.toPhysicalColumn(columnIndex + i));
      });
      if (Array.isArray(instance.getSettings().colHeaders)) {
        (0, _number.rangeEach)(amount - 1, function (i) {
          headers.push(instance.getSettings().colHeaders[instance.toPhysicalColumn(columnIndex + i)] || null);
        });
      }
      var columnsMap = instance.columnIndexMapper.getIndexesSequence();
      var rowsMap = instance.rowIndexMapper.getIndexesSequence();
      return new UndoRedo.RemoveColumnAction(columnIndex, indexes, removedData, headers, columnsMap, rowsMap, instance.getSettings().fixedColumnsStart);
    };
    plugin.done(wrappedAction, source);
  });
  instance.addHook('beforeCellAlignment', function (stateBefore, range, type, alignment) {
    plugin.done(function () {
      return new UndoRedo.CellAlignmentAction(stateBefore, range, type, alignment);
    });
  });
  instance.addHook('beforeFilter', function (conditionsStack) {
    plugin.done(function () {
      return new UndoRedo.FiltersAction(conditionsStack);
    });
  });
  instance.addHook('beforeRowMove', function (rows, finalIndex) {
    if (rows === false) {
      return;
    }
    plugin.done(function () {
      return new UndoRedo.RowMoveAction(rows, finalIndex);
    });
  });
  instance.addHook('beforeMergeCells', function (cellRange, auto) {
    if (auto) {
      return;
    }
    plugin.done(function () {
      return new UndoRedo.MergeCellsAction(instance, cellRange);
    });
  });
  instance.addHook('afterUnmergeCells', function (cellRange, auto) {
    if (auto) {
      return;
    }
    plugin.done(function () {
      return new UndoRedo.UnmergeCellsAction(instance, cellRange);
    });
  });

  // TODO: Why this callback is needed? One test doesn't pass after calling method right after plugin creation (outside the callback).
  instance.addHook('afterInit', function () {
    plugin.init();
  });
}

/**
 * Stash information about performed actions.
 *
 * @function done
 * @memberof UndoRedo#
 * @fires Hooks#beforeUndoStackChange
 * @fires Hooks#afterUndoStackChange
 * @fires Hooks#beforeRedoStackChange
 * @fires Hooks#afterRedoStackChange
 * @param {Function} wrappedAction The action descriptor wrapped in a closure.
 * @param {string} [source] Source of the action. It is defined just for more general actions (not related to plugins).
 */
UndoRedo.prototype.done = function (wrappedAction, source) {
  if (this.ignoreNewActions) {
    return;
  }
  var isBlockedByDefault = source === 'UndoRedo.undo' || source === 'UndoRedo.redo' || source === 'auto';
  if (isBlockedByDefault) {
    return;
  }
  var doneActionsCopy = this.doneActions.slice();
  var continueAction = this.instance.runHooks('beforeUndoStackChange', doneActionsCopy, source);
  if (continueAction === false) {
    return;
  }
  var newAction = wrappedAction();
  var undoneActionsCopy = this.undoneActions.slice();
  this.doneActions.push(newAction);
  this.instance.runHooks('afterUndoStackChange', doneActionsCopy, this.doneActions.slice());
  this.instance.runHooks('beforeRedoStackChange', undoneActionsCopy);
  this.undoneActions.length = 0;
  this.instance.runHooks('afterRedoStackChange', undoneActionsCopy, this.undoneActions.slice());
};

/**
 * Undo the last action performed to the table.
 *
 * @function undo
 * @memberof UndoRedo#
 * @fires Hooks#beforeUndoStackChange
 * @fires Hooks#afterUndoStackChange
 * @fires Hooks#beforeRedoStackChange
 * @fires Hooks#afterRedoStackChange
 * @fires Hooks#beforeUndo
 * @fires Hooks#afterUndo
 */
UndoRedo.prototype.undo = function () {
  if (this.isUndoAvailable()) {
    var doneActionsCopy = this.doneActions.slice();
    this.instance.runHooks('beforeUndoStackChange', doneActionsCopy);
    var action = this.doneActions.pop();
    this.instance.runHooks('afterUndoStackChange', doneActionsCopy, this.doneActions.slice());
    var actionClone = (0, _object.deepClone)(action);
    var continueAction = this.instance.runHooks('beforeUndo', actionClone);
    if (continueAction === false) {
      return;
    }
    this.ignoreNewActions = true;
    var that = this;
    var undoneActionsCopy = this.undoneActions.slice();
    this.instance.runHooks('beforeRedoStackChange', undoneActionsCopy);
    action.undo(this.instance, function () {
      that.ignoreNewActions = false;
      that.undoneActions.push(action);
    });
    this.instance.runHooks('afterRedoStackChange', undoneActionsCopy, this.undoneActions.slice());
    this.instance.runHooks('afterUndo', actionClone);
  }
};

/**
 * Redo the previous action performed to the table (used to reverse an undo).
 *
 * @function redo
 * @memberof UndoRedo#
 * @fires Hooks#beforeUndoStackChange
 * @fires Hooks#afterUndoStackChange
 * @fires Hooks#beforeRedoStackChange
 * @fires Hooks#afterRedoStackChange
 * @fires Hooks#beforeRedo
 * @fires Hooks#afterRedo
 */
UndoRedo.prototype.redo = function () {
  if (this.isRedoAvailable()) {
    var undoneActionsCopy = this.undoneActions.slice();
    this.instance.runHooks('beforeRedoStackChange', undoneActionsCopy);
    var action = this.undoneActions.pop();
    this.instance.runHooks('afterRedoStackChange', undoneActionsCopy, this.undoneActions.slice());
    var actionClone = (0, _object.deepClone)(action);
    var continueAction = this.instance.runHooks('beforeRedo', actionClone);
    if (continueAction === false) {
      return;
    }
    this.ignoreNewActions = true;
    var that = this;
    var doneActionsCopy = this.doneActions.slice();
    this.instance.runHooks('beforeUndoStackChange', doneActionsCopy);
    action.redo(this.instance, function () {
      that.ignoreNewActions = false;
      that.doneActions.push(action);
    });
    this.instance.runHooks('afterUndoStackChange', doneActionsCopy, this.doneActions.slice());
    this.instance.runHooks('afterRedo', actionClone);
  }
};

/**
 * Checks if undo action is available.
 *
 * @function isUndoAvailable
 * @memberof UndoRedo#
 * @returns {boolean} Return `true` if undo can be performed, `false` otherwise.
 */
UndoRedo.prototype.isUndoAvailable = function () {
  return this.doneActions.length > 0;
};

/**
 * Checks if redo action is available.
 *
 * @function isRedoAvailable
 * @memberof UndoRedo#
 * @returns {boolean} Return `true` if redo can be performed, `false` otherwise.
 */
UndoRedo.prototype.isRedoAvailable = function () {
  return this.undoneActions.length > 0;
};

/**
 * Clears undo history.
 *
 * @function clear
 * @memberof UndoRedo#
 */
UndoRedo.prototype.clear = function () {
  this.doneActions.length = 0;
  this.undoneActions.length = 0;
};

/**
 * Checks if the plugin is enabled.
 *
 * @function isEnabled
 * @memberof UndoRedo#
 * @returns {boolean}
 */
UndoRedo.prototype.isEnabled = function () {
  return this.enabled;
};

/**
 * Enables the plugin.
 *
 * @function enable
 * @memberof UndoRedo#
 */
UndoRedo.prototype.enable = function () {
  if (this.isEnabled()) {
    return;
  }
  var hot = this.instance;
  this.enabled = true;
  exposeUndoRedoMethods(hot);
  this.registerShortcuts();
  hot.addHook('afterChange', onAfterChange);
};

/**
 * Disables the plugin.
 *
 * @function disable
 * @memberof UndoRedo#
 */
UndoRedo.prototype.disable = function () {
  if (!this.isEnabled()) {
    return;
  }
  var hot = this.instance;
  this.enabled = false;
  removeExposedUndoRedoMethods(hot);
  this.unregisterShortcuts();
  hot.removeHook('afterChange', onAfterChange);
};

/**
 * Destroys the instance.
 *
 * @function destroy
 * @memberof UndoRedo#
 */
UndoRedo.prototype.destroy = function () {
  this.clear();
  this.instance = null;
  this.doneActions = null;
  this.undoneActions = null;
};
UndoRedo.Action = function () {};
UndoRedo.Action.prototype.undo = function () {};
UndoRedo.Action.prototype.redo = function () {};

/**
 * Change action.
 *
 * @private
 * @param {Array} changes 2D array containing information about each of the edited cells.
 * @param {number[]} selected The cell selection.
 */
UndoRedo.ChangeAction = function (changes, selected) {
  this.changes = changes;
  this.selected = selected;
  this.actionType = 'change';
};
(0, _object.inherit)(UndoRedo.ChangeAction, UndoRedo.Action);
UndoRedo.ChangeAction.prototype.undo = function (instance, undoneCallback) {
  var data = (0, _object.deepClone)(this.changes);
  var emptyRowsAtTheEnd = instance.countEmptyRows(true);
  var emptyColsAtTheEnd = instance.countEmptyCols(true);
  for (var i = 0, len = data.length; i < len; i++) {
    data[i].splice(3, 1);
  }
  instance.addHookOnce('afterChange', undoneCallback);
  instance.setDataAtCell(data, null, null, 'UndoRedo.undo');
  for (var _i2 = 0, _len = data.length; _i2 < _len; _i2++) {
    var _data$_i = _slicedToArray(data[_i2], 2),
      row = _data$_i[0],
      column = _data$_i[1];
    if (instance.getSettings().minSpareRows && row + 1 + instance.getSettings().minSpareRows === instance.countRows() && emptyRowsAtTheEnd === instance.getSettings().minSpareRows) {
      instance.alter('remove_row', parseInt(row + 1, 10), instance.getSettings().minSpareRows);
      instance.undoRedo.doneActions.pop();
    }
    if (instance.getSettings().minSpareCols && column + 1 + instance.getSettings().minSpareCols === instance.countCols() && emptyColsAtTheEnd === instance.getSettings().minSpareCols) {
      instance.alter('remove_col', parseInt(column + 1, 10), instance.getSettings().minSpareCols);
      instance.undoRedo.doneActions.pop();
    }
  }
  instance.selectCells(this.selected, false, false);
};
UndoRedo.ChangeAction.prototype.redo = function (instance, onFinishCallback) {
  var data = (0, _object.deepClone)(this.changes);
  for (var i = 0, len = data.length; i < len; i++) {
    data[i].splice(2, 1);
  }
  instance.addHookOnce('afterChange', onFinishCallback);
  instance.setDataAtCell(data, null, null, 'UndoRedo.redo');
  if (this.selected) {
    instance.selectCells(this.selected, false, false);
  }
};

/**
 * Create row action.
 *
 * @private
 * @param {number} index The visual row index.
 * @param {number} amount The number of created rows.
 */
UndoRedo.CreateRowAction = function (index, amount) {
  this.index = index;
  this.amount = amount;
  this.actionType = 'insert_row';
};
(0, _object.inherit)(UndoRedo.CreateRowAction, UndoRedo.Action);
UndoRedo.CreateRowAction.prototype.undo = function (instance, undoneCallback) {
  var rowCount = instance.countRows();
  var minSpareRows = instance.getSettings().minSpareRows;
  if (this.index >= rowCount && this.index - minSpareRows < rowCount) {
    this.index -= minSpareRows; // work around the situation where the needed row was removed due to an 'undo' of a made change
  }

  instance.addHookOnce('afterRemoveRow', undoneCallback);
  instance.alter('remove_row', this.index, this.amount, 'UndoRedo.undo');
};
UndoRedo.CreateRowAction.prototype.redo = function (instance, redoneCallback) {
  instance.addHookOnce('afterCreateRow', redoneCallback);
  instance.alter('insert_row_above', this.index, this.amount, 'UndoRedo.redo');
};

/**
 * Remove row action.
 *
 * @private
 * @param {number} index The visual row index.
 * @param {Array} data The removed data.
 * @param {number} fixedRowsBottom Number of fixed rows on the bottom. Remove row action change it sometimes.
 * @param {number} fixedRowsTop Number of fixed rows on the top. Remove row action change it sometimes.
 */
UndoRedo.RemoveRowAction = function (index, data, fixedRowsBottom, fixedRowsTop) {
  this.index = index;
  this.data = data;
  this.actionType = 'remove_row';
  this.fixedRowsBottom = fixedRowsBottom;
  this.fixedRowsTop = fixedRowsTop;
};
(0, _object.inherit)(UndoRedo.RemoveRowAction, UndoRedo.Action);
UndoRedo.RemoveRowAction.prototype.undo = function (instance, undoneCallback) {
  var settings = instance.getSettings();

  // Changing by the reference as `updateSettings` doesn't work the best.
  settings.fixedRowsBottom = this.fixedRowsBottom;
  settings.fixedRowsTop = this.fixedRowsTop;
  instance.alter('insert_row_above', this.index, this.data.length, 'UndoRedo.undo');
  instance.addHookOnce('afterViewRender', undoneCallback);
  instance.populateFromArray(this.index, 0, this.data, void 0, void 0, 'UndoRedo.undo');
};
UndoRedo.RemoveRowAction.prototype.redo = function (instance, redoneCallback) {
  instance.addHookOnce('afterRemoveRow', redoneCallback);
  instance.alter('remove_row', this.index, this.data.length, 'UndoRedo.redo');
};

/**
 * Create column action.
 *
 * @private
 * @param {number} index The visual column index.
 * @param {number} amount The number of created columns.
 */
UndoRedo.CreateColumnAction = function (index, amount) {
  this.index = index;
  this.amount = amount;
  this.actionType = 'insert_col';
};
(0, _object.inherit)(UndoRedo.CreateColumnAction, UndoRedo.Action);
UndoRedo.CreateColumnAction.prototype.undo = function (instance, undoneCallback) {
  instance.addHookOnce('afterRemoveCol', undoneCallback);
  instance.alter('remove_col', this.index, this.amount, 'UndoRedo.undo');
};
UndoRedo.CreateColumnAction.prototype.redo = function (instance, redoneCallback) {
  instance.addHookOnce('afterCreateCol', redoneCallback);
  instance.alter('insert_col_start', this.index, this.amount, 'UndoRedo.redo');
};

/**
 * Remove column action.
 *
 * @private
 * @param {number} index The visual column index.
 * @param {number[]} indexes The visual column indexes.
 * @param {Array} data The removed data.
 * @param {Array} headers The header values.
 * @param {number[]} columnPositions The column position.
 * @param {number[]} rowPositions The row position.
 * @param {number} fixedColumnsStart Number of fixed columns on the left. Remove column action change it sometimes.
 */
UndoRedo.RemoveColumnAction = function (index, indexes, data, headers, columnPositions, rowPositions, fixedColumnsStart) {
  // eslint-disable-line max-len
  this.index = index;
  this.indexes = indexes;
  this.data = data;
  this.amount = this.data[0].length;
  this.headers = headers;
  this.columnPositions = columnPositions.slice(0);
  this.rowPositions = rowPositions.slice(0);
  this.actionType = 'remove_col';
  this.fixedColumnsStart = fixedColumnsStart;
};
(0, _object.inherit)(UndoRedo.RemoveColumnAction, UndoRedo.Action);
UndoRedo.RemoveColumnAction.prototype.undo = function (instance, undoneCallback) {
  var _this2 = this;
  var settings = instance.getSettings();

  // Changing by the reference as `updateSettings` doesn't work the best.
  settings.fixedColumnsStart = this.fixedColumnsStart;
  var ascendingIndexes = this.indexes.slice(0).sort();
  var sortByIndexes = function sortByIndexes(elem, j, arr) {
    return arr[_this2.indexes.indexOf(ascendingIndexes[j])];
  };
  var removedDataLength = this.data.length;
  var sortedData = [];
  for (var rowIndex = 0; rowIndex < removedDataLength; rowIndex++) {
    sortedData.push((0, _array.arrayMap)(this.data[rowIndex], sortByIndexes));
  }
  var sortedHeaders = (0, _array.arrayMap)(this.headers, sortByIndexes);
  var changes = [];
  instance.alter('insert_col_start', this.indexes[0], this.indexes.length, 'UndoRedo.undo');
  (0, _array.arrayEach)(instance.getSourceDataArray(), function (rowData, rowIndex) {
    (0, _array.arrayEach)(ascendingIndexes, function (changedIndex, contiquesIndex) {
      rowData[changedIndex] = sortedData[rowIndex][contiquesIndex];
      changes.push([rowIndex, changedIndex, rowData[changedIndex]]);
    });
  });
  instance.setSourceDataAtCell(changes, void 0, void 0, 'UndoRedo.undo');
  instance.columnIndexMapper.insertIndexes(ascendingIndexes[0], ascendingIndexes.length);
  if (typeof this.headers !== 'undefined') {
    (0, _array.arrayEach)(sortedHeaders, function (headerData, columnIndex) {
      instance.getSettings().colHeaders[ascendingIndexes[columnIndex]] = headerData;
    });
  }
  instance.batchExecution(function () {
    // Restore row sequence in a case when all columns are removed. the original
    // row sequence is lost in that case.
    instance.rowIndexMapper.setIndexesSequence(_this2.rowPositions);
    instance.columnIndexMapper.setIndexesSequence(_this2.columnPositions);
  }, true);
  instance.addHookOnce('afterViewRender', undoneCallback);
  instance.render();
};
UndoRedo.RemoveColumnAction.prototype.redo = function (instance, redoneCallback) {
  instance.addHookOnce('afterRemoveCol', redoneCallback);
  instance.alter('remove_col', this.index, this.amount, 'UndoRedo.redo');
};

/**
 * Cell alignment action.
 *
 * @private
 * @param {Array} stateBefore The previous state.
 * @param {object} range The cell range.
 * @param {string} type The type of the alignment ("top", "left", "bottom" or "right").
 * @param {string} alignment The alignment CSS class.
 */
UndoRedo.CellAlignmentAction = function (stateBefore, range, type, alignment) {
  this.stateBefore = stateBefore;
  this.range = range;
  this.type = type;
  this.alignment = alignment;
};
UndoRedo.CellAlignmentAction.prototype.undo = function (instance, undoneCallback) {
  var _this3 = this;
  (0, _array.arrayEach)(this.range, function (range) {
    range.forAll(function (row, col) {
      // Alignment classes should only collected within cell ranges. We skip header coordinates.
      if (row >= 0 && col >= 0) {
        instance.setCellMeta(row, col, 'className', _this3.stateBefore[row][col] || ' htLeft');
      }
    });
  });
  instance.addHookOnce('afterViewRender', undoneCallback);
  instance.render();
};
UndoRedo.CellAlignmentAction.prototype.redo = function (instance, undoneCallback) {
  (0, _utils.align)(this.range, this.type, this.alignment, function (row, col) {
    return instance.getCellMeta(row, col);
  }, function (row, col, key, value) {
    return instance.setCellMeta(row, col, key, value);
  });
  instance.addHookOnce('afterViewRender', undoneCallback);
  instance.render();
};

/**
 * Filters action.
 *
 * @private
 * @param {Array} conditionsStack An array of the filter condition.
 */
UndoRedo.FiltersAction = function (conditionsStack) {
  this.conditionsStack = conditionsStack;
  this.actionType = 'filter';
};
(0, _object.inherit)(UndoRedo.FiltersAction, UndoRedo.Action);
UndoRedo.FiltersAction.prototype.undo = function (instance, undoneCallback) {
  var filters = instance.getPlugin('filters');
  instance.addHookOnce('afterViewRender', undoneCallback);
  filters.conditionCollection.importAllConditions(this.conditionsStack.slice(0, this.conditionsStack.length - 1));
  filters.filter();
};
UndoRedo.FiltersAction.prototype.redo = function (instance, redoneCallback) {
  var filters = instance.getPlugin('filters');
  instance.addHookOnce('afterViewRender', redoneCallback);
  filters.conditionCollection.importAllConditions(this.conditionsStack);
  filters.filter();
};

/**
 * Merge Cells action.
 *
 * @util
 */
var MergeCellsAction = /*#__PURE__*/function (_UndoRedo$Action) {
  _inherits(MergeCellsAction, _UndoRedo$Action);
  var _super = _createSuper(MergeCellsAction);
  function MergeCellsAction(instance, cellRange) {
    var _this4;
    _classCallCheck(this, MergeCellsAction);
    _this4 = _super.call(this);
    _this4.cellRange = cellRange;
    var topStartCorner = _this4.cellRange.getTopStartCorner();
    var bottomEndCorner = _this4.cellRange.getBottomEndCorner();
    _this4.rangeData = instance.getData(topStartCorner.row, topStartCorner.col, bottomEndCorner.row, bottomEndCorner.col);
    return _this4;
  }
  _createClass(MergeCellsAction, [{
    key: "undo",
    value: function undo(instance, undoneCallback) {
      var mergeCellsPlugin = instance.getPlugin('mergeCells');
      instance.addHookOnce('afterViewRender', undoneCallback);
      mergeCellsPlugin.unmergeRange(this.cellRange, true);
      var topStartCorner = this.cellRange.getTopStartCorner();
      instance.populateFromArray(topStartCorner.row, topStartCorner.col, this.rangeData, void 0, void 0, 'MergeCells');
    }
  }, {
    key: "redo",
    value: function redo(instance, redoneCallback) {
      var mergeCellsPlugin = instance.getPlugin('mergeCells');
      instance.addHookOnce('afterViewRender', redoneCallback);
      mergeCellsPlugin.mergeRange(this.cellRange);
    }
  }]);
  return MergeCellsAction;
}(UndoRedo.Action);
UndoRedo.MergeCellsAction = MergeCellsAction;

/**
 * Unmerge Cells action.
 *
 * @util
 */
var UnmergeCellsAction = /*#__PURE__*/function (_UndoRedo$Action2) {
  _inherits(UnmergeCellsAction, _UndoRedo$Action2);
  var _super2 = _createSuper(UnmergeCellsAction);
  function UnmergeCellsAction(instance, cellRange) {
    var _this5;
    _classCallCheck(this, UnmergeCellsAction);
    _this5 = _super2.call(this);
    _this5.cellRange = cellRange;
    return _this5;
  }
  _createClass(UnmergeCellsAction, [{
    key: "undo",
    value: function undo(instance, undoneCallback) {
      var mergeCellsPlugin = instance.getPlugin('mergeCells');
      instance.addHookOnce('afterViewRender', undoneCallback);
      mergeCellsPlugin.mergeRange(this.cellRange, true);
    }
  }, {
    key: "redo",
    value: function redo(instance, redoneCallback) {
      var mergeCellsPlugin = instance.getPlugin('mergeCells');
      instance.addHookOnce('afterViewRender', redoneCallback);
      mergeCellsPlugin.unmergeRange(this.cellRange, true);
      instance.render();
    }
  }]);
  return UnmergeCellsAction;
}(UndoRedo.Action);
UndoRedo.UnmergeCellsAction = UnmergeCellsAction;

/**
 * ManualRowMove action.
 *
 * @TODO removeRow undo should works on logical index
 * @private
 * @param {number[]} rows An array with moved rows.
 * @param {number} finalIndex The destination index.
 */
UndoRedo.RowMoveAction = function (rows, finalIndex) {
  this.rows = rows.slice();
  this.finalIndex = finalIndex;
  this.actionType = 'row_move';
};
(0, _object.inherit)(UndoRedo.RowMoveAction, UndoRedo.Action);
UndoRedo.RowMoveAction.prototype.undo = function (instance, undoneCallback) {
  var _this6 = this;
  var manualRowMove = instance.getPlugin('manualRowMove');
  var copyOfRows = [].concat(this.rows);
  var rowsMovedUp = copyOfRows.filter(function (a) {
    return a > _this6.finalIndex;
  });
  var rowsMovedDown = copyOfRows.filter(function (a) {
    return a <= _this6.finalIndex;
  });
  var allMovedRows = rowsMovedUp.sort(function (a, b) {
    return b - a;
  }).concat(rowsMovedDown.sort(function (a, b) {
    return a - b;
  }));
  instance.addHookOnce('afterViewRender', undoneCallback);

  // Moving rows from those with higher indexes to those with lower indexes when action was performed from bottom to top
  // Moving rows from those with lower indexes to those with higher indexes when action was performed from top to bottom
  for (var i = 0; i < allMovedRows.length; i += 1) {
    var newPhysicalRow = instance.toVisualRow(allMovedRows[i]);
    manualRowMove.moveRow(newPhysicalRow, allMovedRows[i]);
  }
  instance.render();
  instance.deselectCell();
  instance.selectRows(this.rows[0], this.rows[0] + this.rows.length - 1);
};
UndoRedo.RowMoveAction.prototype.redo = function (instance, redoneCallback) {
  var manualRowMove = instance.getPlugin('manualRowMove');
  instance.addHookOnce('afterViewRender', redoneCallback);
  manualRowMove.moveRows(this.rows.slice(), this.finalIndex);
  instance.render();
  instance.deselectCell();
  instance.selectRows(this.finalIndex, this.finalIndex + this.rows.length - 1);
};

/**
 * Enabling and disabling plugin and attaching its to an instance.
 *
 * @private
 */
UndoRedo.prototype.init = function () {
  var settings = this.instance.getSettings().undo;
  var pluginEnabled = typeof settings === 'undefined' || settings;
  if (!this.instance.undoRedo) {
    this.instance.undoRedo = this;
  }
  if (pluginEnabled) {
    this.instance.undoRedo.enable();
  } else {
    this.instance.undoRedo.disable();
  }
};

/**
 * Registers shortcuts responsible for performing undo/redo.
 *
 * @private
 */
UndoRedo.prototype.registerShortcuts = function () {
  var _this7 = this;
  var shortcutManager = this.instance.getShortcutManager();
  var gridContext = shortcutManager.getContext('grid');
  var runOnlyIf = function runOnlyIf(event) {
    return !event.altKey; // right ALT in some systems triggers ALT+CTR
  };

  var config = {
    runOnlyIf: runOnlyIf,
    group: SHORTCUTS_GROUP
  };
  gridContext.addShortcuts([{
    keys: [['Control/Meta', 'z']],
    callback: function callback() {
      _this7.undo();
    }
  }, {
    keys: [['Control/Meta', 'y'], ['Control/Meta', 'Shift', 'z']],
    callback: function callback() {
      _this7.redo();
    }
  }], config);
};

/**
 * Unregister shortcuts responsible for performing undo/redo.
 *
 * @private
 */
UndoRedo.prototype.unregisterShortcuts = function () {
  var shortcutManager = this.instance.getShortcutManager();
  var gridContext = shortcutManager.getContext('grid');
  gridContext.removeShortcutsByGroup(SHORTCUTS_GROUP);
};

/**
 * @param {Array} changes 2D array containing information about each of the edited cells.
 * @param {string} source String that identifies source of hook call.
 * @returns {boolean}
 */
function onAfterChange(changes, source) {
  var instance = this;
  if (source === 'loadData') {
    return instance.undoRedo.clear();
  }
}

/**
 * @param {Core} instance The Handsontable instance.
 */
function exposeUndoRedoMethods(instance) {
  /**
   * {@link UndoRedo#undo}.
   *
   * @alias undo
   * @memberof! Core#
   * @returns {boolean}
   */
  instance.undo = function () {
    return instance.undoRedo.undo();
  };

  /**
   * {@link UndoRedo#redo}.
   *
   * @alias redo
   * @memberof! Core#
   * @returns {boolean}
   */
  instance.redo = function () {
    return instance.undoRedo.redo();
  };

  /**
   * {@link UndoRedo#isUndoAvailable}.
   *
   * @alias isUndoAvailable
   * @memberof! Core#
   * @returns {boolean}
   */
  instance.isUndoAvailable = function () {
    return instance.undoRedo.isUndoAvailable();
  };

  /**
   * {@link UndoRedo#isRedoAvailable}.
   *
   * @alias isRedoAvailable
   * @memberof! Core#
   * @returns {boolean}
   */
  instance.isRedoAvailable = function () {
    return instance.undoRedo.isRedoAvailable();
  };

  /**
   * {@link UndoRedo#clear}.
   *
   * @alias clearUndo
   * @memberof! Core#
   * @returns {boolean}
   */
  instance.clearUndo = function () {
    return instance.undoRedo.clear();
  };
}

/**
 * @param {Core} instance The Handsontable instance.
 */
function removeExposedUndoRedoMethods(instance) {
  delete instance.undo;
  delete instance.redo;
  delete instance.isUndoAvailable;
  delete instance.isRedoAvailable;
  delete instance.clearUndo;
}
var hook = _pluginHooks.default.getSingleton();
hook.add('afterUpdateSettings', function () {
  var _this$getPlugin;
  (_this$getPlugin = this.getPlugin('undoRedo')) === null || _this$getPlugin === void 0 ? void 0 : _this$getPlugin.init();
});
hook.register('beforeUndo');
hook.register('afterUndo');
hook.register('beforeRedo');
hook.register('afterRedo');
UndoRedo.PLUGIN_KEY = PLUGIN_KEY;
UndoRedo.SETTING_KEYS = true;
var _default = UndoRedo;
exports.default = _default;