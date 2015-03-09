/**
 * Validating controller
 */
var controller = $.Validating();

/**
 * Check property of input element
 * @param {jQuery} element
 * @param {string} property
 * @returns {bool}
 */
function prop(element, property) {
    "use strict";
    var check = element.prop(property);
    return typeof check === 'undefined' ? $.trim(element.attr(property)).toLowerCase() === property : !!check;
}

/**
 * Is value undefined?
 * @param {*} value
 * @returns {boolean}
 */
function isUndefined(value) {
    "use strict";
    return typeof value === 'undefined';
}