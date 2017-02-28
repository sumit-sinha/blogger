"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * generic class to read/write data from local storage
 * @author ssinha
 */
var LocalStorageHelper = (function () {
    function LocalStorageHelper() {
        this.parseData();
    }
    /**
     * function to get an instance of this class
     * @return {LocalStorageHelper}
     */
    LocalStorageHelper.getInstance = function () {
        LocalStorageHelper.instance = LocalStorageHelper.instance || new LocalStorageHelper();
        return LocalStorageHelper.instance;
    };
    /**
     * function to get data from local storage
     * @param key {String} id
     * @return {any}
     */
    LocalStorageHelper.prototype.getData = function (key) {
        return this.data[key];
    };
    /**
     * function to set data inside local storage
     * @param args {Object}
     */
    LocalStorageHelper.prototype.setData = function (args) {
        this.data[args.key] = args.data;
        localStorage.setItem(LocalStorageHelper.storage_key_name, JSON.stringify(this.data));
    };
    /**
     * function to parse data from local storage
     */
    LocalStorageHelper.prototype.parseData = function () {
        var parsedData = localStorage.getItem(LocalStorageHelper.storage_key_name);
        if (parsedData) {
            try {
                this.data = JSON.parse(parsedData);
            }
            catch (e) {
                this.data = {};
            }
        }
        else {
            this.data = {};
        }
    };
    return LocalStorageHelper;
}());
LocalStorageHelper.storage_key_name = "application_data";
exports.LocalStorageHelper = LocalStorageHelper;
