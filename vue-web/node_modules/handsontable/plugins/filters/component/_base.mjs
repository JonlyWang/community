function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { arrayEach } from "../../../helpers/array.mjs";
import { mixin } from "../../../helpers/object.mjs";
import localHooks from "../../../mixins/localHooks.mjs";
import { LinkedPhysicalIndexToValueMap as IndexToValueMap } from "../../../translations/index.mjs"; /**
                                                                                                     * @private
                                                                                                     * @class BaseComponent
                                                                                                     */
var BaseComponent = /*#__PURE__*/function () {
  function BaseComponent(hotInstance, _ref) {
    var id = _ref.id,
      _ref$stateless = _ref.stateless,
      stateless = _ref$stateless === void 0 ? true : _ref$stateless;
    _classCallCheck(this, BaseComponent);
    /**
     * The Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hotInstance;
    /**
     * The component uniq id.
     *
     * @type {string}
     */
    this.id = id;
    /**
     * List of registered component UI elements.
     *
     * @type {Array}
     */
    this.elements = [];
    /**
     * Flag which determines if element is hidden.
     *
     * @type {boolean}
     */
    this.hidden = false;
    /**
     * The component states id.
     *
     * @type {string}
     */
    this.stateId = "Filters.component.".concat(this.id);
    /**
     * Index map which stores component states for each column.
     *
     * @type {LinkedPhysicalIndexToValueMap|null}
     */
    this.state = stateless ? null : this.hot.columnIndexMapper.registerMap(this.stateId, new IndexToValueMap());
  }

  /**
   * Reset elements to its initial state.
   */
  _createClass(BaseComponent, [{
    key: "reset",
    value: function reset() {
      arrayEach(this.elements, function (ui) {
        return ui.reset();
      });
    }

    /**
     * Hide component.
     */
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }

    /**
     * Show component.
     */
  }, {
    key: "show",
    value: function show() {
      this.hidden = false;
    }

    /**
     * Check if component is hidden.
     *
     * @returns {boolean}
     */
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.hot === null || this.hidden;
    }

    /**
     * Restores the component state from the given physical column index. The method
     * internally calls the `setState` method. The state then is individually processed
     * by each component.
     *
     * @param {number} physicalColumn The physical column index.
     */
  }, {
    key: "restoreState",
    value: function restoreState(physicalColumn) {
      if (this.state) {
        this.setState(this.state.getValueAtIndex(physicalColumn));
      }
    }

    /**
     * The custom logic for component state restoring.
     */
  }, {
    key: "setState",
    value: function setState() {
      throw new Error('The state setting logic is not implemented');
    }

    /**
     * Saves the component state to the given physical column index. The method
     * internally calls the `getState` method, which returns the current state of
     * the component.
     *
     * @param {number} physicalColumn The physical column index.
     */
  }, {
    key: "saveState",
    value: function saveState(physicalColumn) {
      if (this.state) {
        this.state.setValueAtIndex(physicalColumn, this.getState());
      }
    }

    /**
     * The custom logic for component state gathering (for stateful components).
     */
  }, {
    key: "getState",
    value: function getState() {
      throw new Error('The state gathering logic is not implemented');
    }

    /**
     * Destroy element.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.hot.columnIndexMapper.unregisterMap(this.stateId);
      this.clearLocalHooks();
      arrayEach(this.elements, function (ui) {
        return ui.destroy();
      });
      this.state = null;
      this.elements = null;
      this.hot = null;
    }
  }]);
  return BaseComponent;
}();
mixin(BaseComponent, localHooks);
export default BaseComponent;