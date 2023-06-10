function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { extend } from "../../../helpers/object.mjs";
import { columnFactory, expandMetaType } from "../utils.mjs";
import LazyFactoryMap from "../lazyFactoryMap.mjs"; /**
                                                     * List of props which have to be cleared in the column meta-layer. That props have a
                                                     * different meaning when using in column meta.
                                                     *
                                                     * @type {string[]}
                                                     */
var COLUMNS_PROPS_CONFLICTS = ['data', 'width'];

/**
 * The column meta object is a root of all settings defined in the column property of the Handsontable
 * settings. Each column in the Handsontable is associated with a unique meta object which is managed by
 * this layer. Adding, removing, or changing property in that object has a direct reflection only for
 * the CellMeta layer. The reflection will be visible only if the property doesn't exist in the lower
 * layers (prototype lookup).
 *
 * +-------------+.
 * │ GlobalMeta  │
 * │ (prototype) │
 * +-------------+\
 *       │         \
 *       │          \
 *      \│/         _\|
 * +-------------+    +-------------+.
 * │ TableMeta   │    │ ColumnMeta  │
 * │ (instance)  │    │ (prototype) │
 * +-------------+    +-------------+.
 *                         │
 *                         │
 *                        \│/
 *                    +-------------+.
 *                    │  CellMeta   │
 *                    │ (instance)  │
 *                    +-------------+.
 */
var ColumnMeta = /*#__PURE__*/function () {
  function ColumnMeta(globalMeta) {
    var _this = this;
    _classCallCheck(this, ColumnMeta);
    /**
     * Reference to the GlobalMeta layer. While creating new column meta objects, all new objects
     * inherit properties from the GlobalMeta layer.
     *
     * @type {GlobalMeta}
     */
    this.globalMeta = globalMeta;
    /**
     * The LazyFactoryMap structure, holder for column meta objects where each column meta is
     * stored under the physical column index.
     *
     * @type {LazyFactoryMap}
     */
    this.metas = new LazyFactoryMap(function () {
      return _this._createMeta();
    });
  }

  /**
   * Updates column meta object by merging settings with the current state.
   *
   * @param {number} physicalColumn The physical column index which points what column meta object is updated.
   * @param {object} settings An object to merge with.
   */
  _createClass(ColumnMeta, [{
    key: "updateMeta",
    value: function updateMeta(physicalColumn, settings) {
      var meta = this.getMeta(physicalColumn);
      extend(meta, settings);
      extend(meta, expandMetaType(settings.type, meta));
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
      this.metas.insert(physicalColumn, amount);
    }

    /**
     * Removes one or more columns from the collection.
     *
     * @param {number} physicalColumn The physical column index which points from what position the column is removed.
     * @param {number} amount An amount columns to remove.
     */
  }, {
    key: "removeColumn",
    value: function removeColumn(physicalColumn, amount) {
      this.metas.remove(physicalColumn, amount);
    }

    /**
     * Gets settings object for this layer.
     *
     * @param {number} physicalColumn The physical column index.
     * @returns {object}
     */
  }, {
    key: "getMeta",
    value: function getMeta(physicalColumn) {
      return this.metas.obtain(physicalColumn);
    }

    /**
     * Gets constructor of the column meta object. Necessary for inheritance - creating the next meta layers.
     *
     * @param {number} physicalColumn The physical column index.
     * @returns {Function}
     */
  }, {
    key: "getMetaConstructor",
    value: function getMetaConstructor(physicalColumn) {
      return this.metas.obtain(physicalColumn).constructor;
    }

    /**
     * Clears all saved column meta objects.
     */
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.metas.clear();
    }

    /**
     * Creates and returns new column meta object with properties inherited from the global meta layer.
     *
     * @private
     * @returns {object}
     */
  }, {
    key: "_createMeta",
    value: function _createMeta() {
      return columnFactory(this.globalMeta.getMetaConstructor(), COLUMNS_PROPS_CONFLICTS).prototype;
    }
  }]);
  return ColumnMeta;
}();
export { ColumnMeta as default };