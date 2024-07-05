function openFAQ1() {
	document.linkForm.action = "faq.htm?actionCode=faqManagement&operation=view&viewType=static";
	document.linkForm.submit();
}
function showQueries1() {
	document.linkForm.action = "postQuery.htm?actionCode=showPostQuery&viewType=static";
	document.linkForm.submit();
}
function holidayList1() {
	document.linkForm.action = "manageHolLst.htm?actionCode=getHolidayLst&viewType=static";
	document.linkForm.submit();
}
function goToImportExport1() {
	document.linkForm.action = "exchangeRate.htm?actionCode=loadImportExport&viewType=static";
	document.linkForm.submit();
}
function showEvent() {
	document.linkForm.action = "manageEvent.htm?actionCode=getEventLst&viewType=static";
	document.linkForm.submit();
}
function getDownloads() {
	document.linkForm.action = "contentManagement.htm?actionCode=viewDownloads&viewType=static";
	document.linkForm.submit();
}
function openNewsTree() {
	document.linkForm.action = "manageUpload.htm?ACTION_TYPE=newsTree";
	document.linkForm.submit();
}
function forgotPassword() {
	document.linkForm.action = "login.htm?actionCode=loadForgotPassPage";
	document.linkForm.submit();
}
function trackYourStatus() {
	document.linkForm.action = "trackYrStatusController.htm?actionCode=loadPage";
	document.linkForm.submit();
}
function loadERegistrationMainPage() {
	document.linkForm.action = "eRegIndi.htm?actionCode=loadRegitrationMainPage";
	document.linkForm.submit();
}
function pinchecker() {
	document.linkForm.action = "pinChecker.htm?actionCode=loadPage";
	document.linkForm.submit();
}
function emishare_click1(c,a) {
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
function rssOpenAjax(path) {
	var a = this;
	var c = path + "/rssFeed.htm?actionCode=createRSSXML";
	if (window.XMLHttpRequest) {
		a.xmlHttpReq = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) {
			a.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	a.xmlHttpReq.open("POST", c, true);
	a.xmlHttpReq.onreadystatechange = function() {
		if (a.xmlHttpReq.readyState == 4) {
			var d = a.xmlHttpReq.responseText;
			if (d == "true") {
				window
						.open(
								path + "/KRARSS.xml",
								"KRA_RSS_Feeds",
								"height=500,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,status=yes");
				return true;
			} else {
				return false;
			}
		}
	};
	a.xmlHttpReq.send(null);
}