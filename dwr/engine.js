"undefined"==typeof this.dwr&&(dwr={});
(function(){dwr.engine={};dwr.engine.setErrorHandler=function(a){dwr.engine._errorHandler=a};dwr.engine.setWarningHandler=function(a){dwr.engine._warningHandler=a};dwr.engine.setTextHtmlHandler=function(a){dwr.engine._textHtmlHandler=a};dwr.engine.setTimeout=function(a){dwr.engine._timeout=a};dwr.engine.setPreHook=function(a){dwr.engine._preHook=a};dwr.engine.setPostHook=function(a){dwr.engine._postHook=a};dwr.engine.setHeaders=function(a){dwr.engine._headers=a};dwr.engine.setParameters=function(a){dwr.engine._parameters=
a};dwr.engine.setOrdered=function(a){dwr.engine._ordered=a};dwr.engine.setAsync=function(a){dwr.engine._async=a};dwr.engine.setActiveReverseAjax=function(a){a?dwr.engine._activeReverseAjax||(dwr.engine._activeReverseAjax=!0,dwr.engine._poll()):(dwr.engine._activeReverseAjax&&dwr.engine._pollReq&&dwr.engine._pollReq.abort(),dwr.engine._activeReverseAjax=!1)};dwr.engine.setNotifyServerOnPageUnload=function(a){a!=dwr.engine._isNotifyServerOnPageUnload&&(a?window.addEventListener?window.addEventListener("unload",
dwr.engine._unloader,!1):window.attachEvent&&window.attachEvent("onunload",dwr.engine._unloader):window.removeEventListener?window.removeEventListener("unload",dwr.engine._unloader,!1):window.detachEvent&&window.detachEvent("onunload",dwr.engine._unloader),dwr.engine._isNotifyServerOnPageUnload=a)};dwr.engine.defaultErrorHandler=function(a,b){dwr.engine._debug("Error: "+b.name+", "+b.message,!0);null==a||""==a?alert("A server error has occurred."):-1!=a.indexOf("0x80040111")?dwr.engine._debug(a):
alert(a)};dwr.engine.defaultWarningHandler=function(a,b){dwr.engine._debug(a)};dwr.engine.beginBatch=function(){dwr.engine._batch?dwr.engine._handleError(null,{name:"dwr.engine.batchBegun",message:"Batch already begun"}):dwr.engine._batch=dwr.engine.batch.create()};dwr.engine.endBatch=function(a){var b=dwr.engine._batch;null==b?dwr.engine._handleError(null,{name:"dwr.engine.batchNotBegun",message:"No batch in progress"}):(dwr.engine._batch=null,0!=b.map.callCount&&(a&&dwr.engine.batch.merge(b,a),
dwr.engine._ordered&&0!=dwr.engine._batchesLength?dwr.engine._batchQueue[dwr.engine._batchQueue.length]=b:dwr.engine.transport.send(b)))};dwr.engine.openInDownload=function(a){var b=document.createElement("div");document.body.appendChild(b);b.innerHTML="<iframe width='0' height='0' scrolling='no' frameborder='0' src='"+a+"'></iframe>"};dwr.engine._sessionCookieName="JSESSIONID";dwr.engine._allowGetForSafariButMakeForgeryEasier="false";dwr.engine._scriptTagProtection=
"throw 'allowScriptTagRemoting is false.';";dwr.engine._defaultPath="/KRA-Portal/dwr";dwr.engine._pollWithXhr="false";dwr.engine._ModePlainCall="/call/plaincall/";dwr.engine._ModePlainPoll="/call/plainpoll/";dwr.engine._ModeHtmlCall="/call/htmlcall/";dwr.engine._ModeHtmlPoll="/call/htmlpoll/";dwr.engine._scriptSessionId=null;dwr.engine._preHook=null;dwr.engine._postHook=null;dwr.engine._batches={};dwr.engine._batchesLength=0;dwr.engine._batchQueue=[];dwr.engine._ordered=!0;dwr.engine._async=
!0;dwr.engine._batch=null;dwr.engine._timeout=0;dwr.engine._activeReverseAjax=!1;dwr.engine._pollReq=null;dwr.engine._pollCometInterval=200;dwr.engine._pollRetries=0;dwr.engine._maxPollRetries=10;dwr.engine._retryIntervals=[2,5,10,60,300];dwr.engine._textHtmlHandler=null;dwr.engine._headers=null;dwr.engine._parameters=null;dwr.engine._nextBatchId=0;dwr.engine._propnames=["async","timeout","errorHandler","warningHandler","textHtmlHandler"];dwr.engine._partialResponseNo=0;dwr.engine._partialResponseYes=
1;dwr.engine._partialResponseFlush=2;dwr.engine._isNotifyServerOnPageUnload=!1;dwr.engine._getHttpSessionId=function(){for(var a=document.cookie.split(";"),b=0;b<a.length;b++){for(var c=a[b];" "==c.charAt(0);)c=c.substring(1,c.length);if(0==c.indexOf(dwr.engine._sessionCookieName+"="))return c.substring(dwr.engine._sessionCookieName.length+1,c.length)}return""};dwr.engine._errorHandler=dwr.engine.defaultErrorHandler;dwr.engine._warningHandler=dwr.engine.defaultWarningHandler;dwr.engine._postSeperator=
"\n";dwr.engine._defaultInterceptor=function(a){return a};dwr.engine._urlRewriteHandler=dwr.engine._defaultInterceptor;dwr.engine._contentRewriteHandler=dwr.engine._defaultInterceptor;dwr.engine._replyRewriteHandler=dwr.engine._defaultInterceptor;dwr.engine._unloader=function(){dwr.engine._debug("calling unloader for: "+dwr.engine._scriptSessionId);dwr.engine.transport.send({map:{callCount:1,"c0-scriptName":"__System","c0-methodName":"pageUnloaded","c0-id":0},paramCount:0,isPoll:!1,async:!0,headers:{},
preHooks:[],postHooks:[],timeout:dwr.engine._timeout,errorHandler:null,warningHandler:null,textHtmlHandler:null,path:dwr.engine._defaultPath,handlers:[{exceptionHandler:null,callback:null}]});dwr.engine.setNotifyServerOnPageUnload(!1)};dwr.engine._execute=function(a,b,c,d){var e=!1;null==dwr.engine._batch&&(dwr.engine.beginBatch(),e=!0);for(var f=[],g=0;g<arguments.length-3;g++)f[g]=arguments[g+3];g=dwr.engine._batch;if(null==g.path)g.path=a;else if(g.path!=a){dwr.engine._handleError(g,{name:"dwr.engine.multipleServlets",
message:"Can't batch requests to multiple DWR Servlets."});return}dwr.engine.batch.addCall(g,b,c,f);g.map.callCount++;e&&dwr.engine.endBatch()};dwr.engine._poll=function(a){dwr.engine._activeReverseAjax&&(a=dwr.engine.batch.createPoll(),dwr.engine.transport.send(a))};dwr.engine._pollErrorHandler=function(a,b){if(dwr.engine._pollRetries>dwr.engine._maxPollRetries)dwr.engine._activeReverseAjax=!1,dwr.engine._debug("Reverse Ajax poll failed (retries="+dwr.engine._pollRetries+"). Giving Up: "+b.name+
" : "+b.message),dwr.engine._debug("Giving up.");else{var c=dwr.engine._pollRetries;c>=dwr.engine._retryIntervals.length&&(c=dwr.engine._retryIntervals.length-1);dwr.engine._debug("Reverse Ajax poll failed (retries="+dwr.engine._pollRetries+"). Trying again in "+dwr.engine._retryIntervals[c]+"s: "+b.name+" : "+b.message);setTimeout("dwr.engine._poll()",1E3*dwr.engine._retryIntervals[c]);dwr.engine._pollRetries++}};dwr.engine._eval=function(a){return null==a?null:""==a?(dwr.engine._debug("Warning: blank script",
!0),null):eval(a)};dwr.engine._callPostHooks=function(a){if(a.postHooks){for(var b=0;b<a.postHooks.length;b++)a.postHooks[b]();a.postHooks=null}};dwr.engine._handleError=function(a,b){"string"==typeof b&&(b={name:"unknown",message:b});null==b.message&&(b.message="");null==b.name&&(b.name="unknown");a&&"function"==typeof a.errorHandler?a.errorHandler(b.message,b):dwr.engine._errorHandler&&dwr.engine._errorHandler(b.message,b);a&&dwr.engine.batch.remove(a)};dwr.engine._handleWarning=function(a,b){"string"==
typeof b&&(b={name:"unknown",message:b});null==b.message&&(b.message="");null==b.name&&(b.name="unknown");a&&"function"==typeof a.warningHandler?a.warningHandler(b.message,b):dwr.engine._warningHandler&&dwr.engine._warningHandler(b.message,b);a&&dwr.engine.batch.remove(a)};dwr.engine._debug=function(a,b){var c=!1;try{window.console?(b&&window.console.trace&&window.console.trace(),window.console.log(a),c=!0):window.Jaxer?Jaxer.Log.info(a):window.opera&&window.opera.postError&&(window.opera.postError(a),
c=!0)}catch(d){}if(!c&&(c=document.getElementById("dwr-debug"))){var e=a+"<br/>"+c.innerHTML;2048<e.length&&(e=e.substring(0,2048));c.innerHTML=e}};dwr.engine.remote={handleCallback:function(a,b,c){var d=dwr.engine._batches[a];if(null==d)dwr.engine._debug("Warning: batch == null in remoteHandleCallback for batchId="+a,!0);else try{var e=d.handlers[b];e?(d.handlers[b]=null,"function"==typeof e.callback&&e.callback.call(e.callbackScope,c,e.callbackArgs)):dwr.engine._debug("Warning: Missing handlers. callId="+
b,!0)}catch(f){dwr.engine._handleError(d,f)}},handleException:function(a,b,c){a=dwr.engine._batches[a];if(null==a)dwr.engine._debug("Warning: null batch in remoteHandleException",!0);else{var d=a.handlers[b];a.handlers[b]=null;null==d?dwr.engine._debug("Warning: null handlers in remoteHandleException",!0):(void 0==c.message&&(c.message=""),"function"==typeof d.exceptionHandler?d.exceptionHandler.call(d.exceptionScope,c.message,c,d.exceptionArgs):"function"==typeof a.errorHandler&&a.errorHandler(c.message,
c))}},handleBatchException:function(a,b){var c=null==dwr.engine._receivedBatch&&null!=b;c&&(dwr.engine._receivedBatch=dwr.engine._batches[b]);void 0==a.message&&(a.message="");dwr.engine._handleError(dwr.engine._receivedBatch,a);c&&(dwr.engine._receivedBatch=null,dwr.engine.batch.remove(dwr.engine._batches[b]))},handleNewScriptSession:function(a){null!=dwr.engine._scriptSessionId&&dwr.engine._debug("Server side script session id timed out. New session automatically created");dwr.engine._scriptSessionId=
a},handleNewWindowName:function(a){dwr.engine._debug("Setting new window name: "+a);null!=window.name&&""!=window.name&&dwr.engine._debug("- Warning: This will override existing name of: "+window.name);window.name=a},handleForeign:function(a,b){var c=window.open(null,a);null!=c?null!=c.dwr?c.dwr.engine._eval(b):dwr.engine._debug("Found window, but DWR did not exist in it"):dwr.engine._debug("Could not find window")},pollCometDisabled:function(a,b){dwr.engine.setActiveReverseAjax(!1);var c=null==dwr.engine._receivedBatch&&
null!=b;c&&(dwr.engine._receivedBatch=dwr.engine._batches[b]);void 0==a.message&&(a.message="");dwr.engine._handleError(dwr.engine._receivedBatch,a);c&&(dwr.engine._receivedBatch=null,dwr.engine.batch.remove(dwr.engine._batches[b]))}};dwr.engine.serialize={domDocument:"Msxml2.DOMDocument.6.0 Msxml2.DOMDocument.5.0 Msxml2.DOMDocument.4.0 Msxml2.DOMDocument.3.0 MSXML2.DOMDocument MSXML.DOMDocument Microsoft.XMLDOM".split(" "),toDom:function(a){var b;if(window.DOMParser){b=(new DOMParser).parseFromString(a,
"text/xml");if(!b.documentElement||"parsererror"==b.documentElement.tagName)throw a=b.documentElement.firstChild.data,a+="\n"+b.documentElement.firstChild.nextSibling.firstChild.data,a;return b}if(window.ActiveXObject)return b=dwr.engine.util.newActiveXObject(dwr.engine.serialize.domDocument),b.loadXML(a),b;b=document.createElement("div");b.innerHTML=a;return b},convert:function(a,b,c,d){if(null==c)a.map[d]="null:null";else switch(typeof c){case "boolean":a.map[d]="boolean:"+c;break;case "number":a.map[d]=
"number:"+c;break;case "string":a.map[d]="string:"+encodeURIComponent(c);break;case "object":var e=dwr.engine.serialize.lookup(b,c,d);e?a.map[d]=e:c instanceof String?a.map[d]="String:"+encodeURIComponent(c):c instanceof Boolean?a.map[d]="Boolean:"+c:c instanceof Number?a.map[d]="Number:"+c:c instanceof Date?a.map[d]="Date:"+c.getTime():c&&c.join?a.map[d]=dwr.engine.serialize.convertArray(a,b,c,d):c&&c.tagName&&"input"==c.tagName.toLowerCase()&&c.type&&"file"==c.type.toLowerCase()?(a.fileUpload=!0,
a.map[d]=c):a.map[d]=c.nodeName&&c.nodeType?dwr.engine.serialize.convertXml(a,b,c,d):dwr.engine.serialize.convertObject(a,b,c,d);break;case "function":break;default:dwr.engine._handleWarning(null,{name:"dwr.engine.unexpectedType",message:"Unexpected type: "+typeof c+", attempting default converter."}),a.map[d]="default:"+c}},convertArray:function(a,b,c,d){d="Array:[";for(var e=0;e<c.length;e++){0!=e&&(d+=",");a.paramCount++;var f="c"+dwr.engine._batch.map.callCount+"-e"+a.paramCount;dwr.engine.serialize.convert(a,
b,c[e],f);d+="reference:";d+=f}return d+"]"},convertObject:function(a,b,c,d){d="Object_"+dwr.engine.serialize.getObjectClassName(c)+":{";for(var e in c)if("function"!=typeof c[e]){a.paramCount++;var f="c"+dwr.engine._batch.map.callCount+"-e"+a.paramCount;dwr.engine.serialize.convert(a,b,c[e],f);d+=encodeURIComponent(e)+":reference:"+f+", "}", "==d.substring(d.length-2)&&(d=d.substring(0,d.length-2));return d+"}"},convertXml:function(a,b,c,d){a=window.XMLSerializer?(new XMLSerializer).serializeToString(c):
c.toXml?c.toXml:c.innerHTML;return"XML:"+encodeURIComponent(a)},lookup:function(a,b,c){for(var d,e=0;e<a.length;e++)if(a[e].data==b){d=a[e];break}if(d)return"reference:"+d.name;a.push({data:b,name:c});return null},errorClasses:{Error:Error,EvalError:EvalError,RangeError:RangeError,ReferenceError:ReferenceError,SyntaxError:SyntaxError,TypeError:TypeError,URIError:URIError},getObjectClassName:function(a){if(a&&a.constructor&&a.constructor.toString){var b=a.constructor.toString();if((b=b.match(/function\s+(\w+)/))&&
2==b.length)return b[1]}if(a&&a.constructor)for(var c in dwr.engine.serialize.errorClasses)if(a.constructor==dwr.engine.serialize.errorClasses[c])return c;return a&&(b=Object.prototype.toString.call(a),(b=b.match(/\[object\s+(\w+)/))&&2==b.length)?b[1]:"Object"}};dwr.engine.transport={send:function(a){dwr.engine.batch.prepareToSend(a);a.transport=a.fileUpload?dwr.engine.transport.iframe:dwr.engine.isCrossDomain?dwr.engine.transport.scriptTag:dwr.engine.transport.xhr;a.transport.send(a)},remove:function(a){dwr.engine.transport.iframe.remove(a);
dwr.engine.transport.xhr.remove(a)},abort:function(a){a&&!a.completed&&(clearInterval(a.interval),dwr.engine.batch.remove(a),a.req&&a.req.abort(),dwr.engine.transport.remove(a),dwr.engine._handleError(a,{name:"dwr.engine.timeout",message:"Timeout"}))},xhr:{httpMethod:"POST",XMLHTTP:"Msxml2.XMLHTTP.6.0 Msxml2.XMLHTTP.5.0 Msxml2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(" "),send:function(a){a.isPoll&&(a.map.partialResponse=dwr.engine._partialResponseYes);a.isPoll&&"true"==
dwr.engine._pollWithXhr&&(a.map.partialResponse=dwr.engine._partialResponseNo);a.isPoll&&dwr.engine.isIE&&(a.map.partialResponse=dwr.engine._partialResponseNo);window.XMLHttpRequest?a.req=new XMLHttpRequest:window.ActiveXObject&&(a.req=dwr.engine.util.newActiveXObject(dwr.engine.transport.xhr.XMLHTTP));a.async&&(a.req.onreadystatechange=function(){"undefined"!=typeof dwr&&dwr.engine.transport.xhr.stateChange(a)});a.isPoll&&(dwr.engine._pollReq=a.req,document.all||(a.req.batch=a));httpMethod=dwr.engine.transport.xhr.httpMethod;
var b=navigator.userAgent.indexOf("Safari/");0<=b&&(b=navigator.userAgent.substring(b+7),400>parseInt(b,10)&&("true"==dwr.engine._allowGetForSafariButMakeForgeryEasier?httpMethod="GET":dwr.engine._handleWarning(a,{name:"dwr.engine.oldSafari",message:"Safari GET support disabled. See getahead.org/dwr/server/servlet and allowGetForSafariButMakeForgeryEasier."})));a.mode=a.isPoll?dwr.engine._ModePlainPoll:dwr.engine._ModePlainCall;b=dwr.engine.batch.constructRequest(a,httpMethod);try{a.req.open(httpMethod,
b.url,a.async);try{for(var c in a.headers){var d=a.headers[c];"string"==typeof d&&a.req.setRequestHeader(c,d)}a.headers["Content-Type"]||a.req.setRequestHeader("Content-Type","text/plain")}catch(e){dwr.engine._handleWarning(a,e)}a.req.send(b.body);a.async||dwr.engine.transport.xhr.stateChange(a)}catch(f){dwr.engine._handleError(a,f)}a.isPoll&&a.map.partialResponse==dwr.engine._partialResponseYes&&dwr.engine.transport.xhr.checkCometPoll()},stateChange:function(a){var b;if(a.completed)dwr.engine._debug("Error: _stateChange() with batch.completed");
else{var c=a.req;try{if(4!=c.readyState)return}catch(d){dwr.engine._handleWarning(a,d);dwr.engine.batch.remove(a);return}try{var e=c.responseText,e=dwr.engine._replyRewriteHandler(e),f=c.status;if(null==e||""==e)dwr.engine._handleWarning(a,{name:"dwr.engine.missingData",message:"No data received from server"});else if(200!=f)dwr.engine._handleError(a,{name:"dwr.engine.http."+f,message:c.statusText});else{var g=c.getResponseHeader("Content-Type");g.match(/^text\/plain/)||g.match(/^text\/javascript/)?
a.isPoll&&a.map.partialResponse==dwr.engine._partialResponseYes?dwr.engine.transport.xhr.processCometResponse(e,a):-1==e.search("//#DWR")?dwr.engine._handleWarning(a,{name:"dwr.engine.invalidReply",message:"Invalid reply from server"}):b=e:g.match(/^text\/html/)&&"function"==typeof a.textHtmlHandler?a.textHtmlHandler({status:f,responseText:e,contentType:g}):dwr.engine._handleWarning(a,{name:"dwr.engine.invalidMimeType",message:"Invalid content type: '"+g+"'"})}}catch(h){dwr.engine._handleWarning(a,
h)}dwr.engine._callPostHooks(a);dwr.engine._receivedBatch=a;null!=b&&(b=b.replace(dwr.engine._scriptTagProtection,""));dwr.engine._eval(b);dwr.engine._receivedBatch=null;dwr.engine.batch.validate(a);dwr.engine.batch.remove(a)}},checkCometPoll:function(){if(dwr.engine._pollReq){var a=dwr.engine._pollReq,b=a.responseText;null!=b&&dwr.engine.transport.xhr.processCometResponse(b,a.batch)}dwr.engine._pollReq&&setTimeout("dwr.engine.transport.xhr.checkCometPoll()",dwr.engine._pollCometInterval)},processCometResponse:function(a,
b){if(b.charsProcessed!=a.length)if(0==a.length)b.charsProcessed=0;else{var c=a.indexOf("//#DWR-START#",b.charsProcessed);if(-1==c)b.charsProcessed=a.length;else{var d=a.lastIndexOf("//#DWR-END#");if(-1!=d){13==a.charCodeAt(d+11)&&10==a.charCodeAt(d+12)?b.charsProcessed=d+13:b.charsProcessed=d+11;c=a.substring(c+13,d);try{dwr.engine._receivedBatch=b,dwr.engine._eval(c),dwr.engine._receivedBatch=null}catch(e){dwr.engine._handleError(b,e)}}}}},remove:function(a){a.req&&(a.req==dwr.engine._pollReq&&
(dwr.engine._pollReq=null),delete a.req)}},iframe:{send:function(a){a.fileUpload&&(a.httpMethod="POST",a.encType="multipart/form-data");var b=dwr.engine.transport.iframe.getId(a);a.div=document.createElement("div");document.body.appendChild(a.div);a.div.innerHTML="<iframe src='javascript:void(0)' frameborder='0' style='width:0px;height:0px;border:0;' id='"+b+"' name='"+b+"' onload='dwr.engine.transport.iframe.loadingComplete("+a.map.batchId+");'></iframe>";a.document=document;dwr.engine.transport.iframe.beginLoader(a,
b)},getId:function(a){return a.isPoll?"dwr-if-poll-"+a.map.batchId:"dwr-if-"+a.map["c0-id"]},beginLoader:function(a,b){a.iframe=a.document.getElementById(b);a.iframe.batch=a;a.mode=a.isPoll?dwr.engine._ModeHtmlPoll:dwr.engine._ModeHtmlCall;a.isPoll&&dwr.engine._outstandingIFrames.push(a.iframe);var c=dwr.engine.batch.constructRequest(a,a.httpMethod);if("GET"==a.httpMethod)a.iframe.setAttribute("src",c.url);else{c="<form id='dwr-form' action='"+c.url+"' target='"+b+"' style='display:none;' method='"+
a.httpMethod+"'";a.encType&&(c+=" enctype='"+a.encType+"'");var c=c+"></form>",d=a.document.createElement("div");d.innerHTML=c;a.form=d.firstChild;for(var e in a.map)c=a.map[e],"function"!=typeof c&&(c.tagName&&"input"==c.tagName.toLowerCase()&&c.type&&"file"==c.type.toLowerCase()?(d=c.cloneNode(!0),c.removeAttribute("id",e),c.setAttribute("name",e),c.parentNode.insertBefore(d,c),c.parentNode.removeChild(c),a.form.appendChild(c)):(d=a.document.createElement("input"),d.setAttribute("type","hidden"),
d.setAttribute("name",e),d.setAttribute("value",c),a.form.appendChild(d)));a.document.body.appendChild(a.form);a.form.submit()}},loadingComplete:function(a){(a=dwr.engine._batches[a])&&dwr.engine.batch.validate(a)},remote:{beginIFrameResponse:function(a,b){null!=a&&(dwr.engine._receivedBatch=a.batch);dwr.engine._callPostHooks(dwr.engine._receivedBatch)},endIFrameResponse:function(a){dwr.engine.batch.remove(dwr.engine._receivedBatch);dwr.engine._receivedBatch=null}},remove:function(a){a.div&&a.div.parentNode.removeChild(a.div);
a.iframe&&a.iframe.parentNode.removeChild(a.iframe);a.form&&a.form.parentNode.removeChild(a.form)}},scriptTag:{send:function(a){a.mode=a.isPoll?dwr.engine._ModePlainPoll:dwr.engine._ModePlainCall;var b=dwr.engine.batch.constructRequest(a,"GET");a.script=document.createElement("script");a.script.id="dwr-st-"+a.map["c0-id"];a.script.src=b.url;document.body.appendChild(a.script)}},htmlfile:{send:function(a){var b=dwr.engine.transport.iframe.getId(a);a.htmlfile=new window.ActiveXObject("htmlfile");a.htmlfile.open();
a.htmlfile.write("<html>");a.htmlfile.write("<div><iframe className='wibble' src='javascript:void(0)' id='"+b+"' name='"+b+"' onload='dwr.engine.transport.iframe.loadingComplete("+a.map.batchId+");'></iframe></div>");a.htmlfile.write("</html>");a.htmlfile.close();a.htmlfile.parentWindow.dwr=dwr;a.document=a.htmlfile;dwr.engine.transport.iframe.beginLoader(a,b)}}};dwr.engine.batch={create:function(){var a={async:dwr.engine._async,charsProcessed:0,handlers:{},isPoll:!1,map:{callCount:0,windowName:window.name},
paramCount:0,preHooks:[],postHooks:[],timeout:dwr.engine._timeout,errorHandler:dwr.engine._errorHandler,warningHandler:dwr.engine._warningHandler,textHtmlHandler:dwr.engine._textHtmlHandler};dwr.engine._preHook&&a.preHooks.push(dwr.engine._preHook);dwr.engine._postHook&&a.postHooks.push(dwr.engine._postHook);dwr.engine.batch.populateHeadersAndParameters(a);return a},createPoll:function(){var a={async:!0,charsProcessed:0,handlers:[{callback:function(a){dwr.engine._pollRetries=0;setTimeout("dwr.engine._poll()",
a)}}],isPoll:!0,map:{windowName:window.name},paramCount:0,path:dwr.engine._defaultPath,preHooks:[],postHooks:[],timeout:0,windowName:window.name,errorHandler:dwr.engine._pollErrorHandler,warningHandler:dwr.engine._pollErrorHandler,textHtmlHandler:dwr.engine._textHtmlHandler};dwr.engine.batch.populateHeadersAndParameters(a);return a},populateHeadersAndParameters:function(a){var b,c;a.headers={};if(dwr.engine._headers)for(b in dwr.engine._headers)c=dwr.engine._headers[b],"function"!=typeof c&&(a.headers[b]=
c);a.parameters={};if(dwr.engine._parameters)for(b in dwr.engine._parameters)c=dwr.engine._parameters[b],"function"!=typeof c&&(a.parameters[b]=c)},addCall:function(a,b,c,d){var e;e=d[d.length-1];e="function"==typeof e||null==e?{callback:d.pop()}:d.pop();dwr.engine.batch.merge(a,e);a.handlers[a.map.callCount]={exceptionHandler:e.exceptionHandler,exceptionArgs:e.exceptionArgs||e.args||null,exceptionScope:e.exceptionScope||e.scope||window,callback:e.callbackHandler||e.callback,callbackArgs:e.callbackArgs||
e.args||null,callbackScope:e.callbackScope||e.scope||window};e="c"+a.map.callCount+"-";a.map[e+"scriptName"]=b;a.map[e+"methodName"]=c;a.map[e+"id"]=a.map.callCount;b=[];for(i=0;i<d.length;i++)dwr.engine.serialize.convert(a,b,d[i],e+"param"+i)},merge:function(a,b){var c,d;for(d=0;d<dwr.engine._propnames.length;d++)c=dwr.engine._propnames[d],null!=b[c]&&(a[c]=b[c]);null!=b.preHook&&a.preHooks.unshift(b.preHook);null!=b.postHook&&a.postHooks.push(b.postHook);if(b.headers)for(c in b.headers)d=b.headers[c],
"function"!=typeof d&&(a.headers[c]=d);if(b.parameters)for(c in b.parameters)d=b.parameters[c],"function"!=typeof d&&(a.map["p-"+c]=""+d)},prepareToSend:function(a){a.map.batchId=dwr.engine._nextBatchId;dwr.engine._nextBatchId++;dwr.engine._batches[a.map.batchId]=a;dwr.engine._batchesLength++;a.completed=!1;a.map.page=window.location.pathname+window.location.search;a.map.httpSessionId=dwr.engine._getHttpSessionId();a.map.scriptSessionId=dwr.engine._scriptSessionId;for(var b=0;b<a.preHooks.length;b++)a.preHooks[b]();
a.preHooks=null;a.timeout&&0!=a.timeout&&(a.interval=setInterval(function(){dwr.engine.transport.abort(a)},a.timeout))},constructRequest:function(a,b){var c=[];c.push(a.path);c.push(a.mode);!0==a.isPoll?c.push("ReverseAjax.dwr"):(1==a.map.callCount?(c.push(a.map["c0-scriptName"]),c.push("."),c.push(a.map["c0-methodName"])):(c.push("Multiple."),c.push(a.map.callCount)),c.push(".dwr"));var d=location.href.match(/jsessionid=([^?]+)/);null!=d&&(c.push(";jsessionid="),c.push(d[1]));var d={},e;if("GET"==
b){a.map.callCount=""+a.map.callCount;c.push("?");for(e in a.map)"function"!=typeof a.map[e]&&(c.push(encodeURIComponent(e)),c.push("="),c.push(encodeURIComponent(a.map[e])),c.push("&"));c.pop();d.body=null}else{var f=[];for(e in a.map)"function"!=typeof a.map[e]&&(f.push(e),f.push("="),f.push(a.map[e]),f.push(dwr.engine._postSeperator));d.body=dwr.engine._contentRewriteHandler(f.join(""))}d.url=dwr.engine._urlRewriteHandler(c.join(""));return d},validate:function(a){if(!a.completed)for(var b=0;b<
a.map.callCount;b++)if(null!=a.handlers[b]){dwr.engine._handleWarning(a,{name:"dwr.engine.incompleteReply",message:"Incomplete reply from server"});break}},remove:function(a){a?"true"==a.completed?dwr.engine._debug("Warning: Double complete",!0):(a.completed=!0,dwr.engine.transport.remove(a),a.map&&(a.map.batchId||0==a.map.batchId)&&(delete dwr.engine._batches[a.map.batchId],dwr.engine._batchesLength--),0!=dwr.engine._batchQueue.length&&(a=dwr.engine._batchQueue.shift(),dwr.engine.transport.send(a))):
dwr.engine._debug("Warning: null batch in dwr.engine.batch.remove()",!0)}};dwr.engine.util={newActiveXObject:function(a){for(var b,c=0;c<a.length;c++)try{b=new ActiveXObject(a[c]);break}catch(d){}return b}};var l=navigator.userAgent,h=navigator.appVersion,k=parseFloat(h);dwr.engine.isOpera=0<=l.indexOf("Opera")?k:0;dwr.engine.isKhtml=0<=h.indexOf("Konqueror")||0<=h.indexOf("Safari")?k:0;dwr.engine.isSafari=0<=h.indexOf("Safari")?k:0;var m=l.indexOf("Gecko");dwr.engine.isMozilla=0<=m&&!dwr.engine.isKhtml?
k:0;dwr.engine.isFF=0;dwr.engine.isIE=0;try{dwr.engine.isMozilla&&(dwr.engine.isFF=parseFloat(l.split("Firefox/")[1].split(" ")[0])),document.all&&!dwr.engine.isOpera&&(dwr.engine.isIE=parseFloat(h.split("MSIE ")[1].split(";")[0]))}catch(n){}dwr.engine._execute(dwr.engine._defaultPath,"__System","pageLoaded",function(){dwr.engine._ordered=!1});dwr.hub={publish:function(a,b){dwr.engine._execute(dwr.engine._defaultPath,"__System","publish",a,b,{})},subscribe:function(a,b,c,d){var e=""+dwr.hub._subscriptionId++;
dwr.hub._subscriptions[e]={callback:b,scope:c,subscriberData:d};dwr.engine._execute(dwr.engine._defaultPath,"__System","subscribe",a,e,{});return e},_remotePublish:function(a,b){var c=dwr.hub._subscriptions[a];c&&c.callback.call(c.scope,b,c.subscriberData)},subscribe:function(a,b,c,d){var e=""+dwr.hub._subscriptionId++;dwr.hub._subscriptions[e]={callback:b,scope:c,subscriberData:d};dwr.engine._execute(dwr.engine._defaultPath,"__System","subscribe",a,e,{});return e},_subscriptionId:0,_subscriptions:{}}})();
