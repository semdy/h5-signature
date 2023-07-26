import { noop } from './utils'
import Painter from './painter'
import UndoRedoManager from './undoRedoManager'

class Stage {
  constructor(options = {}) {
    this.options = { ...Stage.defaultOptions, ...options }
    this.drawStack = []
    this.lastCanUndo = false
    this.lastCanRedo = false
    this.painter = new Painter({ ...this.options, onDrawUp: this.onDrawUp.bind(this) })
    this.undoRedoManager = new UndoRedoManager(this.options.maxHistoryLength)
    this.init()
  }

  init() {
    const { root } = this.options
    if (!root || !(root instanceof Element)) {
      throw new Error('Invalid root element.')
    }
    this.painter.init()
    this.drawElement = this.painter.drawElement
    this.handleUndoRedoStateChange(true)
  }

  onDrawUp(evt, img) {
    const undoFn = () => {
      this.drawStack.pop()
    }
    const redoFn = () => {
      this.drawStack.push(img)
    }
    this.undoRedoManager.push(undoFn, redoFn)
    redoFn()
    this.options.onDrawUp(evt, img)
    this.handleUndoRedoStateChange()
  }

  rerender() {
    const lastImg = this.drawStack[this.drawStack.length - 1]
    if (lastImg) {
      this.painter.drawByImage(lastImg)
    } else {
      this.painter.clear()
    }
  }

  clear() {
    this.drawStack = []
    this.undoRedoManager.clear()
    this.painter.clear()
    this.handleUndoRedoStateChange()
  }

  setLineWidth(num) {
    this.painter.setLineWidth(num)
  }

  setColor(color) {
    this.painter.setColor(color)
  }

  setOptions(options) {
    this.options = { ...this.options, ...options }
    this.painter.setOptions({ ...options, onDrawUp: this.onDrawUp.bind(this) })
    if (options && 'maxHistoryLength' in options) {
      this.undoRedoManager.setMaxHistoryLength(options.maxHistoryLength)
    }
  }

  handleUndoRedoStateChange(init) {
    const canUndo = this.canUndo()
    const canRedo = this.canRedo()
    if (init) {
      this.options.undoRedoStateChange(canUndo, canRedo)
    }
    if (this.lastCanUndo !== canUndo) {
      this.options.undoRedoStateChange(canUndo, canRedo)
      this.lastCanUndo = canUndo
    }
    if (this.lastCanRedo !== canRedo) {
      this.options.undoRedoStateChange(canUndo, canRedo)
      this.lastCanRedo = canRedo
    }
  }

  undo() {
    this.undoRedoManager.undo()
    this.rerender()
    this.handleUndoRedoStateChange()
  }

  redo() {
    this.undoRedoManager.redo()
    this.rerender()
    this.handleUndoRedoStateChange()
  }

  canUndo() {
    return this.undoRedoManager.canUndo()
  }

  canRedo() {
    return this.undoRedoManager.canRedo()
  }

  destroy() {
    this.clear()
    this.painter.destroy()
    this.undoRedoManager.clear()
  }

  getValidBound(canvas) {
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

    const cutWidth = rOffset - lOffset
    const cutHeight = bOffset - tOffset

    return {
      cutWidth,
      cutHeight,
      lOffset,
      rOffset,
      tOffset,
      bOffset
    }
  }

  getResult(origin) {
    try {
      let canvas = this.drawElement
      if (this.options.rotate !== 0) {
        canvas = this.getRotateCanvas(this.options.rotate)
      }

      const { cutWidth, cutHeight, lOffset, tOffset } = this.getValidBound(canvas)

      if (cutWidth <= 0 || cutHeight <= 0) return

      if (origin) {
        return canvas
      }

      const { exportMaxWidth, exportMaxHeight, exportPadding, scaleRatio } = this.options

      const cutCanvas = document.createElement('canvas')
      const cutCtx = cutCanvas.getContext('2d')
      cutCanvas.width = cutWidth
      cutCanvas.height = cutHeight
      cutCtx.drawImage(canvas, lOffset, tOffset, cutWidth, cutHeight, 0, 0, cutCanvas.width, cutCanvas.height)

      if (exportMaxWidth || exportMaxHeight || exportPadding !== 0) {
        let exWidth = cutCanvas.width
        let exHeight = cutCanvas.height
        const _exportMaxWidth = exportMaxWidth * scaleRatio
        const _exportMaxHeight = exportMaxHeight * scaleRatio

        if (exportMaxWidth && _exportMaxWidth < exWidth) {
          exHeight = exHeight * (_exportMaxWidth / exWidth)
          exWidth = _exportMaxWidth
        }
        if (exportMaxHeight && _exportMaxHeight < exHeight) {
          exWidth = exWidth * (_exportMaxHeight / exHeight)
          exHeight = _exportMaxHeight
        }

        const exportCanvas = document.createElement('canvas')
        const exportCtx = exportCanvas.getContext('2d')
        exportCanvas.width = exWidth
        exportCanvas.height = exHeight
        exportCtx.drawImage(cutCanvas, exportPadding, exportPadding, exportCanvas.width - exportPadding * 2, exportCanvas.height - exportPadding * 2)

        return exportCanvas
      }

      return cutCanvas
    } catch(e) {
      console.error(e)
    }
  }

  getRotateCanvas(degree = 90) {
    if (degree > 0) {
      degree = degree > 90 ? 180 : 90
    } else {
      degree = degree < -90 ? 180 : -90
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
  scaleRatio: window.devicePixelRatio || 1,
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
}

export default Stage
