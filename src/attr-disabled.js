/*global controller, prop */

/**
 * Prevent validating if the input is disabled
 */
controller.append([
    'input:not([type])',
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
    while (element.length) {
        if (prop(element, 'disabled')) {
            return false;
        }
        element = element.parent().closest('fieldset');
    }
});