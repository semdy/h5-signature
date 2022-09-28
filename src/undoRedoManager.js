class UndoRedoManager {
  constructor() {
    this._undoStack = []
    this._redoStack = []
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
