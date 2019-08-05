import { BoxBufferGeometry, FrontSide, MeshLambertMaterial } from 'three';
import BaseGeomtry from './BaseGeometry';

export default class Box extends BaseGeomtry {
  constructor() {
    super(
      new BoxBufferGeometry(1, 1, 1),
      new MeshLambertMaterial({ color: 0x006699, side: FrontSide })
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}
