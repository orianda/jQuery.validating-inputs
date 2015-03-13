/*global controller, prop */

(function () {
    "use strict";

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
        var value = this.value,
            required, accepts, typeIndex, typeLength, fileIndex, fileLength;
        element = $(element);
        required = prop(element, 'required');
        if (!value.length && required) {
            return 'required';
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