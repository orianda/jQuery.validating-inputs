/*global controller, prop */

/**
 * Register validator
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
    'input[type=datetime]',
    'input[type=datetime-local]',
    'input[type=date]',
    'input[type=time]',
    'input[type=week]',
    'input[type=month]',
    'input[type=radio]',
    'input[type=checkbox]',
    'select',
    'textarea'
].join(','), function (element) {
    "use strict";
    var value = this.value,
        required, i, l;
    element = $(element);
    required = prop(element, 'required');
    for (i = 0, l = value.length; i < l; i++) {
        if (value[i].length) {
            return true;
        }
    }
    return required ? 'required' : false;
});