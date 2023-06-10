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
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _base = _interopRequireDefault(require("./_base"));
var _element = require("./../../../../helpers/dom/element");
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
 * Colgroup renderer responsible for managing (inserting, tracking, rendering) COL elements.
 *
 *   <colgroup> (root node)
 *     ├ <col>   \
 *     ├ <col>    \
 *     ├ <col>     - ColGroupRenderer
 *     ├ <col>    /
 *     └ <col>   /.
 *
 * @class {ColGroupRenderer}
 */var ColGroupRenderer = /*#__PURE__*/function (_BaseRenderer) {
  _inherits(ColGroupRenderer, _BaseRenderer);
  var _super = _createSuper(ColGroupRenderer);
  function ColGroupRenderer(rootNode) {
    _classCallCheck(this, ColGroupRenderer);
    return _super.call(this, null, rootNode); // NodePool is not implemented for this renderer yet
  }

  /**
   * Adjusts the number of the rendered elements.
   */
  _createClass(ColGroupRenderer, [{
    key: "adjust",
    value: function adjust() {
      var _this$table = this.table,
        columnsToRender = _this$table.columnsToRender,
        rowHeadersCount = _this$table.rowHeadersCount;
      var allColumnsToRender = columnsToRender + rowHeadersCount;
      while (this.renderedNodes < allColumnsToRender) {
        this.rootNode.appendChild(this.table.rootDocument.createElement('col'));
        this.renderedNodes += 1;
      }
      while (this.renderedNodes > allColumnsToRender) {
        this.rootNode.removeChild(this.rootNode.lastChild);
        this.renderedNodes -= 1;
      }
    }

    /**
     * Renders the col group elements.
     */
  }, {
    key: "render",
    value: function render() {
      this.adjust();
      var _this$table2 = this.table,
        columnsToRender = _this$table2.columnsToRender,
        rowHeadersCount = _this$table2.rowHeadersCount;

      // Render column nodes for row headers
      for (var visibleColumnIndex = 0; visibleColumnIndex < rowHeadersCount; visibleColumnIndex++) {
        var sourceColumnIndex = this.table.renderedColumnToSource(visibleColumnIndex);
        var width = this.table.columnUtils.getHeaderWidth(sourceColumnIndex);
        this.rootNode.childNodes[visibleColumnIndex].style.width = "".concat(width, "px");
      }

      // Render column nodes for cells
      for (var _visibleColumnIndex = 0; _visibleColumnIndex < columnsToRender; _visibleColumnIndex++) {
        var _sourceColumnIndex = this.table.renderedColumnToSource(_visibleColumnIndex);
        var _width = this.table.columnUtils.getStretchedColumnWidth(_sourceColumnIndex);
        this.rootNode.childNodes[_visibleColumnIndex + rowHeadersCount].style.width = "".concat(_width, "px");
      }
      var firstChild = this.rootNode.firstChild;
      if (firstChild) {
        (0, _element.addClass)(firstChild, 'rowHeader');
      }
    }
  }]);
  return ColGroupRenderer;
}(_base.default);
exports.default = ColGroupRenderer;