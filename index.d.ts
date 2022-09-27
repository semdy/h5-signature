interface IPoint {
    x: number,
    y: number
    t: number,
    lastX?: number,
    lastY?: number,
    color: string,
    lineWidth?: number
}

interface IOptions {
    root: HTMLElement | null,
    width?: number | 'auto',
    height?: number | 'auto',
    openSmooth?: boolean,
    color?: string,
    lineWidth?: number,
    rotate?:number,
    minWidth?: number,
    minSpeed?: number,
    scaleRatio?: number,
    maxWidthDiffRate?: number,
    resizeDebounceTime?: number,
    exportPadding?: number,
    exportMaxWidth?: number,
    exportMaxHeight?: number,
    undoRedoStateChange: (canUndo: boolean, canRedo: boolean) => void,
    onDrawStart: (evt: MouseEvent, prePoint: IPoint) => void,
    onDrawing: (evt: MouseEvent, prePoint: IPoint) => void,
    onDrawUp: (evt: MouseEvent, img: HTMLImageElement) => void,
}

export default class Signature {
    static defaultOptions: IOptions
    constructor(options?: IOptions)
    setLineWidth: (width: number) => void
    setColor: (color: string) => void
    clear: () => void
    undo: () => void
    redo: () => void
    canUndo: () => void
    canRedo: () => void
    getResult: () => HTMLCanvasElement
    getRotateCanvas: (degree: -90 | 90 | -180 | 180) => HTMLCanvasElement
    base64ToBlob: (code: string) => Blob
    destroy: () => void
    downloadFile: () => void
}