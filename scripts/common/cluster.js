// Conducts a search on the Google search results page
function Perform_Search	(blnSingleMarketSegmentSearch, blnSearchWithinResults, iFormNum, strMarketSegment, strAtoGovCol, strLegalCol)
{   				
   
    var frmSearchResults = document.forms[iFormNum];
	var query = frmSearchResults.q.value;
	var as_q_Value = '';

	// for a Searh Within Results search, create a new variable to hold the searched value
	if (blnSearchWithinResults) {
		as_q_Value = document.getElementsByName("as_q")[0].value;	
	}

	// display error message if no site selected
	if ((!blnSingleMarketSegmentSearch) && (!frmSearchResults.chkATOGov.checked) && (!frmSearchResults.chkLegal.checked)) {	
		document.getElementById("divNoSiteError").style.display = '';
		document.getElementById("divNoSearchError").style.display = 'none';
	} // display an error message if no search string entered
	else if (query == '' || (blnSearchWithinResults && as_q_Value == '')) {
		document.getElementById("divNoSearchError").style.display = '';
		document.getElementById("divNoSiteError").style.display = 'none';
	} else {
		var ATO_GOV = strAtoGovCol;
		var ATO_LAW = strLegalCol;
		var site;
		var partialFields = '';
	    
		// individual market segment and atogov radio buttons displayed
		if (blnSingleMarketSegmentSearch) {
	        
			var i;
			var rdbPartialFields = frmSearchResults.partialfields;
			
			// the site parameter should always be atogov when searching in a market segment
			site = ATO_GOV;
			
			// loop through the radio buttons collection
			for (i = 0; i < rdbPartialFields.length; i++) {
				// if atogov is selected, set the required fields parameter to empty string
				// and set the market segment to home
				if (rdbPartialFields[i].checked) {
					if (rdbPartialFields[i].value == ATO_GOV) {
						strMarketSegment = "ATO Home";
					} else {	// otherwise set it to the market segment value
						partialFields = rdbPartialFields[i].value;
					}
				}
			}
		} else {	// the ato.gov.au and legal db checkboxes displayed
			
			var chkSearchATOGovControl = frmSearchResults.chkATOGov;
			var chkSearchLegalDBControl = frmSearchResults.chkLegal;
	                
			if (chkSearchATOGovControl.checked && chkSearchLegalDBControl.checked) {
				site = ATO_GOV + '|' + ATO_LAW;
			} else if (chkSearchLegalDBControl.checked) {
				site = ATO_LAW;
			} else {
				site = ATO_GOV;
			}
		}

		// determine if this is a NAT search
		var index = query.toUpperCase().indexOf("NAT");
		var natNumber = '';
		var requiredFields = '';
		
		if (index > -1){
			var charAfterNat = query.charAt(index + 3);
			if (charAfterNat != ' ' & !isNaN(charAfterNat)) {
				natNumber = query.substr(index + 3);
			}
			else if (charAfterNat == ' ' & !isNaN(query.charAt(index + 4)) & query.charAt(index + 4) != ' '){
				natNumber = query.substr(index + 4);
			}
			if (natNumber != '') {
			    natNumber = natNumber.replace(/^0+/, '');
			    requiredFields = 'ato_reference_natnumber:' + natNumber;
				query = natNumber;
				partialFields = '';
				strMarketSegment = "ATO Home";
			}
		}   
	        
		// Determine if it is a QC search
        index = query.toUpperCase().indexOf("QC");
        var qcNumber = '';
        if (index > -1) {
            var charAfterQC = query.charAt(index + 2);
            if (charAfterQC != ' ') //& !isNaN(charAfterQC))
            {
                qcNumber = query.substr(index + 2);
            }
            else if (charAfterQC == ' ' & !isNaN(query.charAt(index + 3)) & query.charAt(index + 3) != ' '){
                qcNumber = query.substr(index + 3);
            }
            if (qcNumber != '') {
            
				//partial fields way of doing it             								                 
                partialFields = 'dc_identifier:' + qcNumber;
                query = qcNumber;
				required='';
				strMarketSegment = "ATO Home";
            }
        }
        
        // partial parm to filter results
		var searchYears = DetermineSearchYears(partialFields);
		partialFields = searchYears;
	    
	    // required parm to filter results
	    // don't return results that are "index only" or not searchable
		
		if (requiredFields != '')
		{
		    var newrequired = "(" + requiredFields + ")." 
		    requiredFields = newrequired;
		}
		requiredFields += "-ROBOTS:Index%20Only.-ROBOTS:Not%20Searchable";
	    	    
		// create a query string and navigate to the GoogleSearchResults.asp page
		var url = "/Search/GoogleSearchResults.aspx?";
		if (blnSearchWithinResults){
			// replace the spaces with '+'
			url += "as_q=" + escape(as_q_Value.replace(/ /g, "+")) + "&";
		}
		// replace the spaces with '+'
		url += "q=" + escape(query.replace(/ /g, "+"));
		// replace '|' character with double encoded version
		url += "&site=" + site;
        url += "&requiredfields=" + requiredFields;
        url += "&partialfields=" + partialFields;
        url += "&ms=" + strMarketSegment;

		window.location = url;
	}
	
}

// Performs a search when the Enter key is pressed
function checkEnterKeyPress(e, iFormNum)
{	
	if(e.keyCode==13){
		document.forms[iFormNum].btnSearch.focus();
	}
}

function DetermineSearchYears(partial) {
    var prevyearsbox;
    var currentYear;
    var currentMonthYear;
    var currentMonth;
    var monthLength;
    var currentYearString;
    var d = new Date();
    var newpartial;

    currentYear = d.getFullYear();

    // add 1 to current month as count starts at 0 ie. Jan = 0 ...
    currentMonth = d.getMonth() + 1;

    monthLength = currentMonth.toString().length;
    // add leading zero ie. 0109
    if (monthLength == 1)
        currentMonth = "0" + currentMonth;

    currentYearString = currentYear.toString();
    currentMonthYear = currentMonth + (currentYearString.substr(2));

    // if partial is not empty we have to add brackets etc for logic
    if (partial != '') {
        newpartial = "(" + partial + ")" + "." + "(";
        newpartial += "dc_date_filter:" + currentYear + "|dc_date_filter:" + currentMonthYear + ")";

        partial = newpartial;
    }
    else {
        partial += "dc_date_filter:" + currentYear + "|dc_date_filter:" + currentMonthYear;
    }
    return partial;
}

// copied from google3/java/com/google/caribou/antlers/fin/jsdata

//------------------------------------------------------------------------
// This file contains common utilities and basic javascript infrastructure.
//
// Notes:
// * Press 'D' to toggle debug mode.
//
// Functions:
//
// - Assertions
// DEPRECATED: Use assert.js
// AssertTrue(): assert an expression. Throws an exception if false.
// Fail(): Throws an exception. (Mark block of code that should be unreachable)
// AssertEquals(): assert that two values are equal.
// AssertNumArgs(): assert number of arguments for the function
// AssertType(): assert that a value has a particular type
//
// - Cookies
// SetCookie(): Sets a cookie.
// ExpireCookie(): Expires a cookie.
// GetCookie(): Gets a cookie value.
//
// - Dynamic HTML/DOM utilities
// MaybeGetElement(): get an element by its id
// GetElement(): get an element by its id
// GetParentNode(): Get the parent of an element
// GetAttribute(): Get attribute value of a DOM node
// SetInnerHTML(): set the inner HTML of a node
// GetInnerHTML(): get the inner HTML of a node
// ClearInnerHTML(): clear the inner HTML of a node
// SetCssStyle(): Sets a CSS property of a node.
// GetStyleProperty(): Get CSS property from a style attribute string
// ShowElement(): Show/hide element by setting the "display" css property.
// ShowBlockElement(): Show/hide block element
// SetButtonText(): Set the text of a button element.
// AppendNewElement(): Create and append a html element to a parent node.
// CreateDIV(): Create a DIV element and append to the document.
// CreateIFRAME(): Create an IFRAME and append to the document.
// HasClass(): check if element has a given class
// AddClass(): add a class to an element
// RemoveClass(): remove a class from an element
//
// - Window/Screen utiltiies
// GetPageOffsetLeft(): get the X page offset of an element
// GetPageOffsetTop(): get the Y page offset of an element
// GetPageOffset(): get the X and Y page offsets of an element
// GetPageOffsetRight() : get X page offset of the right side of an element
// GetPageOffsetRight() : get Y page offset of the bottom of an element
// GetScrollTop(): get the vertical scrolling pos of a window.
// GetScrollLeft(): get the horizontal scrolling pos of a window
// IsScrollAtEnd():  check if window scrollbar has reached its maximum offset
// ScrollTo(): scroll window to a position
// ScrollIntoView(): scroll window so that an element is in view.
// GetWindowWidth(): get width of a window.
// GetWindowHeight(): get height of a window
// GetAvailScreenWidth(): get available screen width
// GetAvailScreenHeight(): get available screen height
// GetNiceWindowHeight(): get a nice height for a new browser window.
// Open{External/Internal}Window(): open a separate window
// CloseWindow(): close a window
//
// - DOM walking utilities
// AnnotateTerms(): find terms in a node and decorate them with some tag
// AnnotateText(): find terms in a text node and decorate them with some tag
//
// - String utilties
// HtmlEscape(): html escapes a string
// HtmlUnescape(): remove html-escaping.
// QuoteEscape(): escape " quotes.
// CollapseWhitespace(): collapse multiple whitespace into one whitespace.
// Trim(): trim whitespace on ends of string
// IsEmpty(): check if CollapseWhiteSpace(String) == ""
// IsLetterOrDigit(): check if a character is a letter or a digit
// ConvertEOLToLF(): normalize the new-lines of a string.
// HtmlEscapeInsertWbrs(): HtmlEscapes and inserts <wbr>s (word break tags)
//   after every n non-space chars and/or after or before certain special chars
//
// - TextArea utilities
// GetCursorPos(): finds the cursor position of a textfield
// SetCursorPos(): sets the cursor position in a textfield
//
// - Array utilities
// FindInArray(): do a linear search to find an element value.
// DeleteArrayElement(): return a new array with a specific value removed.
// CloneObject(): clone an object, copying its values recursively.
// CloneEvent(): clone an event; cannot use CloneObject because it
//               suffers from infinite recursion
//
// - Formatting utilities
// PrintArray(): used to print/generate HTML by combining static text
// and dynamic strings.
// ImageHtml(): create html for an img tag
// FormatJSLink(): formats a link that invokes js code when clicked.
// MakeId3(): formats an id that has two id numbers, eg, foo_3_7
//
// - Timeouts
// SafeTimeout(): sets a timeout with protection against ugly JS-errors
// CancelTimeout(): cancels a timeout with a given ID
// CancelAllTimeouts(): cancels all timeouts on a given window
//
// - Miscellaneous
// IsDefined(): returns true if argument is not undefined
//------------------------------------------------------------------------

// browser detection
function BR_AgentContains_(str) {
  if (str in BR_AgentContains_cache_) {
    return BR_AgentContains_cache_[str];
  }  
  
  return BR_AgentContains_cache_[str] = 
    (navigator.userAgent.toLowerCase().indexOf(str) != -1);
}
// We cache the results of the indexOf operation. This gets us a 10x benefit in
// Gecko, 8x in Safari and 4x in MSIE for all of the browser checks
var BR_AgentContains_cache_ = {};

function BR_IsIE() {
  return BR_AgentContains_('msie');
}

function BR_IsKonqueror() {
  return BR_AgentContains_('konqueror');
}

function BR_IsSafari() {
  return BR_AgentContains_('safari') || BR_IsKonqueror();
}

