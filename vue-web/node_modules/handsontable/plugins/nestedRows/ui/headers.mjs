function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.array.concat.js";
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
import { arrayEach } from "../../../helpers/array.mjs";
import { rangeEach } from "../../../helpers/number.mjs";
import { addClass } from "../../../helpers/dom/element.mjs";
import BaseUI from "./_base.mjs"; /**
                                   * Class responsible for the UI in the Nested Rows' row headers.
                                   *
                                   * @private
                                   * @class HeadersUI
                                   * @augments BaseUI
                                   */
var HeadersUI = /*#__PURE__*/function (_BaseUI) {
  _inherits(HeadersUI, _BaseUI);
  var _super = _createSuper(HeadersUI);
  function HeadersUI(nestedRowsPlugin, hotInstance) {
    var _this;
    _classCallCheck(this, HeadersUI);
    _this = _super.call(this, nestedRowsPlugin, hotInstance);
    /**
     * Reference to the DataManager instance connected with the Nested Rows plugin.
     *
     * @type {DataManager}
     */
    _this.dataManager = _this.plugin.dataManager;
    // /**
    //  * Level cache array.
    //  *
    //  * @type {Array}
    //  */
    // this.levelCache = this.dataManager.cache.levels;
    /**
     * Reference to the CollapsingUI instance connected with the Nested Rows plugin.
     *
     * @type {CollapsingUI}
     */
    _this.collapsingUI = _this.plugin.collapsingUI;
    /**
     * Cache for the row headers width.
     *
     * @type {null|number}
     */
    _this.rowHeaderWidthCache = null;
    return _this;
  }

  /**
   * Append nesting indicators and buttons to the row headers.
   *
   * @private
   * @param {number} row Row index.
   * @param {HTMLElement} TH TH 3element.
   */
  _createClass(HeadersUI, [{
    key: "appendLevelIndicators",
    value: function appendLevelIndicators(row, TH) {
      var rowIndex = this.hot.toPhysicalRow(row);
      var rowLevel = this.dataManager.getRowLevel(rowIndex);
      var rowObject = this.dataManager.getDataObject(rowIndex);
      var innerDiv = TH.getElementsByTagName('DIV')[0];
      var innerSpan = innerDiv.querySelector('span.rowHeader');
      var previousIndicators = innerDiv.querySelectorAll('[class^="ht_nesting"]');
      arrayEach(previousIndicators, function (elem) {
        if (elem) {
          innerDiv.removeChild(elem);
        }
      });
      addClass(TH, HeadersUI.CSS_CLASSES.indicatorContainer);
      if (rowLevel) {
        var rootDocument = this.hot.rootDocument;
        var initialContent = innerSpan.cloneNode(true);
        innerDiv.innerHTML = '';
        rangeEach(0, rowLevel - 1, function () {
          var levelIndicator = rootDocument.createElement('SPAN');
          addClass(levelIndicator, HeadersUI.CSS_CLASSES.emptyIndicator);
          innerDiv.appendChild(levelIndicator);
        });
        innerDiv.appendChild(initialContent);
      }
      if (this.dataManager.hasChildren(rowObject)) {
        var buttonsContainer = this.hot.rootDocument.createElement('DIV');
        addClass(TH, HeadersUI.CSS_CLASSES.parent);
        if (this.collapsingUI.areChildrenCollapsed(rowIndex)) {
          addClass(buttonsContainer, "".concat(HeadersUI.CSS_CLASSES.button, " ").concat(HeadersUI.CSS_CLASSES.expandButton));
        } else {
          addClass(buttonsContainer, "".concat(HeadersUI.CSS_CLASSES.button, " ").concat(HeadersUI.CSS_CLASSES.collapseButton));
        }
        innerDiv.appendChild(buttonsContainer);
      }
    }

    /**
     * Update the row header width according to number of levels in the dataset.
     *
     * @private
     * @param {number} deepestLevel Cached deepest level of nesting.
     */
  }, {
    key: "updateRowHeaderWidth",
    value: function updateRowHeaderWidth(deepestLevel) {
      var deepestLevelIndex = deepestLevel;
      if (!deepestLevelIndex) {
        deepestLevelIndex = this.dataManager.cache.levelCount;
      }
      this.rowHeaderWidthCache = Math.max(50, 11 + 10 * deepestLevelIndex + 25);
      this.hot.render();
    }
  }], [{
    key: "CSS_CLASSES",
    get:
    /**
     * CSS classes used in the row headers.
     *
     * @type {object}
     */
    function get() {
      return {
        indicatorContainer: 'ht_nestingLevels',
        parent: 'ht_nestingParent',
        indicator: 'ht_nestingLevel',
        emptyIndicator: 'ht_nestingLevel_empty',
        button: 'ht_nestingButton',
        expandButton: 'ht_nestingExpand',
        collapseButton: 'ht_nestingCollapse'
      };
    }
  }]);
  return HeadersUI;
}(BaseUI);
export default HeadersUI;