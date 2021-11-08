# h5-signature
    基于canvas的手写签名

## Install
```bash
    npm install h5-signature
    # or
    yarn add h5-signature

    # development
    npm run start
    # build
    npm run build
```


## Usage

``` js
new Signature.default({
    root: container, // root dom container
    color: '#000', // draw color
    lineWidth: 8, // draw line width
    width: 'auto', // canvas width, auto fill to root width if set to 'auto'
    height: 'auto', // canvas height, auto fill to root height if set to 'auto'
    openSmooth: true, // if eanble brush thickness effect
    rotate: 0,         // export rotated image, available values: -90/90/-180/180
    minWidth: 2,        // minmize linWidth
    minSpeed: 1.5,      // minmize brush move speed
    maxWidthDiffRate: 20, // Smooth transition threshold
    exportPadding: 0, // padding from edge
    exportMaxWidth: 300,
    exportMaxHeight: 300,
    undoRedoStateChange: Function // state change if undo/redo state changed
})
```

## instance methods

#### setLineWidth
    paramters: width [number]
    set draw lineWidth dynamic
    
#### setColor
    paramters: color [string]
    set draw color dynamic
    
#### clear
    clear the canvas
    
#### undo
    go prev draw stage
    
#### redo
    go next draw stage
    
#### canUndo
    query if can undo
    
#### canRedo
    query if can redo
    
#### getResult
    get the croped canvas dom
    
#### destroy
    destroy the instance
    
#### downloadFile
    download the origin drawed image
    
## Thanks
    [smooth-signature](https://github.com/linjc/smooth-signature/)
