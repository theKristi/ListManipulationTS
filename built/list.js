"use strict";
exports.__esModule = true;
var List = (function () {
    function List() {
    }
    List.prototype.getList = function () {
        return this._list;
    };
    List.prototype.setList = function (list) {
        if (List.isValidList(list))
            this._list = list;
        else {
            throw "List is not valid";
        }
    };
    List.isValidList = function (list) {
        if (list === undefined || list === null)
            return false;
        if (!Array.isArray(list))
            return false;
        var valid;
        list.forEach(function (entry) {
            if (typeof entry !== 'object') {
                valid = false;
            }
        });
        if (valid != undefined)
            return false;
        if (list.length > 0) {
            var propNames = JSON.stringify(Object.getOwnPropertyNames(list[0]));
            for (var i = 1; i < list.length; i++) {
                var objectPropNames = JSON.stringify(Object.getOwnPropertyNames(list[i]));
                if (objectPropNames !== propNames) {
                    return false;
                }
            }
        }
        return true;
    };
    return List;
}());
