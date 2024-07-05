var kstrHighLightBackground = '#FE0000';
var kstrHighLightForeground = '#FFFFFF';

var objLastDiv;
var iLastDivTimeOut;
var bMenuTimeOut = false;
var iMenuTimeOut;

var arrOpenMenus = [];
var arrOpenMenusHTML = [];
var arrSourceDiv = [];
var CObjMenu;
var cMenIt;
var objDIVId;

// CVEGA - browser identifier and setter
var browserPrefix = '';
if (BR_IsIE()) { browserPrefix = 'IE_'; }

function DebugOnBodyLoad() {
    //alert(browserPrefix);
}

// IE METHODS

function handlerMenuOnMouseMove() {

    handlerOftype(4);

}
function handlerMenuMouseOver() {
    handlerOftype(1);
}

function handlerMenuMouseOut() {
    handlerOftype(2);
}

function handlerMenuClick() {
    handlerOftype(3);
}

function handlerOftype(iCallType) {
    var objSrcNode = event.srcElement
    while (objSrcNode) {
        if (objSrcNode.id.search('mui_') != -1) {
            switch (iCallType) {
                case 1:
                    MIMouseOver(objSrcNode, event);
                    break;
                case 2:
                    MIMouseOut(objSrcNode, event);
                    break;
                case 3:
                    MIMouseClick(objSrcNode, event);
                    break;
            }
            break;
        }
        else {
            objSrcNode = objSrcNode.parentElement;
        }
    }
}

function MIMouseOver(objDiv, event) {
    if (objLastDiv) {
        window.clearTimeout(iLastDivTimeOut);
    }
    objLastDiv = objDiv;
    ClearTimer();
    //iLastDivTimeOut = window.setTimeout(EndTimer, 500);   

    IE_SetHighLights(objDiv, true);
    IE_ObjSelectedHighlights(objDiv);
    return false;
}

function MIMouseOut(objDiv, event) {
    var bClearHighlight = true;
    //ClearTimer();
    iLastDivTimeOut = window.setTimeout(EndTimer, 500);

    for (var iTestDiv = arrSourceDiv.length - 1; iTestDiv >= 0 && bClearHighlight; iTestDiv--) {
        if (arrSourceDiv[iTestDiv].id == objDiv.id) {
            bClearHighlight = false;
        }
    }

    if (bClearHighlight) {
        IE_SetHighLights(objDiv, false);
    }
    IE_ObjSelectedHighlights(objDiv);
    return false;
}

function IE_SHMouseOver() {
    window.clearTimeout(iLastDivTimeOut);
    iLastDivTimeOut = 0;
    return false;
}

function IE_SHMouseOut() {
    iLastDivTimeOut = window.setTimeout(EndTimer, 500);
    return false;
}

function IE_SetHighLights(objItem, bTurnOn) {
    if (objItem) {
		//alert(objItem.innerHTML)
        /*
        1/09/2008 Paul Clark
        If the menu item has a parent Div of DMC (i.e. is the Upper or Lower Global navigation,
        then do not call the IE_SetHighLights() function.
        */
        if (IE_GetParentDivClassName(objItem) != 'DMC') {
            if (objItem.style) {
                objItem.style.backgroundColor = (bTurnOn) ? kstrHighLightBackground : '';
                objItem.style.color = (bTurnOn) ? kstrHighLightForeground : '';
                try {
                    objItem.style.cursor = (bTurnOn) ? 'pointer' : '';
                }
                catch (e) {
                }
            }

            for (var iChildNode = objItem.childNodes.length - 1; iChildNode >= 0; iChildNode--) {
                IE_SetHighLights(objItem.childNodes.item(iChildNode), bTurnOn);
            }
        }
    }
}

function MIMouseClick(objDiv, event) {
    var arrMenuItem = IE_findmenuitem(objDiv.id);

    ClearTimer();
    if (arrMenuItem && (arrMenuItem.length == 6 || arrMenuItem.length == 8)) {
        ItemSelect(objDiv);

        return false;
    }
    else {
        var objLink = objDiv.all.tags("A");
        try {
            if (objLink && objLink[0].href != '') {
                objLink[0].click();
            }
        }
        catch (e) {
        }

    }
}

function ClearTimer() {
    if (objLastDiv) {
        window.clearTimeout(iLastDivTimeOut);
        iLastDivTimeOut = 0;
        ItemSelect(objLastDiv);
    }
}

function EndTimer() {
    if (objLastDiv) {
        //ItemSelect(objLastDiv);
        iLastDivTimeOut = 0;
        IE_CloseNonParentMenus();
        hideSelectBoxes();
    }
}

function StartMenuTimer() {
    if (!bMenuTimeOut) {
        iMenuTimeOut = window.setTimeout(EndMenuTimer, 1000);   /* devraj 21/08/2008 Changed from 2000  fix for release2*/
        bMenuTimeOut = true;
    }
}

function StopMenuTimer() {
    if (bMenuTimeOut) {
        window.clearTimeout(iMenuTimeOut);
        bMenuTimeOut = false;
    }
}

function EndMenuTimer() {
    bMenuTimeOut = false;
    IE_CloseNonParentMenus();
    hideSelectBoxes();
}

function IE_CloseNonParentMenus(arrMenuItem) {
    var iMenuId = 0;
    if (arrMenuItem) {
        iMenuId = arrMenuItem[0];
    }

    for (var iTestMenu = arrOpenMenus.length - 1; iTestMenu >= 0; iTestMenu--) {
        var arrParentMenu = IE_finditeminmenu(arrOpenMenus[iTestMenu], iMenuId);
        if (!arrParentMenu) {
            if (arrOpenMenusHTML[iTestMenu]) {
                document.body.removeChild(arrOpenMenusHTML[iTestMenu]);
            }

            if (arrSourceDiv[iTestMenu]) {
                IE_SetHighLights(arrSourceDiv[iTestMenu], false);
                IE_ObjSelectedHighlights(arrSourceDiv[iTestMenu]); //k9
            }

            arrOpenMenusHTML.length--;
            arrOpenMenus.length--;
            arrSourceDiv.length--;
        }
        else {
            break;
        }
    }
}

function ItemSelect(objItem) {
    if (objItem) {
        var arrMenuItem = IE_findmenuitem(objItem.id);

        // Close all non parent menus
        IE_CloseNonParentMenus(arrMenuItem);

        if (arrMenuItem) {
            // Create a new menu on the page for this item
            var objNewDiv = document.createElement('DIV');
            objNewDiv.className = 'MDefH';
            var objTable = IE_BuildMenu(arrMenuItem, objItem);

            if (objTable) {
                objTable.className = 'MGiH';
                objTable.onmouseover = StopMenuTimer;
                objTable.onmouseout = StartMenuTimer;
                objNewDiv.appendChild(objTable);
                document.body.appendChild(objNewDiv);
                IE_OpenMenu(objItem, objNewDiv);

                var iMenuPos = arrOpenMenus.length;
                arrOpenMenusHTML[iMenuPos] = objNewDiv;
                arrOpenMenus[iMenuPos] = arrMenuItem;
                arrSourceDiv[iMenuPos] = objItem;
            }
        }
    }
    hideSelectBoxes();
}

