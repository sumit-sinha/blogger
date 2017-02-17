"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var IndexPageComponent = (function () {
    function IndexPageComponent() {
        this.data = {
            blogList: {
                title: "Latest Blogs",
                items: [{
                        link: "angular_require_karma",
                        title: "Angular JS with TDD"
                    }, {
                        link: "grunt_build",
                        title: "Starting with Grunt"
                    }]
            },
            search: {
                title: "Blog Search"
            },
            profile: {},
            footer: {}
        };
    }
    return IndexPageComponent;
}());
IndexPageComponent = __decorate([
    core_1.Component({
        selector: "blog",
        template: "\n\t    <navigation-bar></navigation-bar>\n\n\t    <div class=\"container\">\n\n\t        <div class=\"row\">\n\t            <div class=\"col-lg-8\">\n\n\t            </div>\n\n\t            <div class=\"col-md-4\">\n\n\t                <blog-search [searchData]=\"data.search\"></blog-search>\n\n\t                <blog-list [blogList]=\"data.blogList\"></blog-list>\n\t                \n\t                <profile-summary [profile]=\"data.profile\"></profile-summary>\n\t            </div>\n\n\t        </div>\n\n\t        <hr>\n\n\t        <footer-panel [footer]=\"data.footer\"></footer-panel>\n\n\t    </div>\n\t",
        styles: [".container{margin-top: 50px;}"]
    })
], IndexPageComponent);
exports.IndexPageComponent = IndexPageComponent;
