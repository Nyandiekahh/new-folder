var isJqgrid=false;  // pass jqgrid enter key event
document.oncontextmenu = function() {
	window.status = "Right-click is disabled";
	alert("Right-click is disabled");
	return false
};
if(document.addEventListener){ //code for Moz
	document.addEventListener("keydown",my_onkeydown_handler,true);
}
else if (document.attachEvent)	{
	document.attachEvent("onkeydown", my_onkeydown_handler);
}
else document.onkeydown = my_onkeydown_handler;
function my_onkeydown_handler() {
	var bool = true;
	var theEvent=window.event/*this is for IE*/ || arguments[0]/* this is for Netscape and firefox*/;
	switch (theEvent.keyCode || theEvent.which) {
	/*case 116:
		window.status = "F5 is disabled.";
		window.setTimeout("window.status='';", 2000);
		alert("F5 is disabled.");
		bool = false;
		if (theEvent.preventDefault)
		{
			theEvent.preventDefault();
		}
		if(document.all && window.event && !theEvent.preventDefault)
		{
			event.cancelBubble = true;
			theEvent.returnValue = false;
			theEvent.keyCode = 0;
		}		
		break;*/
	case 27:
		window.status = "Escape key is disabled for security reasons!";
		window.setTimeout("window.status='';", 2000);
		alert("Escape key is disabled for security reasons!");
		bool = false;
		if (theEvent.preventDefault)
		{
			theEvent.preventDefault();
		}
		if(document.all && window.event && !theEvent.preventDefault)
		{
			event.cancelBubble = true;
			theEvent.returnValue = false;
			theEvent.keyCode = 0;
		}		
		break;
	}
	
	
	 var keycode = theEvent.keyCode || theEvent.which;
	 
	 if ( (keycode == 93) ||                                        //its for select key, alternate of right click
		        (keycode == 39 && theEvent.altKey)||                    // its for alter + -> (right arrow key)
		        (keycode == 37 && theEvent.altKey) ||                   // its for alter + <- (left arrow key)
		        (keycode == 121 && theEvent.shiftKey ) ||             // its for  shift + f10
		        (keycode == 116 && theEvent.ctrlKey)||                 // its for cntrl + f5
			(keycode == 116 && theEvent.altKey)||                 // its for alter + f5
		        (keycode == 114)||                 // its for f3 + f5
		        (keycode == 115)||                 // its for f4 + f5
		        (keycode == 117)||                 								// its for f6
		        (keycode == 122 )||                                            // its for F11
		        (keycode == 78 && theEvent.ctrlKey)||                   // its for cntrl + n
		        (keycode == 82 && theEvent.ctrlKey)||                   // its for cntrl + r
		        (keycode == 13 && theEvent.altKey)||                   // its for cntrl + r
//		        (keycode == 115 && theEvent.altKey)||               // its for alter + f4 key
//		        (keycode == 115 && theEvent.ctrlKey))                // its for cntrl + f4
		        (keycode == 116))                                               // its for f5
		        {
		         
		         window.status = "Due to security reason, This event is disabled.";
		 		window.setTimeout("window.status='';", 2000);
		 		alert("Due to security reason, This event is disabled.");
		 		bool = false;
		 		if (theEvent.preventDefault)
		 		{
		 			theEvent.preventDefault();
		 		}
		 		if(document.all && window.event && !theEvent.preventDefault)
		 		{
		 			event.cancelBubble = true;
		 			theEvent.returnValue = false;
		 			theEvent.keyCode = 0;
		 		}		
		        }
	
//   this code is to block backspace event when input or textarea is not in focus.
	 var e=null;
	 var eObj=null;
	 if(theEvent.srcElement){
		 e = theEvent.srcElement.tagName.toUpperCase() ;
		 eObj = theEvent.srcElement;
	 }else{
		 e = theEvent.target.nodeName.toUpperCase();
		 eObj = theEvent.target;
	 }
	 //alert(eObj);
	 //alert(eObj.readOnly);
	 //alert(eObj.disabled);
     if (keycode == 8 && ((e != "INPUT" && e != "TEXTAREA") || (eObj != null && (eObj.readOnly == true || eObj.disabled == true)))) {
    	bool = false;
 		if (theEvent.preventDefault)
 		{
 			theEvent.preventDefault();
 		}
 		if(document.all && window.event && !theEvent.preventDefault)
 		{
 			event.cancelBubble = true;
 			theEvent.returnValue = false;
 			theEvent.keyCode = 0;
 		}		
     }  
	if(!bool){
		return false;
	}
}
function supressEnterKeySubmit() {
	var d = document.getElementsByTagName("INPUT");
	if (d != null) {
		for ( var f = 0; f < d.length; f++) {
			var e = d[f];
			if (e.type == "text" || e.type == "textarea") {
				if (window.attachEvent) {
					e.onkeydown = function(a) {
						var b;
						if (a && a.which) {
							a = a;
							b = a.which
						} else {
							a = event;
							b = a.keyCode
						}
						if (b == 13) {
							if(!isJqgrid)
							{
								return false;
							}
							else{
								return true;
							}
						}
					}
				} else {
					if (window.addEventListener) {
						e.onkeydown = function(a) {
							var b;
							if (a && a.which) {
								a = a;
								b = a.which
							} else {
								a = event;
								b = a.keyCode
							}
							if (b == 13) {
								if(!isJqgrid)
								{
									return false;
								}
								else{
									return true;
								}
							}
						}
					}
				}
			}
		}
	}
};