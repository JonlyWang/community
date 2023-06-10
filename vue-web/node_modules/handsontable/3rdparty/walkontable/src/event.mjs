function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.timers.js";
import "core-js/modules/es.array.includes.js";
import { closestDown, hasClass, isChildOf, getParent } from "../../../helpers/dom/element.mjs";
import { partial } from "../../../helpers/function.mjs";
import { isTouchSupported } from "../../../helpers/feature.mjs";
import { isMobileBrowser, isChromeWebKit, isFirefoxWebKit, isIOS } from "../../../helpers/browser.mjs";
import { isDefined } from "../../../helpers/mixed.mjs";
var privatePool = new WeakMap();

/**
 * @class Event
 */
var Event = /*#__PURE__*/function () {
  /**
   * @param {FacadeGetter} facadeGetter Gets an instance facade.
   * @param {DomBindings} domBindings Bindings into dom.
   * @param {Settings} wtSettings The walkontable settings.
   * @param {EventManager} eventManager The walkontable event manager.
   * @param {Table} wtTable The table.
   * @param {Selections} selections Selections.
   * @param {Event} [parent=null] The main Event instance.
   */
  function Event(facadeGetter, domBindings, wtSettings, eventManager, wtTable, selections) {
    var parent = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    _classCallCheck(this, Event);
    this.wtSettings = wtSettings;
    this.domBindings = domBindings;
    this.wtTable = wtTable;
    this.selections = selections;
    this.parent = parent;

    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    this.eventManager = eventManager;

    /**
     * Should be use only for passing face called external origin methods, like registered event listeners.
     * It provides backward compatibility by getting instance facade.
     *
     * @todo Consider about removing this from Event class, because it make relationship into facade (implicit circular dependency).
     * @todo Con. Maybe passing listener caller as an ioc from faced resolves this issue. To rethink later.
     *
     * @type {FacadeGetter}
     * @private
     */
    this.facadeGetter = facadeGetter;
    privatePool.set(this, {
      selectedCellBeforeTouchEnd: void 0,
      dblClickTimeout: [null, null],
      dblClickOrigin: [null, null]
    });
    this.registerEvents();
  }

  /**
   * Adds listeners for mouse and touch events.
   *
   * @private
   */
  _createClass(Event, [{
    key: "registerEvents",
    value: function registerEvents() {
      var _this = this;
      this.eventManager.addEventListener(this.wtTable.holder, 'contextmenu', function (event) {
        return _this.onContextMenu(event);
      });
      this.eventManager.addEventListener(this.wtTable.TABLE, 'mouseover', function (event) {
        return _this.onMouseOver(event);
      });
      this.eventManager.addEventListener(this.wtTable.TABLE, 'mouseout', function (event) {
        return _this.onMouseOut(event);
      });
      var initTouchEvents = function initTouchEvents() {
        _this.eventManager.addEventListener(_this.wtTable.holder, 'touchstart', function (event) {
          return _this.onTouchStart(event);
        });
        _this.eventManager.addEventListener(_this.wtTable.holder, 'touchend', function (event) {
          return _this.onTouchEnd(event);
        });
        if (!_this.momentumScrolling) {
          _this.momentumScrolling = {};
        }
        _this.eventManager.addEventListener(_this.wtTable.holder, 'scroll', function () {
          clearTimeout(_this.momentumScrolling._timeout);
          if (!_this.momentumScrolling.ongoing) {
            _this.wtSettings.getSetting('onBeforeTouchScroll');
          }
          _this.momentumScrolling.ongoing = true;
          _this.momentumScrolling._timeout = setTimeout(function () {
            if (!_this.touchApplied) {
              _this.momentumScrolling.ongoing = false;
              _this.wtSettings.getSetting('onAfterMomentumScroll');
            }
          }, 200);
        });
      };
      var initMouseEvents = function initMouseEvents() {
        _this.eventManager.addEventListener(_this.wtTable.holder, 'mouseup', function (event) {
          return _this.onMouseUp(event);
        });
        _this.eventManager.addEventListener(_this.wtTable.holder, 'mousedown', function (event) {
          return _this.onMouseDown(event);
        });
      };
      if (isMobileBrowser()) {
        initTouchEvents();
      } else {
        // PC like devices which support both methods (touchscreen and ability to plug-in mouse).
        if (isTouchSupported()) {
          initTouchEvents();
        }
        initMouseEvents();
      }
    }

    /**
     * Checks if an element is already selected.
     *
     * @private
     * @param {Element} touchTarget An element to check.
     * @returns {boolean}
     */
  }, {
    key: "selectedCellWasTouched",
    value: function selectedCellWasTouched(touchTarget) {
      var priv = privatePool.get(this);
      var cellUnderFinger = this.parentCell(touchTarget);
      var coordsOfCellUnderFinger = cellUnderFinger.coords;
      if (priv.selectedCellBeforeTouchEnd && coordsOfCellUnderFinger) {
        var _ref = [coordsOfCellUnderFinger.row, priv.selectedCellBeforeTouchEnd.from.row],
          rowTouched = _ref[0],
          rowSelected = _ref[1];
        var _ref2 = [coordsOfCellUnderFinger.col, priv.selectedCellBeforeTouchEnd.from.col],
          colTouched = _ref2[0],
          colSelected = _ref2[1];
        return rowTouched === rowSelected && colTouched === colSelected;
      }
      return false;
    }

    /**
     * Gets closest TD or TH element.
     *
     * @private
     * @param {Element} elem An element from the traversing starts.
     * @returns {object} Contains coordinates and reference to TD or TH if it exists. Otherwise it's empty object.
     */
  }, {
    key: "parentCell",
    value: function parentCell(elem) {
      var cell = {};
      var TABLE = this.wtTable.TABLE;
      var TD = closestDown(elem, ['TD', 'TH'], TABLE);
      if (TD) {
        cell.coords = this.wtTable.getCoords(TD);
        cell.TD = TD;
      } else if (hasClass(elem, 'wtBorder') && hasClass(elem, 'current')) {
        cell.coords = this.selections.getCell().cellRange.highlight;
        cell.TD = this.wtTable.getCell(cell.coords);
      } else if (hasClass(elem, 'wtBorder') && hasClass(elem, 'area')) {
        if (this.selections.createOrGetArea().cellRange) {
          cell.coords = this.selections.createOrGetArea().cellRange.to;
          cell.TD = this.wtTable.getCell(cell.coords);
        }
      }
      return cell;
    }

    /**
     * OnMouseDown callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var priv = privatePool.get(this);
      var activeElement = this.domBindings.rootDocument.activeElement;
      var getParentNode = partial(getParent, event.target);
      var realTarget = event.target;

      // ignore focusable element from mouse down processing (https://github.com/handsontable/handsontable/issues/3555)
      if (realTarget === activeElement || getParentNode(0) === activeElement || getParentNode(1) === activeElement) {
        return;
      }
      var cell = this.parentCell(realTarget);
      if (hasClass(realTarget, 'corner')) {
        this.wtSettings.getSetting('onCellCornerMouseDown', event, realTarget);
      } else if (cell.TD && this.wtSettings.has('onCellMouseDown')) {
        this.callListener('onCellMouseDown', event, cell.coords, cell.TD);
      }

      // doubleclick reacts only for left mouse button or from touch events
      if ((event.button === 0 || this.touchApplied) && cell.TD) {
        priv.dblClickOrigin[0] = cell.TD;
        clearTimeout(priv.dblClickTimeout[0]);
        priv.dblClickTimeout[0] = setTimeout(function () {
          priv.dblClickOrigin[0] = null;
        }, 1000);
      }
    }

    /**
     * OnContextMenu callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onContextMenu",
    value: function onContextMenu(event) {
      if (this.wtSettings.has('onCellContextMenu')) {
        var cell = this.parentCell(event.target);
        if (cell.TD) {
          this.callListener('onCellContextMenu', event, cell.coords, cell.TD);
        }
      }
    }

    /**
     * OnMouseOver callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      if (!this.wtSettings.has('onCellMouseOver')) {
        return;
      }
      var table = this.wtTable.TABLE;
      var td = closestDown(event.target, ['TD', 'TH'], table);
      var parent = this.parent || this;
      if (td && td !== parent.lastMouseOver && isChildOf(td, table)) {
        parent.lastMouseOver = td;
        this.callListener('onCellMouseOver', event, this.wtTable.getCoords(td), td);
      }
    }

    /**
     * OnMouseOut callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      if (!this.wtSettings.has('onCellMouseOut')) {
        return;
      }
      var table = this.wtTable.TABLE;
      var lastTD = closestDown(event.target, ['TD', 'TH'], table);
      var nextTD = closestDown(event.relatedTarget, ['TD', 'TH'], table);
      if (lastTD && lastTD !== nextTD && isChildOf(lastTD, table)) {
        this.callListener('onCellMouseOut', event, this.wtTable.getCoords(lastTD), lastTD);
      }
    }

    /**
     * OnMouseUp callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      var priv = privatePool.get(this);
      var cell = this.parentCell(event.target);
      if (cell.TD && this.wtSettings.has('onCellMouseUp')) {
        this.callListener('onCellMouseUp', event, cell.coords, cell.TD);
      }

      // if not left mouse button, and the origin event is not comes from touch
      if (event.button !== 0 && !this.touchApplied) {
        return;
      }
      if (cell.TD === priv.dblClickOrigin[0] && cell.TD === priv.dblClickOrigin[1]) {
        if (hasClass(event.target, 'corner')) {
          this.callListener('onCellCornerDblClick', event, cell.coords, cell.TD);
        } else {
          this.callListener('onCellDblClick', event, cell.coords, cell.TD);
        }
        priv.dblClickOrigin[0] = null;
        priv.dblClickOrigin[1] = null;
      } else if (cell.TD === priv.dblClickOrigin[0]) {
        priv.dblClickOrigin[1] = cell.TD;
        clearTimeout(priv.dblClickTimeout[1]);
        priv.dblClickTimeout[1] = setTimeout(function () {
          priv.dblClickOrigin[1] = null;
        }, 500);
      }
    }

    /**
     * OnTouchStart callback. Simulates mousedown event.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      var priv = privatePool.get(this);
      priv.selectedCellBeforeTouchEnd = this.selections.getCell().cellRange;
      this.touchApplied = true;
      this.onMouseDown(event);
    }

    /**
     * OnTouchEnd callback. Simulates mouseup event.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     */
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      var _this$parentCell;
      var target = event.target;
      var parentCellCoords = (_this$parentCell = this.parentCell(target)) === null || _this$parentCell === void 0 ? void 0 : _this$parentCell.coords;
      var isCellsRange = isDefined(parentCellCoords) && parentCellCoords.row >= 0 && parentCellCoords.col >= 0;
      var isEventCancelable = event.cancelable && isCellsRange && this.wtSettings.getSetting('isDataViewInstance');

      // To prevent accidental redirects or other actions that the interactive elements (e.q "A" link) do
      // while the cell is highlighted, all touch events that are triggered on different cells are
      // "preventDefault"'ed. The user can interact with the element (e.q. click on the link that opens
      // a new page) only when the same cell was previously selected (see related PR #7980).
      if (isEventCancelable) {
        var interactiveElements = ['A', 'BUTTON', 'INPUT'];

        // For browsers that use the WebKit as an engine (excluding Safari), there is a bug. The prevent
        // default has to be called all the time. Otherwise, the second tap won't be triggered (probably
        // caused by the native ~300ms delay - https://webkit.org/blog/5610/more-responsive-tapping-on-ios/).
        // To make the interactive elements work, the event target element has to be check. If the element
        // matches the allow-list, the event is not prevented.
        if (isIOS() && (isChromeWebKit() || isFirefoxWebKit()) && this.selectedCellWasTouched(target) && !interactiveElements.includes(target.tagName)) {
          event.preventDefault();
        } else if (!this.selectedCellWasTouched(target)) {
          // For other browsers, prevent default is fired only for the first tap and only when the previous
          // highlighted cell was different.
          event.preventDefault();
        }
      }
      this.onMouseUp(event);
      this.touchApplied = false;
    }

    /**
     * Call listener with backward compatibility.
     *
     * @private
     * @param {string} name Name of listener.
     * @param {MouseEvent} event The event object.
     * @param {CellCoords} coords Coordinates.
     * @param {HTMLElement} target Event target.
     */
  }, {
    key: "callListener",
    value: function callListener(name, event, coords, target) {
      var listener = this.wtSettings.getSettingPure(name);
      if (listener) {
        listener(event, coords, target, this.facadeGetter());
      }
    }

    /**
     * Clears double-click timeouts and destroys the internal eventManager instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var priv = privatePool.get(this);
      clearTimeout(priv.dblClickTimeout[0]);
      clearTimeout(priv.dblClickTimeout[1]);
      this.eventManager.destroy();
    }
  }]);
  return Event;
}();
export default Event;