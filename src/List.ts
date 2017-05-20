import * as _ from "lodash"

export class List<T> {
    //get, set
    private _list: T[];
	constructor(list:T[]){
        if(list!==undefined)
            this.setList(list);
        else{
            this._list=[];
        }
    }
    getList():T[] {
        return this._list;
        }
    
    setList(list:T[]){
        if(List.isValidList(list))
        this._list = list;
        else{
            throw "Invalid list: call getValidationErrors(list) for details";
            
		}
	}
    
    addRange(list: T[]): boolean {
        if(this.isValidSublist(list)){
            this._list=this._list.concat(list);
            return true;
        }
        else 
            return false;  
    }
    
    isValidSublist(list:T[]):boolean{
       if(List.isValidList(list)){
           let passedListProperties=JSON.stringify(Object.getOwnPropertyNames(list[0]));
           if(this._list.length>0){
           let listProprties=JSON.stringify(Object.getOwnPropertyNames(this._list[0]));
           return listProprties===passedListProperties;
       }
       return true;

       }
       return false;
    
    }
    sort(sublist:T[],properties:string[], asc:boolean):T[]{
        let order=[]
       asc? order.push('asc'):order.push('desc')
        return _.orderBy(sublist,properties,order)
    } 
    static isValidList(list: any[]):boolean{
        
        if (list === undefined || list === null)
            return false;
        if (!Array.isArray(list))
            return false;
    
        var firstElement=list[0];
	    try{
		list.forEach(function(entry) {
        if (typeof entry !== 'object') {
            throw "Not valid"
        }
		else{
			  var propNames = JSON.stringify(Object.getOwnPropertyNames(firstElement));
			   var objectPropNames = JSON.stringify(Object.getOwnPropertyNames(entry));
                if (objectPropNames !== propNames) {
                    throw "Not Valid"
                }
		}
	    });
	    return true;
	    }
	    catch(e){
		return false;
	    }
    }

    static getValidationErrors(list:any[]):string[]{

         let errors:string[]=[];
         if (list === undefined || list === null){
            errors.push("data passed in is undefined or null");
         }
         else if (!Array.isArray(list)){
            errors.push("data passed in is not an array");
         }
         else{
         var firstElement=list[0];

            list.forEach(function(entry,index) {
                if (typeof entry !== 'object') {
                      if (errors.indexOf("Array is not consistantly of type object") <= 0)
                         errors.push("Array is not consistantly of type object");
                }
                else{
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
    }
   
    //search(sublist:T[], target:string, properties:string[])T[]
    


}

