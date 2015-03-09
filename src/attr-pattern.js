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
    var pattern = new RegExp('^' + element.attr('pattern') + '$');
    $.each(element.locals.value, function () {
        if (!pattern.test(this)) {
            return'pattern';
        }
    });
});