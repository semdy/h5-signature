class UndoRedoManager {
  constructor(maxLength) {
    this._undoStack = []
    this._redoStack = []
    this.maxLength = maxLength
  }

  push(undoFn, redoFn) {
    const handler = () => {
      undoFn()
      this._redoStack.push(() => {
        redoFn()
        this._undoStack.push(handler)
      })
    }
    this._undoStack.push(handler)
    if (this.maxLength > 0 && this._undoStack.length > this.maxLength) {
      this._undoStack = this._undoStack.slice(-this.maxLength)
    }
  }

  undo() {
    const handler = this._undoStack.pop()
    if (handler instanceof Function) {
      handler()
    }
  }

  redo() {
    const handler = this._redoStack.pop()
    if (handler instanceof Function) {
      handler()
    }
  }

  canUndo() {
    return this._undoStack.length > 0
  }

  canRedo() {
    return this._redoStack.length > 0
  }

  clear() {
    this._redoStack = []
    this._undoStack = []
  }
}

export default UndoRedoManager
