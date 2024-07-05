function ajaxObjRequest() {
	var a = null;
	try {
		if (window.XMLHttpRequest) {
			a = new XMLHttpRequest();
		} else {
			a = new ActiveXObject("Microsoft.XMLHTTP");
		}
	} catch (b) {
		alert("Your Browse does not support Ajax \n Please check Your Browser settings");
	}
	return a;
}
var id;
var pvalue = "";
var divid;
var numpad;
var caps = "off";
var shuffle = "on";
var pwd = "";
var ch = null;
var chkbox = null;
var spR1 = null;
var spR2 = null;
var numR = null;
var sp1;
var sp2;
var num;
function getLeft(b) {
	var a = 0;
	while (b) {
		a += b.offsetLeft;
		b = b.offsetParent;
	}
	return a;
}
function getTop(b) {
	var a = 0;
	while (b) {
		a += b.offsetTop;
		b = b.offsetParent;
	}
	return a;
}
function next(b) {
	var a = Math.ceil(Math.random() * b);
	while (a > b) {
		a = Math.ceil(Math.random() * b);
	}
	return a;
}
function nextInt(a) {
	if ((a & -a) == a) {
		return ((a * next(31)) >> 31);
	} else {
		var c, b;
		do {
			c = next(31);
			b = c % a;
		} while (c - b + (a - 1) < 0);
		return b;
	}
}
function isUnique(c, d, e) {
	var b = true;
	for ( var f = 0; f < d; f++) {
		if (c[f] == e) {
			return false;
		} else {
		}
	}
	return b;
}
function getRandom(e) {
	var b = new Array();
	var c = 0;
	var d;
	while (c < e) {
		d = nextInt(e);
		if (isUnique(b, c, d)) {
			b[c] = d;
			c++;
		}
	}
	return b;
}
function convertToMD5(ar) {
	function ad(e, f) {
		return (e << f) | (e >>> (32 - f));
	}
	function ae(h, f) {
		var j, g, l, e, m;
		l = (h & 2147483648);
		e = (f & 2147483648);
		j = (h & 1073741824);
		g = (f & 1073741824);
		m = (h & 1073741823) + (f & 1073741823);
		if (j & g) {
			return (m ^ 2147483648 ^ l ^ e);
		}
		if (j | g) {
			if (m & 1073741824) {
				return (m ^ 3221225472 ^ l ^ e);
			} else {
				return (m ^ 1073741824 ^ l ^ e);
			}
		} else {
			return (m ^ l ^ e);
		}
	}
	function at(f, g, e) {
		return (f & g) | ((~f) & e);
	}
	function au(f, g, e) {
		return (f & e) | (g & (~e));
	}
	function av(f, g, e) {
		return (f ^ g ^ e);
	}
	function ax(f, g, e) {
		return (g ^ (f | (~e)));
	}
	function ap(h, j, l, m, e, g, f) {
		h = ae(h, ae(ae(at(j, l, m), e), f));
		return ae(ad(h, g), j);
	}
	function aE(h, j, l, m, e, g, f) {
		h = ae(h, ae(ae(au(j, l, m), e), f));
		return ae(ad(h, g), j);
	}
	function ah(h, j, l, m, e, g, f) {
		h = ae(h, ae(ae(av(j, l, m), e), f));
		return ae(ad(h, g), j);
	}
	function aq(h, j, l, m, e, g, f) {
		h = ae(h, ae(ae(ax(j, l, m), e), f));
		return ae(ad(h, g), j);
	}
	function aF(e) {
		var n;
		var f = e.length;
		var g = f + 8;
		var h = (g - (g % 64)) / 64;
		var o = (h + 1) * 16;
		var m = Array(o - 1);
		var l = 0;
		var j = 0;
		while (j < f) {
			n = (j - (j % 4)) / 4;
			l = (j % 4) * 8;
			m[n] = (m[n] | (e.charCodeAt(j) << l));
			j++;
		}
		n = (j - (j % 4)) / 4;
		l = (j % 4) * 8;
		m[n] = m[n] | (128 << l);
		m[o - 2] = f << 3;
		m[o - 1] = f >>> 29;
		return m;
	}
	function aj(j) {
		var e = "", h = "", g, f;
		for (f = 0; f <= 3; f++) {
			g = (j >>> (f * 8)) & 255;
			h = "0" + g.toString(16);
			e = e + h.substr(h.length - 2, 2);
		}
		return e;
	}
	function af(e) {
		e = e.replace(/\r\n/g, "\n");
		var f = "";
		for ( var g = 0; g < e.length; g++) {
			var h = e.charCodeAt(g);
			if (h < 128) {
				f += String.fromCharCode(h);
			} else {
				if ((h > 127) && (h < 2048)) {
					f += String.fromCharCode((h >> 6) | 192);
					f += String.fromCharCode((h & 63) | 128);
				} else {
					f += String.fromCharCode((h >> 12) | 224);
					f += String.fromCharCode(((h >> 6) & 63) | 128);
					f += String.fromCharCode((h & 63) | 128);
				}
			}
		}
		return f;
	}
	var ai = Array();
	var I, aC, ag, ao, aD, a, b, c, d;
	var F = 7, H = 12, ab = 17, ac = 22;
	var ak = 5, al = 9, am = 14, an = 20;
	var aw = 4, ay = 11, az = 16, aA = 23;
	var k = 6, x = 10, G = 15, aa = 21;
	ar = af(ar);
	ai = aF(ar);
	a = 1732584193;
	b = 4023233417;
	c = 2562383102;
	d = 271733878;
	for (I = 0; I < ai.length; I += 16) {
		aC = a;
		ag = b;
		ao = c;
		aD = d;
		a = ap(a, b, c, d, ai[I + 0], F, 3614090360);
		d = ap(d, a, b, c, ai[I + 1], H, 3905402710);
		c = ap(c, d, a, b, ai[I + 2], ab, 606105819);
		b = ap(b, c, d, a, ai[I + 3], ac, 3250441966);
		a = ap(a, b, c, d, ai[I + 4], F, 4118548399);
		d = ap(d, a, b, c, ai[I + 5], H, 1200080426);
		c = ap(c, d, a, b, ai[I + 6], ab, 2821735955);
		b = ap(b, c, d, a, ai[I + 7], ac, 4249261313);
		a = ap(a, b, c, d, ai[I + 8], F, 1770035416);
		d = ap(d, a, b, c, ai[I + 9], H, 2336552879);
		c = ap(c, d, a, b, ai[I + 10], ab, 4294925233);
		b = ap(b, c, d, a, ai[I + 11], ac, 2304563134);
		a = ap(a, b, c, d, ai[I + 12], F, 1804603682);
		d = ap(d, a, b, c, ai[I + 13], H, 4254626195);
		c = ap(c, d, a, b, ai[I + 14], ab, 2792965006);
		b = ap(b, c, d, a, ai[I + 15], ac, 1236535329);
		a = aE(a, b, c, d, ai[I + 1], ak, 4129170786);
		d = aE(d, a, b, c, ai[I + 6], al, 3225465664);
		c = aE(c, d, a, b, ai[I + 11], am, 643717713);
		b = aE(b, c, d, a, ai[I + 0], an, 3921069994);
		a = aE(a, b, c, d, ai[I + 5], ak, 3593408605);
		d = aE(d, a, b, c, ai[I + 10], al, 38016083);
		c = aE(c, d, a, b, ai[I + 15], am, 3634488961);
		b = aE(b, c, d, a, ai[I + 4], an, 3889429448);
		a = aE(a, b, c, d, ai[I + 9], ak, 568446438);
		d = aE(d, a, b, c, ai[I + 14], al, 3275163606);
		c = aE(c, d, a, b, ai[I + 3], am, 4107603335);
		b = aE(b, c, d, a, ai[I + 8], an, 1163531501);
		a = aE(a, b, c, d, ai[I + 13], ak, 2850285829);
		d = aE(d, a, b, c, ai[I + 2], al, 4243563512);
		c = aE(c, d, a, b, ai[I + 7], am, 1735328473);
		b = aE(b, c, d, a, ai[I + 12], an, 2368359562);
		a = ah(a, b, c, d, ai[I + 5], aw, 4294588738);
		d = ah(d, a, b, c, ai[I + 8], ay, 2272392833);
		c = ah(c, d, a, b, ai[I + 11], az, 1839030562);
		b = ah(b, c, d, a, ai[I + 14], aA, 4259657740);
		a = ah(a, b, c, d, ai[I + 1], aw, 2763975236);
		d = ah(d, a, b, c, ai[I + 4], ay, 1272893353);
		c = ah(c, d, a, b, ai[I + 7], az, 4139469664);
		b = ah(b, c, d, a, ai[I + 10], aA, 3200236656);
		a = ah(a, b, c, d, ai[I + 13], aw, 681279174);
		d = ah(d, a, b, c, ai[I + 0], ay, 3936430074);
		c = ah(c, d, a, b, ai[I + 3], az, 3572445317);
		b = ah(b, c, d, a, ai[I + 6], aA, 76029189);
		a = ah(a, b, c, d, ai[I + 9], aw, 3654602809);
		d = ah(d, a, b, c, ai[I + 12], ay, 3873151461);
		c = ah(c, d, a, b, ai[I + 15], az, 530742520);
		b = ah(b, c, d, a, ai[I + 2], aA, 3299628645);
		a = aq(a, b, c, d, ai[I + 0], k, 4096336452);
		d = aq(d, a, b, c, ai[I + 7], x, 1126891415);
		c = aq(c, d, a, b, ai[I + 14], G, 2878612391);
		b = aq(b, c, d, a, ai[I + 5], aa, 4237533241);
		a = aq(a, b, c, d, ai[I + 12], k, 1700485571);
		d = aq(d, a, b, c, ai[I + 3], x, 2399980690);
		c = aq(c, d, a, b, ai[I + 10], G, 4293915773);
		b = aq(b, c, d, a, ai[I + 1], aa, 2240044497);
		a = aq(a, b, c, d, ai[I + 8], k, 1873313359);
		d = aq(d, a, b, c, ai[I + 15], x, 4264355552);
		c = aq(c, d, a, b, ai[I + 6], G, 2734768916);
		b = aq(b, c, d, a, ai[I + 13], aa, 1309151649);
		a = aq(a, b, c, d, ai[I + 4], k, 4149444226);
		d = aq(d, a, b, c, ai[I + 11], x, 3174756917);
		c = aq(c, d, a, b, ai[I + 2], G, 718787259);
		b = aq(b, c, d, a, ai[I + 9], aa, 3951481745);
		a = ae(a, aC);
		b = ae(b, ag);
		c = ae(c, ao);
		d = ae(d, aD);
	}
	var aB = aj(a) + aj(b) + aj(c) + aj(d);
	return aB.toLowerCase();
}
if (typeof dd_domreadycheck == "undefined") {
	var dd_domreadycheck = false;
}
var ddlevelsmenu = {
	enableshim : false,
	arrowpointers : {
		downarrow : [ "", 0, 0 ],
		rightarrow : [ "./themes/images/menu/arrow-right.gif", 12, 12 ],
		showarrow : {
			toplevel : true,
			sublevel : true
		}
	},
	hideinterval : 200,
	effects : {
		enableswipe : true,
		enablefade : true,
		duration : 200
	},
	httpsiframesrc : "",
	topmenuids : [],
	topitems : {},
	subuls : {},
	lastactivesubul : {},
	topitemsindex : -1,
	ulindex : -1,
	hidetimers : {},
	shimadded : false,
	nonFF : !/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent),
	getoffset : function(c, d) {
		return (c.offsetParent) ? c[d] + this.getoffset(c.offsetParent, d)
				: c[d];
	},
	getoffsetof : function(b) {
		b._offsets = {
			left : this.getoffset(b, "offsetLeft"),
			top : this.getoffset(b, "offsetTop")
		};
	},
	getwindowsize : function() {
		this.docwidth = window.innerWidth ? window.innerWidth - 10
				: this.standardbody.clientWidth - 10;
		this.docheight = window.innerHeight ? window.innerHeight - 15
				: this.standardbody.clientHeight - 18;
	},
	gettopitemsdimensions : function() {
		for ( var j = 0; j < this.topmenuids.length; j++) {
			var f = this.topmenuids[j];
			for ( var h = 0; h < this.topitems[f].length; h++) {
				var k = this.topitems[f][h];
				var g = document.getElementById(k.getAttribute("rel"));
				k._dimensions = {
					w : k.offsetWidth,
					h : k.offsetHeight,
					submenuw : g.offsetWidth,
					submenuh : g.offsetHeight
				};
			}
		}
	},
	isContained : function(c, f) {
		var f = window.event || f;
		var e = f.relatedTarget
				|| ((f.type == "mouseover") ? f.fromElement : f.toElement);
		while (e && e != c) {
			try {
				e = e.parentNode;
			} catch (f) {
				e = c;
			}
		}
		if (e == c) {
			return true;
		} else {
			return false;
		}
	},
	addpointer : function(g, l, k, h) {
		var m = document.createElement("img");
		if (k[0] != null && k[0] != "") {
			m.src = k[0];
		}
		m.style.width = k[1] + "px";
		m.style.height = k[2] + "px";
		if (l == "rightarrowpointer") {
			m.style.left = g.offsetWidth - k[2] - 2 + "px";
		}
		m.className = l;
		var j = g.childNodes[g.firstChild.nodeType != 1 ? 1 : 0];
		if (j && j.tagName == "SPAN") {
			g = j;
		}
		if (h == "before") {
			g.insertBefore(m, g.firstChild);
		} else {
			g.appendChild(m);
		}
	},
	css : function(g, h, f) {
		var e = new RegExp("(^|\\s+)" + h + "($|\\s+)", "ig");
		if (f == "check") {
			return e.test(g.className);
		} else {
			if (f == "remove") {
				g.className = g.className.replace(e, "");
			} else {
				if (f == "add" && !e.test(g.className)) {
					g.className += " " + h;
				}
			}
		}
	},
	addshimmy : function(f) {
		var e = (!window.opera) ? document.createElement("iframe") : document
				.createElement("div");
		e.className = "ddiframeshim";
		e.setAttribute("src",
				location.protocol == "https:" ? this.httpsiframesrc : "");
		e.setAttribute("frameborder", "0");
		f.appendChild(e);
		try {
			e.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
		} catch (d) {
		}
		return e;
	},
	positionshim : function(n, k, m, o, h) {
		if (n._istoplevel) {
			var h = window.pageYOffset ? window.pageYOffset
					: this.standardbody.scrollTop;
			var j = n._offsets.top - h;
			var l = h + this.docheight - n._offsets.top - n._dimensions.h;
			if (j > 0) {
				this.shimmy.topshim.style.left = o + "px";
				this.shimmy.topshim.style.top = h + "px";
				this.shimmy.topshim.style.width = "99%";
				this.shimmy.topshim.style.height = j + "px";
			}
			if (l > 0) {
				this.shimmy.bottomshim.style.left = o + "px";
				this.shimmy.bottomshim.style.top = n._offsets.top
						+ n._dimensions.h + "px";
				this.shimmy.bottomshim.style.width = "99%";
				this.shimmy.bottomshim.style.height = l + "px";
			}
		}
	},
	hideshim : function() {
		this.shimmy.topshim.style.width = this.shimmy.bottomshim.style.width = 0;
		this.shimmy.topshim.style.height = this.shimmy.bottomshim.style.height = 0;
	},
	buildmenu : function(g, l, h, m, k, j) {
		l._master = g;
		l._pos = m;
		l._istoplevel = k;
		if (k) {
			this
					.addEvent(
							l,
							function(a) {
								ddlevelsmenu
										.hidemenu(ddlevelsmenu.subuls[this._master][parseInt(this._pos)]);
							}, "click");
		}
		this.subuls[g][m] = h;
		l._dimensions = {
			w : l.offsetWidth,
			h : l.offsetHeight,
			submenuw : h.offsetWidth,
			submenuh : h.offsetHeight
		};
		this.getoffsetof(l);
		h.style.left = 0;
		h.style.top = 0;
		h.style.visibility = "hidden";
		this
				.addEvent(
						l,
						function(p) {
							if (!ddlevelsmenu.isContained(this, p)) {
								var d = ddlevelsmenu.subuls[this._master][parseInt(this._pos)];
								if (this._istoplevel) {
									ddlevelsmenu.css(this, "selected", "add");
									clearTimeout(ddlevelsmenu.hidetimers[this._master][this._pos]);
								}
								ddlevelsmenu.getoffsetof(l);
								var f = window.pageXOffset ? window.pageXOffset
										: ddlevelsmenu.standardbody.scrollLeft;
								var b = window.pageYOffset ? window.pageYOffset
										: ddlevelsmenu.standardbody.scrollTop;
								var c = this._offsets.left
										+ this._dimensions.submenuw
										+ (this._istoplevel && j == "topbar" ? 0
												: this._dimensions.w);
								var a = this._offsets.top
										+ this._dimensions.submenuh;
								var e = (this._istoplevel ? this._offsets.left
										+ (j == "sidebar" ? this._dimensions.w
												: 0) : this._dimensions.w);
								if (c - f > ddlevelsmenu.docwidth) {
									e += -this._dimensions.submenuw
											+ (this._istoplevel
													&& j == "topbar" ? this._dimensions.w
													: -this._dimensions.w);
								}
								d.style.left = e + "px";
								var o = (this._istoplevel ? this._offsets.top
										+ (j == "sidebar" ? 0
												: this._dimensions.h)
										: this.offsetTop);
								if (a - b > ddlevelsmenu.docheight) {
									if (this._dimensions.submenuh < this._offsets.top
											+ (j == "sidebar" ? this._dimensions.h
													: 0) - b) {
										o += -this._dimensions.submenuh
												+ (this._istoplevel
														&& j == "topbar" ? -this._dimensions.h
														: this._dimensions.h);
									} else {
										o += -(this._offsets.top - b)
												+ (this._istoplevel
														&& j == "topbar" ? -this._dimensions.h
														: 0);
									}
								}
								d.style.top = o + "px";
								if (ddlevelsmenu.enableshim
										&& (ddlevelsmenu.effects.enableswipe == false || ddlevelsmenu.nonFF)) {
									ddlevelsmenu.positionshim(l, d, j, f, b);
								} else {
									d.FFscrollInfo = {
										x : f,
										y : b
									};
								}
								ddlevelsmenu.showmenu(l, d, j);
							}
						}, "mouseover");
		this.addEvent(l, function(a) {
			var b = ddlevelsmenu.subuls[this._master][parseInt(this._pos)];
			if (this._istoplevel) {
				if (!ddlevelsmenu.isContained(this, a)
						&& !ddlevelsmenu.isContained(b, a)) {
					ddlevelsmenu.hidemenu(b);
				}
			} else {
				if (!this._istoplevel && !ddlevelsmenu.isContained(this, a)) {
					ddlevelsmenu.hidemenu(b);
				}
			}
		}, "mouseout");
	},
	setopacity : function(d, c) {
		d.style.opacity = c;
		if (typeof d.style.opacity != "string") {
			d.style.MozOpacity = c;
			if (d.filters) {
				d.style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity="
						+ c * 100 + ")";
			}
		}
	},
	showmenu : function(e, g, h) {
		if (this.effects.enableswipe || this.effects.enablefade) {
			if (this.effects.enableswipe) {
				var f = (e._istoplevel && h == "topbar") ? e._dimensions.submenuh
						: e._dimensions.submenuw;
				g.style.width = g.style.height = 0;
				g.style.overflow = "hidden";
			}
			if (this.effects.enablefade) {
				this.setopacity(g, 0);
			}
			g._curanimatedegree = 0;
			g.style.visibility = "visible";
			clearInterval(g._animatetimer);
			g._starttime = new Date().getTime();
			g._animatetimer = setInterval( function() {
				ddlevelsmenu.revealmenu(e, g, f, h);
			}, 10);
		} else {
			g.style.visibility = "visible";
		}
	},
	revealmenu : function(k, g, f, h) {
		var j = new Date().getTime() - g._starttime;
		if (j < this.effects.duration) {
			if (this.effects.enableswipe) {
				if (g._curanimatedegree == 0) {
					g.style[k._istoplevel && h == "topbar" ? "width" : "height"] = "auto";
				}
				g.style[k._istoplevel && h == "topbar" ? "height" : "width"] = (g._curanimatedegree * f)
						+ "px";
			}
			if (this.effects.enablefade) {
				this.setopacity(g, g._curanimatedegree);
			}
		} else {
			clearInterval(g._animatetimer);
			if (this.effects.enableswipe) {
				g.style.width = "auto";
				g.style.height = "auto";
				g.style.overflow = "visible";
			}
			if (this.effects.enablefade) {
				this.setopacity(g, 1);
				g.style.filter = "";
			}
			if (this.enableshim && g.FFscrollInfo) {
				this.positionshim(k, g, h, g.FFscrollInfo.x, g.FFscrollInfo.y);
			}
		}
		g._curanimatedegree = (1 - Math.cos((j / this.effects.duration)
				* Math.PI)) / 2;
	},
	hidemenu : function(b) {
		if (typeof b._pos != "undefined") {
			this.css(this.topitems[b._master][parseInt(b._pos)], "selected",
					"remove");
			if (this.enableshim) {
				this.hideshim();
			}
		}
		clearInterval(b._animatetimer);
		b.style.left = 0;
		b.style.top = "-1000px";
		b.style.visibility = "hidden";
	},
	addEvent : function(f, e, d) {
		if (f.addEventListener) {
			f.addEventListener(d, e, false);
		} else {
			if (f.attachEvent) {
				f.attachEvent("on" + d, function() {
					return e.call(f, window.event);
				});
			}
		}
	},
	domready : function(b) {
		if (dd_domreadycheck) {
			b();
			return;
		}
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", function() {
				document.removeEventListener("DOMContentLoaded",
						arguments.callee, false);
				b();
				dd_domreadycheck = true;
			}, false);
		} else {
			if (document.attachEvent) {
				if (document.documentElement.doScroll && window == window.top) {
					( function() {
						if (dd_domreadycheck) {
							b();
							return;
						}
						try {
							document.documentElement.doScroll("left");
						} catch (a) {
							setTimeout(arguments.callee, 0);
							return;
						}
						b();
						dd_domreadycheck = true;
					})();
				}
			}
		}
		if (document.attachEvent && parent.length > 0) {
			this.addEvent(window, function() {
				b();
			}, "load");
		}
	},
	init : function(r, p) {
		this.standardbody = (document.compatMode == "CSS1Compat") ? document.documentElement
				: document.body;
		this.topitemsindex = -1;
		this.ulindex = -1;
		this.topmenuids.push(r);
		this.topitems[r] = [];
		this.subuls[r] = [];
		this.hidetimers[r] = [];
		if (this.enableshim && !this.shimadded) {
			this.shimmy = {};
			this.shimmy.topshim = this.addshimmy(document.body);
			this.shimmy.bottomshim = this.addshimmy(document.body);
			this.shimadded = true;
		}
		var x = document.getElementById(r);
		var q = x.getElementsByTagName("a");
		this.getwindowsize();
		for ( var c = 0; c < q.length; c++) {
			if (q[c].getAttribute("rel")) {
				this.topitemsindex++;
				this.ulindex++;
				var v = q[c];
				this.topitems[r][this.topitemsindex] = v;
				var u = document.getElementById(v.getAttribute("rel"));
				document.body.appendChild(u);
				u.style.zIndex = 999999;
				u._master = r;
				u._pos = this.topitemsindex;
				this.addEvent(u, function() {
					ddlevelsmenu.hidemenu(this);
				}, "click");
				var t = (p == "sidebar") ? "rightarrowpointer"
						: "downarrowpointer";
				var y = (p == "sidebar") ? this.arrowpointers.rightarrow
						: this.arrowpointers.downarrow;
				if (this.arrowpointers.showarrow.toplevel) {
					this.addpointer(v, t, y, (p == "sidebar") ? "before"
							: "after");
				}
				this.buildmenu(r, v, u, this.ulindex, true, p);
				u.onmouseover = function() {
					clearTimeout(ddlevelsmenu.hidetimers[this._master][this._pos]);
				};
				this
						.addEvent(
								u,
								function(a) {
									if (!ddlevelsmenu.isContained(this, a)
											&& !ddlevelsmenu
													.isContained(
															ddlevelsmenu.topitems[this._master][parseInt(this._pos)],
															a)) {
										var b = this;
										if (ddlevelsmenu.enableshim) {
											ddlevelsmenu.hideshim();
										}
										ddlevelsmenu.hidetimers[this._master][this._pos] = setTimeout(
												function() {
													ddlevelsmenu.hidemenu(b);
												}, ddlevelsmenu.hideinterval);
									}
								}, "mouseout");
				var o = u.getElementsByTagName("ul");
				for ( var w = 0; w < o.length; w++) {
					this.ulindex++;
					var s = o[w].parentNode;
					if (this.arrowpointers.showarrow.sublevel) {
						this.addpointer(s.getElementsByTagName("a")[0],
								"rightarrowpointer",
								this.arrowpointers.rightarrow, "before");
					}
					this.buildmenu(r, s, o[w], this.ulindex, false, p);
				}
			}
		}
		this.addEvent(window, function() {
			ddlevelsmenu.getwindowsize();
			ddlevelsmenu.gettopitemsdimensions();
		}, "resize");
	},
	setup : function(c, d) {
		this.domready( function() {
			ddlevelsmenu.init(c, d);
		});
	}
};
document.oncontextmenu = function() {
	window.status = "Right-click is disabled";
	alert("Right-click is disabled");
	return false;
};
if (document.addEventListener) {
	document.addEventListener("keydown", my_onkeydown_handler, true);
} else {
	if (document.attachEvent) {
		document.attachEvent("onkeydown", my_onkeydown_handler);
	} else {
		document.onkeydown = my_onkeydown_handler;
	}
}
function my_onkeydown_handler() {
	var a = true;
	var b = window.event || arguments[0];
	switch (b.keyCode || b.which) {
	case 116:
		window.status = "F5 is disabled.";
		window.setTimeout("window.status='';", 2000);
		//commented by Prakash to prevent multiple alerts in OTP screen (ENH-2) 
		//alert("F5 is disabled.");
		a = false;
		if (b.preventDefault) {
			b.preventDefault();
		}
		if (document.all && window.event && !b.preventDefault) {
			event.cancelBubble = true;
			b.returnValue = false;
			b.keyCode = 0;
		}
		break;
	}
	if (!a) {
		return false;
	}
}
function supressEnterKeySubmit() {
	var f = document.getElementsByTagName("INPUT");
	if (f != null) {
		for ( var e = 0; e < f.length; e++) {
			var d = f[e];
			if (d.type == "text" || d.type == "textarea") {
				if (window.attachEvent) {
					d.onkeydown = function(a) {
						var b;
						if (a && a.which) {
							a = a;
							b = a.which;
						} else {
							a = event;
							b = a.keyCode;
						}
						if (b == 13) {
							return false;
						}
					};
				} else {
					if (window.addEventListener) {
						d.onkeydown = function(a) {
							var b;
							if (a && a.which) {
								a = a;
								b = a.which;
							} else {
								a = event;
								b = a.keyCode;
							}
							if (b == 13) {
								return false;
							}
						};
					}
				}
			}
		}
	}
}

