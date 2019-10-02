import { Vector2 } from 'three';
import VectorAttribute from '../../Attribute/VectorAttribute';
import sceneManager from '../../SceneManager';
import Shader from '../Shader';
import vertextShader from './Pixelate.vert';
import fragmentShader from './Pixelate.frag';

export default class PixelateFilter {
  constructor() {
    this.paramMap = {
      amount: new VectorAttribute(this.setAmount.bind(this)),
    };
    const uniforms = {
      tDiffuse: { value: null },
      resolution: { value: null },
      pixelSize: { value: 1.0 },
    };
    const resolution = new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio);
    this.shader = new Shader(uniforms, vertextShader, fragmentShader);
    this.shader.setUniform('resolution', resolution);
    sceneManager.addEffect(this.shader);
    sceneManager.addSceneObject(this);
  }

  dispose() {
    sceneManager.removeEffect(this.shader);
    sceneManager.removeSceneObject(this);
    this.shader = null;
    this.paramMap = null;
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setAmount(x, y) {
    this.shader.setUniform('pixelSize', x);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
