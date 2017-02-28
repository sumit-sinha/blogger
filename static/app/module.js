"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var IndexPageComponent_1 = require("./pages/index/IndexPageComponent");
var BlogPageComponent_1 = require("./pages/blog/display/BlogPageComponent");
var BlogEditPageComponent_1 = require("./pages/blog/edit/BlogEditPageComponent");
var BlogListPageComponent_1 = require("./pages/blog/list/BlogListPageComponent");
var NavigationBarComponent_1 = require("./components/navigation/NavigationBarComponent");
var BlogListComponent_1 = require("./components/blog/list/BlogListComponent");
var BlogSearchComponent_1 = require("./components/blog/search/BlogSearchComponent");
var BlogContentComponent_1 = require("./components/blog/content/BlogContentComponent");
var BlogEditorComponent_1 = require("./components/blog/editor/BlogEditorComponent");
var ProfileSummaryComponent_1 = require("./components/profile/summary/ProfileSummaryComponent");
var ProfileLoginComponent_1 = require("./components/profile/login/ProfileLoginComponent");
var CommentBoxComponent_1 = require("./components/comment/box/CommentBoxComponent");
var CommentMessageComponent_1 = require("./components/comment/message/CommentMessageComponent");
var InputBoxComponent_1 = require("./components/form/InputBoxComponent");
var CheckboxComponent_1 = require("./components/form/CheckboxComponent");
var LoadingButtonComponent_1 = require("./components/form/LoadingButtonComponent");
var AlertMessageComponent_1 = require("./components/message/AlertMessageComponent");
var ReverseArrayPipe_1 = require("./pipes/array/ReverseArrayPipe");
var NetworkRequestHelper_1 = require("./helpers/network/NetworkRequestHelper");
var ValidationHelper_1 = require("./helpers/validation/ValidationHelper");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule,
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot([{
                    path: "",
                    component: BlogListPageComponent_1.BlogListPageComponent
                }, {
                    path: ":blog",
                    component: BlogPageComponent_1.BlogPageComponent
                }, {
                    path: ":blog/edit",
                    component: BlogEditPageComponent_1.BlogEditPageComponent
                }, {
                    path: "new/blog",
                    component: BlogEditPageComponent_1.BlogEditPageComponent
                }, {
                    path: "profile/login",
                    component: ProfileLoginComponent_1.ProfileLoginComponent
                }])
        ],
        declarations: [
            IndexPageComponent_1.IndexPageComponent,
            BlogPageComponent_1.BlogPageComponent,
            BlogEditPageComponent_1.BlogEditPageComponent,
            BlogListPageComponent_1.BlogListPageComponent,
            NavigationBarComponent_1.NavigationBarComponent,
            BlogListComponent_1.BlogListComponent,
            BlogSearchComponent_1.BlogSearchComponent,
            BlogContentComponent_1.BlogContentComponent,
            BlogEditorComponent_1.BlogEditorComponent,
            ProfileSummaryComponent_1.ProfileSummaryComponent,
            ProfileLoginComponent_1.ProfileLoginComponent,
            CommentBoxComponent_1.CommentBoxComponent,
            CommentMessageComponent_1.CommentMessageComponent,
            InputBoxComponent_1.InputBoxComponent,
            CheckboxComponent_1.CheckboxComponent,
            LoadingButtonComponent_1.LoadingButtonComponent,
            AlertMessageComponent_1.AlertMessageComponent,
            ReverseArrayPipe_1.ReverseArrayPipe
        ],
        providers: [
            { provide: common_1.APP_BASE_HREF, useValue: '/' },
            NetworkRequestHelper_1.NetworkRequestHelper,
            ValidationHelper_1.ValidationHelper
        ],
        bootstrap: [IndexPageComponent_1.IndexPageComponent]
    })
], AppModule);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
