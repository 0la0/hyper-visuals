import ContinuousAttribute from './ContinuousAttribute';
import MessageAttribute from './MessageAttribute';
import { parseAttribute } from './AttributeParser';

export default class ScalarAttribute {
  constructor(setter) {
    this._setter = setter;
    this.realValue;
    // this.dynamicParams = {};
    this.dynamicRef;
  }

  _setAllAttributes() {
    this._setter(this.realX, this.realY, this.realZ);
  }

  setValue(stringValue) {
    const parsedValue = parseAttribute(stringValue.trim());
    console.log('parsedVAlue', parsedValue)
    
    // if (yStr === undefined && zStr === undefined) {
    //   if (x instanceof MessageAttribute || x instanceof ContinuousAttribute) {
    //     x.setCallback((dynamicValue) => {
    //       this.realX = dynamicValue;
    //       this.realY = dynamicValue;
    //       this.realZ = dynamicValue;
    //       this._setAllAttributes();
    //     });
    //     this.dynamicParams.x = x;
    //     this.dynamicParams.y = null;
    //     this.dynamicParams.z = null;
    //     return;
    //   }
    //   this.realX = x;
    //   this.realY = x;
    //   this.realZ = x;
    //   this._setAllAttributes();
    //   return;
    // }

    // const y = parseAttribute(yStr);
    // const z = parseAttribute(zStr);

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

    // if (y instanceof MessageAttribute || y instanceof ContinuousAttribute) {
    //   y.setCallback((dynamicValue) => {
    //     this.realY = dynamicValue;
    //     this._setAllAttributes();
    //   });
    //   this.dynamicParams.y = y;
    // } else {
    //   this.realY = y;
    //   this.dynamicParams.y = null;
    // }

    // if (z instanceof MessageAttribute || z instanceof ContinuousAttribute) {
    //   z.setCallback((dynamicValue) => {
    //     this.realZ = dynamicValue;
    //     this._setAllAttributes();
    //   });
    //   this.dynamicParams.z = z;
    // } else {
    //   this.realZ = z;
    //   this.dynamicParams.z = null;
    // }
    
    // this._setAllAttributes();
    this._setter(this.realValue);
  }

  update(elapsedTime, performanceTime) {
    // console.log('....', this.dynamicRef)
    if (this.dynamicRef) {
      this.dynamicRef.update(elapsedTime, performanceTime);
    }
    // this.dynamicRef && this.dynamicParams.x.update(elapsedTime, performanceTime);
    // this.dynamicParams.y && this.dynamicParams.y.update(elapsedTime, performanceTime);
    // this.dynamicParams.z && this.dynamicParams.z.update(elapsedTime, performanceTime);
  }
}
