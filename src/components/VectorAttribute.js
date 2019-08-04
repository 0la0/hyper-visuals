const PARENTHESES = /\(([^)]+)\)/;

class MessageAttribute {
  constructor(addr, cb = (() => {})) {
    this.addr = addr;
    this.cb = cb;
    
    // setInterval(() => {
    //   console.log('simulate addr change', Math.random())
    //   const simulatedValue = Math.random();
    //   this.cb(simulatedValue);
    // }, 2000);
  }

  setCallback(cb) {
    this.cb = cb;
  }
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
    const match = stringValue.match(PARENTHESES);
    if (!match) {
      return numericValue;
    }
    return new MessageAttribute(match[1]);
  }
  return numericValue;
}

export default class VectorAttribute {
  constructor(setter) {
    this._setter = setter;
    this.realX;
    this.realY;
    this.realZ;
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
    } else {
      this.realX = x;
    }

    if (y instanceof MessageAttribute) {
      y.setCallback((dynamicValue) => {
        this.realY = dynamicValue;
        this._setAllAttributes();
      });
    } else {
      this.realY = y;
    }

    if (z instanceof MessageAttribute) {
      z.setCallback((dynamicValue) => {
        this.realZ = dynamicValue;
        this._setAllAttributes();
      });
    } else {
      this.realZ = z;
    }
    
    this._setAllAttributes();
  }
}
