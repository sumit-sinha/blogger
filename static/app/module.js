"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var IndexComponent_1 = require("./components/index/IndexComponent");
var NavigationBarComponent_1 = require("./components/navigation/NavigationBarComponent");
var CommentBoxComponent_1 = require("./components/comment/box/CommentBoxComponent");
var CommentMessageComponent_1 = require("./components/comment/message/CommentMessageComponent");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [
            IndexComponent_1.IndexComponent,
            NavigationBarComponent_1.NavigationBarComponent,
            CommentBoxComponent_1.CommentBoxComponent,
            CommentMessageComponent_1.CommentMessageComponent,
        ],
        bootstrap: [IndexComponent_1.IndexComponent]
    })
], AppModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
