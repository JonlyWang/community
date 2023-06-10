import { PasswordEditor } from "../../editors/passwordEditor/index.mjs";
import { passwordRenderer } from "../../renderers/passwordRenderer/index.mjs";
export var CELL_TYPE = 'password';
export var PasswordCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: PasswordEditor,
  renderer: passwordRenderer,
  copyable: false
};