# PS-Viz-Markup (graphics markup for phase-scripter)
3D graphics & pattern generation with HTML

Development ongoing, documentation to follow.

## Build scripts
install dependencies: `npm install`  
run tests: `npm test`  
run linter: `npm run lint`  
build: `npm run build`  

---

## Usage example 

```html
<ps-viz-scene>
  <ps-viz-cube
    position="10 10 0"
    rotation="0 0 0"
    scale="5 1 1"
    color="0 0 1"
  >
  </ps-viz-cube>
</ps-viz-scene>
```

---

## About

The aim of this project is to:
* Create novel visual patterns with high level abstractions
* Provide full timing & animation compatibilty with [ps-markup](https://github.com/0la0/ps-markup)
* Be used as a tool for live coding graphics
* Serve as a standalone HTML graphics library

Inspirations:
* [hydra](https://github.com/ojack/hydra)
* [gibber](https://github.com/gibber-cc/gibber)

Similar Syntactic Systems:
* [a-frame](https://aframe.io/)
* [grimoire](https://grimoire.gl/)
* [react-three-fiber](https://github.com/drcmda/react-three-fiber)
* [vue-gl](https://vue-gl.github.io/vue-gl/)
