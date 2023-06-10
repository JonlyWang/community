"use strict";

exports.__esModule = true;
exports.default = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Row utils class contains all necessary information about sizes of the rows.
 *
 * @class {RowUtils}
 */var RowUtils = /*#__PURE__*/function () {
  /**
   * @param {TableDao} dataAccessObject The table Data Access Object.
   * @param {Settings} wtSettings The walkontable settings.
   */
  function RowUtils(dataAccessObject, wtSettings) {
    _classCallCheck(this, RowUtils);
    this.dataAccessObject = dataAccessObject;
    this.wtSettings = wtSettings;
  }

  /**
   * Returns row height based on passed source index.
   *
   * @param {number} sourceIndex Row source index.
   * @returns {number}
   */
  _createClass(RowUtils, [{
    key: "getHeight",
    value: function getHeight(sourceIndex) {
      var height = this.wtSettings.getSetting('rowHeight', sourceIndex);
      var oversizedHeight = this.dataAccessObject.wtViewport.oversizedRows[sourceIndex];
      if (oversizedHeight !== void 0) {
        height = height === void 0 ? oversizedHeight : Math.max(height, oversizedHeight);
      }
      return height;
    }
  }]);
  return RowUtils;
}();
exports.default = RowUtils;