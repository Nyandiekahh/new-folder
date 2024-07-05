function runScript(obj, evt)
{
 	var KeyID = (window.event) ? event.keyCode : evt.keyCode;
 	if(KeyID==13)
 	{
 		obj.focus();
 		obj.click();
 	}
}

function checkSpecialChar(c)
{
	value=c.value;
	var b="%#*?&@#$%^\\'/|\"";
	for(var a=0;a<value.length;a++)
	{
		if(b.indexOf(value.charAt(a))!=-1)
		{
			alert("Special characters are not allowed");
			c.focus();
			return false;
		}
	}
	return true;
}

function SiteSearch()
{
	var a;
	a=document.getElementById("text").value;
	if(a.toString==null||trim(a)=="")
	{
		alert("Please enter the search criteria.");
		return;
	}
	else
	{
		if(checkSpecialChar(document.getElementById("text")))
		{
			document.frmHeader.action="siteSearchController.htm?viewType=static";
			document.frmHeader.submit();
		}
	}
}

function magnify1()
{
	document.body.className="zoomSmall";
	clickedSmall();
	setCookie("zoomType",0);
}

function magnify2()
{
	document.body.className="zoomMedium";
	clickedMedium();
	setCookie("zoomType",1);
}

function magnify3()
{
	document.body.className="zoomLarge";
	clickedLarge();
	setCookie("zoomType",2);
}

function clickedSmall()
{
	var c=document.getElementById("smallZoom");
	var a=document.getElementById("mediumZoom");
	var b=document.getElementById("largeZoom");
	if((c!=null)&&(a!=null)&&(b!=null))
	{
		c.style.color="#fe0000";
		a.style.color="#000000";
		b.style.color="#000000";
	}
}

function clickedMedium()
{
	var c=document.getElementById("smallZoom");
	var a=document.getElementById("mediumZoom");
	var b=document.getElementById("largeZoom");
	if((c!=null)&&(a!=null)&&(b!=null))
	{
		c.style.color="#000000";
		a.style.color="#fe0000";
		b.style.color="#000000";
	}
}

function clickedLarge()
{
	var c=document.getElementById("smallZoom");
	var a=document.getElementById("mediumZoom");
	var b=document.getElementById("largeZoom");
	if((c!=null)&&(a!=null)&&(b!=null))
	{
		c.style.color="#000000";
		a.style.color="#000000";
		b.style.color="#fe0000";
	}
}

var zoomType = getCookie('zoomType');

function setCookie(a,b)
{
	document.cookie=a+"="+escape(b)+";path=/;";
}

function getCookie(a)
{
	if(document.cookie.length>0)
	{
		start=document.cookie.indexOf(a+"=");
		if(start!=-1)
		{
			start=start+a.length+1;
			end=document.cookie.indexOf(";",start);
			if(end==-1)
			{end=document.cookie.length;}
			return unescape(document.cookie.substring(start,end));
		}
	}
	return"";
}

function emishare_click1(c,a) 
{
	//var a = 'http://www.revenue.go.ke';
	var b = 'Kenya Revenue Authority';
	if (c == "bookmark") {
		if (document.all) {
			window.external.AddFavorite(a, b);
		} else {
			if (window.sidebar) {
				window.sidebar.addPanel(b, a, "");
			} else {
				alert("Press CTRL-D or CTRL-T (Opera) to bookmark");
			}
		}
	}
}

/*Home Page banner Links start*/
function complaintsAndInfo()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="main.htm?actionCode=openFeedback&viewType=static";
	}
	document.frmHeader.submit();
}

function openTenders()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=TEND&RELEASE_TYPE=TEND&viewType=static";
	}
	document.frmHeader.submit();
}

function openAuctions()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=AUCT&RELEASE_TYPE=AUCT&viewType=static";
	}
	document.frmHeader.submit();
}
function openActs()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=AMMEND&RELEASE_TYPE=AMMEND&viewType=static";
	}
	document.frmHeader.submit();
}

function openAnnouncement()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=ANCMNT&RELEASE_TYPE=ANCMNT&viewType=static";
	}
	document.frmHeader.submit();
}
function openJudgements()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=JDGMNT&RELEASE_TYPE=JDGMNT&viewType=static";
	}
	document.frmHeader.submit();
}

function openNotifications()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=NOTI&RELEASE_TYPE=NOTI&viewType=static";
	}
	document.frmHeader.submit();
}
function openAdvertisement()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=VADT&RELEASE_TYPE=VADT&viewType=static";
	}
	document.frmHeader.submit();
}
function openNewsAndUpdates()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=NREL&RELEASE_TYPE=NREL&viewType=static";
	}
	document.frmHeader.submit();
}
function openBrochures()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=BROCHURE&RELEASE_TYPE=BROCHURE&viewType=static";
	}
	document.frmHeader.submit();
}
function openSpeeches()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=SPEECH&RELEASE_TYPE=SPEECH&viewType=static";
	}
	document.frmHeader.submit();
}
function openVacancies()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="notification.htm?ACTION_TYPE=getlist&FLAG=VACANCY&RELEASE_TYPE=VACANCY&viewType=static";
	}
	document.frmHeader.submit();
}

/*Home Page banner Links end*/

function onlineServices()
{
	/*if(disableEServicesLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.frmHeader.action="main.htm?actionCode=showOnlineServices&viewType=static";
	}*/
	document.frmHeader.action="main.htm?actionCode=showOnlineServices&viewType=static";
	document.frmHeader.submit();
}

function showLoginPage()
{
	/*if(disableEServicesLinks=='Y')
	{
		document.frmHeader.action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		window.open("main.htm?actionCode=loadOnlineServicesPage");
	}*/
	window.open("main.htm?actionCode=loadOnlineServicesPage");
	document.frmHeader.submit();
}

function AtoZ()
{
	document.frmHeader.action="forwardOnly.htm?viewName=aToZ&viewType=static";
	document.frmHeader.submit();
}

function convertToPdf()
{
	loadPdf('top_menu/about-income-tax-content.htm');
}

function openFAQ()
{
	if(disableAdminManagedLinks=='Y')
	{
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.forms[0].action="faq.htm?actionCode=faqManagement&operation=view&viewType=static";
	}
	document.forms[0].submit();
}
function openTopMenuBanner(link)
{
	if(disableAdminManagedLinks=='Y')
	{
		document.forms[0].action ="main.htm?actionCode=comingSoon&viewType=static";
	}
	else
	{
		document.forms[0].action="contentManagement.htm?actionCode=getHtmlFileAsStringForView&viewType=static&FILE_PATH="+link;
	}
	document.forms[0].submit();
}
function showHomePage()
{
	document.forms[0].action="main.htm?actionCode=showHomePageLnclick";
	document.forms[0].submit();
}