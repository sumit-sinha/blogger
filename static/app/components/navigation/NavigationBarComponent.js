"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var NavigationBarComponent = (function () {
    function NavigationBarComponent() {
    }
    return NavigationBarComponent;
}());
NavigationBarComponent = __decorate([
    core_1.Component({
        selector: "navigation-bar",
        template: "\n\t\t<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<a class=\"navbar-brand\" href=\"#\">Start Bootstrap</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\t\t\t\t\t<ul class=\"nav navbar-nav\">\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"#\">About</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"#\">Services</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"#\">Contact</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</nav>\n\t"
    })
], NavigationBarComponent);
exports.NavigationBarComponent = NavigationBarComponent;
