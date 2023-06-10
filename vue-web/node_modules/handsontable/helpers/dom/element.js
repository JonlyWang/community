"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.function.name.js");
exports.__esModule = true;
exports.HTML_CHARACTERS = void 0;
exports.addClass = addClass;
exports.addEvent = addEvent;
exports.clearTextSelection = clearTextSelection;
exports.closest = closest;
exports.closestDown = closestDown;
exports.empty = empty;
exports.fastInnerHTML = fastInnerHTML;
exports.fastInnerText = fastInnerText;
exports.getCaretPosition = getCaretPosition;
exports.getComputedStyle = getComputedStyle;
exports.getCssTransform = getCssTransform;
exports.getFrameElement = getFrameElement;
exports.getParent = getParent;
exports.getParentWindow = getParentWindow;
exports.getScrollLeft = getScrollLeft;
exports.getScrollTop = getScrollTop;
exports.getScrollableElement = getScrollableElement;
exports.getScrollbarWidth = getScrollbarWidth;
exports.getSelectionEndPosition = getSelectionEndPosition;
exports.getSelectionText = getSelectionText;
exports.getStyle = getStyle;
exports.getTrimmingContainer = getTrimmingContainer;
exports.getWindowScrollLeft = getWindowScrollLeft;
exports.getWindowScrollTop = getWindowScrollTop;
exports.hasAccessToParentWindow = hasAccessToParentWindow;
exports.hasClass = hasClass;
exports.hasHorizontalScrollbar = hasHorizontalScrollbar;
exports.hasVerticalScrollbar = hasVerticalScrollbar;
exports.index = index;
exports.innerHeight = innerHeight;
exports.innerWidth = innerWidth;
exports.isChildOf = isChildOf;
exports.isDetached = isDetached;
exports.isInput = isInput;
exports.isOutsideInput = isOutsideInput;
exports.isVisible = isVisible;
exports.matchesCSSRules = matchesCSSRules;
exports.offset = offset;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.overlayContainsElement = overlayContainsElement;
exports.removeClass = removeClass;
exports.removeEvent = removeEvent;
exports.removeTextNodes = removeTextNodes;
exports.resetCssTransform = resetCssTransform;
exports.selectElementIfAllowed = selectElementIfAllowed;
exports.setCaretPosition = setCaretPosition;
exports.setOverlayPosition = setOverlayPosition;
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.array.concat.js");
var _feature = require("../feature");
var _browser = require("../browser");
var _string = require("../string");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Get the parent of the specified node in the DOM tree.
 *
 * @param {HTMLElement} element Element from which traversing is started.
 * @param {number} [level=0] Traversing deep level.
 * @returns {HTMLElement|null}
 */
function getParent(element) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var iteration = -1;
  var parent = null;
  var elementToCheck = element;
  while (elementToCheck !== null) {
    if (iteration === level) {
      parent = elementToCheck;
      break;
    }
    if (elementToCheck.host && elementToCheck.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      elementToCheck = elementToCheck.host;
    } else {
      iteration += 1;
      elementToCheck = elementToCheck.parentNode;
    }
  }
  return parent;
}

/**
 * Gets `frameElement` of the specified frame. Returns null if it is a top frame or if script has no access to read property.
 *
 * @param {Window} frame Frame from which should be get frameElement in safe way.
 * @returns {HTMLIFrameElement|null}
 */
function getFrameElement(frame) {
  return Object.getPrototypeOf(frame.parent) && frame.frameElement;
}

/**
 * Gets parent frame of the specified frame. Returns null if it is a top frame or if script has no access to read property.
 *
 * @param {Window} frame Frame from which should be get frameElement in safe way.
 * @returns {Window|null}
 */
function getParentWindow(frame) {
  return getFrameElement(frame) && frame.parent;
}

/**
 * Checks if script has access to read from parent frame of specified frame.
 *
 * @param {Window} frame Frame from which should be get frameElement in safe way.
 * @returns {boolean}
 */
function hasAccessToParentWindow(frame) {
  return !!Object.getPrototypeOf(frame.parent);
}

