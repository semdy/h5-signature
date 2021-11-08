import { noop } from './utils'
import Common from './common'
import Painter from './painter'
import UndoRedoManager from './undoRedoManager'

class Stage extends Common {

    constructor(options = {}) {
        super(options)
        this.options = { ...Stage.defaultOptions, ...options }
        this.drawStack = []
        this.lastCanUndo = false
        this.lastCanRedo = false
        this.painter = new Painter({... this.options, onDrawUp: this.onDrawUp.bind(this)})
        this.undoRedoManager = new UndoRedoManager()
        this.init()
    }

    init() {
        const { root } = this.options
        this.drawElement = document.createElement('canvas')
        this.drawCtx = this.drawElement.getContext('2d')
        if (root && root instanceof Element) {
            root.style.position = 'relative'
            root.appendChild(this.drawElement)
        } else {
            throw new Error('Invalid root element.')
        }
        super.init()
        this.painter.init()
        this.handleUndoRedoStateChange(true)
        this.tick()
    }

    onDrawUp(img) {
        const undoFn = () => {
            this.drawStack.pop()
        }
        const redoFn = () => {
            this.drawStack.push(img)
        }
        this.undoRedoManager.push(undoFn, redoFn)
        redoFn()
        if (this.options.onDrawUp) {
            this.options.onDrawUp(img)
        }
        this.handleUndoRedoStateChange()
    }

    tick() {
        this.raf = requestAnimationFrame(() => {
            this.render()
            this.tick()
        })
    }

    render() {
        const { width, height } = this.drawElement
        this.drawCtx.clearRect(0,0, width, height)
        this.drawStack.forEach(item => {
            this.drawCtx.drawImage(item, 0, 0, width, height)
        })
    }

    clear() {
        this.drawStack = []
        this.lastCanUndo = false
        this.lastCanRedo = false
        this.undoRedoManager.clear()
        this.handleUndoRedoStateChange()
    }

    unTick() {
        if (this.raf) {
            cancelAnimationFrame(this.raf)
        }
    }

    setLineWidth(num) {
        this.painter.setLineWidth(num)
    }

    setColor(color) {
        this.painter.setColor(color)
    }

    handleUndoRedoStateChange(init) {
        const canUndo = this.canUndo()
        const canRedo = this.canRedo()
        if (init || this.lastCanUndo !== canUndo) {
            this.options.undoRedoStateChange(canUndo, canRedo)
            this.lastCanUndo = canUndo
        }
        if (init || this.lastCanRedo !== canRedo) {
            this.options.undoRedoStateChange(canUndo, canRedo)
            this.lastCanRedo = canRedo
        }
    }

    undo() {
        this.undoRedoManager.undo()
        this.handleUndoRedoStateChange()
    }

    redo() {
        this.undoRedoManager.redo()
        this.handleUndoRedoStateChange()
    }

    canUndo() {
        return this.undoRedoManager.canUndo()
    }

    canRedo() {
        return this.undoRedoManager.canRedo()
    }

    destroy() {
        super.destroy()
        this.unTick()
        this.clear()
        this.painter.destroy()
        this.undoRedoManager.clear()
    }

    getResult() {
        let canvas = this.drawElement
        if (this.options.rotate !== 0) {
            canvas = this.getRotateCanvas(this.options.rotate)
        }
        const ctx = canvas.getContext('2d')
        const { width, height } = canvas
        const imgData = ctx.getImageData(0, 0, width, height).data
        let lOffset = width, rOffset = 0, tOffset = height, bOffset = 0
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const pos = (i + width * j) * 4
                if (imgData[pos + 3] > 0) {
                    bOffset = Math.max(j, bOffset)
                    rOffset = Math.max(i, rOffset)
                    tOffset = Math.min(j, tOffset)
                    lOffset = Math.min(i, lOffset)
                }
            }
        }
        // 由于循环是从0开始的，而我们认为的行列是从1开始的
        lOffset++
        rOffset++
        tOffset++
        bOffset++
        const cutCanvas = document.createElement('canvas')
        const cutCtx = cutCanvas.getContext('2d')
        cutCanvas.width = rOffset - lOffset
        cutCanvas.height = bOffset - tOffset
        cutCtx.drawImage(canvas, lOffset, tOffset, cutCanvas.width, cutCanvas.height, 0, 0, cutCanvas.width, cutCanvas.height)

        let exWidth = cutCanvas.width
        let exHeight = cutCanvas.height

        const { exportMaxWidth, exportMaxHeight, exportPadding } = this.options
        if (exportMaxWidth && exportMaxWidth < exWidth) {
            exHeight = exHeight * (exportMaxWidth / exWidth)
            exWidth = exportMaxWidth
        }
        if (exportMaxHeight && exportMaxHeight < exHeight) {
            exWidth = exWidth * (exportMaxHeight / exHeight)
            exHeight = exportMaxHeight
        }
        const exportCanvas = document.createElement('canvas')
        const exportCtx = exportCanvas.getContext('2d')
        exportCanvas.width = exWidth
        exportCanvas.height = exHeight
        exportCtx.drawImage(cutCanvas, exportPadding, exportPadding, exportCanvas.width - exportPadding * 2, exportCanvas.height - exportPadding * 2)

        return exportCanvas
    }

    getRotateCanvas(degree = 90) {
        if (degree > 0) {
            degree = degree > 90 ? 180 : 90;
        } else {
            degree = degree < -90 ? 180 : -90;
        }
        const canvas = document.createElement('canvas')
        const w = this.drawElement.width
        const h = this.drawElement.height
        if (degree === 180) {
            canvas.width = w
            canvas.height = h
        } else {
            canvas.width = h
            canvas.height = w
        }
        const ctx = canvas.getContext('2d')
        ctx.rotate(degree * Math.PI / 180)
        if (degree === 90) { // 顺时针90度
            ctx.drawImage(this.drawElement, 0, -h, w, h)
        } else if (degree === -90) { // 逆时针90度
            ctx.drawImage(this.drawElement, -w, 0, w, h)
        } else if (degree === 180) {
            ctx.drawImage(this.drawElement, -w, -h, w, h)
        }
        return canvas
    }

    base64ToBlob(code) {
        const parts = code.split(';base64,')
        const contentType = parts[0].split(':')[1]
        const raw = window.atob(parts[1])
        const rawLength = raw.length
        const uInt8Array = new Uint8Array(rawLength)

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
        }

        return new Blob([uInt8Array], {
            type: contentType
        })
    }

    downloadFile() {
        const fileName = Date.now()
        let aLink = document.createElement('a')
        const blob = this.base64ToBlob(this.drawElement.toDataURL())
        let urlObj = URL.createObjectURL(blob)
        const evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true) // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName
        aLink.href = urlObj
        aLink.click()
        window.URL.revokeObjectURL(urlObj)
        aLink = null
        urlObj = null
    }
}

Stage.defaultOptions = {
    root: null,
    width: 'auto',
    height: 'auto',
    openSmooth: true,
    color: '#000',
    lineWidth: 8,
    rotate: 0,
    minWidth: 2,
    minSpeed: 1.5,
    maxWidthDiffRate: 20,
    exportPadding: 0,
    exportMaxWidth: null,
    exportMaxHeight: null,
    undoRedoStateChange: noop
}

export default Stage
