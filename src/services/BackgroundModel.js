import { Color } from 'three';
import ScalarAttribute from './Attribute/ScalarAttribute';
import VectorAttribute from './Attribute/VectorAttribute';
import sceneManager from './SceneManager';

export default class BackgroundModel {
  constructor() {
    this.paramMap = {
      color: new VectorAttribute(this.setColor.bind(this)),
      'light-color': new VectorAttribute(this.setLightColor.bind(this)),
      'light-intensity': new ScalarAttribute(this.setLightIntensity.bind(this)),
    };
    sceneManager.addSceneObject(this);
  }

  dispose() {
    sceneManager.removeSceneObject(this);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setColor(r, g, b) {
    sceneManager.setBackgroundColor(new Color(r, g, b));
  }

  setLightColor(r, g, b) {
    sceneManager.setAmbientLightColor(new Color(r, g, b));
  }

  setLightIntensity(val) {
    sceneManager.setAmbientLightIntensity(val);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
