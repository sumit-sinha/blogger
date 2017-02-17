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
var CommentMessageComponent = (function () {
    function CommentMessageComponent() {
    }
    return CommentMessageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CommentMessageComponent.prototype, "comments", void 0);
CommentMessageComponent = __decorate([
    core_1.Component({
        selector: "comment-message",
        template: "\n\t\t<div class=\"media\" *ngFor=\"let comment of comments\">\n\t\t\t<a class=\"pull-left\" href=\"{{ comment.profile.link }}\">\n\t\t\t\t<img class=\"media-object\" src=\"{{ comment.profile.image }}\" alt=\"\">\n\t\t\t</a>\n\t\t\t<div class=\"media-body\">\n\t\t\t\t<h4 class=\"media-heading\">{{ comment.profile.name }}\n\t\t\t\t\t<small>{{ comment.message.date | date: \"MMMM dd, yyyy\" }} at {{ comment.message.date | date: \"shortTime\" }}</small>\n\t\t\t\t</h4>\n\t\t\t\t\n\t\t\t\t{{ comment.message.text }}\n\n\t\t\t\t<div class=\"sub-messages\" *ngFor=\"let child of comment.children\" >\n\t\t\t\t\t<comment-message [comments]=\"child.comments\"></comment-message>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
        styles: [".sub-messages{padding-top:15px;}"]
    })
], CommentMessageComponent);
exports.CommentMessageComponent = CommentMessageComponent;
