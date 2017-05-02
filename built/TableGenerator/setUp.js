$(document).ready(function(){

	TableBuilder=new TableBuilder(5, 100000, "table table-bordered","#tableWrapper");
	var tableParser=new TableParser();
	var table=$("#tester")[0];
	var list=tableParser.parseFromHtml(table, 1000, function(i){
		console.log("Parsed promise "+i)
	});
	//console.log(list);
})