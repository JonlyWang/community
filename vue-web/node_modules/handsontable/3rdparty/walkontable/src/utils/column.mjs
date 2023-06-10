import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { getScrollbarWidth } from "./../../../../helpers/dom/element.mjs"; /**
                                                                            * Column utils class contains all necessary information about sizes of the columns.
                                                                            *
                                                                            * @class {ColumnUtils}
                                                                            */
var ColumnUtils = /*#__PURE__*/function () {
  /**
   * @param {TableDao} dataAccessObject The table Data Access Object.
   * @param {Settings} wtSettings The walkontable settings.
   */
  function ColumnUtils(dataAccessObject, wtSettings) {
    _classCallCheck(this, ColumnUtils);
    this.dataAccessObject = dataAccessObject;
    this.wtSettings = wtSettings;
    this.headerWidths = new Map();
  }

  /**
   * Returns column width based on passed source index.
   *
   * @param {number} sourceIndex Column source index.
   * @returns {number}
   */
  _createClass(ColumnUtils, [{
    key: "getWidth",
    value: function getWidth(sourceIndex) {
      return this.wtSettings.getSetting('columnWidth', sourceIndex) || this.wtSettings.getSetting('defaultColumnWidth');
    }

    /**
     * Returns stretched column width based on passed source index.
     *
     * @param {number} sourceIndex Column source index.
     * @returns {number}
     */
  }, {
    key: "getStretchedColumnWidth",
    value: function getStretchedColumnWidth(sourceIndex) {
      var calculator = this.dataAccessObject.wtViewport.columnsRenderCalculator;
      var width = this.getWidth(sourceIndex);
      if (calculator) {
        var stretchedWidth = calculator.getStretchedColumnWidth(sourceIndex, width);
        if (stretchedWidth) {
          width = stretchedWidth;
        }
      }
      return width;
    }

    /**
     * Returns column header height based on passed header level.
     *
     * @param {number} level Column header level.
     * @returns {number}
     */
  }, {
    key: "getHeaderHeight",
    value: function getHeaderHeight(level) {
      var height = this.wtSettings.getSetting('defaultRowHeight');
      var oversizedHeight = this.dataAccessObject.wtViewport.oversizedColumnHeaders[level];
      if (oversizedHeight !== void 0) {
        height = height ? Math.max(height, oversizedHeight) : oversizedHeight;
      }
      return height;
    }

    /**
     * Returns column header width based on passed source index.
     *
     * @param {number} sourceIndex Column source index.
     * @returns {number}
     */
  }, {
    key: "getHeaderWidth",
    value: function getHeaderWidth(sourceIndex) {
      return this.headerWidths.get(this.dataAccessObject.wtTable.columnFilter.sourceToRendered(sourceIndex));
    }

    /**
     * Calculates column header widths that can be retrieved from the cache.
     */
  }, {
    key: "calculateWidths",
    value: function calculateWidths() {
      var wtSettings = this.wtSettings;
      var _this$dataAccessObjec = this.dataAccessObject,
        wtTable = _this$dataAccessObjec.wtTable,
        wtViewport = _this$dataAccessObjec.wtViewport,
        cloneSource = _this$dataAccessObjec.cloneSource;
      var mainHolder = cloneSource ? cloneSource.wtTable.holder : wtTable.holder;
      var scrollbarCompensation = mainHolder.offsetHeight < mainHolder.scrollHeight ? getScrollbarWidth() : 0;
      var rowHeaderWidthSetting = wtSettings.getSetting('rowHeaderWidth');
      wtViewport.columnsRenderCalculator.refreshStretching(wtViewport.getViewportWidth() - scrollbarCompensation);
      rowHeaderWidthSetting = wtSettings.getSetting('onModifyRowHeaderWidth', rowHeaderWidthSetting);
      if (rowHeaderWidthSetting !== null && rowHeaderWidthSetting !== void 0) {
        var rowHeadersCount = wtSettings.getSetting('rowHeaders').length;
        var defaultColumnWidth = wtSettings.getSetting('defaultColumnWidth');
        for (var visibleColumnIndex = 0; visibleColumnIndex < rowHeadersCount; visibleColumnIndex++) {
          var width = Array.isArray(rowHeaderWidthSetting) ? rowHeaderWidthSetting[visibleColumnIndex] : rowHeaderWidthSetting;
          width = width === null || width === void 0 ? defaultColumnWidth : width;
          this.headerWidths.set(visibleColumnIndex, width);
        }
      }
    }
  }]);
  return ColumnUtils;
}();
export { ColumnUtils as default };