import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * Create a key observer.
 *
 * @returns {object}
 */
export function createKeysObserver() {
  var PRESSED_KEYS = new Set();
  return {
    /**
     * Press a key.
     *
     * @param {string} key Names of the shortcut's keys,
     * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
     * in lowercase or uppercase, unified across browsers
     */press: function press(key) {
      PRESSED_KEYS.add(key);
    },
    /**
     * Release a pressed key.
     *
     * @param {string} key Names of the shortcut's keys,
     * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
     * in lowercase or uppercase, unified across browsers
     */release: function release(key) {
      PRESSED_KEYS.delete(key);
    },
    /**
     * Release all pressed keys.
     */releaseAll: function releaseAll() {
      PRESSED_KEYS.clear();
    },
    /**
     * Check if a key is pressed.
     *
     * @param {string} key Names of the shortcut's keys,
     * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
     * in lowercase or uppercase, unified across browsers
     * @returns {boolean}
     */isPressed: function isPressed(key) {
      return PRESSED_KEYS.has(key);
    }
  };
}