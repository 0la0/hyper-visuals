import { Euler, Quaternion, Vector3 } from 'three';
import InstancedMesh from './InstanceMeshProvider';

class GeoProperties {
  constructor() {
    this.position = new Vector3();
    this.positionVelocity = new Vector3();
    this.rotation = new Vector3(),
    this.rotationVelocity = new Vector3(),
    this.scale = new Vector3();
  }
}

export default class Repeater {
  constructor(geometry, material, vars) {
    const numInstances = vars.repeatX * vars.repeatY * vars.repeatZ;
    this.cluster = new InstancedMesh(
      geometry,
      material,
      numInstances,
      true,  // dynamic
      false, // color
      true,  // uniform scale
    );
    this.vars = vars;
    this.geoProperties = new Array(numInstances).fill(null).map(_ => new GeoProperties());
    this.reset();
  }

  reset() {
    const _q = new Quaternion(1, 0, 0, 1);

    const halfX = ((this.vars.repeatX * this.vars.strideX) / 2) - this.vars.position.x;
    const halfY = ((this.vars.repeatY * this.vars.strideY) / 2) - this.vars.position.y;
    const halfZ = ((this.vars.repeatZ * this.vars.strideZ) / 2) - this.vars.position.z;

    this.geoProperties.forEach((geoProperty, index) => {
      const z = index % this.vars.repeatZ;
      const y = Math.floor(index / this.vars.repeatZ) % this.vars.repeatY;
      const x = Math.floor(index / (this.vars.repeatY * this.vars.repeatZ)) % this.vars.repeatX;
      geoProperty.position = new Vector3(
        x * this.vars.strideX - halfX,
        y * this.vars.strideY - halfY,
        z * this.vars.strideZ - halfZ
      );
      geoProperty.positionVelocity = this.vars.positionVelocity.clone();
      geoProperty.rotation = this.vars.rotation.clone();
      geoProperty.rotationVelocity = this.vars.rotateVelocity.clone();
      geoProperty.scale = this.vars.scale.clone();
    });

    this.geoProperties.forEach((geoProperty, index) => {
      this.cluster.setQuaternionAt(index , _q.setFromEuler(new Euler().setFromVector3(geoProperty.rotation, 'XYZ')));
      this.cluster.setPositionAt(index , geoProperty.position);
      this.cluster.setScaleAt(index , geoProperty.scale);
    });
  }

  update(elapsedTime) {
    // TODO: short circuit
    this.geoProperties.forEach((geoProperty, index) => {
      const quat = this.cluster.getQuaternionAt(index);
      geoProperty.rotation.add(geoProperty.rotationVelocity.clone().multiplyScalar(elapsedTime * 0.1));
      this.cluster.setQuaternionAt(index, quat.setFromEuler(new Euler().setFromVector3(geoProperty.rotation, 'XYZ')));
      // this.cluster.setPositionAt(index, geoProperty.position.add(geoProperty.positionVelocity.clone().multiplyScalar(elapsedTime * 0.1)));
    });
    this.cluster.needsUpdate('quaternion');
    // this.cluster.needsUpdate('position');
  }

  dispose() {
    console.log('TODO: Repeater.dispose');
  }

  getThreeMesh() {
    return this.cluster;
  }
}
