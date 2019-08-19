uniform sampler2D tDiffuse;
varying highp vec2 vUv;
uniform float time;
uniform float amplitude;
uniform float frequency;
uniform float period;

void main() {
  float modY = vUv.y + amplitude * sin((vUv.x * period) + time * frequency);
  vec2 modPosition = vec2(vUv.x, modY);
  gl_FragColor = texture2D(tDiffuse, modPosition);
}