function IE_BuildMenu(arrItem, objSrcItem) {
    var objMenu;
    if (arrItem.length == 6 || arrItem.length == 8) {

        var arrItemGroups = arrItem[arrItem.length - 1];
        objMenu = IE_CreateEmptyTable();

        for (var iGroupCnt = arrItemGroups.length - 1; iGroupCnt >= 0; iGroupCnt--) {
            objMenu.insertRow(0).insertCell(-1).appendChild(IE_BuildGroup(arrItemGroups[iGroupCnt], objSrcItem, arrItem[0], iGroupCnt));
        }
    }

    return objMenu;
}

function IE_BuildGroup(arrGroup, objSrcItem, iSrcId, iGroupCnt) {
    var objGroup = IE_CreateEmptyTable();
    var strTitleBGColor = '';
    var strTitleFGColor = '';
    var iGroupCnt = iGroupCnt;

    if (arrGroup.length == 6) {
        /* strTitleBGColor = arrGroup[3];
        strTitleFGColor = arrGroup[4]; */
    }

    var objTR;
    var objTD;

    switch (arrGroup[0]) {
        case 'starthere':
            objTD = IE_AddTableRow(objGroup, 2, 'MTSH', 'Start here', strTitleBGColor, strTitleFGColor);
            break;
        case 'more':
            objTD = IE_AddTableRow(objGroup, 2, 'MTMO', 'More', strTitleBGColor, strTitleFGColor);
            break;
        case '':
            IE_AddTableRow(objGroup, 2, 'MTMO', '', strTitleBGColor, strTitleFGColor);
            break;
    }

    /* Paul Clark 14/11/2008 - Add event handers to ensure popup window does 
    not disappear when hovering over the Start here or More heading. */
    if (objTD) {
        objTR = objTD.parentElement;
        objTR.onmouseover = IE_SHMouseOver;
        objTR.onmouseout = IE_SHMouseOut;
    }

    if (arrGroup[1] != '') {
        IE_AddTableRow(objGroup, 2, 'MTlt2', arrGroup[1], strTitleBGColor, strTitleFGColor);
    }

    switch (arrGroup[2]) {
        case 'divider':
            objGroup.className = 'MGDiv';
            break;
        case 'gap':
            objGroup.className = 'MGGap';
            break;
    }

    IE_BuildItems(objGroup, arrGroup[0], arrGroup[arrGroup.length - 1], objSrcItem, iGroupCnt);

    return objGroup;
}

function IE_SetTDBGFG(objTD, strBGColor, strFGColor) {
    if (objTD && strBGColor != '') {
        objTD.style.backgroundColor = strBGColor;
        if (strFGColor != '') {
            objTD.style.color = strFGColor;
        }
    }
}

function IE_AddTableRow(objTable, icolspan, strClass, strText, strBGColor, strFGColor) {
    if (objTable) {
        var objTD = objTable.insertRow(-1).insertCell(-1);
        objTD.colSpan = icolspan;
        objTD.className = strClass;
        objTD.innerText = strText;
        IE_SetTDBGFG(objTD, strBGColor, strFGColor);

        return objTD;
    }
}

function IE_BuildItems(objGroupTable, strGroupType, arrItems, objSrcItem, iGroupCnt) {
    var iGroupCnt = iGroupCnt;
    if (arrItems && objGroupTable) {
        for (var iItemCnt = 0; iItemCnt < arrItems.length; iItemCnt++) {
            var arrItem = arrItems[iItemCnt];
            var objRow = objGroupTable.insertRow(-1);
            var objTd;
            var tempGroup;

            tempGroupType = strGroupType;

            objRow.className = 'MI';
            objRow.onmouseover = handlerMenuMouseOver;
            objRow.onmouseout = handlerMenuMouseOut;
            objRow.onclick = handlerMenuClick;

            objTd = objRow.insertCell(-1);

            if (iItemCnt > 0) {
                objTd.style.borderTop = 'dashed 1px #FE0000';
            }

            //osman - add this section to appear dashed line in left hand menu flyouts

            if (strGroupType == '' && iGroupCnt > 0) {
                objTd.style.borderTop = 'dashed 1px #FE0000';
            }
            else {
                if (iItemCnt > 0) {
                    objTd.style.borderTop = 'dashed 1px #FE0000';
                }
            }


            if (strGroupType != '') {
                objTd.className = 'MTDI';
            }
            else {
                objTd.className = 'MTD';
            }

            // Create Table inside TD.
            var objNewTable = IE_CreateEmptyTable();
            var objNewRow = objNewTable.insertRow(-1);
            var objNewCol = objNewRow.insertCell(-1);

            //osman add extra padding 17 Oct 2008
            objNewCol.style.paddingBottom = '2px';
            objTd.appendChild(objNewTable);

            var objImgTD;
            var strImage;

            if (objSrcItem.id.substr(0, 3) == "lef") {
                objRow.id = 'lefmui_' + arrItem[0];
                objImgTD = objNewRow.insertCell(0);
                objImgTD.align = 'left';
                strImage = GetImageHTML(1);
            }
            else {
                objRow.id = 'mui_' + arrItem[0];
                objImgTD = objNewRow.insertCell(-1);
                strImage = GetImageHTML(0);
                IE_ObjSelectedHighlights(objRow);
            }

            objImgTD.align = 'right';
            objImgTD.className = 'MTDA';

            if (arrItem.length == 6 || arrItem.length == 8) {
                objRow.onclick = handlerMenuClick;
                objNewCol.innerHTML = IE_GetItemContents(arrItem);
                objImgTD.valign = 'middle';
                objImgTD.innerHTML = strImage;

            }
            else {
                var objNewA = document.createElement('A');
                if (objNewA) {
                    if (arrItem[0] == menuId) {
                        objNewA.className = 'MLkSelected'; //k9 this is to keep the text white in the flightout selected object
                        IE_ObjSelectedHighlights(objNewA); //k9
                        /*this if statement was added to leave highlighted the cliked row on the fligh out*/
                    }
                    else {
                        objNewA.className = 'MLk';
                    }
                    // TODO: CVEGA - implement ml.asp functionality
                    //objNewA.href = 'menulink.aspx?' + arrItem[0];
					//objNewA.href = '#';
					objNewA.href = arrItem[1];
                    objNewA.innerHTML = IE_GetItemContents(arrItem);
                    objNewCol.appendChild(objNewA);
                }
            }
        }
    }
}

