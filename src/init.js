/*global controller, isUndefined */

/**
 * Prepare controller for subsequent validators
 */
controller.append('*', function (element) {
    "use strict";
    var name, value;
    element = $(element);
    name = element.attr('name') || '';
    value = element.values()[name];
    this.name = name;
    this.value = value instanceof Array ? value : isUndefined(value) ? [] : [value];
});