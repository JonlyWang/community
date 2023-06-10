import * as C from "../../../i18n/constants.mjs";
import { checkSelectionBorders, markSelected } from "../utils.mjs"; /**
                                                                     * @param {CustomBorders} customBordersPlugin The plugin instance.
                                                                     * @returns {object}
                                                                     */
export default function right(customBordersPlugin) {
  var borderDirection = customBordersPlugin.hot.isRtl() ? 'start' : 'end';
  return {
    key: 'borders:right',
    name: function name() {
      var label = this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_BORDERS_RIGHT);
      var hasBorder = checkSelectionBorders(this, borderDirection);
      if (hasBorder) {
        label = markSelected(label);
      }
      return label;
    },
    callback: function callback(key, selected) {
      var hasBorder = checkSelectionBorders(this, borderDirection);
      customBordersPlugin.prepareBorder(selected, borderDirection, hasBorder);
    }
  };
}