/**
 * Goes up the DOM tree (including given element) until it finds an parent element that matches the nodes or nodes name.
 * This method goes up through web components.
 *
 * @param {Node} element Element from which traversing is started.
 * @param {Array<string|Node>} [nodes] Array of elements or Array of elements name (in uppercase form).
 * @param {Node} [until] The element until the traversing ends.
 * @returns {Node|null}
 */
function closest(element) {
  var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var until = arguments.length > 2 ? arguments[2] : undefined;
  var _Node = Node,
    ELEMENT_NODE = _Node.ELEMENT_NODE,
    DOCUMENT_FRAGMENT_NODE = _Node.DOCUMENT_FRAGMENT_NODE;
  var elementToCheck = element;
  while (elementToCheck !== null && elementToCheck !== void 0 && elementToCheck !== until) {
    var _elementToCheck = elementToCheck,
      nodeType = _elementToCheck.nodeType,
      nodeName = _elementToCheck.nodeName;
    if (nodeType === ELEMENT_NODE && (nodes.includes(nodeName) || nodes.includes(elementToCheck))) {
      return elementToCheck;
    }
    var _elementToCheck2 = elementToCheck,
      host = _elementToCheck2.host;
    if (host && nodeType === DOCUMENT_FRAGMENT_NODE) {
      elementToCheck = host;
    } else {
      elementToCheck = elementToCheck.parentNode;
    }
  }
  return null;
}

/**
 * Goes "down" the DOM tree (including given element) until it finds an element that matches the nodes or nodes name.
 *
 * @param {HTMLElement} element Element from which traversing is started.
 * @param {Array} nodes Array of elements or Array of elements name.
 * @param {HTMLElement} [until] The list of elements until the traversing ends.
 * @returns {HTMLElement|null}
 */
function closestDown(element, nodes, until) {
  var matched = [];
  var elementToCheck = element;
  while (elementToCheck) {
    elementToCheck = closest(elementToCheck, nodes, until);
    if (!elementToCheck || until && !until.contains(elementToCheck)) {
      break;
    }
    matched.push(elementToCheck);
    if (elementToCheck.host && elementToCheck.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      elementToCheck = elementToCheck.host;
    } else {
      elementToCheck = elementToCheck.parentNode;
    }
  }
  var length = matched.length;
  return length ? matched[length - 1] : null;
}

/**
 * Goes up the DOM tree and checks if element is child of another element.
 *
 * @param {HTMLElement} child Child element An element to check.
 * @param {object|string} parent Parent element OR selector of the parent element.
 *                               If string provided, function returns `true` for the first occurrence of element with that class.
 * @returns {boolean}
 */