function BR_IsNav() {
  return !BR_IsIE() && 
         !BR_IsSafari() && 
         BR_AgentContains_('mozilla');
}

function BR_IsWin() {
  return BR_AgentContains_('win');
}

var BACKSPACE_KEYCODE = 8;
var COMMA_KEYCODE = 188;                // ',' key
var DEBUG_KEYCODE = 68;                 // 'D' key
var DELETE_KEYCODE = 46;
var DOWN_KEYCODE = 40;                  // DOWN arrow key
var ENTER_KEYCODE = 13;                 // ENTER key
var ESC_KEYCODE = 27;                   // ESC key
var LEFT_KEYCODE = 37;                  // LEFT arrow key
var RIGHT_KEYCODE = 39;                 // RIGHT arrow key
var SPACE_KEYCODE = 32;                 // space bar
var TAB_KEYCODE = 9;                    // TAB key
var UP_KEYCODE = 38;                    // UP arrow key
var SHIFT_KEYCODE = 16;

// This is a "constant" but has different values depending on the browser
function GetSemicolonKeyCode() {
  return BR_IsIE() ? 186 : 59;
}

var MAX_EMAIL_ADDRESS_LENGTH = 320;     // 64 + '@' + 255
var MAX_SIGNATURE_LENGTH = 1000;        // 1000 chars of maximum signature

//------------------------------------------------------------------------
// Assertions
// DEPRECATED: Use assert.js
//------------------------------------------------------------------------
/**
 * DEPRECATED: Use assert.js
 */
function raise(msg) {
  if (typeof Error != 'undefined') {
    throw new Error(msg || 'Assertion Failed');
  } else {
    throw (msg);
  }
}

/**
 * DEPRECATED: Use assert.js
 *
 * Fail() is useful for marking logic paths that should
 * not be reached. For example, if you have a class that uses
 * ints for enums:
 *
 * MyClass.ENUM_FOO = 1;
 * MyClass.ENUM_BAR = 2;
 * MyClass.ENUM_BAZ = 3;
 *
 * And a switch statement elsewhere in your code that
 * has cases for each of these enums, then you can
 * "protect" your code as follows:
 *
 * switch(type) {
 *   case MyClass.ENUM_FOO: doFooThing(); break;
 *   case MyClass.ENUM_BAR: doBarThing(); break;
 *   case MyClass.ENUM_BAZ: doBazThing(); break;
 *   default:
 *     Fail("No enum in MyClass with value: " + type);
 * }
 *
 * This way, if someone introduces a new value for this enum
 * without noticing this switch statement, then the code will
 * fail if the logic allows it to reach the switch with the
 * new value, alerting the developer that he should add a
 * case to the switch to handle the new value he has introduced.
 *
 * @param {string} opt_msg to display for failure
 *                 DEFAULT: "Assertion failed"
 */
function Fail(opt_msg) {
  if (opt_msg === undefined) opt_msg = 'Assertion failed';
  if (IsDefined(DumpError)) DumpError(opt_msg + '\n');
  raise(opt_msg);
}

/**
 * DEPRECATED: Use assert.js
 *
 * Asserts that an expression is true (non-zero and non-null).
 *
 * Note that it is critical not to pass logic
 * with side-effects as the expression for AssertTrue
 * because if the assertions are removed by the
 * JSCompiler, then the expression will be removed
 * as well, in which case the side-effects will
 * be lost. So instead of this:
 *
 *  AssertTrue( criticalComputation() );
 *
 * Do this:
 *
 *  var result = criticalComputation();
 *  AssertTrue(result);
 *
 * @param {anything} expression to evaluate
 * @param {string}   opt_msg to display if the assertion fails
 *
 */
function AssertTrue(expression, opt_msg) {
  if (!expression) {
    if (opt_msg === undefined) opt_msg = 'Assertion failed';
    Fail(opt_msg);
  }
}

/**
 * DEPRECATED: Use assert.js
 *
 * Asserts that two values are the same.
 *
 * @param {anything} val1
 * @param {anything} val2
 * @param {string} opt_msg to display if the assertion fails
 */
function AssertEquals(val1, val2, opt_msg) {
  if (val1 != val2) {
    if (opt_msg === undefined) {
      opt_msg = "AssertEquals failed: <" + val1 + "> != <" + val2 + ">";
    }
    Fail(opt_msg);
  }
}

/**
 * DEPRECATED: Use assert.js
 *
 * Asserts that a value is of the provided type.
 *
 *   AssertType(6, Number);
 *   AssertType("ijk", String);
 *   AssertType([], Array);
 *   AssertType({}, Object);
 *   AssertType(ICAL_Date.now(), ICAL_Date);
 *
 * @param {anything} value
 * @param {constructor function} type
 * @param {string} opt_msg to display if the assertion fails
 */
function AssertType(value, type, opt_msg) {
  // for backwards compatability only
  if (typeof value == type) return;

  if (value || value == "") {
    try {
      if (type == AssertTypeMap[typeof value] || value instanceof type) return;
    } catch (e) { /* failure, type was an illegal argument to instanceof */ }
  }
  if (opt_msg === undefined) {
    if (typeof type == 'function') {
      var match = type.toString().match(/^\s*function\s+([^\s\{]+)/);
      if (match) type = match[1];
    }
    opt_msg = "AssertType failed: <" + value + "> not typeof "+ type;
  }
  Fail(opt_msg);
}

var AssertTypeMap = {
  'string'  : String,
  'number'  : Number,
  'boolean' : Boolean
};

/**
 * DEPRECATED: Use assert.js
 *
 * Asserts that the number of arguments to a
 * function is num. For example:
 *
 * function myFunc(one, two, three) [
 *   AssertNumArgs(3);
 *   ...
 * }
 *
 * myFunc(1, 2); // assertion fails!
 *
 * Note that AssertNumArgs does not take the function
 * as an argument; it is simply used in the context
 * of the function.
 *
 * @param {int} number of arguments expected
 * @param {string} opt_msg to display if the assertion fails
 */
function AssertNumArgs(num, opt_msg) {
  var caller = AssertNumArgs.caller;  // This is not supported in safari 1.0
  if (caller && caller.arguments.length != num) {
    if (opt_msg === undefined) {
      opt_msg = caller.name + ' expected ' + num + ' arguments '
                  + ' but received ' + caller.arguments.length;
    }
    Fail(opt_msg);
  }
}

//------------------------------------------------------------------------
// Cookies
//------------------------------------------------------------------------
var ILLEGAL_COOKIE_CHARS_RE = /[\s;]/
/**
 * Sets a cookie.
 * The max_age can be -1 to set a session cookie. To expire cookies, use
 * ExpireCookie() instead.
 *
 * @param name The cookie name.
 * @param value The cookie value.
 * @param opt_max_age The max age in seconds (from now). Use -1 to set a
 *   session cookie. If not provided, the default is -1 (i.e. set a session
 *   cookie).
 * @param opt_path The path of the cookie, or null to not specify a path
 *   attribute (browser will use the full request path). If not provided, the
 *   default is '/' (i.e. path=/).
 * @param opt_domain The domain of the cookie, or null to not specify a domain
 *   attribute (brower will use the full request host name). If not provided,
 *   the default is null (i.e. let browser use full request host name).
 * @return Void.
 */
function SetCookie(name, value, opt_max_age, opt_path, opt_domain) {

  value = '' + value;
  AssertTrue((typeof name == 'string' &&
              typeof value == 'string' &&
              !name.match(ILLEGAL_COOKIE_CHARS_RE) &&
              !value.match(ILLEGAL_COOKIE_CHARS_RE)),
             'trying to set an invalid cookie');

  if (!IsDefined(opt_max_age)) opt_max_age = -1;
  if (!IsDefined(opt_path)) opt_path = '/';
  if (!IsDefined(opt_domain)) opt_domain = null;

  var domain_str = (opt_domain == null) ? '' : ';domain=' + opt_domain;
  var path_str = (opt_path == null) ? '' : ';path=' + opt_path;

  var expires_str;

  // Case 1: Set a session cookie.
  if (opt_max_age < 0) {
    expires_str = '';

  // Case 2: Expire the cookie.
  // Note: We don't tell people about this option in the function doc because
  // we prefer people to use ExpireCookie() to expire cookies.
  } else if (opt_max_age == 0) {
    // Note: Don't use Jan 1, 1970 for date because NS 4.76 will try to convert
    // it to local time, and if the local time is before Jan 1, 1970, then the
    // browser will ignore the Expires attribute altogether.
    var pastDate = new Date(1970, 1 /*Feb*/, 1);  // Feb 1, 1970
    expires_str = ';expires=' + pastDate.toUTCString();

  // Case 3: Set a persistent cookie.
  } else {
    var futureDate = new Date(Now() + opt_max_age * 1000);
    expires_str = ';expires=' + futureDate.toUTCString();
  }

  document.cookie = name + '=' + value + domain_str + path_str + expires_str;
}

var EXPIRED_COOKIE_VALUE = 'EXPIRED';

/**
 * Expires a cookie.
 *
 * @param name The cookie name.
 * @param opt_path The path of the cookie, or null to expire a cookie set at
 *   the full request path. If not provided, the default is '/' (i.e. path=/).
 * @param opt_domain The domain of the cookie, or null to expire a cookie set
 *   at the full request host name. If not provided, the default is null (i.e.
 *   cookie at full request host name).
 * @return Void.
 */
function ExpireCookie(name, opt_path, opt_domain) {
  SetCookie(name, EXPIRED_COOKIE_VALUE, 0, opt_path, opt_domain);
}

/** Returns the value for the first cookie with the given name
 * @param name : string
 * @return a string or the empty string if no cookie found.
 */
function GetCookie(name) {
  var nameeq = name + "=";
  var cookie = String(document.cookie);
  for (var pos = -1; (pos = cookie.indexOf(nameeq, pos + 1)) >= 0;) {
    var i = pos;
    // walk back along string skipping whitespace and looking for a ; before
    // the name to make sure that we don't match cookies whose name contains
    // the given name as a suffix.
    while (--i >= 0) {
      var ch = cookie.charAt(i);
      if (ch == ';') {
        i = -1;  // indicate success
        break;
      } else if (' \t'.indexOf(ch) < 0) {
        break;
      }
    }
    if (-1 === i) {  // first cookie in the string or we found a ;
      var end = cookie.indexOf(';', pos);
      if (end < 0) { end = cookie.length; }
      return cookie.substring(pos + nameeq.length, end);
    }
  }
  return "";
}


//------------------------------------------------------------------------
// Time
//------------------------------------------------------------------------
function Now() {
  return (new Date()).getTime();
}

//------------------------------------------------------------------------
// Dynamic HTML/DOM utilities
//------------------------------------------------------------------------
// Gets a element by its id, may return null
function MaybeGetElement(win, id) {
  return win.document.getElementById(id);
}

// Same as MaybeGetElement except that it throws an exception if it's null
function GetElement(win, id) {
  var el = win.document.getElementById(id);
  if (!el) {
    DumpError("Element " + id + " not found.");
  }
  return el;
}

// Gets elements by its id/name
// IE treats getElementsByName as searching over ids, while Moz use names.
// so tags must have both id and name as the same string
function GetElements(win, id) {
  return win.document.getElementsByName(id);
}

// Gets the parent of a html element.
function GetParentNode(n) {
  try {
    return n.parentNode;
  } catch (e) {
    // n.parentNode may throw a permission-denied exception on mozilla
    // (e.g. on text element), ignore this exception.
    return n;
  }
}

function IsDescendant(parent, child) {
  do {
    if (parent === child) return true;
    child = GetParentNode(child);
  } while (child && child !== document.body);
  return false;
}

// Get attribute value of a DOM node
function GetAttribute(node, attribute) {
  if (!node.getAttribute) {
    return null;
  }
  var attr = node.getAttribute(attribute);
  if (BR_IsIE() && attribute == "style") {
    return attr.value;
  } else {
    return attr;
  }
}

// Sets inner html of a html element
function SetInnerHTML(win, id, html) {
  try {
    GetElement(win, id).innerHTML = html;
  } catch (ex) {
    DumpException(ex);
  }
}

// Gets inner-html of a html element
function GetInnerHTML(win, id) {
  try {
    return GetElement(win, id).innerHTML;
  } catch (ex) {
    DumpException(ex);
    return "";
  }
}

// Clears inner html of a html element
function ClearInnerHTML(win, id) {
  try {
    GetElement(win, id).innerHTML = "";
  } catch (ex) {
    DumpException(ex);
  }
}

// Sets a CSS style of an element
function SetCssStyle(win, id, name, value) {
  try {
    var elem = GetElement(win, id);
    elem.style[name] = value;
  } catch (ex) {
    DumpException(ex);
  }
}

// Get CSS property from a style attribute string
function GetStyleProperty(style, name) {
  var i = style.indexOf(name);
  if (i != -1) {
    var j = style.indexOf(";", i);
    if (j == -1) {
      j = style.length;
    }
    // the +1 below is for the colon following the attribute name
    return CollapseWhitespace(style.substring(i + name.length + 1, j));
  }
  return null;
}

// Show/hide an element.
function ShowElement(el, show) {
  el.style.display = show ? "" : "none";
}

// Show/hide a block element.
// ShowElement() doesn't work if object has an initial class with display:none
function ShowBlockElement(el, show) {
  el.style.display = show ? "block" : "none";
}

// Show/hide an inline element.
// ShowElement() doesn't work when an element starts off display:none.
function ShowInlineElement(el, show) {
  el.style.display = show ? "inline" : "none";
}

// Set the text of a button. This is to get around a bug in mozilla,
// where we can't set the text of a button by setting innerHTML.
function SetButtonText(button, text) {
  button.childNodes[0].nodeValue = text;
}

// Append a new HTML element to a HTML node.
function AppendNewElement(win, parent, tag) {
  var e = win.document.createElement(tag);
  parent.appendChild(e);
  return e;
}

// Finds the child with the given ID, or null if there is node.
// This does not search the children's children.
function FindChildWithID(parent, id) {
  var el;
  for (el = parent.firstChild; el && el.id != id; el = el.nextSibling) {
    // skip
  }
  return el;
}

// Adds a disabled option to the given menu
function AddMenuDisabledOption(win, menu, html) {
  var op = AppendNewElement(win, menu, 'OPTION');
  op.disabled = true;
  op.innerHTML = html;

  return op;
}

// Adds a option to the given menu
function AddMenuOption(win, menu, value, html) {
  var op = AppendNewElement(win, menu, 'OPTION');
  op.value = value;
  op.innerHTML = html;

  return op;
}

// Create a new DIV (append it to the end of the document)
function CreateDIV(win, id) {
  var div = MaybeGetElement(win, id);
  if (!div) {
    div = AppendNewElement(win, win.document.body, "div");
    div.id = id;
  }
  return div;
}

// Create a new IFRAME (append it to the end of the document)
function CreateIFRAME(win, id, url) {
  var iframe = MaybeGetElement(win, id);
  if (!iframe) {
    // We cannot create an IFRAME directly (IE doesn't allow it), so we
    // create a DIV and then insert an IFRAME.
    // We also give the IFRAME a name (same as id)
    var div = AppendNewElement(win, win.document.body, "div");
    div.innerHTML = "<iframe id=" + id + " name=" + id +
             " src=" + url + "></iframe>";
    iframe = GetElement(win, id);
  }
  return iframe;
}

// Create a new TR containing the given td's
function Tr(win, tds) {
  var tr = win.document.createElement("TR");
  for (var i = 0; i < tds.length; i++) {
    tr.appendChild(tds[i]);
  }
  return tr;
}

// Create a new TD, with an optional colspan
function Td(win, opt_colspan) {
  var td = win.document.createElement("TD");
  if (opt_colspan) {
    td.colSpan = opt_colspan;
  }
  return td;
}


// Check if an element has a given class
function HasClass(el, cl) {
  if (el == null || el.className == null) return false;
  var classes = el.className.split(" ");
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cl) {
      return true;
    }
  }
  return false;
}

