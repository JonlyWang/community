"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.map.js");
var _object = require("../../../helpers/object");
var _utils = require("../utils");
var _lazyFactoryMap = _interopRequireDefault(require("../lazyFactoryMap"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @class CellMeta
 *
 * The cell meta object is a root of all settings defined for the specific cell rendered by the
 * Handsontable. Each cell meta inherits settings from higher layers. When a property doesn't
 * exist in that layer, it is looked up through a prototype to the highest layer. Starting
 * from CellMeta -> ColumnMeta and ending to GlobalMeta, which stores default settings. Adding,
 * removing, or changing property in that object has no direct reflection on any other layers.
 *
 * +-------------+
 * │ GlobalMeta  │
 * │ (prototype) │
 * +-------------+\
 *       │         \
 *       │          \
 *      \│/         _\|
 * +-------------+    +-------------+
 * │ TableMeta   │    │ ColumnMeta  │
 * │ (instance)  │    │ (prototype) │
 * +-------------+    +-------------+
 *                         │
 *                         │
 *                        \│/
 *                    +-------------+
 *                    │  CellMeta   │
 *                    │ (instance)  │
 *                    +-------------+
 */
/* eslint-enable jsdoc/require-description-complete-sentence */
var CellMeta = /*#__PURE__*/function () {
  function CellMeta(columnMeta) {
    var _this = this;
    _classCallCheck(this, CellMeta);
    /**
     * Reference to the ColumnMeta layer. While creating new cell meta objects, all new objects
     * inherit properties from the ColumnMeta layer.
     *
     * @type {ColumnMeta}
     */
    this.columnMeta = columnMeta;
    /**
     * Holder for cell meta objects, organized as a grid of LazyFactoryMap of LazyFactoryMaps.
     * The access to the cell meta object is done through access to the row defined by the physical
     * row index and then by accessing the second LazyFactory Map under the physical column index.
     *
     * @type {LazyFactoryMap<number, LazyFactoryMap<number, object>>}
     */
    this.metas = new _lazyFactoryMap.default(function () {
      return _this._createRow();
    });
  }

  /**
   * Updates cell meta object by merging settings with the current state.
   *
   * @param {number} physicalRow The physical row index which points what cell meta object is updated.
   * @param {number} physicalColumn The physical column index which points what cell meta object is updated.
   * @param {object} settings An object to merge with.
   */
  _createClass(CellMeta, [{
    key: "updateMeta",
    value: function updateMeta(physicalRow, physicalColumn, settings) {
      var meta = this.getMeta(physicalRow, physicalColumn);
      (0, _object.extend)(meta, settings);
      (0, _object.extend)(meta, (0, _utils.expandMetaType)(settings.type, meta));
    }

    /**
     * Creates one or more rows at specific position.
     *
     * @param {number} physicalRow The physical row index which points from what position the row is added.
     * @param {number} amount An amount of rows to add.
     */
  }, {
    key: "createRow",
    value: function createRow(physicalRow, amount) {
      this.metas.insert(physicalRow, amount);
    }

    /**
     * Creates one or more columns at specific position.
     *
     * @param {number} physicalColumn The physical column index which points from what position the column is added.
     * @param {number} amount An amount of columns to add.
     */
  }, {
    key: "createColumn",
    value: function createColumn(physicalColumn, amount) {
      for (var i = 0; i < this.metas.size(); i++) {
        this.metas.obtain(i).insert(physicalColumn, amount);
      }
    }

    /**
     * Removes one or more rows from the collection.
     *
     * @param {number} physicalRow The physical row index which points from what position the row is removed.
     * @param {number} amount An amount of rows to remove.
     */
  }, {
    key: "removeRow",
    value: function removeRow(physicalRow, amount) {
      this.metas.remove(physicalRow, amount);
    }

    /**
     * Removes one or more columns from the collection.
     *
     * @param {number} physicalColumn The physical column index which points from what position the column is removed.
     * @param {number} amount An amount of columns to remove.
     */
  }, {
    key: "removeColumn",
    value: function removeColumn(physicalColumn, amount) {
      for (var i = 0; i < this.metas.size(); i++) {
        this.metas.obtain(i).remove(physicalColumn, amount);
      }
    }

    /**
     * Gets settings object for this layer.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {string} [key] If the key exists its value will be returned, otherwise the whole cell meta object.
     * @returns {object}
     */
  }, {
    key: "getMeta",
    value: function getMeta(physicalRow, physicalColumn, key) {
      var cellMeta = this.metas.obtain(physicalRow).obtain(physicalColumn);
      if (key === void 0) {
        return cellMeta;
      }
      return cellMeta[key];
    }

    /**
     * Sets settings object for this layer defined by "key" property.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {string} key The property name to set.
     * @param {*} value Value to save.
     */
  }, {
    key: "setMeta",
    value: function setMeta(physicalRow, physicalColumn, key, value) {
      var cellMeta = this.metas.obtain(physicalRow).obtain(physicalColumn);
      cellMeta[key] = value;
      if (cellMeta._automaticallyAssignedMetaProps[key] === true) {
        cellMeta._automaticallyAssignedMetaProps[key] = void 0;
      }
    }

    /**
     * Removes a property defined by the "key" argument from the cell meta object.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {string} key The property name to remove.
     */
  }, {
    key: "removeMeta",
    value: function removeMeta(physicalRow, physicalColumn, key) {
      var cellMeta = this.metas.obtain(physicalRow).obtain(physicalColumn);
      delete cellMeta[key];
    }

    /**
     * Returns all cell meta objects that were created during the Handsontable operation. As cell meta
     * objects are created lazy, the length of the returned collection depends on how and when the
     * table has asked for access to that meta objects.
     *
     * @returns {object[]}
     */
  }, {
    key: "getMetas",
    value: function getMetas() {
      var metas = [];
      var rows = Array.from(this.metas.values());
      for (var row = 0; row < rows.length; row++) {
        metas.push.apply(metas, _toConsumableArray(rows[row].values()));
      }
      return metas;
    }

    /**
     * Returns all cell meta objects that were created during the Handsontable operation but for
     * specyfic row index.
     *
     * @param {number} physicalRow The physical row index.
     * @returns {object[]}
     */
  }, {
    key: "getMetasAtRow",
    value: function getMetasAtRow(physicalRow) {
      (0, _utils.assert)(function () {
        return (0, _utils.isUnsignedNumber)(physicalRow);
      }, 'Expecting an unsigned number.');
      var rowsMeta = new Map(this.metas);
      return rowsMeta.has(physicalRow) ? Array.from(rowsMeta.get(physicalRow).values()) : [];
    }

    /**
     * Clears all saved cell meta objects.
     */
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.metas.clear();
    }

    /**
     * Creates and returns new structure for cell meta objects stored in columnar axis.
     *
     * @private
     * @returns {object}
     */
  }, {
    key: "_createRow",
    value: function _createRow() {
      var _this2 = this;
      return new _lazyFactoryMap.default(function (physicalColumn) {
        return _this2._createMeta(physicalColumn);
      });
    }

    /**
     * Creates and returns new cell meta object with properties inherited from the column meta layer.
     *
     * @private
     * @param {number} physicalColumn The physical column index.
     * @returns {object}
     */
  }, {
    key: "_createMeta",
    value: function _createMeta(physicalColumn) {
      var ColumnMeta = this.columnMeta.getMetaConstructor(physicalColumn);
      return new ColumnMeta();
    }
  }]);
  return CellMeta;
}();
exports.default = CellMeta;