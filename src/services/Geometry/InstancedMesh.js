import { Euler, Quaternion, Vector3 } from 'three';
import InstancedMesh from './InstanceMeshProvider';
import VectorAttribute from '../Attribute/VectorAttribute';

class GeoProperties {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3(),
    this.scale = new Vector3();
  }
}

export default class Repeater {
  constructor(vars) {
    this.vars = Object.assign(
      {
        repeat: new Vector3(1, 1, 1),
        stride: new Vector3(1, 1, 1)
      },
      {
        lastPosition: vars.position.clone(),
      },
      vars
    );
    console.log('rotation?', this.vars.rotation);
    this.paramMap = {
      repeat: new VectorAttribute(this.setRepeat.bind(this)),
      stride: new VectorAttribute(this.setStride.bind(this)),
      position: new VectorAttribute(this.setPosition.bind(this)),
      rotation: new VectorAttribute(this.setRotation.bind(this)),
      scale: new VectorAttribute(this.setScale.bind(this)),
    };
  }

  init(geometry, material) {
    const numInstances = this.vars.repeat.x * this.vars.repeat.y * this.vars.repeat.z;
    this.cluster = new InstancedMesh(
      geometry,
      material,
      numInstances,
      true,  // dynamic
      false, // color
      true,  // uniform scale
    );
    this.geoProperties = new Array(numInstances).fill(null).map(_ => new GeoProperties());
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
      geoProperty.rotation = this.vars.rotation.clone();
      geoProperty.scale = this.vars.scale.clone();
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

  setPosition(x, y, z) {
    this.cluster && this.cluster.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.cluster && this.cluster.rotation.set(x, y, z);
  }

  setScale(x, y, z) {
    this.cluster && this.cluster.scale.set(x, y, z);
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    if (this.needsReset) {
      this.reset();
    }

    if (!this.vars.position.equals(this.vars.lastPosition)) { // last position?
      const positionDiff = this.vars.lastPosition.clone().sub(this.vars.position);
      this.geoProperties.forEach((geoProperty, index) => {
        this.cluster.setPositionAt(index, geoProperty.position.add(positionDiff));
      });
      this.cluster.needsUpdate('position');
      this.vars.lastPosition = this.vars.position.clone();
    }

    this.geoProperties.forEach((geoProperty, index) => {
      const quat = this.cluster.getQuaternionAt(index);
      // TODO: short circuit
      this.cluster.setQuaternionAt(index, quat.setFromEuler(this.vars.rotation));
      // TODO: short circuit
      this.cluster.setScaleAt(index, this.vars.scale);
    });
    this.cluster.needsUpdate('quaternion');
    this.cluster.needsUpdate('scale');
  }

  dispose() {
    console.log('TODO: Repeater.dispose');
  }

  getThreeMesh() {
    return this.cluster;
  }
}
