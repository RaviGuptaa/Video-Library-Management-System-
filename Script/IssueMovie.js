/**
 * New node file
 */
$(document).ready(function () {
	
	$('.button').click(function(){
		console.log("I am going to hit the AJAX !!");
		 var a= $(this).attr('id');
		
        $.ajax({
            type : 'POST',
            url : '/IssueMovie',
            data : "MovieId=" + a,
            dataType : 'json',
            success : function(data) {
            	
            	alert("The movie has been requested to be issued !!");
            },
            error : function(data) {
            	//alert();
               // setError('Make call failed');
            }
        });
        return false;
    });
	

});