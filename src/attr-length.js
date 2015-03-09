/*global controller */

/**
 * Register minLength and maxlength validator
 */
controller.append([
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
    var minLength = parseInt(element.attr('minlength'), 10),
        maxLength = parseInt(element.attr('maxlength'), 10);
    $.each(element.locals.value, function () {
        if (this.length < minLength) {
            return 'minlength';
        }
        if (this.length > maxLength) {
            return 'maxlength';
        }
    });
});