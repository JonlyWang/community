"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.LinkedPhysicalIndexToValueMap = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.splice.js");
var _indexMap = require("./indexMap");
var _physicallyIndexed = require("./utils/physicallyIndexed");
var _indexesSequence = require("./utils/indexesSequence");
var _actionsOnIndexes = require("./utils/actionsOnIndexes");
var _function = require("../../helpers/function");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
/**
 * Map for storing mappings from an physical index to a value. Those entries are linked and stored in a certain order.
 *
 * It does not update stored values on remove/add row or column action. Otherwise, order of entries is updated after
 * such changes.
 *
 * @class LinkedPhysicalIndexToValueMap
 */var LinkedPhysicalIndexToValueMap = /*#__PURE__*/function (_IndexMap) {
  _inherits(LinkedPhysicalIndexToValueMap, _IndexMap);
  var _super = _createSuper(LinkedPhysicalIndexToValueMap);
  function LinkedPhysicalIndexToValueMap() {
    var _this;
    _classCallCheck(this, LinkedPhysicalIndexToValueMap);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "orderOfIndexes", []);
    return _this;
  }
  _createClass(LinkedPhysicalIndexToValueMap, [{
    key: "getValues",
    value:
    /**
     * Get full list of ordered values for particular indexes.
     *
     * @returns {Array}
     */
    function getValues() {
      var _this2 = this;
      return this.orderOfIndexes.map(function (physicalIndex) {
        return _this2.indexedValues[physicalIndex];
      });
    }

    /**
     * Set new values for particular indexes. Entries are linked and stored in a certain order.
     *
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @param {Array} values List of set values.
     */
  }, {
    key: "setValues",
    value: function setValues(values) {
      this.orderOfIndexes = _toConsumableArray(Array(values.length).keys());
      _get(_getPrototypeOf(LinkedPhysicalIndexToValueMap.prototype), "setValues", this).call(this, values);
    }

    /**
     * Set value at index and add it to the linked list of entries. Entries are stored in a certain order.
     *
     * Note: Value will be added at the end of the queue.
     *
     * @param {number} index The index.
     * @param {*} value The value to save.
     * @param {number} position Position to which entry will be added.
     *
     * @returns {boolean}
     */
  }, {
    key: "setValueAtIndex",
    value: function setValueAtIndex(index, value) {
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.orderOfIndexes.length;
      if (index < this.indexedValues.length) {
        this.indexedValues[index] = value;
        if (this.orderOfIndexes.includes(index) === false) {
          this.orderOfIndexes.splice(position, 0, index);
        }
        this.runLocalHooks('change');
        return true;
      }
      return false;
    }

    /**
     * Clear value for particular index.
     *
     * @param {number} physicalIndex Physical index.
     */
  }, {
    key: "clearValue",
    value: function clearValue(physicalIndex) {
      this.orderOfIndexes = (0, _indexesSequence.getListWithRemovedItems)(this.orderOfIndexes, [physicalIndex]);
      if ((0, _function.isFunction)(this.initValueOrFn)) {
        _get(_getPrototypeOf(LinkedPhysicalIndexToValueMap.prototype), "setValueAtIndex", this).call(this, physicalIndex, this.initValueOrFn(physicalIndex));
      } else {
        _get(_getPrototypeOf(LinkedPhysicalIndexToValueMap.prototype), "setValueAtIndex", this).call(this, physicalIndex, this.initValueOrFn);
      }
    }

    /**
     * Get length of the index map.
     *
     * @returns {number}
     */
  }, {
    key: "getLength",
    value: function getLength() {
      return this.orderOfIndexes.length;
    }

    /**
     * Set default values for elements from `0` to `n`, where `n` is equal to the handled variable.
     *
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @private
     * @param {number} [length] Length of list.
     */
  }, {
    key: "setDefaultValues",
    value: function setDefaultValues() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.indexedValues.length;
      this.orderOfIndexes.length = 0;
      _get(_getPrototypeOf(LinkedPhysicalIndexToValueMap.prototype), "setDefaultValues", this).call(this, length);
    }

    /**
     * Add values to list and reorganize. It updates list of indexes related to ordered values.
     *
     * @private
     * @param {number} insertionIndex Position inside the list.
     * @param {Array} insertedIndexes List of inserted indexes.
     */
  }, {
    key: "insert",
    value: function insert(insertionIndex, insertedIndexes) {
      this.indexedValues = (0, _physicallyIndexed.getListWithInsertedItems)(this.indexedValues, insertionIndex, insertedIndexes, this.initValueOrFn);
      this.orderOfIndexes = (0, _actionsOnIndexes.getIncreasedIndexes)(this.orderOfIndexes, insertedIndexes);
      _get(_getPrototypeOf(LinkedPhysicalIndexToValueMap.prototype), "insert", this).call(this, insertionIndex, insertedIndexes);
    }

    /**
     * Remove values from the list and reorganize. It updates list of indexes related to ordered values.
     *
     * @private
     * @param {Array} removedIndexes List of removed indexes.
     */
  }, {
    key: "remove",
    value: function remove(removedIndexes) {
      this.indexedValues = (0, _physicallyIndexed.getListWithRemovedItems)(this.indexedValues, removedIndexes);
      this.orderOfIndexes = (0, _indexesSequence.getListWithRemovedItems)(this.orderOfIndexes, removedIndexes);
      this.orderOfIndexes = (0, _actionsOnIndexes.getDecreasedIndexes)(this.orderOfIndexes, removedIndexes);
      _get(_getPrototypeOf(LinkedPhysicalIndexToValueMap.prototype), "remove", this).call(this, removedIndexes);
    }

    /**
     * Get every entry containing index and value, respecting order of indexes.
     *
     * @returns {Array}
     */
  }, {
    key: "getEntries",
    value: function getEntries() {
      var _this3 = this;
      return this.orderOfIndexes.map(function (physicalIndex) {
        return [physicalIndex, _this3.getValueAtIndex(physicalIndex)];
      });
    }
  }]);
  return LinkedPhysicalIndexToValueMap;
}(_indexMap.IndexMap);
exports.LinkedPhysicalIndexToValueMap = LinkedPhysicalIndexToValueMap;