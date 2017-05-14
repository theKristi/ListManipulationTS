"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableParserAsync_1 = require("./TableParserAsync");
var List_1 = require("./List");
document.addEventListener("DOMContentLoaded", function (event) {
    //do work
    //tableViews = [];
    //console.log("List prop:"+Object.getOwnPropertyNames(List));
    var myList = new List_1.List([]);
    var parser = new TableParserAsync_1.TableParser();
    var tables = document.querySelectorAll("[data-list-manipulate]");
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        parser.parseFromHtml(table, 10000, function (data) {
            var res = myList.addRange(data);
            console.log("data added: " + res);
            table.classList.remove("hidden");
        });
    }
});
