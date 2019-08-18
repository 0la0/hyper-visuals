uniform sampler2D tDiffuse;
varying highp vec2 vUv;

void main() {
  gl_FragColor = texture2D(tDiffuse, vUv);
}
