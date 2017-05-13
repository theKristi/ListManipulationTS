"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = (function () {
    function List() {
    }
    List.prototype.getList = function () {
        return this._list;
    };
    List.prototype.setList = function (list) {
        //TODO:ensure type safety
        this._list = list;
    };
    //functions:
    //isValidList(list:T[]):bool
    //getValidationErrors(list:T[]):string[]
    //sort(sublist:T[],properties:string[], asc:bool):T[]
    //search(subulist:T[], target:string, properties:string[])T[]
    List.prototype.addRange = function (list) {
        return false;
    };
    return List;
}());
