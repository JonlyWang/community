"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _orderView = require("./../utils/orderView");
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
/**
 * Row headers renderer responsible for managing (inserting, tracking, rendering) TR elements belongs to TR.
 *
 *   <tr> (root node)
 *     ├ <th>   --- RowHeadersRenderer
 *     ├ <td>   \
 *     ├ <td>    \
 *     ├ <td>     - CellsRenderer
 *     ├ <td>    /
 *     └ <td>   /.
 *
 * @class {CellsRenderer}
 */var RowHeadersRenderer = /*#__PURE__*/function (_BaseRenderer) {
  _inherits(RowHeadersRenderer, _BaseRenderer);
  var _super = _createSuper(RowHeadersRenderer);
  function RowHeadersRenderer() {
    var _this;
    _classCallCheck(this, RowHeadersRenderer);
    _this = _super.call(this, 'TH');
    /**
     * Cache for OrderView classes connected to specified node.
     *
     * @type {WeakMap}
     */
    _this.orderViews = new WeakMap();
    /**
     * Row index which specifies the row position of the processed row header.
     *
     * @type {number}
     */
    _this.sourceRowIndex = 0;
    return _this;
  }

  /**
   * Obtains the instance of the SharedOrderView class which is responsible for rendering the nodes to the root node.
   *
   * @param {HTMLTableRowElement} rootNode The TR element, which is root element for row headers (TH).
   * @returns {SharedOrderView}
   */
  _createClass(RowHeadersRenderer, [{
    key: "obtainOrderView",
    value: function obtainOrderView(rootNode) {
      var _this2 = this;
      var orderView;
      if (this.orderViews.has(rootNode)) {
        orderView = this.orderViews.get(rootNode);
      } else {
        orderView = new _orderView.SharedOrderView(rootNode, function (sourceColumnIndex) {
          return _this2.nodesPool.obtain(_this2.sourceRowIndex, sourceColumnIndex);
        }, this.nodeType);
        this.orderViews.set(rootNode, orderView);
      }
      return orderView;
    }

    /**
     * Renders the cells.
     */
  }, {
    key: "render",
    value: function render() {
      var _this$table = this.table,
        rowsToRender = _this$table.rowsToRender,
        rowHeaderFunctions = _this$table.rowHeaderFunctions,
        rowHeadersCount = _this$table.rowHeadersCount,
        rows = _this$table.rows,
        cells = _this$table.cells;
      for (var visibleRowIndex = 0; visibleRowIndex < rowsToRender; visibleRowIndex++) {
        var sourceRowIndex = this.table.renderedRowToSource(visibleRowIndex);
        var TR = rows.getRenderedNode(visibleRowIndex);
        this.sourceRowIndex = sourceRowIndex;
        var orderView = this.obtainOrderView(TR);
        var cellsView = cells.obtainOrderView(TR);
        orderView.appendView(cellsView).setSize(rowHeadersCount).setOffset(this.table.renderedColumnToSource(0)).start();
        for (var visibleColumnIndex = 0; visibleColumnIndex < rowHeadersCount; visibleColumnIndex++) {
          orderView.render();
          var TH = orderView.getCurrentNode();
          TH.className = '';
          TH.removeAttribute('style');
          rowHeaderFunctions[visibleColumnIndex](sourceRowIndex, TH, visibleColumnIndex);
        }
        orderView.end();
      }
    }
  }]);
  return RowHeadersRenderer;
}(_base.default);
exports.default = RowHeadersRenderer;