import { TimeEditor } from "../../editors/timeEditor/index.mjs";
import { timeRenderer } from "../../renderers/timeRenderer/index.mjs";
import { timeValidator } from "../../validators/timeValidator/index.mjs";
export var CELL_TYPE = 'time';
export var TimeCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: TimeEditor,
  renderer: timeRenderer,
  validator: timeValidator
};