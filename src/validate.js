(function ($) {
    "use strict";

    /**
     * Default values, formatter and parsers for the validation of the step attribute.
     */
    var steps = {

        /**
         * Date scope
         * @type {Object}
         */
        'date': {

            /**
             * Default base for date type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for date type
             * @type {number}
             */
            step: 86400000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                text = $.trim(text);
                return $.fn.validate.patterns.date.test(text) ? Date.parse(text + 'T00:00:00Z') : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format: function (milliseconds) {
                var date = new Date(milliseconds),
                    text = '';
                if (!isNaN(date.getTime())) {
                    text += String(date.getUTCFullYear() + 10000).substring(1);
                    text += '-';
                    text += String(date.getUTCMonth() + 100).substring(1);
                    text += '-';
                    text += String(date.getUTCDate() + 100).substring(1);
                }
                return text;
            }

        },

        /**
         * Time scope
         * @type {Object}
         */
        'time': {

            /**
             * Default base for time type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for time type
             * @type {number}
             */
            step: 60000,

            /**
             * Parses time to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                var parts;
                text = $.trim(text);
                if ($.fn.validate.patterns.time.test(text)) {
                    parts = text.split('.', 2);
                    parts[0] = parts[0].split(':', 3);
                    parts[0][0] = parseInt(parts[0][0], 10);
                    parts[0][1] = parseInt(parts[0][1], 10);
                    parts[0][2] = parts[0].length < 3 ? 0 : parseInt(parts[0][2], 10);
                    parts[0] = parts[0][0] * 3600 + parts[0][1] * 60 + parts[0][2];
                    parts[1] = parts.length === 1 ? 0 : parseInt(parts[1], 10);
                    return parts[0] * 1000 + parts[1];
                } else {
                    return NaN;
                }
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format: function (milliseconds) {
                var date = new Date(milliseconds),
                    text = '';
                if (!isNaN(date.getTime())) {
                    text += String(date.getUTCHours() + 100).substring(1);
                    text += ':';
                    text += String(date.getUTCMinutes() + 100).substring(1);
                    text += ':';
                    text += String(date.getUTCSeconds() + 100).substring(1);
                    if (date.getUTCMilliseconds()) {
                        text += '.' + date.getUTCMilliseconds();
                    }
                }
                return text;
            }

        },

        /**
         * Datetime scope
         * @type {Object}
         */
        'datetime': {

            /**
             * Default base for datetime type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for datetime type
             * @type {number}
             */
            step: 60000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                text = $.trim(text).toUpperCase();
                return $.fn.validate.patterns.datetime.test(text) ? Date.parse(text) : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format: function (milliseconds) {
                var date = steps.date.format(milliseconds),
                    time = steps.time.format(milliseconds);
                return date.length && time.length ? date + 'T' + time.substring(0, 8) + 'Z' : '';
            }

        },

        /**
         * Local datetime scope
         * @type {Object}
         */
        'datetime-local': {

            /**
             * Default base for local datetime type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for local datetime type
             * @type {number}
             */
            step: 60000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                text = $.trim(text).toUpperCase();
                return $.fn.validate.patterns['datetime-local'].test(text) ? Date.parse(text) : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format: function (milliseconds) {
                var date = new Date(milliseconds),
                    text = '';
                if (!isNaN(date.getTime())) {
                    text += String(date.getFullYear() + 10000).substring(1);
                    text += '-';
                    text += String(date.getMonth() + 100).substring(1);
                    text += '-';
                    text += String(date.getDate() + 100).substring(1);
                    text += 'T';
                    text += String(date.getHours() + 100).substring(1);
                    text += ':';
                    text += String(date.getMinutes() + 100).substring(1);
                    text += ':';
                    text += String(date.getSeconds() + 100).substring(1);
                    if (date.getMilliseconds()) {
                        text += '.' + date.getMilliseconds();
                    }
                }
                return text;
            }

        },

        /**
         * Month scope
         * @type {Object}
         */
        'month': {

            /**
             * Default base for month type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for month type
             * @type {number}
             */
            step: 1,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                text = $.trim(text);
                return $.fn.validate.patterns.month.test(text) ? Date.parse(text + '-01T00:00:00Z') : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format: function (milliseconds) {
                var date = new Date(milliseconds),
                    text = '';
                if (!isNaN(date.getTime())) {
                    text += String(date.getUTCFullYear() + 10000).substring(1);
                    text += '-';
                    text += String(date.getUTCMonth() + 100).substring(1);
                }
                return text;
            }

        },

        /**
         * Week scope
         * @type {Object}
         */
        'week': {

            /**
             * Default base for week type
             * @type {number}
             */
            base: -259200000,

            /**
             * Default step for week type
             * @type {number}
             */
            step: 604800000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                var parts;
                text = $.trim(text).toUpperCase();
                if ($.fn.validate.patterns.week.test(text)) {
                    parts = text.split('-W');
                    return this.firstWeek(parts[0]) + parseInt(parts[1], 10) * 604800000;
                } else {
                    return NaN;
                }
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format: function (milliseconds) {
                var date = new Date(milliseconds),
                    text = '';
                if (!isNaN(date.getTime())) {
                    text += String(date.getUTCFullYear() + 10000).substring(1);
                    text += '-W';
                    text += String(date.getUTCDay() + 100).substring(1);
                }
                return text;
            },

            /**
             * Returns first day of first week of the given year
             * @param {number|string} year
             * @param {number|string} [shift] Represents what day of week should be returned.
             * @returns {number}
             */
            firstWeek: function (year, shift) {
                var date = Date.parse(year + '-01-01T00:00:00Z'),
                    day = new Date(date).getUTCDay();
                day = day > 4 ? 7 - day : -day;
                shift = Math.max(0, parseInt(shift, 10)) || 0;
                shift %= 7;
                return date + 86400000 * (day + shift);
            }

        },

        /**
         * Number scope
         * @type {Object}
         */
        'number': {

            /**
             * Default base for number type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for number type
             * @type {number}
             */
            step: 1,

            /**
             * Parses value to number
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                text = $.trim(text);
                return $.fn.validate.patterns.number.test(text) ? parseFloat(text) : NaN;
            },

            /**
             * Formats value to string
             * @param {number} value
             * @returns {string}
             */
            format: function (value) {
                return String(value);
            }

        },

        /**
         * Range scope
         * @type {Object}
         */
        'range': {

            /**
             * Default base for range type
             * @type {number}
             */
            base: 0,

            /**
             * Default step for range type
             * @type {number}
             */
            step: 1,

            /**
             * Parses value to number
             * @param {string|number} text
             * @returns {number}
             */
            parse: function (text) {
                text = $.trim(text);
                return $.fn.validate.patterns.range.test(text) ? parseFloat(text) : NaN;
            },

            /**
             * Formats value to string
             * @param {number} value
             * @returns {string}
             */
            format: function (value) {
                return String(value);
            }

        }
    };

    /**
     * Check property of input element
     * @param {jQuery} input
     * @param {string} property
     * @returns {bool}
     */
    function prop(input, property) {
        var check = input.prop(property);
        return typeof check === 'undefined' ? $.trim(input.attr(property)).toLowerCase() === property : !!check;
    }

    /**
     * Set exponent of number
     * @param {number} number
     * @param {number} exponent
     * @returns {number}
     */
    function power(number, exponent) {
        var parts = number.toString().split('E');
        parts[1] = parts.length > 1 ? parseInt(parts[1], 10) : 0;
        parts[1] += exponent;
        return parseFloat(parts.join('E'));
    }

    /**
     * Extracting fraction and exponent
     * @param {number} number
     * @returns {number}
     */
    function exponent(number) {
        var parts = number.toString().split('E'),
            exp = parts.length > 1 ? parseInt(parts[1], 10) : 0;
        parts = parts[0].split('.');
        exp += parts.length > 1 ? parts[1].length : 0;
        return exp;
    }

    /**
     * Validate other types
     * @param {*} value
     * @param {jQuery} input
     * @param {string} type
     * @return {string}
     */
    function validateElse(value, input, type) {
        var required = prop(input, 'required'),
            pattern, minlength, maxlength, max, min, step, base, gait, exp, i, l;
        value = value instanceof Array ? value : value.toString().length ? [value] : [];
        l = value.length;

        if (value.length === 0) {
            return required ? 'required' : '';
        }

        if (input.data('validate-trim')) {
            for (i = 0; i < l; i++) {
                value[i] = $.trim(value[i]);
            }
        }

        if (required && $.inArray(type, ['hidden', 'range'/*, 'color'*/]) < 0) {
            for (i = 0; i < l; i++) {
                if (!value[i].length) {
                    return 'required';
                }
            }
        }

        if ($.fn.validate.patterns[type] instanceof RegExp) {
            for (i = 0; i < l; i++) {
                if (!$.fn.validate.patterns[type].test(value[i])) {
                    return 'type';
                }
            }
        }

        if (input.is('[pattern]') && $.inArray(type, ['text', 'search', 'tel', 'url', 'email', 'password']) >= 0) {
            try {
                pattern = new RegExp('^' + input.attr('pattern') + '$');
                for (i = 0; i < l; i++) {
                    if (!pattern.test(value[i])) {
                        return 'pattern';
                    }
                }
            } catch (e) {
            }
        }

        minlength = parseInt(input.attr('minlength'), 10);
        if (minlength >= 0 && $.inArray(type, ['text', 'search', 'url', 'tel', 'email', 'password', 'textarea']) >= 0) {
            for (i = 0; i < l; i++) {
                if (value[i].length < minlength) {
                    return 'minlength';
                }
            }
        }

        maxlength = parseInt(input.attr('maxlength'), 10);
        if (maxlength >= 0 && $.inArray(type, ['text', 'search', 'url', 'tel', 'email', 'password', 'textarea']) >= 0) {
            for (i = 0; i < l; i++) {
                if (value[i].length > maxlength) {
                    return 'maxlength';
                }
            }
        }

        if ($.inArray(type, ['datetime', 'date', 'time', 'week', 'month', 'datetime-local', 'number', 'range']) >= 0) {
            min = steps[type].parse(input.attr('min'));
            max = steps[type].parse(input.attr('max'));
            step = $.trim(input.attr('step'));
            value = steps[type].parse(value[0]);
            if (isNaN(value)) {
                return 'type';
            } else if (!isNaN(min) && min > value) {
                return 'min';
            } else if (!isNaN(max) && max < value) {
                return 'max';
            } else if (step.toLowerCase() !== 'any') {
                gait = steps.number.parse(step);
                gait = !isNaN(gait) && gait > 0 ? gait : steps[type].step;
                base = !isNaN(min) ? min : steps[type].base;
                value -= base;
                exp = exponent(gait);
                gait = power(gait, exp);
                value = power(value, exp);
                if (exponent(value) < 0 || value % gait > 0) {
                    return 'step';
                }
            }
        }
        return '';
    }

    /**
     * Validate all input fields in this collection and there children.
     * @see http://www.w3.org/html/wg/drafts/html/master/forms.html#the-input-element
     * @param {bool} trigger events
     * @return {bool}
     */
    $.fn.validate = function (trigger) {
        var result = true;
        this.find(':input').add(this.filter(':input')).each(function () {
            var input = $(this),
                type = $.trim(input.is('select') ? 'select' : input.is('textarea') ? 'textarea' : input.attr('type') || '').toLowerCase(),
                name, value, state;

            if (
                $.inArray(type, ['hidden', 'text', 'search', 'tel', 'url', 'email', 'password', 'datetime', 'date', 'time', 'week', 'month', 'datetime-local', 'number', 'range', 'color', 'checkbox', 'radio', 'file', 'select', 'textarea']) >= 0 && !prop(input, 'disabled')
            ) {
                name = input.attr('name') || '';
                value = input.values()[name] || '';
                state = type === 'file' ? validateFile(value, input) : $.inArray(type, ['checkbox', 'radio', 'select']) >= 0 ? validateList(value, input) : validateElse(value, input, type);
                result = result && !state.length;
                if (trigger) {
                    if (state.length) {
                        input.trigger('invalid.validate', state);
                    } else {
                        input.trigger('valid.validate');
                    }
                }
            }
        });
        return result;
    };

    /**
     * Default patterns
     * @see http://www.w3.org/TR/html-markup/datatypes.html
     * @type {Object}
     */
    $.fn.validate.patterns = {
        'tel': /./,
        'url': /^[a-z]+:\/\/.+/i,
        'email': /^[a-z\d.!#$%&’*+\/=?\^_`{|}~\-]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*$/i,
        'datetime': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z|[+\-]([01]\d|2[0-3]):([0-5]\d))$/,
        'datetime-local': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)([.]\d+)?)?$/,
        'date': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])$/,
        'time': /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)([.]\d+)?)?$/,
        'week': /^\d{4}-W([0-4]\d|5[0-3])$/,
        'month': /^\d{4}-(0\d|1[0-2])$/,
        'number': /^[+-]?\d+([.,]\d+)?(E[+-]?\d+)?$/i,
        'range': /^[+\-]?\d+([.]\d+)?(E[+\-]?\d+)?$/i,
        'color': /^#[a-f\d]{6}$/i,
        'pattern': /^(.)[\^](.+)[$]\1$/
    };

}(jQuery));