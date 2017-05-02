var TableParser = (function () {
    function TableParser() {
    }
    TableParser.prototype.parseFromHtml = function (tableHtml, threshold) {
        var tbody = tableHtml.tBodies[0];
        var attributes = this.getAttributesFromHtml(tableHtml.tHead);
        var list = [];
        //create Promises based on threshold  
        var numberOfPromises = tbody.rows.length / threshold + 1;
        for (var i = 0; i < numberOfPromises; i++) {
            var startingIndex = i * threshold;
            var endingIndex = startingIndex + threshold;
            if (endingIndex > tbody.rows.length)
                endingIndex = tableHtml.rows.length;
            var dataChunk = [];
            //walk up 
            while (startingIndex <= endingIndex) {
                dataChunk.push(tbody.rows[i]);
                startingIndex++;
            }
            this.createPromise((dataChunk), attributes);
        }
        return list;
    };
    TableParser.prototype.getAttributesFromHtml = function (headerRow) {
        var cellsArray = headerRow.children[0];
        var attributes = [];
        for (var entry in cellsArray) {
            if (cellsArray[entry].outerText !== undefined) {
                var string = cellsArray[entry].outerText.trim();
                string = string.replace(/\s+/g, '');
                attributes.push(string);
            }
        }
        return attributes;
    };
    TableParser.prototype.emptyObject = function (attributes, htmlElement) {
        var object = { html: htmlElement };
        for (var attribute in attributes) {
            object[attributes[attribute]] = "";
        }
        return object;
    };
    TableParser.prototype.createObjectFromRow = function (tableRow, attributes) {
        // let rowparent = tableRow;
        var newObject = this.emptyObject(attributes, tableRow);
        var row = tableRow.children;
        for (var cell = 0; cell < row.length; cell++) {
            if (attributes[cell] != undefined) {
                if (row[cell].children[0] !== undefined) {
                    //get child property value
                    var chlidNodeName = row[cell].children[0].nodeName;
                    var childClassName = row[cell].children[0].className;
                    var rowObject = void 0;
                    switch (chlidNodeName) {
                        case "SELECT":
                            rowObject = row[cell].children[0];
                            newObject[attributes[cell]] = rowObject.selectedOptions[0].value;
                            break;
                        case "INPUT":
                            if (childClassName === "check-box")
                                rowObject = row[cell].children[0];
                            newObject[attributes[cell]] = rowObject ? rowObject.checked : false;
                            break;
                        case "SPAN":
                            newObject[attributes[cell]] = row[cell].textContent.trim();
                            break;
                        default:
                            newObject[attributes[cell]] = row[cell].children[0].textContent.trim();
                            break;
                    }
                }
                else {
                    var string = row[cell].textContent.replace("\\n", "").trim();
                    newObject[attributes[cell]] = string;
                }
            }
        }
        return newObject;
    };
    TableParser.prototype.parseDataChunk = function (dataChunk, attributes) {
        var list = [];
        for (var i = 0; i < dataChunk.length; i++) {
            var newObject = this.createObjectFromRow(dataChunk.item(i), attributes);
            list.push(newObject);
        }
    };
    TableParser.prototype.createPromise = function (dataChunk, attributes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.parseDataChunk(dataChunk, attributes);
        });
    };
    return TableParser;
}());
