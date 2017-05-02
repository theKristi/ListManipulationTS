$(document).ready(function(){

	TableBuilder(5, 100000, "table table-bordered","#tableWrapper");
	var tableParser=new TableParser();
    var table = $("#tester")[0];

	tableParser.parseFromHtml(table, 1000, function(data) {
	    console.log("processed data chunk");
	});
})