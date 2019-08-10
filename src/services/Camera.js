import VectorAttribute from './Attribute/VectorAttribute';

export default class CameraModel {
  constructor() {
    this.paramMap = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      lookat: new VectorAttribute(this.setLookAt.bind(this)),
    };
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setPosition(x, y, z) {
    console.log('TODO: set camera position', x, y, z);
  }

  setLookAt(x, y, z) {
    console.log('TODO: set ambient color', x, y, z);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
