/*global controller */

/**
 * jQuery module to validate all inputs contained by the selection and there nodes
 * @see http://www.w3.org/html/wg/drafts/html/master/forms.html#the-input-element
 * @see http://www.w3.org/TR/html-markup/datatypes.html
 * @param {boolean} [notify=false]
 * @returns {promise}
 */
$.fn.validatingInputs = function (notify) {
    "use strict";
    var elements = this.find(':input').add(this.filter(':input')).filter([
        'input:not([type])',
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
    ].join(','));
    return controller.validate(elements, notify);
};

/**
 * Make the controller available to the outsiders
 * @type {$.Validating}
 */
$.fn.validatingInputs.controller = controller;