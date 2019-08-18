import { Vector2 } from 'three';
import VectorAttribute from '../../Attribute/VectorAttribute';
import sceneManager from '../../SceneManager';
import Shader from '../Shader';
import vertextShader from './Pixelate.vert';
import fragmentShader from './Pixelate.frag';

// https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/AfterimagePass.js
export default class AfterImageFilter {
  constructor() {
    this.paramMap = {
      amount: new VectorAttribute(this.setAmount.bind(this)),
    };
    const uniforms = {
      damp: { value: 0.96 },
      tOld: { value: null },
      tNew: { value: null }
    };
    this.shader = new Shader(uniforms, vertextShader, fragmentShader);
    const resolution = new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(window.devicePixelRatio);
    this.shader.setUniform('resolution', resolution);
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
  }
}
