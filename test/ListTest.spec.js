

describe("ListManipulation Tests", function() {
    describe("isListValid Tests", function() {
        var List=require("../built/list.js");
        
        it("returns false if not array", function() {
            var test = 'Hello';
            expect(List.isValidList(test)).toBeFalsy();
            done();
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
   /* describe("Constructor Tests", function() {


        it("sets _list to [] if passed undefined", function() {
            var list = new List(undefined);
            expect(list.getList()).toEqual([]);
        });

       
       /* it("Calls setList if not passed undefined", function () {
            var setListSpy = spyOn(List.prototype, "setList");
            var listToPass = [{}];
            var list = new List(listToPass);
            expect(setListSpy).toHaveBeenCalled();
        });
        

    });
    describe("SetList Tests", function() {
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
    describe("Sort Tests", function() {


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