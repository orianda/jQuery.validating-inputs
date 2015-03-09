/*global controller */

(function () {
    "use strict";

    var patterns, config;

    /**
     * Type patterns
     * @type {Object}
     */
    patterns = {
        'datetime': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z|[+\-]([01]\d|2[0-3]):([0-5]\d))$/,
        'datetime-local': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)([.]\d+)?)?$/,
        'date': /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])$/,
        'time': /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)([.]\d+)?)?$/,
        'week': /^\d{4}-W([0-4]\d|5[0-3])$/,
        'month': /^\d{4}-(0\d|1[0-2])$/,
        'number': /^[+-]?\d+([.,]\d+)?(E[+-]?\d+)?$/i,
        'range': /^[+\-]?\d+([.]\d+)?(E[+\-]?\d+)?$/i
    };

    /**
     * Default values, formatter and parsers for the validation of the step attribute.
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
                text = $.trim(text);
                return patterns.month.test(text) ? Date.parse(text + '-01T00:00:00Z') : NaN;
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
                }
                return text;
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
            base : -259200000,

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
        window.console && window.console.log(element,type,element.locals.value,value);
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