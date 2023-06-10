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
var _event = _interopRequireDefault(require("../event"));
var _overlays = _interopRequireDefault(require("../overlays"));
var _settings = _interopRequireDefault(require("../settings"));
var _master = _interopRequireDefault(require("../table/master"));
var _viewport = _interopRequireDefault(require("../viewport"));
var _base = _interopRequireDefault(require("./_base"));
var _object = require("../../../../helpers/object");
var _element = require("../../../../helpers/dom/element");
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
 * @class Walkontable
 */var Walkontable = /*#__PURE__*/function (_CoreAbstract) {
  _inherits(Walkontable, _CoreAbstract);
  var _super = _createSuper(Walkontable);
  /**
   * @param {HTMLTableElement} table Main table.
   * @param {SettingsPure} settings The Walkontable settings.
   */
  function Walkontable(table, settings) {
    var _this;
    _classCallCheck(this, Walkontable);
    _this = _super.call(this, table, new _settings.default(settings));
    var facadeGetter = _this.wtSettings.getSetting('facade', _assertThisInitialized(_this)); // todo rethink. I would like to have no access to facade from the internal scope.

    _this.wtTable = new _master.default(_this.getTableDao(), facadeGetter, _this.domBindings, _this.wtSettings);
    _this.wtViewport = new _viewport.default(_this.getViewportDao(), _this.domBindings, _this.wtSettings, _this.eventManager, _this.wtTable);
    _this.selections = _this.wtSettings.getSetting('selections');
    _this.wtEvent = new _event.default(facadeGetter, _this.domBindings, _this.wtSettings, _this.eventManager, _this.wtTable, _this.selections);
    _this.wtOverlays = new _overlays.default( // TODO create DAO and remove reference to the Walkontable instance.
    _assertThisInitialized(_this), facadeGetter, _this.domBindings, _this.wtSettings, _this.eventManager, _this.wtTable);
    _this.exportSettingsAsClassNames();
    _this.findOriginalHeaders();
    return _this;
  }

  /**
   * Export settings as class names added to the parent element of the table.
   */
  _createClass(Walkontable, [{
    key: "exportSettingsAsClassNames",
    value: function exportSettingsAsClassNames() {
      var _this2 = this;
      var toExport = {
        rowHeaders: 'htRowHeaders',
        columnHeaders: 'htColumnHeaders'
      };
      var allClassNames = [];
      var newClassNames = [];
      (0, _object.objectEach)(toExport, function (className, key) {
        if (_this2.wtSettings.getSetting(key).length) {
          newClassNames.push(className);
        }
        allClassNames.push(className);
      });
      (0, _element.removeClass)(this.wtTable.wtRootElement.parentNode, allClassNames);
      (0, _element.addClass)(this.wtTable.wtRootElement.parentNode, newClassNames);
    }

    /**
     * @returns {ViewportDao}
     */
  }, {
    key: "getViewportDao",
    value: function getViewportDao() {
      var wot = this;
      return {
        get wot() {
          return wot;
        },
        get topOverlayTrimmingContainer() {
          return wot.wtOverlays.topOverlay.trimmingContainer;
        },
        get inlineStartOverlayTrimmingContainer() {
          return wot.wtOverlays.inlineStartOverlay.trimmingContainer;
        },
        get topScrollPosition() {
          return wot.wtOverlays.topOverlay.getScrollPosition();
        },
        get topParentOffset() {
          return wot.wtOverlays.topOverlay.getTableParentOffset();
        },
        get inlineStartScrollPosition() {
          return wot.wtOverlays.inlineStartOverlay.getScrollPosition();
        },
        get inlineStartParentOffset() {
          return wot.wtOverlays.inlineStartOverlay.getTableParentOffset();
        },
        get topOverlay() {
          return wot.wtOverlays.topOverlay; // TODO refactoring: move outside dao, use IOC
        },

        get inlineStartOverlay() {
          return wot.wtOverlays.inlineStartOverlay; // TODO refactoring: move outside dao, use IOC
        },

        get bottomOverlay() {
          return wot.wtOverlays.bottomOverlay; // TODO refactoring: move outside dao, use IOC
        }
      };
    }
  }]);
  return Walkontable;
}(_base.default);
exports.default = Walkontable;