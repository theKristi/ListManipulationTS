"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var DOMManipulator_1 = require("./DOMManipulator");
var TableView = (function () {
    function TableView(table) {
        this._tableElement = table;
        this._list = new List_1.List([]);
        this._columnsToSort = this._tableElement.querySelectorAll("[data-sort]");
        this._domManipulator = new DOMManipulator_1.DomManipulator();
        this.setUpSortEventListeners();
    }
    //properties 
    //searchInputs
    //search submitters
    //search filters
    //functions
    TableView.prototype.addToList = function (data) {
        this._list.addRange(data);
    };
    TableView.prototype.setUpSortEventListeners = function () {
        var self = this;
        if (this._columnsToSort) {
            for (var j = 0; j < this._columnsToSort.length; j++) {
                // Handler for when the table headers are clicked, triggering the table to sort.
                this._columnsToSort[j].addEventListener("click", function (event) {
                    event.stopImmediatePropagation();
                    var element = event.target;
                    self.Sort(element.innerText);
                }, false);
            }
        }
    };
    TableView.prototype.Sort = function (columnText) {
        columnText.replace(/\s+/g, '');
        if (this._sortedOn == columnText)
            this._asc = !this._asc;
        var sorted = this._list.sort(this._list.getList(), [columnText], this._asc);
        this._domManipulator.buildTable(sorted, this._tableElement);
    };
    return TableView;
}());
exports.TableView = TableView;
