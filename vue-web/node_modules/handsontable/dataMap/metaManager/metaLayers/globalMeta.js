"use strict";

exports.__esModule = true;
exports.default = void 0;
var _object = require("../../../helpers/object");
var _utils = require("../utils");
var _metaSchema = _interopRequireDefault(require("../metaSchema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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
    (0, _object.extend)(this.meta, (0, _metaSchema.default)());
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
      (0, _object.extend)(this.meta, settings);
      (0, _object.extend)(this.meta, (0, _utils.expandMetaType)(settings.type, settings));
    }
  }]);
  return GlobalMeta;
}();
exports.default = GlobalMeta;