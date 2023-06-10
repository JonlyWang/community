import { DropdownEditor } from "../../editors/dropdownEditor/index.mjs";
import { autocompleteRenderer } from "../../renderers/autocompleteRenderer/index.mjs";
import { autocompleteValidator } from "../../validators/autocompleteValidator/index.mjs";
export var CELL_TYPE = 'dropdown';
export var DropdownCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: DropdownEditor,
  // displays small gray arrow on right side of the cell
  renderer: autocompleteRenderer,
  validator: autocompleteValidator
};