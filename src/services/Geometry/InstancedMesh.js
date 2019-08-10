import { Euler, Quaternion, Vector3 } from 'three';
import InstancedMesh from './InstanceMeshProvider';
import VectorAttribute from '../Attribute/VectorAttribute';

class GeoProperties {
  constructor() {
    this.position = new Vector3();
    this.positionVelocity = new Vector3();
    this.rotation = new Vector3(),
    this.rotationVelocity = new Vector3(),
    this.scale = new Vector3();
    this.scaleVelocity = new Vector3();
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
    this.paramMap = {
      repeat: new VectorAttribute(this.setRepeat.bind(this)),
      stride: new VectorAttribute(this.setStride.bind(this)),
    };
    this.reset();
  }

  reset() {
    const _q = new Quaternion(1, 0, 0, 1);
    const center = this.vars.repeat.clone()
      .multiply(this.vars.stride)
      .multiplyScalar(0.5)
      .sub(this.vars.position);

    this.geoProperties.forEach((geoProperty, index) => {
      const z = index % this.vars.repeat.z;
      const y = Math.floor(index / this.vars.repeat.z) % this.vars.repeat.y;
      const x = Math.floor(index / (this.vars.repeat.y * this.vars.repeat.z)) % this.vars.repeat.x;
      geoProperty.position = new Vector3(
        x * this.vars.stride.x - center.x,
        y * this.vars.stride.y - center.y,
        z * this.vars.stride.z - center.z
      );
      geoProperty.positionVelocity = this.vars.positionVelocity.clone();
      geoProperty.rotation = this.vars.rotation.clone();
      geoProperty.rotationVelocity = this.vars.rotationVelocity.clone();
      geoProperty.scale = this.vars.scale.clone();
      geoProperty.scaleVelocity = this.vars.scaleVelocity.clone();

      this.cluster.setQuaternionAt(index , _q.setFromEuler(new Euler().setFromVector3(geoProperty.rotation, 'XYZ')));
      this.cluster.setPositionAt(index , geoProperty.position);
      this.cluster.setScaleAt(index , geoProperty.scale);
    });
    this.cluster.needsUpdate('position');
    this.cluster.needsUpdate('quaternion');
    this.cluster.needsUpdate('scale');
    if (this.needsReset) {
      this.needsReset = false;
    }
  }

  setVars(vars) {
    this.vars = vars;
    this.needsReset = true;
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setRepeat(x, y, z) {
    this.vars.repeat.set(x, y, z);
    this.needsReset = true;
  }

  setStride(x, y, z) {
    this.vars.stride.set(x, y, z);
    this.needsReset = true;
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    if (this.needsReset) {
      this.reset();
    }
    // TODO: short circuit
    this.geoProperties.forEach((geoProperty, index) => {
      const quat = this.cluster.getQuaternionAt(index);
      const rotationDiff = geoProperty.rotationVelocity.clone().multiplyScalar(elapsedTime * 0.1);
      geoProperty.rotation.setFromVector3(geoProperty.rotation.toVector3().add(rotationDiff));
      this.cluster.setQuaternionAt(index, quat.setFromEuler(new Euler().setFromVector3(geoProperty.rotation, 'XYZ')));
      this.cluster.setPositionAt(index, geoProperty.position.add(geoProperty.positionVelocity.clone().multiplyScalar(elapsedTime)));
      this.cluster.setScaleAt(index, geoProperty.scale.add(geoProperty.scaleVelocity.clone().multiplyScalar(elapsedTime)));
    });
    this.cluster.needsUpdate('quaternion');
    this.cluster.needsUpdate('position');
    this.cluster.needsUpdate('scale');
  }

  dispose() {
    console.log('TODO: Repeater.dispose');
  }

  getThreeMesh() {
    return this.cluster;
  }
}
