import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import ScalarAttribute from '../../Attribute/ScalarAttribute';
import sceneManager from '../../SceneManager';

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_afterimage.html

export default class AfterImageFilter {
  constructor() {
    this.afterImagePass = { shaderPass: new AfterimagePass(), };
    this.paramMap = {
      amount: new ScalarAttribute(this.setAmount.bind(this)),
    };
    sceneManager.addEffect(this.afterImagePass);
    sceneManager.addSceneObject(this);
  }

  dispose() {
    sceneManager.removeEffect(this.afterImagePass);
    sceneManager.removeSceneObject(this);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setAmount(amount = 0) {
    this.afterImagePass.shaderPass.uniforms.damp.value = amount;
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
