!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=192)}({192:function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var s=function(){function e(t){var i=this;n(this,e),this.node=t,this.closeButton=null,this.overlay=null,this.container=null,this.body=document.querySelector(".page"),this.map=null,this.isInited=!1,setTimeout((function(){i.events()}),2500)}return o(e,[{key:"events",value:function(){this.isInited||this.initPopup()}},{key:"initPopup",value:function(){this.createOverlay(),this.createPopupHTML(),this.node.addEventListener("click",this.handler.bind(this)),this.overlay.addEventListener("click",this.closePopup.bind(this)),this.closeButton.addEventListener("click",this.closePopup.bind(this)),this.isInited=!0}},{key:"handler",value:function(){this.revealPopup()}},{key:"revealPopup",value:function(){hideScrollbar(),this.showElement(this.map),this.showElement(this.overlay)}},{key:"createPopupHTML",value:function(){this.map=document.createElement("div"),this.map.classList.add("ymap"),this.closeButton=document.createElement("button"),this.closeButton.setAttribute("type","button"),this.closeButton.classList.add("ymap__close"),this.container=document.createElement("div"),this.container.classList.add("ymap__container"),this.container.insertAdjacentHTML("beforeend",'<div style="position:relative;overflow:hidden;"><a href="https://yandex.by/maps/org/tserkov_v_chest_prepodobnykh_startsev_optinskikh/205184322415/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Церковь в честь преподобных старцев Оптинских</a><a href="https://yandex.by/maps/157/minsk/category/orthodox_church/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Православный храм в Минске</a><a href="https://yandex.by/maps/157/minsk/category/religious_association/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Религиозное объединение в Минске</a><iframe src="https://yandex.by/map-widget/v1/-/CCQdjSUxpC" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>'),this.map.appendChild(this.closeButton),this.map.appendChild(this.container),this.body.appendChild(this.map)}},{key:"createOverlay",value:function(){this.overlay=document.createElement("div"),this.overlay.classList.add("overlay"),this.body.appendChild(this.overlay)}},{key:"closePopup",value:function(e){var t=e.target;t!==this.overlay&&t!==this.closeButton||(this.hideElement(this.overlay),this.hideElement(this.map)),showScrollbar()}},{key:"showElement",value:function(e){e.classList.add("visible")}},{key:"hideElement",value:function(e){e.classList.remove("visible")}}],[{key:"init",value:function(t){new e(t)}}]),e}(),r=function(){function e(){n(this,e)}return o(e,null,[{key:"init",value:function(){var e=document.querySelector(".js-ymap");e&&s.init(e)}}]),e}();document.addEventListener("DOMContentLoaded",(function(){r.init()}))}});