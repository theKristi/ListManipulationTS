"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableParserAsync_1 = require("./TableParserAsync");
var TableView_1 = require("./TableView");
document.addEventListener("DOMContentLoaded", function (event) {
    //var myList=new List([]);
    var parser = new TableParserAsync_1.TableParser();
    var tables = document.querySelectorAll("[data-list-manipulate]");
    var _loop_1 = function () {
        var table = tables[i];
        var tableView = new TableView_1.TableView(table);
        parser.parseFromHtml(table, 10000, function (data) {
            tableView.addToList(data);
            table.classList.remove('hidden');
        });
    };
    for (var i = 0; i < tables.length; i++) {
        _loop_1();
    }
});
