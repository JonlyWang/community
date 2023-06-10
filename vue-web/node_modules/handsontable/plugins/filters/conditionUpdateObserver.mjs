import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { arrayEach, arrayMap, arrayFilter } from "../../helpers/array.mjs";
import { mixin, objectEach } from "../../helpers/object.mjs";
import { curry } from "../../helpers/function.mjs";
import localHooks from "../../mixins/localHooks.mjs";
import ConditionCollection from "./conditionCollection.mjs";
import DataFilter from "./dataFilter.mjs";
import { createArrayAssertion } from "./utils.mjs"; /**
                                                     * Class which is designed for observing changes in condition collection. When condition is changed by user at specified
                                                     * column it's necessary to update all conditions defined after this edited one.
                                                     *
                                                     * Object fires `update` hook for every column conditions change.
                                                     *
                                                     * @private
                                                     * @class ConditionUpdateObserver
                                                     */
var ConditionUpdateObserver = /*#__PURE__*/function () {
  function ConditionUpdateObserver(hot, conditionCollection) {
    var _this = this;
    var columnDataFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
      return [];
    };
    _classCallCheck(this, ConditionUpdateObserver);
    /**
     * Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hot;
    /**
     * Reference to the instance of {@link ConditionCollection}.
     *
     * @type {ConditionCollection}
     */
    this.conditionCollection = conditionCollection;
    /**
     * Function which provide source data factory for specified column.
     *
     * @type {Function}
     */
    this.columnDataFactory = columnDataFactory;
    /**
     * Collected changes when grouping is enabled.
     *
     * @type {Array}
     * @default []
     */
    this.changes = [];
    /**
     * Flag which determines if grouping events is enabled.
     *
     * @type {boolean}
     */
    this.grouping = false;
    /**
     * The latest known position of edited conditions at specified column index.
     *
     * @type {number}
     * @default -1
     */
    this.latestEditedColumnPosition = -1;
    /**
     * The latest known order of conditions stack.
     *
     * @type {Array}
     */
    this.latestOrderStack = [];
    this.conditionCollection.addLocalHook('beforeRemove', function (column) {
      return _this._onConditionBeforeModify(column);
    });
    this.conditionCollection.addLocalHook('afterRemove', function (column) {
      return _this.updateStatesAtColumn(column);
    });
    this.conditionCollection.addLocalHook('afterAdd', function (column) {
      return _this.updateStatesAtColumn(column);
    });
    this.conditionCollection.addLocalHook('beforeClean', function () {
      return _this._onConditionBeforeClean();
    });
    this.conditionCollection.addLocalHook('afterClean', function () {
      return _this._onConditionAfterClean();
    });
  }

  /**
   * Enable grouping changes. Grouping is helpful in situations when a lot of conditions is added in one moment. Instead of
   * trigger `update` hook for every condition by adding/removing you can group this changes and call `flush` method to trigger
   * it once.
   */
  _createClass(ConditionUpdateObserver, [{
    key: "groupChanges",
    value: function groupChanges() {
      this.grouping = true;
    }

    /**
     * Flush all collected changes. This trigger `update` hook for every previously collected change from condition collection.
     */
  }, {
    key: "flush",
    value: function flush() {
      var _this2 = this;
      this.grouping = false;
      arrayEach(this.changes, function (column) {
        _this2.updateStatesAtColumn(column);
      });
      this.changes.length = 0;
    }

    /**
     * On before modify condition (add or remove from collection),.
     *
     * @param {number} column Column index.
     * @private
     */
  }, {
    key: "_onConditionBeforeModify",
    value: function _onConditionBeforeModify(column) {
      this.latestEditedColumnPosition = this.conditionCollection.getColumnStackPosition(column);
    }

    /**
     * Update all related states which should be changed after invoking changes applied to current column.
     *
     * @param {number} column The column index.
     * @param {object} conditionArgsChange Object describing condition changes which can be handled by filters on `update` hook.
     * It contains keys `conditionKey` and `conditionValue` which refers to change specified key of condition to specified value
     * based on referred keys.
     */
  }, {
    key: "updateStatesAtColumn",
    value: function updateStatesAtColumn(column, conditionArgsChange) {
      var _this3 = this;
      if (this.grouping) {
        if (this.changes.indexOf(column) === -1) {
          this.changes.push(column);
        }
        return;
      }
      var allConditions = this.conditionCollection.exportAllConditions();
      var editedColumnPosition = this.conditionCollection.getColumnStackPosition(column);
      if (editedColumnPosition === -1) {
        editedColumnPosition = this.latestEditedColumnPosition;
      }

      // Collection of all conditions defined before currently edited `column` (without edited one)
      var conditionsBefore = allConditions.slice(0, editedColumnPosition);
      // Collection of all conditions defined after currently edited `column` (with edited one)
      var conditionsAfter = allConditions.slice(editedColumnPosition);

      // Make sure that conditionAfter doesn't contain edited column conditions
      if (conditionsAfter.length && conditionsAfter[0].column === column) {
        conditionsAfter.shift();
      }
      var visibleDataFactory = curry(function (curriedConditionsBefore, curriedColumn) {
        var conditionsStack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var splitConditionCollection = new ConditionCollection(_this3.hot, false);
        var curriedConditionsBeforeArray = [].concat(curriedConditionsBefore, conditionsStack);

        // Create new condition collection to determine what rows should be visible in "filter by value" box
        // in the next conditions in the chain
        splitConditionCollection.importAllConditions(curriedConditionsBeforeArray);
        var allRows = _this3.columnDataFactory(curriedColumn);
        var visibleRows;
        if (splitConditionCollection.isEmpty()) {
          visibleRows = allRows;
        } else {
          visibleRows = new DataFilter(splitConditionCollection, function (columnData) {
            return _this3.columnDataFactory(columnData);
          }).filter();
        }
        visibleRows = arrayMap(visibleRows, function (rowData) {
          return rowData.meta.visualRow;
        });
        var visibleRowsAssertion = createArrayAssertion(visibleRows);
        splitConditionCollection.destroy();
        return arrayFilter(allRows, function (rowData) {
          return visibleRowsAssertion(rowData.meta.visualRow);
        });
      })(conditionsBefore);
      var editedConditions = [].concat(this.conditionCollection.getConditions(column));
      this.runLocalHooks('update', {
        editedConditionStack: {
          column: column,
          conditions: editedConditions
        },
        dependentConditionStacks: conditionsAfter,
        filteredRowsFactory: visibleDataFactory,
        conditionArgsChange: conditionArgsChange
      });
    }

    /**
     * On before conditions clean listener.
     *
     * @private
     */
  }, {
    key: "_onConditionBeforeClean",
    value: function _onConditionBeforeClean() {
      this.latestOrderStack = this.conditionCollection.getFilteredColumns();
    }

    /**
     * On after conditions clean listener.
     *
     * @private
     */
  }, {
    key: "_onConditionAfterClean",
    value: function _onConditionAfterClean() {
      var _this4 = this;
      arrayEach(this.latestOrderStack, function (column) {
        _this4.updateStatesAtColumn(column);
      });
    }

    /**
     * Destroy instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;
      this.clearLocalHooks();
      objectEach(this, function (value, property) {
        _this5[property] = null;
      });
    }
  }]);
  return ConditionUpdateObserver;
}();
mixin(ConditionUpdateObserver, localHooks);
export default ConditionUpdateObserver;