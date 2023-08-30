# h5-signature

基于 canvas 的手写签名. [online demo](https://semdy.github.io/h5-signature/demo)

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

```js
<div style="width:300px;height:300px" id="container"></div>;
var container = document.getElementById("container");
new Signature.default({
  root: container, // root dom container
  color: "#000", // draw color
  lineWidth: 8, // draw line width
  width: "auto", // canvas width, auto fill to root width if set to 'auto'
  height: "auto", // canvas height, auto fill to root height if set to 'auto'
  openSmooth: true, // if enable brush thickness effect
  rotate: 0, // export rotated image, available values: -90/90/-180/180
  minWidth: 2, // minimize linWidth
  minSpeed: 1.5, // minimize brush move speed
  scaleRatio: window.devicePixelRatio, // canvas scale ratio
  maxWidthDiffRate: 20, // Smooth transition threshold
  resizeDebounceTime: 200, // window resize debounce elapse time
  maxHistoryLength: 0, // max history length, no limit if set to 0
  exportPadding: 0, // padding from edge
  exportMaxWidth: 300, // export max image width
  exportMaxHeight: 300, // export max image height
  undoRedoStateChange: Function, // state change callback if undo/redo state changed
  onDrawStart: Function, // called when draw starts, [MouseEvent, point]
  onDrawing: Function, // called when draw going , [MouseEvent, point]
  onDrawUp: Function, // called when draw up , [MouseEvent, Image]
});
```

## instance methods

#### setLineWidth

    parameters: width [number]

set draw lineWidth dynamic

#### setColor

    parameters: color [string]

set draw color dynamic

#### setOptions

    parameters: options Object

set override options, all properties same as constructor parameters, see above

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

#### isEmpty

query if canvas is nothing drawed

#### getResult

    parameters: origin [boolean]

get the cropped or origin canvas dom

#### destroy

destroy the instance

#### downloadFile

download the origin draw image

## Thanks

[smooth-signature](https://github.com/linjc/smooth-signature)
