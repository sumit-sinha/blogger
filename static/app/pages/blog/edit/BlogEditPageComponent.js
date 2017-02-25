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
var BlogEditPageComponent = (function () {
    function BlogEditPageComponent() {
        this.preview = { enabled: false, content: null };
    }
    /**
     * function called when key is pressed on editor
     * @param $event
     */
    BlogEditPageComponent.prototype.keyupHandlerFunction = function ($event) {
        // nothing for now
    };
    /**
     * function called when save button is clicked
     */
    BlogEditPageComponent.prototype.onSaveClick = function () {
    };
    /**
     * function called when preview button is clicked
     */
    BlogEditPageComponent.prototype.onPreviewClick = function () {
        this.preview.enabled = true;
        this.preview.content = tinyMCE.activeEditor.getContent();
    };
    /**
     * function called when cancel button is clicked
     */
    BlogEditPageComponent.prototype.onCancelClick = function () {
        history.go(-1);
    };
    return BlogEditPageComponent;
}());
BlogEditPageComponent = __decorate([
    core_1.Component({
        selector: "blog-edit",
        template: "\n\t\t<form>\n\t\t\t<div [hidden]=\"!preview.enabled\" \n\t\t\t\t[innerHTML]=\"preview.content\" \n\t\t\t\tclass=\"blog-preview\">\n\t\t\t</div>\n\t\t\t<blog-editor\n\t\t\t\t[elementId]=\"'blog-editor'\"\n\t\t\t\t(onEditorKeyup)=\"keyupHandlerFunction($event)\" \n\t\t\t\t[hidden]=\"preview.enabled\"\n\t\t\t></blog-editor>\n\t\t\t\n\t\t\t<div class=\"btn-container\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"onSaveClick()\">Save</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"onPreviewClick()\">Preview</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"onCancelClick()\">Cancel</button>\n\t\t\t</div>\n\t\t</form>\n\t",
        styles: ["\n\t\tbutton{width: 100px;}\n\t\t.container{margin-top: 60px;}\n\t\t.btn-container{text-align:right;margin-top:10px}\n\t"]
    }),
    __metadata("design:paramtypes", [])
], BlogEditPageComponent);
exports.BlogEditPageComponent = BlogEditPageComponent;