/*Show Tooltip on Every Combobox : By Jignesh(357266) Start*/
function showComboToolTip(){
	var selObjects = document.getElementsByTagName('select');
	for(cntObj = 0; cntObj < selObjects.length; cntObj++){
		selObjects[cntObj].title = selObjects[cntObj].options[selObjects[cntObj].selectedIndex].text;
	}
}
function setComboToolTip(){
	var selObjects = document.getElementsByTagName('select');
	for(cntObj = 0; cntObj < selObjects.length; cntObj++){
		selObjects[cntObj].onmousemove = showComboToolTip;
		for(var count=0; count < selObjects[cntObj].options.length; count++){
			selObjects[cntObj].options[count].title = selObjects[cntObj].options[count].text;
		}
	}
}
/*Show Tooltip on Every Combobox : By Jignesh(357266) : End*/

/*For Progress Bar....*/
function showProgressbar()
{
	var message = "";
	var message = "Please wait...";

	disableBackground();
	var statusBar =	document.getElementById('statusbar');
	var statusbarwidth = 360;
	var statusbarheight = 100;
    	statusBar.style.visibility = 'visible';
    	document.getElementById('statuBarTd1').innerHTML = message;
    	statusBar.focus();

	statusBar.style.left = ((document.body.offsetWidth - statusbarwidth)/2)+'px';
	var st = document.documentElement.scrollTop;
	var sh = document.documentElement.scrollHeight;
	var ch = document.documentElement.clientHeight;
	statusBar.style.top = (400 + ((ch - statusbarheight)/2))+'px';
}
function showProgressbar1()
{
	var message = "";
	var message = "Please wait...";


	var statusBar =	document.getElementById('statusbar');
	var statusbarwidth = 360;
	var statusbarheight = 100;
    	statusBar.style.visibility = 'visible';
    	document.getElementById('statuBarTd1').innerHTML = message;
    	statusBar.focus();
    	statusBar.style.left = ((document.body.offsetWidth - statusbarwidth)/2)+'px';
    	var st = document.documentElement.scrollTop;
    	var sh = document.documentElement.scrollHeight;
    	var ch = document.documentElement.clientHeight;
    	statusBar.style.top = (400 + ((ch - statusbarheight)/2))+'px';
	disableBackground1();
}
function hideProgressbar()
{
    if(document.getElementById('statusbar')!= null)
    {
		document.getElementById('statusbar').style.visibility='hidden';
		enableBackground();
	 }
}
function hideProgressbar1()
{
    if(document.getElementById('statusbar')!= null)
    {
		document.getElementById('statusbar').style.visibility='hidden';
		enableBackground1();
	 }
}
function enableBackground()
{
	if (this.removeEventListener)
    {
		this.removeEventListener("scroll", changePosition, false);
    }
    else if (this.detachEvent)
    {
    	this.detachEvent("onscroll", changePosition);
    }
	//hide the fadeBackground	
	document.getElementById('fadeBackground').style.display='none';
	//document.getElementById('fadeBackground1').style.display='none';
}
function enableBackground1()
{
	if (this.removeEventListener)
    {
		this.removeEventListener("scroll", changePosition, false);
    }
    else if (this.detachEvent)
    {
    	this.detachEvent("onscroll", changePosition);
    }
	//hide the fadeBackground	
	document.getElementById('fadeBackground').style.display='none';
	if(document.getElementById('fadeBackground1') !=null)
		{document.getElementById('fadeBackground1').style.display='none';}
}

