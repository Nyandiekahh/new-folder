	function showQueries(){document.leftMenu.action="postQuery.htm?actionCode=showQueries";document.leftMenu.submit();}
	function logOutUser(){document.leftMenu.action="login.htm?actionCode=logOutUser";document.leftMenu.submit();}
	function openCommodities(){document.leftMenu.action="commodity.htm?actionCode=getCommodities";document.leftMenu.submit();}
	function openCnclDlr(a){document.leftMenu.operation.value=a;document.leftMenu.action="cnclDlrList.htm?actionCode=getCnclDlrList";document.leftMenu.submit();}
	function openTrackStatus(){document.leftMenu.action="trackYrStatusController.htm?actionCode=loadPage";document.leftMenu.submit();}
	function showFeedback(){document.leftMenu.action="main.htm?actionCode=openFeedback";document.leftMenu.submit();}	
	function sendMessage(){document.leftMenu.action="eCommunication.htm";document.leftMenu.actionCode.value="sendMessage";document.leftMenu.submit();}
	function viewReceivedMessages(){document.leftMenu.action="eCommunication.htm?messageType=viewReceived&archFlag=no";document.leftMenu.actionCode.value="viewMessages";document.leftMenu.submit();}
	function viewSentMessages(){document.leftMenu.action="eCommunication.htm?messageType=viewSent&archFlag=no";document.leftMenu.actionCode.value="viewMessages";document.leftMenu.submit();}	
	function holidayList(){document.leftMenu.action="manageHolLst.htm?actionCode=getHolidayLst";document.leftMenu.submit();}
	function siteSurvey(){document.leftMenu.action="siteSurvey.htm?actionCode=fetchQuestions";document.leftMenu.submit();}
	function googleMap(){document.leftMenu.action="googleMap.htm?actionCode=handleRequestInternal";document.leftMenu.submit();}	
	function TitleCase(b){var a=b.split(" ");var d="";for(var c=0;c<a.length;c++){d=d+a[c].substr(0,1).toUpperCase()+a[c].substr(1).toLowerCase()+((c<a.length-1)?" ":"");}document.write(d);}
	function duplicateAckReceipt(){document.leftMenu.action="main.htm?actionCode=loadDuplicateReceipt";document.leftMenu.submit();}
	function viewSuretyDtls(){document.leftMenu.action="viewSuretyDtlsController.htm?actionCode=loadSuretyDtls";document.leftMenu.submit();}
	function openSubject(docId){
		document.leftMenu.action='<%=request.getContextPath()%>/manageUpload.htm?ACTION_TYPE=<%=PortalConstants.ACTION_VIEW%>&DOC_ID='+docId;
		document.leftMenu.submit();
	}	
	
	function tPassUpload(){document.leftMenu.action="transitPassReg.htm?actionCode=showExcepUploadPage";document.leftMenu.submit();}
	function loadIAERegistrationMainPage(){document.leftMenu.action ="eRegIndi.htm?actionCode=loadRegitrationMainPageByIA";document.leftMenu.submit();}
	
	/*Header.jsp
	 * 
	 */
	 function trim(a){return a.replace(/^\s*/,"").replace(/\s*$/,"");}
	 function showHomePage(){window.location.href="main.htm?actionCode=showHomePageLnclick";}
	 function getPos(b){for(var a=zy=0;b!=null;a+=b.offsetLeft,zy+=b.offsetTop,b=b.offsetParent){}return{x:a,y:zy};}
	 function convertURL(){if(window.location.protocol=="http:"){window.location=window.location.href.replace(/^http:/,"https:");}}
	 function clearInput(a,b){if(a.value==b){a.value="";}}
	 function setInput(a,b){if(a.value==""){a.value=b;}}
	//if(zoomType!=null&&zoomType!=""){if(zoomType==0){document.body.className="zoomSmall";clickedSmall();}else{if(zoomType==1){document.body.className="zoomMedium";clickedMedium();}else{if(zoomType==2){document.body.className="zoomLarge";clickedLarge();}}}}else{setCookie("zoomType",0);}
	
	 function clearField(){document.getElementById("text").value="";}
	 function langChange(a){if(a=="HI"){document.frmHeader.siteLanguage.value="en";document.frmHeader.action="main.htm?actionCode=setUserLanguage";document.frmHeader.submit();}else{if(a=="EN"){document.getElementById("siteLanguage").value="hi";document.frmHeader.action="main.htm?actionCode=setUserLanguage";document.frmHeader.submit();}}}

	
	// Changes started by 511416(Santosh Patel) Added for HTML content view 
	function viewHtmlContent(filePath)
	{
		document.leftMenu.action="contentManagement.htm?actionCode=getHtmlFileAsStringForView&FILE_PATH="+filePath;
		document.leftMenu.submit();
	}
	
	function viewHtmlContentStatic(filePath)
	{
		document.forms[0].action="contentManagement.htm?actionCode=getHtmlFileAsStringForView&viewType=static&FILE_PATH="+filePath;
		document.forms[0].submit();
	}
	function showStampDutyApprovalForm(){
		document.leftMenu.action ="paymentRegistration.htm?actionCode=loadStampDutyApprovalForm";
		document.leftMenu.submit();
	}
	function showLRM(){
		document.leftMenu.action ="eLandRentMinistry.htm?actionCode=showLandRentMinistry&obligId=21";
		document.leftMenu.submit();
	}
	function showSDCase(){
		document.leftMenu.action ="eLandRentMinistry.htm?actionCode=showLandRentMinistry&obligId=24";
		document.leftMenu.submit();
	}
	//added for VAT witholding --Niladri
	function showVATWitholdingPaymentRegForm()
	{
		  document.leftMenu.action="paymentRegistration.htm?actionCode=showVATWitholdingPrePaymentRegForm";		
		  document.leftMenu.submit();
	}
	// End Changes
	//added for VAT witholding --Kashyap
	function consultAndReprintVATWHTCerti()
	{
		document.leftMenu.action="complianceMonitoring.htm?actionCode=showReprintVATWhtCerti";
		document.leftMenu.submit();
	}
	
	//Added by Amit
	function showReprintVatAgentCertificate(){
		document.leftMenu.action ="eTreAmendment.htm?actionCode=loadAmendmentReprintMainPage";
		document.leftMenu.submit();
	}
	
	function viewVATWHtCertiCnclForm()
	{
		document.leftMenu.action="complianceMonitoring.htm?actionCode=showCancOfVATWHTCerti";
		document.leftMenu.submit();
	}
	
	function checkVATWHTPIN()
	{
		document.forms[0].action ="pinChecker.htm?actionCode=loadWthPage&viewType=static";	
		document.forms[0].submit();
	}
	
	/*function loadITREmpIncomeOnly()
	{
		document.leftMenu.action="eReturns.htm?actionCode=loadITREmpIncomeOnly";
		document.leftMenu.submit();
	} */
	
	
	
	
	//TIMS start
	//added by ali Load man auth Mid screen---tims
	
	function loadManufacturerAuthorizationForMWPage()
	{
		document.leftMenu.action="manufacturerController.htm?actionCode=loadManAuthForMWPage";
		document.leftMenu.submit();
	}
	
