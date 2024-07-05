//----------common.js----------starts here
//for disabling 
var frmSubmitFlag = 0;

function submitform(frmObj) {
	if (frmSubmitFlag == 0) {
		showProgressbar();
		frmSubmitFlag = 1;
		frmObj.submit();
	} else {
		alert("Please Wait while your Request is in Process");
	}
}

//Added by Jignesh for RTF Editor in Mail Communication.
function loadEditor(textAreaId, isSaveButtonRequired, url) {
	var mysettings = new WYSIWYG.Settings();

	mysettings.removeToolbarElement("headings");
	mysettings.removeToolbarElement("insertimage");
	mysettings.removeToolbarElement("undo");
	mysettings.removeToolbarElement("redo");
	// mysettings.removeToolbarElement("createlink");
	// mysettings.removeToolbarElement("font");
	// mysettings.removeToolbarElement("fontsize");
	mysettings.removeToolbarElement("unorderedlist");
	mysettings.removeToolbarElement("strikethrough");
	// mysettings.removeToolbarElement("forecolor");
	// mysettings.removeToolbarElement("backcolor");
	// mysettings.removeToolbarElement("inserttable");
	mysettings.removeToolbarElement("seperator");
	// mysettings.removeToolbarElement("preview");
	mysettings.removeToolbarElement("seperator");
	// mysettings.removeToolbarElement("cut");
	// mysettings.removeToolbarElement("copy");
	// mysettings.removeToolbarElement("paste");
	mysettings.removeToolbarElement("viewSource");
	mysettings.removeToolbarElement("statusbar");
	mysettings.removeToolbarElement("viewText");
	mysettings.removeToolbarElement("print");
	mysettings.removeToolbarElement("help");
	mysettings.removeToolbarElement("maximize");
	if (!isSaveButtonRequired) {
		mysettings.removeToolbarElement("save");
	} else {
		mysettings.URL = url;
	}
	//mysettings.removeToolbarElement("seperator");
	mysettings.Width = "100%";

	WYSIWYG.attach(textAreaId, mysettings);
}


//This function is used to give different CSS classes in specific tables for alternate rows.
function setRowOddEvenBackColor(){
	var tableObj = document.getElementsByTagName("table");
	//alert("tableObj-"+tableObj.length);
	if(tableObj != null)
	{
		for(var tabCount = 0; tabCount < tableObj.length; tabCount++)
		{
			var match = tableObj[tabCount].id.substring(0,12);
			//alert(match);
			if(match != null && match == "dynamicTable")
			{
				var rowObj = tableObj[tabCount].getElementsByTagName("tr");
				if(rowObj != null)
				{
					for(var rowCount = 0; rowCount < rowObj.length; rowCount++){
						if(rowCount % 2 == 0){
							rowObj[rowCount].className = "oddRow";
						}else{
							rowObj[rowCount].className = "evenRow";
						}
					}
				}
			}
		}
	}
}

//This function is used to give alternate text and title to the SELECT type object.
function setSelectObjAltText()
{
	var selectObj = document.getElementsByTagName("select");
	//alert("selectObj-"+selectObj.length);
	if(selectObj != null)
	{
		for(var selectCount = 0; selectCount < selectObj.length; selectCount++)
		{
			if(selectObj[selectCount] != null && selectObj[selectCount].options != null && selectObj[selectCount].options.length > 0)
			{
				for (var i=0; i<selectObj[selectCount].options.length; i++) 
				{
					selectObj[selectCount].options[i].title=selectObj[selectCount].options[i].text;
				}
			}
		}
	}
}

//This function is used to give notification/message regarding maximum text area limit
function setTextAreaCharCount(textAreaId,maxLimit)
{
	var taxArea = document.getElementById(textAreaId);
	var taxAreaCountDiv = document.getElementById(textAreaId+"Count");
	
	if(taxArea != null)
	{
		if(taxArea.value.length > maxLimit)
		{
			taxArea.value = taxArea.value.substring(0, maxLimit);
		}
		else
		{
			charLeft = maxLimit - taxArea.value.length;
			if(charLeft == "0" && taxAreaCountDiv != null)
			{
				dispCharLeft = "<font color=\"red\"><b>Maximum characters limit reached.</b></font>";
				taxAreaCountDiv.innerHTML = dispCharLeft;
			}
			else if(taxAreaCountDiv != null)
			{
				dispCharLeft = "You have <b>"+charLeft+"</b> characters left.";
				taxAreaCountDiv.innerHTML = dispCharLeft;
			}
		}
	}
}

//This function is used to set remaining characters for TextArea on load of the JSP
function setTextAreaObjLengthText()
{
	var selectObj = document.getElementsByTagName("textarea");
	//alert("selectObj-"+selectObj.length);
	if(selectObj != null)
	{
		for(var selectCount = 0; selectCount < selectObj.length; selectCount++)
		{
			if(selectObj[selectCount] != null)
			{
				var countMaxObj = document.getElementById(selectObj[selectCount].id+"CountMax");
				if(countMaxObj != null)
				{
					if(document.all)
					{
						setTextAreaCharCount(selectObj[selectCount].id,trim(countMaxObj.innerHTML));
					}
					else
					{
						setTextAreaCharCount(selectObj[selectCount].id,trim(countMaxObj.textContent));
					}
				}
			}
		}
	}
}

function commonDownloadFile(formObj,urlKey,downloadType)
{
	document.getElementById("URL_TO_DOWNLOAD").value=urlKey;
	document.getElementById("type").value=downloadType;
	formObj.target="_blank";
	formObj.action="download.htm";
	formObj.submit();
}

function trimAll(sString) 
{
    while (sString.substring(0,1) == ' ')
    {
        sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length-1, sString.length) == ' ')
    {
        sString = sString.substring(0,sString.length-1);
    }
    return sString;
}

function convertToKenyanShillingFormatValWithDecimal(valStr,decAlertFlag)
{
	if(valStr != "" && /*valStr != 0 &&*/ valStr != "NaN" && typeof(valStr) != "undefined")
	{
		var val = '' + valStr;
		var decimalPart = "";
		var decCnt=0;

		val = removeCommaFrmInput(val);

		if(val == "")
		{
			return false;
		}
		var sign = "";
		if(val.charAt(0) == '-')
		{
			val = val.substring(1);
			if(!(val.length > 0))
			{
				val = "0";
			}
			sign = "-";
		}

		var decimalFlag;
		if (val.split(".").length>2) {
			alert("Invalid number entered with more than one decimal part.");
			return 0;
		}
		if(val.indexOf(".") != -1)
		{
			decimalFlag = true;
			decimalPart = val.substring(val.indexOf("."));
			val = val.substring(0,val.indexOf("."));
			if (val == ""){
				val="0";
			}
		}

		while(val.charAt(0) == "0" && val != "0")
		{
			val = val.substring(1,val.length);
		}




		var str = "0123456789";

		for(j = 0; j < val.length; j++)
		{
			if(str.indexOf(val.charAt(j)) == -1)
			{
				val = "";
				alert("Please enter numeric data in this field");
				decimalFlag = false;
				return false;
			}
		}
		for(j = 1; j < decimalPart.length; j++)
		{
			if(str.indexOf(decimalPart.charAt(j)) == -1)
			{
				alert("Please enter numeric data in this field");
				return false;
			}
		}   

		var valGr8 = false;
		if(val.length > 20)
		{
			valGr8 = true;
			val = val.substring(0,20);
		}
		var deciGr8 = false;

		if(decimalPart.length > 3)
		{
			deciGr8 = true;
			decimalPart = decimalPart.substring(0,3);
		}
		// to display 00 in decimal while blank or in case of decimal only

		if(decimalPart.length==0 || decimalPart.length==1)
		{
			decimalPart=".00";
		}     
		// to display single decimal place only
		else if(decimalPart.length==2)
		{
			decimalPart+="0";        	
		}

		var result = "";
		if(val.length > 3)
		{
			val = parseInt(val);
			var i = 1;
			while(val != 0)
			{
				var temp = ""+(val%1000);
				while(temp.length < 3)
				{
					temp = "0"+temp;
				}
				result = "," + temp + result;
				val = parseInt(val/1000);
			}
		}
		else
		{
			val = parseInt(val);
			result = ""+val;
		}
		if(result.charAt(0) == ",")
		{
			result = result.substring(1);
		}

		while(result.charAt(0) == "0" && result != "0")
		{
			result = result.substring(1,result.length);
		}
		if(result == "")
		{
			result = "0";
		}
		val = sign + result  + "" + decimalPart;
		if(valGr8)
		{
			alert("The absolute part cannot be greater than 20 digits");
			valGr8 = false;
		} 
		if(deciGr8 && decAlertFlag)
		{
			alert("The decimal part cannot be greater than 2 digits");
			deciGr8 = false;
		}
		return val;
	}
	else
	{
		return 0;
	}
}


function removeCommaFrmInput(val){
	var valString = '' + val ;
	if(valString == "")
		valString = "";
	else{
		while(valString.indexOf(",") != -1)
		{
			valString = valString.replace(',','');
		}
	}
	return valString;
}


function convertToShillingFormatForBlank(obj,decimalFlag)
{
	if(obj.value != "" && /*obj.value != 0 &&*/ obj.value != "NaN" && typeof(obj.value) != "undefined")
	{
		if(typeof(decimalFlag) == "undefined")
		{
			decimalFlag = true;

		}
		var val =  convertToKenyanShillingFormatValWithDecimal(obj.value,decimalFlag);
		if(val == false)
		{
			obj.value = "0.00";
			return false;
		}
		else
		{
			obj.value = val;
			return true;
		}
	}
	else
	{
		return true;
	}
}



window.history.go(1);
function createSkipFieldForAddRow(tabStr,formName){
	var txt_node = document.createElement('input');
	txt_node.setAttribute('type','hidden'); 
	txt_node.setAttribute('name','fieldsToSkip'); 
	for(var i=1;i<document.getElementById(tabStr).rows.length;i++){
		//txt_node.setAttribute('id','fieldsToSkip_'+(100+i));
		txt_node.setAttribute('value',tabStr+'_'+i);
		document.getElementById(formName).appendChild(txt_node);
	}
}


function createSkipFieldForITRAddRow(tabStr,formName){
	
	for(var i=1;i<document.getElementById(tabStr).rows.length;i++){
		var txt_node = document.createElement('input');
		txt_node.setAttribute('type','hidden'); 
		txt_node.setAttribute('name','fieldsToSkip'); 
		//txt_node.setAttribute('id','fieldsToSkip_'+(100+i));
		txt_node.setAttribute('value',tabStr+'_'+i);
		document.getElementById(formName).appendChild(txt_node);
	}
}


//--------common.js-------------ends here
//--------commonValidation.js--------------------starts here
var errorColor='#E26250';
var defaultColor='';
var errorListResult = new Array(1000);
var incError=0;
var AdFormJson=null;
var commonErrTabIndex = 0;


function hideAndShowTable(divId)
{
	if(incError>0)
		document.getElementById(divId).style.display="";
	else
		document.getElementById(divId).style.display="none";
}
function isErrorInList(TabViewId,id)
{
	if(incError>0)
	{
		tabview_switch(TabViewId,id);
		return true;
	}
	else
	{
		return false;
	}
}
function getErrTabToggle(TabViewId,id)
{
	if(incError==0)
		hideTab(TabViewId,id);
	else
		showTab(TabViewId,id);
}
function setCommonErrTabIndex(val)
{
	commonErrTabIndex=val;
}
function validateFormFields()
{
// alert("arguments"+arguments);
for (var f = 0; f < arguments.length; f++) 
{
	try
	{
		AdFormJson=arguments[f];
		//alert(AdFormJson.field[0].name);
		for(var i=0;i<AdFormJson.field.length;i++)
		{
			var styleId = AdFormJson.field[i].name;
			document.getElementById(styleId).value=trimStr(document.getElementById(styleId).value);
			var styleRule = AdFormJson.field[i].rule[0];
			if(document.getElementById(styleId).type.toLowerCase()=='radio')
				validateField(styleRule,styleId);
			else if(!(document.getElementById(styleId).disabled)&&!(document.getElementById(styleId).style.display=='none'))
				validateField(styleRule,styleId);
		}
	}
	catch(E){
		alert('Exception Occurred'+E.description);
		return false;
	}
}
	if(incError>0)
		return false;
	else 
		return true;
}
function validateFormFieldsOnIntrimSave()
{

for (var f = 0; f < arguments.length; f++) 
{
	try
	{
		AdFormJson=arguments[f];
//		alert(AdFormJson.field[0].name);
		for(var i=0;i<AdFormJson.field.length;i++)
		{
			var styleId = AdFormJson.field[i].name;
			document.getElementById(styleId).value=trimStr(document.getElementById(styleId).value);
			AdFormJson.field[i].rule[0].required='n';
			var styleRule = AdFormJson.field[i].rule[0];
			if(document.getElementById(styleId).type.toLowerCase()=='radio')
				validateField(styleRule,styleId);
			else if(!(document.getElementById(styleId).disabled)&&!(document.getElementById(styleId).style.display=='none'))
				validateField(styleRule,styleId);
		}
	}
	catch(E){
//		alert('Exception Occurred');
		return false;
	}
}
	if(incError>0)
		return false;
	else 
		return true;
}
function validateAddRow()
{
	var rtnVal=true;
	for (var f = 0; f < arguments.length; f++) 
	{
		AdFormJson=arguments[f];
		for(var i=0;i<AdFormJson.field.length;i++)
		{
			var styleId = AdFormJson.field[i].name;
			document.getElementById(styleId).value=trimStr(document.getElementById(styleId).value);
			var styleRule = AdFormJson.field[i].rule[0];
			if(!(document.getElementById(styleId).disabled)&&!(document.getElementById(styleId).style.display=='none'))
			{
				if(rtnVal)
			 		rtnVal=validateField(styleRule,styleId);
			 	else
			 		validateField(styleRule,styleId);
			}
		}
	}
		return rtnVal;
}
function refreshErrorList(pId)
{
		var tableRef = document.getElementById(pId);
		var tbody = document.getElementById(pId).getElementsByTagName('TBODY')[0];
		for (var i=1; i<10000; i++)
		{ 
			var trow = tbody.getElementsByTagName('TR')[0];
			if(trow==null)
			{
					break;
			}
			else
			{
				tbody.removeChild(trow);
			}
		}	
			printErrorList(pId);

}

function enableRequiredTab(val)
{
	try
	{
		var temp=val;
		var v=document.getElementById(val);
		while(v.className!='Page')
		{
			v=v.parentNode;
		}
		var index= parseInt(v.id);
		tabview_switch('TabView',index);
		
	}
	catch(e){}
	if(!document.getElementById(val).disabled)
		document.getElementById(val).focus();
}