// Add a class to element
function AddClass(el, cl) {
  if (HasClass(el, cl)) return;
  el.className += " " + cl;
}

// Remove a class from an element
function RemoveClass(el, cl) {
  if (el.className == null) return;
  var classes = el.className.split(" ");
  var result = [];
  var changed = false;
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] != cl) {
      if (classes[i]) { result.push(classes[i]); }
    } else {
      changed = true;
    }
  }
  if (changed) { el.className = result.join(" "); }
}

// Performs an in-order traversal of the tree rooted at the given node
// (excluding the root node) and returns an array of nodes that match the
// given selector. The selector must implement the method:
//
// boolean select(node);
//
// This method is a generalization of the DOM method "getElementsByTagName"
//
function GetElementsBySelector(root, selector) {
  var nodes = [];
  for (var child = root.firstChild; child; child = child.nextSibling) {
    AddElementBySelector_(child, selector, nodes);
  }
  return nodes;
}

// Recursive helper for GetElemnetsBySelector()
function AddElementBySelector_(root, selector, nodes) {
  // First test the parent
  if (selector.select(root)) {
    nodes.push(root);
  }

  // Then recurse through the children
  for (var child = root.firstChild; child; child = child.nextSibling) {
    AddElementBySelector_(child, selector, nodes);
  }
}

//------------------------------------------------------------------------
// Window/screen utilities
// TODO: these should be renamed (e.g. GetWindowWidth to GetWindowInnerWidth
// and moved to geom.js)
//------------------------------------------------------------------------
// Get page offset of an element
function GetPageOffsetLeft(el) {
  var x = el.offsetLeft;
  if (el.offsetParent != null)
    x += GetPageOffsetLeft(el.offsetParent);
  return x;
}

// Get page offset of an element
function GetPageOffsetTop(el) {
  var y = el.offsetTop;
  if (el.offsetParent != null)
    y += GetPageOffsetTop(el.offsetParent);
  return y;
}

// Get page offset of an element
function GetPageOffset(el) {
  var x = el.offsetLeft;
  var y = el.offsetTop;
  if (el.offsetParent != null) {
    var pos = GetPageOffset(el.offsetParent);
    x += pos.x;
    y += pos.y;
  }
  return {x: x, y: y};
}

function GetPageOffsetRight(el) {
  return GetPageOffsetLeft(el) + el.offsetWidth;
}

function GetPageOffsetBottom(el) {
  return GetPageOffsetTop(el) + el.offsetHeight;
}

// Get the y position scroll offset.
function GetScrollTop(win) {
  // all except Explorer
  if ("pageYOffset" in win) {
    return win.pageYOffset;
  }
  // Explorer 6 Strict Mode
  else if ("documentElement" in win.document &&
           "scrollTop" in win.document.documentElement) {
    return win.document.documentElement.scrollTop;
  }
  // other Explorers
  else if ("scrollTop" in win.document.body) {
    return win.document.body.scrollTop;
  }

  return 0;
}

// Get the x position scroll offset.
function GetScrollLeft(win) {
  // all except Explorer
  if ("pageXOffset" in win) {
    return win.pageXOffset;
  }
  // Explorer 6 Strict Mode
  else if ("documentElement" in win.document &&
           "scrollLeft" in win.document.documentElement) {
    return win.document.documentElement.scrollLeft;
  }
  // other Explorers
  else if ("scrollLeft" in win.document.body) {
    return win.document.body.scrollLeft;
  }

  return 0;
}

/**
 * Checks if window scrollbar has reached its maximum offset
 *
 * @param win a window object
 * @param opt_isHoriz true if horizontal bar, false if vertical
 */
function IsScrollAtEnd(win, opt_isHoriz) {
  var total =
    (opt_isHoriz) ? document.body.offsetWidth : document.body.offsetHeight;
  var inner =
    (opt_isHoriz) ? GetWindowWidth(win) : GetWindowHeight(win);
  var offset =
    (opt_isHoriz) ? GetScrollLeft(win) : GetScrollTop(win);

  return (inner + offset >= total || total < inner);
}

// Scroll window to pos
// position: 0 = top, 0.5 = middle, 1 = bottom
function ScrollTo(win, el, position) {
  var y = GetPageOffsetTop(el);
  y -= GetWindowHeight(win) * position;
  win.scrollTo(0, y);
}

// Scroll so that as far as possible the entire element is in view.
var ALIGN_BOTTOM = 'b';
var ALIGN_MIDDLE = 'm';
var ALIGN_TOP = 't';
function ScrollIntoView(win, el, alignment) {
  var el_top = GetPageOffsetTop(el);
  var el_bottom = el_top + el.offsetHeight;
  var win_top = GetScrollTop(win);
  var win_height = GetWindowHeight(win);
  var win_bottom = win_top + win_height;

  // Out of view?
  if (el_top < win_top ||
      el_bottom > win_bottom) {

    var scrollto_y;
    if (alignment == ALIGN_BOTTOM) {
      scrollto_y = el_bottom - win_height + 5;
    } else if (alignment == ALIGN_MIDDLE) {
      scrollto_y = (el_top + el_bottom) / 2 - win_height/2;
    } else {
      scrollto_y = el_top - 5;        // ALIGN_TOP
    }

    Debug("Scrolling to " + scrollto_y);
    win.scrollTo(0, scrollto_y);
  }
}

function IsElementVisible(win, id) {
  var el = MaybeGetElement(win, id);
  if (el == null) {
    return false;
  }
  var el_top = GetPageOffsetTop(el);
  var el_bottom = el_top + el.offsetHeight;
  var win_top = GetScrollTop(win);
  var win_bottom = win_top + GetWindowHeight(win);
  if (el_top >= win_top && el_bottom <= win_bottom) {
    return true;
  }
  return false;
}

function GetWindowWidth(win) {
  // all except Explorer
  if ("innerWidth" in win) {
    return win.innerWidth;
  }
  // Explorer 6 Strict Mode
  else if ("documentElement" in win.document &&
           "clientWidth" in win.document.documentElement) {
    return win.document.documentElement.clientWidth;
  }
  // other Explorers
  else if ("clientWidth" in win.document.body) {
    return win.document.body.clientWidth;
  }

  return 0;
}

function GetWindowHeight(win) {
  // all except Explorer
  if ("innerHeight" in win) {
    return win.innerHeight;
  }
  // Explorer 6 Strict Mode
  else if ("documentElement" in win.document &&
           "clientHeight" in win.document.documentElement) {
    return win.document.documentElement.clientHeight;
  }
  // other Explorers
  else if ("clientHeight" in win.document.body) {
    return win.document.body.clientHeight;
  }

  return 0;
}

function GetAvailScreenWidth(win) {
  return win.screen.availWidth;
}

function GetAvailScreenHeight(win) {
  return win.screen.availHeight;
}

// Returns a "nice" window height.
// Use the screen height. (Or should we use the height of the current window?)
function GetNiceWindowHeight(win) {
  return Math.floor(0.8 * GetAvailScreenHeight(win));
}

// Used for horizontally centering a new window of the given width in the
// available screen. Set the new window's distance from the left of the screen
// equal to this function's return value.
// Params: width: the width of the new window
// Returns: the distance from the left edge of the screen for the new window to
//   be horizontally centered
function GetCenteringLeft(win, width) {
  return (win.screen.availWidth - width) >> 1;
}

