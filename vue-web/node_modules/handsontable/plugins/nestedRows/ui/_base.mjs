function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * Base class for the Nested Rows' UI sub-classes.
 *
 * @private
 * @class
 */var BaseUI = /*#__PURE__*/_createClass(function BaseUI(pluginInstance, hotInstance) {
  _classCallCheck(this, BaseUI);
  /**
   * Instance of Handsontable.
   *
   * @type {Core}
   */
  this.hot = hotInstance;
  /**
   * Reference to the main plugin instance.
   */
  this.plugin = pluginInstance;
});
export default BaseUI;