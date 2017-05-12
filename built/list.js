"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = (function () {
    function List() {
    }
    List.prototype.getList = function () {
        return this._list;
    };
    List.prototype.setList = function (list) {
        if (this.isValidList(list))
            this._list = list;
        else {
            throw "List is not valid";
        }
    };
    List.prototype.isValidList = function (list) {
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
    return List;
}());
exports.List = List;
