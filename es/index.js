/******/ "use strict";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "X": function() { return /* reexport */ base; },
  "Z": function() { return /* binding */ src; }
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ./src/utils.js
var isTouch = "ontouchstart" in document || navigator.maxTouchPoints;
var ua = navigator.userAgent;
var pointerEnabled = window.navigator.msPointerEnabled;
var isIeMobile = pointerEnabled && /IEMobile/i.test(ua);
isTouch = isTouch || isIeMobile || false;
var utils_hidden, visibilityChange;

if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  utils_hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  utils_hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  utils_hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var EVENTS = isIeMobile ? {
  START: "MSPointerDown",
  MOVE: "MSPointerMove",
  END: "MSPointerUp",
  CANCEL: "MSPointerCancel",
  HIDDEN: utils_hidden,
  VISIBILITYCHANGE: visibilityChange
} : {
  START: isTouch ? "touchstart" : "mousedown",
  MOVE: isTouch ? "touchmove" : "mousemove",
  END: isTouch ? "touchend" : "mouseup",
  CANCEL: isTouch ? "touchcancel" : "mouseout",
  HIDDEN: utils_hidden,
  VISIBILITYCHANGE: visibilityChange
};
EVENTS.RESIZE = "onorientationchange" in window ? "orientationchange" : "resize";
function noop() {}
function getEvent(evt) {
  if (evt.changedTouches) {
    var event = evt.changedTouches[0];
    event.touchLength = evt.changedTouches.length;
    return event;
  }

  evt.touchLength = 1;
  return evt;
}
function debounce(func, wait) {
  var timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
}
function getBoundingClientRect(el) {
  // BlackBerry 5, iOS 3 (original iPhone) don't have getBoundingRect
  try {
    return el.getBoundingClientRect();
  } catch (e) {
    return {
      left: 0,
      top: 0
    };
  }
}
function getEventXY(el, e) {
  if (e.offsetX !== undefined) {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }

  if (e.layerX !== undefined && e.layerX !== e.offsetX) {
    return {
      x: e.layerX,
      y: e.layerY
    };
  }

  var box = getBoundingClientRect(el);
  var scale = box.width / el.clientWidth;
  return {
    x: (e.clientX - box.left) / scale,
    y: (e.clientY - box.top) / scale
  };
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/superPropBase.js

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/get.js

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}
;// CONCATENATED MODULE: ./src/base.js




var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
  }

  _createClass(Common, [{
    key: "init",
    value: function init() {
      this.resize = this.resize.bind(this);
      this.attachEvents();
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this$options = this.options,
          width = _this$options.width,
          height = _this$options.height,
          maxWidth = _this$options.maxWidth,
          root = _this$options.root,
          scaleRatio = _this$options.scaleRatio;
      var eWidth, eHeight;

      if (width === "auto") {
        eWidth = root.clientWidth;
      } else {
        eWidth = width;
      }

      if (height === "auto") {
        eHeight = root.clientHeight;
      } else {
        eHeight = height;
      }

      if (scaleRatio > 0) {
        this.drawElement.width = eWidth * scaleRatio;
        this.drawElement.height = eHeight * scaleRatio;
        this.drawCtx.scale(scaleRatio, scaleRatio);
      } else {
        this.drawElement.width = eWidth;
        this.drawElement.height = eHeight;
      }

      if (maxWidth) {
        var origWidth = eWidth;
        eWidth = Math.min(eWidth, maxWidth);
        eHeight = Math.min(eHeight, eWidth / origWidth * eHeight);
      }

      this.drawElement.style.cssText = "width: ".concat(eWidth, "px; height: ").concat(eHeight, "px; touch-action: none;");

      if (this.tempImageData) {
        this.drawCtx.putImageData(this.tempImageData, 0, 0);
        this.tempImageData = null;
        this._isResizing = false;
      }
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this = this;

      var _this$options2 = this.options,
          width = _this$options2.width,
          height = _this$options2.height;
      var debounceReisize = debounce(this.resize.bind(this), this.options.resizeDebounceTime);

      this.resizeHandle = function (e) {
        if (!_this._isResizing) {
          _this.tempImageData = _this.drawCtx.getImageData(0, 0, _this.drawElement.width, _this.drawElement.height);
        }

        _this._isResizing = true;
        debounceReisize(e);
      };

      if (width === "auto" || height === "auto") {
        window.addEventListener(EVENTS.RESIZE, this.resizeHandle, false);
      }
    }
  }, {
    key: "detachEvents",
    value: function detachEvents() {
      window.removeEventListener(EVENTS.RESIZE, this.resizeHandle, false);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.detachEvents();
    }
  }]);

  return Common;
}();

