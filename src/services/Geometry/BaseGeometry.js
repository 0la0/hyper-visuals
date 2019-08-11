import { Color, Mesh, Vector3 } from 'three';
import VectorAttribute from '../Attribute/VectorAttribute';

export default class BaseGeometry {
  constructor(geometry, material) {
    this.mesh = new Mesh(geometry, material);
    this._baseParams = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      rotation: new VectorAttribute(this.setRotation.bind(this)),
      scale: new VectorAttribute(this.setScale.bind(this)),
      color: new VectorAttribute(this.setColor.bind(this)),
    };
    this.paramMap = {};
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.mesh.rotation.set(x, y, z);
  }

  setScale(x, y, z) {
    this.mesh.scale.set(x, y, z);
  }

  setColor(r, g, b) {
    this.mesh.material.color = new Color(r, g, b);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }

  dispose() {
    console.log('TODO: BaseGeometry.dispose');
  }

  getThreeMesh() {
    return this.mesh;
  }
}
