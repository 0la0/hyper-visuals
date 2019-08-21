uniform sampler2D tDiffuse;
varying highp vec2 vUv;
uniform float time;
uniform float amplitude;
uniform float frequency;

float positionBuffer = 0.1;

void main() {
  vec2 xPosition = vUv + positionBuffer;
  vec2 yPosition = vUv - positionBuffer;
  vec2 modulatedPosition = vec2(
    vUv.x - clouds(xPosition * amplitude, time * frequency),
    vUv.y - clouds(yPosition * amplitude, time * frequency)
  );
  gl_FragColor = texture2D(tDiffuse, modulatedPosition);
}
