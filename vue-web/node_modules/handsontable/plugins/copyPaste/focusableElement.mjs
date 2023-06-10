import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-set.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.weak-map.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import EventManager from "../../eventManager.mjs";
import localHooks from "../../mixins/localHooks.mjs";
import { mixin } from "../../helpers/object.mjs";
import { isMobileBrowser } from "../../helpers/browser.mjs";
import { selectElementIfAllowed } from "../../helpers/dom/element.mjs"; /**
                                                                         * @private
                                                                         * @class FocusableWrapper
                                                                         */
var FocusableWrapper = /*#__PURE__*/function () {
  function FocusableWrapper(container) {
    _classCallCheck(this, FocusableWrapper);
    this.rootDocument = container.defaultView ? container : container.ownerDocument;
    /**
     * The main/operational focusable element.
     *
     * @type {HTMLElement}
     */
    this.mainElement = null;
    /**
     * Instance of EventManager.
     *
     * @type {EventManager}
     */
    this.eventManager = new EventManager(this);
    /**
     * An object for tracking information about event listeners attached to the focusable element.
     *
     * @type {WeakSet}
     */
    this.listenersCount = new WeakSet();
    /**
     * Parent for an focusable element.
     *
     * @type {HTMLElement}
     */
    this.container = container;
  }

  /**
   * Switch to the secondary focusable element. Used when no any main focusable element is provided.
   */
  _createClass(FocusableWrapper, [{
    key: "useSecondaryElement",
    value: function useSecondaryElement() {
      var el = createOrGetSecondaryElement(this.container);
      if (!this.listenersCount.has(el)) {
        this.listenersCount.add(el);
        forwardEventsToLocalHooks(this.eventManager, el, this);
      }
      this.mainElement = el;
    }

    /**
     * Switch to the main focusable element.
     *
     * @param {HTMLElement} element The DOM element.
     */
  }, {
    key: "setFocusableElement",
    value: function setFocusableElement(element) {
      if (!this.listenersCount.has(element)) {
        this.listenersCount.add(element);
        forwardEventsToLocalHooks(this.eventManager, element, this);
      }
      this.mainElement = element;
    }

    /**
     * Get currently set focusable element.
     *
     * @returns {HTMLElement}
     */
  }, {
    key: "getFocusableElement",
    value: function getFocusableElement() {
      return this.mainElement;
    }

    /**
     * Set focus to the focusable element.
     */
  }, {
    key: "focus",
    value: function focus() {
      // Add an empty space to texarea. It is necessary for safari to enable "copy" command from menu bar.
      this.mainElement.value = ' ';
      if (!isMobileBrowser()) {
        selectElementIfAllowed(this.mainElement);
      }
    }
  }]);
  return FocusableWrapper;
}();
mixin(FocusableWrapper, localHooks);
var refCounter = new WeakMap();

/**
 * Create and return the FocusableWrapper instance.
 *
 * @param {HTMLElement} container The container element, holder for focusable elements.
 * @returns {FocusableWrapper}
 */
function createElement(container) {
  var focusableWrapper = new FocusableWrapper(container);
  var counter = refCounter.get(container);
  counter = isNaN(counter) ? 0 : counter;
  refCounter.set(container, counter + 1);
  return focusableWrapper;
}

/**
 * Deactivate the FocusableWrapper instance.
 *
 * @param {FocusableWrapper} wrapper The instance of the FocusableWrapper class.
 */
function deactivateElement(wrapper) {
  wrapper.eventManager.clear();
}
var runLocalHooks = function runLocalHooks(eventName, subject) {
  return function (event) {
    return subject.runLocalHooks(eventName, event);
  };
};

/**
 * Register copy/cut/paste events and forward their actions to the subject local hooks system.
 *
 * @param {EventManager} eventManager The instance of the EventManager class.
 * @param {HTMLElement} element The element on which the listeners are mounted.
 * @param {FocusableWrapper} subject The subject object for local hooks.
 */
function forwardEventsToLocalHooks(eventManager, element, subject) {
  eventManager.addEventListener(element, 'copy', runLocalHooks('copy', subject));
  eventManager.addEventListener(element, 'cut', runLocalHooks('cut', subject));
  eventManager.addEventListener(element, 'paste', runLocalHooks('paste', subject));
}
var secondaryElements = new WeakMap();

/**
 * Create and attach newly created focusable element to the DOM.
 *
 * @param {HTMLElement} container The container element, holder for focusable elements.
 * @returns {HTMLElement}
 */
function createOrGetSecondaryElement(container) {
  var secondaryElement = secondaryElements.get(container);
  if (secondaryElement) {
    if (!secondaryElement.parentElement) {
      container.appendChild(secondaryElement);
    }
    return secondaryElement;
  }
  var doc = container.defaultView ? container : container.ownerDocument;
  var element = doc.createElement('textarea');
  secondaryElements.set(container, element);
  element.setAttribute('data-hot-input', ''); // Makes the element recognizable by Hot as its own component's element.
  element.className = 'HandsontableCopyPaste';
  element.tabIndex = -1;
  element.autocomplete = 'off';
  element.wrap = 'hard';
  element.value = ' ';
  container.appendChild(element);
  return element;
}

/**
 * Destroy the FocusableWrapper instance.
 *
 * @param {FocusableWrapper} wrapper The instance of the FocusableWrapper class.
 */
function destroyElement(wrapper) {
  if (!(wrapper instanceof FocusableWrapper)) {
    return;
  }
  var counter = refCounter.get(wrapper.container);
  counter = isNaN(counter) ? 0 : counter;
  if (counter > 0) {
    counter -= 1;
  }
  deactivateElement(wrapper);
  if (counter <= 0) {
    counter = 0;

    // Detach secondary element from the DOM.
    var secondaryElement = secondaryElements.get(wrapper.container);
    if (secondaryElement && secondaryElement.parentNode) {
      secondaryElement.parentNode.removeChild(secondaryElement);
      secondaryElements.delete(wrapper.container);
    }
    wrapper.mainElement = null;
  }
  refCounter.set(wrapper.container, counter);
}
export { createElement, deactivateElement, destroyElement };