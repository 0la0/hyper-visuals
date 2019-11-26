# Examples

## Create a Shape
```html
<h-viz-scene>
  <h-viz-box color="0.5 0 0.8">
  </h-viz-box>
</h-viz-scene>
```

## Lights
```html
<h-viz-scene>
  <h-viz-box
    color="0.5 0 0.8"
    rotation="45"
  >
  </h-viz-box>
  <h-viz-light
    position="10 15 15"
    color="1 1 1"
  >
  </h-viz-light>
</h-viz-scene>
```

## Camera
```html
<h-viz-scene>
  <h-viz-box
    color="0.5 0 0.8"
    rotation="45"
  >
  </h-viz-box>
  <h-viz-light
    position="10 15 15"
    color="1 1 1"
  >
  </h-viz-light>
  <h-viz-camera
    position="0 0 10"
    rotation="0 0 0"
  >
  </h-viz-camera>
</h-viz-scene>
```

## Background
```html
<h-viz-scene>
  <h-viz-box
    color="0.5 0 0.8"
    rotation="45"
  >
  </h-viz-box>
  <h-viz-background
    color="0.8 0.9 1"
    light-color="1 1 1"
    light-intensity="1"
  >
  </h-viz-background>
</h-viz-scene>
```

## Animation
```html
<h-viz-scene>
  <h-viz-ring
    position="fn(10*cos(time*0.75)) 10 0"
    rotation="fn(time*0.25) 0 fn(time*0.125)"
    scale="4"
    color="0 0.5 1"
  >
  </h-viz-ring>
</h-viz-scene>s
```

## Animate with Sequences
```html
<h-viz-scene>
  <h-viz-ring
    rotation="fn(time*0.25) 0 fn(time*0.125)"
    scale="4"
    color="addr(r) 0.5 1"
  >
  </h-viz-ring>
</h-viz-scene>

<h-seq>
  <h-pat address="r" pattern="0.0 , 1.0 , 0.0"></h-pat>
  <h-pat address="r" pattern="0 [ 0.5 1 0.5 ]"></h-pat>
</h-seq>
```

## Patterns
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
</h-viz-scene>
```

```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="fn(5+10*saw(time*0.4)) 3 4"
    rotation="fn(time*0.08)"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
</h-viz-scene>
```

## Pattern Modulation
### Position Modulation
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
    pos-mod="mod(40*squ(0.00001*time*y)) mod(20*sin(0.0001*time*z)) 0"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
</h-viz-scene>
```

### Rotation Modulation
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
    rot-mod="mod(10*sin(0.000001*time*y*z)) 0 0"
  >
    <h-viz-box
      scale="0.15 0.6 0.1"
      color="0 0 1"
    >
    </h-viz-box>
  </h-viz-repeat>
  <h-viz-light
    position="100 150 150"
    color="1 1 1"
  >
  </h-viz-light>
</h-viz-scene>
```

### Scale Modulation
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
    scale-mod="mod(sin(time*0.0001*x)) 0 0"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
</h-viz-scene>
```

### Color Modulation
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
    color-mod="mod(sin(0.00001*time*y)) mod(cos(0.0005*time*x)) mod(squ(0.0001*time))"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
</h-viz-scene>
```

### All of the above
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
    pos-mod="mod(40*squ(0.00001*time*y)) mod(20*sin(0.0001*time*z)) 0"
    rot-mod="mod(10*sin(0.000001*time*y*z)) 0 0"
    scale-mod="mod(sin(time*0.0001*x)) 0 0"
    color-mod="mod(sin(0.00001*time*y)) mod(cos(0.0005*time*x)) mod(squ(0.0001*time))"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
</h-viz-scene>
```

## Filters
### Pixelate
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
  <h-viz-filter-pixelate
    amount="20"
  >
  </h-viz-filter-pixelate>
</h-viz-scene>
```

```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
  <h-viz-filter-pixelate
    amount="fn(20*sin(0.125*time)+22)"
  >
  </h-viz-filter-pixelate>
</h-viz-scene>
```

### Oscillate
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
  <h-viz-filter-oscillate
    amplitude="0.05"
    frequency="0.005"
    period="10"
    type="sin"
  >
  </h-viz-filter-oscillate>
</h-viz-scene>
```

### Perlin Noise
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="5 3 4"
  >
    <h-viz-triangle
      scale="0.2"
      color="0.2 1 0.7"
    >
    </h-viz-triangle>
  </h-viz-repeat>
  <h-viz-filter-cloud
    amplitude="0.5"
    frequency="0.0001"
  >
  </h-viz-filter-cloud>
</h-viz-scene>
```
