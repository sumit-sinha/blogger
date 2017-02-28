"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidationType_1 = require("./ValidationType");
var ValidationHelper = (function () {
    function ValidationHelper() {
    }
    /**
     * perform a full validation on form and return the status
     * @param fields {Array}
     * @return {Object}
     */
    ValidationHelper.prototype.validateForm = function (fields) {
        if (fields == null || fields.length === 0) {
            return { valid: true };
        }
        var status = { messages: [], valid: true };
        for (var i = 0, length_1 = fields.length; i < length_1; i++) {
            var field = fields[i];
            if (field.input == null) {
                status.valid = false;
                break;
            }
            if (field.input.invalid) {
                status.valid = false;
                status.messages.push(field.input.message);
                break;
            }
            var fieldStatus = this.validateComponent(field.input);
            if (fieldStatus.valid === false) {
                status.valid = false;
                field.input.invalid = true;
                field.input.message = fieldStatus.message;
                status.messages.push(fieldStatus.message);
            }
        }
        return status;
    };
    /**
     * perform validation and return an Object with status
     * @param input {Object}
     * @return {Object}
     */
    ValidationHelper.prototype.validateComponent = function (input) {
        if (input == null || input.validations == null) {
            return { valid: true };
        }
        var status = {};
        var validations = input.validations;
        for (var i = 0, length_2 = validations.length; i < length_2; i++) {
            var validation = validations[i];
            switch (validation.type) {
                case ValidationType_1.ValidationType.MANDATORY:
                    status.valid = input.value != null && input.value.trim() !== "";
                    break;
                case ValidationType_1.ValidationType.EMAIL:
                    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    status.valid = emailRegex.test(input.value);
                    break;
                case ValidationType_1.ValidationType.NUMBER:
                    status.valid = isNaN(input.value) === false && typeof (input.value) !== "string";
                    break;
                case ValidationType_1.ValidationType.PHONE_NUMBER:
                    var phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
                    status.valid = phoneRegex.test(input.value);
                    break;
                case ValidationType_1.ValidationType.REGEX:
                    status.valid = false;
                    for (var j = 0, regexLength = validation.listRegex.length; j < regexLength; j++) {
                        var regex = validation.listRegex[j];
                        if (regex.test(input.value)) {
                            status.valid = true;
                            break;
                        }
                    }
                    break;
            }
            if (status.valid === false) {
                status.message = validation.message;
                break;
            }
        }
        return status;
    };
    return ValidationHelper;
}());
ValidationHelper = __decorate([
    core_1.Injectable()
], ValidationHelper);
exports.ValidationHelper = ValidationHelper;
