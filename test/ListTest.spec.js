

describe("ListManipulation Tests", function() {
     var ListMod=require("../built/List");
     var List=ListMod.List;
    describe("constructor Tests", function() {


        it("sets _list to [] if passed undefined", function() {
            var list = new List(undefined);
            expect(list.getList()).toEqual([]);
        });

       
        it("Calls setList if not passed undefined", function () {
            var setListSpy = spyOn(List.prototype, "setList");
            var listToPass = [{}];
            var list = new List(listToPass);
            expect(setListSpy).toHaveBeenCalled();
        });
    });
    
    describe("setList Tests", function() {
        it("sets _list if passed valid data", function() {
            var list = new List();
            var toPass = [{ prop1: "1" }, { prop1: "2" }];
            list.setList(toPass);
            expect(list.getList()).toEqual(toPass);

        });
        it("throws error if passed invalid data", function() {
            var list = new List();
            var toPass = [{ prop1: "1" }, { prop2: "2" }];
            expect(function() { list.setList(toPass) }).toThrow("Invalid list: call getValidationErrors(list) for details");
           
        });
    });
    
    describe("isListValid Tests", function() {
       
       // console.log("list:"+ JSON.stringify(Object.getOwnPropertyNames(List)));
        
        it("returns false if not array", function() {
            var test = 'Hello';
            expect(List.isValidList(test)).toBeFalsy();
            
        });

        it("returns false if not array of objects", function() {
            var test = [{}, 'Hello'];
            expect(List.isValidList(test)).toBeFalsy();
        });

        it("returns false if object properties aren't consistant", function() {
            var listToPass = [{ Hello: "a" }, { World: "b" }];
            expect(List.isValidList(listToPass)).toBeFalsy();
        });
        it("returns true if data is valid", function() {
            var listToPass = [{ Hello: "a" }, { Hello: "b" }];
            expect(List.isValidList(listToPass)).toBeTruthy();
        });
    });

    describe("getValidationErrors Tests", function(){
        it("gives error if undefined", function(){
            var message="data passed in is undefined or null";
            var result= List.getValidationErrors(undefined)[0];
            expect(result).toEqual(message);

        });
        it("gives error if not Array", function(){
            var message="data passed in is not an array"
            var result=List.getValidationErrors("Hello")[0];
            expect(result).toEqual(message);

        });
        it("gives error if Array not all objects", function(){
            var message="Array is not consistantly of type object"
            var toPass=[{First:"value"},"hello"];
            var result=List.getValidationErrors(toPass)[0];
            expect(result).toEqual(message);            

        });
         it("gives error if object properties aren't consistant", function() {
            var listToPass = [{ Hello: "a" }, { World: "b" }];

            var result=List.getValidationErrors(listToPass)[0];
            expect(result).toContain("does not have consistant properties");
        });
         it("returns no errors if data is valid", function(){
            var listToPass = [{ Hello: "a" }, { Hello: "b" }];
            var result=List.getValidationErrors(listToPass);
            expect(result).toEqual([]);
        });
    });

    describe("isValidSublist Tests", function(){
        it("returns true if list is empty", function(){
            let myList=new List([]);
            let sublist=[{Greeting:"Watcher!"}];
            var result=myList.isValidSublist(sublist);
            expect(result).toBeTruthy();
        })
        it("returns true if valid sublist", function(){
            let myList=new List([{Greeting:"Hello"},{Greeting:"Sup?"}]);
            let sublist=[{Greeting:"Watcher!"}];
            var result=myList.isValidSublist(sublist);
            expect(result).toBeTruthy();

        });
        it("returns false if invalid sublist", function(){
            let myList=new List([{Greeting:"Hello"},{Greeting:"Sup?"}]);
            let sublist=[{Greetings:"Watcher!"}];
            var result=myList.isValidSublist(sublist);
            expect(result).toBeFalsy();

        });
    });

    describe("addRange Tests", function(){
        it("doesn't add invalid sublist", function(){
            var initialList=[{ attr: 3 }, { attr: 1 }, { attr: 2 }]
            var myList=new List(initialList);
            var toAdd=[{attrs: 4}, {attrs:5}];
            var result=myList.addRange(toAdd);
            expect(result).toBeFalsy();
            expect(myList.getList()).toEqual(initialList);


        });
       
        it("adds valid sublist", function(){
            var initialList=[{ attr: 3 }, { attr: 1 }, { attr: 2 }];
            var myList=new List(initialList);
            var toAdd=[{attr: 4}, {attr:5}];
            var result=myList.addRange(toAdd);
            expect(result).toBeTruthy();
            expect(myList.getList().length).toEqual(5);


        });
    });
   
   /* describe("Sort Tests", function() {


        it("sorts string property values in ascending alphabetical order", function() {
            var listToSort = [{ attr: 'd' }, { attr: 'r' }, { attr: 'b' }];
            var sorted = [{ attr: 'b' }, { attr:'d'  }, { attr: 'r' }];
            var list = new List();
            var res=list.sort(listToSort, 'attr', true);
            expect(res).toEqual(sorted);
        });

        it("sorts string property values in descending alphabetical order", function() {
            var listToSort = [{ attr: 'c' }, { attr: 'a' }, { attr: 'b' }];
            var sorted = [{ attr: 'c' }, { attr: 'b' }, { attr: 'a' }];
            var list = new List();
            var res=list.sort(listToSort, 'attr', false);
            expect(res).toEqual(sorted);
        });

        it("sorts int property values in ascending alphabetical order", function() {
            var listToSort = [{ attr: 3 }, { attr: 1 }, { attr: 2 }];
            var sorted = [{ attr: 1 }, { attr: 2 }, { attr: 3 }];
            var list = new List(listToSort);
            var res = list.sort(listToSort, 'attr', true);
            expect(res).toEqual(sorted);
        });

        it("sorts int property values in descending alphabetical order", function() {
            var listToSort = [{ attr: 5 }, { attr: 1 }, { attr: 2 }];
            var sorted = [{ attr: 5 }, { attr: 2 }, { attr: 1 }];
            var list = new List();
            var res = list.sort(listToSort, 'attr', false);
            expect(res).toEqual(sorted);
        });

        it("sorts boolean property values in ascending alphabetical order", function() {
            var listToSort = [{ attr: true }, { attr: false }, { attr: true }];
            var sorted = [{ attr: false }, { attr: true }, { attr: true }];
            var list = new List();
            var res = list.sort(listToSort, 'attr', true);
            expect(res).toEqual(sorted);
        });

        it("sorts boolean property values in descending alphabetical order", function() {
            var listToSort = [{ attr: true }, { attr: false }, { attr: true }];
            var sorted = [{ attr: true }, { attr: true }, { attr: false }];
            var list = new List();
            var res = list.sort(listToSort, 'attr', false);
            expect(res).toEqual(sorted);
        });
    });*/
   
    /*describe("Search Tests", function() {
        it("returns valid sublist when target is contained", function() {
            var listToPass = [{ Hello: "a" }, { Hello: "b" }];
            var list = new List(listToPass);
            var searchTarget = 'a';
            var result = list.search(undefined, searchTarget);
            expect(result).toBeDefined();
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(listToPass[0]);
        });
        it("returns empty list when target is not contained", function () {
            var listToPass = [{ Hello: "a" }, { Hello: "b" }];
            var list = new List(listToPass);
            var searchTarget = 'e';
            var result = list.search(undefined, searchTarget);
            expect(result).toBeDefined();
            expect(result).toEqual([]);
           
        });
        it("returns list of all objects which contain target", function() {
            var listToPass = [{ Name: "Alvin" }, { Name: "Theodore" }, { Name: "Simon" }];
            var list = new List(listToPass);
            console.log("in test "+list.getList());
            var target = 'i';
            var result = list.search(undefined, target);
            expect(result.length).toEqual(2);
            expect(result).toContain(listToPass[0]);
            expect(result).toContain(listToPass[2]);
        });
        it("searches only on attributes passed in", function () {
            var listToPass = [{ Name: "Alvin", attr:'i' }, { Name: "Theodore", attr:'i' }, { Name: "Simon", attr:'i'}];
            var list = new List(listToPass);
            var target = 'i';
            var result = list.search(["Name"], target);
            expect(result.length).toEqual(2);
            expect(result).toContain(listToPass[0]);
            expect(result).toContain(listToPass[2]);
        });
    });*/
});