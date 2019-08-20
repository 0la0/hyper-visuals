export default class StringAttribute {
  constructor(setter) {
    this._setter = setter;
  }

  setValue(stringValue) {
    this._setter(stringValue);
  }

  update() {}
}
