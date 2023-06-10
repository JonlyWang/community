"use strict";

exports.__esModule = true;
exports.isChrome = isChrome;
exports.isChromeWebKit = isChromeWebKit;
exports.isEdge = isEdge;
exports.isEdgeWebKit = isEdgeWebKit;
exports.isFirefox = isFirefox;
exports.isFirefoxWebKit = isFirefoxWebKit;
exports.isIE = isIE;
exports.isIE9 = isIE9;
exports.isIOS = isIOS;
exports.isIpadOS = isIpadOS;
exports.isLinuxOS = isLinuxOS;
exports.isMSBrowser = isMSBrowser;
exports.isMacOS = isMacOS;
exports.isMobileBrowser = isMobileBrowser;
exports.isSafari = isSafari;
exports.isWindowsOS = isWindowsOS;
exports.setBrowserMeta = setBrowserMeta;
exports.setPlatformMeta = setPlatformMeta;
require("core-js/modules/es.regexp.exec.js");
var _object = require("./object");
var tester = function tester(testerFunc) {
  var result = {
    value: false
  };
  result.test = function (ua, vendor) {
    result.value = testerFunc(ua, vendor);
  };
  return result;
};
var browsers = {
  chrome: tester(function (ua, vendor) {
    return /Chrome/.test(ua) && /Google/.test(vendor);
  }),
  chromeWebKit: tester(function (ua) {
    return /CriOS/.test(ua);
  }),
  edge: tester(function (ua) {
    return /Edge/.test(ua);
  }),
  edgeWebKit: tester(function (ua) {
    return /EdgiOS/.test(ua);
  }),
  firefox: tester(function (ua) {
    return /Firefox/.test(ua);
  }),
  firefoxWebKit: tester(function (ua) {
    return /FxiOS/.test(ua);
  }),
  ie: tester(function (ua) {
    return /Trident/.test(ua);
  }),
  // eslint-disable-next-line no-restricted-globals
  ie9: tester(function () {
    return !!document.documentMode;
  }),
  mobile: tester(function (ua) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  }),
  safari: tester(function (ua, vendor) {
    return /Safari/.test(ua) && /Apple Computer/.test(vendor);
  })
};
var platforms = {
  mac: tester(function (platform) {
    return /^Mac/.test(platform);
  }),
  win: tester(function (platform) {
    return /^Win/.test(platform);
  }),
  linux: tester(function (platform) {
    return /^Linux/.test(platform);
  }),
  ios: tester(function (ua) {
    return /iPhone|iPad|iPod/i.test(ua);
  })
};

/**
 * @param {object} [metaObject] The browser identity collection.
 * @param {object} [metaObject.userAgent] The user agent reported by browser.
 * @param {object} [metaObject.vendor] The vendor name reported by browser.
 */
function setBrowserMeta() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? navigator.userAgent : _ref$userAgent,
    _ref$vendor = _ref.vendor,
    vendor = _ref$vendor === void 0 ? navigator.vendor : _ref$vendor;
  (0, _object.objectEach)(browsers, function (_ref2) {
    var test = _ref2.test;
    return void test(userAgent, vendor);
  });
}

/**
 * @param {object} [metaObject] The platform identity collection.
 * @param {object} [metaObject.platform] The platform ID.
 */
function setPlatformMeta() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref3$platform = _ref3.platform,
    platform = _ref3$platform === void 0 ? navigator.platform : _ref3$platform;
  (0, _object.objectEach)(platforms, function (_ref4) {
    var test = _ref4.test;
    return void test(platform);
  });
}
setBrowserMeta();
setPlatformMeta();

/**
 * @returns {boolean}
 */
function isChrome() {
  return browsers.chrome.value;
}

/**
 * @returns {boolean}
 */
function isChromeWebKit() {
  return browsers.chromeWebKit.value;
}

/**
 * @returns {boolean}
 */
function isFirefox() {
  return browsers.firefox.value;
}

/**
 * @returns {boolean}
 */
function isFirefoxWebKit() {
  return browsers.firefoxWebKit.value;
}

/**
 * @returns {boolean}
 */
function isSafari() {
  return browsers.safari.value;
}

/**
 * @returns {boolean}
 */
function isEdge() {
  return browsers.edge.value;
}

/**
 * @returns {boolean}
 */
function isEdgeWebKit() {
  return browsers.edgeWebKit.value;
}

/**
 * @returns {boolean}
 */
function isIE() {
  return browsers.ie.value;
}

/**
 * @returns {boolean}
 */
function isIE9() {
  return browsers.ie9.value;
}

/**
 * @returns {boolean}
 */
function isMSBrowser() {
  return browsers.ie.value || browsers.edge.value;
}

/**
 * @returns {boolean}
 */
function isMobileBrowser() {
  return browsers.mobile.value;
}

/**
 * @returns {boolean}
 */
function isIOS() {
  return platforms.ios.value;
}

/**
 * A hacky way to recognize the iPad. Since iOS 13, the iPad on Safari mimics macOS behavior and user agent.
 *
 * @see {@https://stackoverflow.com/a/57838385}
 * @param {object} [metaObject] The browser identity collection.
 * @param {number} [metaObject.maxTouchPoints] The maximum number of simultanous touch points.
 * @returns {boolean}
 */
function isIpadOS() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator,
    maxTouchPoints = _ref5.maxTouchPoints;
  return maxTouchPoints > 2 && platforms.mac.value;
}

/**
 * @returns {boolean}
 */
function isWindowsOS() {
  return platforms.win.value;
}

/**
 * @returns {boolean}
 */
function isMacOS() {
  return platforms.mac.value;
}

/**
 * @returns {boolean}
 */
function isLinuxOS() {
  return platforms.linux.value;
}