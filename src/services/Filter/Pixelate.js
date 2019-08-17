import { Vector2 } from 'three';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import VectorAttribute from '../Attribute/VectorAttribute';
import sceneManager from '../SceneManager';

export default class PixelateFilter {
  constructor() {
    // this.mesh = new Mesh(geometry, material);
    this.paramMap = {
      amount: new VectorAttribute(this.setAmount.bind(this)),
    };

    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_pixel.html
    this.pixelPass = new ShaderPass(PixelShader);
    this.pixelPass.uniforms.resolution.value = new Vector2(window.innerWidth, window.innerHeight);
    this.pixelPass.uniforms.resolution.value.multiplyScalar(window.devicePixelRatio);
    this.pixelPass.uniforms.pixelSize.value = 14;

    sceneManager.addEffect(this.pixelPass);
  }

  dispose() {
    sceneManager.removeEffect(this.pixelPass);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setAmount(x, y) {
    this.pixelPass.uniforms.pixelSize.value = x;
  }
}