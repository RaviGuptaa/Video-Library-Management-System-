/**
 * New node file
 */
$(document).ready(function () {
	
	$('.button').click(function(){
		console.log("I am going to hit the AJAX !!");
		 var a= $(this).attr('id');
		 var b = $(this).attr('id1');
		 $('#'+b).remove();
        $.ajax({
            type : 'POST',
            url : '/cartDeleteMovie',
            data : "RemoveId=" + a,
            dataType : 'json',
            success : function(data) {
            	
            	alert("the call happened !!"+data);
            },
            error : function(data) {
                setError('Make call failed');
            }
        });
        return false;
    });
	

});