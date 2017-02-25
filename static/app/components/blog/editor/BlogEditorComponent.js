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
var BlogEditorComponent = (function () {
    function BlogEditorComponent() {
        this.onEditorKeyup = new core_1.EventEmitter();
    }
    BlogEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        tinymce.init({
            selector: "#" + this.elementId,
            height: 500,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
            ],
            toolbar1: "undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright " +
                "alignjustify | bullist numlist outdent indent | link image | print preview media | " +
                "forecolor backcolor emoticons | codesample",
            toolbar2: '',
            image_advtab: true,
            content_css: "/styles/bootstrap.css",
            skin_url: "/styles/tinymce_skin_lightgray",
            setup: function (editor) {
                _this.editor = editor;
                editor.on("keyup", function () {
                    var content = editor.getContent();
                    _this.onEditorKeyup.emit(content);
                });
            }
        });
    };
    BlogEditorComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    return BlogEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BlogEditorComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BlogEditorComponent.prototype, "onEditorKeyup", void 0);
BlogEditorComponent = __decorate([
    core_1.Component({
        selector: "blog-editor",
        template: "\n  \t<textarea id=\"{{ elementId }}\"></textarea>\n  "
    })
], BlogEditorComponent);
exports.BlogEditorComponent = BlogEditorComponent;
