/*global controller, isUndefined */

/**
 * Prepare controller for subsequent validators
 */
controller.append('*', function (element) {
    "use strict";
    var name = element.attr('name') || '',
        value = element.values()[name];
    element.locals = {
        name  : name,
        value : value instanceof Array ? value : isUndefined(value) ? [] : [value]
    };
});