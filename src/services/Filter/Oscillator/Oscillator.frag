uniform sampler2D tDiffuse;
varying highp vec2 vUv;
uniform float time;

void main() {
  // TODO: do this in the vertex shader?
  float frequency = 0.005;
  float modY = vUv.y + 0.04 * sin(vUv.x * time * frequency);
  vec2 modPosition = vec2(vUv.x, modY);
  
  gl_FragColor = texture2D(tDiffuse, modPosition);
}
