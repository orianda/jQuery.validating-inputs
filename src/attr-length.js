/*global controller */

/**
 * Register minLength and maxLength validator
 */
controller.append([
    'input[minlength]:not([type])',
    'input[maxlength]:not([type])',
    'input[type=text][minlength]',
    'input[type=text][maxlength]',
    'input[type=password][minlength]',
    'input[type=password][maxlength]',
    'input[type=search][minlength]',
    'input[type=search][maxlength]',
    'input[type=email][minlength]',
    'input[type=email][maxlength]',
    'input[type=url][minlength]',
    'input[type=url][maxlength]',
    'input[type=tel][minlength]',
    'input[type=tel][maxlength]',
    'textarea[minlength]',
    'textarea[maxlength]'
].join(','), function (element) {
    "use strict";
    var value = element.locals.value,
        minLength = parseInt(element.attr('minlength'), 10),
        maxLength = parseInt(element.attr('maxlength'), 10),
        i, l;
    for (i = 0, l = value.length; i < l; i++) {
        if (value[i].length < minLength) {
            return 'minlength';
        }
        if (value[i].length > maxLength) {
            return 'maxlength';
        }
    }
});