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
var CheckboxComponent = (function () {
    function CheckboxComponent() {
    }
    CheckboxComponent.prototype.onCheckboxClick = function ($event) {
        if (this.data.input == null) {
            this.data.input = {};
        }
        this.data.input.value = $event.target.checked;
    };
    return CheckboxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "data", void 0);
CheckboxComponent = __decorate([
    core_1.Component({
        selector: "check-box",
        template: "\n\t\t<div class=\"checkbox\">\n\t\t\t<label><input \n\t\t\t\ttype=\"checkbox\" \n\t\t\t\t[attr.checked]=\"data.input.value\" \n\t\t\t\t(change)=\"onCheckboxClick($event)\"> {{ data.label.text }}</label>\n\t\t</div>\n\t",
        styles: [""]
    })
], CheckboxComponent);
exports.CheckboxComponent = CheckboxComponent;
