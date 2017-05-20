import { List } from "./List"
import{ ITableRow } from "./TableParserAsync"
import{ DomManipulator} from "./DOMManipulator"
export class TableView{
private _list:List<ITableRow>;
private _tableElement:HTMLTableElement
private _columnsToSort:NodeListOf<Element>
private _sortedOn: string
private _asc: boolean
private _domManipulator:DomManipulator
constructor(table:HTMLTableElement){
	this._tableElement=table;
	this._list=new List([]);
	this._columnsToSort=this._tableElement.querySelectorAll("[data-sort]");
	this._domManipulator=new DomManipulator();
	this.setUpSortEventListeners();
}
//properties 

//searchInputs
//search submitters
//search filters

//functions
addToList(data:ITableRow[]){
	this._list.addRange(data);
}

setUpSortEventListeners(){
	let self = this;
	if (this._columnsToSort) {
        for (var j = 0; j < this._columnsToSort.length; j++) {
            // Handler for when the table headers are clicked, triggering the table to sort.
            this._columnsToSort[j].addEventListener("click", function(event) {
                event.stopImmediatePropagation();
                let element:HTMLElement=event.target as any;
                self.Sort(element.innerText);
            }, false);
        }
	}
}

Sort(columnText: string){
	columnText.replace(/\s+/g, '');
	if(this._sortedOn==columnText)
		this._asc=!this._asc;
	let sorted=this._list.sort(this._list.getList(),[columnText],this._asc)
	this._domManipulator.buildTable(sorted,this._tableElement);
	

}

}