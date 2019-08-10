import { Color, PointLight } from 'three';
import VectorAttribute from './Attribute/VectorAttribute';

export default class Light {
  constructor() {
    this.light = new PointLight();
    this.paramMap = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      color: new VectorAttribute(this.setColor.bind(this)),
      intensity: {
        setValue: val => console.log('TODO: light intensity', val),
        update: () => {},
      },
    };
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setPosition(x, y, z) {
    this.light.position.set(x, y, z);
  }

  setColor(r, g, b) {
    this.light.color = new Color(r, g, b);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }

  dispose() {
    console.log('TODO: Light.dispose');
  }

  getThreeMesh() {
    return this.light;
  }
}