// Added by Nidhi to load Manufacturer Authorization for Middle ware page
	
	/*function loadManufacturerAuthorizationForMWPage()
	{
		document.leftMenu.action="manufacturerController.htm?actionCode=loadManAuthForMWPage";
		document.leftMenu.submit();
	}
	*/
	// Added by Nidhi to load Nomination of Supplier page
	
	function loadNomSupplierPage()
	{
		document.leftMenu.action="supplierController.htm?actionCode=loadNominationOfSupplierPage";
		document.leftMenu.submit();
	}
	
   // Added by Nidhi to load Nomination of VAR page
	
	function loadNomVARPage()
	{
		document.leftMenu.action="varController.htm?actionCode=loadNominationOfVARPage";
		document.leftMenu.submit();
	}
	
   // Added by Nidhi to load Request for Key Generation page
	
	function loadKeyGenPage()
	{
		document.leftMenu.action="middlewareController.htm?actionCode=loadReqForKeyGenPage";
		document.leftMenu.submit();
	}
	
   // Added by Nidhi to load Sales Declaration for Middle ware page
	
	function loadSalesDeclarationMWPage()
	{
		document.leftMenu.action="middlewareController.htm?actionCode=loadSalesDecForMWPage";
		document.leftMenu.submit();
	}
	
   // Added by Nidhi to load Supplier's Declaration for MW Supply page
	
	function loadSuppDecMWSupplyPage()
	{
		document.leftMenu.action="supplierController.htm?actionCode=loadSuppDecOfMWSupplyPage";
		document.leftMenu.submit();
	}
	
   // Added by Nidhi to load Manufacturer's Declaration for MW Supply page
	
	function loadManDecMWSupplyPage()
	{
		document.leftMenu.action="manufacturerController.htm?actionCode=loadManDecOfMWSupplyPage";
		document.leftMenu.submit();
	}	
	
	// Addeed by Riya to load Manufacturer Reactivation form
	function showManReactivation()
	{
		document.leftMenu.action="manufacturerController.htm?actionCode=showManReactivation";
		document.leftMenu.submit();
	}

	// Addeed by Riya to load Supplier Reactivation form
	function showSupReactivation()
	{
		document.leftMenu.action="supplierController.htm?actionCode=showSupReactivation";
		document.leftMenu.submit();
	}
	
	// Addeed by Riya to load Manufacturer Reactivation form
	function showVarReactivation()
	{
		document.leftMenu.action="varController.htm?actionCode=showVARReactivation";
		document.leftMenu.submit();
	}
	
	// Added by Kena to load Supplier De-Registration Form
	
	function loadSupplierDeRegForm()
	{
		document.leftMenu.action="supplierController.htm?actionCode=loadSupplierDeRegistrationForm";
		document.leftMenu.submit();
	}
	
	// Added by Kena to load Invoice Data Upload Form
	
	function loadInvoiceDataUploadForm()
	{
		document.leftMenu.action="middlewareController.htm?actionCode=loadInvoiceDataForm";
		document.leftMenu.submit();
	}
	
	 //Added by paridhi bhawsar for TIMS ( Application for Manufacturer Authorization)
