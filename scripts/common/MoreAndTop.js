/*     15/12/2009 - CVEGA - coverted from inline to function  */
function setupMoreAndTop() {
    // setup more and top
    window.onresize = moreandtop;
    window.onscroll = moreandtop;
    moreandtop();
}

function moreandtop()       
  {
  //alert('More and Top');
  var objBody = document.body;  
  var objBTT;
  var objMOR;
  var intLeft;

  if ( document.all )
    {
    objBTT = document.all('divBackToTop');
    objMOR = document.all('divMoreOnPage');
    }
  else
    {
    objBTT = document.getElementById('divBackToTop');
    objMOR = document.getElementById('divMoreOnPage');    
    }

	// 2/07/2008 Paul Clark - Determine the horizontal position the image should be placed.
	if ( objBody.clientWidth > 995 )
	{
		intLeft = (objBody.clientWidth - 995) / 2; // Gets the width of the Left Hand variable border.
		intLeft = intLeft + 35 + 180 + 2; // Combination of Left variable border, Left static border, Left Menu and a space of 2px.
		
	}
	else
	{
		intLeft = 35 + 180 + 2; // Combination of Left Border and Left Menu widths.
		
	
	}
	
  if (objBTT) 
    {
    if ( ( objBody.clientHeight >> 2 ) < objBody.scrollTop )
    {
		//objBTT.style.left = objBody.clientLeft + objBody.clientWidth - objBTT.offsetWidth - 2;
		objBTT.style.left = intLeft; // left menu width + 2
		objBTT.style.top = objBody.scrollTop + 2;
		objBTT.style.visibility = "visible";
      }
      else
      {
	    objBTT.style.visibility = "hidden";
      }
    }  
  if (objMOR)
    {
    if ( ( objBody.scrollTop + objBody.clientHeight ) < objBody.scrollHeight - 18 )
      {
      //objMOR.style.left = objBody.clientLeft + objBody.clientWidth - objBTT.offsetWidth - 2;
      objMOR.style.left = intLeft; // left menu width + 2
      objMOR.style.top = objBody.scrollTop + objBody.clientHeight - objMOR.offsetHeight - 2;
      objMOR.style.visibility = "visible";
      }
    else
      {
      objMOR.style.visibility = "hidden";
      }   
    } 
  }

function mt_pagedown()
  {
  window.scrollBy(0, document.body.clientHeight);
  moreandtop();
  }
  
function mt_pagetop()
  {
  window.scrollTo(document.body.scrollLeft,0);
  moreandtop();
  }  


