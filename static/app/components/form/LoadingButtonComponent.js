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
var LoadingButtonComponent = (function () {
    function LoadingButtonComponent() {
    }
    /**
     * function called when user clicks on button
     * @param $event {Object}
     */
    LoadingButtonComponent.prototype.onButtonClick = function ($event) {
        if (this.data.callback && typeof this.data.callback.fn === "function") {
            this.data.callback.fn($event, this.data.callback.args);
        }
    };
    return LoadingButtonComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LoadingButtonComponent.prototype, "data", void 0);
LoadingButtonComponent = __decorate([
    core_1.Component({
        selector: "loading-button",
        template: "\n\t\t<button type=\"{{ data.type }}\" \n\t\t\t[attr.class]=\"data.cssClass\" \n\t\t\t[ngClass]=\"{'disabled': data.loading}\" \n\t\t\t[attr.id]=\"data.id\" \n\t\t\t(click)=\"onButtonClick($event)\">\n\t\t\t<span *ngIf=\"data.loading === false\">{{ data.text }}</span>\n\t\t\t<span *ngIf=\"data.loading === true\">\n\t\t\t\t<i class='fa fa-circle-o-notch fa-spin'></i> {{ data.loadingText }}\n\t\t\t</span>\n\t\t</button>\n\t"
    })
], LoadingButtonComponent);
exports.LoadingButtonComponent = LoadingButtonComponent;