function errorObjClass()
{
	this.id=null;
	this.errMsg=null;
	this.hdr=null;
	this.linkId=null;
	this.isValidateOnIntrim=null;
}
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
function resetErrorList()
{
	incError=0;
	var newArray=[];
	for (var f = 0; f < arguments.length; f++) 
	{
		try
		{
			AdFormJson=arguments[f];
			for(var i=0;i<AdFormJson.field.length;i++)
			{
				newArray=errorListResult.splice(i,1);
				var id=document.getElementById(AdFormJson.field[i].name);
				id.style.backgroundColor=defaultColor;
				id.removeAttribute('title');
			}
		}
		catch(E){
		}
	}
}
function resetErrorListOnIntrimSave()
{
	var newArray=[];
	var doCall=false;
	try
	{
		for(var t=0;t<incError;t++)
		{
			if(errorListResult[t].isValidateOnIntrim!=null && errorListResult[t].isValidateOnIntrim=='n')
			{
				var id=document.getElementById(errorListResult[t].id);
				id.style.backgroundColor=defaultColor;
				id.removeAttribute('title');
				newArray=errorListResult.splice(t,1);
				incError=incError-1;
				t=t-1;
				doCall=true;
			 }
		}
		if(doCall)
		{
			refreshErrorList('errorTab');
		}
	}
	catch(e)
	{
		alert(e.message);
	}
}
function rmvEleFrmArray(addError)
{
	var newArray=[];
	var doCall=false;
	for(var t=0;t<incError;t++)
	{
		
		if((errorListResult[t].id==addError.id) )
		{
			//setDefaultBGColor(addError.id);
			newArray=errorListResult.splice(t,1);
			incError=incError-1;
			doCall=true;
		 }
	}
	if(doCall)
		refreshErrorList('errorTab');
}
function rmvDisEleFrmArray(id)
{
	var newArray=[];
	var doCall=false;
	var realId=document.getElementById(id);
	for(var t=0;t<incError;t++)
	{
		if((errorListResult[t].id==id))
		{
			newArray=errorListResult.splice(t,1);
			incError=incError-1;
			doCall=true;
			setDefaultBGColor(id);
			realId.removeAttribute('title');
			break;
		 }
	}
	if(doCall)
		refreshErrorList('errorTab');
}

function printErrorList(tableName)
{
	var tbody = document.getElementById(tableName).getElementsByTagName('TBODY')[0];
	for(var t=0;t<incError;t++)
	{	
		var row = document.createElement('TR');
		var td1 = document.createElement('TD');
		var td2 = document.createElement('TD');
		td1.innerHTML='<center>'+(t+1)+'</center>';
		var removeLink = document.createElement('a');
		var removeLinkText=document.createTextNode(errorListResult[t].errMsg);
		removeLink.setAttribute('href','javascript:enableRequiredTab(\''+errorListResult[t].linkId+'\')');
		removeLink.appendChild(removeLinkText);
		td2.setAttribute("align","left");
		td2.appendChild(removeLink);
		//td2.innerHTML='<a href=\'javascript:enableRequiredTab(\''+errorListResult[t].id+'\')\'>'+errorListResult[t].errMsg+'</a>';//errorListResult[t].errMsg;
		row.appendChild(td1);
		row.appendChild(td2);
		tbody.appendChild(row);        
	}
}

function hgroupValidate(idsv)
{
	var rtnValue;
	try
	{
		var r=idsv.indexOf('_');
		var c=idsv.indexOf('_',r+1);
		var ccount=idsv.substring(c+1,idsv.length);
		var hcount=parseInt(ccount);
		for(var h=0;h<10000;h++)
		{
			var tempv=idsv.substring(0,r+1)+(hcount+h)+idsv.substring(c,idsv.length);
			if(document.getElementById(tempv)!=null)
			{
				if(checkMand(tempv))
				{
					rtnValue = true;
				}
			}
			else
			{
				rtnValue = false;
			}
		}
	}
	catch(E)
	{
		rtnValue = false;
	}
	return rtnValue;
}
function vgroupValidate(idsh)
{
	var setReturn;
	try
	{	
		var r=idsh.indexOf('_');
		var c=idsh.indexOf('_',r+1);
		if(c!=-1)
			var rcount=idsh.substring(r+1,c);
		else 
			var rcount=idsh.substring(r+1,idsh.length);
			
		var vcount=parseInt(rcount);
		setReturn =false;
		for(var h=0;h<10000;h++)
		{
			var temph=idsh.substring(0,r+1)+(vcount+h)+idsh.substring(c,idsh.length);
			if(document.getElementById(temph)!=null)
			{
				if(checkMand(temph))
				{
					setReturn=true;
				}
				else
					setReturn=false;
			}
			else
			{
				return setReturn;
			}
		}
	}
	catch(E)
	{
		return setReturn;
	}
	return setReturn;
}
function getVal(id)
{
	return document.getElementById(id).value;
}

function trimStr(string)	{
	if(string!=null && string!="")
		return string.replace(/^\s+|\s+$/g,"");
	else
		return string;
}

function checkForCSS(strVal)                                        
{ 
  var regexpforHTMLTag1=/(<|&#60|u003C)\s*(\S+)\s*[^>]*\s*(>|&#62|u003E)(.*)(<|&#60|U003C)\/\s*\2\s*(>|&#62|u003E)/i; //<script> <//script> <html> </html>
  var regexpforHTMLTag2=/(<|&#60|u003C)\s*(\S+)\s*([^>]*)\s*(>|&#62|u003E)/i;                //<font face='Arial, Serif' size='+2' color='red'>
  var regexpforXMLTag=/((<|&#60|u003C).[^(><.)]+(>|&#62|u003E))/i;                           //<servlet-name attr1=value attr2=value />
  var regexpForEqualVal=/(\s*\w+\s*)=.*/i;                                                   //link=1=1


 if(regexpforHTMLTag2.test(strVal) || regexpforHTMLTag1.test(strVal) || 
	regexpforXMLTag.test(strVal) || regexpForEqualVal.test(strVal) || !sqlInjection(strVal))
 {
   return false;
 }
 else
 {
   return true;
 }
}

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

function securityCheck(id)
{
   var str = document.getElementById(id).value;
   if(checkForCSS(str) && sqlInjection(str))
	   return true;
   else
	   return false;
}

function checkMand(id)
{
	var type = null;
	try
	{
		type =document.getElementById(id).type.toLowerCase();
	}
	catch(e)
	{
		alert('Javascript Exception Please Contact Administrator.');
	}

	if(type=='radio' || type=='checkbox')
	{	
		
		 try{
		 temp=id;
		 var i;
		 var buttonGroup=document.getElementById(temp);

		 var disabledCount=0;
		 for (i=1; i<500; i++) 

		 {
			if(buttonGroup.disabled)
			{
				disabledCount++;
				temp=id.substring(0,id.length-1)+i;
            	buttonGroup=document.getElementById(temp);	
			}
			
         	if (buttonGroup.checked) 
         	{
            	return true;
         	}
            else
            {
            	temp=id.substring(0,id.length-1)+i;
            	buttonGroup=document.getElementById(temp);	
            }
         	
          }
      	}
      	catch(E )
            	{
      				if(disabledCount==i)
      					return true;
            		return false;
    			}
			return false;
	}
	else if(type=='select-one')
	{
		if(document.getElementById(id).selectedIndex==0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		var FinalVal=trimStr(document.getElementById(id).value);
		if(FinalVal==null || FinalVal=='')
			return false;
		else
			return true;
	}
}

function checkLength(id,length)
{
	if(document.getElementById(id).value.length==length)
		return true;
	else
		return false;
}

function checkMinLength(id,length)
{
	if(document.getElementById(id).value.length>=length)
		return true;
	else
		return false;
}

function checkMaxLength(id,length)
{
	if(document.getElementById(id).value.length<=length)
		return true;
	else
		return false;
}

function checkMinMaxLength(id,minln,maxln)
{
	if(checkMinLength(id,minln) && checkMaxLength(id,maxln))
		return true;
	else
		return false;
}
function checkRegEx(id,regExp)
{
	var testRegEx=regExp.split('|');
	var rtnVal=false;
	for(r=0;r<testRegEx.length;r++)
	{
		var testReg=new RegExp(testRegEx[r]);
		rtnVal= testReg.test(document.getElementById(id).value);
		if(rtnVal)
			break;
	}
	return rtnVal;
}
function isEmail(id) 
{
	var setReturn;
	var string= document.getElementById(id).value;
		if(string!='')
		{
			//if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+(\.|-)?([A-Za-z0-9]+)*(\.)?([A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}$/) != -1)
			//if (string.search(/^\w+((-\w+)|(\.\w+))*\@(([a-zA-Z0-9\-])+\.)+(([a-zA-Z0-9])+\.){0,2}[A-Za-z0-9]{2,4}$/) != -1)
			//if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+(\.|-)?([A-Za-z0-9]+\.){0,1}([A-Za-z0-9]+\.)[A-Za-z0-9]{2,4}$/) != -1)
			//if (string.search(/^\w+((-\w+)|(\.\w+)|(\&\w+))*\@[A-Za-z0-9]+(\.|-)?([A-Za-z0-9]+\.){0,1}([A-Za-z0-9]+\.)[A-Za-z0-9]{2,4}$/) != -1)
            //rejex changed by Margi with refrence of suggestion of no limit of adding character after dot(.)
			if (string.search(/^([\w-&amp;\.]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,})$/) != -1)
				
			setReturn = true;
			else
				setReturn = false;
		}
		return setReturn;
}


function isValNumeric(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	str1='0123456789.';
	 
	if(securityCheck(id))
	{ 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	        return false;
	      }
	    }
	    
    return true;
	}
	else
	{
    return false;
	}
}
function isContactNo(id) 
{
	var rtnVal=false;
	var testReg=new RegExp('^(?=.*[1-9])\\d*\\.?\\d*$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;	 
}
function isUrl(id) 
{
	// (?:https?:\/\/)? - makes http:// or https:// optional
	// \/ allows forward slash in the url which is escaped using back slash.
	var tomatch= /^(?:https?:\/\/)?([a-z0-9\.-\/]{3,}\.[a-z]{3})/
    if (tomatch.test(document.getElementById(id).value.toLowerCase()))
    {
	    return true;
	}
	else
	{
		return false;
	}   
}

function isValOnlyBoolean(id)
{
	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	str1='01';

	if(securityCheck(id))
	{
		for(i=0;i<len;i++)
		{
			if((str1.indexOf(str.charAt(i)))==-1)
			{
				return false;
			}
		}

		return true;
	}
	else
	{
		return false;
	}
} 

function isValOnlyNumeric(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	str1='0123456789';
	 
	if(securityCheck(id))
	{ 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	        return false;
	      }
	    }
	    
    return true;
	}
	else
	{
    return false;
	}
}
//'^(-?[0-9][0-9,]*(\.[0-9]{2})?)$' 
// for negative and positive amount
function isCurrency(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^(-?[0-9][0-9,]*(\.[0-9]{2})?)$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
}
//^([0-9][0-9,]*(\.[0-9]{2})?)$   
//Only positive amount
function isAmount(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^([0-9][0-9,]*(\.[0-9]{2})?)$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} 
function isAlphaWithDot(id){
	var rtnVal=false;
	var testReg=new RegExp('(^([A-Za-z]+([\.]?[A-Za-z ]+)*([\.]{0,1})))$');
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
}

//To ensure correct input of any description type to text area
function isDescription(id){
	var rtnVal=false;
	var testReg=new RegExp('^[A-Za-z0-9\\s\\(\\)\\[\\]\\;:.,\/_@\\\'?\\"\\-&%]*$');
	//var testReg=new RegExp('^[A-Za-z0-9\\s\\(\\)\\[\\]\\;:.,/_@\\\'?\\"\\-&%]*$');
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
}

function isAlpha(id)
{
	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i))) == -1)
	      {
	            return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}
