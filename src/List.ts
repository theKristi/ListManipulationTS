export class List<T> {
    //get, set
    private _list: T[];
	
    getList():T[] {
        return this._list;
    }
    setList(list:T[]){
        if(this.isValidList(list))
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
    //functions:
    
    //getValidationErrors(list:T[]):string[]
    //sort(sublist:T[],properties:string[], asc:bool):T[]
    //search(sublist:T[], target:string, properties:string[])T[]
    /*addRange(list: T[]): boolean {
        if(isValidSublist(list))
    }*/


}

