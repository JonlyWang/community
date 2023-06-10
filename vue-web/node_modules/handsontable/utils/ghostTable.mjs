function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { addClass, outerHeight } from "./../helpers/dom/element.mjs";
import { arrayEach } from "./../helpers/array.mjs"; /**
                                                     * @class GhostTable
                                                     */
var GhostTable = /*#__PURE__*/function () {
  function GhostTable(hotInstance) {
    _classCallCheck(this, GhostTable);
    /**
     * Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hotInstance;
    /**
     * Container element where every table will be injected.
     *
     * @type {HTMLElement|null}
     */
    this.container = null;
    /**
     * Flag which determine is table was injected to DOM.
     *
     * @type {boolean}
     */
    this.injected = false;
    /**
     * Added rows collection.
     *
     * @type {Array}
     */
    this.rows = [];
    /**
     * Added columns collection.
     *
     * @type {Array}
     */
    this.columns = [];
    /**
     * Samples prepared for calculations.
     *
     * @type {Map}
     * @default {null}
     */
    this.samples = null;
    /**
     * Ghost table settings.
     *
     * @type {object}
     * @default {Object}
     */
    this.settings = {
      useHeaders: true
    };
  }

  /**
   * Add row.
   *
   * @param {number} row Row index.
   * @param {Map} samples Samples Map object.
   */
  _createClass(GhostTable, [{
    key: "addRow",
    value: function addRow(row, samples) {
      if (this.columns.length) {
        throw new Error('Doesn\'t support multi-dimensional table');
      }
      if (!this.rows.length) {
        this.container = this.createContainer(this.hot.rootElement.className);
      }
      var rowObject = {
        row: row
      };
      this.rows.push(rowObject);
      this.samples = samples;
      this.table = this.createTable(this.hot.table.className);
      this.table.colGroup.appendChild(this.createColGroupsCol());
      this.table.tr.appendChild(this.createRow(row));
      this.container.container.appendChild(this.table.fragment);
      rowObject.table = this.table.table;
    }

    /**
     * Add a row consisting of the column headers.
     *
     * @param {Map} samples A map with sampled table values.
     */
  }, {
    key: "addColumnHeadersRow",
    value: function addColumnHeadersRow(samples) {
      var colHeader = this.hot.getColHeader(0);
      if (colHeader !== null && colHeader !== void 0) {
        var rowObject = {
          row: -1
        };
        this.rows.push(rowObject);
        this.container = this.createContainer(this.hot.rootElement.className);
        this.samples = samples;
        this.table = this.createTable(this.hot.table.className);
        this.table.colGroup.appendChild(this.createColGroupsCol());
        this.appendColumnHeadersRow();
        this.container.container.appendChild(this.table.fragment);
        rowObject.table = this.table.table;
      }
    }

    /**
     * Add column.
     *
     * @param {number} column Column index.
     * @param {Map} samples A map with sampled table values.
     */
  }, {
    key: "addColumn",
    value: function addColumn(column, samples) {
      if (this.rows.length) {
        throw new Error('Doesn\'t support multi-dimensional table');
      }
      if (!this.columns.length) {
        this.container = this.createContainer(this.hot.rootElement.className);
      }
      var columnObject = {
        col: column
      };
      this.columns.push(columnObject);
      this.samples = samples;
      this.table = this.createTable(this.hot.table.className);
      if (this.getSetting('useHeaders') && this.hot.getColHeader(column) !== null) {
        // Please keep in mind that the renderable column index equal to the visual columns index for the GhostTable.
        // We render all columns.
        this.hot.view.appendColHeader(column, this.table.th);
      }
      this.table.tBody.appendChild(this.createCol(column));
      this.container.container.appendChild(this.table.fragment);
      columnObject.table = this.table.table;
    }

    /**
     * Get calculated heights.
     *
     * @param {Function} callback Callback which will be fired for each calculated row.
     */
  }, {
    key: "getHeights",
    value: function getHeights(callback) {
      if (!this.injected) {
        this.injectTable();
      }
      arrayEach(this.rows, function (row) {
        // -1 <- reduce border-top from table
        callback(row.row, outerHeight(row.table) - 1);
      });
    }

    /**
     * Get calculated widths.
     *
     * @param {Function} callback Callback which will be fired for each calculated column.
     */
  }, {
    key: "getWidths",
    value: function getWidths(callback) {
      if (!this.injected) {
        this.injectTable();
      }
      arrayEach(this.columns, function (column) {
        // The GhostTable class is responsible for calculating the columns' width based on the
        // contents rendered in the cells. In some cases, when the column's width calculated by
        // the browser is a decimal point with a fractional component. For example, 35.32px.
        // The usage of the `.offsetWidth` (or our helper `outerWidth`) is incorrect.
        // The `outerWidth` in the mentioned example (35.32px) would return 35 pixels that
        // would cause the text to not fit in the cell, thus increasing the row height.
        // That's why the `getBoundingClientRect` method is used. The method returns the number
        // that is rounded up to make sure that there will be a space for the cell's content.
        var _column$table$getBoun = column.table.getBoundingClientRect(),
          width = _column$table$getBoun.width;
        callback(column.col, Math.ceil(width));
      });
    }

    /**
     * Set the Ghost Table settings to the provided object.
     *
     * @param {object} settings New Ghost Table Settings.
     */
  }, {
    key: "setSettings",
    value: function setSettings(settings) {
      this.settings = settings;
    }

    /**
     * Set a single setting of the Ghost Table.
     *
     * @param {string} name Setting name.
     * @param {*} value Setting value.
     */
  }, {
    key: "setSetting",
    value: function setSetting(name, value) {
      if (!this.settings) {
        this.settings = {};
      }
      this.settings[name] = value;
    }

    /**
     * Get the Ghost Table settings.
     *
     * @returns {object|null}
     */
  }, {
    key: "getSettings",
    value: function getSettings() {
      return this.settings;
    }

    /**
     * Get a single Ghost Table setting.
     *
     * @param {string} name The setting name to get.
     * @returns {boolean|null}
     */
  }, {
    key: "getSetting",
    value: function getSetting(name) {
      if (this.settings) {
        return this.settings[name];
      }
      return null;
    }

    /**
     * Create colgroup col elements.
     *
     * @returns {DocumentFragment}
     */
  }, {
    key: "createColGroupsCol",
    value: function createColGroupsCol() {
      var _this = this;
      var fragment = this.hot.rootDocument.createDocumentFragment();
      if (this.hot.hasRowHeaders()) {
        fragment.appendChild(this.createColElement(-1));
      }
      this.samples.forEach(function (sample) {
        arrayEach(sample.strings, function (string) {
          fragment.appendChild(_this.createColElement(string.col));
        });
      });
      return fragment;
    }

    /**
     * Create table row element.
     *
     * @param {number} row Row index.
     * @returns {DocumentFragment} Returns created table row elements.
     */
  }, {
    key: "createRow",
    value: function createRow(row) {
      var _this2 = this;
      var rootDocument = this.hot.rootDocument;
      var fragment = rootDocument.createDocumentFragment();
      var th = rootDocument.createElement('th');
      if (this.hot.hasRowHeaders()) {
        this.hot.view.appendRowHeader(row, th);
        fragment.appendChild(th);
      }
      this.samples.forEach(function (sample) {
        arrayEach(sample.strings, function (string) {
          var column = string.col;
          var cellProperties = _this2.hot.getCellMeta(row, column);
          cellProperties.col = column;
          cellProperties.row = row;
          var renderer = _this2.hot.getCellRenderer(cellProperties);
          var td = rootDocument.createElement('td');

          // Indicate that this element is created and supported by GhostTable. It can be useful to
          // exclude rendering performance costly logic or exclude logic which doesn't work within a hidden table.
          td.setAttribute('ghost-table', 1);
          renderer(_this2.hot, td, row, column, _this2.hot.colToProp(column), string.value, cellProperties);
          fragment.appendChild(td);
        });
      });
      return fragment;
    }

    /**
     * Creates DOM elements for headers and appends them to the THEAD element of the table.
     */
  }, {
    key: "appendColumnHeadersRow",
    value: function appendColumnHeadersRow() {
      var _this3 = this;
      var rootDocument = this.hot.rootDocument;
      var domFragment = rootDocument.createDocumentFragment();
      var columnHeaders = [];
      if (this.hot.hasRowHeaders()) {
        var th = rootDocument.createElement('th');
        columnHeaders.push([-1, th]);
        domFragment.appendChild(th);
      }
      this.samples.forEach(function (sample) {
        arrayEach(sample.strings, function (string) {
          var column = string.col;
          var th = rootDocument.createElement('th');
          columnHeaders.push([column, th]);
          domFragment.appendChild(th);
        });
      });

      // Appending DOM elements for headers
      this.table.tHead.appendChild(domFragment);
      arrayEach(columnHeaders, function (columnHeader) {
        var _columnHeader = _slicedToArray(columnHeader, 2),
          column = _columnHeader[0],
          th = _columnHeader[1];

        // Using source method for filling a header with value.
        _this3.hot.view.appendColHeader(column, th);
      });
    }

    /**
     * Create table column elements.
     *
     * @param {number} column Column index.
     * @returns {DocumentFragment} Returns created column table column elements.
     */
  }, {
    key: "createCol",
    value: function createCol(column) {
      var _this4 = this;
      var rootDocument = this.hot.rootDocument;
      var fragment = rootDocument.createDocumentFragment();
      this.samples.forEach(function (sample) {
        arrayEach(sample.strings, function (string) {
          var row = string.row;
          var cellProperties = _this4.hot.getCellMeta(row, column);
          cellProperties.col = column;
          cellProperties.row = row;
          var renderer = _this4.hot.getCellRenderer(cellProperties);
          var td = rootDocument.createElement('td');
          var tr = rootDocument.createElement('tr');

          // Indicate that this element is created and supported by GhostTable. It can be useful to
          // exclude rendering performance costly logic or exclude logic which doesn't work within a hidden table.
          td.setAttribute('ghost-table', 1);
          renderer(_this4.hot, td, row, column, _this4.hot.colToProp(column), string.value, cellProperties);
          tr.appendChild(td);
          fragment.appendChild(tr);
        });
      });
      return fragment;
    }

    /**
     * Remove table from document and reset internal state.
     */
  }, {
    key: "clean",
    value: function clean() {
      this.rows.length = 0;
      this.rows[-1] = void 0;
      this.columns.length = 0;
      if (this.samples) {
        this.samples.clear();
      }
      this.samples = null;
      this.removeTable();
    }

    /**
     * Inject generated table into document.
     *
     * @param {HTMLElement} [parent=null] The element to which the ghost table is injected.
     */
  }, {
    key: "injectTable",
    value: function injectTable() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.injected) {
        (parent || this.hot.rootElement).appendChild(this.container.fragment);
        this.injected = true;
      }
    }

    /**
     * Remove table from document.
     */
  }, {
    key: "removeTable",
    value: function removeTable() {
      if (this.injected && this.container.container.parentNode) {
        this.container.container.parentNode.removeChild(this.container.container);
        this.container = null;
        this.injected = false;
      }
    }

    /**
     * Create col element.
     *
     * @param {number} column Column index.
     * @returns {HTMLElement}
     */
  }, {
    key: "createColElement",
    value: function createColElement(column) {
      var col = this.hot.rootDocument.createElement('col');
      col.style.width = "".concat(this.hot.view._wt.wtTable.getStretchedColumnWidth(column), "px");
      return col;
    }

    /**
     * Create table element.
     *
     * @param {string} className The CSS classes to add.
     * @returns {object}
     */
  }, {
    key: "createTable",
    value: function createTable() {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var rootDocument = this.hot.rootDocument;
      var fragment = rootDocument.createDocumentFragment();
      var table = rootDocument.createElement('table');
      var tHead = rootDocument.createElement('thead');
      var tBody = rootDocument.createElement('tbody');
      var colGroup = rootDocument.createElement('colgroup');
      var tr = rootDocument.createElement('tr');
      var th = rootDocument.createElement('th');
      if (this.isVertical()) {
        table.appendChild(colGroup);
      }
      if (this.isHorizontal()) {
        tr.appendChild(th);
        tHead.appendChild(tr);
        table.style.tableLayout = 'auto';
        table.style.width = 'auto';
      }
      table.appendChild(tHead);
      if (this.isVertical()) {
        tBody.appendChild(tr);
      }
      table.appendChild(tBody);
      addClass(table, className);
      fragment.appendChild(table);
      return {
        fragment: fragment,
        table: table,
        tHead: tHead,
        tBody: tBody,
        colGroup: colGroup,
        tr: tr,
        th: th
      };
    }

    /**
     * Create container for tables.
     *
     * @param {string} className The CSS classes to add.
     * @returns {object}
     */
  }, {
    key: "createContainer",
    value: function createContainer() {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var rootDocument = this.hot.rootDocument;
      var fragment = rootDocument.createDocumentFragment();
      var container = rootDocument.createElement('div');
      var containerClassName = "htGhostTable htAutoSize ".concat(className.trim());
      addClass(container, containerClassName);
      fragment.appendChild(container);
      return {
        fragment: fragment,
        container: container
      };
    }

    /**
     * Checks if table is raised vertically (checking rows).
     *
     * @returns {boolean}
     */
  }, {
    key: "isVertical",
    value: function isVertical() {
      return !!(this.rows.length && !this.columns.length);
    }

    /**
     * Checks if table is raised horizontally (checking columns).
     *
     * @returns {boolean}
     */
  }, {
    key: "isHorizontal",
    value: function isHorizontal() {
      return !!(this.columns.length && !this.rows.length);
    }
  }]);
  return GhostTable;
}();
export default GhostTable;