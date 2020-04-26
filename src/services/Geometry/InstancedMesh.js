import { Euler, InstancedBufferAttribute,   InstancedMesh, Object3D, Vector3, } from 'three';
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
        colorMod: { r: () => vars.color.r, g: () => vars.color.g, b: () => vars.color.b },
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
    this._objectProxy = new Object3D();
  }

  init(geometry, material) {
    const numInstances = this.vars.repeat.x * this.vars.repeat.y * this.vars.repeat.z;
    this.cluster = new InstancedMesh(geometry, material, numInstances);
    this.geoProperties = new Array(numInstances).fill(null).map(() => new GeoProperties());
    this.colorBuffer = new Float32Array(numInstances * 3);
    this.cluster.material.vertexColors = true;
    this.reset();
  }

  reset() {
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
      this._objectProxy.position.copy(geoProperty.position);
      this._objectProxy.rotation.copy(geoProperty.rotation);
      this._objectProxy.scale.copy(geoProperty.scale);
      this._objectProxy.updateMatrix();
      this.cluster.setMatrixAt(index, this._objectProxy.matrix);  
    });
    this.cluster.instanceMatrix.needsUpdate = true;
    
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

    const positionDiff = this.vars.lastPosition.clone().sub(this.vars.position);
    this.vars.lastPosition = this.vars.position.clone();

    // TODO: short circuit if no change in properties
    this.geoProperties.forEach((geoProperty, index) => {
      geoProperty.position.add(positionDiff);

      const modulatedPosition = geoProperty.position.clone().add(new Vector3(
        this.vars.positionMod.x(performanceTime, geoProperty.position),
        this.vars.positionMod.y(performanceTime, geoProperty.position),
        this.vars.positionMod.z(performanceTime, geoProperty.position)
      ));
      
      const modulatedRotation = geoProperty.rotation.toVector3().add(new Vector3(
        this.vars.rotationMod.x(performanceTime, geoProperty.position),
        this.vars.rotationMod.y(performanceTime, geoProperty.position),
        this.vars.rotationMod.z(performanceTime, geoProperty.position)
      ));
      const rotationEuler = new Euler().setFromVector3(modulatedRotation, 'XYZ');
      
      const modulatedScale = geoProperty.scale.clone().add(new Vector3(
        this.vars.scaleMod.x(performanceTime, geoProperty.position),
        this.vars.scaleMod.y(performanceTime, geoProperty.position),
        this.vars.scaleMod.z(performanceTime, geoProperty.position)
      ));
      
      
      const modulatedColor = geoProperty.color.clone().add(new Vector3(
        this.vars.colorMod.r(performanceTime, geoProperty.position),
        this.vars.colorMod.g(performanceTime, geoProperty.position),
        this.vars.colorMod.b(performanceTime, geoProperty.position)
      ));
      const colorIndex = index * 3;
      this.colorBuffer[colorIndex] = modulatedColor.x;
      this.colorBuffer[colorIndex + 1] = modulatedColor.y;
      this.colorBuffer[colorIndex + 2] = modulatedColor.z;
      
      this._objectProxy.position.copy(modulatedPosition);
      this._objectProxy.setRotationFromEuler(rotationEuler);
      this._objectProxy.scale.copy(modulatedScale);
      this._objectProxy.updateMatrix();
      this.cluster.setMatrixAt(index, this._objectProxy.matrix);
    });
    this.cluster.geometry.setAttribute('color', new InstancedBufferAttribute(this.colorBuffer, 3));
    this.cluster.instanceMatrix.needsUpdate = true;
  }

  dispose() {
    this.cluster._geometry.dispose();
    this.cluster._material.dispose();
    this.geoProperties = [];
  }

  getThreeMesh() {
    return this.cluster;
  }
}
