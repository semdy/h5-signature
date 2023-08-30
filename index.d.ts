export interface IPoint {
  x: number
  y: number
  t: number
  lastX?: number
  lastY?: number
  color: string
  lineWidth?: number
}

export type IMouseEvent = MouseEvent & { stageX: number; stageY: number }

export interface IOptions {
  width?: number | 'auto'
  height?: number | 'auto'
  openSmooth?: boolean
  color?: string
  lineWidth?: number
  rotate?: number
  minWidth?: number
  minSpeed?: number
  scaleRatio?: number
  maxWidth?: number
  maxWidthDiffRate?: number
  resizeDebounceTime?: number
  maxHistoryLength?: number
  exportPadding?: number
  exportMaxWidth?: number
  exportMaxHeight?: number
  undoRedoStateChange?: (canUndo: boolean, canRedo: boolean) => void
  onDrawStart?: (evt: IMouseEvent, prePoint: IPoint) => void
  onDrawing?: (evt: IMouseEvent, prePoint: IPoint) => void
  onDrawUp?: (evt: IMouseEvent, img: HTMLImageElement) => void
}

export type ConstructorOptions = IOptions & { root: HTMLElement | null }

export class Base {
  init: () => void
  resize: () => void
  attachEvents: () => void
  detachEvents: () => void
  destroy: () => void
}

export default class Signature {
  static defaultOptions: IOptions

  constructor(options?: ConstructorOptions)

  setLineWidth: (width: number) => void
  setColor: (color: string) => void
  setOptions: (options: IOptions) => void
  clear: () => void
  undo: () => void
  redo: () => void
  canUndo: () => void
  canRedo: () => void
  isEmpty: () => boolean
  getResult: (origin?: boolean) => HTMLCanvasElement | undefined
  getRotateCanvas: (degree: -90 | 90 | -180 | 180) => HTMLCanvasElement
  base64ToBlob: (code: string) => Blob
  destroy: () => void
  downloadFile: () => void
}
