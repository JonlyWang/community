import "core-js/modules/es.object.freeze.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { fastInnerText } from "../../../helpers/dom/element.mjs";
import { objectEach } from "../../../helpers/object.mjs";
/**
 * @todo Describe options.
 * @typedef SettingsPure
 *
 * @property {Option} facade @todo desc.
 * @property {Option} cellRenderer Option `cellRenderer`.
 * @property {Option} columnHeaders Option `columnHeaders`.
 * @property {Option} columnWidth Option `columnWidth`.
 * @property {Option} currentRowClassName Option `currentRowClassName`.
 * @property {Option} data Option `data`.
 * @property {Option} defaultColumnWidth Option `defaultColumnWidth`.
 * @property {Option} defaultRowHeight Option `defaultRowHeight`.
 * @property {Option} externalRowCalculator Option `externalRowCalculator`.
 * @property {Option} fixedColumnsStart Option `fixedColumnsStart`.
 * @property {Option} fixedRowsBottom Option `fixedRowsBottom`.
 * @property {Option} fixedRowsTop Option `fixedRowsTop`.
 * @property {Option} freezeOverlays Option `freezeOverlays`.
 * @property {Option} groups Option `groups`.
 * @property {Option} hideBorderOnMouseDownOver Option `hideBorderOnMouseDownOver`.
 * @property {Option} isRtl Option `isRtl`.
 * @property {Option} isDataViewInstance Option `isDataViewInstance`.
 * @property {Option} minSpareRows Option `minSpareRows`.
 * @property {Option} onBeforeHighlightingColumnHeader Option `onBeforeHighlightingColumnHeader`.
 * @property {Option} onBeforeHighlightingRowHeader Option `onBeforeHighlightingRowHeader`.
 * @property {Option} onBeforeRemoveCellClassNames Option `onBeforeRemoveCellClassNames`.
 * @property {Option} onBeforeStretchingColumnWidth Option `onBeforeStretchingColumnWidth`.
 * @property {Option} preventOverflow Option `preventOverflow`.
 * @property {Option} preventWheel Option `preventWheel`.
 * @property {Option} renderAllRows Option `renderAllRows`.
 * @property {Option} rowHeaders Option `rowHeaders`.
 * @property {Option} rowHeight Option `,`.
 * @property {Option} shouldRenderBottomOverlay Option `shouldRenderBottomOverlay`.
 * @property {Option} shouldRenderInlineStartOverlay Option `shouldRenderInlineStartOverlay`.
 * @property {Option} shouldRenderTopOverlay Option `shouldRenderTopOverlay`.
 * @property {Option} stretchH Option `stretchH`.
 * @property {Option} table Option `table`.
 * @property {Option} totalColumns Option `totalColumns`.
 * @property {Option} totalRows Option `totalRows`.
 * @property {?Option} beforeDraw Option `beforeDraw`.
 * @property {?Option} columnHeaderHeight Option `columnHeaderHeight`.
 * @property {?Option} currentColumnClassName Option `currentColumnClassName`.
 * @property {?Option} headerClassName Option `headerClassName`.
 * @property {?Option} onAfterDrawSelection Option `onAfterDrawSelection`.
 * @property {?Option} onAfterMomentumScroll Option `onAfterMomentumScroll`.
 * @property {?Option} onBeforeDrawBorders Option `onBeforeDrawBorders`.
 * @property {?Option} onBeforeTouchScroll Option `onBeforeTouchScroll`.
 * @property {?Option} onCellContextMenu Option `onCellContextMenu`.
 * @property {?Option} onCellCornerDblClick Option `onCellCornerDblClick`.
 * @property {?Option} onCellCornerMouseDown Option `onCellCornerMouseDown`.
 * @property {?Option} onCellDblClick Option `onCellDblClick`.
 * @property {?Option} onCellMouseDown Option `onCellMouseDown`.
 * @property {?Option} onCellMouseOut Option `onCellMouseOut`.
 * @property {?Option} onCellMouseOver Option `onCellMouseOver`.
 * @property {?Option} onCellMouseUp Option `onCellMouseUp`.
 * @property {?Option} onDraw Option `onDraw`.
 * @property {?Option} onModifyGetCellCoords Option `onModifyGetCellCoords`.
 * @property {?Option} onModifyRowHeaderWidth Option `onModifyRowHeaderWidth`.
 * @property {?Option} onScrollHorizontally Option `onScrollHorizontally`.
 * @property {?Option} onScrollVertically Option `onScrollVertically`.
 * @property {?Option} onWindowResize Option `onWindowResize`.
 * @property {?Option} rowHeaderWidth Option `rowHeaderWidth`.
 * @property {?Option} selections Option `selections`.
 * @property {?Option} viewportColumnCalculatorOverride Option `viewportColumnCalculatorOverride`.
 * @property {?Option} viewportRowCalculatorOverride Option `viewportRowCalculatorOverride`.
 */
