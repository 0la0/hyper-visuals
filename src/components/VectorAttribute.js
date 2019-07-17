
export default class VectorAttribute {
  constructor(setter) {
    this._setter = setter;
  }

  setValue(stringValue) {
    const [ xStr, yStr, zStr ] = stringValue.trim().split(/\s+/);
    const x = parseFloat(xStr, 10);
    const y = parseFloat(yStr, 10);
    const z = parseFloat(zStr, 10);
    this._setter(x, y, z);
  }
}
