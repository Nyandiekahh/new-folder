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

function validateFutureDate(from){
	  
	//alert(serverDate);
  if (from.value != '')
  {  
   var passmonth;
   var passyear;
   var passday;    
   var todayDate=formatDate(new Date());
   if (chkdate(from) == false)
   {
   alert("Please fill in dd/mm/yyyy format");
    return false;
    }
      
      if (!fnCompareDates(from.value,todayDate))
      {
         alert("Date should not be a future date.");
         return false;
      }
      else
         { 
        return true;
         }
      
  }
	
	
}

//GET NUMBER OF DAYS IN MONTH
//GET LAST DATE OF MONTH
function getLastDateOfMonth(year,month)  {

  var days;
  // RETURN 31 DAYS
  if (month==1 || month==3 || month==5 || month==7 || month==8 ||
      month==10 || month==12)  {
      days=31;
  }
  // RETURN 30 DAYS
  else if (month==4 || month==6 || month==9 || month==11) {
      days=30;
  }
  // RETURN 29 DAYS
  else if (month==2)  {
      if (isLeapYear(year)) {
          days=29;
      }
      // RETURN 28 DAYS
      else {
          days=28;
      }
  }
  return (days);
}
//GET LAST DATE OF YEAR
function getLastDateOfYear(year){
	 return "31/12/"+year;   
}
//GET FIRST DATE OF YEAR
function getFirstDateOfYear(year){
	 return "01/01/"+year;   
}

//GET FIRST DATE OF MONTH 
function getFirstDateOfMonth(date)
{
    var dateValue = date;
    
    var day = dateValue.substr(0,2);
    var month = dateValue.substr(3,2); 
    var year = dateValue.substr(6,9);
    
   return "01/"+month+"/"+year;
  
}

//this method will add days,month and year to a given date.
//@param: 'dd/mm/yyyy',days,month,year
//@return 'dd/mm/yyyy'  resulting date.
function addDateMonthYr(cDate,days,month,yr){
        days = parseInt(days);
        month = parseInt(month);
        yr = parseInt(yr);
        var uDobj = createDateObj(cDate);
        var tMonth = (uDobj.getMonth()+1) + month;
        var cYr = parseInt((tMonth-1)/12);
        var tMonth = ((tMonth-1)%12)+1;
        var tDate = uDobj.getDate()+'/'+ tMonth +'/'+ (uDobj.getFullYear() + cYr + yr);
        return addDaysToDate(tDate,days);
}

//@param : dt(in 'dd/mm/yyyy'),var(should be a number)
//@returns: var in 'dd/mm/yyyy'.
//Testcase: alert(addDaysToDate('12/5/2005','365'));
function addDaysToDate(dt,noOfDays){
    var nDt = createDateObj(dt);
    var sVal = parseInt(noOfDays);
    nDt.setDate(nDt.getDate()+sVal);
    var outMonth = (parseInt(nDt.getMonth())+1)+'';  //as javascript months is from 0 to 11
    var outDay = nDt.getDate() +'';
    if(outDay.length == 1){
            outDay = '0' + outDay;
    }
    if(outMonth.length == 1){
            outMonth = '0'+outMonth;
    }
    var retVal = outDay +"/"+outMonth+"/"+nDt.getFullYear();
    return retVal;
}


//@param : Date object,number of month
//@returns: Date object

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}