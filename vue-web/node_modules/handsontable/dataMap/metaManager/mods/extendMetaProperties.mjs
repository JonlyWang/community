import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/web.dom-collections.for-each.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * @class ExtendMetaPropertiesMod
 */
export var ExtendMetaPropertiesMod = /*#__PURE__*/function () {
  function ExtendMetaPropertiesMod(metaManager) {
    _classCallCheck(this, ExtendMetaPropertiesMod);
    /**
     * @type {MetaManager}
     */
    this.metaManager = metaManager;
    /**
     * @type {Set}
     */
    this.usageTracker = new Set();
    /**
     * @type {Map}
     */
    this.propDescriptors = new Map([['fixedColumnsLeft', {
      target: 'fixedColumnsStart',
      onChange: function onChange(propName) {
        var isRtl = this.metaManager.hot.isRtl();
        if (isRtl && propName === 'fixedColumnsLeft') {
          throw new Error('The `fixedColumnsLeft` is not supported for RTL. Please use option `fixedColumnsStart`.');
        }
        if (this.usageTracker.has('fixedColumnsLeft') && this.usageTracker.has('fixedColumnsStart')) {
          throw new Error('The `fixedColumnsLeft` and `fixedColumnsStart` should not be used together. ' + 'Please use only the option `fixedColumnsStart`.');
        }
      }
    }], ['layoutDirection', {
      onChange: function onChange(propName, value, isInitialChange) {
        if (!isInitialChange) {
          throw new Error("The `".concat(propName, "` option can not be updated after the Handsontable is initialized."));
        }
      }
    }]]);
    this.extendMetaProps();
  }

  /**
   * Extends the meta options based on the object descriptors from the `propDescriptors` list.
   */
  _createClass(ExtendMetaPropertiesMod, [{
    key: "extendMetaProps",
    value: function extendMetaProps() {
      var _this = this;
      this.propDescriptors.forEach(function (descriptor, alias) {
        var target = descriptor.target,
          _descriptor$onChange = descriptor.onChange,
          onChange = _descriptor$onChange === void 0 ? function () {} : _descriptor$onChange;
        var hasTarget = typeof target === 'string';
        var targetProp = hasTarget ? target : alias;
        var origProp = "_".concat(targetProp);
        _this.metaManager.globalMeta.meta[origProp] = _this.metaManager.globalMeta.meta[targetProp];
        _this.installPropWatcher(alias, origProp, onChange);
        if (hasTarget) {
          _this.installPropWatcher(target, origProp, onChange);
        }
      });
    }

    /**
     * Installs the property watcher to the `propName` option and forwards getter and setter to
     * the new one.
     *
     * @param {string} propName The property to watch.
     * @param {string} origProp The property from/to the value is forwarded.
     * @param {Function} onChange The callback.
     */
  }, {
    key: "installPropWatcher",
    value: function installPropWatcher(propName, origProp, onChange) {
      var self = this;
      Object.defineProperty(this.metaManager.globalMeta.meta, propName, {
        get: function get() {
          return this[origProp];
        },
        set: function set(value) {
          var isInitialChange = !self.usageTracker.has(propName);
          self.usageTracker.add(propName);
          onChange.call(self, propName, value, isInitialChange);
          this[origProp] = value;
        },
        enumerable: true,
        configurable: true
      });
    }
  }]);
  return ExtendMetaPropertiesMod;
}();