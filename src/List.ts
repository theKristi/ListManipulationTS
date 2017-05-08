import * as _ from "lodash";

class List<T> {
    //get, set
    private _list: T[];
    getList():T[] {
        return this._list;
    }
    setList(list:T[]){
        //TODO:ensure type safety
        this._list = list;
    }
    //functions:
    //isValidList(list:T[]):bool
    //getValidationErrors(list:T[]):string[]
    //sort(sublist:T[],properties:string[], asc:bool):T[]
    //search(subulist:T[], target:string, properties:string[])T[]
    addRange(list: T[]): boolean {
        return false;
    }


}

