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
//Added by Mingu for Pin With no oblig :: START
function isNumericNoOblig(value){
    
	var result=/^[0-9+]*$/.test(value);

	if(result == false)
		{
       alert('Please enter Numeric Value only');
       document.getElementById('otpTextKE').value='';
       document.getElementById('txtTxprKELocMobNo1').value='';
       return false;
		}

	}
//Added by Mingu for Pin With no oblig :: END

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
	for(var i=1;i<document.getElementById(tabStr).rows.length;i++){
		var txt_node = document.createElement('input');
		txt_node.setAttribute('type','hidden'); 
		txt_node.setAttribute('name','fieldsToSkip'); 
		//txt_node.setAttribute('id','fieldsToSkip_'+(100+i));
		txt_node.setAttribute('value',tabStr+'_'+i);
		document.getElementById(formName).appendChild(txt_node);
	}
}
/*08/05/2024 ::*/
function validateNumVals(obj){
	if (Number(removeCommaFrmInput(obj.value)) <= 0) {
		alert("The value of the field must be greater than 0 (zero).");
		obj.value ='';
		return false;
}else{
	obj.value = Number(removeCommaFrmInput(obj.value));
}

}
//END