/* harmony default export */ var base = (Common);
;// CONCATENATED MODULE: ./src/mouseEvents.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var MouseEvent = /*#__PURE__*/function () {
  function MouseEvent() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MouseEvent);

    this._touchTimer = null;
    this.options = _objectSpread(_objectSpread({}, MouseEvent.defaultOptions), options);
  }

  _createClass(MouseEvent, [{
    key: "attach",
    value: function attach(stageElement) {
      this.element = stageElement;
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
      this.element.addEventListener(EVENTS.START, this.onTouchStart, false);
      this.element.addEventListener(EVENTS.MOVE, this.onTouchMove, false);
      this.element.addEventListener(EVENTS.END, this.onTouchEnd, false);
      this.element.addEventListener(EVENTS.CANCEL, this.onMouseOut, false);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      var _this = this;

      //event.preventDefault()
      event = getEvent(event);
      this._startTime = Date.now();
      this.clearTouchTimer();
      this.setMouseEventXY(event);
      this.options.onMouseDown(event);
      this._touchTimer = setTimeout(function () {
        _this.options.onLongTap(event);
      }, 300);
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(event) {
      event.preventDefault();
      event = getEvent(event);
      this.clearTouchTimer();
      this.setMouseEventXY(event);
      this.options.onMouseMove(event);
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      event = getEvent(event);
      this.clearTouchTimer();
      this.setMouseEventXY(event);
      this.options.onMouseUp(event);

      var diffTime = Date.now() - this._startTime;

      if (diffTime < 100) {
        this.options.onClick(event);
      }
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      this.clearTouchTimer();
      this.options.onMouseOut(event);
    }
  }, {
    key: "clearTouchTimer",
    value: function clearTouchTimer() {
      if (this._touchTimer) {
        clearTimeout(this._touchTimer);
      }
    }
  }, {
    key: "setMouseEventXY",
    value: function setMouseEventXY(event) {
      var _getEventXY = getEventXY(this.element, event),
          x = _getEventXY.x,
          y = _getEventXY.y;

      event.stageX = x;
      event.stageY = y;
    }
  }, {
    key: "detach",
    value: function detach() {
      this.element.removeEventListener(EVENTS.START, this.onTouchStart, false);
      this.element.removeEventListener(EVENTS.MOVE, this.onTouchMove, false);
      this.element.removeEventListener(EVENTS.END, this.onTouchEnd, false);
      this.element.removeEventListener(EVENTS.CANCEL, this.onMouseOut, false);
    }
  }]);

  return MouseEvent;
}();

MouseEvent.defaultOptions = {
  onMouseDown: noop,
  onMouseMove: noop,
  onMouseUp: noop,
  onMouseOut: noop,
  onClick: noop,
  onLongTap: noop
};
/* harmony default export */ var mouseEvents = (MouseEvent);
;// CONCATENATED MODULE: ./src/painter.js








