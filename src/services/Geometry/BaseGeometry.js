import { Color, Mesh, Vector3 } from 'three';

export default class BaseGeometry {
  constructor(geometry, material) {
    this.mesh = new Mesh(geometry, material);
    this.positionVelocity = new Vector3();
    this.rotationVelocity = new Vector3();
    this.scaleVelocity = new Vector3();
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

  setPositionVelocity(x, y, z) {
    this.positionVelocity.set(x, y, z);
  }

  setRotationVelocity(x, y, z) {
    this.rotationVelocity.set(x, y, z);
    console.log(this.mesh.rotation)
  }

  setScaleVelocity(x, y, z) {
    this.scaleVelocity.set(x, y, z);
  }

  update() {
    if (this.positionVelocity.length() !== 0) {
      this.mesh.position.add(this.positionVelocity);
    }
    if (this.rotationVelocity.length() !== 0) {
      const newRotation = this.mesh.rotation.toVector3().add(this.rotationVelocity);
      this.mesh.rotation.setFromVector3(newRotation);
    }
    if (this.scaleVelocity.length() !== 0) {
      this.mesh.scale.add(this.scaleVelocity);
    }
  }

  dispose() {
    console.log('TODO: BaseGeometry.dispose');
  }

  getThreeMesh() {
    return this.mesh;
  }
}
