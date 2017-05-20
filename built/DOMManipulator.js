"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DomManipulator = (function () {
    function DomManipulator() {
    }
    DomManipulator.prototype.removeChildren = function (element) {
        if (element) {
            while (element.lastChild) {
                element.removeChild(element.lastChild);
            }
        }
    };
    DomManipulator.prototype.removeClassesFromAttribute = function (elementWithAttribute, elementToRemoveClassesFrom, attributeWithClasses) {
        if (elementWithAttribute && elementToRemoveClassesFrom && attributeWithClasses) {
            if (elementWithAttribute.hasAttribute(attributeWithClasses)) {
                var classes = elementWithAttribute.getAttribute(attributeWithClasses).split(" ");
                for (var i = 0; i < classes.length; i++) {
                    elementToRemoveClassesFrom.classList.remove(classes[i]);
                }
            }
        }
    };
    DomManipulator.prototype.addClassesFromAttribute = function (elementWithAttribute, elementToAddClassesTo, attributeWithClasses) {
        if (elementWithAttribute && elementToAddClassesTo && attributeWithClasses) {
            if (elementWithAttribute.hasAttribute(attributeWithClasses)) {
                var classes = elementWithAttribute.getAttribute(attributeWithClasses).split(" ");
                for (var i = 0; i < classes.length; i++) {
                    elementToAddClassesTo.classList.add(classes[i]);
                }
            }
        }
    };
    DomManipulator.prototype.buildTable = function (list, tableElement) {
        var tbody = tableElement.tBodies[0];
        if (tbody)
            this.removeChildren(tbody);
        for (var i = 0; i < list.length; i++) {
            tbody.appendChild(list[i].html);
        }
    };
    return DomManipulator;
}());
exports.DomManipulator = DomManipulator;
