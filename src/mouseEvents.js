import { EVENTS, getEvent, getEventXY, noop } from './utils'

class MouseEvent {
    constructor(options = {}) {
        this._touchTimer = null
        this.options = { ...MouseEvent.defaultOptions, ...options }
    }
    attach(stageElement) {
        this.element = stageElement
        this.bindEvents()
    }
    bindEvents() {
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
        this.element.addEventListener(EVENTS.START, this.onTouchStart, false)
        this.element.addEventListener(EVENTS.MOVE, this.onTouchMove, false)
        this.element.addEventListener(EVENTS.END, this.onTouchEnd, false)
        this.element.addEventListener('mouseout', this.onMouseOut, false)
    }
    onTouchStart(event) {
        //event.preventDefault()
        event = getEvent(event)

        this._startTime = Date.now()

        this.clearTouchTimer()
        this.setMouseEventXY(event)
        this.options.onMouseDown(event)

        this._touchTimer = setTimeout(() => {
            this.options.onLongTap(event)
        }, 300)
    }
    onTouchMove(event) {
        event.preventDefault()
        event = getEvent(event)

        this.clearTouchTimer()
        this.setMouseEventXY(event)
        this.options.onMouseMove(event)
    }
    onTouchEnd(event) {
        event = getEvent(event)

        this.clearTouchTimer()
        this.setMouseEventXY(event)
        this.options.onMouseUp(event)

        const diffTime = Date.now() - this._startTime

        if (diffTime < 100) {
            this.options.onClick(event)
        }
    }
    onMouseOut(event) {
        this.clearTouchTimer()
        this.options.onMouseOut(event)
    }
    clearTouchTimer() {
        if (this._touchTimer) {
            clearTimeout(this._touchTimer)
        }
    }
    setMouseEventXY(event) {
        const { x, y } = getEventXY(this.element, event)
        event.stageX = x
        event.stageY = y
    }
    detach() {
        this.element.removeEventListener(EVENTS.START, this.onTouchStart, false)
        this.element.removeEventListener(EVENTS.MOVE, this.onTouchMove, false)
        this.element.removeEventListener(EVENTS.END, this.onTouchEnd, false)
        this.element.removeEventListener('mouseout', this.onMouseOut, false)
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
