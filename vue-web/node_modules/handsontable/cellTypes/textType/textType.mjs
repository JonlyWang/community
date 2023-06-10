import { TextEditor } from "../../editors/textEditor/index.mjs";
import { textRenderer } from "../../renderers/textRenderer/index.mjs";
export var CELL_TYPE = 'text';
export var TextCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: TextEditor,
  renderer: textRenderer
};