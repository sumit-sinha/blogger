"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidationHelper_1 = require("../../helpers/validation/ValidationHelper");
var InputBoxComponent = (function () {
    function InputBoxComponent(validator) {
        this.validator = validator;
    }
    InputBoxComponent.prototype.onInputBlur = function ($event) {
        var input = this.data.input;
        if (input) {
            input.value = $event.target.value;
        }
        var status = this.validator.validateComponent(input);
        if (status.valid === false) {
            input.invalid = true;
            input.message = status.message;
        }
    };
    InputBoxComponent.prototype.onInputChange = function ($event) {
        var input = this.data.input;
        if (input) {
            input.value = $event.target.value;
        }
        var status = this.validator.validateComponent(input);
        if (status.valid) {
            input.invalid = false;
            input.message = null;
        }
    };
    return InputBoxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputBoxComponent.prototype, "data", void 0);
InputBoxComponent = __decorate([
    core_1.Component({
        selector: "input-box",
        template: "\n\t\t<label for=\"{{ data.input.id }}\" class=\"sr-only\">{{ data.label.text }}</label>\n\t\t<input type=\"{{ data.input.type }}\" \n\t\t\tid=\"{{ data.input.id }}\" \n\t\t\tclass=\"form-control {{ data.input.class }}\" \n\t\t\tplaceholder=\"{{ data.input.placeholder }}\" \n\t\t\t(blur)=\"onInputBlur($event)\" \n\t\t\tvalue=\"{{ data.input.value }}\"\n\t\t\t(keyup)=\"onInputChange($event)\" \n\t\t\t[attr.autofocus]=\"data.input.autoFocus?'':null\" \n\t\t\t[ngClass]=\"{'error': data.input.invalid}\">\t\n\t",
        styles: [".error{background: #f7e0e0;}"]
    }),
    __metadata("design:paramtypes", [ValidationHelper_1.ValidationHelper])
], InputBoxComponent);
exports.InputBoxComponent = InputBoxComponent;
