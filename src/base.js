import { EVENTS, debounce } from './utils'

class Common {

  init() {
    this.resize = this.resize.bind(this)
    this.attachEvents()
    this.resize()
  }

  resize() {
    const { width, height, root, scaleRatio } = this.options
    let eWidth, eHeight
    if (width === 'auto') {
      eWidth = root.offsetWidth
    } else {
      eWidth = width
    }
    if (height === 'auto') {
      eHeight = root.offsetHeight
    } else {
      eHeight = height
    }
    if (scaleRatio > 0) {
      this.drawElement.width = eWidth * scaleRatio
      this.drawElement.height = eHeight * scaleRatio
      this.drawCtx.scale(scaleRatio, scaleRatio)
    } else {
      this.drawElement.width = eWidth
      this.drawElement.height = eHeight
    }
    this.drawElement.style.cssText = `width: ${eWidth}px; height: ${eHeight}px; touch-action: none;`
  }

  attachEvents() {
    const { width, height } = this.options

    this.debounceReisize = debounce(this.resize.bind(this), this.options.resizeDebounceTime)

    if (width === 'auto' || height === 'auto') {
      window.addEventListener(EVENTS.RESIZE, this.debounceReisize, false)
    }
  }

  detachEvents() {
    window.removeEventListener(EVENTS.RESIZE, this.debounceReisize, false)
  }

  destroy() {
    this.detachEvents()
  }
}

export default Common
