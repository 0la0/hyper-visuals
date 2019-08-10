import { Color } from 'three';
import VectorAttribute from './Attribute/VectorAttribute';
import sceneManager from './SceneManager';

export default class BackgroundModel {
  constructor() {
    this.paramMap = {
      color: new VectorAttribute(this.setColor.bind(this)),
      'light-color': new VectorAttribute(this.setLightColor.bind(this)),
      'light-intensity': {
        setValue: val => console.log('TODO: ambient light intensity', val),
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

  setColor(r, g, b) {
    console.log('TODO: set background color', r, g, b);
    sceneManager.setBackgroundColor(new Color(r, g, b));
  }

  setLightColor(r, g, b) {
    console.log('TODO: set ambient color', r, g, b);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }
}
