import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/web.timers.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { getScrollableElement, getScrollbarWidth } from "../../../helpers/dom/element.mjs";
import { arrayEach } from "../../../helpers/array.mjs";
import { isKey } from "../../../helpers/unicode.mjs";
import { isChrome } from "../../../helpers/browser.mjs";
import { InlineStartOverlay, TopOverlay, TopInlineStartCornerOverlay, BottomOverlay, BottomInlineStartCornerOverlay } from "./overlay/index.mjs"; /**
                                                                                                                                                   * @class Overlays
                                                                                                                                                   */
var Overlays = /*#__PURE__*/function () {
  /**
   * Walkontable instance's reference.
   *
   * @protected
   * @type {Walkontable}
   */

  /**
   * Refer to the TopOverlay instance.
   *
   * @protected
   * @type {TopOverlay}
   */

  /**
   * Refer to the BottomOverlay instance.
   *
   * @protected
   * @type {BottomOverlay}
   */

  /**
   * Refer to the InlineStartOverlay or instance.
   *
   * @protected
   * @type {InlineStartOverlay}
   */

  /**
   * Refer to the TopInlineStartCornerOverlay instance.
   *
   * @protected
   * @type {TopInlineStartCornerOverlay}
   */

  /**
   * Refer to the BottomInlineStartCornerOverlay instance.
   *
   * @protected
   * @type {BottomInlineStartCornerOverlay}
   */

  /**
   * Browser line height for purposes of translating mouse wheel.
   *
   * @private
   * @type {number}
   */

  /**
   * The walkontable settings.
   *
   * @protected
   * @type {Settings}
   */

  /**
   * @param {Walkontable} wotInstance The Walkontable instance. @todo refactoring remove.
   * @param {FacadeGetter} facadeGetter Function which return proper facade.
   * @param {DomBindings} domBindings Bindings into DOM.
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {EventManager} eventManager The walkontable event manager.
   * @param {MasterTable} wtTable The master table.
   */
  function Overlays(wotInstance, facadeGetter, domBindings, wtSettings, eventManager, wtTable) {
    _classCallCheck(this, Overlays);
    _defineProperty(this, "wot", null);
    _defineProperty(this, "topOverlay", null);
    _defineProperty(this, "bottomOverlay", null);
    _defineProperty(this, "inlineStartOverlay", null);
    _defineProperty(this, "topInlineStartCornerOverlay", null);
    _defineProperty(this, "bottomInlineStartCornerOverlay", null);
    _defineProperty(this, "browserLineHeight", undefined);
    _defineProperty(this, "wtSettings", null);
    this.wot = wotInstance;
    this.wtSettings = wtSettings;
    this.domBindings = domBindings;
    this.facadeGetter = facadeGetter;
    this.wtTable = wtTable;
    var _this$domBindings = this.domBindings,
      rootDocument = _this$domBindings.rootDocument,
      rootWindow = _this$domBindings.rootWindow;

    // legacy support
    this.instance = this.wot; // todo refactoring: move to facade
    this.eventManager = eventManager;

    // TODO refactoring: probably invalid place to this logic
    this.scrollbarSize = getScrollbarWidth(rootDocument);
    var isOverflowHidden = rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden';
    this.scrollableElement = isOverflowHidden ? wtTable.holder : getScrollableElement(wtTable.TABLE);
    this.initOverlays();
    this.hasScrollbarBottom = false;
    this.hasScrollbarRight = false;
    this.destroyed = false;
    this.keyPressed = false;
    this.spreaderLastSize = {
      width: null,
      height: null
    };
    this.verticalScrolling = false;
    this.horizontalScrolling = false;
    this.initBrowserLineHeight();
    this.registerListeners();
    this.lastScrollX = rootWindow.scrollX;
    this.lastScrollY = rootWindow.scrollY;
  }

  /**
   * Retrieve browser line height and apply its value to `browserLineHeight`.
   *
   * @private
   */
  _createClass(Overlays, [{
    key: "initBrowserLineHeight",
    value: function initBrowserLineHeight() {
      var _this$domBindings2 = this.domBindings,
        rootWindow = _this$domBindings2.rootWindow,
        rootDocument = _this$domBindings2.rootDocument;
      var computedStyle = rootWindow.getComputedStyle(rootDocument.body);
      /**
       * Sometimes `line-height` might be set to 'normal'. In that case, a default `font-size` should be multiplied by roughly 1.2.
       * Https://developer.mozilla.org/pl/docs/Web/CSS/line-height#Values.
       */
      var lineHeight = parseInt(computedStyle.lineHeight, 10);
      var lineHeightFalback = parseInt(computedStyle.fontSize, 10) * 1.2;
      this.browserLineHeight = lineHeight || lineHeightFalback;
    }

    /**
     * Prepare overlays based on user settings.
     *
     * @private
     */
  }, {
    key: "initOverlays",
    value: function initOverlays() {
      var args = [this.wot, this.facadeGetter, this.wtSettings, this.domBindings];

      // todo refactoring: IOC, collection or factories.
      // TODO refactoring, conceive about using generic collection of overlays.
      this.topOverlay = _construct(TopOverlay, args);
      this.bottomOverlay = _construct(BottomOverlay, args);
      this.inlineStartOverlay = _construct(InlineStartOverlay, args);

      // TODO discuss, the controversial here would be removing the lazy creation mechanism for corners.
      // TODO cond. Has no any visual impact. They're initially hidden in same way like left, top, and bottom overlays.
      this.topInlineStartCornerOverlay = _construct(TopInlineStartCornerOverlay, args.concat([this.topOverlay, this.inlineStartOverlay]));
      this.bottomInlineStartCornerOverlay = _construct(BottomInlineStartCornerOverlay, args.concat([this.bottomOverlay, this.inlineStartOverlay]));
    }

    /**
     * Update state of rendering, check if changed.
     *
     * @package
     * @returns {boolean} Returns `true` if changes applied to overlay needs scroll synchronization.
     */
  }, {
    key: "updateStateOfRendering",
    value: function updateStateOfRendering() {
      var syncScroll = this.topOverlay.updateStateOfRendering();
      syncScroll = this.bottomOverlay.updateStateOfRendering() || syncScroll;
      syncScroll = this.inlineStartOverlay.updateStateOfRendering() || syncScroll;

      // todo refactoring: move conditions into updateStateOfRendering(),
      if (this.inlineStartOverlay.needFullRender) {
        if (this.topOverlay.needFullRender) {
          syncScroll = this.topInlineStartCornerOverlay.updateStateOfRendering() || syncScroll;
        }
        if (this.bottomOverlay.needFullRender) {
          syncScroll = this.bottomInlineStartCornerOverlay.updateStateOfRendering() || syncScroll;
        }
      }
      return syncScroll;
    }

    /**
     * Refresh and redraw table.
     */
  }, {
    key: "refreshAll",
    value: function refreshAll() {
      if (!this.wot.drawn) {
        return;
      }
      if (!this.wtTable.holder.parentNode) {
        // Walkontable was detached from DOM, but this handler was not removed
        this.destroy();
        return;
      }
      this.wot.draw(true);
      if (this.verticalScrolling) {
        this.inlineStartOverlay.onScroll(); // todo the inlineStartOverlay.onScroll() fires hook. Why is it needed there, not in any another place?
      }

      if (this.horizontalScrolling) {
        this.topOverlay.onScroll();
      }
      this.verticalScrolling = false;
      this.horizontalScrolling = false;
    }

    /**
     * Register all necessary event listeners.
     */
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this = this;
      var _this$domBindings3 = this.domBindings,
        rootDocument = _this$domBindings3.rootDocument,
        rootWindow = _this$domBindings3.rootWindow;
      var topOverlayScrollableElement = this.topOverlay.mainTableScrollableElement;
      var inlineStartOverlayScrollableElement = this.inlineStartOverlay.mainTableScrollableElement;
      this.eventManager.addEventListener(rootDocument.documentElement, 'keydown', function (event) {
        return _this.onKeyDown(event);
      });
      this.eventManager.addEventListener(rootDocument.documentElement, 'keyup', function () {
        return _this.onKeyUp();
      });
      this.eventManager.addEventListener(rootDocument, 'visibilitychange', function () {
        return _this.onKeyUp();
      });
      this.eventManager.addEventListener(topOverlayScrollableElement, 'scroll', function (event) {
        return _this.onTableScroll(event);
      }, {
        passive: true
      });
      if (topOverlayScrollableElement !== inlineStartOverlayScrollableElement) {
        this.eventManager.addEventListener(inlineStartOverlayScrollableElement, 'scroll', function (event) {
          return _this.onTableScroll(event);
        }, {
          passive: true
        });
      }
      var isHighPixelRatio = rootWindow.devicePixelRatio && rootWindow.devicePixelRatio > 1;
      var isScrollOnWindow = this.scrollableElement === rootWindow;
      var preventWheel = this.wtSettings.getSetting('preventWheel');
      var wheelEventOptions = {
        passive: isScrollOnWindow
      };
      if (preventWheel || isHighPixelRatio || !isChrome()) {
        this.eventManager.addEventListener(this.wtTable.wtRootElement, 'wheel', function (event) {
          return _this.onCloneWheel(event, preventWheel);
        }, wheelEventOptions);
      }
      var overlays = [this.topOverlay, this.bottomOverlay, this.inlineStartOverlay, this.topInlineStartCornerOverlay, this.bottomInlineStartCornerOverlay];
      overlays.forEach(function (overlay) {
        if (overlay && overlay.needFullRender) {
          var holder = overlay.clone.wtTable.holder; // todo rethink, maybe: overlay.getHolder()

          _this.eventManager.addEventListener(holder, 'wheel', function (event) {
            return _this.onCloneWheel(event, preventWheel);
          }, wheelEventOptions);
        }
      });
      var resizeTimeout;
      this.eventManager.addEventListener(rootWindow, 'resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          _this.wtSettings.getSetting('onWindowResize');
        }, 200);
      });
    }

    /**
     * Deregister all previously registered listeners.
     */
  }, {
    key: "deregisterListeners",
    value: function deregisterListeners() {
      this.eventManager.clearEvents(true);
    }

    /**
     * Scroll listener.
     *
     * @param {Event} event The mouse event object.
     */
  }, {
    key: "onTableScroll",
    value: function onTableScroll(event) {
      // There was if statement which controlled flow of this function. It avoided the execution of the next lines
      // on mobile devices. It was changed. Broader description of this case is included within issue #4856.
      var rootWindow = this.domBindings.rootWindow;
      var masterHorizontal = this.inlineStartOverlay.mainTableScrollableElement;
      var masterVertical = this.topOverlay.mainTableScrollableElement;
      var target = event.target;

      // For key press, sync only master -> overlay position because while pressing Walkontable.render is triggered
      // by hot.refreshBorder
      if (this.keyPressed) {
        if (masterVertical !== rootWindow && target !== rootWindow && !event.target.contains(masterVertical) || masterHorizontal !== rootWindow && target !== rootWindow && !event.target.contains(masterHorizontal)) {
          return;
        }
      }
      this.syncScrollPositions(event);
    }

    /**
     * Wheel listener for cloned overlays.
     *
     * @param {Event} event The mouse event object.
     * @param {boolean} preventDefault If `true`, the `preventDefault` will be called on event object.
     */
  }, {
    key: "onCloneWheel",
    value: function onCloneWheel(event, preventDefault) {
      var rootWindow = this.domBindings.rootWindow;

      // There was if statement which controlled flow of this function. It avoided the execution of the next lines
      // on mobile devices. It was changed. Broader description of this case is included within issue #4856.

      var masterHorizontal = this.inlineStartOverlay.mainTableScrollableElement;
      var masterVertical = this.topOverlay.mainTableScrollableElement;
      var target = event.target;

      // For key press, sync only master -> overlay position because while pressing Walkontable.render is triggered
      // by hot.refreshBorder
      var shouldNotWheelVertically = masterVertical !== rootWindow && target !== rootWindow && !target.contains(masterVertical);
      var shouldNotWheelHorizontally = masterHorizontal !== rootWindow && target !== rootWindow && !target.contains(masterHorizontal);
      if (this.keyPressed && (shouldNotWheelVertically || shouldNotWheelHorizontally)) {
        return;
      }
      var isScrollPossible = this.translateMouseWheelToScroll(event);
      if (preventDefault || this.scrollableElement !== rootWindow && isScrollPossible) {
        event.preventDefault();
      }
    }

    /**
     * Key down listener.
     *
     * @param {Event} event The keyboard event object.
     */
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      this.keyPressed = isKey(event.keyCode, 'ARROW_UP|ARROW_RIGHT|ARROW_DOWN|ARROW_LEFT');
    }

    /**
     * Key up listener.
     */
  }, {
    key: "onKeyUp",
    value: function onKeyUp() {
      this.keyPressed = false;
    }

    /**
     * Translate wheel event into scroll event and sync scroll overlays position.
     *
     * @private
     * @param {Event} event The mouse event object.
     * @returns {boolean}
     */
  }, {
    key: "translateMouseWheelToScroll",
    value: function translateMouseWheelToScroll(event) {
      var deltaY = isNaN(event.deltaY) ? -1 * event.wheelDeltaY : event.deltaY;
      var deltaX = isNaN(event.deltaX) ? -1 * event.wheelDeltaX : event.deltaX;
      if (event.deltaMode === 1) {
        deltaX += deltaX * this.browserLineHeight;
        deltaY += deltaY * this.browserLineHeight;
      }
      var isScrollVerticallyPossible = this.scrollVertically(deltaY);
      var isScrollHorizontallyPossible = this.scrollHorizontally(deltaX);
      return isScrollVerticallyPossible || isScrollHorizontallyPossible;
    }

    /**
     * Scrolls main scrollable element horizontally.
     *
     * @param {number} delta Relative value to scroll.
     * @returns {boolean}
     */
  }, {
    key: "scrollVertically",
    value: function scrollVertically(delta) {
      var previousScroll = this.scrollableElement.scrollTop;
      this.scrollableElement.scrollTop += delta;
      return previousScroll !== this.scrollableElement.scrollTop;
    }

    /**
     * Scrolls main scrollable element horizontally.
     *
     * @param {number} delta Relative value to scroll.
     * @returns {boolean}
     */
  }, {
    key: "scrollHorizontally",
    value: function scrollHorizontally(delta) {
      var previousScroll = this.scrollableElement.scrollLeft;
      this.scrollableElement.scrollLeft += delta;
      return previousScroll !== this.scrollableElement.scrollLeft;
    }

    /**
     * Synchronize scroll position between master table and overlay table.
     *
     * @private
     */
  }, {
    key: "syncScrollPositions",
    value: function syncScrollPositions() {
      if (this.destroyed) {
        return;
      }
      var rootWindow = this.domBindings.rootWindow;
      var topHolder = this.topOverlay.clone.wtTable.holder; // todo rethink
      var leftHolder = this.inlineStartOverlay.clone.wtTable.holder; // todo rethink

      var _ref = [this.scrollableElement.scrollLeft, this.scrollableElement.scrollTop],
        scrollLeft = _ref[0],
        scrollTop = _ref[1];
      this.horizontalScrolling = topHolder.scrollLeft !== scrollLeft || this.lastScrollX !== rootWindow.scrollX;
      this.verticalScrolling = leftHolder.scrollTop !== scrollTop || this.lastScrollY !== rootWindow.scrollY;
      this.lastScrollX = rootWindow.scrollX;
      this.lastScrollY = rootWindow.scrollY;
      if (this.horizontalScrolling) {
        topHolder.scrollLeft = scrollLeft;
        var bottomHolder = this.bottomOverlay.needFullRender ? this.bottomOverlay.clone.wtTable.holder : null; // todo rethink

        if (bottomHolder) {
          bottomHolder.scrollLeft = scrollLeft;
        }
      }
      if (this.verticalScrolling) {
        leftHolder.scrollTop = scrollTop;
      }
      this.refreshAll();
    }

    /**
     * Synchronize overlay scrollbars with the master scrollbar.
     */
  }, {
    key: "syncScrollWithMaster",
    value: function syncScrollWithMaster() {
      var master = this.topOverlay.mainTableScrollableElement;
      var scrollLeft = master.scrollLeft,
        scrollTop = master.scrollTop;
      if (this.topOverlay.needFullRender) {
        this.topOverlay.clone.wtTable.holder.scrollLeft = scrollLeft; // todo rethink, *overlay.setScroll*()
      }

      if (this.bottomOverlay.needFullRender) {
        this.bottomOverlay.clone.wtTable.holder.scrollLeft = scrollLeft; // todo rethink, *overlay.setScroll*()
      }

      if (this.inlineStartOverlay.needFullRender) {
        this.inlineStartOverlay.clone.wtTable.holder.scrollTop = scrollTop; // todo rethink, *overlay.setScroll*()
      }
    }

    /**
     * Update the main scrollable elements for all the overlays.
     */
  }, {
    key: "updateMainScrollableElements",
    value: function updateMainScrollableElements() {
      this.deregisterListeners();
      this.inlineStartOverlay.updateMainScrollableElement();
      this.topOverlay.updateMainScrollableElement();
      if (this.bottomOverlay.needFullRender) {
        this.bottomOverlay.updateMainScrollableElement();
      }
      var wtTable = this.wtTable;
      var rootWindow = this.domBindings.rootWindow;
      if (rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden') {
        this.scrollableElement = wtTable.holder;
      } else {
        this.scrollableElement = getScrollableElement(wtTable.TABLE);
      }
      this.registerListeners();
    }

    /**
     *
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.eventManager.destroy();
      // todo, probably all below `destory` calls has no sense. To analyze
      this.topOverlay.destroy();
      if (this.bottomOverlay.clone) {
        this.bottomOverlay.destroy();
      }
      this.inlineStartOverlay.destroy();
      if (this.topInlineStartCornerOverlay) {
        this.topInlineStartCornerOverlay.destroy();
      }
      if (this.bottomInlineStartCornerOverlay && this.bottomInlineStartCornerOverlay.clone) {
        this.bottomInlineStartCornerOverlay.destroy();
      }
      this.destroyed = true;
    }

    /**
     * @param {boolean} [fastDraw=false] When `true`, try to refresh only the positions of borders without rerendering
     *                                   the data. It will only work if Table.draw() does not force
     *                                   rendering anyway.
     */
  }, {
    key: "refresh",
    value: function refresh() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var spreader = this.wtTable.spreader;
      var width = spreader.clientWidth;
      var height = spreader.clientHeight;
      if (width !== this.spreaderLastSize.width || height !== this.spreaderLastSize.height) {
        this.spreaderLastSize.width = width;
        this.spreaderLastSize.height = height;
        this.adjustElementsSize();
      }
      if (this.bottomOverlay.clone) {
        this.bottomOverlay.refresh(fastDraw);
      }
      this.inlineStartOverlay.refresh(fastDraw);
      this.topOverlay.refresh(fastDraw);
      if (this.topInlineStartCornerOverlay) {
        this.topInlineStartCornerOverlay.refresh(fastDraw);
      }
      if (this.bottomInlineStartCornerOverlay && this.bottomInlineStartCornerOverlay.clone) {
        this.bottomInlineStartCornerOverlay.refresh(fastDraw);
      }
    }

    /**
     * Adjust overlays elements size and master table size.
     *
     * @param {boolean} [force=false] When `true`, it adjust the DOM nodes sizes for all overlays.
     */
  }, {
    key: "adjustElementsSize",
    value: function adjustElementsSize() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var wtViewport = this.wot.wtViewport;
      var wtTable = this.wtTable;
      var totalColumns = this.wtSettings.getSetting('totalColumns');
      var totalRows = this.wtSettings.getSetting('totalRows');
      var headerRowSize = wtViewport.getRowHeaderWidth();
      var headerColumnSize = wtViewport.getColumnHeaderHeight();
      var hiderStyle = wtTable.hider.style;
      hiderStyle.width = "".concat(headerRowSize + this.inlineStartOverlay.sumCellSizes(0, totalColumns), "px");
      hiderStyle.height = "".concat(headerColumnSize + this.topOverlay.sumCellSizes(0, totalRows) + 1, "px");
      if (this.scrollbarSize > 0) {
        // todo refactoring, looking as a part of logic which should be moved outside the class
        var _wtTable$wtRootElemen = wtTable.wtRootElement,
          rootElemScrollHeight = _wtTable$wtRootElemen.scrollHeight,
          rootElemScrollWidth = _wtTable$wtRootElemen.scrollWidth;
        var _wtTable$holder = wtTable.holder,
          holderScrollHeight = _wtTable$holder.scrollHeight,
          holderScrollWidth = _wtTable$holder.scrollWidth;
        this.hasScrollbarRight = rootElemScrollHeight < holderScrollHeight;
        this.hasScrollbarBottom = rootElemScrollWidth < holderScrollWidth;
        if (this.hasScrollbarRight && wtTable.hider.scrollWidth + this.scrollbarSize > rootElemScrollWidth) {
          this.hasScrollbarBottom = true;
        } else if (this.hasScrollbarBottom && wtTable.hider.scrollHeight + this.scrollbarSize > rootElemScrollHeight) {
          this.hasScrollbarRight = true;
        }
      }
      this.topOverlay.adjustElementsSize(force);
      this.inlineStartOverlay.adjustElementsSize(force);
      this.bottomOverlay.adjustElementsSize(force);
    }

    /**
     *
     */
  }, {
    key: "applyToDOM",
    value: function applyToDOM() {
      if (!this.wtTable.isVisible()) {
        return;
      }
      this.topOverlay.applyToDOM();
      if (this.bottomOverlay.clone) {
        this.bottomOverlay.applyToDOM();
      }
      this.inlineStartOverlay.applyToDOM();
    }

    /**
     * Get the parent overlay of the provided element.
     *
     * @param {HTMLElement} element An element to process.
     * @returns {object|null}
     */
  }, {
    key: "getParentOverlay",
    value: function getParentOverlay(element) {
      if (!element) {
        return null;
      }
      var overlays = [this.topOverlay, this.inlineStartOverlay, this.bottomOverlay, this.topInlineStartCornerOverlay, this.bottomInlineStartCornerOverlay];
      var result = null;
      arrayEach(overlays, function (overlay) {
        if (!overlay) {
          return;
        }
        if (overlay.clone && overlay.clone.wtTable.TABLE.contains(element)) {
          // todo demeter
          result = overlay.clone;
        }
      });
      return result;
    }

    /**
     * Synchronize the class names between the main overlay table and the tables on the other overlays.
     *
     */
  }, {
    key: "syncOverlayTableClassNames",
    value: function syncOverlayTableClassNames() {
      var masterTable = this.wtTable.TABLE;
      var overlays = [this.topOverlay, this.inlineStartOverlay, this.bottomOverlay, this.topInlineStartCornerOverlay, this.bottomInlineStartCornerOverlay];
      arrayEach(overlays, function (elem) {
        if (!elem) {
          return;
        }
        elem.clone.wtTable.TABLE.className = masterTable.className; // todo demeter
      });
    }
  }]);
  return Overlays;
}();
export default Overlays;