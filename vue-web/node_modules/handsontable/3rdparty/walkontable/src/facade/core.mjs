function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import Walkontable from "../core/core.mjs";
import CoreAbstract from "../core/_base.mjs"; /**
                                               * This layer cares about backward compatibility.
                                               *
                                               * @class WalkontableFacade
                                               * @augments Walkontable
                                               * @inheritDoc
                                               */
var WalkontableFacade = /*#__PURE__*/function () {
  /**
   * @param {SettingsPure|Walkontable} settingsOrInstance The Walkontable settings.
   */
  function WalkontableFacade(settingsOrInstance) {
    _classCallCheck(this, WalkontableFacade);
    if (settingsOrInstance instanceof CoreAbstract) {
      this._wot = settingsOrInstance;
    } else {
      this._initFromSettings(settingsOrInstance);
    }
  }
  _createClass(WalkontableFacade, [{
    key: "_initFromSettings",
    value: function _initFromSettings(settings) {
      settings.facade = function (instance) {
        var facade = new WalkontableFacade(instance);
        return function () {
          return facade;
        };
      };
      this._wot = new Walkontable(settings.table, settings);
    }
  }, {
    key: "guid",
    get: function get() {
      return this._wot.guid;
    }
  }, {
    key: "rootDocument",
    get: function get() {
      return this._wot.domBindings.rootDocument;
    }
  }, {
    key: "rootWindow",
    get: function get() {
      return this._wot.domBindings.rootWindow;
    }
  }, {
    key: "wtSettings",
    get: function get() {
      return this._wot.wtSettings; // todo create facade
    }
  }, {
    key: "cloneSource",
    get: function get() {
      return this._wot.cloneSource; // todo create facade
    }
  }, {
    key: "cloneOverlay",
    get: function get() {
      return this._wot.cloneOverlay; // todo create facade
    }
  }, {
    key: "selections",
    get: function get() {
      return this._wot.selections; // todo create facade
    }
  }, {
    key: "wtViewport",
    get: function get() {
      return this._wot.wtViewport; // todo create facade
    }
  }, {
    key: "wtOverlays",
    get: function get() {
      return this._wot.wtOverlays; // todo create facade
    }
  }, {
    key: "wtTable",
    get: function get() {
      return this._wot.wtTable; // todo create facade
    }
  }, {
    key: "wtEvent",
    get: function get() {
      return this._wot.wtEvent; // todo create facade
    }
  }, {
    key: "wtScroll",
    get: function get() {
      return this._wot.wtScroll; // todo create facade
    }
  }, {
    key: "drawn",
    get: function get() {
      return this._wot.drawn;
    },
    set: function set(value) {
      this._wot.drawn = value;
    }
  }, {
    key: "drawInterrupted",
    get: function get() {
      return this._wot.drawInterrupted;
    },
    set: function set(value) {
      this._wot.drawInterrupted = value;
    }
  }, {
    key: "lastMouseOver",
    get: function get() {
      return this._wot.lastMouseOver;
    },
    set: function set(value) {
      this._wot.lastMouseOver = value;
    }
  }, {
    key: "momentumScrolling",
    get: function get() {
      return this._wot.momentumScrolling;
    },
    set: function set(value) {
      this._wot.momentumScrolling = value;
    }
  }, {
    key: "touchApplied",
    get: function get() {
      return this._wot.touchApplied;
    },
    set: function set(value) {
      this._wot.touchApplied = value;
    }
  }, {
    key: "domBindings",
    get: function get() {
      return this._wot.domBindings;
    }
  }, {
    key: "eventListeners",
    get: function get() {
      return this._wot.eventListeners;
    },
    set: function set(value) {
      this._wot.eventListeners = value;
    }
  }, {
    key: "eventManager",
    get: function get() {
      return this._wot.eventManager;
    }
  }, {
    key: "createCellCoords",
    value: function createCellCoords(row, column) {
      return this._wot.createCellCoords(row, column);
    }
  }, {
    key: "createCellRange",
    value: function createCellRange(highlight, from, to) {
      return this._wot.createCellRange(highlight, from, to);
    }
  }, {
    key: "draw",
    value: function draw() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this._wot.draw(fastDraw);
      return this;
    }
  }, {
    key: "getCell",
    value: function getCell(coords) {
      var topmost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._wot.getCell(coords, topmost);
    }
  }, {
    key: "scrollViewport",
    value: function scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft) {
      return this._wot.scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft);
    }
  }, {
    key: "scrollViewportHorizontally",
    value: function scrollViewportHorizontally(column, snapToRight, snapToLeft) {
      return this._wot.scrollViewportHorizontally(column, snapToRight, snapToLeft);
    }
  }, {
    key: "scrollViewportVertically",
    value: function scrollViewportVertically(row, snapToTop, snapToBottom) {
      return this._wot.scrollViewportVertically(row, snapToTop, snapToBottom);
    }
  }, {
    key: "getViewport",
    value: function getViewport() {
      return this._wot.getViewport();
    }
  }, {
    key: "getOverlayName",
    value: function getOverlayName() {
      return this._wot.cloneOverlay ? this._wot.cloneOverlay.type : 'master';
    }
  }, {
    key: "exportSettingsAsClassNames",
    value: function exportSettingsAsClassNames() {
      return this._wot.exportSettingsAsClassNames();
    }
  }, {
    key: "update",
    value: function update(settings, value) {
      this._wot.wtSettings.update(settings, value);
      return this;
    }
  }, {
    key: "getSetting",
    value: function getSetting(key, param1, param2, param3, param4) {
      return this._wot.wtSettings.getSetting(key, param1, param2, param3, param4);
    }
  }, {
    key: "hasSetting",
    value: function hasSetting(key) {
      return this._wot.wtSettings.hasSetting(key);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._wot.destroy();
    }
  }]);
  return WalkontableFacade;
}();
export { WalkontableFacade as default };