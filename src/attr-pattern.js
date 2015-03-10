/*global controller */

/**
 * Register validator
 */
controller.append([
    'input[type=text][pattern]',
    'input[type=password][pattern]',
    'input[type=search][pattern]',
    'input[type=email][pattern]',
    'input[type=url][pattern]',
    'input[type=tel][pattern]'
].join(','), function (element) {
    "use strict";
    var value = element.locals.value,
        pattern = new RegExp('^' + element.attr('pattern') + '$'),
        i, l;
    for (i = 0, l = value.length; i < l; i++) {
        if (!pattern.test(value[i])) {
            return 'pattern';
        }
    }
});