function painter_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function painter_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { painter_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { painter_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var Painter = /*#__PURE__*/function (_Base) {
  _inherits(Painter, _Base);

  var _super = _createSuper(Painter);

  function Painter() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Painter);

    _this = _super.call(this, options);
    _this.options = options;
    _this._isStart = false;
    _this._isMoved = false;
    _this._isEmpty = true;
    _this._touchCount = 0;
    _this.prePoint = {};
    _this.point = {};
    return _this;
  }

  _createClass(Painter, [{
    key: "init",
    value: function init() {
      var root = this.options.root;
      this.drawElement = document.createElement("canvas");
      this.drawCtx = this.drawElement.getContext("2d");
      root.appendChild(this.drawElement);

      _get(_getPrototypeOf(Painter.prototype), "init", this).call(this);

      this.mouseEvent = new mouseEvents({
        onMouseDown: this.handleMouseDown.bind(this),
        onMouseMove: this.handleMouseMove.bind(this),
        onMouseUp: this.handleMouseUp.bind(this),
        onMouseOut: this.handleMouseUp.bind(this)
      });
      this.mouseEvent.attach(this.drawElement);
    }
  }, {
    key: "drawStartPoint",
    value: function drawStartPoint(evt) {
      this.drawCtx.lineWidth = this.options.lineWidth;
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(evt.stageX, evt.stageY);
      this.drawCtx.lineTo(evt.stageX + 0.1, evt.stageY + 0.1);
      this.drawCtx.stroke();
    }
  }, {
    key: "drawSmoothLine",
    value: function drawSmoothLine(prePoint, point) {
      var perW = (point.x - prePoint.x) * 0.33;
      var perH = (point.y - prePoint.y) * 0.33;
      var x1 = prePoint.x + perW;
      var y1 = prePoint.y + perH;
      var x2 = x1 + perW;
      var y2 = y1 + perH;
      point.lastX = x2;
      point.lastY = y2;

      if (typeof prePoint.lastX === "number") {
        var lineWidth = (prePoint.lineWidth + point.lineWidth) / 2;
        this.drawCurveLine(prePoint.lastX, prePoint.lastY, prePoint.x, prePoint.y, x1, y1, lineWidth);
      }

      this.drawLine(x1, y1, x2, y2, point.lineWidth);
    }
  }, {
    key: "drawNoSmoothLine",
    value: function drawNoSmoothLine(prePoint, point) {
      var halfW = (point.x - prePoint.x) / 2;
      var halfH = (point.y - prePoint.y) / 2;
      point.lastX = prePoint.x + halfW;
      point.lastY = prePoint.y + halfH;

      if (typeof prePoint.lastX === "number") {
        this.drawCurveLine(prePoint.lastX, prePoint.lastY, prePoint.x, prePoint.y, point.lastX, point.lastY, this.options.lineWidth);
      }
    }
  }, {
    key: "drawLine",
    value: function drawLine(x1, y1, x2, y2, lineWidth) {
      this.drawCtx.lineWidth = lineWidth;
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(x1, y1);
      this.drawCtx.lineTo(x2, y2);
      this.drawCtx.closePath();
      this.drawCtx.stroke();
    }
  }, {
    key: "drawCurveLine",
    value: function drawCurveLine(x1, y1, x2, y2, x3, y3, lineWidth) {
      this.drawCtx.lineWidth = lineWidth;
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(x1, y1);
      this.drawCtx.quadraticCurveTo(x2, y2, x3, y3);
      this.drawCtx.stroke();
    }
  }, {
    key: "drawByImage",
    value: function drawByImage(img) {
      var scaleRatio = this.options.scaleRatio;
      var _this$drawElement = this.drawElement,
          width = _this$drawElement.width,
          height = _this$drawElement.height;
      this.clear();
      this.drawCtx.drawImage(img, 0, 0, width / scaleRatio, height / scaleRatio);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(evt) {
      this._touchCount++;

      if (evt.touchLength > 1 || this._touchCount > 1) {
        this._isStart = false;
        return;
      }

      this._isStart = true;
      this.prePoint = {
        x: evt.stageX,
        y: evt.stageY,
        t: Date.now(),
        lastX: evt.stageX,
        lastY: evt.stageY,
        color: this.options.color,
        lineWidth: this.options.lineWidth
      };
      this.drawCtx.lineJoin = "round";
      this.drawCtx.lineCap = "round";
      this.drawCtx.strokeStyle = this.options.color; // this.drawStartPoint(evt);

      this.options.onDrawStart(evt, this.prePoint);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(evt) {
      if (!this._isStart) return;
      this.point = {
        x: evt.stageX,
        y: evt.stageY,
        t: Date.now(),
        color: this.options.color
      };
      this.point.lineWidth = this._calculateLineWidth();

      if (this.options.openSmooth) {
        this.drawSmoothLine(this.prePoint, this.point);
      } else {
        this.drawNoSmoothLine(this.prePoint, this.point);
      }

      this.prePoint = painter_objectSpread({}, this.point);
      this._isMoved = true;
      this._isEmpty = false;
      this.options.onDrawing(evt, this.point);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(evt) {
      var _this2 = this;

      this._touchCount = 0;
      if (!this._isStart) return;

      if (!this._isMoved) {
        this.drawStartPoint(evt);
      }

      this._isStart = false;
      this._isEmpty = false;
      this._isMoved = false;
      var img = new Image();
      img.src = this.drawElement.toDataURL();

      img.onload = function () {
        _this2.options.onDrawUp(evt, img);

        img.onload = null;
      };
    }
  }, {
    key: "setLineWidth",
    value: function setLineWidth(num) {
      this.options.lineWidth = num;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.options.color = color;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = painter_objectSpread(painter_objectSpread({}, this.options), options);
    }
  }, {
    key: "getLineWidth",
    value: function getLineWidth(speed) {
      var maxWidth = this.options.lineWidth;
      var minWidth = this.options.minWidth;
      var minSpeed = this.options.minSpeed > 10 ? 10 : this.options.minSpeed < 1 ? 1 : this.options.minSpeed;
      var addWidth = (maxWidth - minWidth) * speed / minSpeed;
      var lineWidth = Math.max(maxWidth - addWidth, minWidth);
      return Math.min(lineWidth, maxWidth);
    }
  }, {
    key: "isEmpy",
    value: function isEmpy() {
      return this._isEmpty;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._isEmpty = true;
      if (!this.drawElement) return;
      this.drawCtx.clearRect(0, 0, this.drawElement.width, this.drawElement.height);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._isStart = null;
      this._isMoved = null;
      this._isEmpty = null;
      this.prePoint = null;
      this.point = null;
      this.clear();

      _get(_getPrototypeOf(Painter.prototype), "destroy", this).call(this);

      this.mouseEvent.detach();

      try {
        var parent = this.drawElement.parentElement || document.body;
        parent.removeChild(this.drawElement);
        this.drawElement = null;
      } catch (e) {}
    }
  }, {
    key: "_calculateLineWidth",
    value: function _calculateLineWidth() {
      if (this.options.openSmooth) {
        var speed = this._calculateSpeed();

        var lineWidth = this.getLineWidth(speed);
        var rate = (lineWidth - this.prePoint.lineWidth) / this.prePoint.lineWidth;
        var maxRate = this.options.maxWidthDiffRate / 100;
        maxRate = maxRate > 1 ? 1 : maxRate < 0.01 ? 0.01 : maxRate;

        if (Math.abs(rate) > maxRate) {
          var per = rate > 0 ? maxRate : -maxRate;
          lineWidth = this.prePoint.lineWidth * (1 + per);
        }

        return lineWidth;
      }

      return this.options.lineWidth;
    }
  }, {
    key: "_calculateSpeed",
    value: function _calculateSpeed() {
      var dt = this.point.t - this.prePoint.t || 0.1;
      var dx = this.point.x - this.prePoint.x;
      var dy = this.point.y - this.prePoint.y;
      var dd = Math.sqrt(dx * dx, dy * dy);
      return dd / dt;
    }
  }]);

  return Painter;
}(base);

/* harmony default export */ var painter = (Painter);
;// CONCATENATED MODULE: ./src/undoRedoManager.js



var UndoRedoManager = /*#__PURE__*/function () {
  function UndoRedoManager(maxLength) {
    _classCallCheck(this, UndoRedoManager);

    this._undoStack = [];
    this._redoStack = [];
    this.maxLength = maxLength;
  }

  _createClass(UndoRedoManager, [{
    key: "push",
    value: function push(undoFn, redoFn) {
      var _this = this;

      var handler = function handler() {
        undoFn();

        _this._redoStack.push(function () {
          redoFn();

          _this._undoStack.push(handler);
        });
      };

      this._undoStack.push(handler);

      if (this.maxLength > 0 && this._undoStack.length > this.maxLength) {
        this._undoStack = this._undoStack.slice(-this.maxLength);
      }
    }
  }, {
    key: "undo",
    value: function undo() {
      var handler = this._undoStack.pop();

      if (handler instanceof Function) {
        handler();
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      var handler = this._redoStack.pop();

      if (handler instanceof Function) {
        handler();
      }
    }
  }, {
    key: "setMaxHistoryLength",
    value: function setMaxHistoryLength(len) {
      this.maxLength = len;
    }
  }, {
    key: "canUndo",
    value: function canUndo() {
      return this._undoStack.length > 0;
    }
  }, {
    key: "canRedo",
    value: function canRedo() {
      return this._redoStack.length > 0;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._redoStack = [];
      this._undoStack = [];
    }
  }]);

  return UndoRedoManager;
}();

/* harmony default export */ var undoRedoManager = (UndoRedoManager);
;// CONCATENATED MODULE: ./src/stage.js




function stage_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function stage_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { stage_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { stage_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var Stage = /*#__PURE__*/function () {
  function Stage() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Stage);

    this.options = stage_objectSpread(stage_objectSpread({}, Stage.defaultOptions), options);
    this.drawStack = [];
    this.lastCanUndo = false;
    this.lastCanRedo = false;
    this._isEmpty = true;
    this.painter = new painter(stage_objectSpread(stage_objectSpread({}, this.options), {}, {
      onDrawUp: this.onDrawUp.bind(this)
    }));
    this.undoRedoManager = new undoRedoManager(this.options.maxHistoryLength);
    this.init();
  }

  _createClass(Stage, [{
    key: "init",
    value: function init() {
      var root = this.options.root;

      if (!root || !(root instanceof Element)) {
        throw new Error("Invalid root element.");
      }

      this.painter.init();
      this.drawElement = this.painter.drawElement;
      this.handleUndoRedoStateChange(true);
    }
  }, {
    key: "onDrawUp",
    value: function onDrawUp(evt, img) {
      var _this = this;

      var undoFn = function undoFn() {
        _this.drawStack.pop();
      };

      var redoFn = function redoFn() {
        _this.drawStack.push(img);
      };

      this.undoRedoManager.push(undoFn, redoFn);
      redoFn();
      this.options.onDrawUp(evt, img);
      this.handleUndoRedoStateChange();
    }
  }, {
    key: "rerender",
    value: function rerender() {
      var lastImg = this.drawStack[this.drawStack.length - 1];

      if (lastImg) {
        this.painter.drawByImage(lastImg);
      } else {
        this.painter.clear();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.drawStack = [];
      this.undoRedoManager.clear();
      this.painter.clear();
      this.handleUndoRedoStateChange();
    }
  }, {
    key: "setLineWidth",
    value: function setLineWidth(num) {
      this.painter.setLineWidth(num);
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.painter.setColor(color);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = stage_objectSpread(stage_objectSpread({}, this.options), options);
      this.painter.setOptions(stage_objectSpread(stage_objectSpread({}, options), {}, {
        onDrawUp: this.onDrawUp.bind(this)
      }));

      if (options && "maxHistoryLength" in options) {
        this.undoRedoManager.setMaxHistoryLength(options.maxHistoryLength);
      }
    }
  }, {
    key: "handleUndoRedoStateChange",
    value: function handleUndoRedoStateChange(init) {
      var canUndo = this.canUndo();
      var canRedo = this.canRedo();

      if (init) {
        this.options.undoRedoStateChange(canUndo, canRedo);
      }

      if (this.lastCanUndo !== canUndo) {
        this.options.undoRedoStateChange(canUndo, canRedo);
        this.lastCanUndo = canUndo;
      }

      if (this.lastCanRedo !== canRedo) {
        this.options.undoRedoStateChange(canUndo, canRedo);
        this.lastCanRedo = canRedo;
      }
    }
  }, {
    key: "undo",
    value: function undo() {
      this.undoRedoManager.undo();
      this.rerender();
      this.handleUndoRedoStateChange();
    }
  }, {
    key: "redo",
    value: function redo() {
      this.undoRedoManager.redo();
      this.rerender();
      this.handleUndoRedoStateChange();
    }
  }, {
    key: "canUndo",
    value: function canUndo() {
      return this.undoRedoManager.canUndo();
    }
  }, {
    key: "canRedo",
    value: function canRedo() {
      return this.undoRedoManager.canRedo();
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.painter.isEmpy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.clear();
      this.painter.destroy();
      this.undoRedoManager.clear();
    }
  }, {
    key: "getValidBound",
    value: function getValidBound(canvas) {
      var ctx = canvas.getContext("2d");
      var width = canvas.width,
          height = canvas.height;
      var imgData = ctx.getImageData(0, 0, width, height).data;
      var lOffset = width,
          rOffset = 0,
          tOffset = height,
          bOffset = 0;

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
          var pos = (i + width * j) * 4;

          if (imgData[pos + 3] > 0) {
            bOffset = Math.max(j, bOffset);
            rOffset = Math.max(i, rOffset);
            tOffset = Math.min(j, tOffset);
            lOffset = Math.min(i, lOffset);
          }
        }
      } // 由于循环是从0开始的，而我们认为的行列是从1开始的


      lOffset++;
      rOffset++;
      tOffset++;
      bOffset++;
      var cutWidth = rOffset - lOffset;
      var cutHeight = bOffset - tOffset;
      return {
        cutWidth: cutWidth,
        cutHeight: cutHeight,
        lOffset: lOffset,
        rOffset: rOffset,
        tOffset: tOffset,
        bOffset: bOffset
      };
    }
  }, {
    key: "getResult",
    value: function getResult(origin) {
      try {
        var canvas = this.drawElement;

        if (this.options.rotate !== 0) {
          canvas = this.getRotateCanvas(this.options.rotate);
        }

        var _this$getValidBound = this.getValidBound(canvas),
            cutWidth = _this$getValidBound.cutWidth,
            cutHeight = _this$getValidBound.cutHeight,
            lOffset = _this$getValidBound.lOffset,
            tOffset = _this$getValidBound.tOffset;

        if (cutWidth <= 0 || cutHeight <= 0) return;

        if (origin) {
          return canvas;
        }

        var _this$options = this.options,
            exportMaxWidth = _this$options.exportMaxWidth,
            exportMaxHeight = _this$options.exportMaxHeight,
            exportPadding = _this$options.exportPadding,
            scaleRatio = _this$options.scaleRatio;
        var cutCanvas = document.createElement("canvas");
        var cutCtx = cutCanvas.getContext("2d");
        cutCanvas.width = cutWidth;
        cutCanvas.height = cutHeight;
        cutCtx.drawImage(canvas, lOffset, tOffset, cutWidth, cutHeight, 0, 0, cutCanvas.width, cutCanvas.height);

        if (exportMaxWidth || exportMaxHeight || exportPadding !== 0) {
          var exWidth = cutCanvas.width;
          var exHeight = cutCanvas.height;

          var _exportMaxWidth = exportMaxWidth * scaleRatio;

          var _exportMaxHeight = exportMaxHeight * scaleRatio;

          if (exportMaxWidth && _exportMaxWidth < exWidth) {
            exHeight = exHeight * (_exportMaxWidth / exWidth);
            exWidth = _exportMaxWidth;
          }

          if (exportMaxHeight && _exportMaxHeight < exHeight) {
            exWidth = exWidth * (_exportMaxHeight / exHeight);
            exHeight = _exportMaxHeight;
          }

          var exportCanvas = document.createElement("canvas");
          var exportCtx = exportCanvas.getContext("2d");
          exportCanvas.width = exWidth;
          exportCanvas.height = exHeight;
          exportCtx.drawImage(cutCanvas, exportPadding, exportPadding, exportCanvas.width - exportPadding * 2, exportCanvas.height - exportPadding * 2);
          return exportCanvas;
        }

        return cutCanvas;
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: "getRotateCanvas",
    value: function getRotateCanvas() {
      var degree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;

      if (degree > 0) {
        degree = degree > 90 ? 180 : 90;
      } else {
        degree = degree < -90 ? 180 : -90;
      }

      var canvas = document.createElement("canvas");
      var w = this.drawElement.width;
      var h = this.drawElement.height;

      if (degree === 180) {
        canvas.width = w;
        canvas.height = h;
      } else {
        canvas.width = h;
        canvas.height = w;
      }

      var ctx = canvas.getContext("2d");
      ctx.rotate(degree * Math.PI / 180);

      if (degree === 90) {
        // 顺时针90度
        ctx.drawImage(this.drawElement, 0, -h, w, h);
      } else if (degree === -90) {
        // 逆时针90度
        ctx.drawImage(this.drawElement, -w, 0, w, h);
      } else if (degree === 180) {
        ctx.drawImage(this.drawElement, -w, -h, w, h);
      }

      return canvas;
    }
  }, {
    key: "base64ToBlob",
    value: function base64ToBlob(code) {
      var parts = code.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {
        type: contentType
      });
    }
  }, {
    key: "downloadFile",
    value: function downloadFile() {
      var fileName = Date.now();
      var aLink = document.createElement("a");
      var blob = this.base64ToBlob(this.drawElement.toDataURL());
      var urlObj = URL.createObjectURL(blob);
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为

      aLink.download = fileName;
      aLink.href = urlObj;
      aLink.click();
      window.URL.revokeObjectURL(urlObj);
      aLink = null;
      urlObj = null;
    }
  }]);

  return Stage;
}();

Stage.defaultOptions = {
  root: null,
  width: "auto",
  height: "auto",
  openSmooth: true,
  color: "#000",
  lineWidth: 8,
  rotate: 0,
  minWidth: 2,
  minSpeed: 1.5,
  scaleRatio: window.devicePixelRatio || 1,
  maxWidth: null,
  maxWidthDiffRate: 20,
  resizeDebounceTime: 200,
  maxHistoryLength: 0,
  exportPadding: 0,
  exportMaxWidth: null,
  exportMaxHeight: null,
  undoRedoStateChange: noop,
  onDrawStart: noop,
  onDrawing: noop,
  onDrawUp: noop
};
/* harmony default export */ var stage = (Stage);
;// CONCATENATED MODULE: ./src/index.js



/* harmony default export */ var src = (stage);
var __webpack_exports__Base = __webpack_exports__.X;
var __webpack_exports__default = __webpack_exports__.Z;
export { __webpack_exports__Base as Base, __webpack_exports__default as default };
