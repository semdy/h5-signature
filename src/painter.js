import Common from './common'
import MouseEvent from './mouseEvents'

class Painter extends Common {

    constructor(options = {}) {
        super(options)
        this.options = options
        this._isStart = false
        this.standardLineWidth = 10
        this.standardSpeed = 20
        this.lastTimestamp = null
        this.lastMouseX = null
        this.lastMouseY = null
        this.lastMoveToX = 0
        this.lastMoveToY = 0
    }

    init() {
        const { root } = this.options
        this.drawElement = document.createElement('canvas')
        this.drawCtx = this.drawElement.getContext('2d')
        root.appendChild(this.drawElement)
        super.init()
        this.mouseEvent = new MouseEvent({
            onMouseDown: this.handleMouseDown.bind(this),
            onMouseMove: this.handleMouseMove.bind(this),
            onMouseUp: this.handleMouseUp.bind(this),
            onMouseOut: this.handleMouseUp.bind(this)
        })
        this.mouseEvent.attach(this.drawElement)
    }

    destroy() {
        super.destroy()
        this.mouseEvent.detach()
    }

    handleMouseDown(evt) {
        this._isStart = true
        this.drawCtx.lineWidth = this.options.lineWidth
        this.drawCtx.lineJoin = 'round'
        this.drawCtx.lineCap = 'round'
        this.drawCtx.strokeStyle = this.options.color
        this.lastMoveToX = evt.stageX
        this.lastMoveToY = evt.stageY
        this.drawCtx.beginPath()
        this.drawCtx.moveTo(evt.stageX, evt.stageY)
        this.drawCtx.lineTo(evt.stageX + 0.1, evt.stageY + 0.1)
        this.drawCtx.stroke()
    }

    handleMouseMove(evt) {
        if (this._isStart) {
            const speed = this._calculateSpeed(evt)
            const lineWidth = this.options.lineWidth + (1 - speed / this.standardSpeed) * (this.options.lineWidth/this.standardLineWidth)
            this.drawCtx.lineWidth = Math.max(3, lineWidth)
            this.drawCtx.beginPath()
            this.drawCtx.moveTo(this.lastMoveToX, this.lastMoveToY)
            this.drawCtx.lineTo(evt.stageX, evt.stageY)
            this.drawCtx.closePath()
            this.drawCtx.stroke()
            this.lastMoveToX = evt.stageX
            this.lastMoveToY = evt.stageY
        }
    }

    handleMouseUp() {
        this._isStart = false
        const img = new Image()
        img.src = this.drawElement.toDataURL()
        img.onload = () => {
            this.options.onDrawUp(img)
            this.drawCtx.clearRect(0,0, this.drawElement.width, this.drawElement.height)
            img.onload = null
        }
    }

    setLineWidth(num) {
        this.options.lineWidth = num
    }

    setColor(color) {
        this.options.color = color
    }

    _calculateSpeed(evt) {
        if (this.lastTimestamp === null) {
            this.lastTimestamp = Date.now()
            this.lastMouseX = evt.stageX
            this.lastMouseY = evt.stageY
            return 0
        }

        const now = Date.now()
        const dt =  now - this.lastTimestamp
        const dx = Math.abs(evt.stageX - this.lastMouseX)
        const dy = Math.abs(evt.stageY - this.lastMouseY)
        const dd = Math.sqrt(dx * dx, dy * dy)

        const speed = Math.round(dd / dt * 100)

        this.lastTimestamp = now
        this.lastMouseX = evt.stageX
        this.lastMouseY = evt.stageY

        return speed
    }
}

export default Painter
