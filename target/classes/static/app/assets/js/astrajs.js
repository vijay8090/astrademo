$( document ).ready(function() {
		
	setupMenuHover();
	
	$('#globalMsgClose').on('click',function() {			        
        $('#global_error').fadeOut('slide',function(){
        	//$('.mini-submenu').fadeIn();	
        });
        
      });
	
});

function setupMenuHover(){
	
	$('ul.nav li.dropdown').hover(function() {
		  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
		}, function() {
		  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
		});
	
}


function hasWhiteSpace(s) {

    var reWhiteSpace = new RegExp("/^\s+$/");

    // Check for white space
    if (reWhiteSpace.test(s)) {
        //alert("Please Check Your Fields For Spaces");
        return false;
    }

    return true;
}

function removeGlobalMsg(){		
	$("#msg-content").text("");
	$('#global_error').slideUp(1000);
}

function setGlobalMsg(msg,type){
	
	$("#global_error").removeClass();
	$("#global_error").addClass(type);
	$("#msg-content").text(msg);
	$('#global_error').slideDown(1000);
}