// Used for vertically centering a new window of the given height in the
// available screen. Set the new window's distance from the top of the screen
// equal to this function's return value.
// Params: height: the height of the new window
// Returns: the distance from the top edge of the screen for the new window to
//   be vertically aligned.
function GetCenteringTop(win, height) {
  return (win.screen.availHeight - height) >> 1;
}

/*
 * Opens a child popup window that has no browser toolbar/decorations.
 * (Copied from caribou's common.js library with small modifications.)
 *
 * @param url the URL for the new window (Note: this will be unique-ified)
 * @param opt_name the name of the new window
 * @param opt_width the width of the new window
 * @param opt_height the height of the new window
 * @param opt_center if true, the new window is centered in the available screen
 * @param opt_hide_scrollbars if true, the window hides the scrollbars
 * @param opt_noresize if true, makes window unresizable
 * @param opt_blocked_msg message warning that the popup has been blocked
 * @return a reference to the new child window
 */
function Popup(url, opt_name, opt_width, opt_height, opt_center,
               opt_hide_scrollbars, opt_noresize, opt_blocked_msg) {
  if (!opt_height) {
    opt_height = Math.floor(GetWindowHeight(window.top) * 0.8);
  }
  if (!opt_width) {
    opt_width = Math.min(GetAvailScreenWidth(window), opt_height);
  }

  var features = "resizable=" + (opt_noresize ? "no" : "yes") + "," +
                 "scrollbars=" + (opt_hide_scrollbars ? "no" : "yes") + "," +
                 "width=" + opt_width + ",height=" + opt_height;
  if (opt_center) {
    features += ",left=" + GetCenteringLeft(window, opt_width) + "," +
                "top=" + GetCenteringTop(window, opt_height);
  }
  return OpenWindow(window, url, opt_name, features, opt_blocked_msg);
}

/*
 * Opens a new window. Returns the new window handle. Tries to open the new
 * window using top.open() first. If that doesn't work, then tries win.open().
 * If that still doesn't work, prints an alert.
 * (Copied from caribou's common.js library with small modifications.)
 *
 * @param win the parent window from which to open the new child window
 * @param url the URL for the new window (Note: this will be unique-ified)
 * @param opt_name the name of the new window
 * @param opt_features the properties of the new window
 * @param opt_blocked_msg message warning that the popup has been blocked
 * @return a reference to the new child window
 */
function OpenWindow(win, url, opt_name, opt_features, opt_blocked_msg) {
  var newwin = OpenWindowHelper(top, url, opt_name, opt_features);
  if (!newwin || newwin.closed || !newwin.focus) {
    newwin = OpenWindowHelper(win, url, opt_name, opt_features);
  }
  if (!newwin || newwin.closed || !newwin.focus) {
    if (opt_blocked_msg) alert(opt_blocked_msg);
  } else {
    // Make sure that the window has the focus
    newwin.focus();
  }
  return newwin;
}

/*
 * Helper for OpenWindow().
 * (Copied from caribou's common.js library with small modifications.)
 */
function OpenWindowHelper(win, url, name, features) {
  var newwin;
  if (features) {
    newwin = win.open(url, name, features);
  } else if (name) {
    newwin = win.open(url, name);
  } else {
    newwin = win.open(url);
  }
  return newwin;
}

//------------------------------------------------------------------------
// DOM walking utilities
//------------------------------------------------------------------------

function MaybeEscape(str, escape) {
  return escape ? HtmlEscape(str) : str;
}


//------------------------------------------------------------------------
// Window data
//------------------------------------------------------------------------
// Gets an array, which can store data for the window. This data
// is deleted when the window is unloaded.
var windata = [];
function GetWindowData(win) {
  var data = windata[win.name];
  if (!data) {
    windata[win.name] = data = [];
  }
  return data;
}

// Clear js data for a window.
function ClearWindowData(win_name) {
  if (windata[win_name]) {
    windata[win_name] = null;
  }
}

//------------------------------------------------------------------------
// String utilities
//------------------------------------------------------------------------
// Do html escaping
var amp_re_ = /&/g;
var lt_re_ = /</g;
var gt_re_ = />/g;

// Convert text to HTML format. For efficiency, we just convert '&', '<', '>'
// characters.
// Note: Javascript >= 1.3 supports lambda expression in the replacement
// argument. But it's slower on IE.
// Note: we can also implement HtmlEscape by setting the value
// of a textnode and then reading the 'innerHTML' value, but that
// that turns out to be slower.
// Params: str: String to be escaped.
// Returns: The escaped string.
function HtmlEscape(str) {
  if (!str) return "";
  return str.replace(amp_re_, "&amp;").replace(lt_re_, "&lt;").
    replace(gt_re_, "&gt;").replace(quote_re_, "&quot;");
}

/** converts html entities to plain text.  It covers the most common named
 * entities and numeric entities.
 * It does not cover all named entities -- it covers &{lt,gt,amp,quot,nbsp}; but
 * does not handle some of the more obscure ones like &{ndash,eacute};.
 */
function HtmlUnescape(str) {
  if (!str) return "";
  return str.
    replace(/&#(\d+);/g,
      function (_, n) { return String.fromCharCode(parseInt(n, 10)); }).
    replace(/&#x([a-f0-9]+);/gi,
      function (_, n) { return String.fromCharCode(parseInt(n, 16)); }).
    replace(/&(\w+);/g, function (_, entity) {
      entity = entity.toLowerCase();
      return entity in HtmlUnescape_unesc_ ? HtmlUnescape_unesc_[entity] : '?';
    });
}
var HtmlUnescape_unesc_ = { lt: '<', gt: '>', quot: '"', nbsp: ' ', amp: '&' };

// Replace multiple spaces with &nbsp; to retain whitespace formatting
// in addition to escaping '&', '<', and '>'.
var dbsp_re_ = /  /g;
var ret_re_ = /\r/g;
var nl_re_ = /\n/g;
function HtmlWhitespaceEscape(str) {
  str = HtmlEscape(str);
  str = str.replace(dbsp_re_, "&nbsp;&nbsp;");
  str = str.replace(ret_re_, "");
  str = str.replace(nl_re_, "<br>");
  return str;
}

// Escape double quote '"' characters in addition to '&', '<', '>' so that a
// string can be included in an HTML tag attribute value within double quotes.
// Params: str: String to be escaped.
// Returns: The escaped string.
var quote_re_ = /\"/g;
function QuoteEscape(str) {
  return HtmlEscape(str).replace(quote_re_, "&quot;");
}

var JS_SPECIAL_RE_ = /[\'\\\r\n\b\"<>&\u0085\u2028\u2029]/g;

function JSEscOne_(s) {
  return JSEscOne_.js_escs_[s];
}

/** convert a string to a javascript string literal.  This function has the
  * property that the return value is also already html escaped, so the output
  * can be embedded in an html handler attribute.
  */
function ToJSString(s) {
  if (!JSEscOne_.js_escs_) {
    var escapes = {};
    escapes['\\'] = '\\\\';
    escapes['\''] = '\\047';
    escapes['\b'] = '\\b';
    escapes['\"'] = '\\042';
    escapes['<'] =  '\\074';
    escapes['>'] =  '\\076';
    escapes['&'] =  '\\046';
    // newline characters according to
    // http://www.mozilla.org/js/language/js20/formal/lexer-grammar.html
    escapes['\n'] = '\\n';
    escapes['\r'] = '\\r';
    escapes['\u0085'] = '\\205';
    escapes['\u2028'] = '\\u2028';
    escapes['\u2029'] = '\\u2029';

    JSEscOne_.js_escs_ = escapes;
  }

  return "'" + s.toString().replace(JS_SPECIAL_RE_, JSEscOne_) + "'";
}

// converts multiple ws chars to a single space, and strips
// leading and trailing ws
var spc_re_ = /\s+/g;
var beg_spc_re_ = /^ /;
var end_spc_re_ = / $/;
function CollapseWhitespace(str) {
  if (!str) return "";
  return str.replace(spc_re_, " ").replace(beg_spc_re_, "").
    replace(end_spc_re_, "");
}

var newline_re_ = /\r?\n/g;
var spctab_re_ = /[ \t]+/g;
var nbsp_re_ = /\xa0/g;
function StripNewlines(str) {
  if (!str) return "";
  return str.replace(newline_re_, " ");
}

function CanonicalizeNewlines(str) {
  if (!str) return "";
  return str.replace(newline_re_, '\n');
}

function HtmlifyNewlines(str) {
  if (!str) return "";
  return str.replace(newline_re_, "<br>");
}

function NormalizeSpaces(str) {
  if (!str) return "";
  return str.replace(spctab_re_, " ").replace(nbsp_re_, " ");
}

// URL encodes the string.
function UrlEncode(str) {
  return encodeURIComponent(str);
}

// URL-decodes the string. We need to specially handle '+'s because
// the javascript library doesn't properly convert them to spaces
var plus_re_ = /\+/g;
function UrlDecode(str) {
  return decodeURIComponent(str.replace(plus_re_, ' '));
}

function Trim(str) {
  if (!str) return "";
  return str.replace(/^\s+/, "").replace(/\s+$/, "");
}

function EndsWith(str, suffix) {
  if (!str) return !suffix;
  return (str.lastIndexOf(suffix) == (str.length - suffix.length));
}

// Check if a string is empty
function IsEmpty(str) {
  return CollapseWhitespace(str) == "";
}

// Check if a character is a letter
function IsLetterOrDigit(ch) {
  return ((ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z") ||
         (ch >= '0' && ch <= '9'));
}

// Check if a character is a space character
function IsSpace(ch) {
  return (" \t\r\n".indexOf(ch) >= 0);
}

// Converts any instances of "\r" or "\r\n" style EOLs into "\n" (Line Feed),
// and also trim the extra newlines and whitespaces at the end.
var eol_re_ = /\r\n?/g;
var trailingspc_re_ = /[\n\t ]+$/;
function NormalizeText(str) {
  return str.replace(eol_re_, "\n").replace(trailingspc_re_, "");
}

// Inserts <wbr>s (word break tag) after every n non-space chars and/or
// after or before certain special chars. The input string should be plain
// text that has not yet been HTML-escaped.
// Params:
//   str: The string to insert <wbr>s into.
//   n: The maximum number of consecutive non-space characters to allow before
//     adding a <wbr>. To turn off this rule (i.e. if you only want to add
//     breaks based on special characters), pass in the value -1.
//   chars_to_break_after: The list of special characters (concatenated into a
//     string) after which a <wbr> should be added, if there is no natural
//     break at that point. To turn off this rule, pass in the empty string.
//   chars_to_break_before: The list of special characters (concatenated into a
//     string) before which a <wbr> should be added, if there is no natural
//     break at that point. To turn off this rule, pass in the empty string.
// Returns: The string str htmlescaped, and with <wbr>s inserted according to
//   the rules specified by the other arguments.
function HtmlEscapeInsertWbrs(str, n, chars_to_break_after,
                              chars_to_break_before) {
  AssertNumArgs(4);

  var out = '';
  var strpos = 0;
  var spc = 0;

  for (var i = 1; i < str.length; ++i) {
    var prev_char = str.charAt(i - 1);
    var next_char = str.charAt(i);
    if (IsSpace(next_char)) {
      spc = i;
    } else if (i - spc == n ||
               chars_to_break_after.indexOf(prev_char) != -1 ||
               chars_to_break_before.indexOf(next_char) != -1) {
      out += HtmlEscape(str.substring(strpos, i)) + '<wbr>';
      strpos = i;
      spc = i;
    }
  }
  out += HtmlEscape(str.substr(strpos));
  return out;
}

// Converts a string to its canonicalized label form.
var illegal_chars_re_ = /[ \/(){}&|\\\"\000]/g;
function CanonicalizeLabel(str, lowercase) {
  var uppercase = str.replace(illegal_chars_re_, '-');
  return lowercase ? uppercase.toLowerCase() : uppercase;
}

// Case-insensitive string comparator
function CompareStringsIgnoreCase(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  if (s1 < s2) {
    return -1;
  } else if (s1 == s2) {
    return 0;
  } else {
    return 1;
  }
}

//------------------------------------------------------------------------
// TextArea utilities
//------------------------------------------------------------------------

// Gets the cursor pos in a text area. Returns -1 if the cursor pos cannot
// be determined or if the cursor out of the textfield.
function GetCursorPos(win, textfield) {
  try {
    if (IsDefined(textfield.selectionEnd)) {
      // Mozilla directly supports this
      return textfield.selectionEnd;

    } else if (win.document.selection && win.document.selection.createRange) {
      // IE doesn't export an accessor for the endpoints of a selection.
      // Instead, it uses the TextRange object, which has an extremely obtuse
      // API. Here's what seems to work:

      // (1) Obtain a textfield from the current selection (cursor)
      var tr = win.document.selection.createRange();

      // Check if the current selection is in the textfield
      if (tr.parentElement() != textfield) {
        return -1;
      }

      // (2) Make a text range encompassing the textfield
      var tr2 = tr.duplicate();
      tr2.moveToElementText(textfield);

      // (3) Move the end of the copy to the beginning of the selection
      tr2.setEndPoint("EndToStart", tr);

      // (4) The span of the textrange copy is equivalent to the cursor pos
      var cursor = tr2.text.length;

      // Finally, perform a sanity check to make sure the cursor is in the
      // textfield. IE sometimes screws this up when the window is activated
      if (cursor > textfield.value.length) {
        return -1;
      }
      return cursor;
    } else {
      Debug("Unable to get cursor position for: " + navigator.userAgent);

      // Just return the size of the textfield
      // TODO: Investigate how to get cursor pos in Safari!
      return textfield.value.length;
    }
  } catch (e) {
    DumpException(e, "Cannot get cursor pos");
  }
  
  return -1;
}

function SetCursorPos(win, textfield, pos) {
  if (IsDefined(textfield.selectionEnd) &&
      IsDefined(textfield.selectionStart)) {
    // Mozilla directly supports this
    textfield.selectionStart = pos;
    textfield.selectionEnd = pos;

  } else if (win.document.selection && textfield.createTextRange) {
    // IE has textranges. A textfield's textrange encompasses the
    // entire textfield's text by default
    var sel = textfield.createTextRange();

    sel.collapse(true);
    sel.move("character", pos);
    sel.select();
  }
}

//------------------------------------------------------------------------
// Array utilities
//------------------------------------------------------------------------
// Find an item in an array, returns the key, or -1 if not found
function FindInArray(array, x) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == x) {
      return i;
    }
  }
  return -1;
}

