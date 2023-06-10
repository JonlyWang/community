import moment from 'moment';
import { isEmpty } from "../../../helpers/mixed.mjs";
import { DO_NOT_SWAP, FIRST_BEFORE_SECOND, FIRST_AFTER_SECOND } from "../sortService/index.mjs"; /**
                                                                                                  * Date sorting compare function factory. Method get as parameters `sortOrder` and `columnMeta` and return compare function.
                                                                                                  *
                                                                                                  * @param {string} sortOrder Sort order (`asc` for ascending, `desc` for descending).
                                                                                                  * @param {object} columnMeta Column meta object.
                                                                                                  * @param {object} columnPluginSettings Plugin settings for the column.
                                                                                                  * @returns {Function} The compare function.
                                                                                                  */
export function compareFunctionFactory(sortOrder, columnMeta, columnPluginSettings) {
  return function (value, nextValue) {
    var sortEmptyCells = columnPluginSettings.sortEmptyCells;
    if (value === nextValue) {
      return DO_NOT_SWAP;
    }
    if (isEmpty(value)) {
      if (isEmpty(nextValue)) {
        return DO_NOT_SWAP;
      }

      // Just fist value is empty and `sortEmptyCells` option was set
      if (sortEmptyCells) {
        return sortOrder === 'asc' ? FIRST_BEFORE_SECOND : FIRST_AFTER_SECOND;
      }
      return FIRST_AFTER_SECOND;
    }
    if (isEmpty(nextValue)) {
      // Just second value is empty and `sortEmptyCells` option was set
      if (sortEmptyCells) {
        return sortOrder === 'asc' ? FIRST_AFTER_SECOND : FIRST_BEFORE_SECOND;
      }
      return FIRST_BEFORE_SECOND;
    }
    var dateFormat = columnMeta.dateFormat;
    var firstDate = moment(value, dateFormat);
    var nextDate = moment(nextValue, dateFormat);
    if (!firstDate.isValid()) {
      return FIRST_AFTER_SECOND;
    }
    if (!nextDate.isValid()) {
      return FIRST_BEFORE_SECOND;
    }
    if (nextDate.isAfter(firstDate)) {
      return sortOrder === 'asc' ? FIRST_BEFORE_SECOND : FIRST_AFTER_SECOND;
    }
    if (nextDate.isBefore(firstDate)) {
      return sortOrder === 'asc' ? FIRST_AFTER_SECOND : FIRST_BEFORE_SECOND;
    }
    return DO_NOT_SWAP;
  };
}
export var COLUMN_DATA_TYPE = 'date';