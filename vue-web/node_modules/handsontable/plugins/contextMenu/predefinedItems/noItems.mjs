import { CONTEXTMENU_ITEMS_NO_ITEMS } from "../../../i18n/constants.mjs";
export var KEY = 'no_items';

/**
 * @returns {object}
 */
export default function noItemsItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(CONTEXTMENU_ITEMS_NO_ITEMS);
    },
    disabled: true,
    isCommand: false
  };
}