import * as _ from "lodash";

class List<T> {
    //get, set
    private _list: T[];
    getList():T[] {
        return this._list;
    }
    setList(list:T[]){
        if(List.isValidList(list))
        this._list = list;
        else{
            throw "List is not valid";
            
        }
    }

    static isValidList(list: any[]):boolean{
        
    if (list === undefined || list === null)
        return false;
    if (!Array.isArray(list))
        return false;
    var valid;
    
    list.forEach(function(entry) {
        if (typeof entry !== 'object') {
            valid = false;
        }
    });
    if (valid != undefined)
        return false;
    if (list.length>0) {
        var propNames = JSON.stringify(Object.getOwnPropertyNames(list[0]));
        for (var i = 1; i < list.length; i++) {
            var objectPropNames = JSON.stringify(Object.getOwnPropertyNames(list[i]));
                if (objectPropNames !== propNames) {
                    return false;
                }

            }
        }
        return true;
    }
    //functions:
    //isValidList(list:T[]):bool
    //getValidationErrors(list:T[]):string[]
    //sort(sublist:T[],properties:string[], asc:bool):T[]
    //search(sublist:T[], target:string, properties:string[])T[]
    /*addRange(list: T[]): boolean {
        if(isValidSublist(list))
    }*/


}

