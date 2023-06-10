function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
import { hasClass } from "../../helpers/dom/element.mjs";
import { isMobileBrowser } from "../../helpers/browser.mjs";
import { BasePlugin } from "../base/index.mjs";
import EventManager from "../../eventManager.mjs";
export var PLUGIN_KEY = 'multipleSelectionHandles';
export var PLUGIN_PRIORITY = 160;

/**
 * @private
 * @plugin MultipleSelectionHandles
 * @class MultipleSelectionHandles
 */
export var MultipleSelectionHandles = /*#__PURE__*/function (_BasePlugin) {
  _inherits(MultipleSelectionHandles, _BasePlugin);
  var _super = _createSuper(MultipleSelectionHandles);
  /**
   * @param {object} hotInstance The handsontable instance.
   */
  function MultipleSelectionHandles(hotInstance) {
    var _this2;
    _classCallCheck(this, MultipleSelectionHandles);
    _this2 = _super.call(this, hotInstance);
    /**
     * @type {Array}
     */
    _this2.dragged = [];
    /**
     * Instance of EventManager.
     *
     * @type {EventManager}
     */
    _this2.eventManager = null;
    /**
     * @type {null}
     */
    _this2.lastSetCell = null;
    return _this2;
  }

  /**
   * Check if the plugin is enabled in the handsontable settings.
   *
   * @returns {boolean}
   */
  _createClass(MultipleSelectionHandles, [{
    key: "isEnabled",
    value: function isEnabled() {
      return isMobileBrowser();
    }

    /**
     * Enable plugin for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      if (this.enabled) {
        return;
      }
      if (!this.eventManager) {
        this.eventManager = new EventManager(this);
      }
      this.registerListeners();
      _get(_getPrototypeOf(MultipleSelectionHandles.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Bind the touch events.
     *
     * @private
     */
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this3 = this;
      var _this = this;
      var rootElement = this.hot.rootElement;

      /**
       * @private
       * @param {string} query Query for the position.
       * @returns {boolean}
       */
      function removeFromDragged(query) {
        if (_this.dragged.length === 1) {
          // clear array
          _this.dragged.splice(0, _this.dragged.length);
          return true;
        }
        var entryPosition = _this.dragged.indexOf(query);
        if (entryPosition === -1) {
          return false;
        } else if (entryPosition === 0) {
          _this.dragged = _this.dragged.slice(0, 1);
        } else if (entryPosition === 1) {
          _this.dragged = _this.dragged.slice(-1);
        }
      }
      this.eventManager.addEventListener(rootElement, 'touchstart', function (event) {
        var selectedRange;
        if (hasClass(event.target, 'topSelectionHandle-HitArea')) {
          selectedRange = _this.hot.getSelectedRangeLast();
          _this.dragged.push('top');
          _this.touchStartRange = {
            width: selectedRange.getWidth(),
            height: selectedRange.getHeight(),
            direction: selectedRange.getDirection()
          };
          event.preventDefault();
          return false;
        } else if (hasClass(event.target, 'bottomSelectionHandle-HitArea')) {
          selectedRange = _this.hot.getSelectedRangeLast();
          _this.dragged.push('bottom');
          _this.touchStartRange = {
            width: selectedRange.getWidth(),
            height: selectedRange.getHeight(),
            direction: selectedRange.getDirection()
          };
          event.preventDefault();
          return false;
        }
      });
      this.eventManager.addEventListener(rootElement, 'touchend', function (event) {
        if (hasClass(event.target, 'topSelectionHandle-HitArea')) {
          removeFromDragged.call(_this, 'top');
          _this.touchStartRange = void 0;
          event.preventDefault();
          return false;
        } else if (hasClass(event.target, 'bottomSelectionHandle-HitArea')) {
          removeFromDragged.call(_this, 'bottom');
          _this.touchStartRange = void 0;
          event.preventDefault();
          return false;
        }
      });
      this.eventManager.addEventListener(rootElement, 'touchmove', function (event) {
        var rootDocument = _this3.hot.rootDocument;
        var targetCoords;
        var selectedRange;
        var rangeWidth;
        var rangeHeight;
        var rangeDirection;
        var newRangeCoords;
        if (_this.dragged.length === 0) {
          return;
        }
        var endTarget = rootDocument.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        if (!endTarget || endTarget === _this.lastSetCell) {
          return;
        }
        if (endTarget.nodeName === 'TD' || endTarget.nodeName === 'TH') {
          targetCoords = _this.hot.getCoords(endTarget);
          if (targetCoords.col === -1) {
            targetCoords.col = 0;
          }
          selectedRange = _this.hot.getSelectedRangeLast();
          rangeWidth = selectedRange.getWidth();
          rangeHeight = selectedRange.getHeight();
          rangeDirection = selectedRange.getDirection();
          if (rangeWidth === 1 && rangeHeight === 1) {
            _this.hot.selection.setRangeEnd(targetCoords);
          }
          newRangeCoords = _this.getCurrentRangeCoords(selectedRange, targetCoords, _this.touchStartRange.direction, rangeDirection, _this.dragged[0]);
          if (newRangeCoords.start !== null) {
            _this.hot.selection.setRangeStart(newRangeCoords.start);
          }
          _this.hot.selection.setRangeEnd(newRangeCoords.end);
          _this.lastSetCell = endTarget;
        }
        event.preventDefault();
      });
    }
  }, {
    key: "getCurrentRangeCoords",
    value: function getCurrentRangeCoords(selectedRange, currentTouch, touchStartDirection, currentDirection, draggedHandle) {
      var topStartCorner = selectedRange.getTopStartCorner();
      var bottomEndCorner = selectedRange.getBottomEndCorner();
      var bottomStartCorner = selectedRange.getBottomStartCorner();
      var topEndCorner = selectedRange.getTopEndCorner();
      var newCoords = {
        start: null,
        end: null
      };
      switch (touchStartDirection) {
        case 'NE-SW':
          switch (currentDirection) {
            case 'NE-SW':
            case 'NW-SE':
              if (draggedHandle === 'top') {
                newCoords = {
                  start: this.hot._createCellCoords(currentTouch.row, selectedRange.highlight.col),
                  end: this.hot._createCellCoords(bottomStartCorner.row, currentTouch.col)
                };
              } else {
                newCoords = {
                  start: this.hot._createCellCoords(selectedRange.highlight.row, currentTouch.col),
                  end: this.hot._createCellCoords(currentTouch.row, topStartCorner.col)
                };
              }
              break;
            case 'SE-NW':
              if (draggedHandle === 'bottom') {
                newCoords = {
                  start: this.hot._createCellCoords(bottomEndCorner.row, currentTouch.col),
                  end: this.hot._createCellCoords(currentTouch.row, topStartCorner.col)
                };
              }
              break;
            default:
              break;
          }
          break;
        case 'NW-SE':
          switch (currentDirection) {
            case 'NE-SW':
              if (draggedHandle === 'top') {
                newCoords = {
                  start: currentTouch,
                  end: bottomStartCorner
                };
              } else {
                newCoords.end = currentTouch;
              }
              break;
            case 'NW-SE':
              if (draggedHandle === 'top') {
                newCoords = {
                  start: currentTouch,
                  end: bottomEndCorner
                };
              } else {
                newCoords.end = currentTouch;
              }
              break;
            case 'SE-NW':
              if (draggedHandle === 'top') {
                newCoords = {
                  start: currentTouch,
                  end: topStartCorner
                };
              } else {
                newCoords.end = currentTouch;
              }
              break;
            case 'SW-NE':
              if (draggedHandle === 'top') {
                newCoords = {
                  start: currentTouch,
                  end: topEndCorner
                };
              } else {
                newCoords.end = currentTouch;
              }
              break;
            default:
              break;
          }
          break;
        case 'SW-NE':
          switch (currentDirection) {
            case 'NW-SE':
              if (draggedHandle === 'bottom') {
                newCoords = {
                  start: this.hot._createCellCoords(currentTouch.row, topStartCorner.col),
                  end: this.hot._createCellCoords(bottomStartCorner.row, currentTouch.col)
                };
              } else {
                newCoords = {
                  start: this.hot._createCellCoords(topStartCorner.row, currentTouch.col),
                  end: this.hot._createCellCoords(currentTouch.row, bottomEndCorner.col)
                };
              }
              break;
            // case 'NE-SW':
            //
            //  break;
            case 'SW-NE':
              if (draggedHandle === 'top') {
                newCoords = {
                  start: this.hot._createCellCoords(selectedRange.highlight.row, currentTouch.col),
                  end: this.hot._createCellCoords(currentTouch.row, bottomEndCorner.col)
                };
              } else {
                newCoords = {
                  start: this.hot._createCellCoords(currentTouch.row, topStartCorner.col),
                  end: this.hot._createCellCoords(topStartCorner.row, currentTouch.col)
                };
              }
              break;
            case 'SE-NW':
              if (draggedHandle === 'bottom') {
                newCoords = {
                  start: this.hot._createCellCoords(currentTouch.row, topEndCorner.col),
                  end: this.hot._createCellCoords(topStartCorner.row, currentTouch.col)
                };
              } else if (draggedHandle === 'top') {
                newCoords = {
                  start: bottomStartCorner,
                  end: currentTouch
                };
              }
              break;
            default:
              break;
          }
          break;
        case 'SE-NW':
          switch (currentDirection) {
            case 'NW-SE':
            case 'NE-SW':
            case 'SW-NE':
              if (draggedHandle === 'top') {
                newCoords.end = currentTouch;
              }
              break;
            case 'SE-NW':
              if (draggedHandle === 'top') {
                newCoords.end = currentTouch;
              } else {
                newCoords = {
                  start: currentTouch,
                  end: topStartCorner
                };
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      return newCoords;
    }

    /**
     * Check if user is currently dragging the handle.
     *
     * @returns {boolean} Dragging state.
     */
  }, {
    key: "isDragged",
    value: function isDragged() {
      return this.dragged.length > 0;
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
  return MultipleSelectionHandles;
}(BasePlugin);