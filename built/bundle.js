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
            if (cellsArray[entry].textContent !== undefined) {
                var string = cellsArray[entry].textContent.trim();
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
            console.log(data);
        });
    }
});
},{"./TableParserAsync":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVGFibGVQYXJzZXJBc3luYy50cyIsInNyYy9zZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDQTtJQUFBO0lBeUdBLENBQUM7SUF4R1EsbUNBQWEsR0FBbkIsVUFBb0IsU0FBMEIsRUFBRSxTQUFnQixFQUFFLFFBQWlCOztnQkFDMUUsS0FBSyxFQUNMLFVBQVUsRUFFVixnQkFBZ0IsS0FJWixhQUFhLEVBQ2IsV0FBVyxFQUdYLFNBQVM7Ozs7Z0NBWG1CLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFRO3FDQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBUSxDQUFDOzJDQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQzt3QkFDeEUsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxHQUFDLENBQUMsQ0FBQzs0QkFDOUIsZ0JBQWdCLEVBQUUsQ0FBQzs0QkFDWCxDQUFDOzs7NkJBQUUsQ0FBQSxDQUFDLEdBQUcsZ0JBQWdCLENBQUE7d0NBQ0osQ0FBQyxHQUFHLFNBQVM7c0NBQ2YsYUFBYSxHQUFHLFNBQVM7d0JBQ25ELEVBQUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs0QkFDaEMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29DQUN4QixFQUFFO3dCQUNsQixVQUFVO3dCQUNWLE9BQU8sYUFBYSxJQUFJLFdBQVcsRUFBRSxDQUFDOzRCQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMs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aWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwi77u/XHJcbmV4cG9ydCBjbGFzcyBUYWJsZVBhcnNlciB7XHJcbiAgIGFzeW5jIHBhcnNlRnJvbUh0bWwodGFibGVIdG1sOkhUTUxUYWJsZUVsZW1lbnQsIHRocmVzaG9sZDpudW1iZXIsIGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHRib2R5OkhUTUxUYWJsZVNlY3Rpb25FbGVtZW50ID0gdGFibGVIdG1sLnRCb2RpZXNbMF0gYXMgYW55O1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gdGhpcy5nZXRBdHRyaWJ1dGVzRnJvbUh0bWwoKHRhYmxlSHRtbC50SGVhZC5jaGlsZHJlblswXSkgYXMgYW55KTtcclxuICAgICAgICAvL2NyZWF0ZSBQcm9taXNlcyBiYXNlZCBvbiB0aHJlc2hvbGQgIFxyXG4gICAgICAgIGxldCBudW1iZXJPZlByb21pc2VzOiBudW1iZXIgPSBNYXRoLmZsb29yKHRib2R5LnJvd3MubGVuZ3RoIC8gdGhyZXNob2xkKTtcclxuICAgICAgICBpZih0Ym9keS5yb3dzLmxlbmd0aCAlIHRocmVzaG9sZD4wKVxyXG4gICAgICAgICAgICAgbnVtYmVyT2ZQcm9taXNlcysrOyBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUHJvbWlzZXM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRpbmdJbmRleDogbnVtYmVyID0gaSAqIHRocmVzaG9sZDtcclxuICAgICAgICAgICAgbGV0IGVuZGluZ0luZGV4OiBudW1iZXIgPSBzdGFydGluZ0luZGV4ICsgdGhyZXNob2xkO1xyXG4gICAgICAgICAgICBpZiAoZW5kaW5nSW5kZXggPiB0Ym9keS5yb3dzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGVuZGluZ0luZGV4ID0gdGFibGVIdG1sLnJvd3MubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUNodW5rID0gW107XHJcbiAgICAgICAgICAgIC8vd2FsayB1cCBcclxuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0aW5nSW5kZXggPD0gZW5kaW5nSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFDaHVuay5wdXNoKHRib2R5LnJvd3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRpbmdJbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgbGV0IHJlc3VsdDpJVGFibGVSb3dbXSA9IGF3YWl0IHRoaXMuY3JlYXRlUHJvbWlzZSgoZGF0YUNodW5rKSBhcyBhbnksIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIGdldEF0dHJpYnV0ZXNGcm9tSHRtbChoZWFkZXJSb3c6SFRNTFRhYmxlUm93RWxlbWVudCkge1xyXG5cclxuICAgICAgICBsZXQgY2VsbHNBcnJheTpIVE1MQ29sbGVjdGlvbk9mPEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudD4gPSBoZWFkZXJSb3cuY2VsbHM7XHJcblxyXG5cclxuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGVudHJ5IGluIGNlbGxzQXJyYXkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsc0FycmF5W2VudHJ5XS50ZXh0Q29udGVudCE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcgPSBjZWxsc0FycmF5W2VudHJ5XS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxzKy9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2goc3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XHJcbiAgICB9XHJcbiAgICBlbXB0eU9iamVjdChhdHRyaWJ1dGVzOnN0cmluZ1tdLCBodG1sRWxlbWVudDpIVE1MVGFibGVSb3dFbGVtZW50KTpJVGFibGVSb3cge1xyXG4gICAgbGV0IG9iamVjdCA9IHtodG1sOmh0bWxFbGVtZW50fTtcclxuICAgIGZvciAobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgb2JqZWN0W2F0dHJpYnV0ZXNbYXR0cmlidXRlXV0gPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgICAgXHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlT2JqZWN0RnJvbVJvdyh0YWJsZVJvdzpIVE1MVGFibGVSb3dFbGVtZW50LGF0dHJpYnV0ZXM6c3RyaW5nW10pOklUYWJsZVJvdyB7XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgbmV3T2JqZWN0ID0gdGhpcy5lbXB0eU9iamVjdChhdHRyaWJ1dGVzLCB0YWJsZVJvdyk7XHJcbiAgICBcclxuICAgICAgICB2YXIgcm93ID0gdGFibGVSb3cuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yICh2YXIgY2VsbCA9IDA7IGNlbGwgPCByb3cubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlc1tjZWxsXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHJvd1tjZWxsXS5jaGlsZHJlblswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2dldCBjaGlsZCBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdmFyIGNobGlkTm9kZU5hbWUgPSByb3dbY2VsbF0uY2hpbGRyZW5bMF0ubm9kZU5hbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRDbGFzc05hbWUgPSByb3dbY2VsbF0uY2hpbGRyZW5bMF0uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd09iamVjdDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hsaWROb2RlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTRUxFQ1RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93T2JqZWN0PSByb3dbY2VsbF0uY2hpbGRyZW5bMF0gYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd09iamVjdC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJJTlBVVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRDbGFzc05hbWUgPT09IFwiY2hlY2stYm94XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dPYmplY3QgPSByb3dbY2VsbF0uY2hpbGRyZW5bMF0gYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd09iamVjdD8gcm93T2JqZWN0LmNoZWNrZWQ6ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTUEFOXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd1tjZWxsXS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHJvd1tjZWxsXS5jaGlsZHJlblswXS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZyA9IHJvd1tjZWxsXS50ZXh0Q29udGVudC5yZXBsYWNlKFwiXFxcXG5cIiwgXCJcIikudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5ld09iamVjdFthdHRyaWJ1dGVzW2NlbGxdXSA9IHN0cmluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgIH1cclxuICAgIHBhcnNlRGF0YUNodW5rKGRhdGFDaHVuazogSFRNTENvbGxlY3Rpb25PZjxIVE1MVGFibGVSb3dFbGVtZW50PiwgYXR0cmlidXRlczogc3RyaW5nW10pOklUYWJsZVJvd1tdIHtcclxuICAgICAgICBsZXQgbGlzdDogSVRhYmxlUm93W109W107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQ2h1bmsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5ld09iamVjdCA9IHRoaXMuY3JlYXRlT2JqZWN0RnJvbVJvdyhkYXRhQ2h1bmtbaV0gYXMgYW55ICxhdHRyaWJ1dGVzKTtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKG5ld09iamVjdCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIGNyZWF0ZVByb21pc2UoZGF0YUNodW5rOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxUYWJsZVJvd0VsZW1lbnQ+LCBhdHRyaWJ1dGVzOiBzdHJpbmdbXSk6UHJvbWlzZTxJVGFibGVSb3dbXT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gdGhpcy5wYXJzZURhdGFDaHVuayhkYXRhQ2h1bmssIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGxpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVRhYmxlUm93IHtcclxuICAgIGh0bWw6SFRNTFRhYmxlUm93RWxlbWVudFxyXG59XHJcbiIsIu+7v2ltcG9ydCB7IFRhYmxlUGFyc2VyIH0gZnJvbSBcIi4vVGFibGVQYXJzZXJBc3luY1wiO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIC8vZG8gd29ya1xyXG4gICAgLy90YWJsZVZpZXdzID0gW107XHJcbiAgICB2YXIgcGFyc2VyPSBuZXcgVGFibGVQYXJzZXIoKTtcclxuICAgIGxldCB0YWJsZXM6SFRNTENvbGxlY3Rpb25PZjxIVE1MVGFibGVFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1saXN0LW1hbmlwdWxhdGVdXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTFRhYmxlRWxlbWVudD47XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHBhcnNlci5wYXJzZUZyb21IdG1sKHRhYmxlc1tpXSBhcyBhbnksIDEwMDAwLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbn0pOyJdfQ==
