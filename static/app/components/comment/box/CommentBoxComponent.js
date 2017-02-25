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
var CommentBoxComponent = (function () {
    function CommentBoxComponent() {
    }
    return CommentBoxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CommentBoxComponent.prototype, "comments", void 0);
CommentBoxComponent = __decorate([
    core_1.Component({
        selector: "comment-box",
        template: "\n\t\t<div class=\"well\">\n\t\t\t<h4>Leave a Comment:</h4>\n\t\t\t<form role=\"form\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<textarea class=\"form-control\" rows=\"3\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n\t\t\t</form>\n\t\t</div>\n\t\t\n\t\t<hr>\n\n\t\t<comment-message [comments]=comments></comment-message>\n\t"
    })
], CommentBoxComponent);
exports.CommentBoxComponent = CommentBoxComponent;