// Inserts an item into an array, if it's not already in the array
function InsertArray(array, x) {
  if (FindInArray(array, x) == -1) {
    array[array.length] = x;
  }
}

// Delete an element from an array
function DeleteArrayElement(array, x) {
  var i = 0;
  while (i < array.length && array[i] != x)
    i++;
  array.splice(i, 1);
}

// Copies a flat array
function CopyArray(array) {
  var copy = [];
  for (var i = 0; i < array.length; i++) {
    copy[i] = array[i];
  }
  return copy;
}

// Clone an object (recursively)
function CloneObject(x) {
  if ((typeof x) == "object") {
    var y = [];
    for (var i in x) {
      y[i] = CloneObject(x[i]);
    }
    return y;
  }
  return x;
}

/**
 * Clone an event; cannot use CloneObject(event)
 * because it suffers from infinite recursion.
 * Thus, only a subset of the event properties are
 * cloned -- if you need others, just add them
 * to this function (just don't remove any!)
 */
function CloneEvent(ev) {
  var clone = {};
  clone.clientX = ev.clientX;
  clone.clientY = ev.clientY;
  clone.pageX = ev.pageX;
  clone.pageY = ev.pageY;
  clone.type = ev.type;
  clone.srcElement = ev.srcElement;
  clone.target = ev.target;
  clone.cancelBubble = ev.cancelBubble;
  clone.explicitOriginalTarget = ev.explicitOriginalTarget;
  // add more properties here

  return clone;
}

function GetEventTarget(/*Event*/ ev) {
// Event is not a type in IE; IE uses Object for events
//  AssertType(ev, Event, 'arg passed to GetEventTarget not an Event');
  return ev.srcElement || ev.target;
}

/** cancels the event */
// from http://www.quirksmode.org/js/events_order.html
function CancelEvent(/*Event*/ ev) {
  if (BR_IsIE()) {
    ev.cancelBubble = true;
  } else if (ev.stopPropagation) {
    ev.stopPropagation();
  }
}

//------------------------------------------------------------------------
// Formatting utilities
//------------------------------------------------------------------------
// A simple printf type function that takes in a template array, and a data
// array. e.g. PrintArray(["a",,"b",,"c"], ["x", "y"]) => axbyc
function PrintArray(array, data) {
  // Check that the argument count is correct.
  AssertEquals(array.length, data.length * 2 + 1);

  for (var i = 0, idx = 1; i < data.length; i++, idx += 2) {
    array[idx] = data[i];
  }
  return array.join("");
}

function ImageHtml(url, attributes) {
  return "<img " + attributes + " src=" + url + ">";
}

// Formats an object id that has two id numbers, eg, foo_3_7
function MakeId3(idprefix, m, n) {
  return idprefix + m + "_" + n;
}

//------------------------------------------------------------------------
// Email address parsing
//------------------------------------------------------------------------
// Parse an email address of the form "name" <address> into [name, address]
function ParseAddress(addr) {
  var name = "";
  var address = "";
  for (var i = 0; i < addr.length;) {
    var token = GetEmailToken(addr, i);
    if (token.charAt(0) == '<') {
      var end = token.indexOf(">");
      address = token.substring(1, (end != -1) ? end : token.length);
    } else if (address == "") {
      name += token;
    }
    i += token.length;
  }

  // Check if it's a simple email address of the form "jlim@google.com"
  if (address == "" && name.indexOf("@") != -1) {
    address = name;
    name = "";
  }

  name = CollapseWhitespace(name);
  name = StripQuotes(name, "'");
  name = StripQuotes(name, "\"");
  address = CollapseWhitespace(address);
  return [name, address];
}

// Given an email address, get the address part
function GetAddress(address) {
  return ParseAddress(address)[1];
}

// Get the username part of an email address
function GetAddressUsername(address) {
  address = GetAddress(address);
  var at = address.indexOf("@");
  return (at == -1) ? address : address.substr(0, at);
}

// Given an email address, get the personal part
function GetPersonal(address) {
  return ParseAddress(address)[0];
}

// Given an address, get a short name
function GetPersonalElseUsername(address) {
  var personal = GetPersonal(address);
  if (personal != "") {
    return personal;
  } else {
    return GetAddressUsername(address);
  }
}

// Strip ' or " chars around a string
function StripQuotes(str, quotechar) {
  var len = str.length;
  if (str.charAt(0) == quotechar &&
      str.charAt(len - 1) == quotechar) {
    return str.substring(1, len - 1);
  }
  return str;
}

// Convert a string containing list of email addresses into an array
// of strings
function EmailsToArray(str) {
  var result = [];
  var email = "";
  var token;

  for (var i = 0; i < str.length; ) {
    token = GetEmailToken(str, i);
    if (token == ",") {
      AddEmailAddress(result, email);
      email = "";
      i++;
      continue;
    }
    email += token;
    i += token.length;
  }

  // Add last
  if (email !="" || token == ",") {
    AddEmailAddress(result, email);
  }
  return result;
}

// Get the next token from a position in an address string
var openers_ = "\"<([";
var closers_ = "\">)]";
function GetEmailToken(str, pos) {
  var ch = str.charAt(pos);
  var p = openers_.indexOf(ch);
  if (p == -1)
    return ch;
  var end_pos = str.indexOf(closers_.charAt(p), pos + 1);
  var token = (end_pos >= 0) ? str.substring(pos, end_pos + 1) :
              str.substr(pos);
  return token;
}

// Add an email address to the result array.
function AddEmailAddress(result, email) {
  email = CleanEmailAddress(email);
  result[result.length] = email;
}

// Clean up email address:
// - remove extra spaces
// - Surround name with quotes if it contains special characters
// to check if we need " quotes
// Note: do not use /g in the regular expression, otherwise the
// regular expression cannot be reusable.
var specialchars_re_ = /[()<>@,;:\\\".\[\]]/;

function CleanEmailAddress(str) {
  var name_address = ParseAddress(str);
  var name = name_address[0];
  var address = name_address[1];

  if (name.indexOf("\"") == -1) {  // If there's no "
    var quote_needed = specialchars_re_.test(name);
    if (quote_needed) {
      name = "\"" + name + "\"";
    }
  }

  if (name == "")
    return address;
  else if (address == "")
    return name;
  else
    return name + " <" + address + ">";
}

//------------------------------------------------------------------------
// Timeouts
//
// It is easy to forget to put a try/catch block around a timeout function,
// and the result is an ugly user visible javascript error.
// Also, it would be nice if a timeout associated with a window is
// automatically cancelled when the user navigates away from that window.
//
// When storing timeouts in a window, we can't let that variable be renamed
// since the window could be top.js, and renaming such a property could
// clash with any of the variables/functions defined in top.js.
//------------------------------------------------------------------------
/**
 * Sets a timeout safely.
 * @param win the window object. If null is passed in, then a timeout if set
 *   on the js frame. If the window is closed, or freed, the timeout is
 *   automaticaaly cancelled
 * @param fn the callback function: fn(win) will be called.
 * @param ms number of ms the callback should be called later
 */
function SafeTimeout(win, fn, ms) {
  if (!win) win = window;
  if (!win._tm) {
    win._tm = [];
  }
  var timeoutfn = SafeTimeoutFunction_(win, fn);
  var id = win.setTimeout(timeoutfn, ms);

  // Save the id so that it can be removed from the _tm array
  timeoutfn.id = id;

  // Safe the timeout in the _tm array
  win._tm[id] = 1;

  return id;
}

/** Creates a callback function for a timeout*/
function SafeTimeoutFunction_(win, fn) {
  var timeoutfn = function() {
    try {
      fn(win);

      var t = win._tm;
      if (t) {
        delete t[timeoutfn.id];
      }
    } catch (e) {
      DumpException(e);
    }
  };
  return timeoutfn;
}

/** Cancel a timeout */
function CancelTimeout(win, id) {
  if (!win) win = window;
  win.clearTimeout(id);
  if (win._tm) {
    delete win._tm[id];
  }
}

/** Cancels all timeouts for a given window */
function CancelAllTimeouts(win) {
  if (win && win._tm) {
    try {
      for (var i in win._tm) {
        win.clearTimeout(i);
      }
      win._tm = [];
    } catch (e) {
      DumpException(e);
    }
  }
}

//------------------------------------------------------------------------
// Misc
//------------------------------------------------------------------------
// Compare long hex strings
function CompareID(a, b) {
  if (a.length != b.length) {
    return (a.length - b.length);
  } else {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }
}

// Check if a value is defined
function IsDefined(value) {
  return (typeof value) != 'undefined';
}

function GetKeyCode(event) {
  var code;
  if (event.keyCode) {
    code = event.keyCode;
  } else if (event.which) {
    code = event.which;
  }
  return code;
}

// define a forid function to fetch a DOM node by id.
function forid_1(id) {
  return document.getElementById(id);
}
function forid_2(id) {
  return document.all[id];
}

/**
 * Fetch an HtmlElement by id.
 * DEPRECATED: use $ in dom.js
 */
var forid = document.getElementById ? forid_1 : forid_2;



function log(msg) {
  /* a top level window is its own parent.  Use != or else fails on IE with
   * infinite loop.
   */
  try {
    if (window.parent != window && window.parent.log) {
      window.parent.log(window.name + '::' + msg);
      return;
    }
  } catch (e) {
    // Error: uncaught exception: Permission denied to get property Window.log
  }
  var logPane = forid('log');
  if (logPane) {
    var logText = '<p class=logentry><span class=logdate>' + new Date() +
                  '</span><span class=logmsg>' + msg + '</span></p>';
    logPane.innerHTML = logText + logPane.innerHTML;
  } else {
    window.status = msg;
  }
}
function ResizeText(multiplier) {

    //eraseCookie("FontSizeCookie");
    var increasesize = false;
    var spans = document.getElementsByTagName('span');
    var numspans = spans.length;
    if (GetCookie("FontSizeCookie") == null) {
        SetCookie("FontSizeCookie", "1.0", 14);
    }

    for (var a = 0; a < numspans; ++a) {
        if (spans[a].className == "resizable-content") {
            var fontcookie = GetCookie("FontSizeCookie");
            var fontcookienum = fontcookie * 1;
            if ((multiplier != -1) && (fontcookienum >= 1.4)) {
                increasesize = false;
            }
            else if ((multiplier != 1) && (fontcookienum <= 0.7)) {
                increasesize = false;
            }
            else {
                spans[a].style.fontSize = (fontcookienum + (multiplier * 0.2) + "em");
                increasesize = true;
            }
        }
    }
    if (increasesize == true) {
        SetCookie("FontSizeCookie", (fontcookienum + (multiplier * 0.2)), 14);
    }
}

function SetFontSize() {
    var spans = document.getElementsByTagName('span');
    var numspans = spans.length;

    if (GetCookie("FontSizeCookie") == null) {
        var fontcookie = "1.0";
    }
    else {
        var fontcookie = GetCookie("FontSizeCookie");  
    }
    var fontcookienum = fontcookie * 1;
    
    for (var a = 0; a < numspans; ++a) {
        if (spans[a].className == "resizable-content") {
            spans[a].style.fontSize = (fontcookienum + "em");
        }
    }
}

function SetCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function GetCookie(name) {
    var name_eq = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name_eq) == 0) return c.substring(name_eq.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    SetCookie("FontSizeCookie", "", -1);
}
// Copyright 2004 Google Inc.
// All Rights Reserved.
//
// A bunch of XML HTTP recipes used to do RPC from within javascript from
// Gagan Saksena's wiki page
// http://wiki.corp.google.com/twiki/bin/view/Main/JavaScriptRecipes

