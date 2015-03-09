/*global controller */

(function () {
    "use strict";

    /**
     * Regular expression to test trim attribute value
     * @type {RegExp}
     */
    var regex = /^true|on|1|yes|trim$/i;

    /**
     * Trim input element value
     * @param {jQuery} element
     */
    function trim(element) {
        $.each(element.locals.value, function (index, value) {
            value = $.trim(value);
            if (value.length) {
                element.locals.value[index] = value;
            } else {
                delete element.locals.value[index];
            }
        });
        element.val(element.locals.value.join(','));
    }

    /**
     * Native trim
     */
    controller.append([
        'input[type=email]',
        'input[type=url]',
        'input[type=tel]',
        'input[type=color]',
        'input[type=number]',
        'input[type=range]',
        'input[type=date]',
        'input[type=datetime]',
        'input[type=datetime-local]',
        'input[type=time]',
        'input[type=week]',
        'input[type=month]'
    ].join(','), trim);

    /**
     * Trim by option
     */
    controller.append([
        'input[type=hidden]',
        'input[type=text]',
        'input[type=password]',
        'input[type=search]',
        'textarea'
    ].join(','), function (element) {
        var trimValue = $.trim(element.data('trim'));
        if (regex.test(trimValue)) {
            trim(element);
        }
    });

}());