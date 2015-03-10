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
    var elements = this.find(':input').add(this.filter(':input'));
    return controller.validate(elements, notify);
};

/**
 * Make the controller available to the outsiders
 * @type {$.Validating}
 */
$.fn.validatingInputs.controller = controller;