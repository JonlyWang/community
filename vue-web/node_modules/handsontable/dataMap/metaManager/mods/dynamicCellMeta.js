"use strict";

exports.__esModule = true;
exports.DynamicCellMetaMod = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.set.js");
var _pluginHooks = _interopRequireDefault(require("../../../pluginHooks"));
var _object = require("../../../helpers/object");
var _function = require("../../../helpers/function");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * @class DynamicCellMetaMod
 *
 * The `DynamicCellMetaMod` modifier allows for extending cell meta objects
 * (returned by `getCellMeta()` from `MetaManager`)
 * by user-specific properties.
 *
 * The user-specific properties can be added and changed dynamically,
 * either by Handsontable's hooks (`beforeGetCellMeta` and`afterGetCellMeta`),
 * or by Handsontable's `cells` option.
 *
 * The `getCellMeta()` method is used widely throughout the source code.
 * To boost the method's execution time,
 * the logic is triggered only once per one Handsontable slow render cycle.
 */var DynamicCellMetaMod = /*#__PURE__*/function () {
  function DynamicCellMetaMod(metaManager) {
    var _this = this;
    _classCallCheck(this, DynamicCellMetaMod);
    /**
     * @type {MetaManager}
     */
    this.metaManager = metaManager;
    /**
     * @type {Map}
     */
    this.metaSyncMemo = new Map();
    metaManager.addLocalHook('afterGetCellMeta', function (cellMeta) {
      return _this.extendCellMeta(cellMeta);
    });
    _pluginHooks.default.getSingleton().add('beforeRender', function (forceFullRender) {
      if (forceFullRender) {
        _this.metaSyncMemo.clear();
      }
    }, this.metaManager.hot);
  }

  /**
   * Extends the cell meta object by user-specific properties.
   *
   * The cell meta object can be extended dynamically,
   * either by Handsontable's hooks (`beforeGetCellMeta` and`afterGetCellMeta`),
   * or by Handsontable's `cells` option.
   *
   * To boost performance, the extending process is triggered only once per one slow Handsontable render cycle.
   *
   * @param {object} cellMeta The cell meta object.
   */
  _createClass(DynamicCellMetaMod, [{
    key: "extendCellMeta",
    value: function extendCellMeta(cellMeta) {
      var _this$metaSyncMemo$ge;
      var physicalRow = cellMeta.row,
        physicalColumn = cellMeta.col;
      if ((_this$metaSyncMemo$ge = this.metaSyncMemo.get(physicalRow)) !== null && _this$metaSyncMemo$ge !== void 0 && _this$metaSyncMemo$ge.has(physicalColumn)) {
        return;
      }
      var visualRow = cellMeta.visualRow,
        visualCol = cellMeta.visualCol;
      var hot = this.metaManager.hot;
      var prop = hot.colToProp(visualCol);
      cellMeta.prop = prop;
      hot.runHooks('beforeGetCellMeta', visualRow, visualCol, cellMeta);

      // extend a `type` value, added or changed in the `beforeGetCellMeta` hook
      var cellType = (0, _object.hasOwnProperty)(cellMeta, 'type') ? cellMeta.type : null;
      var cellSettings = (0, _function.isFunction)(cellMeta.cells) ? cellMeta.cells(physicalRow, physicalColumn, prop) : null;
      if (cellType) {
        if (cellSettings) {
          var _cellSettings$type;
          cellSettings.type = (_cellSettings$type = cellSettings.type) !== null && _cellSettings$type !== void 0 ? _cellSettings$type : cellType;
        } else {
          cellSettings = {
            type: cellType
          };
        }
      }
      if (cellSettings) {
        this.metaManager.updateCellMeta(physicalRow, physicalColumn, cellSettings);
      }
      hot.runHooks('afterGetCellMeta', visualRow, visualCol, cellMeta);
      if (!this.metaSyncMemo.has(physicalRow)) {
        this.metaSyncMemo.set(physicalRow, new Set());
      }
      this.metaSyncMemo.get(physicalRow).add(physicalColumn);
    }
  }]);
  return DynamicCellMetaMod;
}();
exports.DynamicCellMetaMod = DynamicCellMetaMod;