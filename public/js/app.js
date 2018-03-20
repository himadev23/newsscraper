alert('hello app.js added')
$(document).ready(function(){
$('#saveNote').on('click',function(){
	event.preventDefault();
	var noteValue = $('#note').val();
	console.log(noteValue);
	
});
var data ;

$('#scrape-articles').on('click',function(){
	$.ajax("/allArticles", {
      method: "GET",
      
    }).then(
      function(result) {
      		data=result;

        //console.log("changed sleep to", result[0].articleName);
        for(var i=0;i<result.length;i++){
        	//var myHtml='<div class="panel panel-default"><div class="panel-heading">'+result[i].articleName +'<button class="save-button">save</button></div><div class="panel-body">'+result[i].articleSumm+'</div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Panel title</h3></div><div class="panel-body">Panel content</div></div>'
        	var article=$('#articles').html('<div class="panel panel-default"><div class="panel-heading">'+result[i].articleName +'<button class="save-button">save</button></div><div class="panel-body">'+result[i].articleSumm+'</div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Panel title</h3></div><div class="panel-body">Panel content</div></div>');
        	$('.save-button').attr( 'id','btn'+i);
        	$('#articles').append(article);
        }
      }
    );


    
});
$('.save-button').on('click',function(){
	console.log(data);
	var saveValue={
		save:true
	}
	console.log('hellooo');
	$.ajax('/save',{
		method:PUT,
		data:saveValue

	}).then(function(){
		console.log('data sent');
	})


})


})