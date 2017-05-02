class TableParser {
    parseFromHtml(tableHtml:HTMLTableElement, threshold:number) {
        let tbody = tableHtml.tBodies[0];
        let attributes = this.getAttributesFromHtml(tableHtml.tHead);
        let list = [];
        //create Promises based on threshold  
        let numberOfPromises: number = tbody.rows.length / threshold+1;
        for (let i = 0; i < numberOfPromises; i++) {
            let startingIndex: number = i * threshold;
            let endingIndex: number = startingIndex + threshold;
            if (endingIndex > tbody.rows.length)
                endingIndex = tableHtml.rows.length;
            let dataChunk =[];
            //walk up 
            while (startingIndex <= endingIndex) {
                dataChunk.push(tbody.rows[i]);
                startingIndex++;
            }
            this.createPromise((dataChunk) as any, attributes);
        }
        return list;
    }
    getAttributesFromHtml(headerRow:HTMLTableSectionElement) {
       
            let cellsArray = headerRow.children[0];


        var attributes = [];
        for (var entry in cellsArray) {

            if (cellsArray[entry].outerText !== undefined) {
                var string = cellsArray[entry].outerText.trim();
                string = string.replace(/\s+/g, '');
                attributes.push(string);

            }
        }
        return attributes;
    }
    emptyObject(attributes:string[], htmlElement:HTMLTableRowElement):ITableRow {
    let object = {html:htmlElement};
    for (let attribute in attributes) {
        object[attributes[attribute]] = "";
    }
       
    return object;
    }
    createObjectFromRow(tableRow:HTMLTableRowElement,attributes:string[]):ITableRow {
       // let rowparent = tableRow;
        let newObject = this.emptyObject(attributes, tableRow);
    
        var row = tableRow.children;

    for (var cell = 0; cell < row.length; cell++) {
        if (attributes[cell] != undefined) {
            if (row[cell].children[0] !== undefined) {
                //get child property value
                var chlidNodeName = row[cell].children[0].nodeName;
                var childClassName = row[cell].children[0].className;
                let rowObject;
                switch (chlidNodeName) {
                    case "SELECT":
                        rowObject= row[cell].children[0] as HTMLSelectElement;
                        newObject[attributes[cell]] = rowObject.selectedOptions[0].value;
                        break;
                    case "INPUT":
                        if (childClassName === "check-box")
                            rowObject = row[cell].children[0] as HTMLInputElement;
                            newObject[attributes[cell]] = rowObject? rowObject.checked:false;
                        break;
                    case "SPAN":
                        newObject[attributes[cell]] = row[cell].textContent.trim();
                        break;
                    default:
                        newObject[attributes[cell]] = row[cell].children[0].textContent.trim();
                        break;
                }
            } else {
                let string = row[cell].textContent.replace("\\n", "").trim();

                newObject[attributes[cell]] = string;
            }
        }
    }
    
    return newObject;
    }
    parseDataChunk(dataChunk: HTMLCollectionOf<HTMLTableRowElement>, attributes: string[]) {
        let list: ITableRow[]=[];
        for (var i = 0; i < dataChunk.length; i++) {
            let newObject = this.createObjectFromRow(dataChunk.item(i),attributes);
            list.push(newObject);

        }
    }
    createPromise(dataChunk: HTMLCollectionOf<HTMLTableRowElement>, attributes: string[]) {
        return new Promise((resolve, reject) => {
            this.parseDataChunk(dataChunk, attributes);
        });
    }
}

interface ITableRow {
    html:HTMLTableRowElement
}
