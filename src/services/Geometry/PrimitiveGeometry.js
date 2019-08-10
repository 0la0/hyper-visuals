import {
  BoxBufferGeometry,
  ConeBufferGeometry,
  FrontSide,
  MeshLambertMaterial
} from 'three';
import BaseGeomtry from './BaseGeometry';

export class Box extends BaseGeomtry {
  constructor() {
    super(
      new BoxBufferGeometry(1, 1, 1),
      new MeshLambertMaterial({ color: 0x006699, side: FrontSide })
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}

export class Cone extends BaseGeomtry {
  constructor() {
    super(
      new ConeBufferGeometry(5, 20, 32),
      new MeshLambertMaterial({ color: 0x006699, side: FrontSide })
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}
