function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import OrderView from "./view.mjs"; /**
                                     * Executive model for TR root nodes.
                                     *
                                     * @class {SharedOrderView}
                                     */
var SharedOrderView = /*#__PURE__*/function (_OrderView) {
  _inherits(SharedOrderView, _OrderView);
  var _super = _createSuper(SharedOrderView);
  function SharedOrderView() {
    _classCallCheck(this, SharedOrderView);
    return _super.apply(this, arguments);
  }
  _createClass(SharedOrderView, [{
    key: "prependView",
    value:
    /**
     * The method results in merging external order view into the current order. This happens only for order views which
     * operate on the same root node.
     *
     * In the table, there is only one scenario when this happens. TR root element
     * has a common root node with cells order view and row headers order view. Both classes have to share
     * information about their order sizes to make proper diff calculations.
     *
     * @param {OrderView} orderView The order view to merging with. The view will be added at the beginning of the list.
     * @returns {SharedOrderView}
     */
    function prependView(orderView) {
      this.sizeSet.prepend(orderView.sizeSet);
      orderView.sizeSet.append(this.sizeSet);
      return this;
    }

    /**
     * The method results in merging external order view into the current order. This happens only for order views which
     * operate on the same root node.
     *
     * In the table, there is only one scenario when this happens. TR root element
     * has a common root node with cells order view and row headers order view. Both classes have to share
     * information about their order sizes to make proper diff calculations.
     *
     * @param {OrderView} orderView The order view to merging with. The view will be added at the end of the list.
     * @returns {SharedOrderView}
     */
  }, {
    key: "appendView",
    value: function appendView(orderView) {
      this.sizeSet.append(orderView.sizeSet);
      orderView.sizeSet.prepend(this.sizeSet);
      return this;
    }
  }]);
  return SharedOrderView;
}(OrderView);
export { SharedOrderView as default };