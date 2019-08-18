import { Vector2 } from 'three';
import VectorAttribute from '../../Attribute/VectorAttribute';
import sceneManager from '../../SceneManager';
import Shader from '../Shader';
import vertextShader from './Oscillator.vert';
import fragmentShader from './Oscillator.frag';

export default class OscillationFilter {
  constructor() {
    this.paramMap = {
      // amount: new VectorAttribute(this.setAmount.bind(this)),
    };
    const uniforms = {
      tDiffuse: { value: null },
      time: { value: 0 },
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
}
