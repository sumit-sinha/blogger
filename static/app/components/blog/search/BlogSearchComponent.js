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
var BlogSearchComponent = (function () {
    function BlogSearchComponent() {
    }
    return BlogSearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BlogSearchComponent.prototype, "searchData", void 0);
BlogSearchComponent = __decorate([
    core_1.Component({
        selector: "blog-search",
        template: "\n\t\t<div class=\"well\">\n\t\t\t<h4>{{ searchData.title }}</h4>\n\t\t\t<div class=\"input-group\">\n\t\t\t\t<input type=\"text\" class=\"form-control\">\n\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t<button class=\"btn btn-default\" type=\"button\">\n\t\t\t\t\t\t<span class=\"glyphicon glyphicon-search\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</div>\n\t"
    })
], BlogSearchComponent);
exports.BlogSearchComponent = BlogSearchComponent;