function isChildOf(child, parent) {
  var node = child.parentNode;
  var queriedParents = [];
  if (typeof parent === 'string') {
    if (child.defaultView) {
      queriedParents = Array.prototype.slice.call(child.querySelectorAll(parent), 0);
    } else {
      queriedParents = Array.prototype.slice.call(child.ownerDocument.querySelectorAll(parent), 0);
    }
  } else {
    queriedParents.push(parent);
  }
  while (node !== null) {
    if (queriedParents.indexOf(node) > -1) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

/**
 * Counts index of element within its parent.
 * WARNING: for performance reasons, assumes there are only element nodes (no text nodes). This is true
 * for Walkotnable, otherwise would need to check for nodeType or use previousElementSibling.
 *
 * @see http://jsperf.com/sibling-index/10
 * @param {Element} element The element to check.
 * @returns {number}
 */
function index(element) {
  var i = 0;
  var elementToCheck = element;
  if (elementToCheck.previousSibling) {
    /* eslint-disable no-cond-assign */
    while (elementToCheck = elementToCheck.previousSibling) {
      i += 1;
    }
  }
  return i;
}

/**
 * Check if the provided overlay contains the provided element.
 *
 * @param {string} overlayType The type of the overlay.
 * @param {HTMLElement} element An element to check.
 * @param {HTMLElement} root The root element.
 * @returns {boolean}
 */
function overlayContainsElement(overlayType, element, root) {
  var overlayElement = root.parentElement.querySelector(".ht_clone_".concat(overlayType));
  return overlayElement ? overlayElement.contains(element) : null;
}
var _hasClass;
var _addClass;
var _removeClass;

/**
 * @param {string} classNames The element "class" attribute string.
 * @returns {string[]}
 */
function filterEmptyClassNames(classNames) {
  if (!classNames || !classNames.length) {
    return [];
  }
  return classNames.filter(function (x) {
    return !!x;
  });
}
if ((0, _feature.isClassListSupported)()) {
  var isSupportMultipleClassesArg = function isSupportMultipleClassesArg(rootDocument) {
    var element = rootDocument.createElement('div');
    element.classList.add('test', 'test2');
    return element.classList.contains('test2');
  };
  _hasClass = function _hasClass(element, className) {
    if (element.classList === void 0 || typeof className !== 'string' || className === '') {
      return false;
    }
    return element.classList.contains(className);
  };
  _addClass = function _addClass(element, classes) {
    var rootDocument = element.ownerDocument;
    var className = classes;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    className = filterEmptyClassNames(className);
    if (className.length > 0) {
      if (isSupportMultipleClassesArg(rootDocument)) {
        var _element$classList;
        (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(className));
      } else {
        var len = 0;
        while (className[len]) {
          element.classList.add(className[len]);
          len += 1;
        }
      }
    }
  };
  _removeClass = function _removeClass(element, classes) {
    var rootDocument = element.ownerDocument;
    var className = classes;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    className = filterEmptyClassNames(className);
    if (className.length > 0) {
      if (isSupportMultipleClassesArg(rootDocument)) {
        var _element$classList2;
        (_element$classList2 = element.classList).remove.apply(_element$classList2, _toConsumableArray(className));
      } else {
        var len = 0;
        while (className[len]) {
          element.classList.remove(className[len]);
          len += 1;
        }
      }
    }
  };
} else {
  var createClassNameRegExp = function createClassNameRegExp(className) {
    return new RegExp("(\\s|^)".concat(className, "(\\s|$)"));
  };
  _hasClass = function _hasClass(element, className) {
    // http://snipplr.com/view/3561/addclass-removeclass-hasclass/
    return element.className !== void 0 && createClassNameRegExp(className).test(element.className);
  };
  _addClass = function _addClass(element, classes) {
    var _className = element.className;
    var className = classes;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    className = filterEmptyClassNames(className);
    if (_className === '') {
      _className = className.join(' ');
    } else {
      for (var len = 0; len < className.length; len++) {
        if (className[len] && !createClassNameRegExp(className[len]).test(_className)) {
          _className += " ".concat(className[len]);
        }
      }
    }
    element.className = _className;
  };
  _removeClass = function _removeClass(element, classes) {
    var len = 0;
    var _className = element.className;
    var className = classes;
    if (typeof className === 'string') {
      className = className.split(' ');
    }
    className = filterEmptyClassNames(className);
    while (className[len]) {
      // String.prototype.trim is defined in polyfill.js
      _className = _className.replace(createClassNameRegExp(className[len]), ' ').trim();
      len += 1;
    }
    if (element.className !== _className) {
      element.className = _className;
    }
  };
}

/**
 * Checks if element has class name.
 *
 * @param {HTMLElement} element An element to check.
 * @param {string} className Class name to check.
 * @returns {boolean}
 */
function hasClass(element, className) {
  return _hasClass(element, className);
}

/**
 * Add class name to an element.
 *
 * @param {HTMLElement} element An element to process.
 * @param {string|Array} className Class name as string or array of strings.
 */
function addClass(element, className) {
  _addClass(element, className);
}

/**
 * Remove class name from an element.
 *
 * @param {HTMLElement} element An element to process.
 * @param {string|Array} className Class name as string or array of strings.
 */
function removeClass(element, className) {
  _removeClass(element, className);
}

/**
 * @param {HTMLElement} element An element from the text is removed.
 */
function removeTextNodes(element) {
  if (element.nodeType === 3) {
    element.parentNode.removeChild(element); // bye text nodes!
  } else if (['TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'].indexOf(element.nodeName) > -1) {
    var childs = element.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
      removeTextNodes(childs[i]);
    }
  }
}

/**
 * Remove childs function
 * WARNING - this doesn't unload events and data attached by jQuery
 * http://jsperf.com/jquery-html-vs-empty-vs-innerhtml/9
 * http://jsperf.com/jquery-html-vs-empty-vs-innerhtml/11 - no siginificant improvement with Chrome remove() method.
 *
 * @param {HTMLElement} element An element to clear.
 */
function empty(element) {
  var child;

  /* eslint-disable no-cond-assign */
  while (child = element.lastChild) {
    element.removeChild(child);
  }
}
var HTML_CHARACTERS = /(<(.*)>|&(.*);)/;

/**
 * Insert content into element trying avoid innerHTML method.
 *
 * @param {HTMLElement} element An element to write into.
 * @param {string} content The text to write.
 * @param {boolean} [sanitizeContent=true] If `true`, the content will be sanitized before writing to the element.
 */
exports.HTML_CHARACTERS = HTML_CHARACTERS;
function fastInnerHTML(element, content) {
  var sanitizeContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (HTML_CHARACTERS.test(content)) {
    element.innerHTML = sanitizeContent ? (0, _string.sanitize)(content) : content;
  } else {
    fastInnerText(element, content);
  }
}

/**
 * Insert text content into element.
 *
 * @param {HTMLElement} element An element to write into.
 * @param {string} content The text to write.
 */
function fastInnerText(element, content) {
  var child = element.firstChild;
  if (child && child.nodeType === 3 && child.nextSibling === null) {
    // fast lane - replace existing text node

    if (_feature.isTextContentSupported) {
      // http://jsperf.com/replace-text-vs-reuse
      child.textContent = content;
    } else {
      // http://jsperf.com/replace-text-vs-reuse
      child.data = content;
    }
  } else {
    // slow lane - empty element and insert a text node
    empty(element);
    element.appendChild(element.ownerDocument.createTextNode(content));
  }
}

/**
 * Returns true if element is attached to the DOM and visible, false otherwise.
 *
 * @param {HTMLElement} element An element to check.
 * @returns {boolean}
 */
function isVisible(element) {
  var documentElement = element.ownerDocument.documentElement;
  var next = element;
  while (next !== documentElement) {
    // until <html> reached
    if (next === null) {
      // parent detached from DOM
      return false;
    } else if (next.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      if (next.host) {
        // this is Web Components Shadow DOM
        // see: http://w3c.github.io/webcomponents/spec/shadow/#encapsulation
        // according to spec, should be if (next.ownerDocument !== window.document), but that doesn't work yet
        if (next.host.impl) {
          // Chrome 33.0.1723.0 canary (2013-11-29) Web Platform features disabled
          return isVisible(next.host.impl);
        } else if (next.host) {
          // Chrome 33.0.1723.0 canary (2013-11-29) Web Platform features enabled
          return isVisible(next.host);
        }
        throw new Error('Lost in Web Components world');
      } else {
        return false; // this is a node detached from document in IE8
      }
    } else if (next.style && next.style.display === 'none') {
      return false;
    }
    next = next.parentNode;
  }
  return true;
}

/**
 * Returns elements top and left offset relative to the document. Function is not compatible with jQuery offset.
 *
 * @param {HTMLElement} element An element to get the offset position from.
 * @returns {object} Returns object with `top` and `left` props.
 */
function offset(element) {
  var rootDocument = element.ownerDocument;
  var rootWindow = rootDocument.defaultView;
  var documentElement = rootDocument.documentElement;
  var elementToCheck = element;
  var offsetLeft;
  var offsetTop;
  var lastElem;
  var box;
  if ((0, _feature.hasCaptionProblem)() && elementToCheck.firstChild && elementToCheck.firstChild.nodeName === 'CAPTION') {
    // fixes problem with Firefox ignoring <caption> in TABLE offset (see also export outerHeight)
    // http://jsperf.com/offset-vs-getboundingclientrect/8
    box = elementToCheck.getBoundingClientRect();
    return {
      top: box.top + (rootWindow.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0),
      left: box.left + (rootWindow.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0)
    };
  }
  offsetLeft = elementToCheck.offsetLeft;
  offsetTop = elementToCheck.offsetTop;
  lastElem = elementToCheck;

  /* eslint-disable no-cond-assign */
  while (elementToCheck = elementToCheck.offsetParent) {
    // from my observation, document.body always has scrollLeft/scrollTop == 0
    if (elementToCheck === rootDocument.body) {
      break;
    }
    offsetLeft += elementToCheck.offsetLeft;
    offsetTop += elementToCheck.offsetTop;
    lastElem = elementToCheck;
  }

  // slow - http://jsperf.com/offset-vs-getboundingclientrect/6
  if (lastElem && lastElem.style.position === 'fixed') {
    // if(lastElem !== document.body) { //faster but does gives false positive in Firefox
    offsetLeft += rootWindow.pageXOffset || documentElement.scrollLeft;
    offsetTop += rootWindow.pageYOffset || documentElement.scrollTop;
  }
  return {
    left: offsetLeft,
    top: offsetTop
  };
}

/**
 * Returns the document's scrollTop property.
 *
 * @param {Window} [rootWindow] The document window owner.
 * @returns {number}
 */
// eslint-disable-next-line no-restricted-globals
function getWindowScrollTop() {
  var rootWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var res = rootWindow.scrollY;
  if (res === void 0) {
    // IE8-11
    res = rootWindow.document.documentElement.scrollTop;
  }
  return res;
}

/**
 * Returns the document's scrollLeft property.
 *
 * @param {Window} [rootWindow] The document window owner.
 * @returns {number}
 */
// eslint-disable-next-line no-restricted-globals
function getWindowScrollLeft() {
  var rootWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var res = rootWindow.scrollX;
  if (res === void 0) {
    // IE8-11
    res = rootWindow.document.documentElement.scrollLeft;
  }
  return res;
}

/**
 * Returns the provided element's scrollTop property.
 *
 * @param {HTMLElement} element An element to get the scroll top position from.
 * @param {Window} [rootWindow] The document window owner.
 * @returns {number}
 */
// eslint-disable-next-line no-restricted-globals
function getScrollTop(element) {
  var rootWindow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  if (element === rootWindow) {
    return getWindowScrollTop(rootWindow);
  }
  return element.scrollTop;
}

/**
 * Returns the provided element's scrollLeft property.
 *
 * @param {HTMLElement} element An element to get the scroll left position from.
 * @param {Window} [rootWindow] The document window owner.
 * @returns {number}
 */
// eslint-disable-next-line no-restricted-globals
function getScrollLeft(element) {
  var rootWindow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  if (element === rootWindow) {
    return getWindowScrollLeft(rootWindow);
  }
  return element.scrollLeft;
}

/**
 * Returns a DOM element responsible for scrolling of the provided element.
 *
 * @param {HTMLElement} element An element to get the scrollable element from.
 * @returns {HTMLElement} Element's scrollable parent.
 */
function getScrollableElement(element) {
  var rootDocument = element.ownerDocument;
  var rootWindow = rootDocument ? rootDocument.defaultView : void 0;
  if (!rootDocument) {
    rootDocument = element.document ? element.document : element;
    rootWindow = rootDocument.defaultView;
  }
  var props = ['auto', 'scroll'];
  var supportedGetComputedStyle = (0, _feature.isGetComputedStyleSupported)();
  var el = element.parentNode;
  while (el && el.style && rootDocument.body !== el) {
    var _el$style = el.style,
      overflow = _el$style.overflow,
      overflowX = _el$style.overflowX,
      overflowY = _el$style.overflowY;
    if ([overflow, overflowX, overflowY].includes('scroll')) {
      return el;
    } else if (supportedGetComputedStyle) {
      var _rootWindow$getComput = rootWindow.getComputedStyle(el);
      overflow = _rootWindow$getComput.overflow;
      overflowX = _rootWindow$getComput.overflowX;
      overflowY = _rootWindow$getComput.overflowY;
      if (props.includes(overflow) || props.includes(overflowX) || props.includes(overflowY)) {
        return el;
      }
    }

    // The '+ 1' after the scrollHeight/scrollWidth is to prevent problems with zoomed out Chrome.
    if (el.clientHeight <= el.scrollHeight + 1 && (props.includes(overflowY) || props.includes(overflow))) {
      return el;
    }
    if (el.clientWidth <= el.scrollWidth + 1 && (props.includes(overflowX) || props.includes(overflow))) {
      return el;
    }
    el = el.parentNode;
  }
  return rootWindow;
}

/**
 * Returns a DOM element responsible for trimming the provided element.
 *
 * @param {HTMLElement} base Base element.
 * @returns {HTMLElement} Base element's trimming parent.
 */
function getTrimmingContainer(base) {
  var rootDocument = base.ownerDocument;
  var rootWindow = rootDocument.defaultView;
  var el = base.parentNode;
  while (el && el.style && rootDocument.body !== el) {
    if (el.style.overflow !== 'visible' && el.style.overflow !== '') {
      return el;
    }
    var computedStyle = getComputedStyle(el, rootWindow);
    var allowedProperties = ['scroll', 'hidden', 'auto'];
    var property = computedStyle.getPropertyValue('overflow');
    var propertyY = computedStyle.getPropertyValue('overflow-y');
    var propertyX = computedStyle.getPropertyValue('overflow-x');
    if (allowedProperties.includes(property) || allowedProperties.includes(propertyY) || allowedProperties.includes(propertyX)) {
      return el;
    }
    el = el.parentNode;
  }
  return rootWindow;
}

/**
 * Returns a style property for the provided element. (Be it an inline or external style).
 *
 * @param {HTMLElement} element An element to get the style from.
 * @param {string} prop Wanted property.
 * @param {Window} [rootWindow] The document window owner.
 * @returns {string|undefined} Element's style property.
 */
// eslint-disable-next-line no-restricted-globals
function getStyle(element, prop) {
  var rootWindow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  if (!element) {
    return;
  } else if (element === rootWindow) {
    if (prop === 'width') {
      return "".concat(rootWindow.innerWidth, "px");
    } else if (prop === 'height') {
      return "".concat(rootWindow.innerHeight, "px");
    }
    return;
  }
  var styleProp = element.style[prop];
  if (styleProp !== '' && styleProp !== void 0) {
    return styleProp;
  }
  var computedStyle = getComputedStyle(element, rootWindow);
  if (computedStyle[prop] !== '' && computedStyle[prop] !== void 0) {
    return computedStyle[prop];
  }
}

/**
 * Verifies if element fit to provided CSSRule.
 *
 * @param {Element} element Element to verify with selector text.
 * @param {CSSRule} rule Selector text from CSSRule.
 * @returns {boolean}
 */
function matchesCSSRules(element, rule) {
  var selectorText = rule.selectorText;
  var result = false;
  if (rule.type === CSSRule.STYLE_RULE && selectorText) {
    if (element.msMatchesSelector) {
      result = element.msMatchesSelector(selectorText);
    } else if (element.matches) {
      result = element.matches(selectorText);
    }
  }
  return result;
}

/**
 * Returns a computed style object for the provided element. (Needed if style is declared in external stylesheet).
 *
 * @param {HTMLElement} element An element to get style from.
 * @param {Window} [rootWindow] The document window owner.
 * @returns {IEElementStyle|CssStyle} Elements computed style object.
 */
// eslint-disable-next-line no-restricted-globals
function getComputedStyle(element) {
  var rootWindow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return element.currentStyle || rootWindow.getComputedStyle(element);
}

/**
 * Returns the element's outer width.
 *
 * @param {HTMLElement} element An element to get the width from.
 * @returns {number} Element's outer width.
 */
function outerWidth(element) {
  return element.offsetWidth;
}

/**
 * Returns the element's outer height.
 *
 * @param {HTMLElement} element An element to get the height from.
 * @returns {number} Element's outer height.
 */
function outerHeight(element) {
  if ((0, _feature.hasCaptionProblem)() && element.firstChild && element.firstChild.nodeName === 'CAPTION') {
    // fixes problem with Firefox ignoring <caption> in TABLE.offsetHeight
    // jQuery (1.10.1) still has this unsolved
    // may be better to just switch to getBoundingClientRect
    // http://bililite.com/blog/2009/03/27/finding-the-size-of-a-table/
    // http://lists.w3.org/Archives/Public/www-style/2009Oct/0089.html
    // http://bugs.jquery.com/ticket/2196
    // http://lists.w3.org/Archives/Public/www-style/2009Oct/0140.html#start140
    return element.offsetHeight + element.firstChild.offsetHeight;
  }
  return element.offsetHeight;
}

/**
 * Returns the element's inner height.
 *
 * @param {HTMLElement} element An element to get the height from.
 * @returns {number} Element's inner height.
 */
function innerHeight(element) {
  return element.clientHeight || element.innerHeight;
}

/**
 * Returns the element's inner width.
 *
 * @param {HTMLElement} element An element to get the width from.
 * @returns {number} Element's inner width.
 */
function innerWidth(element) {
  return element.clientWidth || element.innerWidth;
}

/**
 * @param {HTMLElement} element An element to which the event is added.
 * @param {string} event The event name.
 * @param {Function} callback The callback to add.
 */
function addEvent(element, event, callback) {
  element.addEventListener(event, callback, false);
}

/**
 * @param {HTMLElement} element An element from which the event is removed.
 * @param {string} event The event name.
 * @param {Function} callback The function reference to remove.
 */
function removeEvent(element, event, callback) {
  element.removeEventListener(event, callback, false);
}

/**
 * Returns caret position in text input.
 *
 * @author https://stackoverflow.com/questions/263743/how-to-get-caret-position-in-textarea
 * @param {HTMLElement} el An element to check.
 * @returns {number}
 */
function getCaretPosition(el) {
  var rootDocument = el.ownerDocument;
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (rootDocument.selection) {
    // IE8
    el.focus();
    var r = rootDocument.selection.createRange();
    if (r === null) {
      return 0;
    }
    var re = el.createTextRange();
    var rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);
    return rc.text.length;
  }
  return 0;
}

