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
    const numInstances = vars.repeat.x * vars.repeat.y * vars.repeat.z;
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

    const halfX = ((this.vars.repeat.x * this.vars.stride.x) / 2) - this.vars.position.x;
    const halfY = ((this.vars.repeat.y * this.vars.stride.y) / 2) - this.vars.position.y;
    const halfZ = ((this.vars.repeat.z * this.vars.stride.z) / 2) - this.vars.position.z;

    this.geoProperties.forEach((geoProperty, index) => {
      const z = index % this.vars.repeat.z;
      const y = Math.floor(index / this.vars.repeat.z) % this.vars.repeat.y;
      const x = Math.floor(index / (this.vars.repeat.y * this.vars.repeat.z)) % this.vars.repeat.x;
      geoProperty.position = new Vector3(
        x * this.vars.stride.x - halfX,
        y * this.vars.stride.y - halfY,
        z * this.vars.stride.z - halfZ
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
    this.cluster.needsUpdate('position');
    // this.cluster.needsUpdate('quaternion');
    // this.cluster.needsUpdate('scale');
    if (this.needsReset) {
      this.needsReset = false;
    }
  }

  setVars(vars) {
    this.vars = vars;
    this.needsReset = true;
  }

  update(elapsedTime) {
    if (this.needsReset) {
      this.reset();
    }
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
