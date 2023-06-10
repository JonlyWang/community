"use strict";

exports.__esModule = true;
exports.default = void 0;
var _element = require("../../helpers/dom/element");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Comment editor for the Comments plugin.
 *
 * @private
 * @class CommentEditor
 */var CommentEditor = /*#__PURE__*/function () {
  function CommentEditor(rootDocument, isRtl) {
    _classCallCheck(this, CommentEditor);
    this.rootDocument = rootDocument;
    this.isRtl = isRtl;
    this.container = null;
    this.editor = this.createEditor();
    this.editorStyle = this.editor.style;
    this.hidden = true;
    this.hide();
  }

  /**
   * Set position of the comments editor according to the  provided x and y coordinates.
   *
   * @param {number} x X position (in pixels).
   * @param {number} y Y position (in pixels).
   */
  _createClass(CommentEditor, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.editorStyle.left = "".concat(x, "px");
      this.editorStyle.top = "".concat(y, "px");
    }

    /**
     * Set the editor size according to the provided arguments.
     *
     * @param {number} width Width in pixels.
     * @param {number} height Height in pixels.
     */
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      if (width && height) {
        var input = this.getInputElement();
        input.style.width = "".concat(width, "px");
        input.style.height = "".concat(height, "px");
      }
    }

    /**
     * Returns the size of the comments editor.
     *
     * @returns {{ width: number, height: number }}
     */
  }, {
    key: "getSize",
    value: function getSize() {
      return {
        width: (0, _element.outerWidth)(this.getInputElement()),
        height: (0, _element.outerHeight)(this.getInputElement())
      };
    }

    /**
     * Reset the editor size to its initial state.
     */
  }, {
    key: "resetSize",
    value: function resetSize() {
      var input = this.getInputElement();
      input.style.width = '';
      input.style.height = '';
    }

    /**
     * Set the read-only state for the comments editor.
     *
     * @param {boolean} state The new read only state.
     */
  }, {
    key: "setReadOnlyState",
    value: function setReadOnlyState(state) {
      var input = this.getInputElement();
      input.readOnly = state;
    }

    /**
     * Show the comments editor.
     */
  }, {
    key: "show",
    value: function show() {
      this.editorStyle.display = 'block';
      this.hidden = false;
    }

    /**
     * Hide the comments editor.
     */
  }, {
    key: "hide",
    value: function hide() {
      if (!this.hidden) {
        this.editorStyle.display = 'none';
      }
      this.hidden = true;
    }

    /**
     * Checks if the editor is visible.
     *
     * @returns {boolean}
     */
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.editorStyle.display === 'block';
    }

    /**
     * Set the comment value.
     *
     * @param {string} [value] The value to use.
     */
  }, {
    key: "setValue",
    value: function setValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var comment = value || '';
      this.getInputElement().value = comment;
    }

    /**
     * Get the comment value.
     *
     * @returns {string}
     */
  }, {
    key: "getValue",
    value: function getValue() {
      return this.getInputElement().value;
    }

    /**
     * Checks if the comment input element is focused.
     *
     * @returns {boolean}
     */
  }, {
    key: "isFocused",
    value: function isFocused() {
      return this.rootDocument.activeElement === this.getInputElement();
    }

    /**
     * Focus the comments input element.
     */
  }, {
    key: "focus",
    value: function focus() {
      this.getInputElement().focus();
    }

    /**
     * Create the `textarea` to be used as a comments editor.
     *
     * @returns {HTMLElement}
     */
  }, {
    key: "createEditor",
    value: function createEditor() {
      var editor = this.rootDocument.createElement('div');
      var textArea = this.rootDocument.createElement('textarea');
      editor.style.display = 'none';
      this.container = this.rootDocument.createElement('div');
      this.container.setAttribute('dir', this.isRtl ? 'rtl' : 'ltr');
      (0, _element.addClass)(this.container, CommentEditor.CLASS_EDITOR_CONTAINER);
      this.rootDocument.body.appendChild(this.container);
      (0, _element.addClass)(editor, CommentEditor.CLASS_EDITOR);
      (0, _element.addClass)(textArea, CommentEditor.CLASS_INPUT);
      editor.appendChild(textArea);
      this.container.appendChild(editor);
      return editor;
    }

    /**
     * Get the input element.
     *
     * @returns {HTMLElement}
     */
  }, {
    key: "getInputElement",
    value: function getInputElement() {
      return this.editor.querySelector(".".concat(CommentEditor.CLASS_INPUT));
    }

    /**
     * Destroy the comments editor.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var containerParentElement = this.container ? this.container.parentNode : null;
      this.editor.parentNode.removeChild(this.editor);
      this.editor = null;
      this.editorStyle = null;
      if (containerParentElement) {
        containerParentElement.removeChild(this.container);
      }
    }
  }], [{
    key: "CLASS_EDITOR_CONTAINER",
    get: function get() {
      return 'htCommentsContainer';
    }
  }, {
    key: "CLASS_EDITOR",
    get: function get() {
      return 'htComments';
    }
  }, {
    key: "CLASS_INPUT",
    get: function get() {
      return 'htCommentTextArea';
    }
  }, {
    key: "CLASS_CELL",
    get: function get() {
      return 'htCommentCell';
    }
  }]);
  return CommentEditor;
}();
var _default = CommentEditor;
exports.default = _default;