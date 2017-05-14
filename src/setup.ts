import { TableParser } from "./TableParserAsync";
import { List } from "./List"
document.addEventListener("DOMContentLoaded", function (event) {
    //do work
    //tableViews = [];

    //var List=new List();
    var parser= new TableParser();
    let tables:HTMLCollectionOf<HTMLTableElement> = document.querySelectorAll("[data-list-manipulate]") as HTMLCollectionOf<HTMLTableElement>;
    for (var i = 0; i < tables.length; i++) {
    	var table:HTMLTableElement=tables[i] as HTMLTableElement;
        parser.parseFromHtml(table, 10000, function(data){
        	console.log("parsed");
        	table.classList.remove("hidden");
        });
    }
    
});