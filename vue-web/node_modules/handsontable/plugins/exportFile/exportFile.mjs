function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/web.timers.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
import { BasePlugin } from "../base/index.mjs";
import DataProvider from "./dataProvider.mjs";
import typeFactory, { EXPORT_TYPES } from "./typeFactory.mjs";
export var PLUGIN_KEY = 'exportFile';
export var PLUGIN_PRIORITY = 240;

/**
 * @plugin ExportFile
 * @class ExportFile
 *
 * @description
 * The `ExportFile` plugin lets you export table data as a string, blob, or downloadable CSV file.
 *
 * See [the export file demo](@/guides/accessories-and-menus/export-to-csv.md) for examples.
 *
 * @example
 * ::: only-for javascript
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData()
 * });
 *
 * // access to exportFile plugin instance
 * const exportPlugin = hot.getPlugin('exportFile');
 *
 * // export as a string
 * exportPlugin.exportAsString('csv');
 *
 * // export as a blob object
 * exportPlugin.exportAsBlob('csv');
 *
 * // export to downloadable file (named: MyFile.csv)
 * exportPlugin.downloadFile('csv', {filename: 'MyFile'});
 *
 * // export as a string (with specified data range):
 * exportPlugin.exportAsString('csv', {
 *   exportHiddenRows: true,     // default false
 *   exportHiddenColumns: true,  // default false
 *   columnHeaders: true,        // default false
 *   rowHeaders: true,           // default false
 *   columnDelimiter: ';',       // default ','
 *   range: [1, 1, 6, 6]         // [startRow, endRow, startColumn, endColumn]
 * });
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * const hotRef = useRef(null);
 *
 * ...
 *
 * <HotTable
 *   ref={hotRef}
 *   data={getData()}
 * />
 *
 * const hot = hotRef.current.hotInstance;
 * // access to exportFile plugin instance
 * const exportPlugin = hot.getPlugin('exportFile');
 *
 * // export as a string
 * exportPlugin.exportAsString('csv');
 *
 * // export as a blob object
 * exportPlugin.exportAsBlob('csv');
 *
 * // export to downloadable file (named: MyFile.csv)
 * exportPlugin.downloadFile('csv', {filename: 'MyFile'});
 *
 * // export as a string (with specified data range):
 * exportPlugin.exportAsString('csv', {
 *   exportHiddenRows: true,     // default false
 *   exportHiddenColumns: true,  // default false
 *   columnHeaders: true,        // default false
 *   rowHeaders: true,           // default false
 *   columnDelimiter: ';',       // default ','
 *   range: [1, 1, 6, 6]         // [startRow, endRow, startColumn, endColumn]
 * });
 * ```
 * :::
 */
export var ExportFile = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ExportFile, _BasePlugin);
  var _super = _createSuper(ExportFile);
  function ExportFile() {
    _classCallCheck(this, ExportFile);
    return _super.apply(this, arguments);
  }
  _createClass(ExportFile, [{
    key: "isEnabled",
    value:
    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` then the {@link ExportFile#enablePlugin} method is called.
     *
     * @returns {boolean}
     */
    function isEnabled() {
      return true;
    }

    /**
     * @typedef ExportOptions
     * @memberof ExportFile
     * @type {object}
     * @property {boolean} [exportHiddenRows=false] Include hidden rows in the exported file.
     * @property {boolean} [exportHiddenColumns=false] Include hidden columns in the exported file.
     * @property {boolean} [columnHeaders=false] Include column headers in the exported file.
     * @property {boolean} [rowHeaders=false] Include row headers in the exported file.
     * @property {string} [columnDelimiter=','] Column delimiter.
     * @property {string} [range=[]] Cell range that will be exported to file.
     */

    /**
     * Exports table data as a string.
     *
     * @param {string} format Export format type eq. `'csv'`.
     * @param {ExportOptions} options Export options.
     * @returns {string}
     */
  }, {
    key: "exportAsString",
    value: function exportAsString(format) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._createTypeFormatter(format, options).export();
    }

    /**
     * Exports table data as a blob object.
     *
     * @param {string} format Export format type eq. `'csv'`.
     * @param {ExportOptions} options Export options.
     * @returns {Blob}
     */
  }, {
    key: "exportAsBlob",
    value: function exportAsBlob(format) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._createBlob(this._createTypeFormatter(format, options));
    }

    /**
     * Exports table data as a downloadable file.
     *
     * @param {string} format Export format type eq. `'csv'`.
     * @param {ExportOptions} options Export options.
     */
  }, {
    key: "downloadFile",
    value: function downloadFile(format) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$hot = this.hot,
        rootDocument = _this$hot.rootDocument,
        rootWindow = _this$hot.rootWindow;
      var formatter = this._createTypeFormatter(format, options);
      var blob = this._createBlob(formatter);
      var URL = rootWindow.URL || rootWindow.webkitURL;
      var a = rootDocument.createElement('a');
      var name = "".concat(formatter.options.filename, ".").concat(formatter.options.fileExtension);
      if (a.download !== void 0) {
        var url = URL.createObjectURL(blob);
        a.style.display = 'none';
        a.setAttribute('href', url);
        a.setAttribute('download', name);
        rootDocument.body.appendChild(a);
        a.dispatchEvent(new MouseEvent('click'));
        rootDocument.body.removeChild(a);
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 100);
      } else if (navigator.msSaveOrOpenBlob) {
        // IE10+
        navigator.msSaveOrOpenBlob(blob, name);
      }
    }

    /**
     * Creates and returns class formatter for specified export type.
     *
     * @private
     * @param {string} format Export format type eq. `'csv'`.
     * @param {ExportOptions} options Export options.
     * @returns {BaseType}
     */
  }, {
    key: "_createTypeFormatter",
    value: function _createTypeFormatter(format) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!EXPORT_TYPES[format]) {
        throw new Error("Export format type \"".concat(format, "\" is not supported."));
      }
      return typeFactory(format, new DataProvider(this.hot), options);
    }

    /**
     * Creates blob object based on provided type formatter class.
     *
     * @private
     * @param {BaseType} typeFormatter The instance of the specyfic formatter/exporter.
     * @returns {Blob}
     */
  }, {
    key: "_createBlob",
    value: function _createBlob(typeFormatter) {
      var formatter = null;
      if (typeof Blob !== 'undefined') {
        formatter = new Blob([typeFormatter.export()], {
          type: "".concat(typeFormatter.options.mimeType, ";charset=").concat(typeFormatter.options.encoding)
        });
      }
      return formatter;
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);
  return ExportFile;
}(BasePlugin);