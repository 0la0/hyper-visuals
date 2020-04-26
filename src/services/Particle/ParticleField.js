import { InstancedMesh, Object3D, Vector3 } from 'three';
import VectorAttribute from '../Attribute/VectorAttribute';
import ScalarAttribute from '../Attribute/ScalarAttribute';
import { getRandomSign } from '../Math';
import Particle from './Particle';

export default class ParticleField {
  constructor(vars, uuid) {
    this.vars = Object.assign(
      {
        position: new Vector3(),
        positionJitter: new Vector3(20, 20, 20),
        ttl: 1000,
        numInstances: 200,
      },
      {
        color: new Vector3(vars.color.r, vars.color.g, vars.color.b),
      },
      vars
    );
    this.paramMap = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      'position-jitter': new VectorAttribute(this.setPositionJitter.bind(this)),
      ttl: new ScalarAttribute(this.setTimeToLive.bind(this)),
      num: new ScalarAttribute(this.setNumberOfInstances.bind(this)),
    };
    this.uuid = uuid;
    this.ttlJitter = 800;
    this.particleFieldForces = [];
    this._objectProxy = new Object3D();
  }

  init(geometry, material) {
    const numInstances = this.vars.numInstances;
    this.cluster = new InstancedMesh(geometry, material, numInstances);
    this.particles = new Array(numInstances).fill(null).map(() => new Particle(this.vars.color));
    this.reset();
  }

  _getNewParticleParameters() {
    const position = new Vector3(
      this.vars.position.x + getRandomSign() * this.vars.positionJitter.x * Math.random(),
      this.vars.position.y + getRandomSign() * this.vars.positionJitter.y * Math.random(),
      this.vars.position.z + getRandomSign() * this.vars.positionJitter.z * Math.random()
    );
    const rotation = this.vars.rotation.clone();
    const scale = this.vars.scale.clone();
    const ttl = getRandomSign() * this.ttlJitter + this.vars.ttl;
    return {
      position,
      rotation,
      scale,
      ttl
    };
  }

  reset() {
    this.particles.forEach((particle, index) => {
      const particleParams = this._getNewParticleParameters();
      particle.position = particleParams.position;
      particle.rotation = particleParams.rotation;
      particle.scale = particleParams.scale;
      particle.ttl = particleParams.ttl;
      this._objectProxy.position.copy(particle.position);
      this._objectProxy.rotation.copy(particle.rotation);
      this._objectProxy.scale.copy(particle.scale);
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

  setPosition(x, y, z) {
    this.vars.position.set(x, y, z);
  }

  setPositionJitter(x, y, z) {
    this.vars.positionJitter.set(x, y, z);
  }
  
  setTimeToLive(ttl) {
    this.vars.ttl = ttl;
  }

  setNumberOfInstances(numInstances) {
    this.vars.numInstances = numInstances;
    this.needsReset = true;
  }

  update(elapsedTime, performanceTime) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    if (this.needsReset) {
      this.reset();
    }
    const elapsedTimeMs = elapsedTime * 1000;
    this.particleFieldForces.forEach(particleFieldForce =>
      particleFieldForce.update(elapsedTime, performanceTime, this.particles));
    this.particles.forEach((particle, index) => {
      particle.update(elapsedTimeMs);
      if (particle.ttl < 0) {
        const particleParams = this._getNewParticleParameters();
        particle.position = particleParams.position;
        particle.rotation = particleParams.rotation;
        particle.scale = particleParams.scale;
        particle.ttl = particleParams.ttl;
        particle.reset();
      }

      this._objectProxy.position.copy(particle.position);
      this._objectProxy.setRotationFromEuler(particle.rotation);
      this._objectProxy.scale.copy(particle.scale);
      this._objectProxy.updateMatrix();
      this.cluster.setMatrixAt(index, this._objectProxy.matrix);
    });
    this.cluster.instanceMatrix.needsUpdate = true;
  }

  dispose() {
    this.cluster._geometry.dispose();
    this.cluster._material.dispose();
    this.particles = [];
  }

  getThreeMesh() {
    console.log('connecting cluster', this.cluster);
    return this.cluster;
  }

  setParticleFieldForce(particleFieldForce) {
    this.particleFieldForces.push(particleFieldForce);
  }
}
