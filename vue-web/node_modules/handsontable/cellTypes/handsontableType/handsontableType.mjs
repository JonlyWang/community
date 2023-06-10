import { HandsontableEditor } from "../../editors/handsontableEditor/index.mjs";
import { autocompleteRenderer } from "../../renderers/autocompleteRenderer/index.mjs";
export var CELL_TYPE = 'handsontable';
export var HandsontableCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: HandsontableEditor,
  // displays small gray arrow on right side of the cell
  renderer: autocompleteRenderer
};