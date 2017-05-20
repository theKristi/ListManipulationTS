import { TableParser } from "./TableParserAsync";
import { List } from "./List"
document.addEventListener("DOMContentLoaded", function (event) {
   
    var myList=new List([]);
    var parser= new TableParser();
    let tables:HTMLCollectionOf<HTMLTableElement> = document.querySelectorAll("[data-list-manipulate]") as HTMLCollectionOf<HTMLTableElement>;
    for (var i = 0; i < tables.length; i++) {
    	var table:HTMLTableElement=tables[i] as HTMLTableElement;
        parser.parseFromHtml(table, 10000, function(data){
        	var res=myList.addRange(data);
            console.log("data added: "+ res);
        	table.classList.remove("hidden");
        	myList.sort(myList.getList(),["Column1"], false);
        });
    }
    
});