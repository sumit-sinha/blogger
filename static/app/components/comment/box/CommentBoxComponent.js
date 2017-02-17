"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var CommentBoxComponent = (function () {
    function CommentBoxComponent() {
        this.comments = [{
                profile: {
                    name: "Start Bootstrap",
                    image: "http://placehold.it/64x64",
                    link: "http://www.google.com/"
                },
                message: {
                    date: new Date(),
                    text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
                },
                children: [{
                        comments: [{
                                profile: {
                                    name: "Sub Bootstrap 1",
                                    image: "http://placehold.it/64x64",
                                    link: "http://www.google.com/"
                                },
                                message: {
                                    date: new Date(),
                                    text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
                                }
                            }]
                    }, {
                        comments: [{
                                profile: {
                                    name: "Sub Bootstrap 2",
                                    image: "http://placehold.it/64x64",
                                    link: "http://www.google.com/"
                                },
                                message: {
                                    date: new Date(),
                                    text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
                                }
                            }]
                    }]
            }];
    }
    return CommentBoxComponent;
}());
CommentBoxComponent = __decorate([
    core_1.Component({
        selector: "comment-box",
        template: "\n\t\t<div class=\"well\">\n\t\t\t<h4>Leave a Comment:</h4>\n\t\t\t<form role=\"form\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<textarea class=\"form-control\" rows=\"3\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n\t\t\t</form>\n\t\t</div>\n\t\t\n\t\t<hr>\n\n\t\t<comment-message [comments]=comments></comment-message>\n\t"
    })
], CommentBoxComponent);
exports.CommentBoxComponent = CommentBoxComponent;