function IE_GetItemContents(arrItem) {
    var strDesc = ""

    if (arrItem.length > 6 && arrItem[5] == "left") {
        strDesc += '<img src="/images/menus/' + arrItem[6] + '">&nbsp;&nbsp;';
    }

    if (arrItem[4] != "") {
        strDesc += '<span class="MI' + arrItem[4] + '">'
    }

    strDesc += arrItem[2];

    if (arrItem[4] != "") {
        strDesc += '</span>'
    }

    if (arrItem.length > 6 && arrItem[5] == "right") {
        strDesc += '&nbsp;&nbsp;<img src="/images/menus/' + arrItem[6] + '">';
    }

    return strDesc
}

function IE_CreateEmptyTable() {
    var objTable = document.createElement('TABLE');

    objTable.border = 0;
    objTable.cellPadding = 0;
    objTable.cellSpacing = 0;
    objTable.width = '100%';

    return objTable;
}

function IE_OpenMenu(eSrc, eMenu) {
    var iMenuLeft = IE_GetLeftOffset(eSrc);
    var iMenuTop = IE_GetTopOffset(eSrc);

    switch (eSrc.id.substr(0, 3)) {
        case 'bel':
            /*		      UBFBE 5.6.8 Changes to left align and fix vertical aligment with drop
            down menus with market segment tabs in global market segment 
            navigation menu  */
            
			/*eMenu.style.left = iMenuLeft + eSrc.offsetWidth - eMenu.offsetWidth;*/
            eMenu.style.left = iMenuLeft;
            eMenu.style.top = iMenuTop + eSrc.offsetHeight + 1;
            
			//alert("Align");
            break;
        case 'abo':
            eMenu.style.left = iMenuLeft;
            eMenu.style.top = iMenuTop - eMenu.offsetHeight - 1;
			break;
        case 'lef':
            eMenu.style.left = iMenuLeft - eMenu.offsetWidth + 10;
            eMenu.style.top = IE_GetTopOffsetOnPage(iMenuTop, eSrc, eMenu);
			break;
        default:
              eMenu.style.left = ''+(eSrc.offsetWidth + iMenuLeft - 10)+'px';
            eMenu.style.top = ''+IE_GetTopOffsetOnPage(iMenuTop, eSrc, eMenu)+'px';
    }

    iNatWidth = eMenu.offsetWidth;
    iNatHeight = eMenu.offsetHeight;

    eMenu.style.zIndex = arrOpenMenus.length + 1;
}

var objMenu;
var iNatWidth;
var iNatHeight;
var iSetWidth;
var iSetHeight;

function SlideMenu() {
    if (iSetWidth < iNatWidth) {
        objMenu.style.width = iSetWidth += 10;
    }
    if (iSetHeight < iNatHeight) {
        objMenu.style.height = iSetHeight += 10;
    }

    if (iSetWidth < iNatWidth || iSetHeight < iNatHeight) {
        window.setTimeout(SlideMenu, 1);
    }
}

function IE_GetLeftOffset(eStart) {
    var iOffset = 0;
    var eTmp = eStart;

    while (eTmp.tagName.toLowerCase() != "body") {
        iOffset += eTmp.offsetLeft;
        eTmp = eTmp.offsetParent;
        if (eTmp == null)
            break;
    }

    return iOffset;
}

function IE_GetTopOffset(eStart) {
    var iOffset = 0;
    var eTmp = eStart;

    while (eTmp.tagName.toLowerCase() != "body") {
        iOffset += eTmp.offsetTop;
        eTmp = eTmp.offsetParent;
        if (eTmp == null)
            break;
    }

    return iOffset;
}

function IE_GetAbsoluteTopOffset(eStart) {
    var iOffset = 0;
    var iAbsMax = 0;
    var eTmp = eStart;

    while (eTmp.tagName.toLowerCase() != "body") {
        iOffset += eTmp.offsetTop;
        eTmp = eTmp.offsetParent;
        if (eTmp == null)
            break;
        if (eTmp.currentStyle && eTmp.currentStyle.position != 'absolute')
            iAbsMax = iOffset;
    }

    if (iAbsMax != 0)
        return iAbsMax;
    else
        return iOffset;
}

function IE_GetTopOffsetOnPage(iBaseOffset, eSrc, eMenu) {
    var iRetVal = iBaseOffset;

    var objBody = document.body;
    var maxHeight = objBody.clientHeight;
    var iItemAbsPos = IE_GetAbsoluteTopOffset(eSrc);

    if (eMenu.offsetHeight > maxHeight) {
        iRetVal = iBaseOffset - iItemAbsPos + objBody.scrollTop + 5;
    }
    else if ((iItemAbsPos + eMenu.offsetHeight) > (objBody.scrollTop + maxHeight)) {
        iRetVal = iBaseOffset - iItemAbsPos - eMenu.offsetHeight + objBody.scrollTop + maxHeight - 5;
    }

    return iRetVal;
}

function hideSelectBoxes() {
    var objSel
    var i

    // show them all before we work out which one to hide  
    for (i = 0; i < document.all.tags("SELECT").length; i++) {
        objSel = document.all.tags("SELECT")[i];
        objSel.style.visibility = "";
    }
    // traverse the list of open menus

    if (arrOpenMenusHTML.length > 0) {
        var iMenuLeft = 0;
        var iMenuTop = 0;
        var iMenuRight;
        var iMenuBottom;

        var iSelLeft;
        var iSelTop;
        var iSelRight;
        var iSelBottom;

        var arrSelTags = document.all.tags("SELECT");
        var iSelTagsCount = arrSelTags.length - 1;

        for (var iMnuIdx = arrOpenMenusHTML.length - 1; iMnuIdx >= 0; iMnuIdx--) {
            var objMenu = arrOpenMenusHTML[iMnuIdx];

            iMenuLeft = objMenu.offsetLeft;
            iMenuRight = iMenuLeft + objMenu.offsetWidth;
            iMenuTop = objMenu.offsetTop;
            iMenuBottom = iMenuTop + objMenu.offsetHeight;

            for (i = iSelTagsCount; i >= 0; i--) {
                objSel = arrSelTags[i];

                iSelLeft = IE_GetLeftOffset(objSel);
                iSelRight = iSelLeft + objSel.offsetWidth;
                iSelTop = IE_GetTopOffset(objSel);
                iSelBottom = iSelTop + objSel.offsetHeight;

                if (testIntersection(iSelLeft, iSelRight, iMenuLeft, iMenuRight) &&
	            	testIntersection(iMenuTop, iMenuBottom, iSelTop, iSelBottom)) {
                    objSel.style.visibility = "hidden";
                }
            }
        }
    }
}

function testIntersection(iVal1_1, iVal_2, iVal2_1, iVal2_2) {
    var bRetVal;

    if ((iVal_2 - iVal1_1) >= (iVal2_2 - iVal2_1))
        bRetVal = (iVal2_1 >= iVal1_1 && iVal2_1 <= iVal_2) || (iVal2_2 >= iVal1_1 && iVal2_2 <= iVal_2)
    else
        bRetVal = (iVal1_1 >= iVal2_1 && iVal1_1 <= iVal2_2) || (iVal_2 >= iVal2_1 && iVal_2 <= iVal2_2)

    return bRetVal;
}

