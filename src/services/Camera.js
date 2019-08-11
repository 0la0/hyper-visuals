import VectorAttribute from './Attribute/VectorAttribute';
import sceneManager from './SceneManager';

export default class CameraModel {
  constructor() {
    this.paramMap = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      rotation: new VectorAttribute(this.setRotation.bind(this)),
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

  setPosition(x, y, z) {
    sceneManager.setCameraPosition(x, y, z);
  }

  setRotation(x, y, z) {
    sceneManager.setCameraRotation(x, y, z);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
