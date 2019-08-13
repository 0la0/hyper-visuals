import ContinuousAttribute from './ContinuousAttribute';
import MessageAttribute from './MessageAttribute';
import { parseAttribute } from './AttributeParser';

export default class ScalarAttribute {
  constructor(setter) {
    this._setter = setter;
    this.realValue;
    this.dynamicRef;
  }

  _setAllAttributes() {
    this._setter(this.realX, this.realY, this.realZ);
  }

  setValue(stringValue) {
    const parsedValue = parseAttribute(stringValue.trim());
    if (parsedValue instanceof MessageAttribute || parsedValue instanceof ContinuousAttribute) {
      parsedValue.setCallback((dynamicValue) => {
        this.realValue = dynamicValue;
        this._setter(this.realValue);
      });
      this.dynamicRef = parsedValue;
    } else {
      this.realValue = parsedValue;
      this.dynamicRef = null;
    }
    this._setter(this.realValue);
  }

  update(elapsedTime, performanceTime) {
    if (this.dynamicRef) {
      this.dynamicRef.update(elapsedTime, performanceTime);
    }
  }
}