/**
 * Returns end of the selection in text input.
 *
 * @param {HTMLElement} el An element to check.
 * @returns {number}
 */
function getSelectionEndPosition(el) {
  var rootDocument = el.ownerDocument;
  if (el.selectionEnd) {
    return el.selectionEnd;
  } else if (rootDocument.selection) {
    // IE8
    var r = rootDocument.selection.createRange();
    if (r === null) {
      return 0;
    }
    var re = el.createTextRange();
    return re.text.indexOf(r.text) + r.text.length;
  }
  return 0;
}

/**
 * Returns text under selection.
 *
 * @param {Window} [rootWindow] The document window owner.
 * @returns {string}
 */
// eslint-disable-next-line no-restricted-globals
function getSelectionText() {
  var rootWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var rootDocument = rootWindow.document;
  var text = '';
  if (rootWindow.getSelection) {
    text = rootWindow.getSelection().toString();
  } else if (rootDocument.selection && rootDocument.selection.type !== 'Control') {
    text = rootDocument.selection.createRange().text;
  }
  return text;
}

/**
 * Cross-platform helper to clear text selection.
 *
 * @param {Window} [rootWindow] The document window owner.
 */
// eslint-disable-next-line no-restricted-globals
function clearTextSelection() {
  var rootWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var rootDocument = rootWindow.document;

  // http://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
  if (rootWindow.getSelection) {
    if (rootWindow.getSelection().empty) {
      // Chrome
      rootWindow.getSelection().empty();
    } else if (rootWindow.getSelection().removeAllRanges) {
      // Firefox
      rootWindow.getSelection().removeAllRanges();
    }
  } else if (rootDocument.selection) {
    // IE?
    rootDocument.selection.empty();
  }
}

