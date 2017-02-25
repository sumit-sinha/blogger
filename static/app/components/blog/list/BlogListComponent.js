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
var ApplicationDataHelper_1 = require("../../../helpers/data/ApplicationDataHelper");
var BlogListComponent = (function () {
    function BlogListComponent() {
        this.dataHelper = ApplicationDataHelper_1.ApplicationDataHelper.getInstance();
    }
    return BlogListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BlogListComponent.prototype, "blogList", void 0);
BlogListComponent = __decorate([
    core_1.Component({
        selector: "blog-list",
        template: "\n\t\t<div class=\"well\">\n\t\t\t<h4>{{ dataHelper.getLabel(\"tx_latest_blogs\") }}</h4>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<ul class=\"list-unstyled\">\n\t\t\t\t\t\t<li *ngFor=\"let item of blogList.items\">\n\t\t\t\t\t\t\t<a href=\"{{ item.link }}\">{{ item.title }}</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li *ngIf=\"blogList.items == null || blogList.items?.length == 0\">\n\t\t\t\t\t\t\t{{ dataHelper.getLabel(\"tx_blog_list_zero\") }}\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [])
], BlogListComponent);
exports.BlogListComponent = BlogListComponent;
