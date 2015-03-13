/*global controller, prop */

/**
 * Prevent validating if the input is disabled
 */
controller.append('*', function (element) {
    "use strict";
    element = $(element);
    while (element.length) {
        if (prop(element, 'disabled')) {
            return false;
        }
        element = element.parent().closest('fieldset');
    }
});