/**
 * Sets caret position in text input.
 *
 * @author http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
 * @param {Element} element An element to process.
 * @param {number} pos The selection start position.
 * @param {number} endPos The selection end position.
 */
function setCaretPosition(element, pos, endPos) {
  if (endPos === void 0) {
    endPos = pos;
  }
  if (element.setSelectionRange) {
    element.focus();
    try {
      element.setSelectionRange(pos, endPos);
    } catch (err) {
      var elementParent = element.parentNode;
      var parentDisplayValue = elementParent.style.display;
      elementParent.style.display = 'block';
      element.setSelectionRange(pos, endPos);
      elementParent.style.display = parentDisplayValue;
    }
  }
}
var cachedScrollbarWidth;

/**
 * Helper to calculate scrollbar width.
 * Source: https://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes.
 *
 * @private
 * @param {Document} rootDocument The onwer of the document.
 * @returns {number}
 */
// eslint-disable-next-line no-restricted-globals
function walkontableCalculateScrollbarWidth() {
  var rootDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var inner = rootDocument.createElement('div');
  inner.style.height = '200px';
  inner.style.width = '100%';
  var outer = rootDocument.createElement('div');
  outer.style.boxSizing = 'content-box';
  outer.style.height = '150px';
  outer.style.left = '0px';
  outer.style.overflow = 'hidden';
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.width = '200px';
  outer.style.visibility = 'hidden';
  outer.appendChild(inner);
  (rootDocument.body || rootDocument.documentElement).appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  (rootDocument.body || rootDocument.documentElement).removeChild(outer);
  return w1 - w2;
}

