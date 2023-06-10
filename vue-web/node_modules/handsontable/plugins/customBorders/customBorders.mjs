function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.splice.js";
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { BasePlugin } from "../base/index.mjs";
import { hasOwnProperty, objectEach, deepClone } from "../../helpers/object.mjs";
import { rangeEach } from "../../helpers/number.mjs";
import { arrayEach, arrayReduce, arrayMap } from "../../helpers/array.mjs";
import * as C from "../../i18n/constants.mjs";
import { top as menuItemTop, bottom as menuItemBottom, left as menuItemLeft, right as menuItemRight, noBorders as menuItemNoBorders } from "./contextMenuItem/index.mjs";
import { createId, createDefaultCustomBorder, createSingleEmptyBorder, createEmptyBorders, extendDefaultBorder, hasLeftRightTypeOptions, hasStartEndTypeOptions, toInlinePropName, normalizeBorder, denormalizeBorder } from "./utils.mjs";
import { detectSelectionType, normalizeSelectionFactory } from "../../selection/index.mjs";
export var PLUGIN_KEY = 'customBorders';
export var PLUGIN_PRIORITY = 90;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin CustomBorders
 * @class CustomBorders
 *
 * @description
 * This plugin enables an option to apply custom borders through the context menu (configurable with context menu key
 * `borders`).
 *
 * To initialize Handsontable with predefined custom borders, provide cell coordinates and border styles in a form
 * of an array.
 *
 * See [`customBorders` configuration option](@/api/options.md#customBorders) or go to
 * [Custom cell borders demo](@/guides/cell-features/formatting-cells.md#custom-cell-borders) for more examples.
 *
 * @example
 * ```js
 * customBorders: [
 *   {
 *    range: {
 *      from: {
 *        row: 1,
 *        col: 1
 *      },
 *      to: {
 *        row: 3,
 *        col: 4
 *      },
 *    },
 *    start: {},
 *    end: {},
 *    top: {},
 *    bottom: {},
 *   },
 * ],
 *
 * // or
 * customBorders: [
 *   { row: 2,
 *     col: 2,
 *     start: {
 *       width: 2,
 *       color: 'red',
 *     },
 *     end: {
 *       width: 1,
 *       color: 'green',
 *     },
 *     top: '',
 *     bottom: '',
 *   }
 * ],
 * ```
 */
export var CustomBorders = /*#__PURE__*/function (_BasePlugin) {
  _inherits(CustomBorders, _BasePlugin);
  var _super = _createSuper(CustomBorders);
  function CustomBorders() {
    var _this;
    _classCallCheck(this, CustomBorders);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "savedBorders", []);
    return _this;
  }
  _createClass(CustomBorders, [{
    key: "isEnabled",
    value:
    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` then the {@link CustomBorders#enablePlugin} method is called.
     *
     * @returns {boolean}
     */
    function isEnabled() {
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
      this.addHook('afterContextMenuDefaultOptions', function (options) {
        return _this2.onAfterContextMenuDefaultOptions(options);
      });
      this.addHook('init', function () {
        return _this2.onAfterInit();
      });
      _get(_getPrototypeOf(CustomBorders.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.hideBorders();
      _get(_getPrototypeOf(CustomBorders.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`customBorders`](@/api/options.md#customborders)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      this.changeBorderSettings();
      _get(_getPrototypeOf(CustomBorders.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Set custom borders.
     *
     * @example
     * ```js
     * const customBordersPlugin = hot.getPlugin('customBorders');
     *
     * // Using an array of arrays (produced by `.getSelected()` method).
     * customBordersPlugin.setBorders([[1, 1, 2, 2], [6, 2, 0, 2]], {start: {width: 2, color: 'blue'}});
     *
     * // Using an array of CellRange objects (produced by `.getSelectedRange()` method).
     * //  Selecting a cell range.
     * hot.selectCell(0, 0, 2, 2);
     * // Returning selected cells' range with the getSelectedRange method.
     * customBordersPlugin.setBorders(hot.getSelectedRange(), {start: {hide: false, width: 2, color: 'blue'}});
     * ```
     *
     * @param {Array[]|CellRange[]} selectionRanges Array of selection ranges.
     * @param {object} borderObject Object with `top`, `right`, `bottom` and `start` properties.
     */
  }, {
    key: "setBorders",
    value: function setBorders(selectionRanges, borderObject) {
      var _this3 = this;
      var borderKeys = ['top', 'bottom', 'start', 'end'];
      var normBorder = null;
      if (borderObject) {
        this.checkSettingsCohesion([borderObject]);
        borderKeys = Object.keys(borderObject);
        normBorder = normalizeBorder(borderObject);
      }
      var selectionType = detectSelectionType(selectionRanges);
      var selectionSchemaNormalizer = normalizeSelectionFactory(selectionType);
      arrayEach(selectionRanges, function (selection) {
        var _selectionSchemaNorma = selectionSchemaNormalizer(selection),
          _selectionSchemaNorma2 = _slicedToArray(_selectionSchemaNorma, 4),
          rowStart = _selectionSchemaNorma2[0],
          columnStart = _selectionSchemaNorma2[1],
          rowEnd = _selectionSchemaNorma2[2],
          columnEnd = _selectionSchemaNorma2[3];
        var _loop = function _loop(row) {
          var _loop2 = function _loop2(col) {
            arrayEach(borderKeys, function (borderKey) {
              _this3.prepareBorderFromCustomAdded(row, col, normBorder, toInlinePropName(borderKey));
            });
          };
          for (var col = columnStart; col <= columnEnd; col += 1) {
            _loop2(col);
          }
        };
        for (var row = rowStart; row <= rowEnd; row += 1) {
          _loop(row);
        }
      });

      /*
      The line below triggers a re-render of Handsontable. This will be a "fastDraw"
      render, because that is the default for the TableView class.
       The re-render is needed for borders on cells that did not have a border before.
      The way this call works is that it calls Table.refreshSelections, which calls
      Selection.getBorder, which creates a new instance of Border.
       Seems wise to keep this single-direction flow of creating new Borders
      */
      this.hot.view.render();
    }

    /**
     * Get custom borders.
     *
     * @example
     * ```js
     * const customBordersPlugin = hot.getPlugin('customBorders');
     *
     * // Using an array of arrays (produced by `.getSelected()` method).
     * customBordersPlugin.getBorders([[1, 1, 2, 2], [6, 2, 0, 2]]);
     * // Using an array of CellRange objects (produced by `.getSelectedRange()` method).
     * customBordersPlugin.getBorders(hot.getSelectedRange());
     * // Using without param - return all customBorders.
     * customBordersPlugin.getBorders();
     * ```
     *
     * @param {Array[]|CellRange[]} selectionRanges Array of selection ranges.
     * @returns {object[]} Returns array of border objects.
     */
  }, {
    key: "getBorders",
    value: function getBorders(selectionRanges) {
      var _this4 = this;
      if (!Array.isArray(selectionRanges)) {
        return this.savedBorders;
      }
      var selectionType = detectSelectionType(selectionRanges);
      var selectionSchemaNormalizer = normalizeSelectionFactory(selectionType);
      var selectedBorders = [];
      arrayEach(selectionRanges, function (selection) {
        var _selectionSchemaNorma3 = selectionSchemaNormalizer(selection),
          _selectionSchemaNorma4 = _slicedToArray(_selectionSchemaNorma3, 4),
          rowStart = _selectionSchemaNorma4[0],
          columnStart = _selectionSchemaNorma4[1],
          rowEnd = _selectionSchemaNorma4[2],
          columnEnd = _selectionSchemaNorma4[3];
        var _loop3 = function _loop3(row) {
          var _loop4 = function _loop4(col) {
            arrayEach(_this4.savedBorders, function (border) {
              if (border.row === row && border.col === col) {
                selectedBorders.push(denormalizeBorder(border));
              }
            });
          };
          for (var col = columnStart; col <= columnEnd; col += 1) {
            _loop4(col);
          }
        };
        for (var row = rowStart; row <= rowEnd; row += 1) {
          _loop3(row);
        }
      });
      return selectedBorders;
    }

    /**
     * Clear custom borders.
     *
     * @example
     * ```js
     * const customBordersPlugin = hot.getPlugin('customBorders');
     *
     * // Using an array of arrays (produced by `.getSelected()` method).
     * customBordersPlugin.clearBorders([[1, 1, 2, 2], [6, 2, 0, 2]]);
     * // Using an array of CellRange objects (produced by `.getSelectedRange()` method).
     * customBordersPlugin.clearBorders(hot.getSelectedRange());
     * // Using without param - clear all customBorders.
     * customBordersPlugin.clearBorders();
     * ```
     *
     * @param {Array[]|CellRange[]} selectionRanges Array of selection ranges.
     */
  }, {
    key: "clearBorders",
    value: function clearBorders(selectionRanges) {
      var _this5 = this;
      if (selectionRanges) {
        this.setBorders(selectionRanges);
      } else {
        arrayEach(this.savedBorders, function (border) {
          _this5.clearBordersFromSelectionSettings(border.id);
          _this5.clearNullCellRange();
          _this5.hot.removeCellMeta(border.row, border.col, 'borders');
        });
        this.savedBorders.length = 0;
      }
    }

    /**
     * Insert WalkontableSelection instance into Walkontable settings.
     *
     * @private
     * @param {object} border Object with `row` and `col`, `start`, `end`, `top` and `bottom`, `id` and `border` ({Object} with `color`, `width` and `cornerVisible` property) properties.
     * @param {string} [place] Coordinate where add/remove border - `top`, `bottom`, `start`, `end`.
     */
  }, {
    key: "insertBorderIntoSettings",
    value: function insertBorderIntoSettings(border, place) {
      var hasSavedBorders = this.checkSavedBorders(border);
      if (!hasSavedBorders) {
        this.savedBorders.push(border);
      }
      var visualCellRange = this.hot._createCellRange(this.hot._createCellCoords(border.row, border.col));
      var hasCustomSelections = this.checkCustomSelections(border, visualCellRange, place);
      if (!hasCustomSelections) {
        this.hot.selection.highlight.addCustomSelection({
          border: border,
          visualCellRange: visualCellRange
        });
      }
    }

    /**
     * Prepare borders from setting (single cell).
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {object} borderDescriptor Object with `row` and `col`, `start`, `end`, `top` and `bottom` properties.
     * @param {string} [place] Coordinate where add/remove border - `top`, `bottom`, `start`, `end`.
     */
  }, {
    key: "prepareBorderFromCustomAdded",
    value: function prepareBorderFromCustomAdded(row, column, borderDescriptor, place) {
      var nrOfRows = this.hot.countRows();
      var nrOfColumns = this.hot.countCols();
      if (row >= nrOfRows || column >= nrOfColumns) {
        return;
      }
      var border = createEmptyBorders(row, column);
      if (borderDescriptor) {
        border = extendDefaultBorder(border, borderDescriptor);
        arrayEach(this.hot.selection.highlight.customSelections, function (customSelection) {
          if (border.id === customSelection.settings.id) {
            Object.assign(customSelection.settings, borderDescriptor);
            border.id = customSelection.settings.id;
            border.top = customSelection.settings.top;
            border.bottom = customSelection.settings.bottom;
            border.start = customSelection.settings.start;
            border.end = customSelection.settings.end;
            return false; // breaks forAll
          }
        });
      }

      this.hot.setCellMeta(row, column, 'borders', denormalizeBorder(border));
      this.insertBorderIntoSettings(border, place);
    }

    /**
     * Prepare borders from setting (object).
     *
     * @private
     * @param {object} range {CellRange} The CellRange object.
     * @param {object} customBorder Object with `start`, `end`, `top` and `bottom` properties.
     */
  }, {
    key: "prepareBorderFromCustomAddedRange",
    value: function prepareBorderFromCustomAddedRange(range, customBorder) {
      var _this6 = this;
      var lastRowIndex = Math.min(range.to.row, this.hot.countRows() - 1);
      var lastColumnIndex = Math.min(range.to.col, this.hot.countCols() - 1);
      rangeEach(range.from.row, lastRowIndex, function (rowIndex) {
        rangeEach(range.from.col, lastColumnIndex, function (colIndex) {
          var border = createEmptyBorders(rowIndex, colIndex);
          var add = 0;
          if (rowIndex === range.from.row) {
            if (hasOwnProperty(customBorder, 'top')) {
              add += 1;
              border.top = customBorder.top;
            }
          }

          // Please keep in mind that `range.to.row` may be beyond the table boundaries. The border won't be rendered.
          if (rowIndex === range.to.row) {
            if (hasOwnProperty(customBorder, 'bottom')) {
              add += 1;
              border.bottom = customBorder.bottom;
            }
          }
          if (colIndex === range.from.col) {
            if (hasOwnProperty(customBorder, 'start')) {
              add += 1;
              border.start = customBorder.start;
            }
          }

          // Please keep in mind that `range.to.col` may be beyond the table boundaries. The border won't be rendered.
          if (colIndex === range.to.col) {
            if (hasOwnProperty(customBorder, 'end')) {
              add += 1;
              border.end = customBorder.end;
            }
          }
          if (add > 0) {
            _this6.hot.setCellMeta(rowIndex, colIndex, 'borders', denormalizeBorder(border));
            _this6.insertBorderIntoSettings(border);
          } else {
            // TODO sometimes it enters here. Why?
          }
        });
      });
    }

    /**
     * Remove border (triggered from context menu).
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     */
  }, {
    key: "removeAllBorders",
    value: function removeAllBorders(row, column) {
      var borderId = createId(row, column);
      this.spliceBorder(borderId);
      this.clearBordersFromSelectionSettings(borderId);
      this.clearNullCellRange();
      this.hot.removeCellMeta(row, column, 'borders');
    }

    /**
     * Set borders for each cell re. To border position.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {string} place Coordinate where add/remove border - `top`, `bottom`, `start`, `end` and `noBorders`.
     * @param {boolean} remove True when remove borders, and false when add borders.
     */
  }, {
    key: "setBorder",
    value: function setBorder(row, column, place, remove) {
      var bordersMeta = this.hot.getCellMeta(row, column).borders;
      if (!bordersMeta || bordersMeta.border === void 0) {
        bordersMeta = createEmptyBorders(row, column);
      } else {
        bordersMeta = normalizeBorder(bordersMeta);
      }
      if (remove) {
        bordersMeta[place] = createSingleEmptyBorder();
        var hideCount = this.countHide(bordersMeta);
        if (hideCount === 4) {
          this.removeAllBorders(row, column);
        } else {
          var customSelectionsChecker = this.checkCustomSelectionsFromContextMenu(bordersMeta, place, remove);
          if (!customSelectionsChecker) {
            this.insertBorderIntoSettings(bordersMeta);
          }
          this.hot.setCellMeta(row, column, 'borders', denormalizeBorder(bordersMeta));
        }
      } else {
        bordersMeta[place] = createDefaultCustomBorder();
        var _customSelectionsChecker = this.checkCustomSelectionsFromContextMenu(bordersMeta, place, remove);
        if (!_customSelectionsChecker) {
          this.insertBorderIntoSettings(bordersMeta);
        }
        this.hot.setCellMeta(row, column, 'borders', denormalizeBorder(bordersMeta));
      }
    }

    /**
     * Prepare borders based on cell and border position.
     *
     * @private
     * @param {CellRange[]} selected An array of CellRange objects.
     * @param {string} place Coordinate where add/remove border - `top`, `bottom`, `left`, `right` and `noBorders`.
     * @param {boolean} remove True when remove borders, and false when add borders.
     */
  }, {
    key: "prepareBorder",
    value: function prepareBorder(selected, place, remove) {
      var _this7 = this;
      arrayEach(selected, function (_ref) {
        var start = _ref.start,
          end = _ref.end;
        if (start.row === end.row && start.col === end.col) {
          if (place === 'noBorders') {
            _this7.removeAllBorders(start.row, start.col);
          } else {
            _this7.setBorder(start.row, start.col, place, remove);
          }
        } else {
          switch (place) {
            case 'noBorders':
              rangeEach(start.col, end.col, function (colIndex) {
                rangeEach(start.row, end.row, function (rowIndex) {
                  _this7.removeAllBorders(rowIndex, colIndex);
                });
              });
              break;
            case 'top':
              rangeEach(start.col, end.col, function (topCol) {
                _this7.setBorder(start.row, topCol, place, remove);
              });
              break;
            case 'bottom':
              rangeEach(start.col, end.col, function (bottomCol) {
                _this7.setBorder(end.row, bottomCol, place, remove);
              });
              break;
            case 'start':
              rangeEach(start.row, end.row, function (rowStart) {
                _this7.setBorder(rowStart, start.col, place, remove);
              });
              break;
            case 'end':
              rangeEach(start.row, end.row, function (rowEnd) {
                _this7.setBorder(rowEnd, end.col, place, remove);
              });
              break;
            default:
              break;
          }
        }
      });
    }

    /**
     * Create borders from settings.
     *
     * @private
     * @param {Array} customBorders Object with `row` and `col`, `start`, `end`, `top` and `bottom` properties.
     */
  }, {
    key: "createCustomBorders",
    value: function createCustomBorders(customBorders) {
      var _this8 = this;
      arrayEach(customBorders, function (customBorder) {
        var normCustomBorder = normalizeBorder(customBorder);
        if (customBorder.range) {
          _this8.prepareBorderFromCustomAddedRange(customBorder.range, normCustomBorder);
        } else {
          _this8.prepareBorderFromCustomAdded(customBorder.row, customBorder.col, normCustomBorder);
        }
      });
    }

    /**
     * Count hide property in border object.
     *
     * @private
     * @param {object} border Object with `row` and `col`, `start`, `end`, `top` and `bottom`, `id` and
     *                        `border` ({Object} with `color`, `width` and `cornerVisible` property) properties.
     * @returns {number}
     */
  }, {
    key: "countHide",
    value: function countHide(border) {
      var top = border.top,
        bottom = border.bottom,
        start = border.start,
        end = border.end;
      var values = [top, bottom, start, end];
      return arrayReduce(values, function (accumulator, value) {
        var result = accumulator;
        if (value && value.hide) {
          result += 1;
        }
        return result;
      }, 0);
    }

    /**
     * Clear borders settings from custom selections.
     *
     * @private
     * @param {string} borderId Border id name as string.
     */
  }, {
    key: "clearBordersFromSelectionSettings",
    value: function clearBordersFromSelectionSettings(borderId) {
      var index = arrayMap(this.hot.selection.highlight.customSelections, function (customSelection) {
        return customSelection.settings.id;
      }).indexOf(borderId);
      if (index > -1) {
        this.hot.selection.highlight.customSelections[index].clear();
      }
    }

    /**
     * Clear cellRange with null value.
     *
     * @private
     */
  }, {
    key: "clearNullCellRange",
    value: function clearNullCellRange() {
      var _this9 = this;
      arrayEach(this.hot.selection.highlight.customSelections, function (customSelection, index) {
        if (customSelection.cellRange === null) {
          _this9.hot.selection.highlight.customSelections[index].destroy();
          _this9.hot.selection.highlight.customSelections.splice(index, 1);
          return false; // breaks forAll
        }
      });
    }

    /**
     * Hide custom borders.
     *
     * @private
     */
  }, {
    key: "hideBorders",
    value: function hideBorders() {
      var _this10 = this;
      arrayEach(this.savedBorders, function (border) {
        _this10.clearBordersFromSelectionSettings(border.id);
        _this10.clearNullCellRange();
      });
    }

    /**
     * Splice border from savedBorders.
     *
     * @private
     * @param {string} borderId Border id name as string.
     */
  }, {
    key: "spliceBorder",
    value: function spliceBorder(borderId) {
      var index = arrayMap(this.savedBorders, function (border) {
        return border.id;
      }).indexOf(borderId);
      if (index > -1) {
        this.savedBorders.splice(index, 1);
      }
    }

    /**
     * Check if an border already exists in the savedBorders array, and if true update border in savedBorders.
     *
     * @private
     * @param {object} border Object with `row` and `col`, `start`, `end`, `top` and `bottom`, `id` and
     *                        `border` ({Object} with `color`, `width` and `cornerVisible` property) properties.
     *
     * @returns {boolean}
     */
  }, {
    key: "checkSavedBorders",
    value: function checkSavedBorders(border) {
      var _this11 = this;
      var check = false;
      var hideCount = this.countHide(border);
      if (hideCount === 4) {
        this.spliceBorder(border.id);
        check = true;
      } else {
        arrayEach(this.savedBorders, function (savedBorder, index) {
          if (border.id === savedBorder.id) {
            _this11.savedBorders[index] = border;
            check = true;
            return false; // breaks forAll
          }
        });
      }

      return check;
    }

    /**
     * Check if an border already exists in the customSelections, and if true call toggleHiddenClass method.
     *
     * @private
     * @param {object} border Object with `row` and `col`, `start`, `end`, `top` and `bottom`, `id` and
     *                        `border` ({Object} with `color`, `width` and `cornerVisible` property) properties.
     * @param {string} place Coordinate where add/remove border - `top`, `bottom`, `start`, `end` and `noBorders`.
     * @param {boolean} remove True when remove borders, and false when add borders.
     *
     * @returns {boolean}
     */
  }, {
    key: "checkCustomSelectionsFromContextMenu",
    value: function checkCustomSelectionsFromContextMenu(border, place, remove) {
      var check = false;
      arrayEach(this.hot.selection.highlight.customSelections, function (customSelection) {
        if (border.id === customSelection.settings.id) {
          objectEach(customSelection.instanceBorders, function (borderObject) {
            borderObject.toggleHiddenClass(place, remove); // TODO this also bad?
          });

          check = true;
          return false; // breaks forAll
        }
      });

      return check;
    }

    /**
     * Check if an border already exists in the customSelections, and if true reset cellRange.
     *
     * @private
     * @param {object} border Object with `row` and `col`, `start`, `end`, `top` and `bottom`, `id` and
     *                        `border` ({Object} with `color`, `width` and `cornerVisible` property) properties.
     * @param {CellRange} cellRange The selection range to check.
     * @param {string} [place] Coordinate where add/remove border - `top`, `bottom`, `start`, `end`.
     * @returns {boolean}
     */
  }, {
    key: "checkCustomSelections",
    value: function checkCustomSelections(border, cellRange, place) {
      var hideCount = this.countHide(border);
      var check = false;
      if (hideCount === 4) {
        this.removeAllBorders(border.row, border.col);
        check = true;
      } else {
        arrayEach(this.hot.selection.highlight.customSelections, function (customSelection) {
          if (border.id === customSelection.settings.id) {
            customSelection.visualCellRange = cellRange;
            customSelection.commit();
            if (place) {
              objectEach(customSelection.instanceBorders, function (borderObject) {
                borderObject.changeBorderStyle(place, border);
              });
            }
            check = true;
            return false; // breaks forAll
          }
        });
      }

      return check;
    }

    /**
     * Change borders from settings.
     *
     * @private
     */
  }, {
    key: "changeBorderSettings",
    value: function changeBorderSettings() {
      var customBorders = this.hot.getSettings()[PLUGIN_KEY];
      if (Array.isArray(customBorders)) {
        var bordersClone = deepClone(customBorders);
        this.checkSettingsCohesion(bordersClone);
        if (!bordersClone.length) {
          this.savedBorders = bordersClone;
        }
        this.createCustomBorders(bordersClone);
      } else if (customBorders !== void 0) {
        this.createCustomBorders(this.savedBorders);
      }
    }

    /**
     * Checks the settings cohesion. The properties such like "left"/"right" are supported only
     * in the LTR mode and the "left"/"right" options can not be used together with "start"/"end" properties.
     *
     * @private
     * @param {object[]} customBorders The user defined custom border objects array.
     */
  }, {
    key: "checkSettingsCohesion",
    value: function checkSettingsCohesion(customBorders) {
      var hasLeftOrRight = hasLeftRightTypeOptions(customBorders);
      var hasStartOrEnd = hasStartEndTypeOptions(customBorders);
      if (hasLeftOrRight && hasStartOrEnd) {
        throw new Error('The "left"/"right" and "start"/"end" options should not be used together. ' + 'Please use only the option "start"/"end".');
      }
      if (this.hot.isRtl() && hasLeftOrRight) {
        throw new Error('The "left"/"right" properties are not supported for RTL. Please use option "start"/"end".');
      }
    }

    /**
     * Add border options to context menu.
     *
     * @private
     * @param {object} defaultOptions Context menu items.
     */
  }, {
    key: "onAfterContextMenuDefaultOptions",
    value: function onAfterContextMenuDefaultOptions(defaultOptions) {
      if (!this.hot.getSettings()[PLUGIN_KEY]) {
        return;
      }
      defaultOptions.items.push({
        name: '---------'
      }, {
        key: 'borders',
        name: function name() {
          return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_BORDERS);
        },
        disabled: function disabled() {
          return this.selection.isSelectedByCorner();
        },
        submenu: {
          items: [menuItemTop(this), menuItemRight(this), menuItemBottom(this), menuItemLeft(this), menuItemNoBorders(this)]
        }
      });
    }

    /**
     * `afterInit` hook callback.
     *
     * @private
     */
  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      this.changeBorderSettings();
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(CustomBorders.prototype), "destroy", this).call(this);
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

    /**
     * Saved borders.
     *
     * @private
     * @type {Array}
     */
  }]);
  return CustomBorders;
}(BasePlugin);