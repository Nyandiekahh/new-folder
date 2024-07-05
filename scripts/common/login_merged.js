/*CommonValidation.js*/
var errorColor='#E26250';
var defaultColor='';
var errorListResult = new Array(1000);
var incError=0;
var AdFormJson=null;
var commonErrTabIndex = 0;
function generateServerSideError(errorList)
{
	errorListResult=eval("("+errorList+")");
	incError=errorListResult.length;
	var rmvElementLst=new Array(errorListResult.length);
	var r=0;
	for(var tt=0;tt<incError;tt++)
	{
		var id=errorListResult[tt].id;
		if(id.substring(0,3)=='chk')
		{
			rmvElementLst[r++]=errorListResult[tt];
			alert(errorListResult[tt].errMsg);
		}
		else
		{
			setErrorBGColor(id);
			document.getElementById(id).setAttribute('title',errorListResult[tt].errMsg);
		}
	}
	for(var rr=0;rr<r;rr++)
	{
		rmvEleFrmArray(rmvElementLst[rr]);
	}
	refreshErrorList('errorTab');
}
function chkMinVal(id,minVal)
{
	var val=parseInt(document.getElementById(id).value);
	
	if(val>=minVal)
		return true;
	else
		return false;
}

function chkMaxVal(id,maxVal)
{
	var val=parseInt(document.getElementById(id).value);
	
	if(val<=maxVal)
		return true;
	else
		return false;
}
	function setErrorBGColor(id)
	{
		try
		{
			var element = document.getElementById(id);
			if(element.disabled)
			{
				id = id.substring(0,id.length-1);
				for(var x=2;x<5000;x++)
				{
						var temp = id;
						element = document.getElementById(temp+x);
						if(element.disabled)
							continue;
						else
						{
							element.style.backgroundColor=errorColor;
							break;
						}
				}
			}
			else
			{
				element.style.backgroundColor=errorColor;
			}
		}
		catch(e)
		{
			
		}
	}
	
	function setDefaultBGColor(id)
	{
		try
		{
			var element = document.getElementById(id);
			if(element.disabled)
			{
				id = id.substring(0,id.length-1);
				for(var x=2;x<5000;x++)
				{
						var temp = id;
						element = document.getElementById(temp+x);
						if(element.disabled)
							continue;
						else
						{
							element.style.backgroundColor=defaultColor;
							break;
						}
				}
			}
			else
			{
				element.style.backgroundColor=defaultColor;
			}
		}
		catch(e)
		{
			
		}
	}
function setErrorID(id)
	{
		var returnId;
		try
		{
			var element = document.getElementById(id);
			if(element.disabled)
			{
				var xid = id.substring(0,id.length-1);
				for(var x=2;x<5000;x++)
				{
						var temp = xid;
						var rtID = temp+x;
						element = document.getElementById(rtID);
						if(element.disabled)
							continue;
						else
						{
							returnId =  rtID;
							break;
						}
				}
			}
			else
			{
				returnId = id;
			}
		}
		catch(e)
		{
			
		}
		return returnId;
	}
