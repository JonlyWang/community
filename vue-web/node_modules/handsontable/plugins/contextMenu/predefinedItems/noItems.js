"use strict";

exports.__esModule = true;
exports.KEY = void 0;
exports.default = noItemsItem;
var _constants = require("../../../i18n/constants");
var KEY = 'no_items';

/**
 * @returns {object}
 */
exports.KEY = KEY;
function noItemsItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(_constants.CONTEXTMENU_ITEMS_NO_ITEMS);
    },
    disabled: true,
    isCommand: false
  };
}