import { Color, Euler, Quaternion, Vector3, Vector2 } from 'three';
import InstancedMesh from './InstanceMeshProvider';
import VectorAttribute from '../Attribute/VectorAttribute';

class GeoProperties {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = new Vector3();
    this.color = new Vector3();
  }
}

export default class Repeater {
  constructor(vars, uuid) {
    this.vars = Object.assign(
      {
        repeat: new Vector3(1, 1, 1),
        stride: new Vector3(1, 1, 1),
        positionMod: { x: () => 0, y: () => 0, z: () => 0 },
        rotationMod: { x: () => 0, y: () => 0, z: () => 0 },
        scaleMod: { x: () => 0, y: () => 0, z: () => 0 },
        colorMod: { r: () => 0, g: () => 0, b: () => 0 },
      },
      {
        lastPosition: vars.position.clone(),
        color: new Vector3(vars.color.r, vars.color.g, vars.color.b),
      },
      vars
    );
    this.paramMap = {
      repeat: new VectorAttribute(this.setRepeat.bind(this)),
      stride: new VectorAttribute(this.setStride.bind(this)),
      position: new VectorAttribute(this.setPosition.bind(this)),
      rotation: new VectorAttribute(this.setRotation.bind(this)),
      scale: new VectorAttribute(this.setScale.bind(this)),
      'pos-mod': new VectorAttribute(this.setPositionModulation.bind(this)),
      'rot-mod': new VectorAttribute(this.setRotationModulation.bind(this)),
      'scale-mod': new VectorAttribute(this.setScaleModulation.bind(this)),
      'color-mod': new VectorAttribute(this.setColorModulation.bind(this)),
    };
    this.uuid = uuid;
  }

  init(geometry, material) {
    const numInstances = this.vars.repeat.x * this.vars.repeat.y * this.vars.repeat.z;
    this.cluster = new InstancedMesh(
      geometry,
      material,
      numInstances,
      false,  // dynamic
      true, // color
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

  setVars() {
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

  setPositionModulation(x, y, z) {
    this.vars.positionMod = {
      x: typeof x === 'function' ? x : () => 0,
      y: typeof y === 'function' ? y : () => 0,
      z: typeof z === 'function' ? z : () => 0,
    };
  }

  setRotationModulation(x, y, z) {
    this.vars.rotationMod = {
      x: typeof x === 'function' ? x : () => 0,
      y: typeof y === 'function' ? y : () => 0,
      z: typeof z === 'function' ? z : () => 0,
    };
  }

  setScaleModulation(x, y, z) {
    this.vars.scaleMod = {
      x: typeof x === 'function' ? x : () => 0,
      y: typeof y === 'function' ? y : () => 0,
      z: typeof z === 'function' ? z : () => 0,
    };
  }

  setColorModulation(r, g, b) {
    this.vars.colorMod = {
      r: typeof r === 'function' ? r : () => 0,
      g: typeof g === 'function' ? g : () => 1,
      b: typeof b === 'function' ? b : () => 1,
    };
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    if (this.needsReset) {
      this.reset();
    }

    // TODO: if position changed OR if this.hasPositionModulation
    // if (!this.vars.position.equals(this.vars.lastPosition)) {
      const positionDiff = this.vars.lastPosition.clone().sub(this.vars.position);
      this.geoProperties.forEach((geoProperty, index) => {
        geoProperty.position.add(positionDiff);
        const modVector = new Vector3(
          this.vars.positionMod.x(performanceTime, geoProperty.position),
          this.vars.positionMod.y(performanceTime, geoProperty.position),
          this.vars.positionMod.z(performanceTime, geoProperty.position)
        );
        const modulatedPosition = geoProperty.position.clone().add(modVector);
        
        this.cluster.setPositionAt(index, modulatedPosition);
      });
      this.cluster.needsUpdate('position');
      this.vars.lastPosition = this.vars.position.clone();
    // }

    this.geoProperties.forEach((geoProperty, index) => {
      const quat = this.cluster.getQuaternionAt(index);
      // TODO: short circuit
      const modulatedRotation = geoProperty.rotation.toVector3().add(new Vector3(
        this.vars.rotationMod.x(performanceTime, geoProperty.position),
        this.vars.rotationMod.y(performanceTime, geoProperty.position),
        this.vars.rotationMod.z(performanceTime, geoProperty.position)
      ));
      this.cluster.setQuaternionAt(index, quat.setFromEuler(new Euler().setFromVector3(modulatedRotation, 'XYZ')));
      // TODO: short circuit
      const modulatedScale = geoProperty.scale.clone().add(new Vector3(
        this.vars.scaleMod.x(performanceTime, geoProperty.position),
        this.vars.scaleMod.y(performanceTime, geoProperty.position),
        this.vars.scaleMod.z(performanceTime, geoProperty.position)
      ));
      this.cluster.setScaleAt(index, modulatedScale);

      // TODO: short circuit
      const modulatedColor = geoProperty.color.clone().add(new Vector3(
        this.vars.colorMod.r(performanceTime, geoProperty.position),
        this.vars.colorMod.g(performanceTime, geoProperty.position),
        this.vars.colorMod.b(performanceTime, geoProperty.position)
      ));
      this.cluster.setColorAt(index, new Color(modulatedColor.x, modulatedColor.y, modulatedColor.z));
    });
    this.cluster.needsUpdate('quaternion');
    this.cluster.needsUpdate('scale');
    this.cluster.needsUpdate('colors');

  }

  dispose() {
    this.cluster._geometry.dispose();
    this.cluster._material.dispose();
    this.geoProperties = null;
  }

  getThreeMesh() {
    return this.cluster;
  }
}
