"use strict";

exports.__esModule = true;
exports.handleMouseEvent = handleMouseEvent;
exports.mouseDown = mouseDown;
exports.mouseOver = mouseOver;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _event = require("./../helpers/dom/event");
/**
 * MouseDown handler.
 *
 * @param {object} options The handler options.
 * @param {boolean} options.isShiftKey The flag which indicates if the shift key is pressed.
 * @param {boolean} options.isLeftClick The flag which indicates if the left mouse button is pressed.
 * @param {boolean} options.isRightClick The flag which indicates if the right mouse button is pressed.
 * @param {CellRange} options.coords The CellCoords object with defined visual coordinates.
 * @param {Selection} options.selection The Selection class instance.
 * @param {object} options.controller An object with keys `row`, `column`, `cell` which indicate what
 *                                    operation will be performed in later selection stages.
 * @param {Function} options.cellCoordsFactory The function factory for CellCoords objects.
 */
function mouseDown(_ref) {
  var isShiftKey = _ref.isShiftKey,
    isLeftClick = _ref.isLeftClick,
    isRightClick = _ref.isRightClick,
    coords = _ref.coords,
    selection = _ref.selection,
    controller = _ref.controller,
    cellCoordsFactory = _ref.cellCoordsFactory;
  var currentSelection = selection.isSelected() ? selection.getSelectedRange().current() : null;
  var selectedCorner = selection.isSelectedByCorner();
  var selectedRow = selection.isSelectedByRowHeader();
  if (isShiftKey && currentSelection) {
    if (coords.row >= 0 && coords.col >= 0 && !controller.cell) {
      selection.setRangeEnd(coords);
    } else if ((selectedCorner || selectedRow) && coords.row >= 0 && coords.col >= 0 && !controller.cell) {
      selection.setRangeEnd(cellCoordsFactory(coords.row, coords.col));
    } else if (selectedCorner && coords.row < 0 && !controller.column) {
      selection.setRangeEnd(cellCoordsFactory(currentSelection.to.row, coords.col));
    } else if (selectedRow && coords.col < 0 && !controller.row) {
      selection.setRangeEnd(cellCoordsFactory(coords.row, currentSelection.to.col));
    } else if ((!selectedCorner && !selectedRow && coords.col < 0 || selectedCorner && coords.col < 0) && !controller.row) {
      selection.selectRows(Math.max(currentSelection.from.row, 0), coords.row, coords.col);
    } else if ((!selectedCorner && !selectedRow && coords.row < 0 || selectedRow && coords.row < 0) && !controller.column) {
      selection.selectColumns(Math.max(currentSelection.from.col, 0), coords.col, coords.row);
    }
  } else {
    var allowRightClickSelection = !selection.inInSelection(coords);
    var performSelection = isLeftClick || isRightClick && allowRightClickSelection;

    // clicked row header and when some column was selected
    if (coords.row < 0 && coords.col >= 0 && !controller.column) {
      if (performSelection) {
        selection.selectColumns(coords.col, coords.col, coords.row);
      }

      // clicked column header and when some row was selected
    } else if (coords.col < 0 && coords.row >= 0 && !controller.row) {
      if (performSelection) {
        selection.selectRows(coords.row, coords.row, coords.col);
      }
    } else if (coords.col >= 0 && coords.row >= 0 && !controller.cell) {
      if (performSelection) {
        selection.setRangeStart(coords);
      }
    } else if (coords.col < 0 && coords.row < 0) {
      selection.selectAll(true, true);
    }
  }
}

/**
 * MouseOver handler.
 *
 * @param {object} options The handler options.
 * @param {boolean} options.isLeftClick Indicates that event was fired using the left mouse button.
 * @param {CellRange} options.coords The CellCoords object with defined visual coordinates.
 * @param {Selection} options.selection The Selection class instance.
 * @param {object} options.controller An object with keys `row`, `column`, `cell` which indicate what
 *                                    operation will be performed in later selection stages.
 * @param {Function} options.cellCoordsFactory The function factory for CellCoords objects.
 */
function mouseOver(_ref2) {
  var isLeftClick = _ref2.isLeftClick,
    coords = _ref2.coords,
    selection = _ref2.selection,
    controller = _ref2.controller,
    cellCoordsFactory = _ref2.cellCoordsFactory;
  if (!isLeftClick) {
    return;
  }
  var selectedRow = selection.isSelectedByRowHeader();
  var selectedColumn = selection.isSelectedByColumnHeader();
  var countCols = selection.tableProps.countCols();
  var countRows = selection.tableProps.countRows();
  if (selectedColumn && !controller.column) {
    selection.setRangeEnd(cellCoordsFactory(countRows - 1, coords.col));
  } else if (selectedRow && !controller.row) {
    selection.setRangeEnd(cellCoordsFactory(coords.row, countCols - 1));
  } else if (!controller.cell) {
    selection.setRangeEnd(coords);
  }
}
var handlers = new Map([['mousedown', mouseDown], ['mouseover', mouseOver], ['touchstart', mouseDown]]);

/**
 * Mouse handler for selection functionality.
 *
 * @param {Event} event An native event to handle.
 * @param {object} options The handler options.
 * @param {CellRange} options.coords The CellCoords object with defined visual coordinates.
 * @param {Selection} options.selection The Selection class instance.
 * @param {object} options.controller An object with keys `row`, `column`, `cell` which indicate what
 *                                    operation will be performed in later selection stages.
 * @param {Function} options.cellCoordsFactory The function factory for CellCoords objects.
 */
function handleMouseEvent(event, _ref3) {
  var coords = _ref3.coords,
    selection = _ref3.selection,
    controller = _ref3.controller,
    cellCoordsFactory = _ref3.cellCoordsFactory;
  handlers.get(event.type)({
    coords: coords,
    selection: selection,
    controller: controller,
    cellCoordsFactory: cellCoordsFactory,
    isShiftKey: event.shiftKey,
    isLeftClick: (0, _event.isLeftClick)(event) || event.type === 'touchstart',
    isRightClick: (0, _event.isRightClick)(event)
  });
}