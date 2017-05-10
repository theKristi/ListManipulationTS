document.addEventListener("DOMContentLoaded", function (event) {
    //do work
   
    let rawList=document.getById("stuffToAdd");
    let parsedlist=JSON.parse(rawList.text);
    let List=new List().setList(parsedList);
});