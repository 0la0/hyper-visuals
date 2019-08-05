import { ConeBufferGeometry, FrontSide, MeshLambertMaterial } from 'three';
import BaseGeomtry from './BaseGeometry';

export default class Cone extends BaseGeomtry {
  constructor() {
    super(
      new ConeBufferGeometry(5, 20, 32),
      new MeshLambertMaterial({ color: 0x006699, side: FrontSide })
    );
    this.paramMap = Object.assign({}, this._baseParams);
  }
}