function IE_findmenuitem(strId) {
    var retArray;
    var id = parseInt(strId.substr(strId.search('_') + 1));
    for (var iTestMenu = arrOpenMenus.length; iTestMenu >= 0 && !retArray; iTestMenu--) {
        if (iTestMenu > 0) {
            retArray = IE_finditeminmenu(arrOpenMenus[iTestMenu - 1], id);
        }
        else {
            retArray = IE_findtoplevelitem(id);
        }
    }

    return retArray;
}

function IE_findtoplevelitem(iId) {
    var retArray;

    if (arrMenus) {
        for (var iMenuCnt = arrMenus.length - 1; iMenuCnt >= 0 && !retArray; iMenuCnt--) {
            retArray = IE_finditeminarray(arrMenus[iMenuCnt][2], iId);
        }
    }

    return retArray;
}

function IE_finditeminmenu(arrMenu, iId) {
    var retArray;
    if (arrMenu && arrMenu.length == 6) {
        var arrMenuItems = arrMenu[arrMenu.length - 1];

        for (var iTestGroup = arrMenuItems.length - 1; iTestGroup >= 0 && !retArray; iTestGroup--) {
            var arrGroup = arrMenuItems[iTestGroup]

            retArray = IE_finditeminarray(arrGroup[arrGroup.length - 1], iId);
        }
    }

    return retArray;
}

function IE_finditeminarray(arrItems, iId) {
    var retArray;

    if (arrItems && iId != 0) {
        for (var iTestItem = arrItems.length - 1; iTestItem >= 0; iTestItem--) {
            var arrTestItem = arrItems[iTestItem];

            if (arrTestItem) {
                if (arrTestItem[0] == iId) {
                    retArray = arrTestItem;
                    break;
                }
            }
        }
    }

    return retArray;
}

function setupmenus() {
    // do nothing as will be handled by initialisemenus in body onload events
}

