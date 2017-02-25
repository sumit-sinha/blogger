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
var NavigationBarComponent = (function () {
    function NavigationBarComponent() {
    }
    return NavigationBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NavigationBarComponent.prototype, "data", void 0);
NavigationBarComponent = __decorate([
    core_1.Component({
        selector: "navigation-bar",
        template: "\n\t\t<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\" *ngIf=\"data\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t<a class=\"navbar-brand\" href=\"javascript:void(0);\" \n\t\t\t\t\t\t(click)=\"data.callback.fn($event, data.callback.args)\">{{ data.title }}</a>\n\t\t\t\t</div>\t\t\t\n\t\t\t</div>\n\t\t</nav>\n\t"
    })
], NavigationBarComponent);
exports.NavigationBarComponent = NavigationBarComponent;
