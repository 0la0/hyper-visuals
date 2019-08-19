import ScalarAttribute from '../../Attribute/ScalarAttribute';
import sceneManager from '../../SceneManager';
import Shader from '../Shader';
import vertextShader from './Oscillator.vert';
import fragmentShader from './Oscillator.frag';

export default class OscillationFilter {
  constructor() {
    this.paramMap = {
      amplitude: new ScalarAttribute(this.setAmplitude.bind(this)),
      frequency: new ScalarAttribute(this.setFrequency.bind(this)),
      period: new ScalarAttribute(this.setPeriod.bind(this)),
    };
    const uniforms = {
      tDiffuse: { value: null },
      time: { value: 0 },
      amplitude: { value: 0 },
      frequency: { value: 0 },
      period: { value: 0 },
    };
    this.shader = new Shader(uniforms, vertextShader, fragmentShader);
    sceneManager.addEffect(this.shader);
    sceneManager.addSceneObject(this);
  }

  dispose() {
    sceneManager.removeEffect(this.shader);
    sceneManager.removeSceneObject(this);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    this.shader.setUniform('time', performanceTime);
  }

  setAmplitude(amplitude) {
    this.shader.setUniform('amplitude', amplitude);
  }

  setFrequency(frequency) {
    this.shader.setUniform('frequency', frequency);
  }

  setPeriod(period) {
    this.shader.setUniform('period', period);
  }
}
