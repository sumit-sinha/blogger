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
var core_1 = require("@angular/core");
var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FooterComponent.prototype, "footer", void 0);
FooterComponent = __decorate([
    core_1.Component({
        selector: "footer-panel",
        template: "\n\t\t<footer>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<p>Copyright &copy; Your Website 2014</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</footer>\n\t"
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
