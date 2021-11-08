import Common from './common'
import MouseEvent from './mouseEvents'

class Painter extends Common {

    constructor(options = {}) {
        super(options)
        this.options = options
        this._isStart = false
        this.lastTimestamp = null
        this.lastMouseX = null
        this.lastMouseY = null
        this.prePoint = null
        this.point = null
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
            onMouseOut: this.handleMouseOut.bind(this)
        })
        this.mouseEvent.attach(this.drawElement)
    }

    destroy() {
        this._isStart = false
        this.lastTimestamp = null
        this.lastMouseX = null
        this.lastMouseY = null
        this.prePoint = null
        this.point = null
        super.destroy()
        this.mouseEvent.detach()
    }

    drawSmoothLine(prePoint, point) {
        const perW = (point.x - prePoint.x) * 0.33
        const perH = (point.y - prePoint.y) * 0.33
        const x1 = prePoint.x + perW
        const y1 = prePoint.y + perH
        const x2 = x1 + perW
        const y2 = y1 + perH
        point.lastX = x2
        point.lastY = y2
        if (typeof prePoint.lastX === 'number') {
            const lineWidth = (prePoint.lineWidth + point.lineWidth) / 2
            this.drawCurveLine(prePoint.lastX, prePoint.lastY, prePoint.x, prePoint.y, x1, y1, lineWidth)
        }
        this.drawLine(x1, y1, x2, y2, point.lineWidth)
    }

    drawNoSmoothLine(prePoint, point) {
        const halfW = (point.x - prePoint.x) / 2
        const halfH = (point.y - prePoint.y) / 2
        point.lastX = prePoint.x + halfW
        point.lastY = prePoint.y + halfH
        if (typeof prePoint.lastX === 'number') {
            this.drawCurveLine(
                prePoint.lastX,
                prePoint.lastY,
                prePoint.x,
                prePoint.y,
                point.lastX,
                point.lastY,
                this.options.lineWidth
            )
        }
    }

    drawLine(x1, y1, x2, y2, lineWidth) {
        this.drawCtx.lineWidth = lineWidth
        this.drawCtx.beginPath()
        this.drawCtx.moveTo(x1, y1)
        this.drawCtx.lineTo(x2, y2)
        this.drawCtx.closePath()
        this.drawCtx.stroke()
    }

    drawCurveLine(x1, y1, x2, y2, x3, y3, lineWidth) {
        this.drawCtx.lineWidth = lineWidth
        this.drawCtx.beginPath()
        this.drawCtx.moveTo(x1, y1)
        this.drawCtx.quadraticCurveTo(x2, y2, x3, y3)
        this.drawCtx.stroke()
    }

    handleMouseDown(evt) {
        this._isStart = true
        this.prePoint = {
            x: evt.stageX,
            y: evt.stageY,
            lineWidth: this.options.lineWidth
        }
        this.drawCtx.lineJoin = 'round'
        this.drawCtx.lineCap = 'round'
        this.drawCtx.lineWidth = this.options.lineWidth * 0.8
        this.drawCtx.strokeStyle = this.options.color
        this.drawCtx.beginPath()
        this.drawCtx.moveTo(evt.stageX, evt.stageY)
        this.drawCtx.lineTo(evt.stageX + 0.1, evt.stageY + 0.1)
        this.drawCtx.stroke()
    }

    handleMouseMove(evt) {
        if (this._isStart) {
            let lineWidth = this._calculateLineWidth(evt)
            this.point = { x: evt.stageX, y: evt.stageY, lineWidth }
            if (this.options.openSmooth) {
                this.drawSmoothLine(this.prePoint, this.point)
            } else {
                this.drawNoSmoothLine(this.prePoint,this.point)
            }
            this.prePoint = { ...this.point }
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

    handleMouseOut() {
        if (this._isStart) {
            this.handleMouseUp()
        }
    }

    setLineWidth(num) {
        this.options.lineWidth = num
    }

    setColor(color) {
        this.options.color = color
    }

    getLineWidth(speed) {
        const maxWidth = this.options.lineWidth
        const minWidth = this.options.minWidth
        const minSpeed = this.options.minSpeed > 10 ? 10 : this.options.minSpeed < 1 ? 1 : this.options.minSpeed
        const addWidth = (maxWidth - minWidth) * speed / minSpeed
        const lineWidth = Math.max(maxWidth - addWidth, minWidth)
        return Math.min(lineWidth, maxWidth)
    }

    _calculateLineWidth(evt) {
        if (this.options.openSmooth) {
            const speed = this._calculateSpeed(evt)
            let lineWidth = this.getLineWidth(speed)
            if (this.prePoint.lineWidth) {
                const rate = (lineWidth - this.prePoint.lineWidth) / this.prePoint.lineWidth
                let maxRate = this.options.maxWidthDiffRate / 100
                maxRate = maxRate > 1 ? 1 : maxRate < 0.01 ? 0.01 : maxRate
                if (Math.abs(rate) > maxRate) {
                    const per = rate > 0 ? maxRate : -maxRate
                    lineWidth = this.prePoint.lineWidth * (1 + per)
                }
            }
            return lineWidth
        }
        return this.options.lineWidth
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
        const speed = dd / dt

        this.lastTimestamp = now
        this.lastMouseX = evt.stageX
        this.lastMouseY = evt.stageY

        return speed
    }
}

export default Painter
