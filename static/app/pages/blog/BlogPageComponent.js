"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var BlogPageComponent = (function () {
    function BlogPageComponent() {
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
            footer: {},
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
                    }]
            }
        };
    }
    return BlogPageComponent;
}());
BlogPageComponent = __decorate([
    core_1.Component({
        selector: "blog-page",
        template: "\n\t\t<navigation-bar></navigation-bar>\n\n\t\t<div class=\"container\">\n\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-8\">\n\n\t\t\t\t\t<blog-content [content]=\"data.content\"></blog-content>\n\n\t\t\t\t\t<hr>\n\n\t\t\t\t\t<comment-box [comments]=\"data.content.comments\"></comment-box>\n\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"col-md-4\">\n\n\t\t\t\t\t<blog-search [searchData]=\"data.search\"></blog-search>\n\n\t\t\t\t\t<blog-list [blogList]=\"data.blogList\"></blog-list>\n\n\t\t\t\t\t<profile-summary [profile]=\"data.profile\"></profile-summary>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<hr>\n\n\t\t\t<footer-panel [footer]=\"data.footer\"></footer-panel>\n\n\t\t</div>\n\t"
    })
], BlogPageComponent);
exports.BlogPageComponent = BlogPageComponent;