/* 31/08/2009 - CVEGA - renamed so can be call by onload method instead */
function IE_initialisemenus() {
    if (document.all) {
        var ids = null;
        var leftmenitA = arrMenus[1];
        for (var iMenuCnt = arrMenus.length - 1; iMenuCnt >= 0; iMenuCnt--) {

            var arrMenu = arrMenus[iMenuCnt];
            var strItemPrefix;
            var arrMenuItems = arrMenu[2];

            var objMenu = document.all['mnu_' + arrMenu[0]];
            if (objMenu) {
                objMenu.onmouseover = StopMenuTimer;
                objMenu.onmouseout = StartMenuTimer;
            }


            switch (arrMenu[1]) {
                case "above":
                    strItemPrefix = "abomui_";
                    break;
                case "below":
                    strItemPrefix = "belmui_";
                    break;
                case "left":
                    strItemPrefix = "leftmui_";
                    break;
                default:
                    strItemPrefix = "mui_";
                    break;
            }

            if (arrMenuItems) {
                for (var iItemCnt = arrMenuItems.length - 1; iItemCnt >= 0; iItemCnt--) {
                    var arrItem = arrMenuItems[iItemCnt];
                    if (arrItem) {
                        var objHTMLItem = document.all[strItemPrefix + arrItem[0]];
                        if (objHTMLItem) {

                            var objImgItem;

                            if (strItemPrefix != 'mui_' && strItemPrefix != 'lefmui_') {
                                objHTMLItem.onmouseover = handlerMenuMouseOver;
                                objHTMLItem.onmouseout = handlerMenuMouseOut;
                                objHTMLItem.onclick = handlerMenuClick;
                                objHTMLItem.onmousemove = handlerMenuOnMouseMove;
                            }
                            else {
                                var objAnchor;
                                objAnchor = objHTMLItem.firstChild.firstChild;
                                if (objAnchor) {
                                    objAnchor.onmouseover = handlerMenuMouseOver;
                                    objAnchor.onmouseout = handlerMenuMouseOut;
                                    objAnchor.onclick = handlerMenuClick;
                                    objAnchor.onmousemove = handlerMenuOnMouseMove;
                                }
                            }

                            if (strItemPrefix == 'mui_' || strItemPrefix == 'lefmui_') {
                                // Now add the arrow as required
                                if (strItemPrefix == 'mui_') {
                                    objImgItem = objHTMLItem.insertCell(-1);
                                    objImgItem.align = 'right';
                                    objImgItem.style.width = '5px'
                                    //objImgItem.style.borderTop = 'black 1px dotted';

                                    IE_ObjSelectedHighlightsForLeftMenu(objHTMLItem);

                                    //Call to the function to keep the clicked item highlighted.
                                }
                                else {
                                    objImgItem = objHTMLItem.insertCell(0);

                                }


                                objImgItem.valign = 'middle';
                                objImgItem.className = 'MTDA';
                            }
                            else {
                                objImgItem = objHTMLItem;
                            }

                            if (arrItem.length == 6 || arrItem.length == 8) {
                                switch (strItemPrefix) {
                                    case 'belmui_':
                                        objImgItem.innerHTML += GetImageHTML(3);
                                        break;
                                    case 'abomui_':
                                        objImgItem.innerHTML += GetImageHTML(2);
                                        break;
                                    case 'lefmui_':
                                        objImgItem.innerHTML = GetImageHTML(1);
                                        break;
                                    default:
                                        objImgItem.innerHTML = GetImageHTML(0);
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
        IE_ExpandParentMenu();
    }
}
/*  Values for iType are as follows 
0 = Right
1 = Left
2 = Up
3 = Down
*/

var arrDefultImages = ['ArrowDown.gif', 'Arrowleft.gif', 'UpArrowGrey.gif', 'ArrowDown.gif'];
var arrImages = [];

function GetImageHTML(iType) {
    if (arrImages && arrImages.length == 4 && arrImages[iType] != '') {
	    return '<img src="/images/' + arrImages[iType] + '" alt="Menu Arrow" border="0"/>';
    }
    else {
	    return '<img src="/images/' + arrDefultImages[iType] + '" alt="Menu Arrow" border="0"/>';
    }
}

function IE_ObjSelectedHighlights(OBJitem) {
    var strId = OBJitem.id;
    var objGetParentId;
    var id = parseInt(strId.substr(strId.search('_') + 1));
    /*gets the menu id by searching for the '_' and getting the numbers that follow exp. mui_35 
    ParentItem is an array that contains the menu id of the menu item selected and its parents 
    ParentItem is generated through the MenuIDParents.xsl*/
    objGetParentId = OBJitem;
    for (var pInt = parentIds.length - 2; pInt >= 0; pInt--) {
        var ParentItem = parentIds[pInt];
        if (id == ParentItem) {
            IE_SetHighLights(OBJitem, true);

            //objDIVId = objGetParentId.parentElement.parentElement.parentElement.id.substring(6,7);
        }
    }
}

function IE_ObjSelectedHighlightsForLeftMenu(OBJitem) {
    var strId = OBJitem.id;
    var objGetParentId;
    var id = parseInt(strId.substr(strId.search('_') + 1));
    /*gets the menu id by searching for the '_' and getting the numbers that follow exp. mui_35 
    ParentItem is an array that contains the menu id of the menu item selected and its parents 
    ParentItem is generated through the MenuIDParents.xsl*/
    objGetParentId = OBJitem;
    for (var pInt = parentIds.length - 2; pInt >= 0; pInt--) {
        var ParentItem = parentIds[pInt];
        if (id == ParentItem) {
            IE_SetHighLights(OBJitem, true);

            objDIVId = objGetParentId.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id.substring(5, 6);
        }
    }
}
function IE_ExpandParentMenu() {
    var strCode;
    var objDiv;
    var objImage;
    var objHiddenDiv;
    var tempHTML;
    var innerHTMLOutput;
    if (objDIVId != null) {
        if (document.all) {
            objDiv = document.all('pwdiv' + objDIVId);
            objImage = document.all('pwi' + objDIVId);
            //objHiddenDiv = document.all('h' + objDiv.id);
        }
        else {
            /*  this code is for Mozilla */
            objDiv = document.getElementById('pwdiv' + objDIVId);
            objImage = document.getElementById('pwi' + objDIVId);
            //objHiddenDiv = document.getElementById('h' + objDiv.id);
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
    }
    return false;
}

function IE_GetParentDivClassName(objItem) {
    var strClassName;
    var objElement;

    strClassName = "";

    if (objItem != null) {
        objElement = objItem.parentElement;

        if (objElement == null) {
            return strClassName;
        }

        while (objElement.tagName.toUpperCase() != 'BODY') {
            if (objElement.tagName.toUpperCase() == 'DIV') {
                strClassName = objElement.className.toUpperCase();
                break;
            }

            /* Get the next parent element. */
            if (objElement.parentElement != null) {
                objElement = objElement.parentElement;
            }
            else {
                break;
            }
        }
    }

    return strClassName;
}

// MOZILLA METHODS

var iSelectedItemTimeOut;

/* 31/08/2009 - CVEGA - renamed so can be call by onload method instead */
function initialisemenus() {
    var arrStrPrefix = ['mui_', 'lefmui_', 'abomui_', 'belmui_'];

    for (var iMenuCnt = arrMenus.length - 1; iMenuCnt >= 0; iMenuCnt--) {
        var arrMenu = arrMenus[iMenuCnt];
        var objMenu = document.getElementById('mnu_' + arrMenu[0]);
        var arrMenuItems = arrMenu[2];
        var iMenuType = 0; // Default 'Right'

        if (objMenu) {
            objMenu.onmouseover = handlerMenu;
            objMenu.onmouseout = handlerMenu;
        }

        switch (arrMenu[1]) {
            case 'above':
                iMenuType = 2;
                break;
            case 'below':
                iMenuType = 3;
                break;
            case 'left':
                iMenuType = 1;
                break;
        }

        if (arrMenuItems) {
            for (var iItemCnt = arrMenuItems.length - 1; iItemCnt >= 0; iItemCnt--) {
                var arrItem = arrMenuItems[iItemCnt];

                if (arrItem) {
                    var objHTMLItem = document.getElementById(arrStrPrefix[iMenuType] + arrItem[0]);

                    if (objHTMLItem) {
                        var objImgItem = null;

                        objHTMLItem.onmouseover = handlerItem;
                        objHTMLItem.onmouseout = handlerItem;
                        objHTMLItem.onclick = handlerItem;
                        ObjSelectedHighlightsLeftMenu(objHTMLItem); //k9

                        //Call to the function to keep the clicked item highlighted.  
                        if (iMenuType == 0) {
                            objImgItem = objHTMLItem.appendChild(document.createElement('td'));
                            objImgItem.className = 'MTDA';
                        }
                        else if (iMenuType == 1) {
                            objImgItem = objHTMLItem.insertBefore(document.createElement('td'), objHTMLItem.childNodes[0]);
                            objImgItem.className = 'MTDA';

                        }

                        if (arrItem.length == 6 || arrItem.length == 8) {
                            switch (iMenuType) {
                                case 2:
                                case 3:
                                    objHTMLItem.innerHTML += GetImageHTML(iMenuType);
                                    break;
                                case 1:
                                    objImgItem.align = 'left';
                                    objImgItem.valign = 'middle';
                                    objImgItem.innerHTML = GetImageHTML(iMenuType);
                                    break;
                                default:
                                    objImgItem.align = 'right';
                                    objImgItem.valign = 'middle';
                                    objImgItem.innerHTML = GetImageHTML(iMenuType);
                                    break;
                            }
                        }
                        else if (objImgItem) {
                            objImgItem.innerHTML = '&nbsp;'
                        }
                    }
                }
            }
        }
    }
    ExpandParentMenu()
}

function setupLeftMenus() {
    var arrStrPrefix = ['mui_', 'lefmui_', 'abomui_', 'belmui_'];

    for (var iMenuCnt = arrMenus.length - 1; iMenuCnt >= 0; iMenuCnt--) {
        var arrMenu = arrMenus[iMenuCnt];
        var objMenu = document.getElementById('mnu_' + arrMenu[0]);
        var arrMenuItems = arrMenu[2];
        var iMenuType = 0; // Default 'Right'

        if (objMenu) {
            objMenu.onmouseover = handlerMenu;
            objMenu.onmouseout = handlerMenu;
        }

        switch (arrMenu[1]) {
            case 'above':
                iMenuType = 2;
                break;
            case 'below':
                iMenuType = 3;
                break;
            case 'left':
                iMenuType = 1;
                break;
        }

        if (arrMenuItems) {
            for (var iItemCnt = arrMenuItems.length - 1; iItemCnt >= 0; iItemCnt--) {
                var arrItem = arrMenuItems[iItemCnt];

                if (arrItem) {
                    var objHTMLItem = document.getElementById(arrStrPrefix[iMenuType] + arrItem[0]);

                    if (objHTMLItem) {
                        var objImgItem = null;

                        objHTMLItem.onmouseover = handlerItem;
                        objHTMLItem.onmouseout = handlerItem;
                        objHTMLItem.onclick = handlerItem;
                        ObjSelectedHighlights(objHTMLItem); //k9

                        //Call to the function to keep the clicked item highlighted.  
                    }
                }
            }
        }
    }
}

/*  Values for iType are as follows 
0 = Right
1 = Left
2 = Up
3 = Down
*/

var arrDefultImages = ['ArrowDown.gif', 'Arrowleft.gif', 'UpArrowGrey.gif', 'ArrowDown.gif'];
var arrImages = [];

function GetImageHTML(iType) {
    if (arrImages && arrImages.length == 4 && arrImages[iType] != '') {
		//return '<img src="/images/' + arrImages[iType] + '" alt="Menu Arrow" border="0"/>';
		return '<img src="./themes/images/ArrowDown.gif" alt="Menu Arrow" border="0"/>';
    }
    else {
	    //return '<img src="/images/' + arrDefultImages[iType] + '" alt="Menu Arrow" border="0"/>';
		return '<img src="./themes/images/ArrowDown.gif" alt="Menu Arrow" border="0"/>';
    }
}

// Menu event handlers  
var bMenuTimeOut = false;
var iMenuTimeOut;

function handlerMenu(e) {
    if (e.type == 'mouseout') {
        iMenuTimeOut = window.setTimeout(handlerMenuTimer, 1000);
        bMenuTimeOut = true;
    }
    else if (bMenuTimeOut) {
        window.clearTimeout(iMenuTimeOut);
        bMenuTimeOut = false;
    }
}

function handlerMenuTimer() {
    bMenuTimeOut = false;
    CloseNonParentMenus();
}

// Item event handlers

var bActiveItemTimer = false
var objCurrentSelectedItem = null;

function handlerItem(e) {
    var bRetVal = false;

    if (bActiveItemTimer) {
        window.clearTimeout(iSelectedItemTimeOut);
        bActiveItemTimer = false;
    }

    if (e.type == 'mouseout') {
        iSelectedItemTimeOut = window.setTimeout(CloseNonParentMenus, 500);
        bActiveItemTimer = true;
    }

    if (e.type == 'click') {
        var arrSelectedArrayItem = findMenuItem(e.currentTarget);

        if (arrSelectedArrayItem) {
            if (arrSelectedArrayItem.length == 6 || arrSelectedArrayItem.length == 8) {
                objCurrentSelectedItem = e.currentTarget;

                SetHighLights(e.currentTarget, true);
                ObjSelectedHighlights(e.currentTarget); //k9              
                handlerOpenItem()
            }
            else {
                //        window.location = 'ml.asp?' + arrSelectedArrayItem[0]; // 31/08/2009 - CVEGA - removed hard coded url
                //window.location = 'menulink.aspx?' + arrSelectedArrayItem[0];
				//window.location = '#';
				window.location = arrSelectedArrayItem[1];
            }
        }
    }
    else if (e.type == 'mouseover' || e.type == 'focus') {
        if (!(isItemSelected(e.currentTarget))) {
            objCurrentSelectedItem = e.currentTarget;
            iSelectedItemTimeOut = window.setTimeout(handlerOpenItem, 500);
            bActiveItemTimer = true;

            SetHighLights(e.currentTarget, true);
            ObjSelectedHighlights(e.currentTarget); //k9    
        }
    }
    else if (e.currentTarget == objCurrentSelectedItem) // e.type == 'mouseout'
    {
        SetHighLights(objCurrentSelectedItem, false);
        ObjSelectedHighlights(objCurrentSelectedItem); //k9   
        objCurrentSelectedItem = null;
    }

    return bRetVal;
}

function SHMouseOver() {
    window.clearTimeout(iSelectedItemTimeOut);
    bActiveItemTimer = false;
    return false;
}

function SHMouseOut() {
    iSelectedItemTimeOut = window.setTimeout(CloseNonParentMenus, 500);
    bActiveItemTimer = true;
    return false;
}

function SetHighLights(objItem, bTurnOn) {
    if (objItem) {
		//alert(objItem.innerHTML)
        /*
        1/09/2008 Paul Clark
        If the menu item has a parent Div of DMC (i.e. is the Upper or Lower Global navigation,
        then do not call the SetHighlights() function.
        */
        if (GetParentDivClassName(objItem) != 'DMC') {
            if (objItem.style) {
                objItem.style.backgroundColor = (bTurnOn) ? kstrHighLightBackground : '';
                objItem.style.color = (bTurnOn) ? kstrHighLightForeground : '';
                objItem.style.cursor = (bTurnOn) ? 'pointer' : '';
            }

            for (var iChildNode = objItem.childNodes.length - 1; iChildNode >= 0; iChildNode--) {
                SetHighLights(objItem.childNodes.item(iChildNode), bTurnOn);
            }
        }
    }
}

var mdarrOpenMenu = [];

function isItemSelected(objEvalItem) {
    for (iTestItem = mdarrOpenMenu.length - 1; iTestItem >= 0; iTestItem--) {
        if (mdarrOpenMenu[iTestItem][0] == objEvalItem) {
            return true;
        }
    }

    return false;
}

function handlerOpenItem() {
    if (bActiveItemTimer) {
        window.clearTimeout(iSelectedItemTimeOut);
        bActiveItemTimer = false;
    }

    if (objCurrentSelectedItem) {
        var arrSelectedArrayItem = findMenuItem(objCurrentSelectedItem);

        if (arrSelectedArrayItem) {
            // Close all non parent menus
            CloseNonParentMenus(arrSelectedArrayItem)

            var objNewMenu = BuildMenu(arrSelectedArrayItem, objCurrentSelectedItem);

            if (objNewMenu) {
                var objNewDiv = document.createElement('DIV');
                objNewDiv.className = 'MDefH';

                objNewMenu.onmouseover = handlerMenu;
                objNewMenu.onmouseout = handlerMenu;

                objNewDiv.appendChild(objNewMenu);
                document.body.appendChild(objNewDiv);

                OpenMenu(objCurrentSelectedItem, objNewDiv);

                mdarrOpenMenu[mdarrOpenMenu.length] = [objCurrentSelectedItem, objNewDiv, arrSelectedArrayItem];

                objNewDiv.style.visibility = "visible"
                objCurrentSelectedItem = null;
            }
        }
    }
}

// Close other menus when opening a new one

function CloseNonParentMenus(arrMenuItem) {
    var iMenuId = 0;
    if (arrMenuItem) {
        iMenuId = arrMenuItem[0];
    }

    for (var iTestMenu = mdarrOpenMenu.length - 1; iTestMenu >= 0; iTestMenu--) {
        var arrParentMenu = finditeminmenu(mdarrOpenMenu[iTestMenu][2], iMenuId);

        if (!arrParentMenu) {
            document.body.removeChild(mdarrOpenMenu[iTestMenu][1]);
            SetHighLights(mdarrOpenMenu[iTestMenu][0], false);
            ObjSelectedHighlights(mdarrOpenMenu[iTestMenu][0]); //k9
            mdarrOpenMenu.length--;
        }
        else {
            break;
        }
    }
}

// Build a sub menu

function BuildMenu(arrItem, objSrcItem) {
    var objMenu = null;

    if (arrItem.length == 6 || arrItem.length == 8) {
        var arrItemGroups = arrItem[arrItem.length - 1];
        objMenu = CreateEmptyTable();

        for (var iGroupCnt = 0; iGroupCnt < arrItemGroups.length; iGroupCnt++) {
            objMenu.appendChild(document.createElement('tr')).appendChild(document.createElement('td')).appendChild(BuildGroup(arrItemGroups[iGroupCnt], objSrcItem, iGroupCnt));
        }
    }

    return objMenu;
}

function CreateEmptyTable() {
    var objTable = document.createElement('TABLE');

    with (objTable) {
        border = 0;
        cellPadding = 0;
        cellSpacing = 0;
        width = '100%';
    }

    return objTable;
}

function BuildGroup(arrGroup, objSrcItem, iGroupCnt) {
    var iGroupCnt = iGroupCnt;
    var objGroup = CreateEmptyTable();
    var strTitleBGColor = '';
    var strTitleFGColor = '';

    if (arrGroup.length == 6) {
        /* strTitleBGColor = arrGroup[3];
        strTitleFGColor = arrGroup[4]; */
    }

    var objTR;
    var objTD;

    switch (arrGroup[0]) {
        case 'starthere':
            objTD = AddTableRow(objGroup, 2, 'MTSH', 'Start here', strTitleBGColor, strTitleFGColor);
            break;
        case 'more':
            objTD = AddTableRow(objGroup, 2, 'MTMO', 'More', strTitleBGColor, strTitleFGColor);
            break;
    }

    /* Paul Clark 14/11/2008 - Add event handers to ensure popup window does 
    not disappear when hovering over the Start here or More heading. */
    if (objTD) {
        objTR = objTD.parentNode;
        objTR.onmouseover = SHMouseOver;
        objTR.onmouseout = SHMouseOut;
    }

    if (arrGroup[1] != '') {
        AddTableRow(objGroup, 2, 'MTlt2', arrGroup[1], strTitleBGColor, strTitleFGColor);
    }

    switch (arrGroup[2]) {
        case 'divider':
            objGroup.className = 'MGDiv';
            break;
        case 'gap':
            objGroup.className = 'MGGap';
            break;
    }


    BuildItems(objGroup, arrGroup[0], arrGroup[arrGroup.length - 1], objSrcItem, iGroupCnt);

    return objGroup;
}

function AddTableRow(objTable, iColSpan, strClass, strText, strBGColor, strFGColor) {
    if (objTable) {
        var objTD = objTable.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));

        with (objTD) {
            if (iColSpan > 1) {
                colSpan = iColSpan;
            }
            if (strClass != '') {
                className = strClass;
            }
            innerHTML = strText;
        }

        SetTDBGFG(objTD, strBGColor, strFGColor);

        return objTD;
    }
}

function SetTDBGFG(objTD, strBGColor, strFGColor) {
    if (objTD && strBGColor != '') {
        //alert(strBGColor);
        objTD.style.backgroundColor = strBGColor;
        if (strFGColor != '') {
            objTD.style.color = strFGColor;
        }
    }
}



function BuildItems(objGroupTable, strGroupType, arrItems, objSrcItem, iGroupCnt) {
    var iGroupCnt = iGroupCnt;
    if (arrItems && objGroupTable) {
        for (var iItemCnt = 0; iItemCnt < arrItems.length; iItemCnt++) {
            var arrItem = arrItems[iItemCnt];
            var objRow = objGroupTable.appendChild(document.createElement('tr'));
            var objTd = objRow.appendChild(document.createElement('td'));

            if (iItemCnt > 0) {
                objTd.style.borderTop = 'dashed 1px #FE0000';
            }
            //osman - add this section to appear dashed line in left hand menu flyouts

            if (strGroupType == '' && iGroupCnt > 0) {
                objTd.style.borderTop = 'dashed 1px #FE0000';
            }
            else {
                if (iItemCnt > 0) {
                    objTd.style.borderTop = 'dashed 1px #FE0000';
                }
            }

            // Create Table inside TD.
            var objNewTable = CreateEmptyTable();
            var objNewRow = objNewTable.appendChild(document.createElement('tr'));
            var objNewCol = objNewRow.appendChild(document.createElement('td'));
            var objImgTD = document.createElement('td');
            objTd.appendChild(objNewTable);
            // Osman - 17th Oct 2008 added extra padding 
            objNewCol.style.paddingBottom = '2px';

            objRow.className = 'MI';
            objRow.onmouseover = handlerItem;
            objRow.onmouseout = handlerItem;
            objRow.onclick = handlerItem;

            if (strGroupType != '') {
                objTd.className = 'MTDI';
            }
            else {
                objTd.className = 'MTD';
            }

            objImgTD.align = 'right';
            objImgTD.className = 'MTDA';
            objNewCol.innerHTML = GetItemContents(arrItem);
            if (arrItem.length == 6 || arrItem.length == 8) {
                if (objSrcItem.id.substr(0, 3) == "lef") {
                    objRow.id = 'lefmui_' + arrItem[0];
                    objImgTD.align = 'left';
                    objImgTD.innerHTML = GetImageHTML(1);
                    objImgTD = objRow.insertBefore(objImgTD, objTd);

                }
                else {
                    objRow.id = 'mui_' + arrItem[0];
                    objImgTD.innerHTML = GetImageHTML(0);
                    objImgTD = objNewRow.appendChild(objImgTD);
                    ObjSelectedHighlights(objRow); //k9 this hightlights the flyout menus

                }
            }
            else {
                objRow.id = 'mitm_' + arrItem[0];
                objImgTD.innerHTML = '&nbsp;';
                objImgTD = objNewRow.appendChild(objImgTD);
                ObjSelectedHighlights(objRow); //k9 to highlight the last element of the fly-out      
            }
        }
    }
}

function GetItemContents(arrItem) {
    var strDesc = ""

    if (arrItem.length > 6 && arrItem[5] == "left") {
        strDesc += '<img src="/images/menus/' + arrItem[6] + '">&nbsp;&nbsp;';
    }

    strDesc += arrItem[2];

    if (arrItem.length > 6 && arrItem[5] == "right") {
        strDesc += '&nbsp;&nbsp;<img src="/images/menus/' + arrItem[6] + '">';
    }

    return strDesc
}

// Menu placment functions
function OpenMenu(eSrc, eMenu) {
    var iMenuLeft = GetLeftOffset(eSrc);
    var iMenuTop = GetTopOffset(eSrc);
    var iMenuNewLeft = 0;
    var iMenuNewTop = 0;

    switch (eSrc.id.substr(0, 3)) {
        case 'bel':
            /*    UBFBE 5.6.8 Replicated changes to iemenus.js here to left align and fix vertical aligment with 
            drop down menus with market segment tabs in lower global navigation menu  */
            
			/*iMenuNewLeft = iMenuLeft + eSrc.offsetWidth - eMenu.offsetWidth;*/
            iMenuNewLeft = iMenuLeft;
			
            iMenuNewTop = iMenuTop + eSrc.offsetHeight + 1;
            

			//alert("Align");
            break;
        case 'abo':
            iMenuNewLeft = iMenuLeft;
            iMenuNewTop = iMenuTop - eMenu.offsetHeight - 1;
            break;
        case 'lef':
            iMenuNewLeft = iMenuLeft - eMenu.offsetWidth + 10;
            iMenuNewTop = GetTopOffsetOnPage(iMenuTop, eSrc, eMenu);
            break;
        default:
            iMenuNewLeft = eSrc.offsetWidth + iMenuLeft - 10;
            iMenuNewTop = GetTopOffsetOnPage(iMenuTop, eSrc, eMenu);
    }

    eMenu.style.left = iMenuNewLeft + 'px';
    eMenu.style.top = iMenuNewTop + 'px';

    eMenu.style.zIndex = mdarrOpenMenu.length + 1 +100;
}

function GetLeftOffset(eStart) {
    var iOffset = 0;
    var eTmp = eStart;

    while (eTmp.tagName.toLowerCase() != "body") {
        iOffset += eTmp.offsetLeft;
        eTmp = eTmp.offsetParent;
    }

    return iOffset;
}

function GetTopOffset(eStart) {
    var iOffset = 0;
    var eTmp = eStart;

    while (eTmp.tagName.toLowerCase() != "body") {
        iOffset += eTmp.offsetTop;
        eTmp = eTmp.offsetParent;
    }

    return iOffset;
}

function GetTopOffsetOnPage(iBaseOffset, eSrc, eMenu) {
    var iRetVal = iBaseOffset;

    var objBody = document.body;
    var maxHeight = objBody.clientHeight;
    var iItemAbsPos = GetAbsoluteTopOffset(eSrc);

    if (eMenu.offsetHeight > maxHeight) {
        iRetVal = iBaseOffset - iItemAbsPos + objBody.scrollTop + 5;
    }
    else if ((iItemAbsPos + eMenu.offsetHeight) > (objBody.scrollTop + maxHeight)) {
        iRetVal = iBaseOffset - iItemAbsPos - eMenu.offsetHeight + objBody.scrollTop + maxHeight - 5;
    }

    return iRetVal;
}

function GetAbsoluteTopOffset(eStart) {
    var iOffset = 0;
    var iAbsMax = 0;
    var eTmp = eStart;

    while (eTmp && eTmp.tagName.toLowerCase() != "body") {
        iOffset += eTmp.offsetTop;
        eTmp = eTmp.offsetParent;
        if (eTmp && eTmp.currentStyle && eTmp.currentStyle.position != 'absolute')
            iAbsMax = iOffset;
    }

    if (iAbsMax != 0)
        return iAbsMax;
    else
        return iOffset;
}

// Menu array handlers

function findMenuItem(objSelectedItem) {
    var retArray = null;

    var id = parseInt(objSelectedItem.id.split('_')[1]);

    for (var iTestMenu = mdarrOpenMenu.length - 1; iTestMenu >= 0 && !retArray; iTestMenu--) {
        retArray = finditeminmenu(mdarrOpenMenu[iTestMenu][2], id);
    }

    return (retArray) ? retArray : findtoplevelitem(id);
}

function findtoplevelitem(iId) {
    var retArray = null;

    for (var iMenuCnt = arrMenus.length - 1; iMenuCnt >= 0 && !retArray; iMenuCnt--) {
        retArray = finditeminarray(arrMenus[iMenuCnt][2], iId);
    }

    return retArray;
}

function finditeminmenu(arrMenu, iId) {
    var retArray = null;

    if (arrMenu.length == 6 || arrMenu.length == 8) {
        var arrMenuItems = arrMenu[arrMenu.length - 1];

        for (var iTestGroup = arrMenuItems.length - 1; iTestGroup >= 0 && !retArray; iTestGroup--) {
            var arrGroup = arrMenuItems[iTestGroup]

            retArray = finditeminarray(arrGroup[arrGroup.length - 1], iId);
        }
    }

    return retArray;
}

function finditeminarray(arrItems, iId) {
    if (arrItems && iId != 0) {
        for (var iTestItem = arrItems.length - 1; iTestItem >= 0; iTestItem--) {
            if (arrItems[iTestItem][0] == iId) {
                return arrItems[iTestItem];
            }
        }
    }

    return null;
}

function ObjSelectedHighlights(OBJitem) {
    var strId = OBJitem.id;
    var objGetParentId;
    var id = parseInt(strId.substr(strId.search('_') + 1));
    /*gets the menu id by searching for the '_' and getting the numbers that follow exp. mui_35 
    ParentItem is an array that contains the menu id of the menu item selected and its parents 
    ParentItem is generated through the MenuIDParents.xsl*/
    objGetParentId = OBJitem;
    for (var pInt = parentIds.length - 2; pInt >= 0; pInt--) {
        var ParentItem = parentIds[pInt];
        if (id == ParentItem) {
            SetHighLights(OBJitem, true)
            //objDIVId = objGetParentId.parentNode.parentNode.parentNode.id.substring(6,7);
        }
    }
}

function ObjSelectedHighlightsLeftMenu(OBJitem) {
    var strId = OBJitem.id;
    var objGetParentId;
    var id = parseInt(strId.substr(strId.search('_') + 1));
    /*gets the menu id by searching for the '_' and getting the numbers that follow exp. mui_35 
    ParentItem is an array that contains the menu id of the menu item selected and its parents 
    ParentItem is generated through the MenuIDParents.xsl*/
    objGetParentId = OBJitem;
    for (var pInt = parentIds.length - 2; pInt >= 0; pInt--) {
        var ParentItem = parentIds[pInt];
        if (id == ParentItem) {
            SetHighLights(OBJitem, true)
            objDIVId = objGetParentId.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.substring(5, 6);
        }
    }
}
function ExpandParentMenu() {
    var strCode;
    var objDiv;
    var objImage;
    var objHiddenDiv;
    var tempHTML;
    var innerHTMLOutput;
    if (objDIVId != null && objDIVId != '') {
        if (document.all) {
            objDiv = document.all('pwdiv' + objDIVId);
            objImage = document.all('pwi' + objDIVId);
            //objHiddenDiv = document.all('h' + objDiv.id);
        }
        else {
            /*  this code is for Mozilla */
            objDiv = document.getElementById('pwdiv' + objDIVId);
            objImage = document.getElementById('pwi' + objDIVId);
            //objHiddenDiv = document.getElementById('h' + objDiv.id);
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
    }
    return false;
}

function GetParentDivClassName(objItem) {
    var strClassName;
    var objElement;

    strClassName = "";

    if (objItem != null) {
        objElement = objItem.parentNode;

        if (objElement == null) {
            return strClassName;
        }

        while (objElement.tagName.toUpperCase() != 'BODY') {
            if (objElement.tagName.toUpperCase() == 'DIV') {
                strClassName = objElement.className.toUpperCase();
                break;
            }

            /* Get the next parent element. */
            if (objElement.parentNode != null) {
                objElement = objElement.parentNode;
            }
            else {
                break;
            }
        }
    }

    return strClassName;
}

