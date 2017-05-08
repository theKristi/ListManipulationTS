(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TableParser = (function () {
    function TableParser() {
    }
    TableParser.prototype.parseFromHtml = function (tableHtml, threshold, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var tbody, attributes, numberOfPromises, i, startingIndex, endingIndex, dataChunk, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tbody = tableHtml.tBodies[0];
                        attributes = this.getAttributesFromHtml((tableHtml.tHead.children[0]));
                        numberOfPromises = Math.floor(tbody.rows.length / threshold);
                        if (tbody.rows.length % threshold > 0)
                            numberOfPromises++;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < numberOfPromises)) return [3 /*break*/, 4];
                        startingIndex = i * threshold;
                        endingIndex = startingIndex + threshold;
                        if (endingIndex > tbody.rows.length)
                            endingIndex = tableHtml.rows.length;
                        dataChunk = [];
                        //walk up 
                        while (startingIndex <= endingIndex) {
                            dataChunk.push(tbody.rows[i]);
                            startingIndex++;
                        }
                        return [4 /*yield*/, this.createPromise((dataChunk), attributes)];
                    case 2:
                        result = _a.sent();
                        callback(result);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TableParser.prototype.getAttributesFromHtml = function (headerRow) {
        var cellsArray = headerRow.cells;
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
            var newObject = this.createObjectFromRow(dataChunk[i], attributes);
            list.push(newObject);
        }
        return list;
    };
    TableParser.prototype.createPromise = function (dataChunk, attributes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var list = _this.parseDataChunk(dataChunk, attributes);
            resolve(list);
        });
    };
    return TableParser;
}());
exports.TableParser = TableParser;
},{}],2:[function(require,module,exports){
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
            console.log("parsed data");
        });
    }
});
},{"./TableParserAsync":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVGFibGVQYXJzZXJBc3luYy50cyIsInNyYy9zZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDQTtJQUFBO0lBeUdBLENBQUM7SUF4R1EsbUNBQWEsR0FBbkIsVUFBb0IsU0FBMEIsRUFBRSxTQUFnQixFQUFFLFFBQWlCOztnQkFDMUUsS0FBSyxFQUNMLFVBQVUsRUFFVixnQkFBZ0IsS0FJWixhQUFhLEVBQ2IsV0FBVyxFQUdYLFNBQVM7Ozs7Z0NBWEwsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7cUNBQ2YsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQVEsQ0FBQzsyQ0FFbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7d0JBQ3hFLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBQyxDQUFDLENBQUM7NEJBQzlCLGdCQUFnQixFQUFFLENBQUM7NEJBQ1gsQ0FBQzs7OzZCQUFFLENBQUEsQ0FBQyxHQUFHLGdCQUFnQixDQUFBO3dDQUNKLENBQUMsR0FBRyxTQUFTO3NDQUNmLGFBQWEsR0FBRyxTQUFTO3dCQUNuRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7NEJBQ2hDLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQ0FDeEIsRUFBRTt3QkFDbEIsVUFBVTt3QkFDVixPQUFPLGFBQWEsSUFBSSxXQUFXLEVBQUUsQ0FBQzs0QkFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENB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QyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIu+7v1xyXG5leHBvcnQgY2xhc3MgVGFibGVQYXJzZXIge1xyXG4gICBhc3luYyBwYXJzZUZyb21IdG1sKHRhYmxlSHRtbDpIVE1MVGFibGVFbGVtZW50LCB0aHJlc2hvbGQ6bnVtYmVyLCBjYWxsYmFjazpGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCB0Ym9keSA9IHRhYmxlSHRtbC50Qm9kaWVzWzBdO1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gdGhpcy5nZXRBdHRyaWJ1dGVzRnJvbUh0bWwoKHRhYmxlSHRtbC50SGVhZC5jaGlsZHJlblswXSkgYXMgYW55KTtcclxuICAgICAgICAvL2NyZWF0ZSBQcm9taXNlcyBiYXNlZCBvbiB0aHJlc2hvbGQgIFxyXG4gICAgICAgIGxldCBudW1iZXJPZlByb21pc2VzOiBudW1iZXIgPSBNYXRoLmZsb29yKHRib2R5LnJvd3MubGVuZ3RoIC8gdGhyZXNob2xkKTtcclxuICAgICAgICBpZih0Ym9keS5yb3dzLmxlbmd0aCAlIHRocmVzaG9sZD4wKVxyXG4gICAgICAgICAgICAgbnVtYmVyT2ZQcm9taXNlcysrOyBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUHJvbWlzZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRpbmdJbmRleDogbnVtYmVyID0gaSAqIHRocmVzaG9sZDtcclxuICAgICAgICAgICAgbGV0IGVuZGluZ0luZGV4OiBudW1iZXIgPSBzdGFydGluZ0luZGV4ICsgdGhyZXNob2xkO1xyXG4gICAgICAgICAgICBpZiAoZW5kaW5nSW5kZXggPiB0Ym9keS5yb3dzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGVuZGluZ0luZGV4ID0gdGFibGVIdG1sLnJvd3MubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUNodW5rID0gW107XHJcbiAgICAgICAgICAgIC8vd2FsayB1cCBcclxuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0aW5nSW5kZXggPD0gZW5kaW5nSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFDaHVuay5wdXNoKHRib2R5LnJvd3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdJbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgbGV0IHJlc3VsdDpJVGFibGVSb3dbXSA9IGF3YWl0IHRoaXMuY3JlYXRlUHJvbWlzZSgoZGF0YUNodW5rKSBhcyBhbnksIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIGdldEF0dHJpYnV0ZXNGcm9tSHRtbChoZWFkZXJSb3c6SFRNTFRhYmxlUm93RWxlbWVudCkge1xyXG5cclxuICAgICAgICBsZXQgY2VsbHNBcnJheSA9IGhlYWRlclJvdy5jZWxscztcclxuXHJcblxyXG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgZW50cnkgaW4gY2VsbHNBcnJheSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGxzQXJyYXlbZW50cnldLm91dGVyVGV4dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nID0gY2VsbHNBcnJheVtlbnRyeV0ub3V0ZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHMrL2csICcnKTtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChzdHJpbmcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcclxuICAgIH1cclxuICAgIGVtcHR5T2JqZWN0KGF0dHJpYnV0ZXM6c3RyaW5nW10sIGh0bWxFbGVtZW50OkhUTUxUYWJsZVJvd0VsZW1lbnQpOklUYWJsZVJvdyB7XHJcbiAgICBsZXQgb2JqZWN0ID0ge2h0bWw6aHRtbEVsZW1lbnR9O1xyXG4gICAgZm9yIChsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBvYmplY3RbYXR0cmlidXRlc1thdHRyaWJ1dGVdXSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVPYmplY3RGcm9tUm93KHRhYmxlUm93OkhUTUxUYWJsZVJvd0VsZW1lbnQsYXR0cmlidXRlczpzdHJpbmdbXSk6SVRhYmxlUm93IHtcclxuICAgICAgIC8vIGxldCByb3dwYXJlbnQgPSB0YWJsZVJvdztcclxuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gdGhpcy5lbXB0eU9iamVjdChhdHRyaWJ1dGVzLCB0YWJsZVJvdyk7XHJcbiAgICBcclxuICAgICAgICB2YXIgcm93ID0gdGFibGVSb3cuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yICh2YXIgY2VsbCA9IDA7IGNlbGwgPCByb3cubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlc1tjZWxsXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHJvd1tjZWxsXS5jaGlsZHJlblswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dldCBjaGlsZCBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdmFyIGNobGlkTm9kZU5hbWUgPSByb3dbY2VsbF0uY2hpbGRyZW5bMF0ubm9kZU5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRDbGFzc05hbWUgPSByb3dbY2VsbF0uY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd09iamVjdDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hsaWROb2RlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTRUxFQ1RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93T2JqZWN0PSByb3dbY2VsbF0uY2hpbGRyZW5bMF0gYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd09iamVjdC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJJTlBVVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRDbGFzc05hbWUgPT09IFwiY2hlY2stYm94XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dPYmplY3QgPSByb3dbY2VsbF0uY2hpbGRyZW5bMF0gYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd09iamVjdD8gcm93T2JqZWN0LmNoZWNrZWQ6ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTUEFOXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd1tjZWxsXS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd1tjZWxsXS5jaGlsZHJlblswXS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IHJvd1tjZWxsXS50ZXh0Q29udGVudC5yZXBsYWNlKFwiXFxcXG5cIiwgXCJcIikudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgIH1cclxuICAgIHBhcnNlRGF0YUNodW5rKGRhdGFDaHVuazogSFRNTENvbGxlY3Rpb25PZjxIVE1MVGFibGVSb3dFbGVtZW50PiwgYXR0cmlidXRlczogc3RyaW5nW10pOklUYWJsZVJvd1tdIHtcclxuICAgICAgICBsZXQgbGlzdDogSVRhYmxlUm93W109W107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQ2h1bmsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5ld09iamVjdCA9IHRoaXMuY3JlYXRlT2JqZWN0RnJvbVJvdyhkYXRhQ2h1bmtbaV0sYXR0cmlidXRlcyk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChuZXdPYmplY3QpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVQcm9taXNlKGRhdGFDaHVuazogSFRNTENvbGxlY3Rpb25PZjxIVE1MVGFibGVSb3dFbGVtZW50PiwgYXR0cmlidXRlczogc3RyaW5nW10pOlByb21pc2U8SVRhYmxlUm93W10+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMucGFyc2VEYXRhQ2h1bmsoZGF0YUNodW5rLCBhdHRyaWJ1dGVzKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShsaXN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElUYWJsZVJvdyB7XHJcbiAgICBodG1sOkhUTUxUYWJsZVJvd0VsZW1lbnRcclxufVxyXG4iLCLvu79pbXBvcnQgeyBUYWJsZVBhcnNlciB9IGZyb20gXCIuL1RhYmxlUGFyc2VyQXN5bmNcIjtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAvL2RvIHdvcmtcclxuICAgIC8vdGFibGVWaWV3cyA9IFtdO1xyXG4gICAgdmFyIHBhcnNlcj0gbmV3IFRhYmxlUGFyc2VyKCk7XHJcbiAgICBsZXQgdGFibGVzOkhUTUxDb2xsZWN0aW9uT2Y8SFRNTFRhYmxlRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbGlzdC1tYW5pcHVsYXRlXVwiKSBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxUYWJsZUVsZW1lbnQ+O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXJzZXIucGFyc2VGcm9tSHRtbCh0YWJsZXNbaV0sIDEwMDAwLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBcdGNvbnNvbGUubG9nKFwicGFyc2VkIGRhdGFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufSk7Il19
