import { EVENTS, debounce } from './utils'

class Common {

    init() {
        this.resize = this.resize.bind(this)
        this.attachEvents()
        this.resize()
    }

    resize() {
        const { width, height, root } = this.options
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
        this.drawElement.width = eWidth
        this.drawElement.height = eHeight
        this.drawElement.style.cssText = `position:absolute; left: 0; top: 0; width: ${eWidth}px; height: ${eHeight}px; touch-action: none;`
    }

    attachEvents() {
        this.debounceReisize = debounce(this.resize.bind(this), this.options.resizeDebounceTime)
        window.addEventListener(EVENTS.RESIZE, this.debounceReisize, false)
    }

    detachEvents() {
       window.removeEventListener(EVENTS.RESIZE, this.debounceReisize, false)
    }

    destroy() {
        this.detachEvents()
    }
}

export default Common
