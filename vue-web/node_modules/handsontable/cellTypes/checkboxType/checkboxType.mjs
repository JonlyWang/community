import { CheckboxEditor } from "../../editors/checkboxEditor/index.mjs";
import { checkboxRenderer } from "../../renderers/checkboxRenderer/index.mjs";
export var CELL_TYPE = 'checkbox';
export var CheckboxCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: CheckboxEditor,
  renderer: checkboxRenderer
};