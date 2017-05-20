
export class TableParser {
   async parseFromHtml(tableHtml:HTMLTableElement, threshold:number, callback:Function) {
        let tbody:HTMLTableSectionElement = tableHtml.tBodies[0] as any;
        let attributes = this.getAttributesFromHtml((tableHtml.tHead.children[0]) as any);
        //create Promises based on threshold  
        let numberOfPromises: number = Math.floor(tbody.rows.length / threshold);
        if(tbody.rows.length % threshold>0)
             numberOfPromises++; 
        for (let i = 0; i < numberOfPromises; i++) {
            let startingIndex: number = i * threshold;
            let endingIndex: number = startingIndex + threshold;
            if (endingIndex > tbody.rows.length)
                endingIndex = tableHtml.rows.length;
            let dataChunk = [];
            //walk up 
            while (startingIndex <= endingIndex) {
                dataChunk.push(tbody.rows[startingIndex]);
                startingIndex++;
            }
           let result:ITableRow[] = await this.createPromise((dataChunk) as any, attributes);
             callback(result);
        }


    }
    getAttributesFromHtml(headerRow:HTMLTableRowElement) {

        let cellsArray:HTMLCollectionOf<HTMLTableDataCellElement> = headerRow.cells;


        var attributes = [];
        for (var entry in cellsArray) {

            if (cellsArray[entry].textContent!== undefined) {
                var string = cellsArray[entry].textContent.trim();
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
    parseDataChunk(dataChunk: HTMLCollectionOf<HTMLTableRowElement>, attributes: string[]):ITableRow[] {
        let list: ITableRow[]=[];
        for (var i = 0; i < dataChunk.length; i++) {
            let newObject = this.createObjectFromRow(dataChunk[i] as any ,attributes);
            list.push(newObject);

        }
        return list;
    }
    createPromise(dataChunk: HTMLCollectionOf<HTMLTableRowElement>, attributes: string[]):Promise<ITableRow[]> {
        return new Promise((resolve, reject) => {
            let list = this.parseDataChunk(dataChunk, attributes);
            resolve(list);
        });
    }
}

export interface ITableRow {
    html:HTMLTableRowElement
}
