(function ($) {
    "use strict";

    /**
     * Check property of input element
     * @param {jQuery} input
     * @param {string} property
     * @returns {bool}
     */
    function prop(input, property) {
        var check = input.prop(property);
        return typeof check === 'undefined' ? $.trim(input.attr(property)).toLowerCase() === property : !!check;
    }

    /**
     * Is value undefined?
     * @param {*} value
     * @returns {boolean}
     */
    function isUndefined(value) {
        return typeof value === 'undefined';
    }

    /**
     * Validate select, radio and checkbox inputs
     */
    $.validating.append([
        'input[type=radio]',
        'input[type=checkbox]',
        'select'
    ].join(','), function (input) {
        var name = input.attr('name'),
            value = input.values()[name],
            i, l;
        value = value instanceof Array ? value : isUndefined(value) ? [] : [value];
        if (!prop(input, 'required')) {
            return;
        }
        if (!value.length) {
            return 'required';
        }
        for (i = 0, l = value.length; i < l; i++) {
            if (!value[i].length) {
                return 'required';
            }
        }
    }, true);

}(jQuery));