/**
 * Returns the computed width of the native browser scroll bar.
 *
 * @param {Document} [rootDocument] The owner of the document.
 * @returns {number} Width.
 */
// eslint-disable-next-line no-restricted-globals
function getScrollbarWidth() {
  var rootDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (cachedScrollbarWidth === void 0) {
    cachedScrollbarWidth = walkontableCalculateScrollbarWidth(rootDocument);
  }
  return cachedScrollbarWidth;
}

/**
 * Checks if the provided element has a vertical scrollbar.
 *
 * @param {HTMLElement} element An element to check.
 * @returns {boolean}
 */
function hasVerticalScrollbar(element) {
  return element.offsetWidth !== element.clientWidth;
}

/**
 * Checks if the provided element has a vertical scrollbar.
 *
 * @param {HTMLElement} element An element to check.
 * @returns {boolean}
 */
function hasHorizontalScrollbar(element) {
  return element.offsetHeight !== element.clientHeight;
}

/**
 * Sets overlay position depending on it's type and used browser.
 *
 * @param {HTMLElement} overlayElem An element to process.
 * @param {number|string} left The left position of the overlay.
 * @param {number|string} top The top position of the overlay.
 */
function setOverlayPosition(overlayElem, left, top) {
  if ((0, _browser.isIE9)()) {
    overlayElem.style.top = top;
    overlayElem.style.left = left;
  } else if ((0, _browser.isSafari)()) {
    overlayElem.style['-webkit-transform'] = "translate3d(".concat(left, ",").concat(top, ",0)");
  } else {
    overlayElem.style.transform = "translate3d(".concat(left, ",").concat(top, ",0)");
  }
}

