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
exports.default = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _array = require("../../../helpers/array");
var _mixed = require("../../../helpers/mixed");
var _base = _interopRequireDefault(require("./_base"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var CHAR_CARRIAGE_RETURN = String.fromCharCode(13);
var CHAR_DOUBLE_QUOTES = String.fromCharCode(34);
var CHAR_LINE_FEED = String.fromCharCode(10);

/**
 * @private
 */
var Csv = /*#__PURE__*/function (_BaseType) {
  _inherits(Csv, _BaseType);
  var _super = _createSuper(Csv);
  function Csv() {
    _classCallCheck(this, Csv);
    return _super.apply(this, arguments);
  }
  _createClass(Csv, [{
    key: "export",
    value:
    /**
     * Create string body in desired format.
     *
     * @returns {string}
     */
    function _export() {
      var _this = this;
      var options = this.options;
      var data = this.dataProvider.getData();
      var columnHeaders = this.dataProvider.getColumnHeaders();
      var hasColumnHeaders = columnHeaders.length > 0;
      var rowHeaders = this.dataProvider.getRowHeaders();
      var hasRowHeaders = rowHeaders.length > 0;
      var result = options.bom ? String.fromCharCode(0xFEFF) : '';
      if (hasColumnHeaders) {
        columnHeaders = (0, _array.arrayMap)(columnHeaders, function (value) {
          return _this._escapeCell(value, true);
        });
        if (hasRowHeaders) {
          result += options.columnDelimiter;
        }
        result += columnHeaders.join(options.columnDelimiter);
        result += options.rowDelimiter;
      }
      (0, _array.arrayEach)(data, function (value, index) {
        if (index > 0) {
          result += options.rowDelimiter;
        }
        if (hasRowHeaders) {
          result += _this._escapeCell(rowHeaders[index]) + options.columnDelimiter;
        }
        result += value.map(function (cellValue) {
          return _this._escapeCell(cellValue);
        }).join(options.columnDelimiter);
      });
      return result;
    }

    /**
     * Escape cell value.
     *
     * @param {*} value Cell value.
     * @param {boolean} [force=false] Indicates if cell value will be escaped forcefully.
     * @returns {string}
     */
  }, {
    key: "_escapeCell",
    value: function _escapeCell(value) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var escapedValue = (0, _mixed.stringify)(value);
      if (escapedValue !== '' && (force || escapedValue.indexOf(CHAR_CARRIAGE_RETURN) >= 0 || escapedValue.indexOf(CHAR_DOUBLE_QUOTES) >= 0 || escapedValue.indexOf(CHAR_LINE_FEED) >= 0 || escapedValue.indexOf(this.options.columnDelimiter) >= 0)) {
        escapedValue = escapedValue.replace(new RegExp('"', 'g'), '""');
        escapedValue = "\"".concat(escapedValue, "\"");
      }
      return escapedValue;
    }
  }], [{
    key: "DEFAULT_OPTIONS",
    get:
    /**
     * Default options for exporting CSV format.
     *
     * @returns {object}
     */
    function get() {
      return {
        mimeType: 'text/csv',
        fileExtension: 'csv',
        bom: true,
        columnDelimiter: ',',
        rowDelimiter: '\r\n'
      };
    }
  }]);
  return Csv;
}(_base.default);
var _default = Csv;
exports.default = _default;