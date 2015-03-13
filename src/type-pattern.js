/*global controller */

(function () {
    "use strict";

    /**
     * Native type patterns
     * @see http://www.w3.org/TR/html-markup/datatypes.html
     * @type {Object}
     */
    var patterns = {
        tel   : /./,
        url   : /^[a-z]+:\/\/.+/i,
        email : /^[a-z\d.!#$%&’*+\/=?\^_`{|}~\-]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*$/i,
        color : /^#[a-f\d]{6}$/i
    };

    /**
     * Get selectors
     * @returns {string[]}
     */
    function selectors() {
        var output = [],
            k;
        for (k in patterns) {
            if (patterns.hasOwnProperty(k)) {
                output.push('input[type=' + k + ']');
            }
        }
        return output;
    }

    /**
     * Register validator
     */
    controller.append(selectors().join(','), function (element) {
        var value = this.value,
            type, pattern, i, l;
        element = $(element);
        type = $.trim(element.attr('type')).toLowerCase();
        pattern = patterns[type];
        for (i = 0, l = value.length; i < l; i++) {
            if (!pattern.test(value[i])) {
                return 'type';
            }
        }
    });

}());