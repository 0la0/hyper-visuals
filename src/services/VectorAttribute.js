import AnimationScheduler, { AnimationSchedule } from './AnimationScheduler';
import { parseParens } from './ParamParser';

// class TestEventEmitter {
//   constructor() {
//     this.isOn = false;
//   }

//   start() {
//     this.isOn = true;
//     this.loop();
//   }

//   stop() {
//     this.isOn = false;
//   }

//   loop() {
//     if (!this.isOn) {
//       return;
//     }
//     const now = performance.now();
//     const eventData1 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now + 500, },
//       interpolate: false,
//     };
//     const eventData2 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now  + 1000, },
//       interpolate: false,
//     };
//     const eventData3 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now + 1500, },
//       interpolate: false,
//     };
//     const eventData4 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now  + 1800, },
//       interpolate: false,
//     };
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData1 }));
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData2 }));
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData3 }));
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData4 }));
//     setTimeout(this.loop.bind(this), 2000);
//   }
// }

// const timer = new TestEventEmitter();
// timer.start();

class MessageAttribute {
  constructor(addr, cb = (() => {})) {
    this.addr = addr;
    this.eventHandler = (event) => {
      const message = event.detail;
      this.animationScheduler.submit(
        new AnimationSchedule(message.time.midi, message.note)
      );
    };
    this.cb = cb;
    this.animationScheduler = new AnimationScheduler();
    document.addEventListener('GLOBAL_EVENT', this.eventHandler);
  }

  setCallback(cb) {
    this.cb = cb;
  }

  update(elapsedTime, performanceTime) {
    const scheduledValue = this.animationScheduler.getLatestSchedule(performanceTime);
    if (scheduledValue === false) {
      return;
    }
    this.cb(scheduledValue);
  }

  dispose() {}
}

class EvaluatedAttribute {
  constructor(stringValue, cb = (() => {})) {
    this.stringValue = stringValue;
    this.cb = cb;
  }

  setCallback(cb) {
    this.cb = cb;
  }

  update(elapsedTime, performanceTime) {
    console.log('EvaluatedAttribute.performanceTime', performanceTime);
  }

  dispose() {}
}

function numericOrDefault(stringValue = '', defaultValue = 0) {
  const numericValue = parseFloat(stringValue, 10);
  if (Number.isNaN(numericValue)) {
    return defaultValue;
  }
  return numericValue;
}

function parseAttribute(stringValue) {
  const numericValue = numericOrDefault(stringValue, 0);
  if (stringValue.indexOf('addr') === 0) {
    const parsedAddress = parseParens(stringValue);
    if (!parsedAddress.ok) {
      return numericValue;
    }
    return new MessageAttribute(parsedAddress.value);
  }
  if (stringValue.indexOf('fn') === 0) {
    const parsedFn = parseParens(stringValue);
    if (!parsedFn.ok) {
      return numericValue;
    }
    new EvaluatedAttribute(parsedFn.value);
    return numericValue;
  }
  return numericValue;
}

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
      if (x instanceof MessageAttribute) {
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

    if (x instanceof MessageAttribute) {
      x.setCallback((dynamicValue) => {
        this.realX = dynamicValue;
        this._setAllAttributes();
      });
      this.dynamicParams.x = x;
    } else {
      this.realX = x;
      this.dynamicParams.x = null;
    }

    if (y instanceof MessageAttribute) {
      y.setCallback((dynamicValue) => {
        this.realY = dynamicValue;
        this._setAllAttributes();
      });
      this.dynamicParams.y = y;
    } else {
      this.realY = y;
      this.dynamicParams.y = null;
    }

    if (z instanceof MessageAttribute) {
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
