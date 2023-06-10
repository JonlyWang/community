import { NumericEditor } from "../../editors/numericEditor/index.mjs";
import { numericRenderer } from "../../renderers/numericRenderer/index.mjs";
import { numericValidator } from "../../validators/numericValidator/index.mjs";
export var CELL_TYPE = 'numeric';
export var NumericCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: NumericEditor,
  renderer: numericRenderer,
  validator: numericValidator,
  dataType: 'number'
};