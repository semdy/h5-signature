!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Signature=e():t.Signature=e()}(self,(function(){return function(){"use strict";var t={d:function(e,n){for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}t.r(e),t.d(e,{default:function(){return j}});var a,s,h="ontouchstart"in document||navigator.maxTouchPoints,u=navigator.userAgent,c=window.navigator.msPointerEnabled&&/IEMobile/i.test(u);h=h||c||!1,void 0!==document.hidden?(a="hidden",s="visibilitychange"):void 0!==document.msHidden?(a="msHidden",s="msvisibilitychange"):void 0!==document.webkitHidden&&(a="webkitHidden",s="webkitvisibilitychange");var l=c?{START:"MSPointerDown",MOVE:"MSPointerMove",END:"MSPointerCancel",HIDDEN:a,VISIBILITYCHANGE:s}:{START:h?"touchstart":"mousedown",MOVE:h?"touchmove":"mousemove",END:h?"touchend":"mouseup",HIDDEN:a,VISIBILITYCHANGE:s};function d(){}function f(t){return t.changedTouches?t.changedTouches[0]:t}function p(t){return p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},p(t)}function v(t,e,n){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=p(t)););return t}(t,e);if(i){var o=Object.getOwnPropertyDescriptor(i,e);return o.get?o.get.call(n):o.value}},v(t,e,n||t)}function y(t,e){return y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},y(t,e)}function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function m(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}l.RESIZE="onorientationchange"in window?"orientationchange":"resize";var g=function(){function t(){i(this,t)}return r(t,[{key:"init",value:function(){this.resize=this.resize.bind(this),this.attachEvents(),this.resize()}},{key:"resize",value:function(){var t,e,n=this.options,i=n.width,o=n.height,r=n.root,a=n.scaleRatio;t="auto"===i?r.offsetWidth:i,e="auto"===o?r.offsetHeight:o,a>0?(this.drawElement.width=t*a,this.drawElement.height=e*a,this.drawCtx.scale(a,a)):(this.drawElement.width=t,this.drawElement.height=e),this.drawElement.style.cssText="width: ".concat(t,"px; height: ").concat(e,"px; touch-action: none;"),this.tempImageData&&(this.drawCtx.putImageData(this.tempImageData,0,0),this.tempImageData=null,this._isResizing=!1)}},{key:"attachEvents",value:function(){var t,e,n,i=this,o=this.options,r=o.width,a=o.height,s=(t=this.resize.bind(this),e=this.options.resizeDebounceTime,n=null,function(){n&&clearTimeout(n),n=setTimeout(t,e)});this.resizeHandle=function(t){i._isResizing||(i.tempImageData=i.drawCtx.getImageData(0,0,i.drawElement.width,i.drawElement.height)),i._isResizing=!0,s(t)},"auto"!==r&&"auto"!==a||window.addEventListener(l.RESIZE,this.resizeHandle,!1)}},{key:"detachEvents",value:function(){window.removeEventListener(l.RESIZE,this.resizeHandle,!1)}},{key:"destroy",value:function(){this.detachEvents()}}]),t}();function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function O(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?b(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):b(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var E=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),this._touchTimer=null,this.options=O(O({},t.defaultOptions),e)}return r(t,[{key:"attach",value:function(t){this.element=t,this.bindEvents()}},{key:"bindEvents",value:function(){this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onMouseOut=this.onMouseOut.bind(this),this.element.addEventListener(l.START,this.onTouchStart,!1),this.element.addEventListener(l.MOVE,this.onTouchMove,!1),this.element.addEventListener(l.END,this.onTouchEnd,!1),this.element.addEventListener("mouseout",this.onMouseOut,!1)}},{key:"onTouchStart",value:function(t){var e=this;t=f(t),this._startTime=Date.now(),this.clearTouchTimer(),this.setMouseEventXY(t),this.options.onMouseDown(t),this._touchTimer=setTimeout((function(){e.options.onLongTap(t)}),300)}},{key:"onTouchMove",value:function(t){t.preventDefault(),t=f(t),this.clearTouchTimer(),this.setMouseEventXY(t),this.options.onMouseMove(t)}},{key:"onTouchEnd",value:function(t){t=f(t),this.clearTouchTimer(),this.setMouseEventXY(t),this.options.onMouseUp(t),Date.now()-this._startTime<100&&this.options.onClick(t)}},{key:"onMouseOut",value:function(t){this.clearTouchTimer(),this.options.onMouseOut(t)}},{key:"clearTouchTimer",value:function(){this._touchTimer&&clearTimeout(this._touchTimer)}},{key:"setMouseEventXY",value:function(t){var e=function(t,e){if(void 0!==e.offsetX)return{x:e.offsetX,y:e.offsetY};if(void 0!==e.layerX&&e.layerX!==e.offsetX)return{x:e.layerX,y:e.layerY};var n=function(t){try{return t.getBoundingClientRect()}catch(t){return{left:0,top:0}}}(t);return{x:e.clientX-n.left,y:e.clientY-n.top}}(this.element,t),n=e.x,i=e.y;t.stageX=n,t.stageY=i}},{key:"detach",value:function(){this.element.removeEventListener(l.START,this.onTouchStart,!1),this.element.removeEventListener(l.MOVE,this.onTouchMove,!1),this.element.removeEventListener(l.END,this.onTouchEnd,!1),this.element.removeEventListener("mouseout",this.onMouseOut,!1)}}]),t}();E.defaultOptions={onMouseDown:d,onMouseMove:d,onMouseUp:d,onMouseOut:d,onClick:d,onLongTap:d};var k=E;function S(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function x(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?S(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):S(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var M=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(a,t);var e,n,o=(e=a,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,i=p(e);if(n){var o=p(this).constructor;t=Reflect.construct(i,arguments,o)}else t=i.apply(this,arguments);return m(this,t)});function a(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(this,a),(t=o.call(this,e)).options=e,t._isStart=!1,t.prePoint={},t.point={},t}return r(a,[{key:"init",value:function(){var t=this.options.root;this.drawElement=document.createElement("canvas"),this.drawCtx=this.drawElement.getContext("2d"),t.appendChild(this.drawElement),v(p(a.prototype),"init",this).call(this),this.mouseEvent=new k({onMouseDown:this.handleMouseDown.bind(this),onMouseMove:this.handleMouseMove.bind(this),onMouseUp:this.handleMouseUp.bind(this),onMouseOut:this.handleMouseOut.bind(this)}),this.mouseEvent.attach(this.drawElement)}},{key:"drawStartPoint",value:function(t){this.drawCtx.lineWidth=this.options.lineWidth,this.drawCtx.beginPath(),this.drawCtx.moveTo(t.stageX,t.stageY),this.drawCtx.lineTo(t.stageX+.1,t.stageY+.1),this.drawCtx.stroke()}},{key:"drawSmoothLine",value:function(t,e){var n=.33*(e.x-t.x),i=.33*(e.y-t.y),o=t.x+n,r=t.y+i,a=o+n,s=r+i;if(e.lastX=a,e.lastY=s,"number"==typeof t.lastX){var h=(t.lineWidth+e.lineWidth)/2;this.drawCurveLine(t.lastX,t.lastY,t.x,t.y,o,r,h)}this.drawLine(o,r,a,s,e.lineWidth)}},{key:"drawNoSmoothLine",value:function(t,e){var n=(e.x-t.x)/2,i=(e.y-t.y)/2;e.lastX=t.x+n,e.lastY=t.y+i,"number"==typeof t.lastX&&this.drawCurveLine(t.lastX,t.lastY,t.x,t.y,e.lastX,e.lastY,this.options.lineWidth)}},{key:"drawLine",value:function(t,e,n,i,o){this.drawCtx.lineWidth=o,this.drawCtx.beginPath(),this.drawCtx.moveTo(t,e),this.drawCtx.lineTo(n,i),this.drawCtx.closePath(),this.drawCtx.stroke()}},{key:"drawCurveLine",value:function(t,e,n,i,o,r,a){this.drawCtx.lineWidth=a,this.drawCtx.beginPath(),this.drawCtx.moveTo(t,e),this.drawCtx.quadraticCurveTo(n,i,o,r),this.drawCtx.stroke()}},{key:"drawByImage",value:function(t){var e=this.options.scaleRatio,n=this.drawElement,i=n.width,o=n.height;this.clear(),this.drawCtx.drawImage(t,0,0,i/e,o/e)}},{key:"handleMouseDown",value:function(t){this._isStart=!0,this.prePoint={x:t.stageX,y:t.stageY,t:Date.now(),lastX:t.stageX,lastY:t.stageY,color:this.options.color,lineWidth:this.options.lineWidth},this.drawCtx.lineJoin="round",this.drawCtx.lineCap="round",this.drawCtx.strokeStyle=this.options.color,this.drawStartPoint(t),this.options.onDrawStart(t,this.prePoint)}},{key:"handleMouseMove",value:function(t){this._isStart&&(this.point={x:t.stageX,y:t.stageY,t:Date.now(),color:this.options.color},this.point.lineWidth=this._calculateLineWidth(),this.options.openSmooth?this.drawSmoothLine(this.prePoint,this.point):this.drawNoSmoothLine(this.prePoint,this.point),this.prePoint=x({},this.point),this.options.onDrawing(t,this.point))}},{key:"handleMouseUp",value:function(t){var e=this;this._isStart=!1;var n=new Image;n.src=this.drawElement.toDataURL(),n.onload=function(){e.options.onDrawUp(t,n),n.onload=null}}},{key:"handleMouseOut",value:function(t){this._isStart&&this.handleMouseUp(t)}},{key:"setLineWidth",value:function(t){this.options.lineWidth=t}},{key:"setColor",value:function(t){this.options.color=t}},{key:"setOptions",value:function(t){this.options=x(x({},this.options),t)}},{key:"getLineWidth",value:function(t){var e=this.options.lineWidth,n=this.options.minWidth,i=(e-n)*t/(this.options.minSpeed>10?10:this.options.minSpeed<1?1:this.options.minSpeed),o=Math.max(e-i,n);return Math.min(o,e)}},{key:"clear",value:function(){this.drawCtx.clearRect(0,0,this.drawElement.width,this.drawElement.height)}},{key:"destroy",value:function(){this._isStart=!1,this.prePoint=null,this.point=null,this.clear(),v(p(a.prototype),"destroy",this).call(this),this.mouseEvent.detach();try{this.drawElement.parentElement.removeChild(this.drawElement),this.drawElement=null}catch(t){}}},{key:"_calculateLineWidth",value:function(){if(this.options.openSmooth){var t=this._calculateSpeed(),e=this.getLineWidth(t),n=(e-this.prePoint.lineWidth)/this.prePoint.lineWidth,i=this.options.maxWidthDiffRate/100;if(i=i>1?1:i<.01?.01:i,Math.abs(n)>i){var o=n>0?i:-i;e=this.prePoint.lineWidth*(1+o)}return e}return this.options.lineWidth}},{key:"_calculateSpeed",value:function(){var t=this.point.t-this.prePoint.t||.1,e=this.point.x-this.prePoint.x,n=this.point.y-this.prePoint.y;return Math.sqrt(e*e,n*n)/t}}]),a}(g),T=M,C=function(){function t(e){i(this,t),this._undoStack=[],this._redoStack=[],this.maxLength=e}return r(t,[{key:"push",value:function(t,e){var n=this;this._undoStack.push((function i(){t(),n._redoStack.push((function(){e(),n._undoStack.push(i)}))})),this.maxLength>0&&this._undoStack.length>this.maxLength&&(this._undoStack=this._undoStack.slice(-this.maxLength))}},{key:"undo",value:function(){var t=this._undoStack.pop();t instanceof Function&&t()}},{key:"redo",value:function(){var t=this._redoStack.pop();t instanceof Function&&t()}},{key:"setMaxHistoryLength",value:function(t){this.maxLength=t}},{key:"canUndo",value:function(){return this._undoStack.length>0}},{key:"canRedo",value:function(){return this._redoStack.length>0}},{key:"clear",value:function(){this._redoStack=[],this._undoStack=[]}}]),t}();function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function R(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?P(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):P(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var D=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),this.options=R(R({},t.defaultOptions),e),this.drawStack=[],this.lastCanUndo=!1,this.lastCanRedo=!1,this.painter=new T(R(R({},this.options),{},{onDrawUp:this.onDrawUp.bind(this)})),this.undoRedoManager=new C(this.options.maxHistoryLength),this.init()}return r(t,[{key:"init",value:function(){var t=this.options.root;if(!(t&&t instanceof Element))throw new Error("Invalid root element.");this.painter.init(),this.drawElement=this.painter.drawElement,this.handleUndoRedoStateChange(!0)}},{key:"onDrawUp",value:function(t,e){var n=this,i=function(){n.drawStack.push(e)};this.undoRedoManager.push((function(){n.drawStack.pop()}),i),i(),this.options.onDrawUp(t,e),this.handleUndoRedoStateChange()}},{key:"rerender",value:function(){var t=this.drawStack[this.drawStack.length-1];t?this.painter.drawByImage(t):this.painter.clear()}},{key:"clear",value:function(){this.drawStack=[],this.undoRedoManager.clear(),this.painter.clear(),this.handleUndoRedoStateChange()}},{key:"setLineWidth",value:function(t){this.painter.setLineWidth(t)}},{key:"setColor",value:function(t){this.painter.setColor(t)}},{key:"setOptions",value:function(t){this.options=R(R({},this.options),t),this.painter.setOptions(R(R({},t),{},{onDrawUp:this.onDrawUp.bind(this)})),t&&"maxHistoryLength"in t&&this.undoRedoManager.setMaxHistoryLength(t.maxHistoryLength)}},{key:"handleUndoRedoStateChange",value:function(t){var e=this.canUndo(),n=this.canRedo();t&&this.options.undoRedoStateChange(e,n),this.lastCanUndo!==e&&(this.options.undoRedoStateChange(e,n),this.lastCanUndo=e),this.lastCanRedo!==n&&(this.options.undoRedoStateChange(e,n),this.lastCanRedo=n)}},{key:"undo",value:function(){this.undoRedoManager.undo(),this.rerender(),this.handleUndoRedoStateChange()}},{key:"redo",value:function(){this.undoRedoManager.redo(),this.rerender(),this.handleUndoRedoStateChange()}},{key:"canUndo",value:function(){return this.undoRedoManager.canUndo()}},{key:"canRedo",value:function(){return this.undoRedoManager.canRedo()}},{key:"destroy",value:function(){this.clear(),this.painter.destroy(),this.undoRedoManager.clear()}},{key:"getValidBound",value:function(t){for(var e=t.getContext("2d"),n=t.width,i=t.height,o=e.getImageData(0,0,n,i).data,r=n,a=0,s=i,h=0,u=0;u<n;u++)for(var c=0;c<i;c++)o[4*(u+n*c)+3]>0&&(h=Math.max(c,h),a=Math.max(u,a),s=Math.min(c,s),r=Math.min(u,r));return{cutWidth:++a-++r,cutHeight:++h-++s,lOffset:r,rOffset:a,tOffset:s,bOffset:h}}},{key:"getResult",value:function(t){var e=this.drawElement;0!==this.options.rotate&&(e=this.getRotateCanvas(this.options.rotate));var n=this.getValidBound(e),i=n.cutWidth,o=n.cutHeight,r=n.lOffset,a=n.tOffset;if(!(i<=0||o<=0)){if(t)return e;var s=this.options,h=s.exportMaxWidth,u=s.exportMaxHeight,c=s.exportPadding,l=s.scaleRatio,d=document.createElement("canvas"),f=d.getContext("2d");if(d.width=i,d.height=o,f.drawImage(e,r,a,i,o,0,0,d.width,d.height),h||u||0!==c){var p=d.width,v=d.height,y=h*l,w=u*l;h&&y<p&&(v*=y/p,p=y),u&&w<v&&(p*=w/v,v=w);var m=document.createElement("canvas"),g=m.getContext("2d");return m.width=p,m.height=v,g.drawImage(d,c,c,m.width-2*c,m.height-2*c),m}return d}}},{key:"getRotateCanvas",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:90;t=t>0?t>90?180:90:t<-90?180:-90;var e=document.createElement("canvas"),n=this.drawElement.width,i=this.drawElement.height;180===t?(e.width=n,e.height=i):(e.width=i,e.height=n);var o=e.getContext("2d");return o.rotate(t*Math.PI/180),90===t?o.drawImage(this.drawElement,0,-i,n,i):-90===t?o.drawImage(this.drawElement,-n,0,n,i):180===t&&o.drawImage(this.drawElement,-n,-i,n,i),e}},{key:"base64ToBlob",value:function(t){for(var e=t.split(";base64,"),n=e[0].split(":")[1],i=window.atob(e[1]),o=i.length,r=new Uint8Array(o),a=0;a<o;++a)r[a]=i.charCodeAt(a);return new Blob([r],{type:n})}},{key:"downloadFile",value:function(){var t=Date.now(),e=document.createElement("a"),n=this.base64ToBlob(this.drawElement.toDataURL()),i=URL.createObjectURL(n);document.createEvent("HTMLEvents").initEvent("click",!0,!0),e.download=t,e.href=i,e.click(),window.URL.revokeObjectURL(i),e=null,i=null}}]),t}();D.defaultOptions={root:null,width:"auto",height:"auto",openSmooth:!0,color:"#000",lineWidth:8,rotate:0,minWidth:2,minSpeed:1.5,scaleRatio:window.devicePixelRatio||1,maxWidthDiffRate:20,resizeDebounceTime:200,maxHistoryLength:0,exportPadding:0,exportMaxWidth:null,exportMaxHeight:null,undoRedoStateChange:d,onDrawStart:d,onDrawing:d,onDrawUp:d};var j=D;return e}()}));