/** Candidate Active X types.
  * @private
  */
var _XH_ACTIVE_X_IDENTS = [
  "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0",
  "MSXML2.XMLHTTP", "MICROSOFT.XMLHTTP.1.0", "MICROSOFT.XMLHTTP.1",
  "MICROSOFT.XMLHTTP" ];
/** The active x identifier used for ie.
 * @private
 */
var _xh_ieProgId = undefined;

// Domain for XmlHTTPRequest.readyState
var XML_READY_STATE_UNINITIALIZED  = 0;
var XML_READY_STATE_LOADING        = 1;
var XML_READY_STATE_LOADED         = 2;
var XML_READY_STATE_INTERACTIVE    = 3;
var XML_READY_STATE_COMPLETED      = 4;

/** initialize the private state used by other functions.
  * @private
  */
function _XH_XmlHttpInit() {
  // Nobody (on the web) is really sure which of the progid's listed is totally
  // necessary. It is known, for instance, that certain installations of IE will
  // not work with only Microsoft.XMLHTTP, as well as with MSXML2.XMLHTTP.
  // Safest course seems to be to do this -- include all known progids for
  // XmlHttp.
  if (typeof XMLHttpRequest == 'undefined' &&
      typeof ActiveXObject != 'undefined') {
    for (var i = 0; i < _XH_ACTIVE_X_IDENTS.length; i++) {
      var candidate = _XH_ACTIVE_X_IDENTS[i];

      try {
        new ActiveXObject(candidate);
        _xh_ieProgId = candidate;
        break;
      } catch (e) {
        // do nothing; try next choice
      }
    }

    // couldn't find any matches
    if (undefined === _xh_ieProgId) {
      throw ("Could not create ActiveXObject. ActiveX might be disabled, or " +
             "msxml might not be installed");
    }
  }

}

_XH_XmlHttpInit();

/** create and return an xml http request object that can be passed to
  * {@link #XH_XmlHttpGET} or {@link #XH_XmlHttpPOST}.
  */
function XH_XmlHttpCreate() {
  if (_xh_ieProgId !== undefined) {
    return new ActiveXObject(_xh_ieProgId);
  } else {
    return new XMLHttpRequest();
  }
}

/** send a get request.
  * @param xmlhttp as from {@link XH_XmlHttpCreate}.
  * @param url the service to contact
  * @param handler function called when the response is received.
  */
function XH_XmlHttpGET(xmlhttp, url, handler) {
  xmlhttp.onreadystatechange = handler;
  xmlhttp.open("GET", url, true);
  XH_XmlHttpSend(xmlhttp, null); 
}

/** send a post request.
  * @param xmlhttp as from {@link XH_XmlHttpCreate}.
  * @param url the service to contact
  * @param data the request content.
  * @param handler function called when the response is received.
  */
function XH_XmlHttpPOST(xmlhttp, url, data, handler) {
  xmlhttp.onreadystatechange = handler;
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.setRequestHeader("Content-Length", data.length);
  XH_XmlHttpSend(xmlhttp, data);
}

function XH_XmlHttpOpen(xmlhttp, verb, url, handler) {
  xmlhttp.onreadystatechange = handler;
  xmlhttp.open(verb, url, true);
}

function XH_XmlHttpSetRequestHeader(xmlhttp, name, value) {
  xmlhttp.setRequestHeader(name, value);
}

function XH_XmlHttpSend(xmlhttp, data) {
  try {
    xmlhttp.send(data);
  } catch (e) {
    // you may want to log/debug this error
    // one that you should be aware of is e.number == -2146697208,
    // which occurs when the 'Languages...' setting in IE is empty.
    log('XMLHttpSend failed ' + e.toString() + '<br>' + e.stack);
    throw e;
  }
}

function XH_XmlHttpAbort(xmlhttp) {
  // IE crashes if you NULL out the onreadystatechange synchronously
  SafeTimeout(window, function() {
    xmlhttp.onreadystatechange = function() {};
  }, 0);
  if (xmlhttp.readyState < XML_READY_STATE_COMPLETED) {
    xmlhttp.abort();
  }
}

// Copyright 2006 Google Inc.
// All Rights Reserved.
//
// msamuel@google.com

// Implements RFC 3986 for parsing/formatting URIs.

/**
 * creates a uri from the string form.  The parser is relaxed, so special
 * characters that aren't escaped but don't cause ambiguities will not cause
 * parse failures.
 *
 * @return {URI}
 */
function uri_parse(uriStr) {
  var uri_nullIfAbsent_ = function (matchPart) {
    return ('string' == typeof matchPart) && (matchPart.length > 0)
           ? matchPart
           : null;
  };

  var m = uriStr.match(uri_getRE_());
  if (!m) { return null; }
  return new URI(
      uri_nullIfAbsent_(m[1]),
      uri_nullIfAbsent_(m[2]),
      uri_nullIfAbsent_(m[3]),
      uri_nullIfAbsent_(m[4]),
      uri_nullIfAbsent_(m[5]),
      uri_nullIfAbsent_(m[6]),
      uri_nullIfAbsent_(m[7]));
}

/**
 * creates a uri from the given parts.
 *
 * @param scheme {string} an unencoded scheme such as "http" or null
 * @param credentials {string} unencoded user credentials or null
 * @param domain {string} an unencoded domain name or null
 * @param port {int} a port number in [1, 32768].
 *    -1 indicates no port, as does null.
 * @param path {string} an unencoded path
 * @param cgiParamList {Array<string>} a list of unencoded cgi parameters where
 *   even values are keys and odds the corresponding values.
 * @param fragment {string} an unencoded fragment without the "#" or null.
 * @return {URI}
 */
function uri_create(
    scheme, credentials, domain, port, path, cgiParamList, fragment) {
  var uri = new URI(
      uri_encodeIfExists2_(scheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),
      uri_encodeIfExists2_(
          credentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),
      uri_encodeIfExists_(domain),
      port > 0 ? port.toString() : null,
      uri_encodeIfExists2_(path, URI_DISALLOWED_IN_PATH_),
      null,
      uri_encodeIfExists_(fragment));
  if (cgiParamList) {
    uri.SetAllCgiParameters(cgiParamList);
  }
  return uri;
}
function uri_encodeIfExists_(unescapedPart) {
  if ('string' == typeof unescapedPart) {
    return encodeURIComponent(unescapedPart);
  }
  return null;
};
/**
 * if unescapedPart is non null, then escapes any characters in it that aren't
 * valid characters in a url and also escapes any special characters that
 * appear in extra.
 *
 * @param unescapedPart {string}
 * @param extra {RegExp} a character set of characters in [\01-\177].
 * @return {string} null iff unescapedPart == null.
 */
function uri_encodeIfExists2_(unescapedPart, extra) {
  if ('string' == typeof unescapedPart) {
    return encodeURI(unescapedPart).replace(extra, uri_encodeOne_);
  }
  return null;
};
/** converts a character in [\01-\177] to its unicode character equivalent. */
function uri_encodeOne_(ch) {
  var n = ch.charCodeAt(0);
  return '%' + '0123456789ABCDEF'.charAt((n >> 4) & 0xf) +
    '0123456789ABCDEF'.charAt(n & 0xf);
}

/**
 * resolves a relative url string to a base uri.
 * @return {URI}
 */
function uri_resolve(baseUri, relativeUri) {
  // there are several kinds of relative urls:
  // 1. foo - replaces the last part of the path, the whole query and fragment
  // 2. /foo - replaces the the path, the query and fragment
  // 3. //foo - replaces everything from the domain on.  foo is a domain name
  // 4. ?foo - replace the query and fragment
  // 5. #foo - replace the fragment only

  var absoluteUri = baseUri.Clone();
  // we satisfy these conditions by looking for the first part of relativeUri
  // that is not blank and applying defaults to the rest

  var overridden = relativeUri.HasScheme();

  if (overridden) {
    absoluteUri.SetRawScheme(relativeUri.GetRawScheme());
  } else {
    overridden = relativeUri.HasCredentials();
  }

  if (overridden) {
    absoluteUri.SetRawCredentials(relativeUri.GetRawCredentials());
  } else {
    overridden = relativeUri.HasDomain();
  }

  if (overridden) {
    absoluteUri.SetRawDomain(relativeUri.GetRawDomain());
  } else {
    overridden = relativeUri.HasPort();
  }

  var rawPath = relativeUri.GetRawPath();
  if (overridden) {
    absoluteUri.SetPort(relativeUri.GetPort());
  } else {
    overridden = relativeUri.HasPath();
    if (overridden) {
      // resolve path properly
      if (!new RegExp("^/").test(rawPath)) {
        // path is relative
        rawPath = absoluteUri.GetRawPath().replace(
            new RegExp("/?[^/]*$"),
            '/' + rawPath);
      }
    }
  }

  if (overridden) {
    absoluteUri.SetRawPath(rawPath);
  } else {
    overridden = relativeUri.HasQuery();
  }

  if (overridden) {
    absoluteUri.SetRawQuery(relativeUri.GetRawQuery());
  } else {
    overridden = relativeUri.HasFragment();
  }

  if (overridden) {
    absoluteUri.SetRawFragment(relativeUri.GetRawFragment());
  }

  return absoluteUri;
}

