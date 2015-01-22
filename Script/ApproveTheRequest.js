/**
 * New node file
 */
$(document).ready(function () {
	
	$('.button').click(function(){
		console.log("I am going to hit the AJAX for approving the request!!");
		 var a= $(this).attr('id');
		 var member=$(this).closest('tr').attr('id');
		 console.log("the id is :"+member);
		 console.log("the member id is=" +a);
		 $('#'+member).remove();
        $.ajax({
            type : 'POST',
            url : '/ApproveTheRequest',
            data : "MovieId=" + a+"&memberId="+member,
            dataType : 'json',
            success : function(data) {
            	
            	alert('The movie has been approved & issued !!');
            },
            error : function(data) {
            	 alert('The movie has been approved & issued !!');
                //setError('Make call failed');
            }
        });
        return false;
    });
	

});