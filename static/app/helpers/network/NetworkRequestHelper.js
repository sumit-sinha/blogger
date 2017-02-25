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
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var NetworkRequestHelper = (function () {
    function NetworkRequestHelper(http) {
        this.http = http;
    }
    /**
     * function to make a request to server
     * @param args {Object}
     */
    NetworkRequestHelper.prototype.request = function (args) {
        this.http.request(args.url, this.getRequestOptions(args))
            .subscribe(function (response) {
            args.callback.success(response);
        });
    };
    /**
     * function to get {RequestOptions} object based on argument
     * @param args {Object}
     * @return {RequestOptions}
     */
    NetworkRequestHelper.prototype.getRequestOptions = function (args) {
        var options = new http_1.RequestOptions({
            method: (args.method === "POST") ? http_1.RequestMethod.Post : http_1.RequestMethod.Get,
            url: args.url,
            body: this.getBody(args),
            headers: this.getHeaders(args),
            withCredentials: args.credentials === true
        });
        return options;
    };
    /**
     * function get {Headers} object based on passed argument
     * @param args {Object}
     * @return {Headers}
     */
    NetworkRequestHelper.prototype.getHeaders = function (args) {
        var headers = new http_1.Headers();
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        if (args && args.headers) {
            for (var key in args.headers) {
                if (args.headers.hasOwnProperty(key)) {
                    headers.set(key, args.headers[key]);
                }
            }
        }
        return headers;
    };
    /**
     * function to get body based on passed argument
     * @param args {Object}
     * @return {any}
     */
    NetworkRequestHelper.prototype.getBody = function (args) {
        if (args == null || args.parameters == null) {
            return null;
        }
        var body = "";
        for (var key in args.parameters) {
            if (args.parameters.hasOwnProperty(key)) {
                if (body.length > 0) {
                    body += "&";
                }
                body += key + "=" + args.parameters[key];
            }
        }
        return body;
    };
    return NetworkRequestHelper;
}());
NetworkRequestHelper = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NetworkRequestHelper);
exports.NetworkRequestHelper = NetworkRequestHelper;
