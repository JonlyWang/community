"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.AggregatedCollection = void 0;
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _mapCollection = require("./mapCollection");
var _array = require("../../helpers/array");
var _mixed = require("../../helpers/mixed");
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
/**
 * Collection of maps. This collection aggregate maps with the same type of values. Values from the registered maps
 * can be used to calculate a single result for particular index.
 */var AggregatedCollection = /*#__PURE__*/function (_MapCollection) {
  _inherits(AggregatedCollection, _MapCollection);
  var _super = _createSuper(AggregatedCollection);
  function AggregatedCollection(aggregationFunction, fallbackValue) {
    var _this;
    _classCallCheck(this, AggregatedCollection);
    _this = _super.call(this);
    /**
     * List of merged values. Value for each index is calculated using values inside registered maps.
     *
     * @type {Array}
     */
    _this.mergedValuesCache = [];
    /**
     * Function which do aggregation on the values for particular index.
     */
    _this.aggregationFunction = aggregationFunction;
    /**
     * Fallback value when there is no calculated value for particular index.
     */
    _this.fallbackValue = fallbackValue;
    return _this;
  }

  /**
   * Get merged values for all indexes.
   *
   * @param {boolean} [readFromCache=true] Determine if read results from the cache.
   * @returns {Array}
   */
  _createClass(AggregatedCollection, [{
    key: "getMergedValues",
    value: function getMergedValues() {
      var readFromCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (readFromCache === true) {
        return this.mergedValuesCache;
      }
      if (this.getLength() === 0) {
        return [];
      }

      // Below variable stores values for every particular map. Example describing situation when we have 2 registered maps,
      // with length equal to 5.
      //
      // +---------+---------------------------------------------+
      // |         |                  indexes                    |
      // +---------+---------------------------------------------+
      // |   maps  |     0    |   1   |    2  |   3   |    4     |
      // +---------+----------+-------+-------+-------+----------+
      // |    0    | [[ value,  value,  value,  value,  value ], |
      // |    1    | [  value,  value,  value,  value,  value ]] |
      // +---------+----------+-------+-------+-------+----------+
      var mapsValuesMatrix = (0, _array.arrayMap)(this.get(), function (map) {
        return map.getValues();
      });
      // Below variable stores values for every particular index. Example describing situation when we have 2 registered maps,
      // with length equal to 5.
      //
      // +---------+---------------------+
      // |         |         maps        |
      // +---------+---------------------+
      // | indexes |     0    |    1     |
      // +---------+----------+----------+
      // |    0    | [[ value,  value ], |
      // |    1    | [  value,  value ], |
      // |    2    | [  value,  value ], |
      // |    3    | [  value,  value ], |
      // |    4    | [  value,  value ]] |
      // +---------+----------+----------+
      var indexesValuesMatrix = [];
      var mapsLength = (0, _mixed.isDefined)(mapsValuesMatrix[0]) && mapsValuesMatrix[0].length || 0;
      for (var index = 0; index < mapsLength; index += 1) {
        var valuesForIndex = [];
        for (var mapIndex = 0; mapIndex < this.getLength(); mapIndex += 1) {
          valuesForIndex.push(mapsValuesMatrix[mapIndex][index]);
        }
        indexesValuesMatrix.push(valuesForIndex);
      }
      return (0, _array.arrayMap)(indexesValuesMatrix, this.aggregationFunction);
    }

    /**
     * Get merged value for particular index.
     *
     * @param {number} index Index for which we calculate single result.
     * @param {boolean} [readFromCache=true] Determine if read results from the cache.
     * @returns {*}
     */
  }, {
    key: "getMergedValueAtIndex",
    value: function getMergedValueAtIndex(index, readFromCache) {
      var valueAtIndex = this.getMergedValues(readFromCache)[index];
      return (0, _mixed.isDefined)(valueAtIndex) ? valueAtIndex : this.fallbackValue;
    }

    /**
     * Rebuild cache for the collection.
     */
  }, {
    key: "updateCache",
    value: function updateCache() {
      this.mergedValuesCache = this.getMergedValues(false);
    }
  }]);
  return AggregatedCollection;
}(_mapCollection.MapCollection);
exports.AggregatedCollection = AggregatedCollection;