"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.Comments = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _element = require("../../helpers/dom/element");
var _object = require("../../helpers/object");
var _eventManager = _interopRequireDefault(require("../../eventManager"));
var _base = require("../base");
var _commentEditor = _interopRequireDefault(require("./commentEditor"));
var _utils = require("../contextMenu/utils");
var _displaySwitch = _interopRequireDefault(require("./displaySwitch"));
var C = _interopRequireWildcard(require("../../i18n/constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var PLUGIN_KEY = 'comments';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 60;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var privatePool = new WeakMap();
var META_COMMENT = 'comment';
var META_COMMENT_VALUE = 'value';
var META_STYLE = 'style';
var META_READONLY = 'readOnly';

/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @plugin Comments
 * @class Comments
 *
 * @description
 * This plugin allows setting and managing cell comments by either an option in the context menu or with the use of
 * the API.
 *
 * To enable the plugin, you'll need to set the comments property of the config object to `true`:
 * ```js
 * comments: true
 * ```
 *
 * or an object with extra predefined plugin config:
 *
 * ```js
 * comments: {
 *   displayDelay: 1000,
 *   readOnly: true,
 *   style: {
 *     width: 300,
 *     height: 100
 *   }
 * }
 * ```
 *
 * To add comments at the table initialization, define the `comment` property in the `cell` config array as in an example below.
 *
 * @example
 * ::: only-for javascript
 * ```js
 * const hot = new Handsontable(document.getElementById('example'), {
 *   data: getData(),
 *   comments: true,
 *   cell: [
 *     {row: 1, col: 1, comment: {value: 'Foo'}},
 *     {row: 2, col: 2, comment: {value: 'Bar'}}
 *   ]
 * });
 *
 * // Access to the Comments plugin instance:
 * const commentsPlugin = hot.getPlugin('comments');
 *
 * // Manage comments programmatically:
 * commentsPlugin.setCommentAtCell(1, 6, 'Comment contents');
 * commentsPlugin.showAtCell(1, 6);
 * commentsPlugin.removeCommentAtCell(1, 6);
 *
 * // You can also set range once and use proper methods:
 * commentsPlugin.setRange({from: {row: 1, col: 6}});
 * commentsPlugin.setComment('Comment contents');
 * commentsPlugin.show();
 * commentsPlugin.removeComment();
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * const hotRef = useRef(null);
 *
 * ...
 *
 * <HotTable
 *   ref={hotRef}
 *   data={getData()}
 *   comments={true}
 *   cell={[
 *     {row: 1, col: 1, comment: {value: 'Foo'}},
 *     {row: 2, col: 2, comment: {value: 'Bar'}}
 *   ]}
 * />
 *
 * // Access to the Comments plugin instance:
 * const hot = hotRef.current.hotInstance;
 * const commentsPlugin = hot.getPlugin('comments');
 *
 * // Manage comments programmatically:
 * commentsPlugin.setCommentAtCell(1, 6, 'Comment contents');
 * commentsPlugin.showAtCell(1, 6);
 * commentsPlugin.removeCommentAtCell(1, 6);
 *
 * // You can also set range once and use proper methods:
 * commentsPlugin.setRange({from: {row: 1, col: 6}});
 * commentsPlugin.setComment('Comment contents');
 * commentsPlugin.show();
 * commentsPlugin.removeComment();
 * ```
 * :::
 */
var Comments = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Comments, _BasePlugin);
  var _super = _createSuper(Comments);
  function Comments(hotInstance) {
    var _this;
    _classCallCheck(this, Comments);
    _this = _super.call(this, hotInstance);
    /**
     * Instance of {@link CommentEditor}.
     *
     * @private
     * @type {CommentEditor}
     */
    _this.editor = null;
    /**
     * Instance of {@link DisplaySwitch}.
     *
     * @private
     * @type {DisplaySwitch}
     */
    _this.displaySwitch = null;
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    _this.eventManager = null;
    /**
     * Current cell range, an object with `from` property, with `row` and `col` properties (e.q. `{from: {row: 1, col: 6}}`).
     *
     * @type {object}
     */
    _this.range = {};
    /**
     * Prevents showing/hiding editor that reacts on the logic triggered by the "mouseover" events.
     *
     * @private
     * @type {boolean}
     */
    _this.preventEditorAutoSwitch = false;
    privatePool.set(_assertThisInitialized(_this), {
      tempEditorDimensions: {},
      cellBelowCursor: null
    });
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link Comments#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(Comments, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings()[PLUGIN_KEY];
    }

    /**
     * Enables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;
      if (this.enabled) {
        return;
      }
      if (!this.editor) {
        this.editor = new _commentEditor.default(this.hot.rootDocument, this.hot.isRtl());
      }
      if (!this.eventManager) {
        this.eventManager = new _eventManager.default(this);
      }
      if (!this.displaySwitch) {
        this.displaySwitch = new _displaySwitch.default(this.getDisplayDelaySetting());
      }
      this.addHook('afterContextMenuDefaultOptions', function (options) {
        return _this2.addToContextMenu(options);
      });
      this.addHook('afterRenderer', function (TD, row, col, prop, value, cellProperties) {
        return _this2.onAfterRenderer(TD, cellProperties);
      });
      this.addHook('afterScrollHorizontally', function () {
        return _this2.hide();
      });
      this.addHook('afterScrollVertically', function () {
        return _this2.hide();
      });
      this.addHook('afterBeginEditing', function () {
        return _this2.hide();
      });
      this.displaySwitch.addLocalHook('hide', function () {
        return _this2.hide();
      });
      this.displaySwitch.addLocalHook('show', function (row, col) {
        return _this2.showAtCell(row, col);
      });
      this.registerListeners();
      _get(_getPrototypeOf(Comments.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *   - [`comments`](@/api/options.md#comments)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(Comments.prototype), "updatePlugin", this).call(this);
      this.displaySwitch.updateDelay(this.getDisplayDelaySetting());
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      _get(_getPrototypeOf(Comments.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Registers all necessary DOM listeners.
     *
     * @private
     */
  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this3 = this;
      var rootDocument = this.hot.rootDocument;
      this.eventManager.addEventListener(rootDocument, 'mouseover', function (event) {
        return _this3.onMouseOver(event);
      });
      this.eventManager.addEventListener(rootDocument, 'mousedown', function (event) {
        return _this3.onMouseDown(event);
      });
      this.eventManager.addEventListener(rootDocument, 'mouseup', function () {
        return _this3.onMouseUp();
      });
      this.eventManager.addEventListener(this.editor.getInputElement(), 'blur', function () {
        return _this3.onEditorBlur();
      });
      this.eventManager.addEventListener(this.editor.getInputElement(), 'mousedown', function (event) {
        return _this3.onEditorMouseDown(event);
      });
      this.eventManager.addEventListener(this.editor.getInputElement(), 'mouseup', function (event) {
        return _this3.onEditorMouseUp(event);
      });
    }

    /**
     * Sets the current cell range to be able to use general methods like {@link Comments#setComment}, {@link Comments#removeComment}, {@link Comments#show}.
     *
     * @param {object} range Object with `from` property, each with `row` and `col` properties.
     */
  }, {
    key: "setRange",
    value: function setRange(range) {
      this.range = range;
    }

    /**
     * Clears the currently selected cell.
     */
  }, {
    key: "clearRange",
    value: function clearRange() {
      this.range = {};
    }

    /**
     * Checks if the event target is a cell containing a comment.
     *
     * @private
     * @param {Event} event DOM event.
     * @returns {boolean}
     */
  }, {
    key: "targetIsCellWithComment",
    value: function targetIsCellWithComment(event) {
      var closestCell = (0, _element.closest)(event.target, 'TD', 'TBODY');
      return !!(closestCell && (0, _element.hasClass)(closestCell, 'htCommentCell') && (0, _element.closest)(closestCell, [this.hot.rootElement]));
    }

    /**
     * Checks if the event target is a comment textarea.
     *
     * @private
     * @param {Event} event DOM event.
     * @returns {boolean}
     */
  }, {
    key: "targetIsCommentTextArea",
    value: function targetIsCommentTextArea(event) {
      return this.editor.getInputElement() === event.target;
    }

    /**
     * Sets a comment for a cell according to the previously set range (see {@link Comments#setRange}).
     *
     * @param {string} value Comment contents.
     */
  }, {
    key: "setComment",
    value: function setComment(value) {
      if (!this.range.from) {
        throw new Error('Before using this method, first set cell range (hot.getPlugin("comment").setRange())');
      }
      var editorValue = this.editor.getValue();
      var comment = '';
      if (value !== null && value !== void 0) {
        comment = value;
      } else if (editorValue !== null && editorValue !== void 0) {
        comment = editorValue;
      }
      var row = this.range.from.row;
      var col = this.range.from.col;
      this.updateCommentMeta(row, col, _defineProperty({}, META_COMMENT_VALUE, comment));
      this.hot.render();
    }

    /**
     * Sets a comment for a specified cell.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {string} value Comment contents.
     */
  }, {
    key: "setCommentAtCell",
    value: function setCommentAtCell(row, column, value) {
      this.setRange({
        from: this.hot._createCellCoords(row, column)
      });
      this.setComment(value);
    }

    /**
     * Removes a comment from a cell according to previously set range (see {@link Comments#setRange}).
     *
     * @param {boolean} [forceRender=true] If set to `true`, the table will be re-rendered at the end of the operation.
     */
  }, {
    key: "removeComment",
    value: function removeComment() {
      var forceRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.range.from) {
        throw new Error('Before using this method, first set cell range (hot.getPlugin("comment").setRange())');
      }
      this.hot.setCellMeta(this.range.from.row, this.range.from.col, META_COMMENT);
      if (forceRender) {
        this.hot.render();
      }
      this.hide();
    }

    /**
     * Removes a comment from a specified cell.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {boolean} [forceRender=true] If `true`, the table will be re-rendered at the end of the operation.
     */
  }, {
    key: "removeCommentAtCell",
    value: function removeCommentAtCell(row, column) {
      var forceRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.setRange({
        from: this.hot._createCellCoords(row, column)
      });
      this.removeComment(forceRender);
    }

    /**
     * Gets comment from a cell according to previously set range (see {@link Comments#setRange}).
     *
     * @returns {string|undefined} Returns a content of the comment.
     */
  }, {
    key: "getComment",
    value: function getComment() {
      var row = this.range.from.row;
      var column = this.range.from.col;
      return this.getCommentMeta(row, column, META_COMMENT_VALUE);
    }

    /**
     * Gets comment from a cell at the provided coordinates.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @returns {string|undefined} Returns a content of the comment.
     */
  }, {
    key: "getCommentAtCell",
    value: function getCommentAtCell(row, column) {
      return this.getCommentMeta(row, column, META_COMMENT_VALUE);
    }

    /**
     * Shows the comment editor accordingly to the previously set range (see {@link Comments#setRange}).
     *
     * @returns {boolean} Returns `true` if comment editor was shown.
     */
  }, {
    key: "show",
    value: function show() {
      if (!this.range.from) {
        throw new Error('Before using this method, first set cell range (hot.getPlugin("comment").setRange())');
      }
      var _this$range$from = this.range.from,
        row = _this$range$from.row,
        col = _this$range$from.col;
      if (row < 0 || row > this.hot.countSourceRows() - 1 || col < 0 || col > this.hot.countSourceCols() - 1) {
        return false;
      }
      var meta = this.hot.getCellMeta(this.range.from.row, this.range.from.col);
      this.editor.setValue(meta[META_COMMENT] ? meta[META_COMMENT][META_COMMENT_VALUE] : null || '');
      this.editor.show();
      this.refreshEditor(true);
      return true;
    }

    /**
     * Shows comment editor according to cell coordinates.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @returns {boolean} Returns `true` if comment editor was shown.
     */
  }, {
    key: "showAtCell",
    value: function showAtCell(row, column) {
      this.setRange({
        from: this.hot._createCellCoords(row, column)
      });
      return this.show();
    }

    /**
     * Hides the comment editor.
     */
  }, {
    key: "hide",
    value: function hide() {
      this.editor.hide();
    }

    /**
     * Refreshes comment editor position and styling.
     *
     * @param {boolean} [force=false] If `true` then recalculation will be forced.
     */
  }, {
    key: "refreshEditor",
    value: function refreshEditor() {
      var _renderableRow, _renderableColumn;
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!force && (!this.range.from || !this.editor.isVisible())) {
        return;
      }
      var _this$hot = this.hot,
        rowIndexMapper = _this$hot.rowIndexMapper,
        columnIndexMapper = _this$hot.columnIndexMapper;
      var _this$range$from2 = this.range.from,
        visualRow = _this$range$from2.row,
        visualColumn = _this$range$from2.col;
      var renderableRow = rowIndexMapper.getRenderableFromVisualIndex(visualRow);
      var renderableColumn = columnIndexMapper.getRenderableFromVisualIndex(visualColumn);
      // Used when the requested row is hidden, and the editor needs to be positioned on the previous row's coords.
      var targetingPreviousRow = renderableRow === null;
      if (renderableRow === null) {
        renderableRow = rowIndexMapper.getRenderableFromVisualIndex(rowIndexMapper.getNearestNotHiddenIndex(visualRow, -1));
      }
      if (renderableColumn === null) {
        renderableColumn = columnIndexMapper.getRenderableFromVisualIndex(columnIndexMapper.getNearestNotHiddenIndex(visualColumn, -1));
      }
      var isBeforeRenderedRows = renderableRow === null;
      var isBeforeRenderedColumns = renderableColumn === null;
      renderableRow = (_renderableRow = renderableRow) !== null && _renderableRow !== void 0 ? _renderableRow : 0;
      renderableColumn = (_renderableColumn = renderableColumn) !== null && _renderableColumn !== void 0 ? _renderableColumn : 0;
      var _this$hot2 = this.hot,
        rootWindow = _this$hot2.rootWindow,
        wt = _this$hot2.view._wt;
      var wtTable = wt.wtTable;
      var TD = wtTable.getCell({
        row: renderableRow,
        col: renderableColumn
      });
      var commentStyle = this.getCommentMeta(visualRow, visualColumn, META_STYLE);
      if (commentStyle) {
        this.editor.setSize(commentStyle.width, commentStyle.height);
      } else {
        this.editor.resetSize();
      }
      var lastColWidth = isBeforeRenderedColumns ? 0 : wtTable.getStretchedColumnWidth(renderableColumn);
      var lastRowHeight = targetingPreviousRow && !isBeforeRenderedRows ? (0, _element.outerHeight)(TD) : 0;
      var _TD$getBoundingClient = TD.getBoundingClientRect(),
        left = _TD$getBoundingClient.left,
        top = _TD$getBoundingClient.top,
        cellWidth = _TD$getBoundingClient.width,
        cellHeight = _TD$getBoundingClient.height;
      var _this$editor$getSize = this.editor.getSize(),
        editorWidth = _this$editor$getSize.width,
        editorHeight = _this$editor$getSize.height;
      var _this$hot$rootWindow = this.hot.rootWindow,
        innerWidth = _this$hot$rootWindow.innerWidth,
        innerHeight = _this$hot$rootWindow.innerHeight;
      var documentElement = this.hot.rootDocument.documentElement;
      var x = left + rootWindow.scrollX + lastColWidth;
      var y = top + rootWindow.scrollY + lastRowHeight;
      if (this.hot.isRtl()) {
        x -= editorWidth + lastColWidth;
      }

      // flip to the right or left the comments editor position when it goes out of browser viewport
      if (this.hot.isLtr() && left + cellWidth + editorWidth > innerWidth) {
        x = left + rootWindow.scrollX - editorWidth - 1;
      } else if (this.hot.isRtl() && x < -(documentElement.scrollWidth - documentElement.clientWidth)) {
        x = left + rootWindow.scrollX + lastColWidth + 1;
      }
      if (top + editorHeight > innerHeight) {
        y -= editorHeight - cellHeight + 1;
      }
      this.editor.setPosition(x, y);
      this.editor.setReadOnlyState(this.getCommentMeta(visualRow, visualColumn, META_READONLY));
    }

    /**
     * Checks if there is a comment for selected range.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "checkSelectionCommentsConsistency",
    value: function checkSelectionCommentsConsistency() {
      var selected = this.hot.getSelectedRangeLast();
      if (!selected) {
        return false;
      }
      var hasComment = false;
      var cell = selected.getTopStartCorner(); // IN EXCEL THERE IS COMMENT ONLY FOR TOP LEFT CELL IN SELECTION

      if (this.getCommentMeta(cell.row, cell.col, META_COMMENT_VALUE)) {
        hasComment = true;
      }
      return hasComment;
    }

    /**
     * Sets or update the comment-related cell meta.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {object} metaObject Object defining all the comment-related meta information.
     */
  }, {
    key: "updateCommentMeta",
    value: function updateCommentMeta(row, column, metaObject) {
      var oldComment = this.hot.getCellMeta(row, column)[META_COMMENT];
      var newComment;
      if (oldComment) {
        newComment = (0, _object.deepClone)(oldComment);
        (0, _object.deepExtend)(newComment, metaObject);
      } else {
        newComment = metaObject;
      }
      this.hot.setCellMeta(row, column, META_COMMENT, newComment);
    }

    /**
     * Gets the comment related meta information.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {string} property Cell meta property.
     * @returns {Mixed}
     */
  }, {
    key: "getCommentMeta",
    value: function getCommentMeta(row, column, property) {
      var cellMeta = this.hot.getCellMeta(row, column);
      if (!cellMeta[META_COMMENT]) {
        return void 0;
      }
      return cellMeta[META_COMMENT][property];
    }

    /**
     * `mousedown` event callback.
     *
     * @private
     * @param {MouseEvent} event The `mousedown` event.
     */
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (!this.hot.view || !this.hot.view._wt) {
        return;
      }
      if (!this.preventEditorAutoSwitch && !this.targetIsCommentTextArea(event)) {
        var eventCell = (0, _element.closest)(event.target, 'TD', 'TBODY');
        var coordinates = null;
        if (eventCell) {
          coordinates = this.hot.getCoords(eventCell);
        }
        if (!eventCell || this.range.from && coordinates && (this.range.from.row !== coordinates.row || this.range.from.col !== coordinates.col)) {
          this.hide();
        }
      }
    }

    /**
     * `mouseover` event callback.
     *
     * @private
     * @param {MouseEvent} event The `mouseover` event.
     */
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      var priv = privatePool.get(this);
      var rootDocument = this.hot.rootDocument;
      if (this.preventEditorAutoSwitch || this.editor.isFocused() || (0, _element.hasClass)(event.target, 'wtBorder') || priv.cellBelowCursor === event.target || !this.editor) {
        return;
      }
      priv.cellBelowCursor = rootDocument.elementFromPoint(event.clientX, event.clientY);
      if (this.targetIsCellWithComment(event)) {
        var range = this.hot._createCellRange(this.hot.getCoords(event.target));
        this.displaySwitch.show(range);
      } else if ((0, _element.isChildOf)(event.target, rootDocument) && !this.targetIsCommentTextArea(event)) {
        this.displaySwitch.hide();
      }
    }

    /**
     * `mouseup` event callback.
     *
     * @private
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      this.preventEditorAutoSwitch = false;
    }

    /**
     * The `afterRenderer` hook callback.
     *
     * @private
     * @param {HTMLTableCellElement} TD The rendered `TD` element.
     * @param {object} cellProperties The rendered cell's property object.
     */
  }, {
    key: "onAfterRenderer",
    value: function onAfterRenderer(TD, cellProperties) {
      if (cellProperties[META_COMMENT] && cellProperties[META_COMMENT][META_COMMENT_VALUE]) {
        (0, _element.addClass)(TD, cellProperties.commentedCellClassName);
      }
    }

    /**
     * `blur` event callback for the comment editor.
     *
     * @private
     */
  }, {
    key: "onEditorBlur",
    value: function onEditorBlur() {
      this.setComment();
    }

    /**
     * `mousedown` hook. Along with `onEditorMouseUp` used to simulate the textarea resizing event.
     *
     * @private
     * @param {MouseEvent} event The `mousedown` event.
     */
  }, {
    key: "onEditorMouseDown",
    value: function onEditorMouseDown(event) {
      var priv = privatePool.get(this);
      priv.tempEditorDimensions = {
        width: (0, _element.outerWidth)(event.target),
        height: (0, _element.outerHeight)(event.target)
      };
    }

    /**
     * `mouseup` hook. Along with `onEditorMouseDown` used to simulate the textarea resizing event.
     *
     * @private
     * @param {MouseEvent} event The `mouseup` event.
     */
  }, {
    key: "onEditorMouseUp",
    value: function onEditorMouseUp(event) {
      var priv = privatePool.get(this);
      var currentWidth = (0, _element.outerWidth)(event.target);
      var currentHeight = (0, _element.outerHeight)(event.target);
      if (currentWidth !== priv.tempEditorDimensions.width + 1 || currentHeight !== priv.tempEditorDimensions.height + 2) {
        this.updateCommentMeta(this.range.from.row, this.range.from.col, _defineProperty({}, META_STYLE, {
          width: currentWidth,
          height: currentHeight
        }));
      }
    }

    /**
     * Context Menu's "Add comment" callback. Results in showing the comment editor.
     *
     * @private
     */
  }, {
    key: "onContextMenuAddComment",
    value: function onContextMenuAddComment() {
      var coords = this.hot.getSelectedRangeLast();
      this.preventEditorAutoSwitch = true;
      this.displaySwitch.cancelHiding();
      this.setRange({
        from: coords.highlight
      });
      this.show();
      this.hot.deselectCell();
      this.editor.focus();
    }

    /**
     * Context Menu's "remove comment" callback.
     *
     * @private
     */
  }, {
    key: "onContextMenuRemoveComment",
    value: function onContextMenuRemoveComment() {
      var _this4 = this;
      var coords = this.hot.getSelectedRangeLast();
      this.preventEditorAutoSwitch = true;
      coords.forAll(function (row, column) {
        if (row >= 0 && column >= 0) {
          _this4.removeCommentAtCell(row, column, false);
        }
      });
      this.hot.render();
    }

    /**
     * Context Menu's "make comment read-only" callback.
     *
     * @private
     */
  }, {
    key: "onContextMenuMakeReadOnly",
    value: function onContextMenuMakeReadOnly() {
      var _this5 = this;
      var coords = this.hot.getSelectedRangeLast();
      this.preventEditorAutoSwitch = true;
      coords.forAll(function (row, column) {
        if (row >= 0 && column >= 0) {
          var currentState = !!_this5.getCommentMeta(row, column, META_READONLY);
          _this5.updateCommentMeta(row, column, _defineProperty({}, META_READONLY, !currentState));
        }
      });
    }

    /**
     * Add Comments plugin options to the Context Menu.
     *
     * @private
     * @param {object} defaultOptions The menu options.
     */
  }, {
    key: "addToContextMenu",
    value: function addToContextMenu(defaultOptions) {
      var _this6 = this;
      var isThereAnyCellRendered = function isThereAnyCellRendered() {
        return _this6.hot.rowIndexMapper.getRenderableIndexesLength() > 0 && _this6.hot.columnIndexMapper.getRenderableIndexesLength() > 0;
      };
      defaultOptions.items.push({
        name: '---------'
      }, {
        key: 'commentsAddEdit',
        name: function name() {
          if (_this6.checkSelectionCommentsConsistency()) {
            return _this6.hot.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_EDIT_COMMENT);
          }
          return _this6.hot.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_ADD_COMMENT);
        },
        callback: function callback() {
          return _this6.onContextMenuAddComment();
        },
        disabled: function disabled() {
          if (!isThereAnyCellRendered()) {
            return true;
          }
          return !(_this6.hot.getSelectedLast() && !_this6.hot.selection.isSelectedByCorner());
        }
      }, {
        key: 'commentsRemove',
        name: function name() {
          return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_REMOVE_COMMENT);
        },
        callback: function callback() {
          return _this6.onContextMenuRemoveComment();
        },
        disabled: function disabled() {
          if (!isThereAnyCellRendered()) {
            return true;
          }
          return !(_this6.hot.getSelectedLast() && !_this6.hot.selection.isSelectedByCorner());
        }
      }, {
        key: 'commentsReadOnly',
        name: function name() {
          var _this7 = this;
          var label = this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT);
          var hasProperty = (0, _utils.checkSelectionConsistency)(this.getSelectedRangeLast(), function (row, col) {
            var readOnlyProperty = _this7.getCellMeta(row, col)[META_COMMENT];
            if (readOnlyProperty) {
              readOnlyProperty = readOnlyProperty[META_READONLY];
            }
            if (readOnlyProperty) {
              return true;
            }
          });
          if (hasProperty) {
            label = (0, _utils.markLabelAsSelected)(label);
          }
          return label;
        },
        callback: function callback() {
          return _this6.onContextMenuMakeReadOnly();
        },
        disabled: function disabled() {
          if (!isThereAnyCellRendered()) {
            return true;
          }
          return !(_this6.hot.getSelectedLast() && !_this6.hot.selection.isSelectedByCorner()) || !_this6.checkSelectionCommentsConsistency();
        }
      });
    }

    /**
     * Get `displayDelay` setting of comment plugin.
     *
     * @private
     * @returns {number|undefined}
     */
  }, {
    key: "getDisplayDelaySetting",
    value: function getDisplayDelaySetting() {
      var commentSetting = this.hot.getSettings()[PLUGIN_KEY];
      if ((0, _object.isObject)(commentSetting)) {
        return commentSetting.displayDelay;
      }
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.editor) {
        this.editor.destroy();
      }
      if (this.displaySwitch) {
        this.displaySwitch.destroy();
      }
      _get(_getPrototypeOf(Comments.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);
  return Comments;
}(_base.BasePlugin);
exports.Comments = Comments;