/*global controller */

/**
 * Register validator
 */
controller.append([
    'input[pattern]:not([type])',
    'input[type=text][pattern]',
    'input[type=password][pattern]',
    'input[type=search][pattern]',
    'input[type=email][pattern]',
    'input[type=url][pattern]',
    'input[type=tel][pattern]'
].join(','), function (element) {
    "use strict";
    var value = this.value,
        pattern, i, l;
    element = $(element);
    pattern = new RegExp('^' + element.attr('pattern') + '$');
    for (i = 0, l = value.length; i < l; i++) {
        if (!pattern.test(value[i])) {
            return 'pattern';
        }
    }
});