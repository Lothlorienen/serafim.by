!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=179)}({179:function(t,e){var n={_listeners:[],_documentClickListeners:[],is_mobile:0,is_tablet:0,is_laptop:0,isMobileLayout:function(){return $(window).width()<=767},isTabletLayout:function(){return $(window).width()<=1023},isLaptopLayout:function(){return $(window).width()<=1279},isDesktopLayout:function(){return!1===this.isMobileLayout()&&!1===this.isTabletLayout()&&!1===this.isLaptopLayout()},addListener:function(t){this._listeners.push(t)},_fireChangeMode:function(){var t=this;setTimeout((function(){for(var e=0;e<t._listeners.length;e++)t._listeners[e](t.is_mobile)}),0)},addDocumentClickHandler:function(t){this._documentClickListeners.push(t)},fireDocumentClick:function(t){this._documentClickListeners.forEach((function(e){e(t)}))},isTouchDevice:function(){return"ontouchstart"in document.documentElement},init:function(){this.is_mobile=this.isMobileLayout(),$(window).on("resize",(function(){var t=n.isMobileLayout(),e=n.isTabletLayout(),i=n.isLaptopLayout();t!==n.is_mobile?(n.is_mobile=t,n._fireChangeMode()):e!==n.is_tablet?(n.is_tablet=e,n._fireChangeMode()):i!==n.is_laptop&&(n.is_laptop=i,n._fireChangeMode())}));var t=!1;$(document).on("touchstart",(function(){t=!0})),$(document).on("touchmove",(function(){t=!1})),$(document).on("click touchend",(function(e){"click"===e.type&&(t=!0),t&&n.fireDocumentClick(e)}))}};n.init(),window.Layout=n,window.isMobileLayout=function(){return n.isMobileLayout()},window.isTabletLayout=function(){return n.isTabletLayout()},window.isLaptopLayout=function(){return n.isLaptopLayout()},window.isDesktopLayout=function(){return n.isDesktopLayout()}}});