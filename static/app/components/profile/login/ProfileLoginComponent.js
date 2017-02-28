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
var LocalStorageHelper_1 = require("../../../helpers/data/LocalStorageHelper");
var ApplicationDataHelper_1 = require("../../../helpers/data/ApplicationDataHelper");
var NetworkRequestHelper_1 = require("../../../helpers/network/NetworkRequestHelper");
var ValidationType_1 = require("../../../helpers/validation/ValidationType");
var ValidationHelper_1 = require("../../../helpers/validation/ValidationHelper");
var ProfileLoginComponent = (function () {
    function ProfileLoginComponent(networkHelper, validator, router) {
        this.networkHelper = networkHelper;
        this.validator = validator;
        this.router = router;
        this.storageHelper = LocalStorageHelper_1.LocalStorageHelper.getInstance();
        this.dataHelper = ApplicationDataHelper_1.ApplicationDataHelper.getInstance();
        this.fields = [{
                label: { text: this.dataHelper.getLabel("tx_email_address") },
                input: {
                    id: "user_name",
                    type: "email",
                    value: this.storageHelper.getData("user_name"),
                    autofocus: true,
                    placeholder: this.dataHelper.getLabel("tx_email_address"),
                    validations: [{ type: ValidationType_1.ValidationType.EMAIL }]
                }
            }, {
                label: { text: this.dataHelper.getLabel("tx_password") },
                input: {
                    id: "password",
                    type: "password",
                    placeholder: this.dataHelper.getLabel("tx_password"),
                    validations: [{ type: ValidationType_1.ValidationType.MANDATORY }]
                }
            }, {
                label: { text: this.dataHelper.getLabel("tx_remember_me") },
                input: {}
            }];
        this.button = {
            loading: false,
            type: "submit",
            cssClass: "btn btn-lg btn-primary btn-block",
            text: this.dataHelper.getLabel("tx_sign_in"),
            loadingText: this.dataHelper.getLabel("tx_sign_in_loading")
        };
        this.error = {
            show: false,
            text: null
        };
    }
    /**
     * function called on form submission
     * @param $event {Object}
     */
    ProfileLoginComponent.prototype.onFormSubmission = function ($event) {
        $event.preventDefault();
        var validationStatus = this.validator.validateForm(this.fields);
        if (validationStatus.valid) {
            this.button.loading = true;
            this.networkHelper.request({
                url: "/profile/login",
                method: "POST",
                parameters: {
                    email: this.fields[0].input.value,
                    password: this.fields[1].input.value
                },
                callback: {
                    success: {
                        fn: this.onFormSubmissionSuccess,
                        args: { scope: this }
                    },
                    error: {
                        fn: this.onFormSubmissionError,
                        args: { scope: this }
                    }
                }
            });
            return;
        }
        this.showError({
            text: this.dataHelper.getLabel("tx_sign_in_validation_error")
        });
    };
    /**
     * function called when we get response for network submission
     * @param response {Object}
     * @param args {Object}
     */
    ProfileLoginComponent.prototype.onFormSubmissionSuccess = function (response, args) {
        var scope = args.scope, json = { user: null, error: null };
        try {
            json = JSON.parse(response._body);
        }
        catch (e) {
            json.error = this.dataHelper.getLabel("tx_response_error");
        }
        scope.button.loading = false;
        if (json.user) {
            scope.dataHelper.setData({
                type: "global",
                key: "profile",
                data: json
            });
            if (scope.fields[2].input.value) {
                scope.storageHelper.setData({
                    key: "user_name",
                    data: json.user
                });
            }
            scope.router.navigateByUrl("/");
            return;
        }
        scope.showError({
            text: json.error
        });
    };
    /**
     * function called when we get error for network submission
     * @param response {Object}
     * @param args {Object}
     */
    ProfileLoginComponent.prototype.onFormSubmissionError = function (error, args) {
        var scope = args.scope;
        scope.button.loading = false;
        scope.showError({
            text: scope.dataHelper.getLabel("tx_network_error")
        });
    };
    /**
     * function called to display error messages in UI
     * @param
     */
    ProfileLoginComponent.prototype.showError = function (args) {
        this.error.text = args.text;
        this.error.show = true;
        this.error.type = "danger";
    };
    return ProfileLoginComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProfileLoginComponent.prototype, "data", void 0);
ProfileLoginComponent = __decorate([
    core_1.Component({
        selector: "profile-login",
        template: "\n\t\t<form class=\"form-signin\" (submit)=\"onFormSubmission($event)\">\n\n\t\t\t<alert-message [message]=\"error\"></alert-message>\n\n\t\t\t<h2 class=\"form-signin-heading\">{{ dataHelper.getLabel(\"tx_please_sign_in\") }}</h2>\n\t\t\t<input-box [data]=\"fields[0]\"></input-box>\n\t\t\t<input-box [data]=\"fields[1]\"></input-box>\n\t\t\t<check-box [data]=\"fields[2]\"></check-box>\n\n\t\t\t<loading-button [data]=\"button\"></loading-button>\n\t\t</form>\n\t",
        styles: ["\n\t\t.form-signin {\n\t\t\tmax-width: 330px;\n\t\t\tpadding: 15px;\n\t\t\tmargin: 0 auto;\n\t\t}\n\t\t.form-signin .form-signin-heading,\n\t\t.form-signin .checkbox {\n\t\t\tmargin-bottom: 10px;\n\t\t}\n\t\t.form-signin .checkbox {\n\t\t\tfont-weight: normal;\n\t\t}\n\t\t.form-signin >>> .form-control {\n\t\t\tposition: relative;\n\t\t\theight: auto;\n\t\t\t-webkit-box-sizing: border-box;\n\t\t\t-moz-box-sizing: border-box;\n\t\t\tbox-sizing: border-box;\n\t\t\tpadding: 10px;\n\t\t\tfont-size: 16px;\n\t\t}\n\t\t.form-signin >>> .form-control:focus {\n\t\t\tz-index: 2;\n\t\t}\n\t\t.form-signin >>> input[type=\"email\"] {\n\t\t\tmargin-bottom: -1px;\n\t\t\tborder-bottom-right-radius: 0;\n\t\t\tborder-bottom-left-radius: 0;\n\t\t}\n\t\t.form-signin >>> input[type=\"password\"] {\n\t\t\tmargin-bottom: 10px;\n\t\t\tborder-top-left-radius: 0;\n\t\t\tborder-top-right-radius: 0;\n\t\t}\n\n\t\t@media (max-width: 600px) {\n\t\t\t.form-signin {\n\t\t\t\tmax-width: 600px;\n\t\t\t}\n\t\t}\n\t"]
    }),
    __metadata("design:paramtypes", [NetworkRequestHelper_1.NetworkRequestHelper,
        ValidationHelper_1.ValidationHelper,
        router_1.Router])
], ProfileLoginComponent);
exports.ProfileLoginComponent = ProfileLoginComponent;