/**
 * @param {HTMLElement} element An element to process.
 * @returns {number|Array}
 */
function getCssTransform(element) {
  var transform;
  if (element.style.transform && (transform = element.style.transform) !== '') {
    return ['transform', transform];
  } else if (element.style['-webkit-transform'] && (transform = element.style['-webkit-transform']) !== '') {
    return ['-webkit-transform', transform];
  }
  return -1;
}

/**
 * @param {HTMLElement} element An element to process.
 */
function resetCssTransform(element) {
  if (element.style.transform && element.style.transform !== '') {
    element.style.transform = '';
  } else if (element.style['-webkit-transform'] && element.style['-webkit-transform'] !== '') {
    element.style['-webkit-transform'] = '';
  }
}

/**
 * Determines if the given DOM element is an input field.
 * Notice: By 'input' we mean input, textarea and select nodes.
 *
 * @param {HTMLElement} element - DOM element.
 * @returns {boolean}
 */
function isInput(element) {
  var inputs = ['INPUT', 'SELECT', 'TEXTAREA'];
  return element && (inputs.indexOf(element.nodeName) > -1 || element.contentEditable === 'true');
}

/**
 * Determines if the given DOM element is an input field placed OUTSIDE of HOT.
 * Notice: By 'input' we mean input, textarea and select nodes which have defined 'data-hot-input' attribute.
 *
 * @param {HTMLElement} element - DOM element.
 * @returns {boolean}
 */
function isOutsideInput(element) {
  return isInput(element) && element.hasAttribute('data-hot-input') === false;
}

/**
 * Check if the given DOM element can be focused (by using "select" method).
 *
 * @param {HTMLElement} element - DOM element.
 */
function selectElementIfAllowed(element) {
  var activeElement = element.ownerDocument.activeElement;
  if (!isOutsideInput(activeElement)) {
    element.select();
  }
}

/**
 * Check if the provided element is detached from DOM.
 *
 * @param {HTMLElement} element HTML element to be checked.
 * @returns {boolean} `true` if the element is detached, `false` otherwise.
 */
function isDetached(element) {
  return !element.parentNode;
}