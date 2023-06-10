import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.string.includes.js";
import { createKeysObserver } from "./keyObserver.mjs";
import { normalizeEventKey } from "./utils.mjs";
import { isImmediatePropagationStopped } from "../helpers/dom/event.mjs";
import { getParentWindow } from "../helpers/dom/element.mjs";
import { isMacOS } from "../helpers/browser.mjs";
var MODIFIER_KEYS = ['meta', 'alt', 'shift', 'control'];
var modifierKeysObserver = createKeysObserver();

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * A key recorder, used for tracking key events.
 *
 * @param {EventTarget} ownerWindow A starting `window` element
 * @param {Function} handleEvent A condition on which event is handled.
 * @param {Function} beforeKeyDown A hook fired before the `keydown` event is handled.
 * @param {Function} afterKeyDown A hook fired after the `keydown` event is handled
 * @param {Function} callback `KeyEvent`'s listener's callback function
 * @returns {object}
 */
export function useRecorder(ownerWindow, handleEvent, beforeKeyDown, afterKeyDown, callback) {
  /**
   * Check if a pressed key is tracked or not.
   *
   * @param {string} pressedKey A pressed key
   * @returns {boolean}
   */
  var isModifierKey = function isModifierKey(pressedKey) {
    return MODIFIER_KEYS.includes(pressedKey);
  };

  /**
   * Get every pressed modifier key from the performed `KeyboardEvent`.
   *
   * @private
   * @param {KeyboardEvent} event The event object.
   * @param {boolean} [mergeMetaKeys=false] If `true,` the function will return the "control" and "meta"
   *                                        modifiers keys as the "control/meta" name. This allows creating
   *                                        keyboard shortcuts with modifier key that trigger the shortcut
   *                                        actions depend on the OS keyboard layout (the Meta key for macOS
   *                                        and Control for non macOS system).
   * @returns {string[]}
   */
  var getPressedModifierKeys = function getPressedModifierKeys(event) {
    var mergeMetaKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var pressedModifierKeys = [];
    if (event.altKey) {
      pressedModifierKeys.push('alt');
    }
    if (mergeMetaKeys && (event.ctrlKey || event.metaKey)) {
      pressedModifierKeys.push('control/meta');
    } else {
      if (event.ctrlKey) {
        pressedModifierKeys.push('control');
      }
      if (event.metaKey) {
        pressedModifierKeys.push('meta');
      }
    }
    if (event.shiftKey) {
      pressedModifierKeys.push('shift');
    }
    return pressedModifierKeys;
  };

  /**
   * `KeyboardEvent`'s callback function
   *
   * @private
   * @param {KeyboardEvent} event The event object
   */
  var onkeydown = function onkeydown(event) {
    if (handleEvent(event) === false) {
      return;
    }
    var result = beforeKeyDown(event);

    // keyCode 229 aka 'uninitialized' doesn't take into account with editors. This key code is
    // produced when unfinished character is entering using the IME editor. It is fired on macOS,
    // Windows and linux (ubuntu) with installed ibus-pinyin package.
    if (event.keyCode === 229 || result === false || isImmediatePropagationStopped(event)) {
      return;
    }
    var pressedKey = normalizeEventKey(event.key);
    var extraModifierKeys = [];
    if (isModifierKey(pressedKey)) {
      modifierKeysObserver.press(pressedKey);
    } else {
      extraModifierKeys = getPressedModifierKeys(event);
    }
    var pressedKeys = [pressedKey].concat(extraModifierKeys);
    var isExecutionCancelled = callback(event, pressedKeys);
    if (!isExecutionCancelled && (isMacOS() && extraModifierKeys.includes('meta') || !isMacOS() && extraModifierKeys.includes('control'))) {
      // Trigger the callback for the virtual OS-dependent "control/meta" key
      callback(event, [pressedKey].concat(getPressedModifierKeys(event, true)));
    }
    afterKeyDown(event);
  };

  /**
   * `KeyboardEvent`'s callback function
   *
   * @private
   * @param {KeyboardEvent} event The event object
   */
  var onkeyup = function onkeyup(event) {
    if (handleEvent(event) === false) {
      return;
    }
    var pressedKey = normalizeEventKey(event.key);
    if (isModifierKey(pressedKey) === false) {
      return;
    }
    modifierKeysObserver.release(pressedKey);
  };

  /**
   * `FocusEvent`'s callback function
   *
   * @private
   */
  var onblur = function onblur() {
    modifierKeysObserver.releaseAll();
  };

  /**
   * Add event listeners to the starting window and its parents' windows.
   */
  var mount = function mount() {
    var eventTarget = ownerWindow;
    while (eventTarget) {
      eventTarget.document.documentElement.addEventListener('keydown', onkeydown);
      eventTarget.document.documentElement.addEventListener('keyup', onkeyup);
      eventTarget.document.documentElement.addEventListener('blur', onblur);
      eventTarget = getParentWindow(eventTarget);
    }
  };

  /**
   * Remove event listeners from the starting window and its parents' windows.
   */
  var unmount = function unmount() {
    var eventTarget = ownerWindow;
    while (eventTarget) {
      eventTarget.document.documentElement.removeEventListener('keydown', onkeydown);
      eventTarget.document.documentElement.removeEventListener('keyup', onkeyup);
      eventTarget.document.documentElement.removeEventListener('blur', onblur);
      eventTarget = getParentWindow(eventTarget);
    }
  };
  return {
    mount: mount,
    unmount: unmount,
    isPressed: function isPressed(key) {
      return modifierKeysObserver.isPressed(key);
    }
  };
}