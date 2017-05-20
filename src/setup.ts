import { TableParser } from "./TableParserAsync";
import { TableView } from "./TableView"
document.addEventListener("DOMContentLoaded", function (event) {
   
    //var myList=new List([]);
    var parser= new TableParser();
    let tables:HTMLCollectionOf<HTMLTableElement> = document.querySelectorAll("[data-list-manipulate]") as HTMLCollectionOf<HTMLTableElement>;
    for (var i = 0; i < tables.length; i++) {
    	let table:HTMLTableElement=tables[i] as HTMLTableElement;
    	let tableView=new TableView(table)
        parser.parseFromHtml(table, 10000, function(data){
        	tableView.addToList(data);
        	table.classList.remove('hidden')
        });
    }
    
});