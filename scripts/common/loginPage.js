
/* Methods for login page start*/
function showHomePage()
{
	document.loginForm.action="main.htm?actionCode=showHomePageLnclick";
	document.loginForm.submit();
}

function downloads()
{
	
	document.loginForm.action="contentManagement.htm?actionCode=viewDownloads&viewType=static&linkFrom=LP";
	document.loginForm.submit();
}
function comingSoon()
{
	  document.forms[0].action ="main.htm?actionCode=comingSoon";
	  document.forms[0].submit();
}
function reportProblem()
{
	/*document.forms[0].action ="postQuery.htm?actionCode=showPostQuery&viewType=static";
	document.forms[0].submit();*/
	window.open("https://kenya-revenue-authority.custhelp.com/app/ask/session/L3RpbWUvMTY3NjQ1NTY3Ny9nZW4vMTY3NjQ1NTY3Ny9zaWQvZlVpTUZHbHIwbEFTUVNhWU80QzRMek9IRk9ZZyU3RW85eTglN0V0bUdlZTZrQUhwVWhYUjdRdGFsaEdBcHZ4UjJLeGh2aVNvNTNaTzlhJTdFZmJ0aVo0JTdFa2xvUlo0bmI3eUdzVUdualJqMUJybnA2bTBZVnhGOHd2VXBwcWclMjElMjE=","_blank");
}
function contactUs()
{
	
		document.loginForm.action="main.htm?actionCode=showContactUs&viewType=static&linkFrom=LP";
	
	document.loginForm.submit();
}

function onlineHelp()
{
	//window.open('http://10.139.0.241/web_help/index.htm', "Online Help");
	//document.loginForm.action="main.htm?actionCode=comingSoon&viewType=static";
	//document.loginForm.submit();
}

function forgotPassword()
{
	document.loginForm.action="login.htm";
	document.loginForm.actionCode.value="loadForgotPassPage";
	document.loginForm.submit();
}

function passwordPolicy()
{
	window.open('main.htm?actionCode=passwordPolicy', "PasswordPolicy", "resizable,status,width=700,height=300,screenX=50,screenY=50");
}

function loadERegistrationMainPage()
{
	/*if(disableEServicesLinks=='Y')
	{
		document.loginForm.action ="main.htm?actionCode=comingSoon&viewType=static&linkFrom=LP";
	}
	else
	{
		document.loginForm.action ="eRegIndi.htm";
		document.getElementById("actionCode").value="loadRegitrationMainPage";
	}*/
	showProgressbar();
	document.loginForm.action ="eRegIndi.htm";
	document.getElementById("actionCode").value="loadRegitrationMainPage";
	document.loginForm.submit();
}

function loadERegistrationLegacyPage()
{
//	if(disableEServicesLinks=='Y')
//	{
//		document.loginForm.action ="main.htm?actionCode=comingSoon&viewType=static&linkFrom=LP";
//	}
//	else
//	{
	showProgressbar();
		document.loginForm.action ="eRegLegacy.htm";
		document.getElementById("actionCode").value="loadRegitrationLegacyPage";
//	}
		//COMMENTED OM 13/01/2014  
//	document.loginForm.action ="main.htm?actionCode=comingSoon";
	document.loginForm.submit();
}

function loadPRFormOL()
{
	if(disableEServicesLinks=='Y')
	{
		document.loginForm.action ="main.htm?actionCode=comingSoon&viewType=static&linkFrom=LP";
	}
	else
	{
		document.loginForm.action ="paymentRegistration.htm";
		document.getElementById("actionCode").value="loadPRFormOL";
	}
	document.loginForm.submit();
}

function guidelines()
{
	if(disableEServicesLinks=='Y')
	{
		document.loginForm.action ="main.htm?actionCode=comingSoon&viewType=static&linkFrom=LP";
	}
	else
	{
		document.loginForm.action="main.htm?actionCode=showGuidelinesForPINReg&viewType=static&linkFrom=LP";
	}
	document.loginForm.submit();
}
function loadERegistrationPagePki(){
	
	if(disableEServicesLinks=='Y')
	{
		document.loginForm.action ="main.htm?actionCode=comingSoon&viewType=static&linkFrom=LP";
	}
	else
	{
		
		document.loginForm.action="pki.htm?actionCode=homepageLogin";
	}
	document.loginForm.submit();
}
function showTCCChecker()
{
//	if(disableEServicesLinks=='Y')
//	{
//		document.loginForm.action ="main.htm?actionCode=comingSoon&viewType=static&linkFrom=LP";
//	}
//	else
//	{
	 document.forms[0].action="complianceMonitoring.htm?actionCode=validateTCC";  
	
//	}
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
	  document.forms[0].action="complianceMonitoring.htm?actionCode=showVerifyWithholdingCertificate";
	
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
function checkVATWHTPIN()
{
	document.forms[0].action ="pinChecker.htm?actionCode=loadWthPage&viewType=static";	
	document.forms[0].submit();
}
function displayParentChild(link)
{
	document.forms[0].action="main.htm?actionCode=displayChildMenus&&parentMenuId="+link+"&&menyType=HOMELINK";
	document.forms[0].submit();
}


function openFAQ()
{
//	if(disableAdminManagedLinks=='Y')
//	{
//		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
//	}
//	else
//	{
		//document.forms[0].action="faq.htm?actionCode=faqManagement&operation=viewCategory&viewType=static";
//	}
		document.forms[0].action="main.htm?actionCode=showFAQ&operation=viewCategory&viewType=static";
	document.forms[0].submit();
}
function consultStatus()
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
/* Methods for login page end*/
//added by Sanjaysinh
function serialNumberchecker()
{
	document.forms[0].action ="serialNumberChecker.htm?actionCode=loadPageSerialNumber&viewType=static";
	
	document.forms[0].submit();
}
function invoiceNumberchecker()
{
	document.forms[0].action="invoiceNumberChecker.htm?actionCode=loadPageInvoiceNumber";
	document.forms[0].submit();
}


function manufacturerAuthorization()
{
	document.forms[0].action ="manufacturerAuthorizationController.htm?actionCode=appForManufacturerAuth";
	
	document.forms[0].submit();
/*	
	document.leftMenu.action="manufacturerAuthorizationController.htm?actionCode=appForManufacturerAuth";
	document.leftMenu.submit();*/
}
//Added by Bhavna(970781) for download of TFS installer
function viewDownloadTFSInstaller()
{
	document.loginForm.action="contentManagement.htm?actionCode=viewDownloadsTFS";
	document.loginForm.submit();
}