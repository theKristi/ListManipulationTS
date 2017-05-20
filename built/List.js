"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var List = (function () {
    function List(list) {
        if (list !== undefined)
            this.setList(list);
        else {
            this._list = [];
        }
    }
    List.prototype.getList = function () {
        return this._list;
    };
    List.prototype.setList = function (list) {
        if (List.isValidList(list))
            this._list = list;
        else {
            throw "Invalid list: call getValidationErrors(list) for details";
        }
    };
    List.prototype.addRange = function (list) {
        if (this.isValidSublist(list)) {
            this._list = this._list.concat(list);
            return true;
        }
        else
            return false;
    };
    List.prototype.isValidSublist = function (list) {
        if (List.isValidList(list)) {
            var passedListProperties = JSON.stringify(Object.getOwnPropertyNames(list[0]));
            if (this._list.length > 0) {
                var listProprties = JSON.stringify(Object.getOwnPropertyNames(this._list[0]));
                return listProprties === passedListProperties;
            }
            return true;
        }
        return false;
    };
    List.prototype.sort = function (sublist, properties, asc) {
        var order = [];
        asc ? order.push('asc') : order.push('desc');
        var results = _.orderBy(sublist, properties, order);
        return results;
    };
    List.isValidList = function (list) {
        if (list === undefined || list === null)
            return false;
        if (!Array.isArray(list))
            return false;
        var firstElement = list[0];
        try {
            list.forEach(function (entry) {
                if (typeof entry !== 'object') {
                    throw "Not valid";
                }
                else {
                    var propNames = JSON.stringify(Object.getOwnPropertyNames(firstElement));
                    var objectPropNames = JSON.stringify(Object.getOwnPropertyNames(entry));
                    if (objectPropNames !== propNames) {
                        throw "Not Valid";
                    }
                }
            });
            return true;
        }
        catch (e) {
            return false;
        }
    };
    List.getValidationErrors = function (list) {
        var errors = [];
        if (list === undefined || list === null) {
            errors.push("data passed in is undefined or null");
        }
        else if (!Array.isArray(list)) {
            errors.push("data passed in is not an array");
        }
        else {
            var firstElement = list[0];
            list.forEach(function (entry, index) {
                if (typeof entry !== 'object') {
                    if (errors.indexOf("Array is not consistantly of type object") <= 0)
                        errors.push("Array is not consistantly of type object");
                }
                else {
                    var propNames = JSON.stringify(Object.getOwnPropertyNames(firstElement));
                    var objectPropNames = JSON.stringify(Object.getOwnPropertyNames(entry));
                    if (objectPropNames !== propNames) {
                        errors.push("Member at index " + index + " does not have consistant properties " +
                            "with member at index 0");
                    }
                }
            });
        }
        return errors;
    };
    return List;
}());
exports.List = List;
