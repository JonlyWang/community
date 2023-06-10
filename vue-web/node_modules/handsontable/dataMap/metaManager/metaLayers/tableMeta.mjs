function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { extend } from "../../../helpers/object.mjs";
import { expandMetaType } from "../utils.mjs"; /**
                                                * The table meta object is a layer that keeps all settings of the Handsontable that was passed in
                                                * the constructor. That layer contains all default settings inherited from the GlobalMeta layer
                                                * merged with settings passed by the developer. Adding, removing, or changing property in that
                                                * object has no direct reflection on any other layers.
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
var TableMeta = /*#__PURE__*/function () {
  function TableMeta(globalMeta) {
    _classCallCheck(this, TableMeta);
    var MetaCtor = globalMeta.getMetaConstructor();

    /**
     * Main object (instance of the internal TableMeta class from GlobalMeta), holder for all settings defined in the table scope.
     *
     * @type {TableMeta}
     */
    this.meta = new MetaCtor();
  }

  /**
   * Gets settings object for this layer.
   *
   * @returns {TableMeta}
   */
  _createClass(TableMeta, [{
    key: "getMeta",
    value: function getMeta() {
      return this.meta;
    }

    /**
     * Updates table settings object by merging settings with the current state.
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
  return TableMeta;
}();
export { TableMeta as default };