"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * generic class to read data which is passed from server
 * @author ssinha
 */
var ApplicationDataHelper = (function () {
    function ApplicationDataHelper() {
        this.data = this.parseData();
    }
    /**
     * function to get an instance of this class
     * @return {ApplicationDataHelper}
     */
    ApplicationDataHelper.getInstance = function () {
        ApplicationDataHelper.instance = ApplicationDataHelper.instance || new ApplicationDataHelper();
        return ApplicationDataHelper.instance;
    };
    /**
     * function to get data for a specific page
     * @param page {String} id
     * @return {Object}
     */
    ApplicationDataHelper.prototype.getPageData = function (page) {
        return this.data[page];
    };
    /**
     * function to get localised string
     * @param key {String}
     * @return {String}
     */
    ApplicationDataHelper.prototype.getLabel = function (key) {
        if (this.data.labels == null || this.data.labels[key] == null) {
            return "??" + key + "??";
        }
        return this.data.labels[key];
    };
    /**
     * function to get global configuration
     * @param key {String}
     * @return {Object}
     */
    ApplicationDataHelper.prototype.getGlobalConfig = function (key) {
        if (this.data.global) {
            return this.data.global[key];
        }
        return null;
    };
    /**
     * function to parse data from HTML
     * @return {Object}
     */
    ApplicationDataHelper.prototype.parseData = function () {
        var blogEl = document.getElementsByTagName("blog")[0];
        if (blogEl) {
            return JSON.parse(blogEl.getAttribute("init-data"));
        }
        return {};
    };
    return ApplicationDataHelper;
}());
exports.ApplicationDataHelper = ApplicationDataHelper;
