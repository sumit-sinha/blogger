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
var BlogContentComponent = (function () {
    function BlogContentComponent() {
    }
    return BlogContentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BlogContentComponent.prototype, "content", void 0);
BlogContentComponent = __decorate([
    core_1.Component({
        selector: "blog-content",
        template: "\n\t\t<h1>{{ content.title }}</h1>\n\n\t\t<p class=\"lead\">\n\t\t\tby <a href=\"{{ content.author.link }}\">{{ content.author.name }}</a>\n\t\t</p>\n\n\t\t<hr>\n\n\t\t<p><span class=\"glyphicon glyphicon-time\"></span> Posted on {{ content.postDate | date: \"MMMM dd, yyyy\" }} at {{ content.data | date: \"shortTime\" }}</p>\n\n\t\t<hr>\n\n\t\t<img class=\"img-responsive\" src=\"http://placehold.it/900x300\" alt=\"\">\n\n\t\t<hr>\n\n\t\t<p class=\"lead\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>\n\t"
    })
], BlogContentComponent);
exports.BlogContentComponent = BlogContentComponent;
