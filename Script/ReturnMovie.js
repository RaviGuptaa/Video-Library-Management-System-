/**
 * New node file
 */
$(document).ready(function () {
	
	$('.button').click(function(){
		console.log("I am going to hit the AJAX !!");
		 var a= $(this).attr('id');
		 $('#'+a).remove();
        $.ajax({
            type : 'POST',
            url : '/ReturnMovie',
            data : "MovieId=" + a,
            dataType : 'json',
            success : function(data) {
            	
            	alert("The movie has been returned !!");
            },
            error : function(data) {
            	alert("The movie has been returned !!");
               // setError('Make call failed');
            }
        });
        return false;
    });
	

});