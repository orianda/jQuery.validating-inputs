/*!
 * jQuery.validating-inputs
 * jQuery plugin to validate form input elements
 *
 * @version v1.0.0
 * @link https://github.com/orianda/jQuery.validating-inputs
 * @author Orianda <orianda@paan.de>
 * @license MIT
 */
(function($){
    "use strict";

    /**
 * Validating controller
 */
var controller = $.Validating();

/**
 * Check property of input element
 * @param {jQuery} element
 * @param {string} property
 * @returns {bool}
 */
function prop(element, property) {
    var check = element.prop(property);
    return typeof check === 'undefined' ? $.trim(element.attr(property)).toLowerCase() === property : !!check;
}

/**
 * Is value undefined?
 * @param {*} value
 * @returns {boolean}
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}


/**
 * Prepare controller for subsequent validators
 */
controller.append([
    'input[type=hidden]',
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
    var name = element.attr('name') || '',
        value = element.values()[name];
    element.locals = {
        name  : name,
        value : value instanceof Array ? value : isUndefined(value) ? [] : [value]
    };
});


/**
 * Prevent validating if the input is disabled
 */
controller.append([
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
    while (element.length) {
        if (prop(element, 'disabled')) {
            return false;
        }
        element = element.parent().closest('fieldset');
    }
});


(function () {

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


/**
 * Register validator
 */
controller.append([
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
    var value = element.locals.value,
        required = prop(element, 'required'),
        i, l;
    for (i = 0, l = value.length; i < l; i++) {
        if (value[i].length) {
            return true;
        }
    }
    return required ? 'required' : false;
});


(function () {

    /**
     * Native type patterns
     * @see http://www.w3.org/TR/html-markup/datatypes.html
     * @type {Object}
     */
    var patterns = {
        tel   : /./,
        url   : /^[a-z]+:\/\/.+/i,
        email : /^[a-z\d.!#$%&’*+\/=?\^_`{|}~\-]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*$/i,
        color : /^#[a-f\d]{6}$/i
    };

    /**
     * Get selectors
     * @returns {string[]}
     */
    function selectors() {
        var output = [],
            k;
        for (k in patterns) {
            if (patterns.hasOwnProperty(k)) {
                output.push('input[type=' + k + ']');
            }
        }
        return output;
    }

    /**
     * Register validator
     */
    controller.append(selectors().join(','), function (element) {
        var type = $.trim(element.attr('type')).toLowerCase(),
            pattern = patterns[type],
            value = element.locals.value,
            i, l;
        for (i = 0, l = value.length; i < l; i++) {
            if (!pattern.test(value[i])) {
                return 'type';
            }
        }
    });

}());


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
    var value = element.locals.value,
        pattern = new RegExp('^' + element.attr('pattern') + '$'),
        i, l;
    for (i = 0, l = value.length; i < l; i++) {
        if (!pattern.test(value[i])) {
            return 'pattern';
        }
    }
});


/**
 * Register minLength and maxLength validator
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


(function () {

    var patterns, config;

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
     * Type patterns
     * @see http://www.w3.org/TR/html-markup/datatypes.html
     * @type {Object}
     */
    patterns = {
        'datetime'       : /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z|[+\-]([01]\d|2[0-3]):([0-5]\d))$/,
        'datetime-local' : /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)([.]\d+)?)?$/,
        'date'           : /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])$/,
        'time'           : /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)([.]\d+)?)?$/,
        'week'           : /^\d{4}-W([0-4]\d|5[0-3])$/,
        'month'          : /^\d{4}-(0\d|1[0-2])$/,
        'number'         : /^[+-]?\d+([.,]\d+)?(E[+-]?\d+)?$/i,
        'range'          : /^[+\-]?\d+([.]\d+)?(E[+\-]?\d+)?$/i
    };

    /**
     * Default values, formatter and parsers for the validation of the step attribute.
     * @see http://www.w3.org/TR/html-markup/datatypes.html
     */
    config = {

        /**
         * Number scope
         * @type {Object}
         */
        'number' : {

            /**
             * Default base for number type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for number type
             * @type {number}
             */
            step : 1,

            /**
             * Parses value to number
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                text = $.trim(text);
                return patterns.number.test(text) ? parseFloat(text) : NaN;
            },

            /**
             * Formats value to string
             * @param {number} value
             * @returns {string}
             */
            format : function (value) {
                return String(value);
            }

        },

        /**
         * Range scope
         * @type {Object}
         */
        'range' : {

            /**
             * Default base for range type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for range type
             * @type {number}
             */
            step : 1,

            /**
             * Parses value to number
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                text = $.trim(text);
                return patterns.range.test(text) ? parseFloat(text) : NaN;
            },

            /**
             * Formats value to string
             * @param {number} value
             * @returns {string}
             */
            format : function (value) {
                return String(value);
            }

        },

        /**
         * Datetime scope
         * @type {Object}
         */
        'datetime' : {

            /**
             * Default base for datetime type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for datetime type
             * @type {number}
             */
            step : 60000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                text = $.trim(text).toUpperCase();
                return patterns.datetime.test(text) ? Date.parse(text) : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format : function (milliseconds) {
                var date = config.date.format(milliseconds),
                    time = config.time.format(milliseconds);
                return date.length && time.length ? date + 'T' + time.substring(0, 8) + 'Z' : '';
            }

        },

        /**
         * Local datetime scope
         * @type {Object}
         */
        'datetime-local' : {

            /**
             * Default base for local datetime type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for local datetime type
             * @type {number}
             */
            step : 60000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                text = $.trim(text).toUpperCase();
                return patterns['datetime-local'].test(text) ? Date.parse(text) : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format : function (milliseconds) {
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
         * Date scope
         * @type {Object}
         */
        'date' : {

            /**
             * Default base for date type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for date type
             * @type {number}
             */
            step : 86400000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                text = $.trim(text);
                return patterns.date.test(text) ? Date.parse(text + 'T00:00:00Z') : NaN;
            },

            /**
             * Formats milliseconds to string
             * @param {number} milliseconds
             * @returns {string}
             */
            format : function (milliseconds) {
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
        'time' : {

            /**
             * Default base for time type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for time type
             * @type {number}
             */
            step : 60000,

            /**
             * Parses time to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                var parts;
                text = $.trim(text);
                if (patterns.time.test(text)) {
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
            format : function (milliseconds) {
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
         * Month scope
         * @type {Object}
         */
        'month' : {

            /**
             * Default base for month type
             * @type {number}
             */
            base : 0,

            /**
             * Default step for month type
             * @type {number}
             */
            step : 1,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                var parts;
                text = $.trim(text);
                if (patterns.month.test(text)) {
                    parts = text.split('-');
                    return (parts[0] - 1970) * 12 + parts[1] - 1;
                } else {
                    return NaN;
                }
            },

            /**
             * Formats milliseconds to string
             * @param {number} months
             * @returns {string}
             */
            format : function (months) {
                var years = Math.floor(months / 12) + 1970;
                months = months % 12 + 1;
                return years + '-' + months;
            }

        },

        /**
         * Week scope
         * @type {Object}
         */
        'week' : {

            /**
             * Default base for week type
             * @type {number}
             */
            base : 259200000,

            /**
             * Default step for week type
             * @type {number}
             */
            step : 604800000,

            /**
             * Parses date to milliseconds.
             * @param {string|number} text
             * @returns {number}
             */
            parse : function (text) {
                var parts;
                text = $.trim(text).toUpperCase();
                if (patterns.week.test(text)) {
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
            format : function (milliseconds) {
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
            firstWeek : function (year, shift) {
                var date = Date.parse(year + '-01-01T00:00:00Z'),
                    day = new Date(date).getUTCDay();
                day = day > 4 ? 7 - day : -day;
                shift = Math.max(0, parseInt(shift, 10)) || 0;
                shift %= 7;
                return date + 86400000 * (day + shift);
            }

        }
    };

    /**
     * Register validator
     */
    controller.append([
        'input[type=number]',
        'input[type=range]',
        'input[type=datetime]',
        'input[type=datetime-local]',
        'input[type=date]',
        'input[type=time]',
        'input[type=week]',
        'input[type=month]'
    ].join(','), function (element) {
        var type = $.trim(element.attr('type')).toLowerCase(),
            min = config[type].parse(element.attr('min')),
            max = config[type].parse(element.attr('max')),
            step = $.trim(element.attr('step')),
            value = config[type].parse(element.locals.value[0]),
            gait, base, exp;
        if (isNaN(value)) {
            return 'type';
        } else if (min > value) {
            return 'min';
        } else if (max < value) {
            return 'max';
        } else if (step.toLowerCase() !== 'any') {
            gait = config.number.parse(step);
            gait = !isNaN(gait) && gait > 0 ? gait : config[type].step;
            base = !isNaN(min) ? min : config[type].base;
            value -= base;
            exp = exponent(gait);
            gait = power(gait, exp);
            value = power(value, exp);
            if (exponent(value) < 0 || value % gait > 0) {
                return 'step';
            }
        }
    });

}());


(function () {

    /**
     * Escapes string to be used in regular expressions.
     * @param {string} text
     * @return {string}
     */
    function regexEscape(text) {
        return String(text).replace(/[-[\]\/{}()*+?.\\^$|]/g, '\\$&');
    }

    /**
     * Converts glob to regular expression object.
     * @param {string} glob
     * @param {string} [options]
     * @returns {RegExp}
     */
    function glob2regex(glob, options) {
        glob = regexEscape(glob);
        glob = glob.replace(/(\\+)([^\\]?)|([*?#])/g, function (match, escape) {
            var letter = arguments[2] + arguments[3],
                regexEscaped = escape.length % 2 && !/[*?]/.test(letter),
                globEscaped = (escape.length - escape.length % 2) / 2 % 2;
            escape = escape.substring(globEscaped, escape.length / 2 + regexEscaped);
            if (letter === '*') {
                letter = globEscaped ? '\\*' : '.*';
            } else if (letter === '?') {
                letter = globEscaped ? '\\?' : '.';
            } else if (letter === '#') {
                letter = globEscaped ? '#' : '\\d';
            }
            return escape + letter;
        });
        return new RegExp(glob, options);
    }

    /**
     * Register validator
     */
    controller.append('input[type=file]', function (element) {
        var value = element.locals.value,
            required = prop(element, 'required'),
            accepts, typeIndex, typeLength, fileIndex, fileLength;
        if (!value.length && required) {
            return'required';
        }
        accepts = $.trim(element.attr('accept')).split(/|,/);
        $.each(accepts, function (index, accept) {
            accepts[index] = glob2regex(accept);
        });
        fileLength = value.length;
        typeLength = accepts.length;
        for (fileIndex = 0; fileIndex < fileLength; fileIndex++) {
            for (typeIndex = 0; typeIndex < typeLength; typeIndex++) {
                if (accepts[typeIndex].test(value[fileIndex].type)) {
                    break;
                }
            }
            if (typeIndex === typeLength) {
                return 'accept';
            }
        }
    });

}());


/**
 * jQuery module to validate all inputs contained by the selection and there nodes
 * @see http://www.w3.org/html/wg/drafts/html/master/forms.html#the-input-element
 * @see http://www.w3.org/TR/html-markup/datatypes.html
 * @param {boolean} [notify=false]
 * @returns {promise}
 */
$.fn.validatingInputs = function (notify) {
    var elements = this.find(':input').add(this.filter(':input'));
    return controller.validate(elements, notify);
};

/**
 * Make the controller available to the outsiders
 * @type {$.Validating}
 */
$.fn.validatingInputs.controller = controller;

}(jQuery));