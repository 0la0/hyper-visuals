import ContinuousAttribute from './ContinuousAttribute';
import MessageAttribute from './MessageAttribute';
import { parseAttribute } from './AttributeParser';

export default class VectorAttribute {
  constructor(setter) {
    this._setter = setter;
    this.realX;
    this.realY;
    this.realZ;
    this.dynamicParams = {};
  }

  _setAllAttributes() {
    this._setter(this.realX, this.realY, this.realZ);
  }

  setValue(stringValue) {
    const [ xStr, yStr, zStr ] = stringValue.trim().split(/\s+/);
    const x = parseAttribute(xStr);
    
    if (yStr === undefined && zStr === undefined) {
      if (x instanceof MessageAttribute || x instanceof ContinuousAttribute) {
        x.setCallback((dynamicValue) => {
          this.realX = dynamicValue;
          this.realY = dynamicValue;
          this.realZ = dynamicValue;
          this._setAllAttributes();
        });
        this.dynamicParams.x = x;
        this.dynamicParams.y = null;
        this.dynamicParams.z = null;
        return;
      }
      this.realX = x;
      this.realY = x;
      this.realZ = x;
      this._setAllAttributes();
      return;
    }

    const y = parseAttribute(yStr);
    const z = parseAttribute(zStr);

    if (x instanceof MessageAttribute || x instanceof ContinuousAttribute) {
      x.setCallback((dynamicValue) => {
        this.realX = dynamicValue;
        this._setAllAttributes();
      });
      this.dynamicParams.x = x;
    } else {
      this.realX = x;
      this.dynamicParams.x = null;
    }

    if (y instanceof MessageAttribute || y instanceof ContinuousAttribute) {
      y.setCallback((dynamicValue) => {
        this.realY = dynamicValue;
        this._setAllAttributes();
      });
      this.dynamicParams.y = y;
    } else {
      this.realY = y;
      this.dynamicParams.y = null;
    }

    if (z instanceof MessageAttribute || z instanceof ContinuousAttribute) {
      z.setCallback((dynamicValue) => {
        this.realZ = dynamicValue;
        this._setAllAttributes();
      });
      this.dynamicParams.z = z;
    } else {
      this.realZ = z;
      this.dynamicParams.z = null;
    }
    
    this._setAllAttributes();
  }

  update(elapsedTime, performanceTime) {
    this.dynamicParams.x && this.dynamicParams.x.update(elapsedTime, performanceTime);
    this.dynamicParams.y && this.dynamicParams.y.update(elapsedTime, performanceTime);
    this.dynamicParams.z && this.dynamicParams.z.update(elapsedTime, performanceTime);
  }
}
