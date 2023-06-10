import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
var _templateObject;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.find-index.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.slice.js";
import { createUniqueMap } from "../utils/dataStructures/uniqueMap.mjs";
import { normalizeKeys, getKeysList } from "./utils.mjs";
import { isUndefined, isDefined } from "../helpers/mixed.mjs";
import { isFunction } from "../helpers/function.mjs";
import { objectEach } from "../helpers/object.mjs";
import { toSingleLine } from "../helpers/templateLiteralTag.mjs";
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * The `ShortcutContext` API lets you store and manage [keyboard shortcuts](@/guides/accessories-and-menus/keyboard-shortcuts.md) in a given [context](@/guides/accessories-and-menus/keyboard-shortcuts.md#keyboard-shortcut-contexts).
 *
 * Each `ShortcutContext` object stores and manages its own set of keyboard shortcuts.
 *
 * @alias ShortcutContext
 * @class ShortcutContext
 * @param {string} name The name of the keyboard shortcut context
 * @returns {object}
 */
export var createContext = function createContext(name) {
  var SHORTCUTS = createUniqueMap({
    errorIdExists: function errorIdExists(keys) {
      return "The \"".concat(keys, "\" shortcut is already registered in the \"").concat(name, "\" context.");
    }
  });

  /**
   * Add a keyboard shortcut to this context.
   *
   * @memberof ShortcutContext#
   * @param {object} options The shortcut's options
   * @param {Array<Array<string>>} options.keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   * @param {Function} options.callback The shortcut's action
   * @param {object} options.group A group of shortcuts to which the shortcut belongs
   * @param {object} [options.runOnlyIf] A condition on which the shortcut's action runs
   * @param {object} [options.stopPropagation=true] If set to `true`: stops the event's propagation
   * @param {object} [options.captureCtrl=false] If set to `true`: captures the state of the Control/Meta modifier key
   * @param {object} [options.preventDefault=true] If set to `true`: prevents the default behavior
   * @param {object} [options.position='after'] The order in which the shortcut's action runs:
   * `'before'` or `'after'` the `relativeToGroup` group of actions
   * @param {object} [options.relativeToGroup] The name of a group of actions, used to determine an action's `position`
   *
   */
  var addShortcut = function addShortcut() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      keys = _ref.keys,
      callback = _ref.callback,
      group = _ref.group,
      _ref$runOnlyIf = _ref.runOnlyIf,
      runOnlyIf = _ref$runOnlyIf === void 0 ? function () {
        return true;
      } : _ref$runOnlyIf,
      _ref$captureCtrl = _ref.captureCtrl,
      captureCtrl = _ref$captureCtrl === void 0 ? false : _ref$captureCtrl,
      _ref$preventDefault = _ref.preventDefault,
      preventDefault = _ref$preventDefault === void 0 ? true : _ref$preventDefault,
      _ref$stopPropagation = _ref.stopPropagation,
      stopPropagation = _ref$stopPropagation === void 0 ? false : _ref$stopPropagation,
      relativeToGroup = _ref.relativeToGroup,
      position = _ref.position;
    if (isUndefined(group)) {
      throw new Error('You need to define the shortcut\'s group.');
    }
    if (isFunction(callback) === false) {
      throw new Error('The shortcut\'s callback needs to be a function.');
    }
    if (Array.isArray(keys) === false) {
      throw new Error(toSingleLine(_templateObject || (_templateObject = _taggedTemplateLiteral(["Pass the shortcut's keys as an array of arrays, \n      using the KeyboardEvent.key properties: \n      https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values."], ["Pass the shortcut\\'s keys as an array of arrays,\\x20\n      using the KeyboardEvent.key properties:\\x20\n      https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values."]))));
    }
    var newShortcut = {
      callback: callback,
      group: group,
      runOnlyIf: runOnlyIf,
      captureCtrl: captureCtrl,
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    };
    if (isDefined(relativeToGroup)) {
      var _ref2 = [relativeToGroup, position];
      newShortcut.relativeToGroup = _ref2[0];
      newShortcut.position = _ref2[1];
    }
    keys.forEach(function (keyCombination) {
      var normalizedKeys = normalizeKeys(keyCombination);
      var hasKeyCombination = SHORTCUTS.hasItem(normalizedKeys);
      if (hasKeyCombination) {
        var shortcuts = SHORTCUTS.getItem(normalizedKeys);
        var insertionIndex = shortcuts.findIndex(function (shortcut) {
          return shortcut.group === relativeToGroup;
        });
        if (insertionIndex !== -1) {
          if (position === 'before') {
            insertionIndex -= 1;
          } else {
            insertionIndex += 1;
          }
        } else {
          insertionIndex = shortcuts.length;
        }
        shortcuts.splice(insertionIndex, 0, newShortcut);
      } else {
        SHORTCUTS.addItem(normalizedKeys, [newShortcut]);
      }
    });
  };

  /**
   * Add multiple keyboard shortcuts to this context.
   *
   * @memberof ShortcutContext#
   * @param {Array<object>} shortcuts List of shortcuts to add to this shortcut context
   * @param {object} [options] A shortcut's options
   * @param {Function} [options.callback] A shortcut's action
   * @param {object} [options.group] A group of shortcuts to which a shortcut belongs
   * @param {object} [options.runOnlyIf] A condition on which a shortcut's action runs
   * @param {object} [options.stopPropagation=true] If set to `true`: stops the event's propagation
   * @param {object} [options.preventDefault=true] If set to `true`: prevents the default behavior
   * @param {object} [options.position='after'] The order in which a shortcut's action runs:
   * `'before'` or `'after'` a `relativeToGroup` group of actions
   * @param {object} [options.relativeToGroup] The name of a group of actions, used to determine an action's `position`
   */
  var addShortcuts = function addShortcuts(shortcuts) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    shortcuts.forEach(function (shortcut) {
      objectEach(options, function (value, key) {
        if (Object.prototype.hasOwnProperty.call(shortcut, key) === false) {
          shortcut[key] = options[key];
        }
      });
      addShortcut(shortcut);
    });
  };

  /**
   * Remove a shortcut from this context.
   *
   * @memberof ShortcutContext#
   * @param {Array<string>} keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   */
  var removeShortcutsByKeys = function removeShortcutsByKeys(keys) {
    var normalizedKeys = normalizeKeys(keys);
    SHORTCUTS.removeItem(normalizedKeys);
  };

  /**
   * Remove a group of shortcuts from this context.
   *
   * @memberof ShortcutContext#
   * @param {string} group The name of the group of shortcuts
   */
  var removeShortcutsByGroup = function removeShortcutsByGroup(group) {
    var shortcuts = SHORTCUTS.getItems();
    shortcuts.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        normalizedKeys = _ref4[0],
        shortcutOptions = _ref4[1];
      var leftOptions = shortcutOptions.filter(function (option) {
        return option.group !== group;
      });
      if (leftOptions.length === 0) {
        removeShortcutsByKeys(getKeysList(normalizedKeys));
      } else {
        shortcutOptions.length = 0;
        shortcutOptions.push.apply(shortcutOptions, _toConsumableArray(leftOptions));
      }
    });
  };

  /**
   * Get a shortcut's details.
   *
   * @memberof ShortcutContext#
   * @param {Array<string>} keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   * @returns {Array}
   */
  var getShortcuts = function getShortcuts(keys) {
    var normalizedKeys = normalizeKeys(keys);
    var shortcuts = SHORTCUTS.getItem(normalizedKeys);
    return isDefined(shortcuts) ? shortcuts.slice() : [];
  };

  /**
   * Check if a shortcut exists in this context.
   *
   * @memberof ShortcutContext#
   * @param {Array<string>} keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   * @returns {boolean}
   */
  var hasShortcut = function hasShortcut(keys) {
    var normalizedKeys = normalizeKeys(keys);
    return SHORTCUTS.hasItem(normalizedKeys);
  };
  return {
    addShortcut: addShortcut,
    addShortcuts: addShortcuts,
    getShortcuts: getShortcuts,
    hasShortcut: hasShortcut,
    removeShortcutsByKeys: removeShortcutsByKeys,
    removeShortcutsByGroup: removeShortcutsByGroup
  };
};