/**
 * a mutable URI.
 *
 * This class contains setters and getters for the parts of the URI.
 * The <tt>GetXYZ</tt>/<tt>SetXYZ</tt> methods return the decoded part -- so
 * <code>uri_parse('/foo%20bar').GetPath()</code> will return the decoded path,
 * <tt>/foo bar</tt>.
 *
 * <p>The raw versions of fields are available too.
 * <code>uri_parse('/foo%20bar').GetRawPath()</code> will return the raw path,
 * <tt>/foo%20bar</tt>.  Use the raw setters with care, since
 * <code>URI::toString</code> is not guaranteed to return a valid url if a
 * raw setter was used.
 *
 * <p>All setters return <tt>this</tt> and so may be chained, a la
 * <code>uri_parse('/foo').SetFragment('part').toString()</code>.
 *
 * <p>You should not use this constructor directly -- please prefer the factory
 * functions {@link #uri_parse}, {@link #uri_create}, {@link #uri_resolve}
 * instead.</p>
 *
 * <p>The parameters are all raw (assumed to be properly escaped) parts, and
 * any (but not all) may be null.  Undefined is not allowed.</p>
 */
function URI(
    rawScheme,
    rawCredentials, rawDomain, port,
    rawPath, rawQuery, rawFragment
    ) {
  this.scheme_ = rawScheme;
  this.credentials_ = rawCredentials;
  this.domain_ = rawDomain;
  this.port_ = port;
  this.path_ = rawPath;
  this.query_ = rawQuery;
  this.fragment_ = rawFragment;
  this.paramCache_ = null;
}

/** returns the string form of the url. */
URI.prototype.toString = function () {
  var out = [];
  if (null !== this.scheme_) { out.push(this.scheme_, ':'); }
  if (null !== this.domain_) {
    out.push('//');
    if (null !== this.credentials_) { out.push(this.credentials_, '@'); }
    out.push(this.domain_);
    if (null !== this.port_) { out.push(':', this.port_.toString()); }
  }
  if (null !== this.path_) { out.push(this.path_); }
  if (null !== this.query_) { out.push('?', this.query_); }
  if (null !== this.fragment_) { out.push('#', this.fragment_); }
  return out.join('');
};

URI.prototype.Clone = function () {
  return new URI(this.scheme_, this.credentials_, this.domain_, this.port_,
                 this.path_, this.query_, this.fragment_);
};

URI.prototype.GetScheme = function () {
  return this.scheme_ && uri_decodeThatWorks_(this.scheme_);
};
URI.prototype.GetRawScheme = function () {
  return this.scheme_;
};
URI.prototype.SetScheme = function (newScheme) {
  this.scheme_ = uri_encodeIfExists2_(
      newScheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);
  return this;
};
URI.prototype.SetRawScheme = function (newScheme) {
  this.scheme_ = newScheme ? newScheme : null;
  return this;
};
URI.prototype.HasScheme = function (newScheme) {
  return null !== this.scheme_;
};


URI.prototype.GetCredentials = function () {
  return this.credentials_ && uri_decodeThatWorks_(this.credentials_);
};
URI.prototype.GetRawCredentials = function () {
  return this.credentials_;
};
URI.prototype.SetCredentials = function (newCredentials) {
  this.credentials_ = uri_encodeIfExists2_(
      newCredentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);

  return this;
};
URI.prototype.SetRawCredentials = function (newCredentials) {
  this.credentials_ = newCredentials ? newCredentials : null;
  return this;
};
URI.prototype.HasCredentials = function (newCredentials) {
  return null !== this.credentials_;
};


URI.prototype.GetDomain = function () {
  return this.domain_ && uri_decodeThatWorks_(this.domain_);
};
URI.prototype.GetRawDomain = function () {
  return this.domain_;
};
URI.prototype.SetDomain = function (newDomain) {
  this.domain_ = newDomain ? encodeURIComponent(newDomain) : null;
  return this;
};
URI.prototype.SetRawDomain = function (newDomain) {
  this.domain_ = newDomain ? newDomain : null;
  return this;
};
URI.prototype.HasDomain = function (newDomain) {
  return null !== this.domain_;
};


URI.prototype.GetPort = function () {
  return this.port_ && uri_decodeThatWorks_(this.port_);
};
URI.prototype.SetPort = function (newPort) {
  if (newPort) {
    if ('number' !== typeof newPort) {
      newPort = parseInt(newPort, 10);
      if (newPort < 0 || isNaN(newPort)) {
        throw new Error('Bad port number ' + newPort);
      }
    }
    this.port_ = newPort.toString();
  } else {
    this.port_ = null;
  }
  return this;
};
URI.prototype.HasPort = function (newPort) {
  return null !== this.port_;
};


URI.prototype.GetPath = function () {
  return this.path_ && uri_decodeThatWorks_(this.path_);
};
URI.prototype.GetRawPath = function () {
  return this.path_;
};
URI.prototype.SetPath = function (newPath) {
  this.path_ = uri_encodeIfExists2_(newPath, URI_DISALLOWED_IN_PATH_);
  return this;
};
URI.prototype.SetRawPath = function (newPath) {
  this.path_ = newPath ? newPath : null;
  return this;
};
URI.prototype.HasPath = function (newPath) {
  return null !== this.path_;
};


URI.prototype.GetQuery = function () {
  return this.query_ && uri_decodeThatWorks_(this.query_);
};
URI.prototype.GetRawQuery = function () {
  return this.query_;
};
URI.prototype.SetQuery = function (newQuery) {
  this.paramCache_ = null;
  this.query_ = uri_encodeIfExists_(newQuery);
  return this;
};
URI.prototype.SetRawQuery = function (newQuery) {
  this.paramCache_ = null;
  this.query_ = newQuery ? newQuery : null;
  return this;
};
URI.prototype.HasQuery = function (newQuery) {
  return null !== this.query_;
};

/**
 * sets the query given a list of strings of the form
 * [ key0, value0, key1, value1, ... ].
 *
 * <p><code>uri.SetAllCgiParameters(['a', 'b', 'c', 'd']).GetQuery()</code>
 * will yield <code>'a=b&c=d'</code>.
 */
URI.prototype.SetAllCgiParameters = function (unescapedCgiParameters) {
  this.paramCache_ = null;
  var queryBuf = [];
  var separator = '';
  for (var i = 0; i < unescapedCgiParameters.length;) {
    var k = unescapedCgiParameters[i++];
    var v = unescapedCgiParameters[i++];
    queryBuf.push(separator, encodeURIComponent(k.toString()));
    separator = '&';
    if (v) {
      queryBuf.push('=', encodeURIComponent(v.toString()))
    }
  }
  this.query_ = queryBuf.join('');
  return this;
};
URI.prototype.CheckParameterCache_ = function () {
  if (!this.paramCache_) {
    if (!this.query_) {
      this.paramCache_ = [];
    } else {
      var cgiParams = this.query_.split(/[&\?]/);
      var out = [];
      for (var i = 0; i < cgiParams.length; ++i) {
        var m = cgiParams[i].match(/^([^=]*)(?:=(.*))?$/);
        out.push(uri_decodeThatWorks_(m[1]), uri_decodeThatWorks_(m[2] || ''));
      }
      this.paramCache_ = out;
    }
  }
};
/**
 * sets the values of the named cgi parameters.
 *
 * <p>So, <code>uri_parse('foo?a=b&c=d&e=f').SetCgiParameterValues('c', ['new'])
 * </code> yields <tt>foo?a=b&c=new&e=f</tt>.</p>
 *
 * @param key {string}
 * @param values {Array<string>} the new values.  If values is a single string
 *   then it will be treated as the sole value.
 */
URI.prototype.SetCgiParameterValues = function (key, values) {
  // be nice and avoid subtle bugs where [] operator on string performs charAt
  // on some browsers and crashes on IE
  if (typeof values === 'string') { values = [ values ]; }

  this.CheckParameterCache_();
  var newValueIndex = 0;
  var pc = this.paramCache_;
  var params = [];
  for (var i = 0, k = 0; i < pc.length; i += 2) {
    if (key === pc[i]) {
      if (newValueIndex < values.length) {
        params.push(key, values[newValueIndex++]);
      }
    } else {
      params.push(pc[i], pc[i + 1]);
    }
  }
  while (newValueIndex < values.length) {
    params.push(key, values[newValueIndex++]);
  }
  this.SetAllCgiParameters(params);
  return this;
};
/**
 * returns the parameters specified in the query part of the uri as a list of
 * keys and values like [ key0, value0, key1, value1, ... ].
 *
 * @return {Array<string>}
 */
URI.prototype.GetAllCgiParameters = function () {
  this.CheckParameterCache_();
  return this.paramCache_.slice(0, this.paramCache_.length);
};
/**
 * returns the value<b>s</b> for a given cgi parameter as a list of decoded
 * query parameter values.
 * @return {Array<string>}
 */
URI.prototype.GetCgiParameterValues = function (paramNameUnescaped) {
  this.CheckParameterCache_();
  var values = [];
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    if (paramNameUnescaped === this.paramCache_[i]) {
      values.push(this.paramCache_[i + 1]);
    }
  }
  return values;
};
/**
 * returns a map of cgi parameter names to (non-empty) lists of values.
 * @return {Map<string,Array<string>>}
 */
URI.prototype.GetCgiParameterMap = function (paramNameUnescaped) {
  this.CheckParameterCache_();
  var paramMap = {};
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    var key = this.paramCache_[i++],
      value = this.paramCache_[i++];
    if (!(key in paramMap)) {
      paramMap[key] = [value];
    } else {
      paramMap[key].push(value);
    }
  }
  return paramMap;
};
/**
 * returns the first value for a given cgi parameter or null if the given
 * parameter name does not appear in the query string.
 * If the given parameter name does appear, but has no '<tt>=</tt>' following
 * it, then the empty string will be returned.
 * @return {string}
 */
URI.prototype.GetCgiParameterValue = function (paramNameUnescaped) {
  this.CheckParameterCache_();
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    if (paramNameUnescaped === this.paramCache_[i]) {
      return this.paramCache_[i + 1];
    }
  }
  return null;
};

URI.prototype.GetFragment = function () {
  return this.fragment_ && uri_decodeThatWorks_(this.fragment_);
};
URI.prototype.GetRawFragment = function () {
  return this.fragment_;
};
URI.prototype.SetFragment = function (newFragment) {
  this.fragment_ = newFragment ? encodeURIComponent(newFragment) : null;
  return this;
};
URI.prototype.SetRawFragment = function (newFragment) {
  this.fragment_ = newFragment ? newFragment : null;
  return this;
};
URI.prototype.HasFragment = function (newFragment) {
  return null !== this.fragment_;
};

/** work around a bug in uri_decodeURIComponent_ where it doesn't handle +'s. */
function uri_decodeThatWorks_(s) {
  return decodeURIComponent(s).replace(/\+/g, ' ');
}



