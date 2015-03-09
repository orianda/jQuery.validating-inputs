/*global controller, isUndefined */

/**
 * Prepare controller for subsequent validators
 */
controller.append([
    'input[type=hidden]',
    'input[type=text]',
    'input[type=password]',
    'input[type=search]',
    'input[type=email]',
    'input[type=url]',
    'input[type=tel]',
    'input[type=color]',
    'input[type=number]',
    'input[type=range]',
    'input[type=datetime]',
    'input[type=datetime-local]',
    'input[type=date]',
    'input[type=time]',
    'input[type=week]',
    'input[type=month]',
    'input[type=radio]',
    'input[type=checkbox]',
    'input[type=file]',
    'select',
    'textarea'
].join(','), function (element) {
    "use strict";
    var name = element.attr('name') || '',
        value = element.values()[name];
    element.locals = {
        name  : name,
        value : value instanceof Array ? value : isUndefined(value) ? [] : [value]
    };
});