function disableBackground()
{
	//display the fadeBackground
        document.getElementById('fadeBackground').style.display='block';
    //    document.getElementById('fadeBackground1').style.display='block';
    	if(window.mlrunShim == true){
			var st = document.documentElement.scrollTop;
			var sh = document.documentElement.scrollHeight;
			var ch = document.documentElement.clientHeight;
			document.getElementById('fadeBackground').style.height = Math.max(st + ch, sh);
		}
		else{
			var st = document.documentElement.scrollTop;
			var sh = document.documentElement.scrollHeight;
			var ch = document.documentElement.clientHeight;
			document.getElementById('fadeBackground').style.height = Math.max(st + ch, sh);
	        //changePosition();
		}
    	
	
		if(this.addEventListener){
			this.addEventListener("scroll", changePosition, false);
	    }
	    else if (this.attachEvent){
	    	this.detachEvent("onscroll", changePosition);
	    	this.attachEvent("onscroll", changePosition);
	    }
}
function disableBackground1()
{
	//display the fadeBackground
        document.getElementById('fadeBackground').style.display='block';
        document.getElementById('fadeBackground1').style.display='block';
    	if(window.mlrunShim == true){
			var st = document.documentElement.scrollTop;
			var sh = document.documentElement.scrollHeight;
			var ch = document.documentElement.clientHeight;
			document.getElementById('fadeBackground').style.height = Math.max(st + ch, sh);
		}
		else{
			var st = document.documentElement.scrollTop;
			var sh = document.documentElement.scrollHeight;
			var ch = document.documentElement.clientHeight;
			document.getElementById('fadeBackground').style.height = Math.max(st + ch, sh);
	        //changePosition();
		}
    	
	
		if(this.addEventListener){
			this.addEventListener("scroll", changePosition, false);
	    }
	    else if (this.attachEvent){
	    	this.detachEvent("onscroll", changePosition);
	    	this.attachEvent("onscroll", changePosition);
	    }
}
function changePosition()
{
	var statusBar =	document.getElementById('statusbar');
	var statusbarheight = 100;
	var screenheight = screen.height;
	var screenwidth = screen.width;
	//alert('screenheight = '+screenheight+', screenwidth = '+screenwidth);
	
	var sl = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
	//alert('sl='+sl);
	sl =  sl ? sl : 0;
	if(screenwidth > sl)
	{
		document.getElementById('fadeBackground').style.left = sl + 'px';
	}

	var st = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
	st =  st ? st : 0;

	if(screenheight > st)
	{
		document.getElementById('fadeBackground').style.top = st + 'px';
	}

	var ch = document.documentElement.clientHeight;
	//alert('in changePosition : '+(st + ((ch - statusbarheight)/2))+'px');
	statusBar.style.top = (st + ((ch - statusbarheight)/2))+'px';
	//statusBar.style.top = '640px';
}
/* Ended Progress Bar : JS*/

/*Progress Bar : Ajax Call : Start...*/
function crtDynamicDiv(){
	dv = document.getElementById('blankImage');
	if(!dv)
	{
		dv = document.createElement('div'); 
		dv.setAttribute('id',"blankImage");    
		dv.className="forBlankImageToBlur";
		dv.innerHTML='&nbsp;';
		document.forms[0].appendChild(dv);
	}

	dv = null;
	dv = document.getElementById('rotaterImage');
	if(!dv)
	{
		dv = document.createElement('div'); 
		dv.setAttribute('id',"rotaterImage");    
		dv.className="forAjaxImage";
		dv.innerHTML='&nbsp;';
		document.forms[0].appendChild(dv);
	}
}

function _showDynamicDiv()
{
	crtDynamicDiv();
	var div = document.getElementById('blankImage');
	if(div)
		div.style.display = 'block';
	
	div = document.getElementById('rotaterImage');
	if(div)
		div.style.display = 'block';
}

function _hideDynamicDiv()
{
	var div = document.getElementById('blankImage');
	if(div)
		div.style.display = 'none';
	
	div = null;
	div = document.getElementById('rotaterImage');
	if(div)
		div.style.display = 'none';
}
/*Progress Bar : Ajax Call : Start...*/