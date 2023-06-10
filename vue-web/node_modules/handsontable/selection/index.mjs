import Highlight from "./highlight/highlight.mjs";
import Selection from "./selection.mjs";
import { handleMouseEvent } from "./mouseEventHandler.mjs";
import { detectSelectionType, normalizeSelectionFactory } from "./utils.mjs";
export * from "./highlight/constants.mjs";
export { handleMouseEvent, Highlight, Selection, detectSelectionType, normalizeSelectionFactory };