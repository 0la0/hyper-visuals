# PS-Viz-Markup (graphics markup for phase-scripter)
Create 3D graphics with HTML

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
    pos-vel="0 0 0"
    rot-vel="0 0 1"
    scale-vel="0 0 0"
  >
  </ps-viz-cube>
</ps-viz-scene>
```