/**
 * @template TValue.
 * @typedef { TValue | Array.<TValue> | (function(...*): TValue) } Option
 */
/**
 * @class Settings
 */
var Settings = /*#__PURE__*/function () {
  /**
   * Reference to settings.
   *
   * @protected
   * @type {SettingsPure}
   */

  /**
   * The defaults values of settings.
   * Void 0 means it is required, null means it can be empty.
   *
   * @public
   * @type {Readonly<SettingsPure>}
   */

  /**
   * @param {SettingsPure} settings The user defined settings.
   */
  function Settings(settings) {
    var _this = this;
    _classCallCheck(this, Settings);
    _defineProperty(this, "settings", {});
    _defineProperty(this, "defaults", Object.freeze(this.getDefaults()));
    objectEach(this.defaults, function (value, key) {
      if (settings[key] !== void 0) {
        _this.settings[key] = settings[key];
      } else if (value === void 0) {
        throw new Error("A required setting \"".concat(key, "\" was not provided"));
      } else {
        _this.settings[key] = value;
      }
    });
  }

  /**
   * Generate defaults for a settings.
   * Void 0 means it is required, null means it can be empty.
   *
   * @private
   * @returns {SettingsPure}
   */
  _createClass(Settings, [{
    key: "getDefaults",
    value: function getDefaults() {
      var _this2 = this;
      return {
        facade: void 0,
        table: void 0,
        // Determines whether the Walkontable instance is used as dataset viewer. When its instance is used as
        // a context menu, autocomplete list, etc, the returned value is `false`.
        isDataViewInstance: true,
        // presentation mode
        externalRowCalculator: false,
        stretchH: 'none',
        // values: all, last, none
        currentRowClassName: null,
        currentColumnClassName: null,
        preventOverflow: function preventOverflow() {
          return false;
        },
        preventWheel: false,
        // data source
        data: void 0,
        freezeOverlays: false,
        // Number of renderable columns for the left overlay.
        fixedColumnsStart: 0,
        // Number of renderable rows for the top overlay.
        fixedRowsTop: 0,
        // Number of renderable rows for the bottom overlay.
        fixedRowsBottom: 0,
        // Enable the inline start overlay when conditions are met (left for LTR and right for RTL document mode).
        shouldRenderInlineStartOverlay: function shouldRenderInlineStartOverlay() {
          return _this2.getSetting('fixedColumnsStart') > 0 || _this2.getSetting('rowHeaders').length > 0;
        },
        // Enable the top overlay when conditions are met.
        shouldRenderTopOverlay: function shouldRenderTopOverlay() {
          return _this2.getSetting('fixedRowsTop') > 0 || _this2.getSetting('columnHeaders').length > 0;
        },
        // Enable the bottom overlay when conditions are met.
        shouldRenderBottomOverlay: function shouldRenderBottomOverlay() {
          return _this2.getSetting('fixedRowsBottom') > 0;
        },
        minSpareRows: 0,
        // this must be array of functions: [function (row, TH) {}]
        rowHeaders: function rowHeaders() {
          return [];
        },
        // this must be array of functions: [function (column, TH) {}]
        columnHeaders: function columnHeaders() {
          return [];
        },
        totalRows: void 0,
        totalColumns: void 0,
        cellRenderer: function cellRenderer(row, column, TD) {
          var cellData = _this2.getSetting('data', row, column);
          fastInnerText(TD, cellData === void 0 || cellData === null ? '' : cellData);
        },
        // columnWidth: 50,
        columnWidth: function columnWidth() {
          // return undefined means use default size for the rendered cell content
        },
        rowHeight: function rowHeight() {
          // return undefined means use default size for the rendered cell content
        },
        defaultRowHeight: 23,
        defaultColumnWidth: 50,
        selections: null,
        hideBorderOnMouseDownOver: false,
        viewportRowCalculatorOverride: null,
        viewportColumnCalculatorOverride: null,
        // callbacks
        onCellMouseDown: null,
        onCellContextMenu: null,
        onCellMouseOver: null,
        onCellMouseOut: null,
        onCellMouseUp: null,
        //    onCellMouseOut: null,
        onCellDblClick: null,
        onCellCornerMouseDown: null,
        onCellCornerDblClick: null,
        beforeDraw: null,
        onDraw: null,
        onBeforeRemoveCellClassNames: null,
        onAfterDrawSelection: null,
        onBeforeDrawBorders: null,
        onScrollVertically: null,
        onScrollHorizontally: null,
        onBeforeTouchScroll: null,
        onAfterMomentumScroll: null,
        onBeforeStretchingColumnWidth: function onBeforeStretchingColumnWidth(width) {
          return width;
        },
        onModifyRowHeaderWidth: null,
        onModifyGetCellCoords: null,
        onBeforeHighlightingRowHeader: function onBeforeHighlightingRowHeader(sourceRow) {
          return sourceRow;
        },
        onBeforeHighlightingColumnHeader: function onBeforeHighlightingColumnHeader(sourceCol) {
          return sourceCol;
        },
        onWindowResize: null,
        renderAllRows: false,
        groups: false,
        rowHeaderWidth: null,
        columnHeaderHeight: null,
        headerClassName: null,
        rtlMode: false
      };
    }

    /**
     * Update settings.
     *
     * @param {object} settings The singular settings to update or if passed as object to merge with.
     * @param {*} value The value to set if the first argument is passed as string.
     * @returns {Settings}
     */
  }, {
    key: "update",
    value: function update(settings, value) {
      var _this3 = this;
      if (value === void 0) {
        // settings is object
        objectEach(settings, function (settingValue, key) {
          _this3.settings[key] = settingValue;
        });
      } else {
        // if value is defined then settings is the key
        this.settings[settings] = value;
      }
      return this;
    }

    /**
     * Get setting by name.
     *
     * @param {$Keys<SettingsPure>} key The settings key to retrieve.
     * @param {*} [param1] Additional parameter passed to the options defined as function.
     * @param {*} [param2] Additional parameter passed to the options defined as function.
     * @param {*} [param3] Additional parameter passed to the options defined as function.
     * @param {*} [param4] Additional parameter passed to the options defined as function.
     * @returns {*}
     */
  }, {
    key: "getSetting",
    value: function getSetting(key, param1, param2, param3, param4) {
      if (typeof this.settings[key] === 'function') {
        return this.settings[key](param1, param2, param3, param4);
      } else if (param1 !== void 0 && Array.isArray(this.settings[key])) {
        return this.settings[key][param1];
      }
      return this.settings[key];
    }

    /**
     * Get a setting value without any evaluation.
     *
     * @param {string} key The settings key to retrieve.
     * @returns {*}
     */
  }, {
    key: "getSettingPure",
    value: function getSettingPure(key) {
      return this.settings[key];
    }

    /**
     * Checks if setting exists.
     *
     * @param {boolean} key The settings key to check.
     * @returns {boolean}
     */
  }, {
    key: "has",
    value: function has(key) {
      return !!this.settings[key];
    }
  }]);
  return Settings;
}();
export { Settings as default };