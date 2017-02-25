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
var BlogPageComponent = (function () {
    function BlogPageComponent(router, route) {
        this.router = router;
        this.route = route;
        this.data = {
            content: {
                author: {
                    name: "Sumit Sinha",
                    link: "http://www.google.com/"
                },
                postDate: new Date(),
                title: "My First Blog",
                comments: [{
                        profile: {
                            name: "Start Bootstrap",
                            image: "/images/comment.png",
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
                                            image: "/images/comment.png",
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
                                            image: "/images/comment.png",
                                            link: "http://www.google.com/"
                                        },
                                        message: {
                                            date: new Date(),
                                            text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
                                        }
                                    }]
                            }]
                    }]
            }
        };
        this.editor_class = "blog-content-edit";
    }
    /**
     * method called when content panel is clicked<br/>
     * it will trigger a navigation to editor panel
     */
    BlogPageComponent.prototype.onClick = function () {
        var params = this.route.snapshot.params;
        this.router.navigateByUrl("/" + params["blog"] + "/edit");
    };
    /**
     * method called when mouse enter or leaves the content panel
     * @param $event Event object
     * @param cssClass class to be applied
     */
    BlogPageComponent.prototype.onMouseMovement = function ($event, cssClass) {
        this.editor_class = cssClass;
    };
    return BlogPageComponent;
}());
BlogPageComponent = __decorate([
    core_1.Component({
        selector: "blog-page",
        template: "\n\t\t<div class=\"blog-content\" (mouseenter)=\"onMouseMovement($event, 'blog-content-edit show')\" \n\t\t\t\t(mouseleave)=\"onMouseMovement($event, 'blog-content-edit')\" (click)=\"onClick()\">\n\t\t\t<blog-content [content]=\"data.content\"></blog-content>\n\t\t\t<hr>\n\t\t\t<comment-box [comments]=\"data.content.comments\"></comment-box>\n\n\t\t\t<div class=\"{{ editor_class }}\">\n\t\t\t\t<span class=\"glyphicon glyphicon-edit\"></span>\n\t\t\t</div>\n\t\t</div>\n\t",
        styles: ["\n\t\t.blog-content .blog-content-edit {\n\t\t\tposition: absolute;\n\t\t\tright: 0;\n\t\t\ttop: 0;\n\t\t\twidth: 30px;\n\t\t\tbottom: 0;\n\t\t\tbackground: #485a69;\n\t\t\tdisplay: none;\n\t\t\ttext-align: center;\n\t\t\tcolor: white;\n\t\t\tpadding-top: 5px;\n\t\t\tfont-size: 17px; }\n\t\t\t.blog-content .blog-content-edit.show {\n\t\t\tdisplay: block; }\n\n\t\t.blog-content:hover {\n\t\t\topacity: 0.4;\n\t\t\tpadding: 0 10px;\n\t\t\tcursor: pointer;\n\t\t\tborder: 1px solid #485a69; }\n\t"]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
], BlogPageComponent);
exports.BlogPageComponent = BlogPageComponent;
