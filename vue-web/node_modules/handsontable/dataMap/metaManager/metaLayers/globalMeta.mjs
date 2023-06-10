function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
import { extend } from "../../../helpers/object.mjs";
import { expandMetaType } from "../utils.mjs";
import metaSchemaFactory from "../metaSchema.mjs";
/**
 * @typedef {Options} TableMeta
 */
/**
 * @returns {TableMeta} Returns an empty object. The holder for global meta object.
 */
function createTableMetaEmptyClass() {
  return /*#__PURE__*/_createClass(function TableMeta() {
    _classCallCheck(this, TableMeta);
  });
}

/**
 * The global meta object is a root of all default settings, which are recognizable by Handsontable.
 * Other layers are inherited from this object. Adding, removing, or changing property in that
 * object has a direct reflection to all layers such as: TableMeta, ColumnMeta, or CellMeta layers.
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
var GlobalMeta = /*#__PURE__*/function () {
  function GlobalMeta(hot) {
    _classCallCheck(this, GlobalMeta);
    /**
     * An alias for the constructor. Necessary for inheritance for creating new layers.
     *
     * @type {TableMeta}
     */
    this.metaCtor = createTableMetaEmptyClass();
    /**
     * Main object (prototype of the internal TableMeta class), holder for all default settings.
     *
     * @type {object}
     */
    this.meta = this.metaCtor.prototype;
    extend(this.meta, metaSchemaFactory());
    this.meta.instance = hot;
  }

  /**
   * Gets constructor of the global meta object. Necessary for inheritance for creating the next meta layers.
   *
   * @returns {Function}
   */
  _createClass(GlobalMeta, [{
    key: "getMetaConstructor",
    value: function getMetaConstructor() {
      return this.metaCtor;
    }

    /**
     * Gets settings object for this layer.
     *
     * @returns {object}
     */
  }, {
    key: "getMeta",
    value: function getMeta() {
      return this.meta;
    }

    /**
     * Updates global settings object by merging settings with the current state.
     *
     * @param {object} settings An object to merge with.
     */
  }, {
    key: "updateMeta",
    value: function updateMeta(settings) {
      extend(this.meta, settings);
      extend(this.meta, expandMetaType(settings.type, settings));
    }
  }]);
  return GlobalMeta;
}();
export { GlobalMeta as default };