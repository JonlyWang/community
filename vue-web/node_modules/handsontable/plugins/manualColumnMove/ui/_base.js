"use strict";

exports.__esModule = true;
exports.default = void 0;
var _number = require("../../../helpers/number");
var _string = require("../../../helpers/string");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var STATE_INITIALIZED = 0;
var STATE_BUILT = 1;
var STATE_APPENDED = 2;
var UNIT = 'px';

/**
 * @class
 * @private
 */
var BaseUI = /*#__PURE__*/function () {
  function BaseUI(hotInstance) {
    _classCallCheck(this, BaseUI);
    /**
     * Instance of Handsontable.
     *
     * @type {Core}
     */
    this.hot = hotInstance;
    /**
     * DOM element representing the ui element.
     *
     * @type {HTMLElement}
     * @private
     */
    this._element = null;
    /**
     * Flag which determines build state of element.
     *
     * @type {number}
     */
    this.state = STATE_INITIALIZED;
    /**
     * Defines the "start" physical CSS property name used within the class depending on what document
     * layout direction the library runs.
     *
     * @type {string}
     */
    this.inlineProperty = hotInstance.isRtl() ? 'right' : 'left';
  }

  /**
   * Add created UI elements to table.
   *
   * @param {HTMLElement} wrapper Element which are parent for our UI element.
   */
  _createClass(BaseUI, [{
    key: "appendTo",
    value: function appendTo(wrapper) {
      wrapper.appendChild(this._element);
      this.state = STATE_APPENDED;
    }

    /**
     * Method for create UI element. Only create, without append to table.
     */
  }, {
    key: "build",
    value: function build() {
      if (this.state !== STATE_INITIALIZED) {
        return;
      }
      this._element = this.hot.rootDocument.createElement('div');
      this.state = STATE_BUILT;
    }

    /**
     * Method for remove UI element.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.isAppended()) {
        this._element.parentElement.removeChild(this._element);
      }
      this._element = null;
      this.state = STATE_INITIALIZED;
    }

    /**
     * Check if UI element are appended.
     *
     * @returns {boolean}
     */
  }, {
    key: "isAppended",
    value: function isAppended() {
      return this.state === STATE_APPENDED;
    }

    /**
     * Check if UI element are built.
     *
     * @returns {boolean}
     */
  }, {
    key: "isBuilt",
    value: function isBuilt() {
      return this.state >= STATE_BUILT;
    }

    /**
     * Setter for position.
     *
     * @param {number} top New top position of the element.
     * @param {number} inlinePosition New left/right (depends on LTR/RTL document mode) position of the element.
     */
  }, {
    key: "setPosition",
    value: function setPosition(top, inlinePosition) {
      if ((0, _number.isNumeric)(top)) {
        this._element.style.top = top + UNIT;
      }
      if ((0, _number.isNumeric)(inlinePosition)) {
        this._element.style[this.inlineProperty] = inlinePosition + UNIT;
      }
    }

    /**
     * Getter for the element position.
     *
     * @returns {object} Object contains left and top position of the element.
     */
  }, {
    key: "getPosition",
    value: function getPosition() {
      var style = this._element.style;
      return {
        top: style.top ? parseInt(style.top, 10) : 0,
        start: style[this.inlineProperty] ? parseInt(style[this.inlineProperty], 10) : 0
      };
    }

    /**
     * Setter for the element size.
     *
     * @param {number} width New width of the element.
     * @param {number} height New height of the element.
     */
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      if ((0, _number.isNumeric)(width)) {
        this._element.style.width = width + UNIT;
      }
      if ((0, _number.isNumeric)(height)) {
        this._element.style.height = height + UNIT;
      }
    }

    /**
     * Getter for the element position.
     *
     * @returns {object} Object contains height and width of the element.
     */
  }, {
    key: "getSize",
    value: function getSize() {
      return {
        width: this._element.style.width ? parseInt(this._element.style.width, 10) : 0,
        height: this._element.style.height ? parseInt(this._element.style.height, 10) : 0
      };
    }

    /**
     * Setter for the element offset. Offset means marginTop and marginLeft of the element.
     *
     * @param {number} top New margin top of the element.
     * @param {number} inlineOffset New margin left/right (depends on LTR/RTL document mode) of the element.
     */
  }, {
    key: "setOffset",
    value: function setOffset(top, inlineOffset) {
      if ((0, _number.isNumeric)(top)) {
        this._element.style.marginTop = top + UNIT;
      }
      if ((0, _number.isNumeric)(inlineOffset)) {
        this._element.style["margin".concat((0, _string.toUpperCaseFirst)(this.inlineProperty))] = inlineOffset + UNIT;
      }
    }

    /**
     * Getter for the element offset.
     *
     * @returns {object} Object contains top and left offset of the element.
     */
  }, {
    key: "getOffset",
    value: function getOffset() {
      var style = this._element.style;
      var inlineProp = "margin".concat((0, _string.toUpperCaseFirst)(this.inlineProperty));
      return {
        top: style.marginTop ? parseInt(style.marginTop, 10) : 0,
        start: style[inlineProp] ? parseInt(style[inlineProp], 10) : 0
      };
    }
  }]);
  return BaseUI;
}();
var _default = BaseUI;
exports.default = _default;