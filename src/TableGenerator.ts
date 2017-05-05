//import * as $ from "jquery"
export function tableGenerator(numColumns, numRows, styleClasses, container) {
    console.log('Building table');
    //build table with style classes
    var table = "<table id='tester' class='" + styleClasses + "'>";
    //build thead
    var thead = '<thead><tr>';
    for (var thindex = 0; thindex < numColumns; thindex++) {
        var colHeader = "<th >" + "Column" + thindex + "</th>";
        thead += colHeader;
    }
    thead += "</tr></thead>";
    table += thead;

    //build rows
    for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
        var row = "<tr>";
        for (var colIndex = 0; colIndex < numColumns; colIndex++) {
            row += "<td>" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + "</td>";
        }
        row += "</tr>";
        table += row;
    }
    table += "</table>";
    var ele =
        document.createElement(table);
    document.getSelection(container);

}