/*	function appForManufacturerAuth()
	{  
		document.leftMenu.action="manufacturerAuthorizationController.htm?actionCode=appForManufacturerAuth";
		document.leftMenu.submit();
	}*/
	
	 //Added by paridhi bhawsar for TIMS ( Download HS codes)
	function appDownloadHSCode()
	{  
		document.leftMenu.action="middlewareController.htm?actionCode=appDownloadHSCode";
		document.leftMenu.submit();
	}
	

	 //Added by paridhi bhawsar for TIMS (Request for Retirement of Middleware Device)
	function appRetirementMiddlewareDevice()
	{  
		document.leftMenu.action="middlewareController.htm?actionCode=appRetirementMiddlewareDevice";
		document.leftMenu.submit();
	}
	

	//Added by Lipsa Shah for Manufacturer De Registration 
	function loadManuFacturerDeRegForm()
	{
		document.leftMenu.action="manufacturerController.htm?actionCode=showManufactDeRegForm"; 
		document.leftMenu.submit();
	}
	
	//Added by Lipsa Shah for VAR De Registration 
	function loadVARDeRegPage()
	{
		document.leftMenu.action="varController.htm?actionCode=showVARDeRegForm";
		document.leftMenu.submit();
	}
	
	//added by Bijal to Download production keys
	
	function downloadProductionKeys()
	{
		document.leftMenu.action="middlewareController.htm?actionCode=downloadProductionKeys";
		document.leftMenu.submit();
	}
	
	//TIMS end
	
	function loadITExemptReg(){
		document.leftMenu.action ="tss.htm?actionCode=loadITExemptReg";
		document.leftMenu.submit();
	}
	
	//Added by Buluma and Kirui 
	function loadVatWhtExemptReg(){
		document.leftMenu.action ="tss.htm?actionCode=loadVatWhtExemptReg";
		document.leftMenu.submit();
	}
	
	function loadReprintAckDtlsForm()
	{
		document.leftMenu.action ="reprintPage.htm?actionCode=loadReprintPage";	
		document.leftMenu.submit();
	}
	
	//Added by Bhavna(970781) for download of TFS installer
	function viewDownloadTFSInstaller(){
		document.leftMenu.action="contentManagement.htm?actionCode=viewDownloadsTFS";
		document.leftMenu.submit();
	}
	//Added by Sam and Buluma for IT WHT Paypoint :: START
	function showITWitholdingPaymentRegForm()
	{
		  document.leftMenu.action="paymentRegistration.htm?actionCode=showITWitholdingPrePaymentRegForm";		
		  document.leftMenu.submit();
	}
	function reprintWHTCerti()
	{
		document.leftMenu.action="complianceMonitoring.htm?actionCode=showReprintWhtCerti";
		document.leftMenu.submit();
	}
	//Added by Sam and Buluma for IT WHT Paypoint :: END
	
	//Added by  Ben and Philemon for RIWHT Paypoints :: START
	function showRIWitholdingPaymentRegForm()
	{
		  document.leftMenu.action="paymentRegistration.htm?actionCode=showRIWitholdingPrePaymentRegForm";		
		  document.leftMenu.submit();
	}
	
	//Added by  Ben and Philemon for RIWHT Paypoints :: START
	
	
