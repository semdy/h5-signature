import { EVENTS, getEvent, getEventXY, noop } from './utils'

class MouseEvent {
    constructor(options = {}) {
        this._touchTimer = null
        this.options = { ...MouseEvent.defaultOptions, ...options }
    }
    attach(stageElement) {
        this.element = stageElement
        this._bindEvents()
    }
    _bindEvents() {
        this._onTouchStart = this._onTouchStart.bind(this)
        this._onTouchMove = this._onTouchMove.bind(this)
        this._onTouchEnd = this._onTouchEnd.bind(this)
        this._onMouseOut = this._onMouseOut.bind(this)
        this.element.addEventListener(EVENTS.START, this._onTouchStart, false)
        this.element.addEventListener(EVENTS.MOVE, this._onTouchMove, false)
        this.element.addEventListener(EVENTS.END, this._onTouchEnd, false)
        this.element.addEventListener('mouseout', this._onMouseOut, false)
    }
    _onTouchStart(event) {
        //event.preventDefault()
        event = getEvent(event)

        this._startTime = Date.now()

        this._clearTouchTimer()
        this._setMouseEventXY(event)
        this.options.onMouseDown(event)

        this._touchTimer = setTimeout(() => {
            this.options.onLongTap(event)
        }, 300)
    }
    _onTouchMove(event) {
        event.preventDefault()
        event = getEvent(event)

        this._clearTouchTimer()
        this._setMouseEventXY(event)
        this.options.onMouseMove(event)
    }
    _onTouchEnd(event) {
        event = getEvent(event)

        this._clearTouchTimer()
        this._setMouseEventXY(event)
        this.options.onMouseUp(event)

        var diffTime = Date.now() - this._startTime

        if (diffTime < 100) {
            this.options.onClick(event)
        }
    }
    _onMouseOut(event) {
        this._clearTouchTimer()
        this.options.onMouseOut(event)
    }
    _clearTouchTimer() {
        if (this._touchTimer) {
            clearTimeout(this._touchTimer)
        }
    }
    _setMouseEventXY(event) {
        const { x, y } = getEventXY(this.element, event)
        event.stageX = x
        event.stageY = y
    }
    detach() {
        this.element.removeEventListener(EVENTS.START, this._onTouchStart, false)
        this.element.removeEventListener(EVENTS.MOVE, this._onTouchMove, false)
        this.element.removeEventListener(EVENTS.END, this._onTouchEnd, false)
        this.element.removeEventListener('mouseout', this._onMouseOut, false)
    }
}

MouseEvent.defaultOptions = {
    onMouseDown: noop,
    onMouseMove: noop,
    onMouseUp: noop,
    onMouseOut: noop,
    onClick: noop,
    onLongTap: noop
}

export default MouseEvent
