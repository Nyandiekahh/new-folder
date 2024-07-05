  /*
    Loop through the leftmenu nav links and remove the hrefs and
    register the onclick event.
    
    31/08/2009 - CVEGA - coverted from inline to function
  */
function setupLeftMenu()
{    
    if ( arrPlacement != null)
    {
      for (var iLoop = arrPlacement.length - 1; iLoop >= 0; iLoop--)
      {
	        var objAnchor; 
	        var objImage; 
        
	        if ( document.all ) 
	        {
		        if (document.all('pwa' + arrPlacement[iLoop])) 
		        {
			        objAnchor = document.all('pwa' + arrPlacement[iLoop]);
			        objImage = document.all('pwi' + arrPlacement[iLoop]);
			        objAnchor.href = '';
			        objAnchor.attachEvent('onclick', handlerLeftMenuClick);
			        /* Paul Clark 27/10/2008 - Create event to handle key strokes on expandable menus. */
			        objAnchor.attachEvent('onkeydown', handlerLeftMenuKeyDown);
			        objImage.attachEvent('onclick', handlerLeftMenuClickImg);
		        }
	        }
	        else
	        {
		        if (document.getElementById('pwa' + arrPlacement[iLoop])) 
		        {
			        objAnchor = document.getElementById('pwa' + arrPlacement[iLoop]); 
			        objImage = document.getElementById('pwi' + arrPlacement[iLoop]);
			        objAnchor.href = '';
			        objAnchor.onclick = handlerLeftMenuClick;
			        /* Paul Clark 27/10/2008 - Create event to handle key strokes on expandable menus. */
			        objAnchor.onkeydown = handlerLeftMenuKeyDown;
			        objImage.onclick = handlerLeftMenuClickImg;
		        }
	        }
        }
    }
}    
  function handlerLeftMenuClick(e)  
  {
    var strCode;
    var objDiv;
    var objImage;
    var objHiddenDiv;
    var tempHTML;
	var innerHTMLOutput;
    if ( document.all )
      {
      strCode = event.srcElement.id.substr(3);
      if (strCode == '')
      {
		return false;
      }

      objDiv = document.all('pwdiv' + strCode); 
      objImage = document.all('pwi' + strCode);
      //objHiddenDiv = document.all('h' + objDiv.id);
      }
    else
      {
      /*  this code is for Mozilla */
      strCode = e.currentTarget.id.substr(3);
      objDiv = document.getElementById('pwdiv' + strCode);
      objImage = document.getElementById('pwi' + strCode);
      //objHiddenDiv = document.getElementById('h' + objDiv.id)
      }
    
    if (objDiv.className == 'PWHide') {
      
      //tempHTML = objHiddenDiv.innerHTML;
	  //innerHTMLOutput = tempHTML;
      //objDiv.innerHTML = innerHTMLOutput;
      objDiv.className = 'PWShowLeft';
      objImage.src = './themes/images/minus.gif';
    } 
    else {
      objDiv.className = 'PWHide';
      objImage.src = './themes/images/plus.gif';
    }
  
    return false;
  }
  function MarketSegmentInitialLoad() 
  {
    /* 
    1/10/2009 Cesar Vega
    Check if leftmenu exsists
    */
    var objLeftMenuTable;
    objLeftMenuTable = document.getElementById('LeftMenuTable');

    if (objLeftMenuTable == null) return false; 
    
    if ( arrPlacement != null)
	{
		/* 
		21/08/2008 Paul Clark
		Check to see if a menu has already been expanded. If so, don't expand the 
		first menu.
		*/
		var objDivCheck;
		var strCode;
		var blnCheck;
		
		strCode = 0;
		blnCheck = false;
		
		while (true)
		{
			strCode = strCode + 1;
			
			if ( document.all )
			{
				objDivCheck = document.all('pwdiv'+strCode);
			}
			else
			{
				objDivCheck = document.getElementById('pwdiv'+strCode);
			}
			
			if (!objDivCheck)
			{
				break;
			}
			else
			{
				if (objDivCheck.className == 'PWShowLeft')
				{
					blnCheck = true;
					break;
				}
			}
		}
		
		/*
		21/08/2008 Paul Clark
		If no menu expanded, then expand the first one.
		*/
		if (!blnCheck)
		{
			var objDiv;
			var objImage;
			var objHiddenDiv;
			var tempHTML;
			var innerHTMLOutput;
			if ( document.all )
			{
				strCode = 1;
				objDiv = document.all('pwdiv' + strCode); 
				objImage = document.all('pwi' + strCode);
				//objHiddenDiv = document.all('h' + objDiv.id);
			}
			else
			{
				/*  this code is for Mozilla */
				strCode = 1;
				objDiv = document.getElementById('pwdiv' + strCode);
				objImage = document.getElementById('pwi' + strCode);
				//objHiddenDiv = document.getElementById('h' + objDiv.id)
			}
	    
			if (objDiv.className == 'PWHide') 
			{
				//tempHTML = objHiddenDiv.innerHTML;
				//innerHTMLOutput = tempHTML;
				//objDiv.innerHTML = innerHTMLOutput;
				objDiv.className = 'PWShowLeft';
				objImage.src = './themes/images/minus.gif';
			} 
			else
			{
				objDiv.className = 'PWHide';
				objImage.src = './themes/images/plus.gif';
			}
		}
		
		/* devraj & Paul 20/08/2008
		   By default the Left hand menu is all collapsed when the Script function is enabled
		   the function below changes the Style for the table (which has the Left menu)dynamically
		   for the 1st Menu to be expanded */
		showLeftMenu();	  
    }
    return false;
  }
  
  function handlerLeftMenuClickImg(e)  
  {
    return handlerLeftMenuClick(e)
  }
  
  /* Paul Clark 27/10/2008 - Event to handle when a key is pressed on an expandable menu. */
  function handlerLeftMenuKeyDown(e)
  {
	var keyNum;
	var keyCode;
	
	if ( document.all )
	{
		keyNum=e.keyCode;
	}
	else
	{
		keyNum=e.which;
	}
	keyCode=String.fromCharCode(keyNum);
	
	/* If the Enter key is pressed, then call function to expand menu. */
	if (keyCode=="/r")
	{	
		return handlerLeftMenuClick(e)
	}
  }
  
  /* devraj & Paul 20/08/2008 for Left menu to appear if Script is turned off */
  function showLeftMenu()
  {
	var objLeftMenuTable;
	
	objLeftMenuTable = document.getElementById('LeftMenuTable');
	objLeftMenuTable.style.display = '';
  }

  function loadContent(filePath){
		document.forms[0].action="contentManagement.htm?actionCode=getHtmlFileAsStringForView&viewType=static&FILE_PATH="+filePath;
		document.forms[0].submit();
  }
  function loadPdf(filePath){
		document.forms[0].action="download.htm?type=menu&&URL_TO_DOWNLOAD="+filePath;
		document.forms[0].submit();
  }
  function pinchecker(){
	  /*if(disableEServicesLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		document.forms[0].action ="pinChecker.htm?actionCode=loadPage&viewType=static";
	  }*/
	document.forms[0].action ="pinChecker.htm?actionCode=loadPage&viewType=static";
	document.forms[0].submit();
	}

  function showTCCChecker()
	{
	  if(disableEServicesLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		 document.forms[0].action="complianceMonitoring.htm?actionCode=validateTCC&viewType=static";
	  }
		document.forms[0].submit();
	}
  function goToImportExport()
  {
	  if(disableAdminManagedLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		  document.forms[0].action="exchangeRate.htm?actionCode=loadImportExport&viewType=static";  
	  }
	  document.forms[0].submit();
  }
  
  function consultStatusOfCases()
  {
	  /*if(disableEServicesLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		  document.forms[0].action="trackYrStatusController.htm?actionCode=loadPage&viewType=static";
	  }*/
	  document.forms[0].action="trackYrStatusController.htm?actionCode=loadPage&viewType=static";
	  document.forms[0].submit();
  }
  
  function contactUs()
  {
  	document.forms[0].action="main.htm?actionCode=showContactUs&viewType=static";
  	document.forms[0].submit();
  }
  
  function formsDownload(deptType)
  {
	  if(disableAdminManagedLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		  document.forms[0].action="contentManagement.htm?actionCode=viewDownloads&viewType=static&deptType="+deptType;
	  }
  	document.forms[0].submit();
  }
  function whtChecker()
  {
	  /*if(disableEServicesLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		  document.forms[0].action="complianceMonitoring.htm?actionCode=showVerifyWithholdingCertificate&viewType=static";
	  }*/
	  document.forms[0].action="complianceMonitoring.htm?actionCode=showVerifyWithholdingCertificate&viewType=static";
	  document.forms[0].submit();
  }
  function downloads()
  {
  	/*if(disableEServicesLinks=='Y')
  	{
  		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
  	}
  	else
  	{
  		document.forms[0].action="contentManagement.htm?actionCode=viewDownloads&viewType=static";
  	}*/
	document.forms[0].action="contentManagement.htm?actionCode=viewDownloads&viewType=static";
  	document.forms[0].submit();
  }
  
  function authenticateEtr()
	{
	  if(disableEServicesLinks=='Y')
	  {
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	  }
	  else
	  {
		 document.forms[0].action="complianceMonitoring.htm?actionCode=showETRVerfHome&viewType=static";
	  }
		document.forms[0].submit();
	}
  
  function showeAudit()
  {
	  document.forms[0].action="eAud.htm?actionCode=loadInformerInformation";
	  document.forms[0].submit();
	}
  
  function displayParentChild(link)
  {
  	document.forms[0].action="main.htm?actionCode=displayChildMenus&&parentMenuId="+link;
  	document.forms[0].submit();
  }