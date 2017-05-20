export class DomManipulator{
	static removeChildren(element:Element){
		if(element){
			while(element.lastChild){
				element.removeChild(element.lastChild)
			}
		}
	}
	removeClassesFromAttribute(elementWithAttribute:HTMLElement,elementToRemoveClassesFrom:HTMLElement, attributeWithClasses:string){
		if (elementWithAttribute && elementToRemoveClassesFrom && attributeWithClasses) {
        	if (elementWithAttribute.hasAttribute(attributeWithClasses)) {
            	var classes = elementWithAttribute.getAttribute(attributeWithClasses).split(" ");
            	for (var i = 0; i < classes.length; i++) {
               	 	elementToRemoveClassesFrom.classList.remove(classes[i]);
            	}
        	}
		}
	}
	addClassesFromAttribute(elementWithAttribute:HTMLElement,elementToAddClassesTo:HTMLElement, attributeWithClasses:string){
		if (elementWithAttribute && elementToAddClassesTo && attributeWithClasses) {
    		if (elementWithAttribute.hasAttribute(attributeWithClasses)) {
        		var classes = elementWithAttribute.getAttribute(attributeWithClasses).split(" ");
        		for (var i = 0; i < classes.length; i++) {
            		elementToAddClassesTo.classList.add(classes[i]);
        		}
    		}		
    	}
	}
	
		
}