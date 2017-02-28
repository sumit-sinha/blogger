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
var router_1 = require("@angular/router");
var ApplicationDataHelper_1 = require("../../helpers/data/ApplicationDataHelper");
var IndexPageComponent = (function () {
    function IndexPageComponent(router) {
        var _this = this;
        this.router = router;
        this.data = { global: {} };
        this.dataHelper = ApplicationDataHelper_1.ApplicationDataHelper.getInstance();
        this.data.page = this.dataHelper.getPageData("index");
        router.events.subscribe(function (val) {
            _this.data.global = {
                header: _this.dataHelper.getGlobalConfig("header"),
                footer: _this.dataHelper.getGlobalConfig("footer"),
                profile: _this.dataHelper.getGlobalConfig("profile")
            };
            if (_this.data.global.header) {
                _this.data.global.header.callback = {
                    fn: _this.onHeadClick,
                    args: { scope: _this }
                };
            }
        });
    }
    /**
     * function called when title on header is clicked
     * @param $event
     * @param args
     */
    IndexPageComponent.prototype.onHeadClick = function ($event, args) {
        args.scope.router.navigateByUrl("/");
    };
    return IndexPageComponent;
}());
IndexPageComponent = __decorate([
    core_1.Component({
        selector: "blog",
        template: "\n\t    <navigation-bar [data]=\"data.global.header\"></navigation-bar>\n\t    <div class=\"container\">\n\t        <div class=\"row\">\n\t            <div class=\"col-lg-8\">\n\t            \t<router-outlet></router-outlet>\n\t            </div>\n\t            <div class=\"col-lg-4\">\n\t                <blog-search [searchData]=\"data.search\"></blog-search>\n\t                <blog-list [blogList]=\"data.page.blogList\"></blog-list>\n\t                <profile-summary [profile]=\"data.global.profile\"></profile-summary>\n\t            </div>\n\t        </div>\n\t    </div>\n\t",
        styles: ["\n\t\t.container{margin-top: 60px;}\n\t\t@media (max-width: 600px) {\n\t\t\t.col-lg-8 {\n\t\t\t\tmargin-bottom: 20px;\n\t\t\t}\n\t\t}\n\t"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], IndexPageComponent);
exports.IndexPageComponent = IndexPageComponent;
