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
</h-viz-scene>
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

### Motion Blur
```html
<h-viz-scene>
  <h-viz-ring
    position="fn(10*cos(time*0.75)) 10 0"
    rotation="fn(time*0.25) 0 fn(time*0.125)"
    scale="4"
    color="0 0.5 1"
  >
  </h-viz-ring>
  <h-viz-filter-afterimage amount="0.95"></h-viz-filter-afterimage>
</h-viz-scene>
```

### Particle Field
```html
<h-viz-scene>
  <h-viz-particle-emitter
    position="0 0 0"
    position-jitter="20 20 20"
    ttl="100"
    num="100"
  >
    <h-viz-box
      scale="0.5"
      color="0 0.5 1"
    >
    </h-viz-box>
    <h-viz-box
      scale="0.5"
      color="0 1 0.5"
    >
    </h-viz-box>
  </h-viz-particle-emitter>
</h-viz-scene>
```

### Particle Field Wind
```html
<h-viz-particle-wind direction="1 0 0">
  <h-viz-particle-emitter
    position="0 0 0"
    position-jitter="20 20 20"
    ttl="100"
    num="100"
  >
    <h-viz-box
      scale="0.5"
      color="0 0.5 1"
    >
    </h-viz-box>
    <h-viz-box
      scale="0.5"
      color="0 1 0.5"
    >
    </h-viz-box>
  </h-viz-particle-emitter>
</h-viz-particle-wind>
```

### Particle Field Swarm
```html
<h-viz-scene>
  <h-viz-particle-swarm
    position="addr(part-x) addr(part-y) 0"
    color="0 1 1"
    rotation="45 45 45"
    size="5 5 5"
  >
    <h-viz-particle-emitter
      position="0 0 0"
      position-jitter="20 20 20"
      ttl="100"
      num="100"
    >
      <h-viz-box
        scale="0.5"
        color="0 0.5 1"
      >
      </h-viz-box>
      <h-viz-box
        scale="0.5"
        color="0 1 0.5"
      >
      </h-viz-box>
    </h-viz-particle-emitter>
  </h-viz-particle-swarm>
</h-viz-scene>
```

---
## Complex Examples
```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 30 10"
    stride="fn(5+10*saw(time*0.1)) fn(10*sin(time*0.05)) fn(5*squ(time*0.025))"
    rotation="fn(time*0.015)"
    rot-mod="mod(10*sin(0.0001*time*z)) mod(10*squ(0.0001*x*z)) 45"
    pos-mod="mod(40*squ(0.00001*time*y)) mod(20*sin(0.0001*time*z)) 0"
    color-mod="mod(0.5+sin(0.01*y)) mod(0.5+sin(0.01*y)) mod(0.5+sin(0.01*z))"  
  >
    <h-viz-box
      scale="0.15 0.9 0.1"
      color="0.2 1 0.7"
    >
    </h-viz-box>
  </h-viz-repeat>
  <h-viz-repeat
    repeat="30 30 10"
    stride="fn(5+10*saw(2+time*0.1)) fn(10*sin(2.4+time*0.05)) fn(5*squ(time*0.025))"
    rotation="fn(-time*0.015)"
    rot-mod="mod(10*sin(0.0001*time*z)) mod(10*squ(0.0001*x*z)) 45"
    pos-mod="mod(40*squ(0.00001*time*y)) mod(20*sin(0.0001*time*z)) 0"
    color-mod="mod(0.5+0.5*sin(time*0.001*z)) 0 0"  
  >
    <h-viz-triangle
      scale="0.15 0.9 0.1"
      color="1 0.5 0.5"
    >
    </h-viz-triangle>
  </h-viz-repeat>
  <h-viz-filter-oscillate
    amplitude="fn(0.05+0.05*sin(time*0.1))"
    frequency="0.005"
    period="10"
    type="sin"
  >
  </h-viz-filter-oscillate>
  <h-viz-filter-oscillate
    amplitude="fn(0.1+0.1*sin(time*0.1))"
    frequency="fn(0.005*sin(time*0.005))"
    period="15"
    type="squ"
  >
  </h-viz-filter-oscillate>
</h-viz-scene>
```

```html
<h-viz-scene>
  <h-viz-repeat
    repeat="30 1 20"
    stride="fn(5+10*saw(time*0.1)) fn(10*sin(time*0.05)) fn(5*squ(time*0.025))"
    rot-mod="mod(0.0000001*time*y*z) mod(0.0000001*time*x*z) mod(0.0003*time)"
    rotation="fn(100*squ(time*0.125))"
  >
    <h-viz-box
      scale="0.1 3 0.1"
      color="fn(0.7+0.3*sin(time*0.1)) fn(0.7+0.3*sin(time*0.1)) 1"
    >
    </h-viz-box>
  </h-viz-repeat> 

  <h-viz-repeat
    repeat="50 10 1"
    stride="2.5 10 10"
    rot-mod="mod(10*sin(0.000001*time*y*z)) mod(10*sin(0.0000001*time*x*z)) mod(10*sin(0.0000001*time*x*z))"
    scale-mod="mod(2*sin(2+time*0.0005)) mod(4*sin(time*0.0005)) mod(2*sin(5+time*0.0005))"
  >
    <h-viz-octahedron
      scale="0.5"
      color="0.9"
    >
    </h-viz-octahedron>
  </h-viz-repeat> 
  <h-viz-light
    position="100 40 100"
    color="0.9 1 0.9"
  >
  </h-viz-light>  
  <h-viz-light
    position="100 -40 100"
    color="0.9 0.9 1"
  >
  </h-viz-light>  
  <h-viz-background
    color="1 1 1"
    light-color="1 1 1"
    light-intensity="0.8"
  >
  </h-viz-background>  
</h-viz-scene>
```