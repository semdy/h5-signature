let isTouch = 'ontouchstart' in document
const ua = navigator.userAgent
const pointerEnabled = window.navigator.msPointerEnabled
const isIeMobile = pointerEnabled && /IEMobile/i.test(ua)

isTouch = isTouch || isIeMobile || false

let hidden, visibilityChange
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden"
    visibilityChange = "visibilitychange"
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden"
    visibilityChange = "msvisibilitychange"
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
}

export const EVENTS = isIeMobile ? {
    START: 'MSPointerDown',
    MOVE: 'MSPointerMove',
    END: 'MSPointerCancel',
    HIDDEN: hidden,
    VISIBILITYCHANGE: visibilityChange
} : {
    START: isTouch ? 'touchstart' : 'mousedown',
    MOVE: isTouch ? 'touchmove' : 'mousemove',
    END: isTouch ? 'touchend' : 'mouseup',
    HIDDEN: hidden,
    VISIBILITYCHANGE: visibilityChange
}

EVENTS.RESIZE = 'onorientationchange' in window ? 'orientationchange' : 'resize'

export function noop() {}

export function getEvent(evt) {
    return evt.changedTouches ? evt.changedTouches[0] : evt;
}

export function debounce(func, wait) {
    let timer = null
    return () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(func, wait)
    }
}

export function getBoundingClientRect(el) {
    // BlackBerry 5, iOS 3 (original iPhone) don't have getBoundingRect
    try {
        return el.getBoundingClientRect()
    }
    catch (e) {
        return {
            left: 0,
            top: 0
        }
    }
}

export function getEventXY(el, e) {
    if (e.offsetX !== undefined) {
        return {
            x: e.offsetX,
            y: e.offsetY
        }
    }
    if (e.layerX !== undefined && e.layerX !== e.offsetX) {
        return {
            x: e.layerX,
            y: e.layerY
        }
    }
    const box = getBoundingClientRect(el)
    return {
        x: e.clientX - box.left,
        y: e.clientY - box.top
    }
}

export { isTouch }