/**
 * a regular expression for breaking a URI into its component parts.
 *
 * <p>http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234 says
 * As the "first-match-wins" algorithm is identical to the "greedy"
 * disambiguation method used by POSIX regular expressions, it is natural and
 * commonplace to use a regular expression for parsing the potential five
 * components of a URI reference.
 *
 * <p>The following line is the regular expression for breaking-down a
 * well-formed URI reference into its components.
 *
 * <pre>
 * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
 *  12            3  4          5       6  7        8 9
 * </pre>
 *
 * <p>The numbers in the second line above are only to assist readability; they
 * indicate the reference points for each subexpression (i.e., each paired
 * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
 * For example, matching the above expression to
 * <pre>
 *     http://www.ics.uci.edu/pub/ietf/uri/#Related
 * </pre>
 * results in the following subexpression matches:
 * <pre>
 *    $1 = http:
 *    $2 = http
 *    $3 = //www.ics.uci.edu
 *    $4 = www.ics.uci.edu
 *    $5 = /pub/ietf/uri/
 *    $6 = <undefined>
 *    $7 = <undefined>
 *    $8 = #Related
 *    $9 = Related
 * </pre>
 * where <undefined> indicates that the component is not present, as is the
 * case for the query component in the above example. Therefore, we can
 * determine the value of the five components as
 * <pre>
 *    scheme    = $2
 *    authority = $4
 *    path      = $5
 *    query     = $7
 *    fragment  = $9
 * </pre>
 *
 * <p>msamuel: I have modified the regular expression slightly to expose the
 * credentials, domain, and port separately from the authority.
 * The modified version yields
 * <pre>
 *    $1 = http              scheme
 *    $2 = <undefined>       credentials -\
 *    $3 = www.ics.uci.edu   domain       | authority
 *    $4 = <undefined>       port        -/
 *    $5 = /pub/ietf/uri/    path
 *    $6 = <undefined>       query without ?
 *    $7 = Related           fragment without #
 * </pre>
 */
var uri_re_ = null;

function uri_getRE_() {
  if (uri_re_ == null) {
    uri_re_ = new RegExp(
      "^" +
      "(?:" +
        "([^:/?#]+)" +         // scheme
      ":)?" +
      "(?://" +
        "(?:([^/?#]*)@)?" +    // credentials
        "([^/?#:@]*)" +        // domain
        "(?::([0-9]+))?" +     // port
      ")?" +
      "([^?#]+)?" +            // path
      "(?:\\?([^#]*))?" +      // query
      "(?:#(.*))?" +           // fragment
      "$"
      );
  }

  return uri_re_;
}

var URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_ = /[#\/\?@]/g;
var URI_DISALLOWED_IN_PATH_ = /[\#\?]/g;

// Copyright 2006 Google Inc.,  All Rights Reserved
// dspencer@google.com


/**
 * @fileoverview
 *
 * This file is for the rendering of Clustered Search results
 * on the GSA.
 *
 *
 * The flow is:
 *
 * - User initiates search query and wants clustered results
 *
 * - Response page has:
 *      - <script> tags pulling in uri.js, common.js, xmlhttp.js, cluster.js
 *      - <body onload='cs_loadClusters(s, cs_drawClusters)'>
 *      - Elements with ids like cluster_label0..cluster_label9 which is
 *        where the first "n" cluster labels will be placed
 *
 * - The loadClusters() call initiates an AJAX request to the Enterprise
 *   Front End (EFE), who delegates to the Clustering Server (CS), who calls
 *   GWS and so on, and then the results come back as JSON
 *
 * - Then the JSON is rendered in drawClusters().
 *
 * The JSON that comes back from the GSA has this general structure:
 *
 * { "clusters": [
 *     { "algorithm": "Concepts",
 *       "clusters": [
 *         { "label": "label1",
 *           "docs": [1, 2, 3]
 *         },
 *         { "label": "label2",
 *           "docs": [2, 4, 6]
 *         } ...
 *       ]
 *     }
 *   ],
 *
 *   "documents": [
 *     { "url": "url0",
 *       "title": "title0",
 *       "snippet": "snippet0"
 *     },
 *     ..
 *     { "url": "url99",
 *       "title": "title99",
 *       "snippet": "snippet99"
 *     },
 *   ]
 * }
 *
 * So at the outer level there are 2 fields in the dict, 'clusters' and
 * 'documents'. The 'clusters' field has one entry for every clustering
 * algorithm.
 *
 * Every clustering algorithm has a dict with 'algorithm' and 'clusters'.
 * The 'algorithm' field is the name, and the 'clusters' field is a list
 * of cluster labels and contents. Cluster contents are indexes into the
 * 'documents' field.
 *
 * The 'documents' field holds search results, with one entry per result.
 *
 *
 * Tested under:
 *     Firefox 1.5.0.7 (Linux)
 *     Firefox 1.5.0.7 (WinXP)
 *     Firefox 1.5.0.4 (Mac OS X 10.4.7)
 *
 *     IE 6.0... (WinXP SP2)
 *
 *     Safari (Mac OS X 10.4.7)
 *
 * @author dspencer@google.com
 *
 * @requires common.js
 * @requires xmlthtp.js
 * @requires uri.js
 */


/**
 * Name of conceptual clustering servlet in
 * servlet array in JSON dictionary.
 */
var CS_CONCEPTS_NAME = 'Concepts';

/**
 * Name of conceptual clustering dictionary in
 * JSON blob.
 */
var CS_CLUSTERS_FIELD_NAME = 'clusters';
var CS_DOCUMENTS_FIELD_NAME = 'documents';

/**
 * Prefix of cluster label element id.
 * This is followed by a number, probably 0..9.
 */
var CS_CLUSTER_LABEL_PREFIX = 'cluster_label';

/**
 * Name of outer container which holds the
 * cluster labels.
 */
var CS_CLUSTER_LABEL_CONTAINER = 'cluster_label_container';

/**
 * Name of an element used for showing messages ("Loading..."
 * and error messages). Hidden when the clusters are present
 */
var CS_MESSAGE_ELEMENT = 'cluster_message';

/**
 * Message displayed in the element named by
 * CS_CLUSTER_LABEL_CONTAINER when clustering somehow fails.
 *
 * TODO(dspencer): I18N
 * TODO(dspencer): Add more feedback as to why clustering failed.
 *
 * @see #CS_CLUSTER_LABEL_CONTAINER
 */
var CS_NO_RESULTS = "No narrowing is possible for this search query.";

/**
 * The max labels to display.
 */
var CS_MAX_LABELS_TO_DISPLAY = 10;

/**
 * The max labels to display.
 */
var CS_TABLE_HEADER = "NarrowSearchHeader";

/**
 * The max labels to display.
 */
var CS_TABLE_BODY = "NarrowSearchBody";

/**
 * Format an HREF.
 *
 * @param {String} url The URL to format.
 * @param {String} text The anchor text.
 *
 * @return A formatted 'a' tag.
 */
function cs_createAnchorCode(url, text) {
  return "<a href='" + url + "'>" + text + "</a>";
}


/**
 * Show up to 'max_labels' cluster labels. The ones that
 * are not shown are made invisible.
 *
 * @param {Number} maxLabels The maximum number of labels to display.
 * @param {String} srchArgs The arguments the user is searching with.
 * @param {Array} clusters The conceptual clustering part of the JSON blob.
 * @param {Array} documents The documents coming back from the search engine.
 *
 * @private
 */
function cs_showLabels(maxLabels, srchArgs, clusters, documents) {
  var searchUri = "/Search/GoogleSearchResults.aspx?" + srchArgs;
  // By definition we only handle cluster_label[0..9]
  for (var ci = 0; ci < Math.min(maxLabels, clusters.length); ci++) {
    var div = document.getElementById(CS_CLUSTER_LABEL_PREFIX + ci);
    if (div) {
      ShowElement(div, true);
      var curc = clusters[ci];
      var uri = uri_parse(searchUri);
      // replace the "q" argument with the current label
      uri = uri.SetCgiParameterValues("q", curc.label);
      uri = uri.toString();
      var href = cs_createAnchorCode(uri, curc.label);
      div.innerHTML = href;
    }
  }
  for (var ci = clusters.length; ci < maxLabels; ci++) {
    var div = document.getElementById(CS_CLUSTER_LABEL_PREFIX + ci);
    if (div) {
      ShowElement(div, false); 
    }
  }
}

/**
 * Find a servlet with a given name.
 *
 * @param {Object} blob The JSON blob.
 * @param {String} algorithm The name of the algorithm to lookup.
 *
 * @return The clusters of the indicated algorithms or null.
 *
 * @private
 */
function cs_findServlet(blob, algorithm) {
  var clusters = blob[CS_CLUSTERS_FIELD_NAME];
  for (var i = 0; i < clusters.length; i++) {
    if (clusters[i].algorithm == algorithm) {
      return clusters[i];
    }
  }
  return null;
}

/**
 * Draw the cluster labels. We turn off the image that shows
 * that the clustering is being calculated and then
 * draw up to CS_MAX_LABELS_TO_DISPLAY cluster labels in the elements named
 * cluster_label0...cluster_label9.
 *
 * @param {String} srchArgs The arguments to the search request.
 * @param {Object} blob The JSON blob returned by the Clustering Server.
 *
 */
function cs_drawClusters(srchArgs, blob) {
  if (document.getElementById(CS_MESSAGE_ELEMENT)) {
    ShowElement(document.getElementById(CS_MESSAGE_ELEMENT), false);
  }

  // Parse the JSON blob.
  var servlets = blob[CS_CLUSTERS_FIELD_NAME];
  var documents = blob[CS_DOCUMENTS_FIELD_NAME];

  var concepts = cs_findServlet(blob, CS_CONCEPTS_NAME);
  
  // Now fill in any optional page elements that are present.
  // If the first numbered label is present then
  // fill in all 10.
  if (document.getElementById(CS_CLUSTER_LABEL_PREFIX + '0')) {
    var container = document.getElementById(CS_CLUSTER_LABEL_CONTAINER);
    if (concepts) {
      cs_showLabels(CS_MAX_LABELS_TO_DISPLAY, srchArgs,
                    concepts.clusters, documents);

      if (container) {
        ShowElement(container, true);
      }
    } else {
      // Assume that if the conceptual clustering dict is not present
      // that clustering failed.
      if (document.getElementById(CS_MESSAGE_ELEMENT)) {
        document.getElementById(CS_MESSAGE_ELEMENT).innerHTML = CS_NO_RESULTS;
        ShowElement(document.getElementById(CS_MESSAGE_ELEMENT), true);
        // hide the Narrow your search table header and body
        ShowElement(document.getElementById(CS_TABLE_HEADER), false);
        ShowElement(document.getElementById(CS_TABLE_BODY), false);
        
      }
    }
  }
  // Note: future versions of this function will check for other
  // elements and call other lower level rendering functions e.g.
  // ones for tabs and other UI treatments.
}

/**
 * Make a call to load in the JSON with the
 * output of the Clustering Server and
 * the call the rendering function with the output.
 *
 * @param {String} srchArgs The URI arguments the user is performing their normal
 *   search with. This will probably come from some variable expansion on
 *   the XSL of the Front End. A real example would be:
 *
 *               "entqr=0&access=p&output=xml_no_dtd&sort=date%3AD%3AL%3Ad1&
 *                ie=UTF-8&btnG=Google+Search&client=f7&q=china&ud=1&
 *                site=default_collection&oe=UTF-8&proxystylesheet=f7&
 *                ip=172.18.68.100"
 *
 * @param {Function} render: The rendering function which is called on
 *      completion with 2 arguments, the search URL (the arg above) and the JSON
 *      blob that comes back from the CS.
 *
 */
function cs_loadClusters(srchArgs, render) {
    var xmlhttp = XH_XmlHttpCreate();
    var uri = "/Search/cluster.aspx?" + srchArgs;
    
  var handler = function() {
    if (xmlhttp.readyState == XML_READY_STATE_COMPLETED) {
      render(srchArgs, eval('(' + xmlhttp.responseText + ')'));
    }
  };
  XH_XmlHttpGET(xmlhttp, uri, handler);
};
