"use strict";

exports.__esModule = true;
exports.ChangesObservable = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.fill.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.weak-map.js");
var _observer = require("./observer");
var _utils = require("./utils");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _observers = /*#__PURE__*/new WeakMap();
var _indexMatrix = /*#__PURE__*/new WeakMap();
var _currentIndexState = /*#__PURE__*/new WeakMap();
var _isMatrixIndexesInitialized = /*#__PURE__*/new WeakMap();
var _initialIndexValue = /*#__PURE__*/new WeakMap();
/**
 * The ChangesObservable module is an object that represents a resource that provides
 * the ability to observe the changes that happened in the index map indexes during
 * the code running.
 *
 * @private
 * @class ChangesObservable
 */var ChangesObservable = /*#__PURE__*/function () {
  /**
   * The list of registered ChangesObserver instances.
   *
   * @type {ChangesObserver[]}
   */

  /**
   * An array with default values that act as a base array that will be compared with
   * the last saved index state. The changes are generated and immediately send through
   * the newly created ChangesObserver object. Thanks to that, the observer initially has
   * all information about what indexes are currently changed.
   *
   * @type {Array}
   */

  /**
   * An array that holds the indexes state that is currently valid. The value is changed on every
   * index mapper cache update.
   *
   * @type {Array}
   */

  /**
   * The flag determines if the observable is initialized or not. Not initialized object creates
   * index matrix once while emitting new changes.
   *
   * @type {boolean}
   */

  /**
   * The initial index value allows control from what value the index matrix array will be created.
   * Changing that value changes how the array diff generates the changes for the initial data
   * sent to the subscribers. For example, the changes can be triggered by detecting the changes
   * from `false` to `true` value or vice versa. Generally, it depends on which index map type
   * the Observable will work with. For "hiding" or "trimming" index types, it will be boolean
   * values. For various index maps, it can be anything, but I suspect that the most appropriate
   * initial value will be "undefined" in that case.
   *
   * @type {boolean}
   */

  function ChangesObservable() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      initialIndexValue = _ref.initialIndexValue;
    _classCallCheck(this, ChangesObservable);
    _classPrivateFieldInitSpec(this, _observers, {
      writable: true,
      value: new Set()
    });
    _classPrivateFieldInitSpec(this, _indexMatrix, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _currentIndexState, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _isMatrixIndexesInitialized, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _initialIndexValue, {
      writable: true,
      value: false
    });
    _classPrivateFieldSet(this, _initialIndexValue, initialIndexValue !== null && initialIndexValue !== void 0 ? initialIndexValue : false);
  }

  /* eslint-disable jsdoc/require-description-complete-sentence */
  /**
   * Creates and returns a new instance of the ChangesObserver object. The resource
   * allows subscribing to the index changes that during the code running may change.
   * Changes are emitted as an array of the index change. Each change is represented
   * separately as an object with `op`, `index`, `oldValue`, and `newValue` props.
   *
   * For example:
   * ```
   * [
   *   { op: 'replace', index: 1, oldValue: false, newValue: true },
   *   { op: 'replace', index: 3, oldValue: false, newValue: true },
   *   { op: 'insert', index: 4, oldValue: false, newValue: true },
   * ]
   * // or when the new index map changes have less indexes
   * [
   *   { op: 'replace', index: 1, oldValue: false, newValue: true },
   *   { op: 'remove', index: 4, oldValue: false, newValue: true },
   * ]
   * ```
   *
   * @returns {ChangesObserver}
   */
  /* eslint-enable jsdoc/require-description-complete-sentence */
  _createClass(ChangesObservable, [{
    key: "createObserver",
    value: function createObserver() {
      var _this = this;
      var observer = new _observer.ChangesObserver();
      _classPrivateFieldGet(this, _observers).add(observer);
      observer.addLocalHook('unsubscribe', function () {
        _classPrivateFieldGet(_this, _observers).delete(observer);
      });
      observer._writeInitialChanges((0, _utils.arrayDiff)(_classPrivateFieldGet(this, _indexMatrix), _classPrivateFieldGet(this, _currentIndexState)));
      return observer;
    }

    /**
     * The method is an entry point for triggering new index map changes. Emitting the
     * changes triggers comparing algorithm which compares last saved state with a new
     * state. When there are some differences, the changes are sent to all subscribers.
     *
     * @param {Array} indexesState An array with index map state.
     */
  }, {
    key: "emit",
    value: function emit(indexesState) {
      var currentIndexState = _classPrivateFieldGet(this, _currentIndexState);
      if (!_classPrivateFieldGet(this, _isMatrixIndexesInitialized) || _classPrivateFieldGet(this, _indexMatrix).length !== indexesState.length) {
        if (indexesState.length === 0) {
          indexesState = new Array(currentIndexState.length).fill(_classPrivateFieldGet(this, _initialIndexValue));
        } else {
          _classPrivateFieldSet(this, _indexMatrix, new Array(indexesState.length).fill(_classPrivateFieldGet(this, _initialIndexValue)));
        }
        if (!_classPrivateFieldGet(this, _isMatrixIndexesInitialized)) {
          _classPrivateFieldSet(this, _isMatrixIndexesInitialized, true);
          currentIndexState = _classPrivateFieldGet(this, _indexMatrix);
        }
      }
      var changes = (0, _utils.arrayDiff)(currentIndexState, indexesState);
      _classPrivateFieldGet(this, _observers).forEach(function (observer) {
        return observer._write(changes);
      });
      _classPrivateFieldSet(this, _currentIndexState, indexesState);
    }
  }]);
  return ChangesObservable;
}();
exports.ChangesObservable = ChangesObservable;