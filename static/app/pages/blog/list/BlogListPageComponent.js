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
var BlogListPageComponent = (function () {
    function BlogListPageComponent(router) {
        this.router = router;
        if (this.blogList == null) {
            this.blogList = [];
        }
        this.blogList.push({
            profile: {
                image: "/images/newBlog.png"
            },
            url: "new",
            title: "Create New",
            description: "Go ahead and write a new blog. Share your experience and expertise with everyone " +
                "around the globe and earn thier praise in exchange"
        });
    }
    /**
     * function called when link is clicked
     * @param $event
     * @param args
     */
    BlogListPageComponent.prototype.onLinkClick = function ($event, args) {
        if (args == null || args.url == null) {
            return;
        }
        if (args.url === "new") {
            this.router.navigateByUrl("/new/blog");
            return;
        }
        this.router.navigateByUrl("/" + args.url);
    };
    return BlogListPageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BlogListPageComponent.prototype, "blogList", void 0);
BlogListPageComponent = __decorate([
    core_1.Component({
        selector: "blog-list-page",
        template: "\n\t\t<div class=\"media\" *ngFor=\"let blog of blogList | reverse\" (click)=\"onLinkClick($event, {url: blog.url})\">\n\t\t\t<a class=\"pull-left\" href=\"javascript:void(0);\">\n\t\t\t\t<img class=\"media-object\" src=\"{{ blog.profile.image }}\" alt=\"\">\n\t\t\t</a>\n\t\t\t<div class=\"media-body\">\n\t\t\t\t<h4 class=\"media-heading\">{{ blog.title }}\n\t\t\t\t\t<small *ngIf=\"blog.postDate\">\n\t\t\t\t\t\t{{ blog.postDate | date: \"MMMM dd, yyyy\" }} at {{ blog.postDate | date: \"shortTime\" }}\n\t\t\t\t\t</small>\n\t\t\t\t</h4>\n\t\t\t\t\n\t\t\t\t{{ blog.description }}\n\t\t\t</div>\n\t\t</div>\n\t",
        styles: [".media:first-child{margin-top: 10px;} .media{cursor:pointer;}"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], BlogListPageComponent);
exports.BlogListPageComponent = BlogListPageComponent;
