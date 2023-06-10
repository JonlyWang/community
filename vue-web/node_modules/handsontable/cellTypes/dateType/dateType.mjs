import { DateEditor } from "../../editors/dateEditor/index.mjs";
import { autocompleteRenderer } from "../../renderers/autocompleteRenderer/index.mjs";
import { dateValidator } from "../../validators/dateValidator/index.mjs";
export var CELL_TYPE = 'date';
export var DateCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: DateEditor,
  // displays small gray arrow on right side of the cell
  renderer: autocompleteRenderer,
  validator: dateValidator
};