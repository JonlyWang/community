/**
 * @typedef {object} DefaultHeaderSettings
 * @property {string} label The name/label of the column header.
 * @property {number} colspan Current calculated colspan value of the rendered column header element.
 * @property {number} origColspan Original colspan value, set once while parsing user-defined nested header settings.
 * @property {boolean} collapsible The flag determines whether the node is collapsible (can be collapsed/expanded).
 * @property {number[]} crossHiddenColumns The list of visual column indexes which indicates that the specified columns within
 *                                         the header settings are hidden.
 * @property {boolean} isCollapsed The flag determines whether the node is collapsed.
 * @property {boolean} isHidden The flag determines whether the column header at specified index is hidden. If true
 *                              the TH element will be rendered as hidden (display: none).
 * @property {boolean} isRoot The flag which determines whether the column header settings is actually not renderable. That kind
 *                            of objects are generated after colspaned header to fill an array to correct size.
 *                            For example for header with colspan = 8 the 7 blank objects are generated to fill the array settings
 *                            to length = 8.
 * @property {boolean} isPlaceholder The flag determines whether the column header at the specified index is non-renderable.
 */

/**
 * Creates the header settings object with default values.
 *
 * @param {DefaultHeaderSettings} initialValues The initial values for the header settings object.
 * @returns {DefaultHeaderSettings}
 */
export function createDefaultHeaderSettings() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    _ref$colspan = _ref.colspan,
    colspan = _ref$colspan === void 0 ? 1 : _ref$colspan,
    _ref$origColspan = _ref.origColspan,
    origColspan = _ref$origColspan === void 0 ? 1 : _ref$origColspan,
    _ref$collapsible = _ref.collapsible,
    collapsible = _ref$collapsible === void 0 ? false : _ref$collapsible,
    _ref$crossHiddenColum = _ref.crossHiddenColumns,
    crossHiddenColumns = _ref$crossHiddenColum === void 0 ? [] : _ref$crossHiddenColum,
    _ref$isCollapsed = _ref.isCollapsed,
    isCollapsed = _ref$isCollapsed === void 0 ? false : _ref$isCollapsed,
    _ref$isHidden = _ref.isHidden,
    isHidden = _ref$isHidden === void 0 ? false : _ref$isHidden,
    _ref$isRoot = _ref.isRoot,
    isRoot = _ref$isRoot === void 0 ? false : _ref$isRoot,
    _ref$isPlaceholder = _ref.isPlaceholder,
    isPlaceholder = _ref$isPlaceholder === void 0 ? false : _ref$isPlaceholder;
  return {
    label: label,
    colspan: colspan,
    origColspan: origColspan,
    collapsible: collapsible,
    isCollapsed: isCollapsed,
    crossHiddenColumns: crossHiddenColumns,
    isHidden: isHidden,
    isRoot: isRoot,
    isPlaceholder: isPlaceholder
  };
}

/**
 * Creates the placeholder header settings object. Those settings tell the header renderers
 * that this TH element should not be rendered (the node will be overlapped by the previously
 * created node with colspan bigger than 1).
 *
 * @returns {object}
 */
export function createPlaceholderHeaderSettings() {
  return {
    label: '',
    isPlaceholder: true
  };
}