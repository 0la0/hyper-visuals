uniform sampler2D tDiffuse;
varying highp vec2 vUv;
uniform float time;
uniform float amplitude;
uniform float frequency;
uniform float period;
uniform float rotation;
uniform int type;

vec2 rotateVector(vec2 position, float deg) {
  float angle = radians(deg);
  vec2 origin = vec2(0.5, 0.5);
  float cosAngle = cos(angle);
  float sinAngle = sin(angle);
  float x = ((position.x - origin.x) * cosAngle) - ((position.y - origin.y) * sinAngle) + origin.x;
  float y = ((position.x - origin.x) * sinAngle) + ((position.y - origin.y) * cosAngle) + origin.y;
  return vec2(x, y);
}

float wrap(float x) {
  float wrap;
  if (x < 0.0) {
    wrap = x + 1.0;
  } else if (x > 1.0) {
    wrap = x - 1.0;
  } else {
    wrap = x;
  }
  return wrap;
}

float oscillate(float x) {
  if (type == 1) {
    // square
    return sin(x) >= 0.0 ? 1.0 : -1.0;
  }
  if (type == 2) {
    // sawtooth
    return fract(x);
  }
  return sin(x);
}

void main() {
  vec2 rotatedVec = rotateVector(vUv, rotation);
  float modY = vUv.y + amplitude * oscillate((rotatedVec.x * period) + time * frequency);
  vec2 modulatedPosition = vec2(vUv.x, modY);
  vec2 wrappedPosition = vec2(wrap(modulatedPosition.x), wrap(modulatedPosition.y));
  gl_FragColor = texture2D(tDiffuse, wrappedPosition);
}
