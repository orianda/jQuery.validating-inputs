(function ($) {
    "use strict";

    /**
     * Regular expression to test trim attribute value
     * @type {RegExp}
     */
    var regex = /^true|on|1|yes|trim$/i;

    /**
     * Trim input element value
     * @param {jQuery} input
     */
    function trim(input) {
        input.val($.trim(input.val()));
    }

    /**
     * Native trim
     */
    $.validating.prepend([
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
    ].join(','), trim, true);

    /**
     * Trim by option
     */
    $.validating.prepend([
        'input[type=hidden][data-trim]',
        'input[type=text][data-trim]',
        'input[type=password][data-trim]',
        'input[type=search][data-trim]',
        'input[type=textarea][data-trim]'
    ].join(','), function (input) {
        var trim = $.trim(input.data('trim'));
        if (regex.test(trim)) {
            trim(input);
        }
    }, true);

}(jQuery));