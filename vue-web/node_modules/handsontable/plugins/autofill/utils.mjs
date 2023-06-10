import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.object.keys.js";
import { isObject } from "../../helpers/object.mjs";
import { isDefined } from "../../helpers/mixed.mjs";
export var DIRECTIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};

/**
 * Get deltas array.
 *
 * @param {CellCoords} start The point in the grid where the selection starts.
 * @param {CellCoords} end The point in the grid where the selection ends.
 * @param {Array} data The chunk of the data which belongs to the selected box.
 * @param {string} direction The selection direction.
 * @returns {Array}
 */
export function getDeltas(start, end, data, direction) {
  var rowsLength = data.length;
  var columnsLength = data ? data[0].length : 0;
  var deltas = [];
  var diffRow = end.row - start.row;
  var diffCol = end.col - start.col;
  if (['down', 'up'].indexOf(direction) !== -1) {
    var arr = [];
    for (var col = 0; col < diffCol; col++) {
      var startValue = parseInt(data[0][col], 10);
      var endValue = parseInt(data[rowsLength - 1][col], 10);
      var delta = (direction === 'down' ? endValue - startValue : startValue - endValue) / (rowsLength - 1) || 0;
      arr.push(delta);
    }
    deltas.push(arr);
  }
  if (['right', 'left'].indexOf(direction) !== -1) {
    for (var row = 0; row < diffRow; row++) {
      var _startValue = parseInt(data[row][0], 10);
      var _endValue = parseInt(data[row][columnsLength - 1], 10);
      var _delta = (direction === 'right' ? _endValue - _startValue : _startValue - _endValue) / (columnsLength - 1) || 0;
      deltas.push([_delta]);
    }
  }
  return deltas;
}

/**
 * Get direction between positions and cords of selections difference (drag area).
 *
 * @param {Array} startSelection The coordinates where the selection starts.
 * @param {Array} endSelection The coordinates where the selection ends.
 * @param {Function} cellCoordsFactory The function factory for CellCoords objects.
 * @returns {{direction: string, start: CellCoords, end: CellCoords}}
 */
export function getDragDirectionAndRange(startSelection, endSelection, cellCoordsFactory) {
  var startOfDragCoords;
  var endOfDragCoords;
  var directionOfDrag;
  if (endSelection[0] === startSelection[0] && endSelection[1] < startSelection[1]) {
    directionOfDrag = 'left';
    startOfDragCoords = cellCoordsFactory(endSelection[0], endSelection[1]);
    endOfDragCoords = cellCoordsFactory(endSelection[2], startSelection[1] - 1);
  } else if (endSelection[2] === startSelection[2] && endSelection[0] === startSelection[0] && endSelection[3] > startSelection[3]) {
    directionOfDrag = 'right';
    startOfDragCoords = cellCoordsFactory(endSelection[0], startSelection[3] + 1);
    endOfDragCoords = cellCoordsFactory(endSelection[2], endSelection[3]);
  } else if (endSelection[0] < startSelection[0] && endSelection[1] === startSelection[1]) {
    directionOfDrag = 'up';
    startOfDragCoords = cellCoordsFactory(endSelection[0], endSelection[1]);
    endOfDragCoords = cellCoordsFactory(startSelection[0] - 1, endSelection[3]);
  } else if (endSelection[2] > startSelection[2] && endSelection[1] === startSelection[1]) {
    directionOfDrag = 'down';
    startOfDragCoords = cellCoordsFactory(startSelection[2] + 1, endSelection[1]);
    endOfDragCoords = cellCoordsFactory(endSelection[2], endSelection[3]);
  }
  if (startOfDragCoords) {
    startOfDragCoords.normalize();
  }
  if (endOfDragCoords) {
    endOfDragCoords.normalize();
  }
  return {
    directionOfDrag: directionOfDrag,
    startOfDragCoords: startOfDragCoords,
    endOfDragCoords: endOfDragCoords
  };
}

/**
 * Get mapped FillHandle setting containing information about
 * allowed FillHandle directions and if allowed is automatic insertion of rows on drag.
 *
 * @param {boolean|object} fillHandle Property of Handsontable settings.
 * @returns {{directions: Array, autoInsertRow: boolean}} Object allowing access to information
 * about FillHandle in more useful way.
 */
export function getMappedFillHandleSetting(fillHandle) {
  var mappedSettings = {};
  if (fillHandle === true) {
    mappedSettings.directions = Object.keys(DIRECTIONS);
    mappedSettings.autoInsertRow = true;
  } else if (isObject(fillHandle)) {
    if (isDefined(fillHandle.autoInsertRow)) {
      // autoInsertRow for horizontal direction will be always false

      if (fillHandle.direction === DIRECTIONS.horizontal) {
        mappedSettings.autoInsertRow = false;
      } else {
        mappedSettings.autoInsertRow = fillHandle.autoInsertRow;
      }
    } else {
      mappedSettings.autoInsertRow = false;
    }
    if (isDefined(fillHandle.direction)) {
      mappedSettings.directions = [fillHandle.direction];
    } else {
      mappedSettings.directions = Object.keys(DIRECTIONS);
    }
  } else if (typeof fillHandle === 'string') {
    mappedSettings.directions = [fillHandle];
    mappedSettings.autoInsertRow = true;
  } else {
    mappedSettings.directions = [];
    mappedSettings.autoInsertRow = false;
  }
  return mappedSettings;
}