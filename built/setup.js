"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableParserAsync_1 = require("./TableParserAsync");
document.addEventListener("DOMContentLoaded", function (event) {
    //do work
    //tableViews = [];
    var parser = new TableParserAsync_1.TableParser();
    var tables = document.querySelectorAll("[data-list-manipulate]");
    for (var i = 0; i < tables.length; i++) {
        parser.parseFromHtml(tables[i], 10000, function (data) {
            console.log(data);
        });
    }
});