function isValAlphaNumeric(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-_,/ .\n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	           return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValAlphaNumericBRG(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	           return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValOnlyAlphaNumeric(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	            return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}
function isValAlphaNumericWithoutSpace(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	            return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValAlphaNumericWthSpcChara(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-,/ .\n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValAlphaNumericWthSpcCharaRem(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-,/ .\n\'%&\\?()@*+';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}


function isValAlphaNumericWthSpcCharaCity(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-,/() .\n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValAlphaNumericWthSpcCharaEmp(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-,/& .\n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValAlphaNumericWthSpcCharForName(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789(-)/,\'.&';  
	
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

function isValAlphaNumericWthDot(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/ .\n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}
function isVatWhtInvoiceNo(control)
{
	var iChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 /-:";
	var value="";
	var valid=true;
	for (var i=0; i<control.value.length;i++) {              
		if (iChars.indexOf(control.value.charAt(i))!=-1) {
			value=value+control.value.charAt(i);
		}               
		else{                 
			valid=false;
		}
	}                   
	if(!valid){              
		control.value="";
		control.focus();
		return false;
	}
	return true;           
}

function isBussNameWithSpecialChrs(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	//Commented on 19/02/2014 for sync of code and error messages in TRE validations
    //str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-_,/ .\n'()&\"#$!{}|`%"; 
	//End
    str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/:-._,& ()+'\n"; 
   // if(securityCheck(id))
	 // { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  //}
	  //else
	  //{    
	    //return false;
	  //}
}

//Added by Nidhi

function isBussinessNameWithSpecialCharacters(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	
    str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:-_,/ \\.\n'()&\"#$!{}|`%+"; 
  
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;	  
}

function isAlphaNumericWithAllSpecChr(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	//
    //str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[];:-,/ .\n_\'&"%@'; 
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[];:.,/ _@\'"\-&%'; 
   // if(securityCheck(id))
	 // { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  //}
	  //else
	  //{    
	    //return false;
	  //}
}

// vehicle registration number  isVehicleRegistrationNumberWithSpecChar
function isVehicleRegistrationNumber(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^[a-zA-Z0-9-.\n ]*$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} 
//isVehicleRegistrationNumberWithSpecChar 
function isVehicleRegistrationNumberWithSpecChar(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^[A-Za-z0-9\-\s,.:\/]*$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} 

//isAccountNamewithspecchar 
/*function isAccountNamewithspecchar(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^[A-Z0-9a-z|\(\)&amp;\'\-|\d|\s\;.,\\/]*$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} */


function isAccountNamewithspecchar(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789.()&\'-;,|/";  
  
//	if(securityCheck(id)) ()&'-
//	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	//  }
	 /* else
	  {    
	    return false;
	  }*/
}//SWIFT code 
/*function isValSwiftCode(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^([A-Za-z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} */

function isValSwiftCode(id)
{	
	var rtnVal=false;
	//var testReg=new RegExp('^([A-Za-z]{8})?)$');
	var testReg=new RegExp('([A-Za-z]{8})');
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} 

//ack no
function isValAckNo(id)
{
	var rtnVal=false;
	var testReg=new RegExp('(KRA)[0-9]{12}'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
}
function isValAlphaNumericWthSpcCharaWithSquareBracket(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_[]-/ \n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}

//added by Margi for Validate NSSF Number Field
function isValNumericAlphacharaX(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='0123456789X\n';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}
function isValAlphaNumericWthSpcCharaForTaxRepReg(id)
{	
	var rtnVal=false;
	var testReg = new RegExp(/^([A-Za-z0-9\s\@\'&%,.:_()\-\\\//])*$/);

	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
}

function isInvoiceNumberBadDebt(id)
{	
	var rtnVal=false;
	var testReg=new RegExp('^[A-Za-z0-9\\-\\s.:,\\/\']*$'); 
	rtnVal= testReg.test(document.getElementById(id).value);
	return rtnVal;
} 

function validateFormFieldOnEvent(id,jsonObj)
{
		AdFormJson=jsonObj;
		var formJson=findRule(AdFormJson,id);
		isValid = validateField(formJson,id);
		try
		{
			//getErrTabToggle();
		}
		catch(e)
		{}
		return isValid;
}	


function validateField(formJson,id)
{
		document.getElementById(id).value=trimStr(document.getElementById(id).value);
		if(formJson)
		{
			var toolTip=document.getElementById(id);
			var hdr=formJson.dispName;
			var perform=false;
			var addError=null;
			
			if(formJson.dependent!=null)
			{
				var ids=formJson.dependent[0].ids;
				var end=0;
				var savePre=0;
				var id1=new Array();
				var val=new Array();
				var id2=new Array();
				var req=new Array();
				id2=ids.split(",");
				var i=0;
				var k=0;
				var j;
				var values=formJson.dependent[0].values;
				var type ;
				var orAnd=new Array();
				
				if(values!=null && values!="")
				{
					while(end>-1)
					{
						if(end==0)
							savePre=end;
						else
							savePre=end+1;
						end=ids.indexOf('&',savePre);
						
						if(end>-1)
						{
						 id1[i]=ids.substring(savePre,end);
						 orAnd[i++]='and';
						}
						else
						{
						 end=ids.indexOf('|',savePre);
						 if(end>-1)
						 {
						 	 id1[i]=ids.substring(savePre,end);
						 	 orAnd[i++]='or';
						 }
						}
					}
					id1[i]=ids.substring(savePre,ids.length);
					orAnd[i++]='not';
					end=0;
					val=values.split(',');
					k=val.length;
					for(j=0;j<k;j++)			
					{
						type = document.getElementById(id1[j]).type.toLowerCase();
						if(type=='radio' || type=='checkbox')
						{
							if(rtnChkRadioNo(id1[j],val[j]))
							{
							   
								if(j==0)
								{
									perform=true;
									continue;
								}
								else if(orAnd[j]=='not')
								{
									perform=true;
									break;
								}
								else if(orAnd[j]=='or')
								{
									perform=true;
									break;
								}
								else if(orAnd[j]=='and')
								{
									perform=true;
									continue;
								}
							}
							else
							{
							    if(orAnd[j]=='or')
								{
									perform=false;
									continue;
								}
								else
								{	
									perform =false;
									break;
								}
							}
						}	
						else 	
						{
							if(document.getElementById(id1[j]).value.toLowerCase()==val[j].toLowerCase())
							{
								
								if(orAnd[j]=='not')
								{
									perform=true;
									break;
								}
								else if(orAnd[j]=='or')
								{
									perform=true;
									break;
								}
								else if(orAnd[j]=='and')
								{
									perform=true;
									continue;
								}
							}
							else
							{
								if(orAnd[j]=='or')
								{
									perform=false;
									continue;
								}
								else
								{	
									perform =false;
									break;
								}
							}
						}		
					}
				}
				if(formJson.dependent[0].required!=null)
				{
					req=(formJson.dependent[0].required).split(",");
					for(r=0;r<id2.length;r++)
					{
						if(req[r].toLowerCase()=='y')
						{
							if(checkMand(id2[r]))
								perform=true;
							else
								break;
						}
						else
						{
							if(!checkMand(id2[r]))
								perform=true;
							else
								break;
						}
					}
				}
				if(perform)
				{
					formJson=formJson.dependent[0].rule[0];
				}
				else
				{
					document.getElementById(id).style.backgroundColor=defaultColor;
					toolTip.removeAttribute('title');
					rmvDisEleFrmArray(id);
				}
			}
			if((formJson.required!=null) && formJson.required.toLowerCase()=='n')
			{
					document.getElementById(id).style.backgroundColor=defaultColor;
					toolTip.removeAttribute('title');
					rmvDisEleFrmArray(id);
			}
			if((formJson.required!=null) && (formJson.required.toLowerCase()=='y'))
			{
				addError=new errorObjClass();
				addError.id=id;
				addError.linkId=setErrorID(id);
				addError.hdr=hdr;
				addError.isValidateOnIntrim='n';
				if(!(checkMand(id)))
				{
					
					setErrorBGColor(id);
					if(document.getElementById(id).type.toLowerCase()=='text' ||document.getElementById(id).type.toLowerCase()=='textarea' )
					{
						if(formJson.ErrMsg!=null)
						{
							toolTip.setAttribute('title',formJson.ErrMsg);
							addError.errMsg=formJson.ErrMsg;
						}
						else
						{
							toolTip.setAttribute('title','Please enter '+hdr+'');
							addError.errMsg='Please enter '+hdr;
						}
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
					}
					else
					{
						if(formJson.ErrMsg!=null)
						{
							toolTip.setAttribute('title',formJson.ErrMsg);
							addError.errMsg=formJson.ErrMsg;
						}
						else
						{
							toolTip.setAttribute('title','Please select '+hdr+'');
							addError.errMsg='Please select '+hdr;
						}
							
						addError.errMsg='Please select '+hdr;
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
					}
					
					return false;
				}
				else
				{
					document.getElementById(id).style.backgroundColor=defaultColor;
					toolTip.removeAttribute('title');
					addError.errMsg='Please select '+hdr;
					rmvEleFrmArray(addError);
					addError.errMsg='Please enter '+hdr;
					rmvEleFrmArray(addError);
				}
				
			}
			
			if(formJson.group!=null)
			{
				if(formJson.group.toLowerCase()=='v')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					if(!vgroupValidate(id))
					{
						if(formJson.ErrMsg!=null)
						{
							toolTip.setAttribute('title',formJson.ErrMsg);
							addError.errMsg=formJson.ErrMsg;
						}
						else
						{
							toolTip.setAttribute('title','Please enter '+hdr+'');
							addError.errMsg='Please enter '+hdr;
						}
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						addError.errMsg='Please enter '+hdr;
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.group.toLowerCase()=='h')
				{
					if(!hgroupValidate(id))
					{
						if(formJson.ErrMsg!=null)
						{
							toolTip.setAttribute('title',formJson.ErrMsg);
							addError.errMsg=formJson.ErrMsg;
						}
						else
						{
							toolTip.setAttribute('title','Please enter'+hdr+'');
							addError.errMsg='Please enter '+hdr;
						}
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						addError.errMsg='Please enter '+hdr;
						rmvEleFrmArray(addError);
					}
				}
			}
			if(formJson.type!=null && getVal(id)!=null && getVal(id)!="")
			{
				if(formJson.type.toLowerCase()=='numeric')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter only numeric value';
					if(formJson.ErrMsg!=null)
					{
							addError.errMsg=formJson.ErrMsg;
					}
					else
					{
							addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: 0-9 and Dot)';
					}
					var res = isValNumeric(id);
					if(!res)
					{
						if(formJson.ErrMsg!=null)
						{
							toolTip.setAttribute('title',formJson.ErrMsg);
						}
						else
						{
							toolTip.setAttribute('title','Please enter valid '+hdr+'.(Allowed character set: 0-9 and Dot)');
						}
						setErrorBGColor(id);
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;	
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
						
						if(formJson.minVal!=null)
						{
							var minVal= parseInt(formJson.minVal);
							addError=new errorObjClass();
							addError.hdr=hdr;
							if(formJson.ErrMsg!=null)
							{
									addError.errMsg=formJson.ErrMsg;
							}
							else
							{
								addError.errMsg='Please enter value of '+hdr+' greater than '+ minVal;
							}
							
							if(!(chkMinVal(id,minVal)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please enter value of '+hdr+' greater than '+ minVal +'');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
						if(formJson.maxVal!=null)
						{
							var maxVal= parseInt(formJson.maxVal);
							addError=new errorObjClass();
							addError.id=id;
							addError.linkId=setErrorID(id);
							addError.hdr=hdr;
							if(formJson.ErrMsg!=null)
							{
									addError.errMsg=formJson.ErrMsg;
							}
							else
							{
								addError.errMsg='Please provide value of '+hdr+' less than '+ maxVal;
							}
							
							
							if(!(chkMaxVal(id,maxVal)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide value less than '+ maxVal +'.');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
								
					}
				}
				else if(formJson.type.toLowerCase()=='alpha')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z and white space)';
					if(!(isAlpha(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide character value only.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='onlynumeric')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: 0-9)';
					if(!(isValOnlyNumeric(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please Provide Only Numeric Value.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='currency')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: 0-9,. and comma)';
					if(!(isCurrency(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please Provide Valid Currency Value');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
						
						if(formJson.minVal!=null)
						{
							var minValCur = parseInt(formJson.minVal);
							addError=new errorObjClass();
							addError.hdr=hdr;
							if(formJson.ErrMsg!=null)
							{
									addError.errMsg=formJson.ErrMsg;
							}
							else
							{
								addError.errMsg='Please provide value of '+hdr+' greater than '+ minValCur;
							}
							
							if(!(chkMinVal(id,minValCur)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide value of '+hdr+' greater than '+ minValCur +'');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
						if(formJson.maxVal!=null)
						{
							var maxValCur = parseInt(formJson.maxVal);
							addError=new errorObjClass();
							addError.id=id;
							addError.linkId=setErrorID(id);
							addError.hdr=hdr;
							if(formJson.ErrMsg!=null)
							{
									addError.errMsg=formJson.ErrMsg;
							}
							else
							{
								addError.errMsg='Please provide value of '+hdr+' less than 15 Digits';
							}
							
							
							if(!(chkMaxVal(id,maxValCur)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide value less than 15 Digits.');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
					}
				}
				else if(formJson.type.toLowerCase()=='alphadot')
				{	
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z and dot)';
					
					if(!(isAlphaWithDot(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please Provide Valid Alphabetic Value.(Allowed character set: A-Z and dot)');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='description')
				{	
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					
					addError.errMsg='Please Provide Proper Value Only For '+hdr+'.';
					if(!(isDescription(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please Provide Proper Value');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumeric')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,\,.,comma and white space)';
					if(!(isValAlphaNumeric(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value only.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericBRG')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/)';
					if(!(isValAlphaNumericBRG(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value only.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericwithoutspace')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z and 0-9)';
					if(!(isValAlphaNumericWithoutSpace(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric withoutspace value only.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='onlyalphanumeric')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9 and white space)';
					if(!(isValOnlyAlphaNumeric(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric(number and alphabets) value.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericspecialchara')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,.,comma and white space)';
					if(!(isValAlphaNumericWthSpcChara(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space , - . / : are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericspecialchararem')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,\\,:,-,.,\',%,&,(,),@,*,+,? comma and white space)';
					if(!(isValAlphaNumericWthSpcCharaRem(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space , - . / : \' % & \\ ( ) * + ? @ are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericspecialcharacity')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,.,(,),comma and white space)';
					if(!(isValAlphaNumericWthSpcCharaCity(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space , () - . / : are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericspecialcharaemp')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,.,&,comma and white space)';
					if(!(isValAlphaNumericWthSpcCharaEmp(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space , & - . / : are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				//added by Margi for Validate NSSF Number
				else if(formJson.type.toLowerCase()=='numericwithalphacharax')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: 0-9,X)';
					if(!(isValNumericAlphacharaX(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide numeric value.Only Alphabetic character X is allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
                // Added by Nidhi
				
				else if(formJson.type.toLowerCase()=='bussnamewithspecialcharacters')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,.,_,\,",#,$,{,},%,comma,&,(,),+,single quote and white space)';
					if(!(isBussinessNameWithSpecialCharacters(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please enter alphanumeric value.Only Special characters like /,:,-,.,_,\,",#,$,{,},%,comma,&,(,),+,single quote and white space are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='bussnamewithspecialchrs')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,.,_,comma,&,(,),+,single quote and white space)';
					if(!(isBussNameWithSpecialChrs(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please enter alphanumeric value.Only Special characters like /,:,-,.,_,comma,&,(,),+,single quote and white space are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericwithallapecchrs')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,;,:,-,.,&,(,),_,%,[,],single and double quotes,comma and white space)';
					if(!(isAlphaNumericWithAllSpecChr(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like /,:,-,.,&,(,),[,],-,%,;,single and double quotes,comma and white space are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='date')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+' in DD/MM/YYYY format.';
					if(!(isValidDate(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide valid date in DD/MM/YYYY format.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
					
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
						if(formJson.minVal!=null)
						{
							var minVal= formJson.minVal;
							addError.errMsg='Please provide '+hdr+' after or '+ minVal;
							if(!(minDate(id,minVal)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide Date after or '+ minVal +'');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
						if(formJson.maxVal!=null)
						{
							var maxVal= formJson.maxVal;
							addError.errMsg='Please provide '+hdr+' before or '+ maxVal;
							if(!(maxDate(id,maxVal)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide Date before or '+ maxVal +'.');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
				
				
					}
				}
				else if(formJson.type.toLowerCase()=='email')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr;
					if(!(isEmail(id)))
					{	
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please enter valid '+hdr);
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='contactno')
				{
					
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr;
					if(!(isContactNo(id)))
					{	
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please enter valid '+hdr);
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='url')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid url.';
					if(!(isUrl(id)))
					{	
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please enter valid url.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='amount')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: 0-9,. and comma)';
					if(!(isAmount(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please Provide Valid Currency Value');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
						
						if(formJson.minVal!=null)
						{
							var minValCur = parseInt(formJson.minVal);
							addError=new errorObjClass();
							addError.hdr=hdr;
							if(formJson.ErrMsg!=null)
							{
									addError.errMsg=formJson.ErrMsg;
							}
							else
							{
								addError.errMsg='Please provide value of '+hdr+' greater than '+ minValCur;
							}
							
							if(!(chkMinVal(id,minValCur)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide value of '+hdr+' greater than '+ minValCur +'');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
						if(formJson.maxVal!=null)
						{
							var maxValCur = parseInt(formJson.maxVal);
							addError=new errorObjClass();
							addError.id=id;
							addError.linkId=setErrorID(id);
							addError.hdr=hdr;
							if(formJson.ErrMsg!=null)
							{
									addError.errMsg=formJson.ErrMsg;
							}
							else
							{
								addError.errMsg='Please provide value of '+hdr+' less than 15 Digits';
							}
							
							
							if(!(chkMaxVal(id,maxValCur)))
							{	
								setErrorBGColor(id);
								toolTip.setAttribute('title','Please provide value less than 15 Digits.');
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
							else
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
						}	
					}
				}
				else if(formJson.type.toLowerCase()=='swiftcode')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					//addError.errMsg='Please enter valid '+hdr+'.(First 6 characters must be Alphabet and length should be 8 or 11 and allowed character set: A-Z,0-9)';
					addError.errMsg='Please enter valid '+hdr+'.(Length must be 8. Allowed character set: A-Z)';
					if(!(isValSwiftCode(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='vehicleregistrationnumber')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,-.)';
					if(!(isVehicleRegistrationNumber(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special character - and . is  allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='vehicleregistrationnumberwithspecchars')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: a-z,A-Z,0-9,-./:, and white space)';
					if(!(isVehicleRegistrationNumberWithSpecChar(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value with minimum of 4 and maximum 20 characters.Special characters like -,./: and white space are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='ackNo')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.';
					if(!(isValAckNo(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericwthspccharawithsquarebracket')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,_,-[]comma and white space)';
					if(!(isValAlphaNumericWthSpcCharaWithSquareBracket(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space , - . / : []are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='descaddress')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,;,:,-,.,&amp;,(,),_,%,[,],single and double quotes,comma and white space and Maximum length: 200))';
					if(!(isDescription(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Single and Double Quotes, White Space , Comma, -, ., /, :, [] are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericwthdot')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/., and white space)';
					if(!(isValAlphaNumericWthDot(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space . / are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericSpcCharForName')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,(,-,),/,‘,.,&, comma and white space)';
					if(!(isValAlphaNumericWthSpcCharForName(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value. Only Special characters like Space (-)/,‘.& are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='remarkwithspicealchar')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg="Please enter valid "+hdr+".(Allowed character set: A-Z,a-z,0-9,',/,(,),Ampersand,-,%,@,?,.,;,: and white space)";
					if(!(isRemarkWithSpicalChar(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title',"Allowed character set: A-Z,a-z,0-9,',/,(,),Ampersand,-,%,@,?,.,;,: and white space.");
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='alphanumericspecialcharafortaxrepreg')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,0-9,/,:,-,.,@,&,(),%,single quote,comma and white space)';
					if(!(isValAlphaNumericWthSpcCharaForTaxRepReg(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like Space , @ & - . / : () % single quote are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='invoicenumberbaddebt')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg="Please enter valid "+hdr+".(Allowed character set: A-Z,a-z,0-9,-,',/,:)";
					if(!(isInvoiceNumberBadDebt(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title',"(Allowed character set: A-Z,a-z,0-9,-,',/,: and comma)");
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				else if(formJson.type.toLowerCase()=='accountnamewithchar')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg="Please enter valid "+hdr+".(Allowed character set: A-Z,a-z,0-9,.,-,',(,),/,|,;,Ampersand and white space.)";
					if(!(isAccountNamewithspecchar(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title',"(Allowed character set: A-Z,a-z,0-9,.,-,',(,),/,|,;,Ampersand and white space.)");
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				if(formJson.regEx!=null)
				{
						var regExp=formJson.regEx;
						addError=new errorObjClass();
						addError.id=id;
						addError.linkId=setErrorID(id);
						addError.hdr=hdr;
						if(formJson.ErrMsg!=null)
						{
							toolTip.setAttribute('title',formJson.ErrMsg);
							addError.errMsg=formJson.ErrMsg;
						}
						else
						{
							toolTip.setAttribute('title','Please provide proper value of '+hdr+'.');
							addError.errMsg='Please provide proper value of '+hdr+'.';
						}
						
						if(!(checkRegEx(id,regExp)))
						{
							if((formJson.required!=null) && formJson.required=='n'&&!checkMand(id))
							{
								document.getElementById(id).style.backgroundColor=defaultColor;
								toolTip.removeAttribute('title');
								rmvEleFrmArray(addError);
							}
							else
							{
								setErrorBGColor(id);
								rmvEleFrmArray(addError);
								errorListResult[incError++]=addError;
								refreshErrorList('errorTab');
								return false;
							}
						}
						else
						{
							document.getElementById(id).style.backgroundColor=defaultColor;
							toolTip.removeAttribute('title');
							rmvEleFrmArray(addError);
						}
				}
				if(formJson.maxLength!=null)
				{
						var maxLen= parseInt(formJson.maxLength);
						addError=new errorObjClass();
						addError.id=id;
						addError.linkId=setErrorID(id);
						addError.hdr=hdr;
						addError.errMsg='Please enter valid '+hdr+'.(Maximum length should be '+maxLen+')';
						if(!(checkMaxLength(id,maxLen)))
						{	
							setErrorBGColor(id);
							toolTip.setAttribute('title','Please enter valid '+hdr+'.(Maximum length should be '+maxLen+')');
							rmvEleFrmArray(addError);
							errorListResult[incError++]=addError;
							refreshErrorList('errorTab');
							return false;
						}
						else
						{
							document.getElementById(id).style.backgroundColor=defaultColor;
							toolTip.removeAttribute('title');
							rmvEleFrmArray(addError);
						}
				}
				if(formJson.minLength!=null)
				{
						var minLen= parseInt(formJson.minLength);
						addError=new errorObjClass();
						addError.id=id;
						addError.linkId=setErrorID(id);
						addError.hdr=hdr;
						addError.errMsg='Please enter valid '+hdr+'.(Minimum length should be '+minLen+')';
						if(!(checkMinLength(id,minLen)))
						{	
							setErrorBGColor(id);
							toolTip.setAttribute('title','Please enter valid '+hdr+'.(Minimum length should be '+minLen+')');
							rmvEleFrmArray(addError);
							errorListResult[incError++]=addError;
							refreshErrorList('errorTab');
							return false;
						}
						else
						{
							document.getElementById(id).style.backgroundColor=defaultColor;
							toolTip.removeAttribute('title');
							rmvEleFrmArray(addError);
						}
				}
				else if(formJson.type.toLowerCase()=='alphanumericspecialcharatss')
				{
					addError=new errorObjClass();
					addError.id=id;
					addError.linkId=setErrorID(id);
					addError.hdr=hdr;
					addError.errMsg='Please enter valid '+hdr+'.(Allowed character set: A-Z,a-z,0-9,%,&,,,-,.])';
					if(!(isValAlphaNumericDescTSS(id)))
					{
						setErrorBGColor(id);
						toolTip.setAttribute('title','Please provide alphanumeric value.Only Special characters like % & , - . ] are allowed.');
						rmvEleFrmArray(addError);
						errorListResult[incError++]=addError;
						refreshErrorList('errorTab');
						return false;
					}
					else
					{
						document.getElementById(id).style.backgroundColor=defaultColor;
						toolTip.removeAttribute('title');
						rmvEleFrmArray(addError);
					}
				}
				
			}
			
		
		}
		return true;	
}

function rtnChkRadioNo(id,val)
{
		var temp=id;

		 try{
		 var buttonGroup=document.getElementById(temp);
		 for (var i=2; i<500; i++) 
		 {
         	if (buttonGroup.checked) 
         	{
            	return buttonGroup.value.toLowerCase()==val.toLowerCase()?true:false;
            }
            else
            {            	
            	temp=id.substring(0,id.length-1)+i;
            	buttonGroup=document.getElementById(temp);
            }
          }
      	}
      	catch(E)
            	{
            		return false;
    			}
			return false;
}

function findRule(formJson,id)
{
		var i;
		var lengthJson=formJson.field.length;
		for(i=0;i<lengthJson;i++)
		{
			if(formJson.field[i].name.toLowerCase()==id.toLowerCase())
			{
				return formJson.field[i].rule[0];
			}
			
		}
		return false;
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

function disableElements(elementObj) 
{
    try {    
			 if(!(elementObj.disabled))
            {
            	rmvDisEleFrmArray(elementObj.id);
            }
            elementObj.disabled =  elementObj.disabled?false:true;  
    }
    catch(E){
    }
    if (elementObj.childNodes && elementObj.childNodes.length > 0) 
    {
        for (var x = 0; x < elementObj.childNodes.length; x++) {
            disableElements(elementObj.childNodes[x]);
        }
    }
}
function minDate(dateVal,minDate)
{
    var str1 = document.getElementById(dateVal).value; 
    var str2 = minDate; 
    var dt1  = parseInt(str1.substring(0,2),10); 
    var mon1 = parseInt(str1.substring(3,5),10); 
    var yr1  = parseInt(str1.substring(6,10),10); 
    var dt2  = parseInt(str2.substring(0,2),10); 
    var mon2 = parseInt(str2.substring(3,5),10); 
    var yr2  = parseInt(str2.substring(6,10),10); 
    var date = new Date(yr1, mon1, dt1); 
    var minimum = new Date(yr2, mon2, dt2); 

    if(date >= minimum) 
        return true;
    else 
        return false;

}
function maxDate(dateVal,maxDate)
{
    var str1 = document.getElementById(dateVal).value; 
    var str2 = maxDate; 
    var dt1  = parseInt(str1.substring(0,2),10); 
    var mon1 = parseInt(str1.substring(3,5),10); 
    var yr1  = parseInt(str1.substring(6,10),10); 
    var dt2  = parseInt(str2.substring(0,2),10); 
    var mon2 = parseInt(str2.substring(3,5),10); 
    var yr2  = parseInt(str2.substring(6,10),10); 
    var date = new Date(yr1, mon1, dt1); 
    var maximum = new Date(yr2, mon2, dt2); 
    if(date <= maximum) 
        return true;
    else 
        return false;

}
function isEqual(firstDt,secondDt)
{
	var val1;
    var val2;
    var k = firstDt.indexOf("/");
    var t = firstDt.indexOf("/",3);     
    val1 = firstDt.substr(k+1,t-k-1) +"/"+firstDt.substr(0,k)+"/"+firstDt.substr(t+1,firstDt.length);
      
	k = secondDt.indexOf("/");
	t = secondDt.indexOf("/",3);
	val2 = secondDt.substr(k+1,t-k-1) +"/"+secondDt.substr(0,k)+"/"+secondDt.substr(t+1,secondDt.length);
	
    if (Date.parse(val1) == Date.parse(val2)){
        return true;
    }else{
        return false;
    }
}
function isSlashDtFrmt(dt){
	if(null!=dt.value && dt.value!=""){
		var idx=dt.value.indexOf("/");
		if(idx==-1){
			alert('please enter date in dd/mm/yyyy format');
			dt.value="";
			return false;
		}
		return true;
	}	
}
function isValidDate(id) 
{
  	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var datefield = getVal(id);
	if(trimStr(datefield)=="" ||null==trimStr(datefield))
		return true;
	var strSeparatorArray = new Array('-',' ','/','.');
	var intElementNr;
	var err = 0;
        var curdate=new Date();
         var comparedate;
	var strMonthArray = new Array(12);
	strMonthArray[0] = 'Jan';
	strMonthArray[1] = 'Feb';
	strMonthArray[2] = 'Mar';
	strMonthArray[3] = 'Apr';
	strMonthArray[4] = 'May';
	strMonthArray[5] = 'Jun';
	strMonthArray[6] = 'Jul';
	strMonthArray[7] = 'Aug';
	strMonthArray[8] = 'Sep';
	strMonthArray[9] = 'Oct';
	strMonthArray[10] = 'Nov';
	strMonthArray[11] = 'Dec';
	strDate = trimStr(datefield);
    
 	if (strDate.length <= 5 || strDate.length>10) 
 	{
	return false;
	}
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) 
	{
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) 
		{
		strDateArray = strDate.split(strSeparatorArray[intElementNr]);
		if (strDateArray.length != 3) 
		{
		err = 1;
		return false;
		}
		else 
		{
		strDay = strDateArray[0];
		strMonth = strDateArray[1];
		strYear = strDateArray[2];
		}
		booFound = true;
	 	  }
	}
	if (booFound == false)
	{	
//		if (strDate.length>5)
//		{
//		strDay = strDate.substr(0, 2);
//		strMonth = strDate.substr(2, 2);
//		strYear = strDate.substr(4);
//		}
	return false;
	}
      

   if (strYear.length == 3 || strYear.length>4)
   {
	   return false;
   }
        
	if (strYear.length == 1) {
	strYear = '200' + strYear;
	} 
      
	if (strYear.length == 2) {
	strYear = '20' + strYear;
	}

	if (isNaN(strDay)) 
	{
		err = 2;
		return false;
	}
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) {
	err = 2;
	return false;
	}
	if (isNaN(strMonth)) 
	{
		err = 3;
		return false;
	}
	intMonth = parseInt(strMonth, 10);
	if(intMonth<10)
		intMonth='0'+intMonth;
	if (isNaN(intMonth)) 
	{
	for (i = 0;i<12;i++) 
	{
		if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) 
		{
			intMonth = i+1;
			strMonth = strMonthArray[i];
			i = 12;
	    }
	}
	}
	if (isNaN(strYear)) 
	{
		err = 4;
		return false;
	}
	intYear = parseInt(strYear, 10);
	if (intMonth>12 || intMonth<1) {
	err = 5;
	return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
	err = 6;
	return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
	err = 7;
	return false;
	}
	if (intMonth == 2) {
	if (intday < 1) {
	err = 8;
	return false;
	}
	if (LeapYear(intYear) == true) {
	if (intday > 29) {
	err = 9;
	return false;
	}
	}
	else {
	if (intday > 28) {
	err = 10;
	return false;
	}
	}
	}
     tempdate=intMonth+'/'+strDay+'/'+strYear;         
     datefield.value = strDay +'/'+intMonth+'/'+strYear;
       
	return true;
	}
	
	function LeapYear(intYear) {
	if (intYear % 100 == 0) {
	if (intYear % 400 == 0) { return true; }
	}
	else {
	if ((intYear % 4) == 0) { return true; }
	}
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
	
	function getMinDate(date1,date2)
	{
	    var str1 = date1; 
	    var str2 = date2; 
	    var dt1  = parseInt(str1.substring(0,2),10); 
	    var mon1 = parseInt(str1.substring(3,5),10); 
	    var yr1  = parseInt(str1.substring(6,10),10); 
	    var dt2  = parseInt(str2.substring(0,2),10); 
	    var mon2 = parseInt(str2.substring(3,5),10); 
	    var yr2  = parseInt(str2.substring(6,10),10); 
	    var date = new Date(yr1, mon1, dt1); 
	    var minimum = new Date(yr2, mon2, dt2); 

	    if(date >= minimum) 
	        return str2;
	    else 
	        return str1;

	}
	//java script function for pagination setting current page details
	function setCurrentPageDetails(compName)
	{
		if(document.getElementById("currentPage").value==""){return false;}
		if(document.getElementById("lastPage").value==""){return false;}
		if(compName=="Next"){
			if(document.getElementById("currentPage").value < document.getElementById("lastPage").value)
			{
				document.getElementById("currentPage").value++;
				return true;
			}else
			{
				alert("You are currently on last page");
				return false;
			}
		}
		if(compName=="Prev"){
			if(document.getElementById("currentPage").value > 1){
				document.getElementById("currentPage").value--;
				return true;
			}
			else
			{
				alert("You are currently on first page")
				return false;
			}
		}
		if(compName=="First"){
			if(document.getElementById("currentPage").value>1)
			{
				document.getElementById("currentPage").value=1;	
				return true;
			}else
			{
				alert("You are currently on first page");
				return false;
			}
			
		}
		if(compName=="Last"){
			if(document.getElementById("currentPage").value < document.getElementById("lastPage").value)
			{
				document.getElementById("currentPage").value=document.getElementById("lastPage").value;
				return true;	
			}else
			{
				alert("You are currently on last page");
				return false;
			}
			
		}
		return true;
	}
	//java script function used to check range of pages entered in the goto page text box
	function validatePageRange(lastPage)
	{
		if(parseInt(document.getElementById("txtGoToPage").value) > lastPage)
		{
			alert("please enter the page number in proper range");
			return false;
		}
		if(document.getElementById("txtGoToPage").value < 1)
		{
			alert("please enter the page number in proper range");
			return false;
		}
		return true;
	}	
	/**
	 * This Method will disabled or Enabled All The Elements Depend on the flag value
	 * If Flag value is true than this method will disabled all the elements and if false
	 * than enabled all the elements.
	 * If You want to enabled/disabled whole part than just pass the parent tag Id
	 * @param elementObj
	 * @param disabledFlag
	 * @return
	 */ 
	function disabledElements(elementObj,disabledFlag) 
	{
		//alert("inside");
	 	try {   
	 			if(elementObj.type == 'textarea' || elementObj.type == 'text' || elementObj.type == 'select-one' || elementObj.type == 'submit' || elementObj.type == 'checkbox' || elementObj.type == 'radio' || elementObj.type == 'button'  || null!=elementObj.href)
	 			{
	 				elementObj.disabled=disabledFlag;
	 			}
	 	}
	    catch(E){
	    }
	    if (elementObj.childNodes && elementObj.childNodes.length > 0) 
	    {	    	
	    	for (var x = 0; x < elementObj.childNodes.length; x++) {
	    		disabledElements(elementObj.childNodes[x],disabledFlag);
	        }
	    }
	}
	
	//--------Added Mitul Shah-------------
	/**
	 * This Method will Clear all fields of forms
	 * This method will reset textboxes , checkboxes, textAreas,
	 *  RadioButtons , hidden values , dropdown boxes
	 */ 
	
	function clearAll()
	{
		var texts=document.getElementsByTagName('input');
		for (var i_tem = 0; i_tem < texts.length; i_tem++)
		{
			if (texts[i_tem].type=='text')
			{
				texts[i_tem].value='';
			}
			else if (texts[i_tem].type=='checkbox')
			{
				texts[i_tem].checked=false;
			}
			else if (texts[i_tem].type=='radio')
			{
				texts[i_tem].checked=false;
			}
			else if (texts[i_tem].id.indexOf('_hidden')!=-1)
			{	
				texts[i_tem].value='';
			}
			
		}
		
		var textArea=document.getElementsByTagName('textarea');
		for (var index = 0; index < textArea.length; index++)
		{
			textArea[index].value = '';
		}
		
		
		var dropdown=document.getElementsByTagName('select');
		for (var i = 0; i < dropdown.length; i++)
		{
			dropdown[index].selectedIndex=0;
		}
		
		//Ended Mitul Shah
		
	}
	
	/*
	 * function to check age according to date of birth
	 * added by prakhar chaubey
	 */
	
	function ageValidation(dobId,ageLimit)
	{
		dob=document.getElementById(dobId).value;
		var arrdate = dob.split('-');
		var dobDate=arrdate[0];
		var dobMon=arrdate[1];
		var dobYear=arrdate[2];
		
		currDate = new Date();
		currYear=currDate.getFullYear();
		currMon=currDate.getMonth();
		currDate=currDate.getDate();
		
		age=currYear-dobYear;
		if(dobMon<(currMon+1))
		{
			age=age-1;
		}else if(dobMon==(currMon+1))
		{
			if(dobDate<currDate)
			{
				age=age-1;
			}
		}
		if(age<ageLimit)
		{
			alert("Age should not be less than "+ageLimit+" years");
			document.getElementById(dobId).value="";
		}
		
	}
	 
	 
	 
	 /*
		 * function to check age according to date of birth
		 * added by prakhar chaubey
		 */
		
		function ageValidationForSlashFormat(dobId,ageLimit)
		{
			dob=document.getElementById(dobId).value;
			var arrdate = dob.split('/');
			var dobDate=arrdate[0];
			var dobMon=arrdate[1];
			var dobYear=arrdate[2];
			
			currDate = new Date();
			currYear=currDate.getFullYear();
			currMon=currDate.getMonth();
			currDate=currDate.getDate();
			
			age=currYear-dobYear;
			if((currMon+1)<dobMon)
			{
				age=age-1;
			}else if(dobMon==(currMon+1))
			{
				if(currDate<dobDate)
				{
					age=age-1;
				}
			}
			if(age<ageLimit)
			{
				alert("Age should not be less than "+ageLimit+" years");
				document.getElementById(dobId).value="";
				return false;
			}
			return true;
		}
	 
	 
	 
	 
	 /*
		 * function to check that age should be less than age limit.
		 * added by hardik kacholia
		 */
		function chkAge(dobId,ageLimit)
		{
			dob=document.getElementById(dobId).value;
			var arrdate = dob.split('/');
			var dobDate=arrdate[0];
			var dobMon=arrdate[1];
			var dobYear=arrdate[2];
			
			currDate = new Date();
			currYear=currDate.getFullYear();
			currMon=currDate.getMonth();
			currDate=currDate.getDate();
			
			age=currYear-dobYear;
			if((currMon+1)<dobMon)
			{
				age=age-1;
			}else if(dobMon==(currMon+1))
			{
				if(currDate<dobDate)
				{
					age=age-1;
				}
			}
			if(age>ageLimit)
			{
				alert("Age should not be greater than "+ageLimit+" years");
				document.getElementById(dobId).value="";
				return false;
			}
			return true;
		}
		
	
	/*
	 * function to allow future dates only 
	 * added by prakhar chaubey
	 */
	function allowFutureDateOnly(dateId)
	{ 
		 if(document.getElementById(dateId).value != '')
			{
				var serverDate=new Date();
				var curmonth=parseInt(serverDate.getMonth()+1);
				if(curmonth<10)
				{
					curmonth="0"+curmonth
				}
				var curyear=parseInt(serverDate.getFullYear());
				var curday=parseInt(serverDate.getDate());
				if(curday<10)
				{
					curday = "0"+curday;
				}
				var todayDate = curday+"-"+curmonth+"-"+curyear;
				
				if(futureDateCheck(dateId,todayDate))
				{
					return true;
				}
				else
				{
					alert("Date should not be past or today's date");                
					document.getElementById(dateId).value = ""; 
			        return false;
				}
			}
			return false;
	}
	
	/**
	 * function to allow Today And Past Date 
	 * added by prakhar chaubey
	 */
	
	 function allowTodayAndPastDate(dateId)
	 {
		if(document.getElementById(dateId).value != '')
		{
			var serverDate=new Date();
			var curmonth=parseInt(serverDate.getMonth()+1);
			if(curmonth<10)
			{
				curmonth="0"+curmonth
			}
			var curyear=parseInt(serverDate.getFullYear());
			var curday=parseInt(serverDate.getDate());
			if(curday<10)
			{
				curday = "0"+curday;
			}
			var todayDate = curday+"-"+curmonth+"-"+curyear;
			
			if(maxDate(dateId,todayDate))
			{
				return true;
			}
			else
			{
				alert("Date should not be future date");                
				document.getElementById(dateId).value = ""; 
		        return false;
			}
		}
		return false;
	}
	 function futureDateCheck(dateVal,maxDate)
	 {
	     var str1 = document.getElementById(dateVal).value; 
	     var str2 = maxDate; 
	     var dt1  = parseInt(str1.substring(0,2),10); 
	     var mon1 = parseInt(str1.substring(3,5),10); 
	     var yr1  = parseInt(str1.substring(6,10),10); 
	     var dt2  = parseInt(str2.substring(0,2),10); 
	     var mon2 = parseInt(str2.substring(3,5),10); 
	     var yr2  = parseInt(str2.substring(6,10),10); 
	     var date = new Date(yr1, mon1, dt1); 
	     var maximum = new Date(yr2, mon2, dt2); 
	     if(date > maximum) 
	         return true;
	     else 
	         return false;

	 }
	//added By tejas Patel
	 var frmSubmitFlag = 0;
	 var iSec = null;
	 function crtDynamicDivForSubmit(){
		 dv = document.createElement('div'); 
		 dv.setAttribute('id',"blankImage");    
		 dv.className="forBlankImageToBlur";
		 dv.innerHTML='&nbsp;';
		 dv1=document.createElement("div");
		 dv1.className="forAjaxImage";
		 dv1.innerHTML='&nbsp';
		 dv.appendChild(dv1);
		 document.forms[0].appendChild(dv);
		 }
	 /*function submitform(frmObj)
	 {  
	     if (frmSubmitFlag == 0)
	         {
	             crtDynamicDivForSubmit();
	             document.getElementById('blankImage').style.display = 'block';
	             frmSubmitFlag = 1;
	         }    
	 }*/
	 
	 	/*
		 * function to allow today and future dates only 
		 * added by prakhar chaubey
		 */
		function allowTodayAndFutureDateOnly(dateId)
		{ 
			 if(document.getElementById(dateId).value != '')
				{
					var serverDate=new Date();
					var curmonth=parseInt(serverDate.getMonth()+1);
					if(curmonth<10)
					{
						curmonth="0"+curmonth
					}
					var curyear=parseInt(serverDate.getFullYear());
					var curday=parseInt(serverDate.getDate());
					if(curday<10)
					{
						curday = "0"+curday;
					}
					var todayDate = curday+"-"+curmonth+"-"+curyear;
					
					if(todayAndFutureDateCheck(dateId,todayDate))
					{
						return true;
					}
					else
					{
						alert("Date should not be past date");                
						document.getElementById(dateId).value = ""; 
				        return false;
					}
				}
				return false;
		}
		function todayAndFutureDateCheck(dateVal,maxDate)
		 {
		     var str1 = document.getElementById(dateVal).value; 
		     var str2 = maxDate; 
		     var dt1  = parseInt(str1.substring(0,2),10); 
		     var mon1 = parseInt(str1.substring(3,5),10); 
		     var yr1  = parseInt(str1.substring(6,10),10); 
		     var dt2  = parseInt(str2.substring(0,2),10); 
		     var mon2 = parseInt(str2.substring(3,5),10); 
		     var yr2  = parseInt(str2.substring(6,10),10); 
		     var date = new Date(yr1, mon1, dt1); 
		     var maximum = new Date(yr2, mon2, dt2); 
		     if(date >= maximum) 
		         return true;
		     else 
		         return false;
		 }
	 
function addTitle(id)
{
	if(null!=id && "" != id)
	{
		var selObj = document.getElementById(id);
	
		if(null !=selObj && null != selObj.options && selObj.options.length > 0)
		{
			for (var i=0; i<selObj.options.length; i++) 
			{
				selObj.options[i].title=selObj.options[i].text;
			}
		}
	}
}
function loadEditor(context,textAreaId,isSaveButtonRequired,url){
	
	//alert('isSaveButtonRequired:'+isSaveButtonRequired);
	var mysettings = new WYSIWYG.Settings(); 
	
	mysettings.ImagesDir=context+mysettings.ImagesDir;
	//alert('mysettings:'+mysettings);
	//mysettings.ImagesDir =context+'/images/editorimages/';
	//mysettings.removeToolbarElement("insertimage");
	mysettings.removeToolbarElement("undo");
		mysettings.removeToolbarElement("redo");
		mysettings.removeToolbarElement("createlink");
		mysettings.removeToolbarElement("print");
	mysettings.removeToolbarElement("help");
	mysettings.removeToolbarElement("maximize");
	mysettings.removeToolbarElement("maximize");
	mysettings.removeToolbarElement("forecolor");
	mysettings.removeToolbarElement("backcolor");
	mysettings.removeToolbarElement("inserttable");
	mysettings.removeToolbarElement("insertimage");
	mysettings.removeToolbarElement("preview");
	mysettings.removeToolbarElement("removeformat");
	
	if(!isSaveButtonRequired){
		mysettings.removeToolbarElement("save");
	}else{
		mysettings.URL= url;
	}
	mysettings.removeToolbarElement("seperator");
		mysettings.Width = "100%"; 
	//alert('mysettings:'+mysettings);
		
	WYSIWYG.attach(textAreaId,mysettings);
	
}
var sUserInfo="";//variable to store user name
var iSessionTimeout;//variable to store sessionTimeOut
var iSessionTime="";
var sessionflag = true;
var sessionExpiredFlag = false;
//function to initialize variable used in showSessionTimeOut()function
function initSessionTimeOutVar(sUserInfoInput,iSessionTimeOutInput){
sUserInfo=sUserInfoInput;//user Name
iSessionTimeout=parseInt(iSessionTimeOutInput)*60;//time of session
ShowSessionTimeout();
}
function ShowSessionTimeout()
{
	
    var iSeconds=0;
    if(iSessionTime == "")
        iSessionTime = parseInt(iSessionTimeout/60);
       
    if (iSessionTimeout > 0)
    {
        iMinutes =  parseInt(iSessionTimeout/60);
        iSeconds =  iSessionTimeout%60;
        if(sUserInfo != "")
            window.status = sUserInfo + ". Your session will expire within " + iMinutes + " minute(s) and " + iSeconds + " second(s).";
        else
            window.status = "Your session will expire within " + iMinutes + " minute(s) and " + iSeconds + " second(s).";

        if(iMinutes == 2 && iSeconds == 0)
        {
            var dtCurr = new Date();
            var iSec = parseInt(dtCurr.getTime()/1000);
            var iMin = iSessionTime - iMinutes;
            alert("Dear User, you have not clicked on any link or button for the last " + iMin + " minutes. Please click on any link or button within next " + iMinutes + " minutes.");
            var dtCurrNew = new Date();
            /*var iSecNew = parseInt(dtCurrNew.getTime()/1000);
            var iDiff = iSecNew - iSec;
            if(iDiff > iSessionTimeout){
                iSessionTimeout = iSessionTimeout - iDiff;
            }else{
                iSessionTimeout = 1;
            }
            alert(iSessionTimeout);*/
        }
        iSessionTimeout = iSessionTimeout - 1;
        window.setTimeout("ShowSessionTimeout()", 1000);
    }
    else
    {
        window.status = sUserInfo + " Your session expired, Please log on afresh.";
        sessionExpiredFlag = true;
        document.forms["headerForm"].submit();
    }
}

function pastDateCheck(dateVal,maxDate)
{
    var str1 = document.getElementById(dateVal).value; 
    var str2 = maxDate; 
    var dt1  = parseInt(str1.substring(0,2),10); 
    var mon1 = parseInt(str1.substring(3,5),10); 
    var yr1  = parseInt(str1.substring(6,10),10); 
    var dt2  = parseInt(str2.substring(0,2),10); 
    var mon2 = parseInt(str2.substring(3,5),10); 
    var yr2  = parseInt(str2.substring(6,10),10); 
    var date = new Date(yr1, mon1, dt1); 
    var maximum = new Date(yr2, mon2, dt2); 
    if(date < maximum) 
        return true;
    else 
        return false;

}

function isRemarkWithSpicalChar(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 /()&-%\'@?.,;:; ";  
  
//	if(securityCheck(id))
//	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	//  }
	 /* else
	  {    
	    return false;
	  }*/
}


function accountNameWithChar(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789.()&\'-";  
  
//	if(securityCheck(id)) ()&'-
//	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	//  }
	 /* else
	  {    
	    return false;
	  }*/
}

/**
* This method is used for website/URL validation. 
* @author prakhar chaubey
* @param userUrl
*/
function validateWebsite(userUrl){
	if(null!=userUrl.value && userUrl.value!=''){
		var regUrl = /^(((http|https){1}(:[/][/]){1})((www.){1})|((www.){1}))[-a-zA-Z0-9@:%_\+.~#?&//=]+$/;
		if(!regUrl.test(userUrl.value)){
			alert("Please enter valid website URL.");
			userUrl.value='';
		}
	}
}

function validateFormFieldsOnIntrimSave()
{

for (var f = 0; f < arguments.length; f++) 
{
	try
	{
		AdFormJson=arguments[f];
//		alert(AdFormJson.field[0].name);
		for(var i=0;i<AdFormJson.field.length;i++)
		{
			var styleId = AdFormJson.field[i].name;
			AdFormJson.field[i].rule[0].required='n';
			var styleRule = AdFormJson.field[i].rule[0];
			if(document.getElementById(styleId).type.toLowerCase()=='radio')
				validateField(styleRule,styleId);
			else if(!(document.getElementById(styleId).disabled)&&!(document.getElementById(styleId).style.display=='none'))
				validateField(styleRule,styleId);
		}
	}
	catch(E){
//		alert('Exception Occurred');
		return false;
	}
}
	if(incError>0)
		return false;
	else 
		return true;
}
function isValNumericWithComma(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
	str1='0123456789.,';
	 
	if(securityCheck(id))
	{ 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	        return false;
	      }
	    }
	    
    return true;
	}
	else
	{
    return false;
	}
}
function isValAlphaNumericDescTSS(id)
{

	var len,str,str1,i;
	str=document.getElementById(id).value;
	len=str.length;
    str1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%&,-.]';  
  
	if(securityCheck(id))
	  { 
	    for(i=0;i<len;i++)
	    {
	      if((str1.indexOf(str.charAt(i)))==-1)
	      {
	    	  if(str.charCodeAt(i)==13)
	    		  continue;
	          return false;
	      }
	    }
	    return true;
	  }
	  else
	  {    
	    return false;
	  }
}
//--------commonValidation.js--------------------------ends here----------

//---------commonValidations.js-----------------------starts here--------
function checkForCSS(strVal)                                        
{ 

 //CSS - Cross site scripting                                     // Example are below for each regular expression
  var regexpforHTMLTag1=/(<|&#60|u003C)\s*(\S+)\s*[^>]*\s*(>|&#62|u003E)(.*)(<|&#60|U003C)\/\s*\2\s*(>|&#62|u003E)/i; //<script> <//script> <html> </html>
  var regexpforHTMLTag2=/(<|&#60|u003C)\s*(\S+)\s*([^>]*)\s*(>|&#62|u003E)/i;                //<font face="Arial, Serif" size="+2" color="red">
  var regexpforXMLTag=/((<|&#60|u003C).[^(><.)]+(>|&#62|u003E))/i;                           //<servlet-name attr1=value attr2=value />
  var regexpForEqualVal=/(\s*\w+\s*)=\1/i;                                                   //link=1=1

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
function validationRequired(field){

	if (field.type == "select-one") {
							var si = field.selectedIndex;
							if (si >= 0) {
								value = field.options[si].value;
								
							}
						} else {
							value = field.value;
						}
						
	if (trim(value).length == 0 || trim(value)=='select') {
		
		return false;
	}else{
		
		return true;
	}
}
function validateEmailv2(email)
{

// a very simple email validation checking. 
// you can add more complex email checking if it helps 
    if(email.length <= 0)
	{
	  return true;
	}
    var splitted = email.match("^(.+)@(.+)$");
    if(splitted == null) return false;
    if(splitted[1] != null )
    {
      var regexp_user=/^\"?[\w-_\.]*\"?$/;
      if(splitted[1].match(regexp_user) == null) return false;
    }
    if(splitted[2] != null)
    {
      var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
      if(splitted[2].match(regexp_domain) == null) 
      {
	    var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
	    if(splitted[2].match(regexp_ip) == null) return false;
      }// if
      return true;
    }
    return false;
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
/**
* The function isEmail checks for the validity of the email address
* the email address should be in the proper format
* ie., yourname@somebody.something. if email is not proper it alerts
* to enter the correct mail address.
*/
/*function isEmail(mail)
{
	if(mail.value!="")
	{
		email=mail.value
		len=mail.value.length-1
		s='@'
		p='.'
    q="\'";    
		s1=email.indexOf(s)
		//s2=email.indexOf(p)
		s2=email.lastIndexOf(p);
		
    s3=-1;
    s3=email.indexOf(q);
		if((s1<1)||(s1==len)||((s2-s1)==1)||(s2==len)||(s3!=-1) ||(s2<1)  )
		{
  		     alert("Please Enter Valid EMail id ")
           mail.value="";
           //mail.focus();
		     return false
		}
	}
	return true
}
*/


/*function isEmail(mail)
{
	//var amountRegExp=new RegExp(/(^\d{0,11}\.\d{1,2}$)|(^\d{0,13}$)/);
	var mailRegExp=new RegExp(/^([a-zA-Z]{1}[\w\-\.]*\@([\da-zA-Z\-]{1,}\.){1,}[\da-zA-Z\-]{2,4})$/);
	
	if(mail.value.length==0)
		return true;
    if(securityCheck(mail))
    {
    	var isValid=mailRegExp.test(mail.value);
    	if(isValid==false)
    	{
    		alert('Please Enter Valid EMail id .');
    		 mail.value="";
    		return false;
    	}
    	else 
    	{
    		
    		return true;
    	}
    }
    else
    {
    	 alert('Malicious Code Found. Please Enter valid data.');
    	 mail.value="";
    	 return false;
    }

}*/


/**
* The function isAlphaNumeric checks for the validity of the entered fields
* which should alphanumeric only. Other wise it alerts for proper valid data.
*/
function isAlphaNumeric(form1)
{
	var len,str,str1,i;
	len=form1.value.length;
	str=form1.value;
  str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-,.&!#() \n";  
  
  if(securityCheck(form1))
  { 
   
    for(i=0;i<len;i++)
    {
      if((str1.indexOf(str.charAt(i)))==-1)
      {
                   alert("Enter Alphabets or Numbers in the field");
         form1.value = "";
         //form1.focus();
               return false;
      }
    }
    return true
  }
  else
  {    
    alert('Malicious Code Found. Please Enter valid data.');
	form1.value = "";
    return false;
  }
}

 function isNumeric_WhiteSpace(form1)
{
	var len,str,str1,i
	len=form1.value.length
	str=form1.value
	str1=" 0123456789"
  if(securityCheck(form1))
  { 
   
    for(i=0;i<len;i++)
    {
      if((str1.indexOf(str.charAt(i)))==-1)
      {
           //alert("Please Enter Valild No");
          //          form1.value = "";
          //        form1.focus();
        return false;
      }
    }
    return true
  }
  else
  {
    alert('Malicious Code Found. Please Enter valid data.');
    return false;
  }
  
}
/**
* The function isNumeric checks for the validity of the entered fields
* which should numeric only. Other wise it alerts for proper valid data.
*/

function isNumeric(form1)
{
	var len,str,str1,i;
	len=form1.value.length;
	str=form1.value;
	str1="0123456789";
  if(securityCheck(form1))
  { 
   
    for(i=0;i<len;i++)
    {
      if((str1.indexOf(str.charAt(i)))==-1)
      {
        alert("Enter Numeric Data in this field");
        form1.value = "";
        form1.focus();
        return false;
      }
    }
    return true
  }
  else
  {
    alert('Malicious Code Found. Please Enter valid data.');
    form1.value = "";
    form1.focus();
    return false;
  }
  
}
function isNumeric_DecimalNegative(form1)
{
	var len,str,str1,i,dec_counter,newi
	len=form1.value.length
  newi=0;
  final_val = "";
	str=form1.value
  if(securityCheck(form1))
  { 
      if(str.charAt(i)=='-')
      {
        str = str.substr(1,len);
        newi=1;
      }
     
      str1="0123456789."
      dec_counter=0
      dec_set = 0;
      after_dec = 0;
      for(i=newi;i<len;i++)
      {
        if(dec_set==1)
        {
          after_dec++;
          if(after_dec>2)
          {
            final_val = str.substr(0,i);
            form1.value = final_val;
            alert("Only two digits are allowed after decimal");
            return true;
          }  
          
        }
        if(str.charAt(i)=='.')
        {
          if(dec_counter>0)
          {
            alert("Only one Decimal Point is allowed.");
            form1.value = "";
//            form1.focus();
            return false;
          } 
          else 
          {
            dec_counter++;
          }
          dec_set = 1;
        }
        if((str1.indexOf(str.charAt(i)))==-1)
        {
          alert("Enter Numeric Data in this field");
          form1.value = "";
          form1.focus();
          return false;
        }
      }
      if(dec_set==0)
      {
        if(len>11)
        {
          alert("Only 11 digits are allowed before decimal.");
          form1.value = "";
          form1.focus();
          return false;
        }
      } 
      return true
    }
    else
    {
      alert('Malicious Code Found. Please Enter valid data.');
      return false;
    }
}

function get_numeric(form1)
{
      var str=form1.value;
      len = form1.value.length;
      for(i=0;i<len;i++)
      {
        if(str.charAt(i) != "0" )
          break;
       
     } 
     if(str.charAt(i) == ".")
        i-=1;
      str = str.substr(i,len);
       return str
}



function isNumeric_Decimalround(form1)
{
	var len,str,str1,i,dec_counter
	len=form1.value.length
  final_val = "";
	str=form1.value
	str1="0123456789."
  dec_counter=0
  dec_set = 0;
  after_dec = 0;
  if(securityCheck(form1))
  { 
   
    //added by aditi to remove zeroes as prefix
    str = get_numeric(form1);
    len=str.length;
    for(i=0;i<len;i++)
    {
      if(dec_set==1)
      {
        after_dec++;
        if(after_dec>2)
        {
          final_val = str.substr(0,i);
          form1.value = final_val;
          alert("Only two digits are allowed after decimal.");
          return true;
        }  
        
      }
      if(str.charAt(i)=='.')
      {
        if(dec_counter>0)
        {
          alert("Only one Decimal Point is allowed.");
          form1.value = "";
//          form1.focus();
          return false;
        } 
        else 
        {
          dec_counter++;
        }
        dec_set = 1;
      }
      if((str1.indexOf(str.charAt(i)))==-1)
      {
        alert("Enter Numeric Data in this field");
        form1.value = "";
  //      form1.focus();
        return false;
      }
    }
    if(dec_set==0)
    {
      if(len>13)
      {
        alert("Only 13 digits are allowed before decimal");
        form1.value = "";
   //     form1.focus();
        return false;
      }
    } 
    form1.value = str;
    return true
  }
  else
  {
    alert('Malicious Code Found. Please Enter valid data.');
    return false;
  }
}
function isNumeric_Decimal(amount)
{
	//var amountRegExp=new RegExp(/(^\d{0,11}\.\d{1,2}$)|(^\d{0,13}$)/);
	var amountRegExp=new RegExp(/(^\d{0,12}\.\d{1,2}$)|(^\d{0,15}$)/);
    if(securityCheck(amount))
    {
    	var isValid=amountRegExp.test(amount.value);
    	if(isValid==false)
    	{
    		alert('Please enter numeric data with two decimal places');
    		return false;
    	}
    	else 
    	{
    		
    		return true;
    	}
    }
    else
    {
    	 alert('Malicious Code Found. Please Enter valid data.');
    	 return false;
    }

}


/**
* The function isAlpha checks for the validity of the entered fields
* which should characters only. Other wise it alerts for proper valid data.
*/
/*function isAlpha(form1)
{
              
	var len,str,str1,i;
	
	str=form1.value;
	len=form1.value.length;
	str=form1.value;
  if(securityCheck(form1))
  {  
    str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-,.\n "
    for(i=0;i<len;i++) 
          {
        if((str1.indexOf(str.charAt(i)))==-1)
        {
                        alert("Enter only alphabets in this field")
        form1.value = "";
        return false;
        }
    }          
    return true;
  }
  else
  {
    alert('Malicious Code Found. Please Enter valid data.');
    return false;
  }
}*/

/**
* The function isWebAdd checks for the validity of the entered fields
* which should in www.one.two only. Other wise it alerts for proper valid data.
*/
function isWebAdd(form2)
{
	if(form2.value!="")
	{
		var add=form2.value
		var len=add.length
		var p="."
		var s=add.indexOf(p)
		var s1=s+1
        var check=add.substring(0,3)
		var count=add.substring(s1,len)
		var count1=count.indexOf(p)
        if((s==0)||(add.charAt(len-1)==p)||(add.charAt(s)==add.charAt(s+1))||(count1==-1)||(check!="www"))
		{
            alert("Enter Web Address starting with www")
			
			return false
		}
	}
		return true
}

// whitespace characters only.
function isWhitespace (s)
{
    var i;

// whitespace characters
    var whitespace = " \t\n\r";	

    // Is s empty?
    if (isEmpty(s)) return true;

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);

        if (whitespace.indexOf(c) == -1) return false;
    }
    // All characters are whitespace.
    return true;
}


function isEmpty(s)
{   return ((s == null) || (s.length == 0))
}

/* THE BELOW JAVA SCRIPT FUNCTIONS ARE WRITTEN BY D.SRINIVAS . PLEASE DON'T TOUCH THE CODE WITHOUT INTIMATION */


//  FUNCTION clearing the all text areas the elements in the form 
var clearstatus=0;


/*//Added By Kunal
function checkMaxLength(field,maxlimit,comment){
	val = field.value;	
	if(val.length > maxlimit){
		alert(comment+" Length Should be less than "+maxlimit+" Characters");
		field.focus();
		return false;
	}
	return true;
}*/

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
//Added By Kunal
function fn_clear(a)
 {
 var lelecount=a.elements.length;
   var num=0;
 for( num=0;num<lelecount;num++)
  {
 if (a.elements[num].type=="text")
     {

    a.elements[num].value='';
     }
 if (a.elements[num].type=="select-one")
     {
      a.elements[num].selectedIndex=0;
     }
    
   }
   clearstatus=1;
 }


/* DATE VALIDATION
  
THIS BELOW FUNCTION CHECKS THE DATE WETHER IT IS CORRECT DATE OR NOT. 
INTERNALLY IT CALLS chkdate(objName) function  */

var tempdate;

function checkdate(objName) {
 
    var datefield = objName;
 
    if (chkdate(objName) == false) {
   // datefield.select();
    alert("The date is invalid.  Please try again.");
    datefield.value="";
  //  datefield.focus();
    return false;
    }
   else {
  return true;
   }
  }

function chkdate(objName) {
  	
  	//alert("in side the check date"+objName.value);
  	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var datefield = objName;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
        var curdate=new Date();
         var comparedate;
	var strMonthArray = new Array(12);
	strMonthArray[0] = "Jan";
	strMonthArray[1] = "Feb";
	strMonthArray[2] = "Mar";
	strMonthArray[3] = "Apr";
	strMonthArray[4] = "May";
	strMonthArray[5] = "Jun";
	strMonthArray[6] = "Jul";
	strMonthArray[7] = "Aug";
	strMonthArray[8] = "Sep";
	strMonthArray[9] = "Oct";
	strMonthArray[10] = "Nov";
	strMonthArray[11] = "Dec";
	strDate = datefield.value;
      
        

 	if (strDate.length <= 5 || strDate.length>10) {
	return false;
	}
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
	if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
	strDateArray = strDate.split(strSeparatorArray[intElementNr]);
	if (strDateArray.length != 3) {
	err = 1;
	return false;
	}
	else {
	strDay = strDateArray[0];
	strMonth = strDateArray[1];
	strYear = strDateArray[2];
	}
	booFound = true;
 	  }
	}
	if (booFound == false) {
	if (strDate.length>5) {
	strDay = strDate.substr(0, 2);
	strMonth = strDate.substr(2, 2);
	strYear = strDate.substr(4);
	   }
	}
      

        if (strYear.length == 3 || strYear.length>4) {
	return false;
	}
        
	if (strYear.length == 1) {
	strYear = '200' + strYear;
	} 
      
	if (strYear.length == 2) {
	strYear = '20' + strYear;
	}

  
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) {
	err = 2;
	return false;
	}
	intMonth = parseInt(strMonth, 10);
 if(intMonth<10)
 intMonth="0"+intMonth;
	if (isNaN(intMonth)) {
	for (i = 0;i<12;i++) {
	if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
	intMonth = i+1;
	strMonth = strMonthArray[i];
	i = 12;
	   }
	}
	if (isNaN(intMonth)) {
	err = 3;
	return false;
	   }
	}
	intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) {
	err = 4;
	return false;
	}
	if (intMonth>12 || intMonth<1) {
	err = 5;
	return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
	err = 6;
	return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
	err = 7;
	return false;
	}
	if (intMonth == 2) {
	if (intday < 1) {
	err = 8;
	return false;
	}
	if (LeapYear(intYear) == true) {
	if (intday > 29) {
	err = 9;
	return false;
	}
	}
	else {
	if (intday > 28) {
	err = 10;
	return false;
	}
	}
	}
  
     tempdate=intMonth+"/"+strDay+"/"+strYear;         
     datefield.value = strDay +"/"+intMonth+"/"+strYear;
       
	return true;
	}


	function LeapYear(intYear) {
	if (intYear % 100 == 0) {
	if (intYear % 400 == 0) { return true; }
	}
	else {
	if ((intYear % 4) == 0) { return true; }
	}
	return false;
	}


// THIS BELOW FUNCTION CHECKS WETHER ENTERED DATE IS BEFORE SYSDATE OR NOT

function doSysdateCheck(from)
{ 
 var passmonth;
var passyear;
var passday;     
 var curdate=new Date();
 var curmonth=parseInt(curdate.getMonth()+1);

 var curyear=parseInt(curdate.getYear());
 
 var curday=parseInt(curdate.getDate());
/* alert(" curmonth:"+curmonth);
  alert(" cur year:"+curyear);
   alert(" cur day:"+curday); */
 if (chkdate(from) == false)
    {
    alert("Please enter valid date.");
     return false;
     }
    else  
    {
    if (Date.parse(tempdate) > Date.parse(curdate))
        {
    // from.select();
      alert("Date must occur before Today's  date.");
   // from.focus();
    return false;
        }
      else
       { 
      return true;
       }
    
   } 
  
}

function fnCheckPastDt(form)
{
	if(fnCompareDates(form.value,getTodayDateAmend())==false)
	{
		alert('Date cannot be a Future Date.');
		form.value='';
		form.focus();
		return false;
	}
	return true;
}





/* This function used to door no validation */
/* changes in the door number srrln is done by Mayukh Mazumder */
function isdoorno(form1)
{
	var len,str,str1,i,chk
	len=form1.value.length
	str=form1.value

        str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-,.&!'#()/ "
	chk="true"
  for(i=0;i<len;i++)
	{
		if((str1.indexOf(str.charAt(i)))==-1)
		{
    	       chk="false"
                   //return false
		}
	}
  if(chk=="false")
  {
    alert("Enter Alphabets or Numbers\n or characters like -,.&!'#()/  in the field");
    form1.value="";
    form1.focus();
  }
  
	return true
}


/* start of  Functions written by Jayasheela */

// following function checks whether given is a leap year or not  
function leapYear(year)
{
  if (year % 4 == 0)
     return true;

  return false;
}

// following function gives no.of days in the given month of given year
function getDays(month,year)
{
    var ar = new Array(12)

    ar[0] = 31
    ar[1] = (leapYear(year)) ? 29 : 28 //February
    ar[2] = 31
    ar[3] = 30
    ar[4] = 31
    ar[5] = 30
    ar[6] = 31
    ar[7] = 31
    ar[8] = 30
    ar[9] = 31
    ar[10] = 30
    ar[11] = 31

   // return number of days in the specified month(parameter)
   return ar[month] 
}


/*  End of  functions written by jayasheela */



//Functions written by Harjot Singh Bambra
//Check for vaidation of Phone Number
function fn_ValidatePhone(phoneno)
{
	
	var len,str,str1,i
	len=phoneno.length
	str1="0123456789-"
	for(i=0;i<len;i++)
	{
		if((str1.indexOf(phoneno.charAt(i)))==-1)
		{
			alert("Enter Numeric Data in this field");
 	                return false;
		}
	}
	return true
}


//Validation Functions by Harjot Singh finish here


//  Removes the leading and trailing spaces
/*function trim(Field) 
{
    sString=Field.value;
    while (sString.substring(0,1) == ' ')
    {
    sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length-1, sString.length) == ' ')
    {
    sString = sString.substring(0,sString.length-1);
    }
  Field.value=sString;
}*/

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

//added by Mukta for name validation permitting only alphabatic value
function isAlphabatic(name)
{
	var len,str,str1,i;
	len=name.length;
	//str=form1.value;
   str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz \n";  
  

    for(i=0;i<len;i++)
    {
      if((str1.indexOf(name.charAt(i)))==-1)
      {
       name.value = "";
         //form1.focus();
               return false;
      }
    }
    return true;
 }
function isAlphabatic1(form)
{
	var len,str,str1,i;
	len=form.value.length;
	//str=form1.value;
   str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";  
  

    for(i=0;i<len;i++)
    {
      if((str1.indexOf(form.value.charAt(i)))==-1)
      {
    	  alert("Please enter alphabetic value, no special characters are allowed except space.");
    	  form.value = "";
         //form1.focus();
               return false;
      }
    }
    return true;
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

// THIS BELOW FUNCTION IS USED TO VALIDATE PAN 
function fn_validatePAN(k)
{
    var a,s;

    a=k.value;
    s=a.length;
 

    if (typeof a == "string")
       a = a.toUpperCase();
    
    k.value = a;

  for( var i=0;i<s;i++) 
   {
     if (".!@#$%^&*()+-".indexOf(a.charAt(i))!=-1)
     {
         alert("This field should not contain special characters. Enter Again");
         k.value="";
         break;
     }
  }
   
   if (s != 10 && s != 0)
   {
       alert("Please enter a Valid PAN of length 10 characters");
       k.value="";
       return false;
   }
   else
   { 
      if (s == 10)
      {
         
		 if (!fn_isAlphaValue(a.substring(0,5)) || !fn_isNumericValue(a.substring(5,9)) || !fn_isAlphaValue(a.substring(9,10)) )
         {
             alert("Please enter valid PAN (XXXXX9999X)");
             k.value = "";
             k.focus(); 
         }

      }
   }
}

function fn_isAlphaValue(a)                   //  Form level validation
{
    var s;
	s=a.length;
	for( var i=0;i<s;i++)
  	{
           if ("1234567890!@#$%^&*()+-".indexOf(a.charAt(i))!=-1)
	   {
              return false;
           }
        }
     return true; 
}

function fn_isNumericValue(a)                     // Form level validation
{
        var s;
	s=a.length;
	for( var i=0;i<s;i++)
	{
           if ("1234567890.".indexOf(a.charAt(i))==-1)
	   {
  	       return false;
           }
	}
  return true;
}
function isAlphaNumericwithoutMessage(form1)
{
	var len,str,str1,i;
	len=form1.value.length;
	str=form1.value;
  str1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-,.&!#() \n";  
  
  if(securityCheck(form1))
  { 
   
    for(i=0;i<len;i++)
    {
      if((str1.indexOf(str.charAt(i)))==-1)
      {
          return false;
      }
    }
    return true;
  }
  else
  {    
    alert('Malicious Code Found. Please Enter valid data.');
	form1.value = "";
    return false;
  }
}

/* Following function checks whether the first date is greater than the 
second date or not. if first date is greater than second date it returns
false and else it returns true

date values should be passed as first and second
 (ex:  fnCompareDates(txt_fromdate.value,txt_todate.value); ) */


/***   start of fnCompareDates ****/
function fnCompareDates(first,second)
{
		var val1;
        var val2;

	var k = first.indexOf("/");
        var t = first.indexOf("/",3);     
        val1 = first.substr(k+1,t-k-1) +"/"+first.substr(0,k)+"/"+first.substr(t+1,first.length);
      
	k = second.indexOf("/");
	t = second.indexOf("/",3);
	val2 = second.substr(k+1,t-k-1) +"/"+second.substr(0,k)+"/"+second.substr(t+1,second.length);
	
        if (Date.parse(val1) > Date.parse(val2))
         { 
          // alert("in if");
           return false; 
        }
        else
        { 
          //alert("in else");
          return true;           
          }
}
function setToDate(fromdt,period)
{
  	var frm = fromdt.split("/")
	var frmD = frm[0]
	var frmM = frm[1]
	var frmY = frm[2]
	var day=""	
	var finalDate=""

	if(period == "Annually" || period == "ANNL"|| period == "A")
	{
		//alert('in todate annually')
		var Year = 0
		if(frmM=="01" ||frmM=="02" ||frmM=="03")
		{                 
			Year = frmY
		}
		else
		{
			Year = (frmY*1) + 1
		}
		finalDate="31/03/"+Year
		
	}
	else if(period == "Quarterly" || period == "QRTR" || period == "Q")
	{
		//alert('in todate qrtrly')
		if(frmM=="01" ||frmM=="02" ||frmM=="03")
		{                 
			finalDate="31/03/"+frmY
		}
		else if(frmM=="04" ||frmM=="05" ||frmM=="06") 
		{ 
			finalDate="30/06/"+frmY
		}
		else if(frmM=="07" ||frmM=="08" ||frmM=="09") 
		{ 
			finalDate="30/09/"+frmY
		}
		else if(frmM=="10" ||frmM=="11" ||frmM=="12") 
		{ 
			finalDate="31/12/"+frmY
		}
	   
	}
	else if(period == "Monthly" || period == "MNTL"|| period == "M")
	{
		if(frmM=="01" ||frmM=="03" ||frmM=="05" ||frmM=="07" ||
         frmM=="08" ||frmM=="10" ||frmM=="12" )
         {
          day = "31";
         }
         else if(frmM=="04" ||frmM=="06" ||frmM=="09" ||frmM=="11" )
         {
             day="30";
         }
         else if(LeapYear(frmY) && frmM=="02")
         {
               day="29";
         }
         else if(!LeapYear(frmY) && frmM=="02")
         {
             day="28";
         }
		 finalDate=day+"/"+frmM+"/"+frmY;

	}
	//alert(finalDate)
	return TrimNew(finalDate)
      
}
function TrimNew(text)
{
	var text1=LTrimNew(text)
	var text2=RTrimNew(text1)

	return text2
}
function LTrimNew(text)
{
		while(text.charAt(0)==' ')
			text=text.substring(1,text.length )
		return text
}
function RTrimNew(text)
{
		while(text.charAt(text.length-1)==' ')
			text=text.substring(0,text.length-1)
		return text
}
function compDate(adate, bdate, msg) {

	var val1;
	var val2;

	var k = adate.indexOf("/");
	var t = adate.indexOf("/",3);     
	val1 = adate.substr(k+1,t-k-1) +"/"+adate.substr(0,k)+"/"+adate.substr(t+1,adate.length);

	k = bdate.indexOf("/");
	t = bdate.indexOf("/",3);
	val2 = bdate.substr(k+1,t-k-1) +"/"+bdate.substr(0,k)+"/"+bdate.substr(t+1,bdate.length);

	if (Date.parse(val1) > Date.parse(val2))
	{ 
		alert(msg);
		return false; 
	}
	else
	{ 
		return true;           
	}
}

function checkAll(ele_name, chkRef)
{
	if ( chkRef.checked )			
		selectAll(ele_name, "1");
	else
		selectAll(ele_name, "2");
}	

function selectAll(ele_name, selectFlag)
{
	var inputArr = document.getElementsByName(ele_name);
	
	if ( inputArr != null )
	{	
		var len = inputArr.length;
		for ( count = 0; count < len; count++ )
		{
			var inputRef = inputArr[count];
			if ( inputRef.type == "checkbox" ) 
			{
				if ( selectFlag == '1' )
					inputRef.checked='true';
				else
					inputRef.checked='';
			}
		}
	}	
}
	function valFutureDate(from)
	{     
	  if (from.value != '')
	  {    
	   var passmonth;
	   var passyear;
	   var passday;  
	   
	   var serverDateArray = serverDate.split("/");
	   var curdate = new Date(serverDateArray[2],serverDateArray[1]-1,serverDateArray[0]);
	   //alert("Server Date is "+curdate+ "  and pc date is  "+new Date());
	   var curmonth=parseInt(curdate.getMonth()+1);
	   var curyear=parseInt(curdate.getYear());
	   var curday=parseInt(curdate.getDate());
	   var todayDate = curday+"/"+curmonth+"/"+curyear;
	   if (chkdate(from) == false)
	      {
	      alert("Please enter date in dd/mm/yyyy format");
	       from.value = "";
	       from.focus();
	       return false;
	       }
	      else  
	      {
	      if (!fnCompareDates(from.value,todayDate))
	      {
	         alert("Date should not be a future date.");
	         from.value="";
	         from.focus();
	         return false;
	      }
	      else
	         { 
	        return true;
	         }
	     } 
	  }
	}
function toDayDate()
{		
	var currentDate = new Date();
	var month = currentDate.getMonth() + 1;
	var day = currentDate.getDate();
	var year = currentDate.getFullYear();
	var todayDate = day+"/"+month+"/"+year;	    
	
	    var k = todayDate.indexOf("/");
	    var t = todayDate.indexOf("/",3);
	    var date = todayDate.substr(k+1,t-k-1) +"/"+todayDate.substr(0,k)+"/"+todayDate.substr(t+1,todayDate.length);
	 
	    return date;
}

function checkBranchSpecialChar(field)
{

	value = field.value;
	
	var iChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-,.&()/ ";

	for (var i = 0; i < value.length; i++) 
	{
	
		if (iChars.indexOf(value.charAt(i)) == -1)
		{
			alert ("No special characters is allowed except -,.()&/ and space .");
			field.focus();
			return false;
		}
	}
	return true;
}
function checkTextareaMaxLength(field,maxlimit)
{
	if (field.value.length >= maxlimit) 
  	{ 
    	alert("You have exceeded the Maximum limit of " + maxlimit + "\nText above maxlimit will be truncated");
    	final_val = field.value.substr(0,(maxlimit-1));
    	field.value = final_val;
    	field.focus();
    	return false;
  	}
}
function validateTIN(form)
{
	/*Begin ---Changes for KRA ------Aslam*/
	 var pin = form.value;
	 var flag=0;
	 if ( pin == null || pin== '')
	 {
		alert("PIN is required.");
		
		return false;
	 }
	 if(securityCheck(form))
	  { 
		//for branch added by bhargav 
		if(pin.length == 15)
		{
			if(!(pin.substring(0,1).toString() == "P"))
			{	
				alert("Invalid PIN.");
				return false;
			}
			if(isNaN(pin.substring(1,10).toString()))
			{	
				alert("Invalid PIN.");
				return false;
			}
			if(isNaN(pin.substring(12,15).toString()))
			{	
				alert("Invalid PIN.");
				return false;
			}
			var charCode = pin.substring(10,11).toString();
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
			charCode = pin.substring(11,12).toString();
			var check="B";
			flag=0;
			if(charCode == check){	
					flag=1;
				}
			if(flag==0){
				alert("Invalid PIN.");
				return false;
			}
			else
				flag=0;
		}
		else if(pin.length == 11)
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
function allowTodayAndFutureDate(dateObj)
{

    if(!checkdate(dateObj))
    {
        return false;
    }
    var inputDate = dateObj.value;
    var currentDate = new Date();
	var month = currentDate.getMonth() + 1;
	var day = currentDate.getDate();
	var year = currentDate.getFullYear();
	var todayDate = day+"/"+month+"/"+year;	  
    if(!fnCompareDates(todayDate,inputDate))
    {
        alert("Date cannot be a past date");
        dateObj.value ="";
        dateObj.focus();
        return false;
    }
    return true;    
}
function isEqual(todayDate,testDate)
{
        var val1;
        var val2;

	var k = todayDate.indexOf("/");
        var t = todayDate.indexOf("/",3);     
        val1 = todayDate.substr(k+1,t-k-1) +"/"+todayDate.substr(0,k)+"/"+todayDate.substr(t+1,todayDate.length);
      
	k = testDate.indexOf("/");
	t = testDate.indexOf("/",3);
	val2 = testDate.substr(k+1,t-k-1) +"/"+testDate.substr(0,k)+"/"+testDate.substr(t+1,testDate.length);
	
        if (Date.parse(val1) == Date.parse(val2))
        {
            return true;
        }
        else
        {
            return false;
        }
}
//---------commonValidations.js-----------------------ends here----------

//----------DateValidation.js------------starts here--------------
var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];

function fnCompareDates(first,second)
{
	
	
    var val1;
    var val2;
    var k = first.indexOf("/");
    var t = first.indexOf("/",3);     
    val1 = first.substr(k+1,t-k-1) +"/"+first.substr(0,k)+"/"+first.substr(t+1,first.length);
    k = second.indexOf("/");
    t = second.indexOf("/",3);
    val2 = second.substr(k+1,t-k-1) +"/"+second.substr(0,k)+"/"+second.substr(t+1,second.length);

    if (Date.parse(val1) > Date.parse(val2))
    { 
      return false; 
    }
    else
    { 
       return true;           
    }
}

function LeapYear(intYear) {
	if (intYear % 100 == 0) {
	if (intYear % 400 == 0) { return true; }
	}
	else {
	if ((intYear % 4) == 0) { return true; }
	}
	return false;
	}


function checkdate(objName)
{
    var datefield = objName;
    
    if (objName.value != 'dd/mm/yyyy' && objName.value != '')
    {
        if (chkdate(objName) == false)
        {
            datefield.select();
            alert("Please fill in dd/mm/yyyy format");
            datefield.value = "";
            datefield.select();
            setTimeout(function(){datefield.focus();}, 10);
        }
        else 
        {  
            return true;
        }
    }
}

function chkdate(objName) 
{
    var strDate;
    var strDateArray;
    var strDay;
    var strMonth;
    var strYear;
    var intday;
    var intMonth;
    var intYear;
    var booFound = false;
    var datefield = objName;
    var strSeparatorArray = new Array("-"," ","/",".");
    var intElementNr;
    var err = 0;
//    alert("Server Date :: "+serverDate);
//    var serverDateArray = serverDate.split("/");
//    var curdate = new Date(serverDateArray[2],serverDateArray[1]-1,serverDateArray[0]);
    var comparedate;
    var strMonthArray = new Array(12);
    strMonthArray[0] = "Jan";
    strMonthArray[1] = "Feb";
    strMonthArray[2] = "Mar";
    strMonthArray[3] = "Apr";
    strMonthArray[4] = "May";
    strMonthArray[5] = "Jun";
    strMonthArray[6] = "Jul";
    strMonthArray[7] = "Aug";
    strMonthArray[8] = "Sep";
    strMonthArray[9] = "Oct";
    strMonthArray[10] = "Nov";
    strMonthArray[11] = "Dec";
//    alert(datefield.value);
    strDate = datefield.value;
    
    if (strDate.length < 6) 
    {
        return false;
    }
    for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) 
    {
        if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) 
        {
            strDateArray = strDate.split(strSeparatorArray[intElementNr]);
            if (strDateArray.length != 3) 
            {
            err = 1;
            return false;
            }
            else 
            {
                if(isDateNumeric(strDateArray[0]))
                    strDay =strDateArray[0];
                else return false;
                if(isDateNumeric(strDateArray[1]))
                    strMonth = strDateArray[1];
                else return false;
                if(isDateNumeric(strDateArray[2]))
                    strYear = strDateArray[2];
                else return false;
            }
            booFound = true;
        }
    }
    if (booFound == false) 
    {
        if (strDate.length>5) 
        {
            if(isDateNumeric(strDate.substr(0, 2)))
                strDay =strDate.substr(0, 2);
            else return false;
            if(isDateNumeric(strDate.substr(2, 2)))
                strMonth = strDate.substr(2, 2);
            else return false;
            if(isDateNumeric(strDate.substr(4)))
                strYear = strDate.substr(4);
            else return false;
        
        }
    }
    
    if (strYear.length == 3 ||strYear.length > 4) 
    {
        return false;
    }
    if (strYear.length == 2) 
    {
    	if(Number(strYear) < 50)
    		strYear = "20" + strYear;
		else
			strYear = "19" + strYear;
    }
    
    
    intday = parseInt(strDay, 10);
    if (isNaN(intday)) 
    {
        err = 2;
        return false;
    }
    intMonth = parseInt(strMonth, 10);
    if (isNaN(intMonth)) 
    {
        for (i = 0;i<12;i++) 
        {
            if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) 
            {
                intMonth = i+1;
                strMonth = strMonthArray[i];
                i = 12;
            }
        }
        if (isNaN(intMonth)) 
        {
            err = 3;
            return false;
        }
    }
    
    intYear = parseInt(strYear, 10);
    if (isNaN(intYear)) 
    {
        err = 4;
        return false;
    }
    if (intMonth>12 || intMonth<1) 
    {
        err = 5;
        return false;
    }
    if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) 
    {
        err = 6;
        return false;
    }
    if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) 
    {
        err = 7;
        return false;
    }
    if (intMonth == 2) 
    {
        if (intday < 1) 
        {
            err = 8;
            return false;
        }
        if (LeapYear(intYear) == true) 
        {
            if (intday > 29) 
            {
                err = 9;
                return false;
            }
        }
        else 
        {        
            if (intday > 28) 
            {
                err = 10;
                return false;
            }
        }
    }
    
    tempdate=strDay +"/"+intMonth+"/"+strYear;         
    //     datefield.value = strDay +"/"+intMonth+"/"+strYear;
    
    //Changes for appending 0 in case of single digit - 511416 (Santosh Patel)
    if(strDay.length == 1)
    	strDay="0"+strDay;
    
    if(strMonth.length == 1)
    	strMonth="0"+strMonth;
    //End Changes
    
    datefield.value = strDay +"/"+strMonth+"/"+strYear;
    return true;
}

function isDateNumeric(var1)
{
	var len,str,str1,i
	len=var1.length
	str=var1
	str1="0123456789"
   
    for(i=0;i<len;i++)
    {
      if((str1.indexOf(str.charAt(i)))==-1)
      {
        return false;
      }
    }
    return true
}


//subtracts dt1 - dt2
//@param : dt1(in 'dd/mm/yyyy'),dt2(in 'dd/mm/yyyy')
//@returns: var +ive is dt1>dt2 else -ve if dt1<dt2 (numeric) and 0 if both are equal
//Testcase: getDateDiffInDays('1/3/2001','28/2/2001');
//** in javascript months start form 0(january) and ends with 11(dec).
function getDateDiffInDays(dtA,dtB){		
    return dateDiffObj(createDateObj(dtA),createDateObj(dtB));
}


/** THIS BELOW FUNCTION CHECKS WETHER First DATE IS greater or less or equal than Second DATE without alerts
return 0 if both the dates are equal
       1 if first date is greater than second date
       2 if first date is less than second date
*/
function CompareDates(first,second)
{
	var val1;
	var val2;

	var k = first.indexOf("/");
	var t = first.indexOf("/",3);     
	val1 = first.substr(k+1,t-k-1) +"/"+first.substr(0,k)+"/"+first.substr(t+1,first.length);

	k = second.indexOf("/");
	t = second.indexOf("/",3);
	val2 = second.substr(k+1,t-k-1) +"/"+second.substr(0,k)+"/"+second.substr(t+1,second.length);

	if (Date.parse(val1) == Date.parse(val2)) {
		return 0; 
	} else if (Date.parse(val1) > Date.parse(val2)) {
		return 1;           
	} else{
		return 2;
	}
}


//calculates difference with date objects
function dateDiffObj(da,db) {    
    var one_day=1000*60*60*24;
    var noOfDays= parseInt((da.getTime()-db.getTime())/(one_day));
    return noOfDays;
}

//input date should be in format dd/mm/yyyy
function createDateObj(strDate){
    var tknA = strDate.split('/');
    if(tknA[1].charAt(0)=='0')
    {
        tknA[1] = tknA[1].replace('0','');
    }
    var monthA = parseInt(tknA[1])-1; //because months start form 0.		
    if(monthA.length == 1){
            monthA = '0'+ monthA;
    }
    stA = tknA[2]+'/'+monthA+'/'+tknA[0];
    var nDtA = new Date(tknA[2],monthA,tknA[0]); 
    return nDtA;
}
/**
 * Function to return ordinal suffix
 * @param any number
 * @returns ordinal suffix 
 * test-case : ordinalSuffix(1) : st,ordinalSuffix(2) : nd,ordinalSuffix(3) : rd
 */
function ordinalSuffix(numVal) 
{
	var mod = numVal % 10; 
	if (mod === 1 && numVal !== 11) 
	{ 
		return 'st'; 
	}
	else if (mod === 2 && numVal !== 12) 
	{
		return 'nd'; 
	}
	else if (mod === 3 && numVal !== 13) 
	{
		return 'rd'; 
	}
	else 
	{
		return 'th'; 
	}
}
/**
 * Function to return formatted date
 * @param date Object containing value in 'dd/mm/yyyy' format
 * @returns formatted date 
 * test-case : 
 * 	if date value = 01/01/2001
 * 	getDateFormatToDisp(dateObj) : 1st January,2001
 */
function getDateFormatToDisp(dateObj)
{
	if(dateObj != null && dateObj.value != '')
	{
		var dateVal = dateObj.value;
		var dtObj = createDateObj(dateVal);
		var mm = dtObj.getMonth();    
		var dd = dtObj.getDate();   
		var yyyy = dtObj.getFullYear();    
		var date = dd + ordinalSuffix(dd) +' '+monthNames[mm] + ',' + yyyy;    
		return date;
	}
}

function valFutureDate(from,serverDate)
{ 
    
	//alert(serverDate);
  if (from.value != '')
  {
    
   var passmonth;
   var passyear;
   var passday;  
  
   
   var serverDateArray = serverDate.value.split("/");
   var curdate = new Date(serverDateArray[2],serverDateArray[1]-1,serverDateArray[0]);
   //alert("Server Date is "+curdate+ "  and pc date is  "+new Date());
   var curmonth=parseInt(curdate.getMonth()+1);
   var curyear=parseInt(curdate.getFullYear());
   var curday=parseInt(curdate.getDate());
   var todayDate = curday+"/"+curmonth+"/"+curyear;
   if (chkdate(from) == false)
      {
      alert("Please fill in dd/mm/yyyy format");
       from.value = "";
       from.focus();
       return false;
       }
      else  
      {
      if (!fnCompareDates(from.value,todayDate))
      {
         alert("Date should not be a future date.");
         from.value="";
         from.focus();
         return false;
      }
      else
         { 
        return true;
         }
     } 
  }
}

function allowTodayAndPastDateDne(dateObj,showAlert,serverDate)
{
	
	if(showAlert == null)
	{
		showAlert = true;
	}
    if(!checkdate(dateObj))
    {
        return false;
    }
    var inputDate = dateObj.value;
     var serverDateArray = serverDate.split("/");
     var curdate = new Date(serverDateArray[2],serverDateArray[1]-1,serverDateArray[0]);
   var serverDateArray = serverDate.split("/");
    var curdate = new Date(serverDateArray[2],serverDateArray[1]-1,serverDateArray[0]);
    //alert("Server Date is "+curdate+ "  and pc date is  "+new Date());
    var curmonth=parseInt(curdate.getMonth()+1);
    var curyear=parseInt(curdate.getFullYear());
    var curday=parseInt(curdate.getDate());
    var todayDate = curday+"/"+curmonth+"/"+curyear;
   
    if(Date.parse(todayDate) != Date.parse(inputDate)){
    	
        if(fnCompareDates(todayDate,inputDate))
        {
        	if(showAlert)
        	{
        		alert("Date should not be future date");
        		dateObj.value = "";
        		dateObj.focus();
        	}
            return false;
        }
    }        
    return true;
}
function formatDate(value) 
{
	var dispDay = '';
	var dispMonth = '';
	if (value.getDate() < 10) {
		dispDay = '0' + value.getDate();
	} else {
		dispDay = value.getDate();
	}
	if ((value.getMonth() + 1) < 10) {
		dispMonth = '0' + (value.getMonth() + 1);
	} else {
		dispMonth = (value.getMonth() + 1);
	}
	return dispDay + '/' + dispMonth + "/" + value.getFullYear();
}
//----------DateValidation.js------------ends here--------------


//Added by Khushboo for System Optimization

function PopUp(funCode)
{
	 document.getElementById("funCode").value=funCode; 
	 setTimeout("ModalPopUp(funCode)",2000);
}
function ModalPopUp(funCode) 
{
	//alert(document.getElementById("siteSurvey").value);
	if(document.getElementById("siteSurvey").value=='1')
	{
		var funCode=document.getElementById("funCode").value;
		var obligId=document.getElementById("obligId").value;
		if (funCode.toUpperCase()==("RET"))
			{
			if(obligId == 2)
				{
				funCode+="ITR"//ITR
				}else if (obligId == 3){
				funCode+="ITNR"	//ITNR
				}else if (obligId == 4){
				funCode+="ITC"	//ITC
				}else if (obligId == 5){
				funCode+="ITP"	//ITP
				}else if (obligId == 9){
				funCode+="VAT"	//VAT
				}else if (obligId == 7){
				funCode+="PAYE"	//PAYE
				}
			}
		else if (funCode.toUpperCase()==("PMT"))
			{
			if(obligId == 6)
			{
			funCode+="ITWHT"//IT-Wht
			}else if (obligId == 29)
			{
			funCode+="VATWHT"//VAT-Wht
			}
			}
		document.getElementById("survey").style.display="inherit";
		document.getElementById("funCode").value=funCode; 
		window.location=window.location+"#survey"; 
	}
	else
		document.getElementById("survey").style.display="none";
		
}

function accepted()
{
	
	var funCode = document.getElementById("funCode").value; 
	
//		var link="main.htm?actionCode=fetchQuestions&funCode="+funCode; 
//		var win=window.open(link,'_blank');
//		win.focus();
//		document.forms[0].action="siteSurvey.htm?actionCode=fetchQuestions&funCode="+funCode;
//	 	document.forms[0].submit();

 	document.forms[0].action="main.htm?actionCode=fetchQuestions&funCode="+funCode;
 	document.forms[0].target = '_blank';
 	document.forms[0].submit();

//	 	window.open("http://localhost:7080/KRAPortal/siteSurvey.htm?actionCode=fetchQuestions&funCode="+funCode, 'popupWindowName', 'dependent=yes, menubar=no,toolbar=no,resizable=yes,scrollbars=yes,status=yes,height=800,width=1000,left=40');
		
//		window.open("main.htm?actionCode=fetchQuestions&funCode="+funCode);	
 	window.location=window.location+"#close";
 	
}
function notAccepted()
{
	window.location=window.location+"#close";	
} 