/*commonvalidations.js*/
function checkForCSS(strVal)                                        
{ 

 //CSS - Cross site scripting                                     // Example are below for each regular expression
  var regexpforHTMLTag1=/(<|&#60|u003C)\s*(\S+)\s*[^>]*\s*(>|&#62|u003E)(.*)(<|&#60|U003C)\/\s*\2\s*(>|&#62|u003E)/i; //<script> <//script> <html> </html>
  var regexpforHTMLTag2=/(<|&#60|u003C)\s*(\S+)\s*([^>]*)\s*(>|&#62|u003E)/i;                //<font face="Arial, Serif" size="+2" color="red">
  var regexpforXMLTag=/((<|&#60|u003C).[^(><.)]+(>|&#62|u003E))/i;                           //<servlet-name attr1=value attr2=value />
  var regexpForEqualVal=/(\s*\w+\s*)=.*/i;                                                   //link=1=1

  //alert(strVal);
 if(regexpforHTMLTag2.test(strVal) || regexpforHTMLTag1.test(strVal) || 
	regexpforXMLTag.test(strVal) || regexpForEqualVal.test(strVal) || !sqlInjection(strVal))
 {
   //alert(">> UnSafe Input <<");
   return false;
 }
 else
 {
   // alert("Safe Input");
   return true;
 }
}


//*******************************************************************
//Purpose	        : This function checks the given strVal for SQL Injection.
//Input	            : Input for this funtion is the strVal contain safe input or SQL Injection.
//Output	        : This function will returns true if the field value is sate input or else if CSS returns false
//Limitation        : 
//Developer Name    : Narender E
//Date              : 18/08/2005.
//*******************************************************************
function sqlInjection(strVal)
{
   var regexpforMETACHAR1= /(\%27)|(&#32)|(u0027)|(\')|(\-\-)|(\%23)|(&#35)|(u0023)|(#)/i;  //Regex for detection of SQL meta-characters
   var regexpforMETACHAR2= /((\%3D)|(&#61)|(u003D)|(=))[^\n]*((\%27)|(&#32)|(u0027)|(\')|(\-\-)|(\%3B)|(&#59)|(u003B)|(;))/i;  //Modified regex for detection of SQL meta-characters
   var regexpforORclause= /\w*((\%27)|(&#32)|(u0027)|(\'))(\s*)((\%6F)|(&#111)|(u006F)|o|(\%4F)|(&#79)|(u004F))((\%72)|(&#114)|(u0072)|r|(\%52)|(&#82)|(u0052))/i; //Regex for typical SQL Injection attack using OR
   var regexpforSQLwords= /((\%27)|(&#32)|(u0027)|(\'))(\s*)(union|select|insert|update|delete|drop)/i; //Regex for detecting SQL Injection with the UNION,SELECT,INSERT,UPDATE,DELETE,DROP keyword
   var regexpforMsSQL= /exec(\s|\+)+(s|x)p\w+/i;      //Regex for detecting SQL Injection attacks on a MS SQL Server

	 if( regexpforMETACHAR1.test(strVal) || regexpforMETACHAR2.test(strVal) ||
	     regexpforORclause.test(strVal) || regexpforSQLwords.test(strVal) ||
		 regexpforMsSQL.test(strVal))
	 {
	   return false;
	 }
	 else
	 {
	   return true;
	 }
}
function securityCheck(form1)
{
   var str = form1.value;
  if(checkForCSS(str) && sqlInjection(str))
   { 
   	
     return true;
   }
   else
   {
  
    return false;
   }
}
function validationRequiredArr(arr){

	var i,j=0;
	var msg="";
	var iValid=true;
	var focusfield;

	for(i=0;i<arr.length;i++){
	
	var field = arr[i][0];
	
	if (field.type == "select" || field.type == "Select") {

			var si = field.selectedIndex;
			if (si >= 0) {
				value = field.options[si].value;
				
			}
		} 
		else {
			value = field.value;
		}
	if (trim(value).length == 0 || trim(value)=='select' || trim(value)=='Select') {
			if(j==0){
				focusfield=field;
				j++;
			}
			msg=msg+arr[i][1]+"\n";
			iValid=false;
		}
	
	}
	if(iValid==false)
	{
		alert(msg);
	}
	return iValid;
}
function trim(s) 
{
	return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}
function isNull(e)
{
  // alert("In ISNULL function");
   if((e.value=="")||(e.selectedIndex==0))
	{
		//test+=e.name+"\n"	
    return true;
   }
}

function checkMendatory(field,comment){
	val = field.value;
	if(val ="" || val.length < 1){
		//alert("Please Enter "+comment);
		//field.focus();
		return false;
	}
	return true;
} 
function checkMendatory(field){

	val = field.value;
	if(val ="" || val.length < 1){
		return false;
	}
	return true;
} 

function checkSpecialChar(field)
{

	value = field.value;
	var iChars = "%#*?&@#$%^\\\'/|\"";

	for (var i = 0; i < value.length; i++) 
	{
		if (iChars.indexOf(value.charAt(i)) != -1)
		{
			alert ("Special characters are not allowed");
			field.focus();
			return false;
		}
	}
	return true;
}

function securityCheckAll(){
	 var isValid = true;
	 var flag=true;
	textArr=document.getElementsByTagName("INPUT");
		for(var i=0;i<textArr.length;i++)
		{
		     flag=securityCheck(textArr[i]);

			 if(flag==false){
				 isValid=false;
			 }
		}
		taArr=document.getElementsByTagName("TEXTAREA");
		for(i=0;i<taArr.length;i++)
		{
			 flag=securityCheck(taArr[i]);
			 if(flag==false){
				 isValid=false;
			 }
		}
		if(isValid==false){
			alert("Please enter Valid  Values");
			return false;
		}
		
}

function validurl(field)
{     
	 var msg="";
	 var isValid = true;
	 var regexp=new RegExp(/(^((http\:\/\/)?[0-9A-Za-z\.]+)$)/);
	 if(field.value!="")
		{
		  if (!matchPattern(field.value, regexp)) 
		  {
			  msg="Please enter valid website url";
			  isValid = false;
		  }
		  if(msg!="")
		  {
			  alert(msg); 
		  }
	 }
	  return isValid;
}

function validateTIN(form)
{
	/*Begin ---Changes for KRA ------Aslam*/
	 var pin = form.value;
	 if ( pin == null || pin== '')
	 {
		alert("PIN is required.");
		
		return false;
	 }
	 if(securityCheck(form))
	  { 
		if(pin.length == 11)
		{
			if(!((pin.substring(0,1).toString() == "A") || (pin.substring(0,1).toString() == "P")))
			{	
				alert("Invalid PIN.");
				return false;
			}
			if(isNaN(pin.substring(1,10).toString()))
			{	
				alert("Invalid PIN.");
				return false;
			}
			var charCode = pin.substring(10).toString();
			var check="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			flag=0;
			for(var i=0;i<check.length;i++){
				if(charCode == check.charAt(i)){	
					flag=1;
				}
			}
			if(flag==0){
				alert("Invalid PIN.");
				return false;
			}
			else
				flag=0;
		}
		else
		{
			alert("Invalid PIN.");
			return false;
		}

	  }
	  else
	  {    
	    alert('Malicious Code Found. Please Enter valid data.');
		form1.value = "";
	    return false;
	  }	 
		 
	/* var tin = form.value
	if(!isNumeric(form)){
        return false;
    }
    else if(!(tin.length==11)){
    	 alert("Please enter 11 digit TIN");
    	 form.value="";
    	 form.focus();
         return false;
    } */
    return true;
}
/*disable.js*/
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

/*VirtualKeyBoard.js*/
var id;
var pvalue = "";
var divid;
var numpad;
var caps = "off";
var shuffle = "on";
var pwd = "";
var ch = null;
var chkbox = null;
var spR1 = null;
var spR2 = null;
var numR = null;
var sp1;
var sp2;
var num;
function getLeft(b) {
	var a = 0;
	while (b) {
		a += b.offsetLeft;
		b = b.offsetParent
	}
	return a
}
function getTop(b) {
	var a = 0;
	while (b) {
		a += b.offsetTop;
		b = b.offsetParent
	}
	return a
}
function useVirtualKeys(h, e, u) {
	hidParam = u; //value equals to "true if keyboard is there or "false"
	chkbox = e;
	pwd = h;
	var a = 800;
	var g = 200;
	var f = document.getElementById("keyboard");
	if (f != null) {
		disableKeyBoard()
	}
	var relChkPos = findPos(chkbox);
	var keyBoardLeftPos = relChkPos[0] - 200;
	var keyBoardTopPos = relChkPos[1] + 20;
	
//	alert("relChkPos.curleft = "+relChkPos[0]);
//  alert("relChkPos.curtop = "+relChkPos[1]);
	if (hidParam.value == "true") {
		pwd.value = "";
		pwd.disabled = true;
		divid = document.createElement("div");
		divid.setAttribute("id", "keyboard");
		divid.innerHTML = printKeyBoard();
		divid.style.left = keyBoardLeftPos;
		divid.style.top = keyBoardTopPos;
		divid.style.backgroundColor = "#F2f2f2";
		divid.style.position = "absolute";
		divid.style.border = "2px outset #000000";
		divid.style.opacity = "0.9";
		divid.style.filter = "alpha(opacity=90)";
		divid.style.zIndex = 99999;
		document.body.appendChild(divid);
		numpad = document.createElement("div");
		numpad.innerHTML = getNumPad();
		numpad.style.position = "absolute";
		numpad.style.right = 10 + "px";
		numpad.style.top = 25 + "px";
		divid.appendChild(numpad);
		sp1 = new Array();
		sp2 = new Array();
		var d = new String("'");
		var c = new String("\\");
		var b = new String('"');
		sp1[0] = "~";
		sp1[1] = "!";
		sp1[2] = "@";
		sp1[3] = "#";
		sp1[4] = "$";
		sp1[5] = "%";
		sp1[6] = "^";
		sp1[7] = "&";
		sp1[8] = "*";
		sp1[9] = "(";
		sp1[10] = ")";
		sp1[11] = "_";
		sp1[12] = "+";
		sp1[13] = "`";
		sp1[14] = "-";
		sp1[15] = "=";
		sp1[16] = "]";
		sp1[17] = "[";
		sp1[18] = "}";
		sp1[19] = "{";
		sp1[20] = "|";
		sp1[21] = c;
		sp1[22] = ":";
		sp1[23] = b;
		sp1[24] = ";";
		sp1[25] = "/";
		sp2[0] = "?";
		sp2[1] = ">";
		sp2[2] = "<";
		sp2[3] = ",";
		sp2[4] = ".";
		sp2[5] = d;
		ch = new Array();
		ch[0] = "q";
		ch[1] = "w";
		ch[2] = "e";
		ch[3] = "r";
		ch[4] = "t";
		ch[5] = "y";
		ch[6] = "u";
		ch[7] = "i";
		ch[8] = "o";
		ch[9] = "p";
		ch[10] = "a";
		ch[11] = "s";
		ch[12] = "d";
		ch[13] = "f";
		ch[14] = "g";
		ch[15] = "h";
		ch[16] = "j";
		ch[17] = "k";
		ch[18] = "l";
		ch[19] = "z";
		ch[20] = "x";
		ch[21] = "c";
		ch[22] = "v";
		ch[23] = "b";
		ch[24] = "n";
		ch[25] = "m";
		num = new Array();
		num[0] = "7";
		num[1] = "8";
		num[2] = "9";
		num[3] = "6";
		num[4] = "5";
		num[5] = "4";
		num[6] = "3";
		num[7] = "2";
		num[8] = "1";
		num[9] = "0";
		shuffleON()
	} else {
		disableKeyBoard()
	}
}
function disableKeyBoard() {
	divid = document.getElementById("keyboard");
	if (divid != null) {
		document.body.removeChild(divid)
	}
	pwd.disabled = false
}
function turnCapsON() {
	for (i = 0; i < ch.length; i++) {
		ID = i + 33;
		id = document.getElementById(ID);
		value = id.value.toUpperCase();
		id.value = value
	}
}
function turnCapsOFF() {
	for (i = 0; i < ch.length; i++) {
		ID = i + 33;
		id = document.getElementById(ID);
		value = id.value.toLowerCase();
		id.value = value
	}
}
function shuffleON() {
	var b;
	var a;
	spR1 = getRandom(26);
	spR2 = getRandom(6);
	numR = getRandom(10);
	for (b = 0; b < spR1.length; b++) {
		ID = b + 1;
		id = document.getElementById(ID);
		c = " " + sp1[spR1[b]] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
	for (b = 0; b < spR2.length; b++) {
		ID = b + 27;
		id = document.getElementById(ID);
		c = " " + sp2[spR2[b]] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
	for (b = 0; b < ch.length; b++) {
		ID = b + 33;
		id = document.getElementById(ID);
		c = " " + ch[spR1[b]] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
	for (b = 0; b < numR.length; b++) {
		var c;
		ID = b + 59;
		id = document.getElementById(ID);
		c = " " + num[numR[b]] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
}
function shuffleOFF() {
	var b;
	var a;
	for (b = 0; b < sp1.length; b++) {
		ID = b + 1;
		id = document.getElementById(ID);
		c = " " + sp1[b] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
	for (b = 0; b < sp2.length; b++) {
		ID = b + 27;
		id = document.getElementById(ID);
		c = " " + sp2[b] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
	for (b = 0; b < ch.length; b++) {
		ID = b + 33;
		id = document.getElementById(ID);
		c = " " + ch[b] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
	for (b = 0; b < num.length; b++) {
		var c;
		ID = b + 59;
		id = document.getElementById(ID);
		c = " " + num[b] + " ";
		id.value = c;
		id.className = "kbbutton"
	}
}
function KeyBoardAction(a) {
	var b = a.substring(1, 2);
	if (a == "BackSpace") {
		pwd.value = pwd.value.substring(0, pwd.value.length - 1)
	} else {
		if (a == "Clear") {
			pwd.value = ""
		} else {
			if ((a == "TurnCapsON") || (a == "TurnCapsOFF")) {
				capsid = document.getElementById("caps");
				if (caps == "off") {
					caps = "on";
					capsid.value = "TurnCapsOFF";
					turnCapsON()
				} else {
					if (caps == "on") {
						caps = "off";
						capsid.value = "TurnCapsON";
						turnCapsOFF()
					}
				}
			} else {
				if (a == "Close") {
					hidParam.value = "false";
					disableKeyBoard()
				} else {
					if ((a == "ShuffleON") || (a == "ShuffleOFF")) {
						shuffleid = document.getElementById("shuffle");
						if (shuffle == "off") {
							shuffle = "on";
							shuffleid.value = "ShuffleOFF";
							shuffleON();
							if (caps == "on") {
								turnCapsON()
							}
						} else {
							if (shuffle == "on") {
								shuffle = "off";
								shuffleid.value = "ShuffleON";
								shuffleOFF();
								if (caps == "on") {
									turnCapsON()
								}
							}
						}
					} else {
						if (caps == "on") {
							b = b.toUpperCase()
						}
						pwd.value = pwd.value + b
					}
				}
			}
		}
	}
}
function printKeyBoard() {
	var b = " <table id=first border=0> <tr id=first_row ><td> <input type	=button id=1 onclick=KeyBoardAction(this.value)> </td><td> <input type	=button id=2 onclick=KeyBoardAction(this.value)> </td><td> <input type	=button id=3 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=4 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=5 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=6 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=7 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=8 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=9 onclick=KeyBoardAction(this.value) > </td><td> <input type	=button id=10 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=11 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=12 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=13 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=14 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=15 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=16 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=bckspc value=BackSpace class=kbbutton onclick=KeyBoardAction(this.value)  > </td></tr></table><table id=second border=0 cellpadding=1><tr id=second_row ><td> <td> <td> <input type	=button id=33 onclick=KeyBoardAction(this.value)  ></td><td> <input type	=button id=34 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=35 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=36 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=37 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=38 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=39 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=40 onclick=KeyBoardAction(this.value)  > </td><td> <input type  =button id=41 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=42 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=20 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=19 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=18 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=17 onclick=KeyBoardAction(this.value)  > </td><td> </td> <td> <td></td> <td></td> <td> </td> <td> </td> <td> </td> <td> </td><td> </td> <td> </td> <td> </td></tr></table>  <table id=third border=0 cellspacing=2>  <tr id=third_row >  <td> <td> <td> <td><td> <input type	=button id=43 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=44 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=45 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=46 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=47 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=48 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=49 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=50 onclick=KeyBoardAction(this.value)  > </td><td> <input type   =button id=51 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=25 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=24 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=23 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=22 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=21 onclick=KeyBoardAction(this.value)  > </td><td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>  </table> <table id=fourth border=0 cellspacing=2> <tr id=fourth_row ><td> <td>  <td> <td>  <td>  <td>  <td><td><input type   =button id=52 onclick=KeyBoardAction(this.value)  > </td><td> <input type   =button id=53 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=54 onclick=KeyBoardAction(this.value)  ></td><td> <input type	=button id=55 onclick=KeyBoardAction(this.value)  ></td><td> <input type	=button id=56 onclick=KeyBoardAction(this.value)  ></td><td> <input type	=button id=57 onclick=KeyBoardAction(this.value)  ></td><td> <input type	=button id=58 onclick=KeyBoardAction(this.value)  ></td> <td> <input type	=button id=32 onclick=KeyBoardAction(this.value)  ></td><td> <input type   =button id=31 onclick=KeyBoardAction(this.value)  > </td><td> <input type   =button id=30 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=29 onclick=KeyBoardAction(this.value)  ></td><td> <input type	=button id=28 onclick=KeyBoardAction(this.value)  > </td><td><td> <input type	=button id=27 onclick=KeyBoardAction(this.value)  > </td><td> <input type	=button id=26 onclick=KeyBoardAction(this.value)  > </td><td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr></table><table id=fifth border=0 cellspacing=3><tr id=fifth_row > <td> </td> <td> </td>  <td> </td> <td> </td>  <td> </td>  <td> </td>  <td> </td><td> <input type=button value=TurnCapsON class=kbbutton id=caps onclick=KeyBoardAction(this.value)  > </td><td> <input type=button value=Clear class=kbbutton id=clr onclick=KeyBoardAction(this.value)  > </td><td> <input type=button value=Close class=kbbutton id=close onclick=KeyBoardAction(this.value)  > </td></tr></table>";
	return b
}
function findPos(obj) 
{
	var curleft = curtop = 0;

	if (obj.offsetParent) { 
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		
		while (obj = obj.offsetParent) { 
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	//alert(curleft + " " + curtop);
	return [curleft,curtop]; 
}



function getNumPad() {
	var b = "<table> <tr>  <td> <input type=button id=59 onclick=KeyBoardAction(this.value)  > </td> <td> <input type=button id=60 onclick=KeyBoardAction(this.value)  > </td> <td> <input type=button id=61 onclick=KeyBoardAction(this.value)  > </td> </tr> <tr> <td> <input type=button id=64 onclick=KeyBoardAction(this.value)  > </td><td> <input type=button id=63 onclick=KeyBoardAction(this.value)  > </td><td> <input type=button id=62 onclick=KeyBoardAction(this.value)  > </td> </tr> <tr><td> <input type=button id=67 onclick=KeyBoardAction(this.value)  > </td><td> <input type=button id=66 onclick=KeyBoardAction(this.value)  > </td><td> <input type=button id=65 onclick=KeyBoardAction(this.value)  > </td></tr><td> <td> <input type=button id=68 onclick=KeyBoardAction(this.value)  > </td></td> </table>";
	return b
};

/*loginPage.js*/
/*sha1.js*/
/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*
**/
 
function hex_sha1 (msg) {
 
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toUpperCase();
 
}
/*keyexchange.js*/

var generator = "";
var modulus = "";
var secretNoClient = "";
var senderIntrmKey = "";
var rcpntIntrmKey = "";

var sharedSecretKey = "";

var MAX_PRIME_NUMBER  =  2147483; //Bigger the number the slower the algorithm


function generateSecretNoClient()
{
    secretNoClient =  generareRandomNumber() % MAX_PRIME_NUMBER;
    return secretNoClient;
}

function createRecipientInterimKey(generator,modulus,senderIntrmKey)
{
	generator = generator;
        modulus = modulus;
        senderIntrmKey = senderIntrmKey;
        
        rcpntIntrmKey = xpowYmodN(generator,secretNoClient,modulus);
	
        return rcpntIntrmKey;
        
}
	
function createSharedSecretKey(senderIntrmKey,secretNoClient,modulus)
{
        sharedSecretKey = xpowYmodN(senderIntrmKey,secretNoClient,modulus);
        return sharedSecretKey;
}
   
 function generareRandomNumber()
  {
        var chars = "1234567890";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * 10);
		randomstring += chars.charAt(rnum);
	}
       return randomstring ;
  }
    //Raises X to the power Y in modulus N
    //the values of X, Y, and N can be massive, and this can be
    //acheived by first calculating X to the power of 2 then
    //using power chaining over modulus N
    function  xpowYmodN(x,y,N)
    {
            var tmp = 0;
            if (y==1) return (x % N);

            if ((y&1)==0)
            {
                    tmp = xpowYmodN(x,y/2,N);
                    return ((tmp * tmp) % N);
            }
            else
            {
                    tmp = xpowYmodN(x,(y-1)/2,N);
                    tmp = ((tmp * tmp) % N);
                    tmp = ((tmp * x) % N);
                    return (tmp);
            }
    }

/*encryptionDecryption.js*/


    function Cipher(input, w) 
    {    
      var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
      var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

      var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
      
      for (var i=0; i<4*Nb; i++) 
      {
    	state[i%4][Math.floor(i/4)] = input[i];
      }
      
      
      state = AddRoundKey(state, w, 0, Nb);
     

      for (var round=1; round<Nr; round++) 
      {
            state = SubBytes(state, Nb);
            state = ShiftRows(state, Nb);
            state = MixColumns(state, Nb);
            state = AddRoundKey(state, w, round, Nb);
      }

      state = SubBytes(state, Nb);
      state = ShiftRows(state, Nb);
      state = AddRoundKey(state, w, Nr, Nb);

      var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
      for (var i=0; i<4*Nb; i++) 
      {
    	output[i] = state[i%4][Math.floor(i/4)];
    	
      }
     
      return output;
    }


    function SubBytes(s, Nb) 
    {    // apply SBox to state S [§5.1.1]
      for (var r=0; r<4; r++) {
        for (var c=0; c<Nb; c++) s[r][c] = Sbox[s[r][c]];
      }
      return s;
    }


    function ShiftRows(s, Nb) 
    {    
    	  // shift row r of state S left by r bytes [§5.1.2]
    	  var t = new Array(4);
    	  for (var r=1; r<4; r++) 
    	  {
    		for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    		for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
    	  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
    	  return s;  // see fp.gladman.plus.com/cryptography_technology/rijndael/aes.spec.311.pdf 
    }


    function MixColumns(s, Nb) 
    {   // combine bytes of each col of state S [§5.1.3]
      for (var c=0; c<4; c++) 
      {
        var a = new Array(4);  // 'a' is a copy of the current column from 's'
        var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
        
    	for (var i=0; i<4; i++) 
    	{
          a[i] = s[i][c];
    	
    	  b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;
    	  
    	 // alert("b["+i+"] =" +b[i] + "i = " + i + "a ["+i+"] = " +a[i]);
    	}
        // a[n] ^ b[n] is a•{03} in GF(2^8)
        s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
        s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
        s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
        s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
      }

      
      return s;
    }



    function AddRoundKey(state, w, rnd, Nb) 
    {  
    	// xor Round Key into state S [§5.1.4]
    	  for (var r=0; r<4; r++) 
    	  {
    		for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
    	  }
    	  return state;
    }


    function KeyExpansion(key) 
    {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
    	  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
    	  var Nk = key.length/4  // key length (in words): 4/6/8 for 128/192/256-bit keys
    	  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

    	
    	  var w = new Array(Nb*(Nr+1));
    	  var temp = new Array(4);

    	  
    	  for (var i=0; i<Nk; i++) 
    	  {
    		var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    		
    		w[i] = r;
    	  }
    		
    		//alert("w in keyexpansion =" +w);
    	 
    	  for (var i=Nk; i<(Nb*(Nr+1)); i++) 
    	  {
    		w[i] = new Array(4);
    		for (var t=0; t<4; t++) 
    		{	
    			temp[0] = w[i-1][0];
    		}

    		if (i % Nk == 0) 
    		{
                        temp = SubWord(RotWord(temp));
                        for (var t=0; t<4; t++) 
                        {
    			 temp[t] = temp[t] ^ Rcon[i/Nk][t];
                        }
    		
                    } 
    		else if (Nk > 6 && i%Nk == 4) 
    		{
    		 
    		  temp = SubWord(temp);
    		 
    		}
    		
    		for (var t=0; t<4; t++) 
    		{	
    			w[i][t] = w[i-Nk][t] ^ temp[t];
    		}
    		
    	  }

    	
    	  return w;
    }

    function SubWord(w) 
    {    // apply SBox to 4-byte word w
    	   
    	  for (var i=0; i<4; i++) 
    	  {	
    		w[i] = Sbox[w[i]];
    	  }
    	 
    	//  alert("temp in subword  = " + w );
    	  return w;
    }

    function RotWord(w) 
    {    // rotate 4-byte word w left by one byte
    	  var tmp = w[0];
    	  for (var i=0; i<3; i++) 
    	  {
    		w[i] = w[i+1];
    	  }
    		w[3] = tmp;
    	  
    	//  alert("temp in rotateword = " + w);
    	  return w;
    }


    // Sbox is pre-computed multiplicative inverse in GF(2^8) used in SubBytes and KeyExpansion [§5.1.1]
    var Sbox =  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
                 0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
                 0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
                 0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
                 0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
                 0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
                 0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
                 0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
                 0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
                 0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
                 0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
                 0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
                 0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
                 0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
                 0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
                 0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];

    // Rcon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
    var Rcon = [ [0x00, 0x00, 0x00, 0x00],
                 [0x01, 0x00, 0x00, 0x00],
                 [0x02, 0x00, 0x00, 0x00],
                 [0x04, 0x00, 0x00, 0x00],
                 [0x08, 0x00, 0x00, 0x00],
                 [0x10, 0x00, 0x00, 0x00],
                 [0x20, 0x00, 0x00, 0x00],
                 [0x40, 0x00, 0x00, 0x00],
                 [0x80, 0x00, 0x00, 0x00],
                 [0x1b, 0x00, 0x00, 0x00],
                 [0x36, 0x00, 0x00, 0x00] ]; 




    function AESEncryptCtr(plaintext,password,nBits) 
    {
              password = String(password);
    	  
              var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    	  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
    	
    	  // use AES itself to encrypt password to get cipher key (using plain password as source for key 
    	  // expansion) - gives us well encrypted key
    	  var nBytes = nBits/8;  // no bytes in key
    	  var pwBytes = new Array(nBytes);
    	  
              for (var i=0; i<nBytes; i++) 
              {
    		pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
    	  }
    	  var key = Cipher(pwBytes, KeyExpansion(pwBytes));  // gives us 16-byte key
    	  
    	 
    	  var counterBlock = new Array(blockSize);
    	  var nonce = (new Date()).getTime();  // timestamp: milliseconds since 1-Jan-1970
    	  var nonceSec = Math.floor(nonce/1000);
    	  var nonceMs = nonce%1000;
    	  // encode nonce with seconds in 1st 4 bytes, and (repeated) ms part filling 2nd 4 bytes
    	  for (var i=0; i<4; i++) counterBlock[i] = (nonceSec >>> i*8) & 0xff;
    	  for (var i=0; i<4; i++) counterBlock[i+4] = nonceMs & 0xff; 
    	  // and convert it to a string to go on the front of the ciphertext
    	  var ctrTxt = '';
    	  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

    	  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
    	  var keySchedule = KeyExpansion(key);
    	  
    	  var blockCount = Math.ceil(plaintext.length/blockSize);
    	  var ciphertxt = new Array(blockCount);  // ciphertext as array of strings
    	  
    	  for (var b=0; b<blockCount; b++) {
    		// set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    		// done in two stages for 32-bit ops: using two words allows us to go past 2^32 blocks (68GB)
    		for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    		for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    		var cipherCntr = Cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    		
    		// block size is reduced on final block
    		var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    		var cipherChar = new Array(blockLength);
    		
    		for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter char-by-char --
    		  cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
    		  cipherChar[i] = String.fromCharCode(cipherChar[i]);
    		}
    		ciphertxt[b] = cipherChar.join(''); 
    	  }

    	  // Array.join is more efficient than repeated string concatenation
    	  var ciphertext = ctrTxt + ciphertxt.join('');
    	  ciphertext = ciphertext.encodeBase64();  // encode in base64
    	  
    	  
    	  return ciphertext;

    }




    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

    /**
     * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
     * (instance method extending String object). As per RFC 4648, no newlines are added.
     *
     * @param utf8encode optional parameter, if set to true Unicode string is encoded to UTF8 before 
     *                   conversion to base64; otherwise string is assumed to be 8-bit characters
     * @return           base64-encoded string
     */ 
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    String.prototype.encodeBase64 = function(utf8encode) 
    {  // http://tools.ietf.org/html/rfc4648
      utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
      var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
       
      plain = utf8encode ? this.encodeUTF8() : this;
      
      c = plain.length % 3;  // pad string to length of multiple of 3
      if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
      // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
      
      for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
        o1 = plain.charCodeAt(c);
        o2 = plain.charCodeAt(c+1);
        o3 = plain.charCodeAt(c+2);
          
        bits = o1<<16 | o2<<8 | o3;
          
        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hextets to index into b64 string
        e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      }
      coded = e.join('');  // join() is far faster than repeated string concatenation
      
      // replace 'A's from padded nulls with '='s
      coded = coded.slice(0, coded.length-pad.length) + pad;
       
      return coded;
    }



    /**
     * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
     * (BMP / basic multilingual plane only) (instance method extending String object).
     *
     * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
     *
     * @return encoded string
     */
    String.prototype.encodeUTF8 = function() 
    {
    	  // use regular expressions & String.replace callback function for better efficiency 
    	  // than procedural approaches
    	  
    	  
    	  var str = this.replace(
    		  /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
    		  function(c) { 
    			var cc = c.charCodeAt(0);
    			return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    		);
    	 
    	  str = str.replace(
    		  /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
    		  function(c) { 
    			var cc = c.charCodeAt(0); 
    			return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    		);
    	  
    	  return str;
    }
