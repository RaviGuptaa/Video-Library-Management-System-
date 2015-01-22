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
            url : '/AdminDeleteMovie',
            data : "RemoveId=" + a,
            dataType : 'json',
            async:false,
            success : function(data) {
            	var obj = JSON.parse(data);
            	console.log("The success"+obj);
            	console.log("Successfully deleted the movie 1 !!");
            	alert("Successfully deleted the movie !!");
            },
            error : function(data) {
            	console.log("The fail"+data);
                alert('The call to delete has failed');
            }
        });
        return false;
    });
	

});