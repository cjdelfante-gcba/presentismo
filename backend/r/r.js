/*
*   Autor: Reiatsu Digital;
*   Lang prog: Js;
*   Proyecto: Reiatsu api| Reiatsu;
*/

/* _________________________________________________________________________________________________________
   ___________________________    FUNCIONES GENERALES    ___________________________________________________
   _________________________________________________________________________________________________________ */

url_ajax    = 'php/funciones.php';
metodo_ajax = 'POST';

var $r      = function(){};
if("document"in self){if(!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))){(function(t){"use strict";if(!("Element"in t))return;var e="classList",i="prototype",n=t.Element[i],s=Object,r=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[i].indexOf||function(t){var e=0,i=this.length;for(;e<i;e++){if(e in this&&this[e]===t){return e}}return-1},o=function(t,e){this.name=t;this.code=DOMException[t];this.message=e},l=function(t,e){if(e===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(e)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")}return a.call(t,e)},c=function(t){var e=r.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],n=0,s=i.length;for(;n<s;n++){this.push(i[n])}this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=c[i]=[],f=function(){return new c(this)};o[i]=Error[i];u.item=function(t){return this[t]||null};u.contains=function(t){t+="";return l(this,t)!==-1};u.add=function(){var t=arguments,e=0,i=t.length,n,s=false;do{n=t[e]+"";if(l(this,n)===-1){this.push(n);s=true}}while(++e<i);if(s){this._updateClassName()}};u.remove=function(){var t=arguments,e=0,i=t.length,n,s=false,r;do{n=t[e]+"";r=l(this,n);while(r!==-1){this.splice(r,1);s=true;r=l(this,n)}}while(++e<i);if(s){this._updateClassName()}};u.toggle=function(t,e){t+="";var i=this.contains(t),n=i?e!==true&&"remove":e!==false&&"add";if(n){this[n](t)}if(e===true||e===false){return e}else{return!i}};u.toString=function(){return this.join(" ")};if(s.defineProperty){var h={get:f,enumerable:true,configurable:true};try{s.defineProperty(n,e,h)}catch(d){if(d.number===-2146823252){h.enumerable=false;s.defineProperty(n,e,h)}}}else if(s[i].__defineGetter__){n.__defineGetter__(e,f)}})(self)}else{(function(){"use strict";var t=document.createElement("_");t.classList.add("c1","c2");if(!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,n=arguments.length;for(i=0;i<n;i++){t=arguments[i];e.call(this,t)}}};e("add");e("remove")}t.classList.toggle("c3",false);if(t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){if(1 in arguments&&!this.contains(t)===!e){return e}else{return i.call(this,t)}}}t=null})()}}
Element.prototype.remove   = function() {this.parentElement.removeChild(this); }
NodeList.prototype.remove  = HTMLCollection.prototype.remove = function() {for(var i = this.length - 1; i >= 0; i--) {if(this[i] && this[i].parentElement) {this[i].parentElement.removeChild(this[i]); } } } 
!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";n(1),window.Origami={fastclick:n(2),"o-autoinit":n(4)}},function(t,e){t.exports={name:"__MAIN__",dependencies:{fastclick:"fastclick#*","o-autoinit":"o-autoinit#^1.0.0"}}},function(t,e,n){t.exports=n(3)},function(t,e){"use strict";var n=!1;!function(){function e(t,n){function o(t,e){return function(){return t.apply(e,arguments)}}var r;if(n=n||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=n.touchBoundary||10,this.layer=t,this.tapDelay=n.tapDelay||200,this.tapTimeout=n.tapTimeout||700,!e.notNeeded(t)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;s<u;s++)c[a[s]]=o(c[a[s]],c);i&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,o):i.call(t,e,n,o)},t.addEventListener=function(e,n,o){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(t,e,n,o)}),"function"==typeof t.onclick&&(r=t.onclick,t.addEventListener("click",function(t){r(t)},!1),t.onclick=null)}}var o=navigator.userAgent.indexOf("Windows Phone")>=0,i=navigator.userAgent.indexOf("Android")>0&&!o,r=/iP(ad|hone|od)/.test(navigator.userAgent)&&!o,a=r&&/OS 4_\d(_\d)?/.test(navigator.userAgent),c=r&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(r&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},e.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!i;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},e.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},e.prototype.determineEventType=function(t){return i&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(t){var e;r&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},e.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},e.prototype.onTouchStart=function(t){var e,n,o;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],r){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!a){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},e.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},e.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},e.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(t){var e,n,o,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,c&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),o=l.tagName.toLowerCase(),"label"===o){if(e=this.findControl(l)){if(this.focus(l),i)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-n>100||r&&window.top!==window&&"input"===o?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),r&&"select"===o||(this.targetElement=null,t.preventDefault()),!1);return!(!r||a||(s=l.fastClickScrollParent,!s||s.fastClickLastScrollTop===s.scrollTop))||(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(t){return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},e.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||(e=this.onMouse(t),e||(this.targetElement=null),e)},e.prototype.destroy=function(){var t=this.layer;i&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(t){var e,n,o,r;if("undefined"==typeof window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!i)return!0;if(e=document.querySelector("meta[name=viewport]")){if(e.content.indexOf("user-scalable=no")!==-1)return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(o=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),o[1]>=10&&o[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(e.content.indexOf("user-scalable=no")!==-1)return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction||(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],!!(r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(e.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth)))||("none"===t.style.touchAction||"manipulation"===t.style.touchAction))},e.attach=function(t,n){return new e(t,n)},"function"==typeof n&&"object"==typeof n.amd&&n.amd?n(function(){return e}):"undefined"!=typeof t&&t.exports?(t.exports=e.attach,t.exports.FastClick=e):window.FastClick=e}()},function(t,e,n){t.exports=n(5)},function(t,e){"use strict";function n(t){t in o||(o[t]=!0,document.dispatchEvent(new CustomEvent("o."+t)))}var o={};if(window.addEventListener("load",n.bind(null,"load")),window.addEventListener("load",n.bind(null,"DOMContentLoaded")),document.addEventListener("DOMContentLoaded",n.bind(null,"DOMContentLoaded")),document.onreadystatechange=function(){"complete"===document.readyState?(n("DOMContentLoaded"),n("load")):"interactive"!==document.readyState||document.attachEvent||n("DOMContentLoaded")},"complete"===document.readyState?(n("DOMContentLoaded"),n("load")):"interactive"!==document.readyState||document.attachEvent||n("DOMContentLoaded"),document.attachEvent){var i=!1,r=50;try{i=null==window.frameElement&&document.documentElement}catch(a){}i&&i.doScroll&&!function c(){if(!("DOMContentLoaded"in o)){try{i.doScroll("left")}catch(t){return r<5e3?setTimeout(c,r*=1.2):void 0}n("DOMContentLoaded")}}()}}]);
/* _________________________________________________________________________________________________________
   ___________________________    FUNCIONES PARA LOCALSTORAGES    __________________________________________
   _________________________________________________________________________________________________________ */
   
   $r.cls   = function(nombre,contenido) {window.localStorage.setItem(nombre,contenido); };
   $r.tls   = function(nombre) {return window.localStorage.getItem(nombre); };
   $r.vls   = function(nombre) {var nm = window.localStorage.getItem(nombre); var vl = true; if(nm == undefined || nm == null || nm == "" || nm == "undefined" || nm == "null" || nm == " ") vl = false; return vl;};
   $r.lls   = function(nombre) {((nombre == undefined) || (nombre == null)) ? window.localStorage.clear() : $r.cls(nombre,""); }
/* _________________________________________________________________________________________________________
   ___________________________    FUNCIONES RECIBE DATOS DE PHP    __________________________________________
   _________________________________________________________________________________________________________ */
   $r.ajax  = function(url, metodo, datos) 
   {
      var a = new XMLHttpRequest(); 
      a.open(metodo, url, true);
      a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      a.send(datos);
            var _esp = 0;
            if(datos.indexOf("&")>-1)
               _esp = datos.split("&")[0].split("=")[1];
            else
               _esp = datos.split("=")[1];
      a.onreadystatechange = function () {
         if(a.readyState == 4 && a.status != 200)
         {
            console.log(_esp);
             _recibe_errores_ajax(_esp);
         }
         else if(a.readyState == 4 && a.status == 200)
         {
            ((url.indexOf(".html") >-1)) ? j = a.responseText : j = JSON.parse(a.responseText);
            console.log(j);
            _recibe_ajax(j,_esp);
         }
      };
   };
   $r.node  = function(url, metodo, datos) 
   {
      var a = new XMLHttpRequest(); 
      a.open(metodo, url, true);
      a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      a.send(datos);
      a.onreadystatechange = function (j) {
         if(a.readyState == 4 && a.status == 403)
            console.log('no-aca-no')
         else if(a.readyState == 4 && a.status == 200)
         {
            console.log("bienvenido")
            j = JSON.parse(a.responseText);
            _recibe_ajax(j,j.termina);
         }
      };
   };
   $r.serialize_node = function(elem_form, h) {_resu = '&'+$r.serialize(elem_form); _bscar      = ""; _bscar_tem  = _resu.split("&"); for(var i=1;i< _bscar_tem.length; i++) {_bscar_tem_1  = _bscar_tem[i].split("="); _bscar        += '"'+_bscar_tem_1[0] +'":"'+ _bscar_tem_1[1]+'",'; }; _bscar = _bscar.slice(0, -1); var _res = '{"h":"'+h+'",'+_bscar+'}'; delete _resu; delete _bscar; delete _bscar_tem; delete _bscar_tem_1; return _res; }
/* _________________________________________________________________________________________________________
   ___________________________    FUNCIONES UTILES DE USO DIARIO    ________________________________________
   _________________________________________________________________________________________________________ */
   $r.random      = function(min, max){return Math.floor(Math.random() * (max - min + 1)) + min;};
   $r.nl2br       = function(str, is_xhtml){var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'); }
   $r.utf8_decode = function(str_data){var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0, c4 = 0; str_data += ''; while (i < str_data.length) {c1 = str_data.charCodeAt(i); if (c1 <= 191) {tmp_arr[ac++] = String.fromCharCode(c1); i++; } else if (c1 <= 223) {c2 = str_data.charCodeAt(i + 1); tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63)); i += 2; } else if (c1 <= 239) {c2 = str_data.charCodeAt(i + 1); c3 = str_data.charCodeAt(i + 2); tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); i += 3; } else {c2 = str_data.charCodeAt(i + 1); c3 = str_data.charCodeAt(i + 2); c4 = str_data.charCodeAt(i + 3); c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63); c1 -= 0x10000; tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)); tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF)); i += 4; } } return tmp_arr.join(''); }
   $r.serialize   = function(form) {if (!form || form.nodeName !== "FORM") return; var i, j, q = []; for (i = form.elements.length - 1; i >= 0; i = i - 1) {if (form.elements[i].name === "") continue; switch (form.elements[i].nodeName) {case 'RANGE': case 'INPUT': switch (form.elements[i].type) {case 'text': case 'email': case 'date': case 'number': case 'search': case 'hidden': case 'password': case 'button': case 'reset': case 'submit': case 'file': (form.elements[i].type == "password") ? q.push(form.elements[i].name + "=" + btoa(encodeURIComponent(form.elements[i].value))) : q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case 'checkbox': case 'radio': if (form.elements[i].checked) q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; } break; case 'TEXTAREA': q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case 'SELECT': switch (form.elements[i].type) {case 'select-one': q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; case 'select-multiple': for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {if (form.elements[i].options[j].selected) {q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value)); } } break; } break; case 'BUTTON': switch (form.elements[i].type) {case 'reset': case 'submit': case 'button': q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value)); break; } break; } } return q.join("&"); }
   $r.date        = function(format, timestamp){var that = this; var jsdate, f; var txt_words = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; var formatChr = /\\?(.?)/gi; var formatChrCb = function(t, s) {return f[t] ? f[t]() : s; }; var _pad = function(n, c) {n = String(n); while (n.length < c) {n = '0' + n; } return n; }; f = {d: function() {return _pad(f.j(), 2); }, D: function() {return f.l() .slice(0, 3); }, j: function() {return jsdate.getDate(); }, l: function() {return txt_words[f.w()] + 'day'; }, N: function() {return f.w() || 7; }, S: function() {var j = f.j(); var i = j % 10; if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {i = 0; } return ['st', 'nd', 'rd'][i - 1] || 'th'; }, w: function() {return jsdate.getDay(); }, z: function() {var a = new Date(f.Y(), f.n() - 1, f.j()); var b = new Date(f.Y(), 0, 1); return Math.round((a - b) / 864e5); }, W: function() {var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3); var b = new Date(a.getFullYear(), 0, 4); return _pad(1 + Math.round((a - b) / 864e5 / 7), 2); }, F: function() {return txt_words[6 + f.n()]; }, m: function() {return _pad(f.n(), 2); }, M: function() {return f.F() .slice(0, 3); }, n: function() {return jsdate.getMonth() + 1; }, t: function() {return (new Date(f.Y(), f.n(), 0)) .getDate(); }, L: function() {var j = f.Y(); return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0; }, o: function() {var n = f.n(); var W = f.W(); var Y = f.Y(); return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0); }, Y: function() {return jsdate.getFullYear(); }, y: function() {return f.Y() .toString() .slice(-2); }, a: function() {return jsdate.getHours() > 11 ? 'pm' : 'am'; }, A: function() {return f.a() .toUpperCase(); }, B: function() {var H = jsdate.getUTCHours() * 36e2; var i = jsdate.getUTCMinutes() * 60; var s = jsdate.getUTCSeconds(); return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3); }, g: function() {return f.G() % 12 || 12; }, G: function() {return jsdate.getHours(); }, h: function() {return _pad(f.g(), 2); }, H: function() {return _pad(f.G(), 2); }, i: function() {return _pad(jsdate.getMinutes(), 2); }, s: function() {return _pad(jsdate.getSeconds(), 2); }, u: function() {return _pad(jsdate.getMilliseconds() * 1000, 6); }, e: function() {/*              return that.date_default_timezone_get(); */ throw 'Not supported (see source code of date() for timezone on how to add support)'; }, I: function() {var a = new Date(f.Y(), 0); var c = Date.UTC(f.Y(), 0); var b = new Date(f.Y(), 6); var d = Date.UTC(f.Y(), 6); return ((a - c) !== (b - d)) ? 1 : 0; }, O: function() {var tzo = jsdate.getTimezoneOffset(); var a = Math.abs(tzo); return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4); }, P: function() {var O = f.O(); return (O.substr(0, 3) + ':' + O.substr(3, 2)); }, T: function() {return 'UTC'; }, Z: function() {return -jsdate.getTimezoneOffset() * 60; }, c: function() {return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb); }, r: function() {return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb); }, U: function() {return jsdate / 1000 | 0; } }; this.date = function(format, timestamp) {that = this; jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000) ); return format.replace(formatChr, formatChrCb); }; return this.date(format, timestamp);};
   $r.dom         = function(){ if(typeof _e == 'object') delete _e; _e = {}; _alldm = document.querySelectorAll("*[id]"); _e.d = {}; for(var i=0; i<_alldm.length;i++) eval("_e.d."+ _alldm[i].getAttribute("id").replace(/-/g,'_') +' = _alldm[i]'); delete _alldm; };
   $r.ajax_file_form= function(url, metodo, data, datos) {var d = datos.split('&'); for(var i = 0; i<d.length; i++) {dato = d[i].split("="); if(dato[0] != null && dato[0] != undefined && dato[0] != "") data.append(dato[0], dato[1]); } var a = new XMLHttpRequest(); a.open(metodo, url, true); a.send(data); a.onreadystatechange = function () {if (a.readyState != 4 || a.status != 200) return; j = JSON.parse(a.responseText); recibeAjax(j); }; }; 
   window.alert   = function(t,tiempo, elem)
   {
      if(elem == undefined)
         elem = {"elemento":"body","tipo":"tagName", "posicion":0};

      if(document.getElementById("_modal_rd") != null || document.getElementById("_modal_rd") != undefined)
         document.getElementById("_modal_rd").remove();

      _contenedor_modal       = document.createElement("div");
      _titulo_modal           = document.createElement("span");
      _titulo_modal.innerHTML = t;
      _contenedor_modal.setAttribute("id","_modal_rd");
      _contenedor_modal.appendChild(_titulo_modal);
         
      _contenedor_modal.style.width             = "100%";
      _contenedor_modal.style.backgroundColor   = "rgba(27, 27, 27, 0.82)";
      _contenedor_modal.style.maxWidth          = "320px";
      _contenedor_modal.style.minHeight         = "50px";
      _contenedor_modal.style.bottom            = "62px";
      _contenedor_modal.style.position          = "absolute";
      _contenedor_modal.style.zIndex            = "9999";
      _contenedor_modal.style.textAlign         = "center";
      _contenedor_modal.style.boxShadow         = "0px 0px 22px -4px rgba(0, 0, 0, 0.37)";
      _contenedor_modal.style.padding           = "9px";
      _contenedor_modal.style.boxSizing         = "border-box";
      _contenedor_modal.style.borderRadius      = "4px";
      _contenedor_modal.style.display           = "table";
          _titulo_modal.style.display           = "table-cell";
          _titulo_modal.style.verticalAlign     = "middle";
          _titulo_modal.style.marginTop         = "0";
          _titulo_modal.style.color             = "rgb(227, 222, 222)";
          _titulo_modal.style.fontSize          = "18px";

      switch (elem.tipo.toLowerCase()) {
         case "tagname":
            _donde = document.getElementsByTagName(elem.elemento)[elem.posicion];
            _contenedor_modal.style.position    = "fixed";
         break;
         case "id":
            _donde = document.getElementById(elem.elemento);
         break;
         case "classname":
            _donde = document.getElementsByClassName(elem.elemento)[elem.posicion];
         break;
         default:
            _donde = document.getElementsByTagName("body")[0];
            _contenedor_modal.style.position          = "fixed";
         break;
      }
      _contenedor_modal.style.left              = ((_donde.offsetWidth / 2) - 160) +'px';
      _donde.appendChild(_contenedor_modal);

      if(tiempo == undefined)
         tiempo = 1500;
      
      _mata_modal = function() { if(document.getElementById("_modal_rd") != null) document.getElementById("_modal_rd").remove(); }
      setTimeout(_mata_modal, tiempo);
      
      delete _donde,_contenedor_modal, _titulo_modal;
   }