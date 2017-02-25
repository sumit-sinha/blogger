"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * constant defining type of validations
 * @author ssinha
 */
var ValidationType = (function () {
    function ValidationType() {
    }
    return ValidationType;
}());
ValidationType.MANDATORY = "0";
ValidationType.REGEX = "1";
ValidationType.EMAIL = "2";
ValidationType.NUMBER = "3";
ValidationType.PHONE_NUMBER = "4";
exports.ValidationType = ValidationType;
