import { Color, Mesh, Vector3 } from 'three';
import VectorAttribute from '../VectorAttribute';

export default class BaseGeometry {
  constructor(geometry, material) {
    this.mesh = new Mesh(geometry, material);
    this.positionVelocity = new Vector3();
    this.rotationVelocity = new Vector3();
    this.scaleVelocity = new Vector3();

    this._baseParams = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      rotation: new VectorAttribute(this.setRotation.bind(this)),
      scale: new VectorAttribute(this.setScale.bind(this)),
      color: new VectorAttribute(this.setColor.bind(this)),
      'pos-vel': new VectorAttribute(this.setPositionVelocity.bind(this)),
      'rot-vel': new VectorAttribute(this.setRotationVelocity.bind(this)),
      'scale-vel': new VectorAttribute(this.setScaleVelocity.bind(this)),
    };
    this.paramMap = {};
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  // TODO: remove setters
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

  setPositionVelocity(x, y, z) {
    this.positionVelocity.set(x, y, z);
  }

  setRotationVelocity(x, y, z) {
    this.rotationVelocity.set(x, y, z);
  }

  setScaleVelocity(x, y, z) {
    this.scaleVelocity.set(x, y, z);
  }

  update(elapsedTime, performanceTime) {
    console.log('upate', elapsedTime, performanceTime);
    if (this.positionVelocity.length() !== 0) {
      this.mesh.position.add(this.positionVelocity.clone().multiplyScalar(elapsedTime));
    }
    if (this.rotationVelocity.length() !== 0) {
      const newRotation = this.mesh.rotation.toVector3().add(this.rotationVelocity.clone().multiplyScalar(elapsedTime));
      this.mesh.rotation.setFromVector3(newRotation);
    }
    if (this.scaleVelocity.length() !== 0) {
      this.mesh.scale.add(this.scaleVelocity.clone().multiplyScalar(elapsedTime));
    }
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
  }

  dispose() {
    console.log('TODO: BaseGeometry.dispose');
  }

  getThreeMesh() {
    return this.mesh;
  }
}
