import { AutocompleteEditor } from "../../editors/autocompleteEditor/index.mjs";
import { autocompleteRenderer } from "../../renderers/autocompleteRenderer/index.mjs";
import { autocompleteValidator } from "../../validators/autocompleteValidator/index.mjs";
export var CELL_TYPE = 'autocomplete';
export var AutocompleteCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: AutocompleteEditor,
  renderer: autocompleteRenderer,
  validator: autocompleteValidator
};