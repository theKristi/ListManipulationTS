import { TableParser } from "./TableParserAsync";
document.addEventListener("DOMContentLoaded", function (event) {
    //do work
    //tableViews = [];
    var parser= new TableParser();
    let tables:HTMLCollectionOf<HTMLTableElement> = document.querySelectorAll("[data-list-manipulate]") as HTMLCollectionOf<HTMLTableElement>;
    for (var i = 0; i < tables.length; i++) {
        parser.parseFromHtml(tables[i] as any, 10000, function(data){
        	console.log(data);
        });
    }
    
});