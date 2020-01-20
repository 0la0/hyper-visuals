import { Vector3 } from 'three';
import VectorAttribute from '../Attribute/VectorAttribute';

export default class ParticleFieldWind {
  constructor() {
    this.paramMap = {
      direction: new VectorAttribute(this.setDirection.bind(this)),
    };
    this.vars = {
      direction: new Vector3(),
    };
  }
  
  update(elapsedTime, performanceTime, particles) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    particles.forEach(particle => this.applyToParticle(particle));
  }

  // TODO: apply smoothing over time
  applyToParticle(particle) {
    const velocityDiff = this.vars.direction.clone().sub(particle.positionVelocity);
    particle.positionVelocity.add(velocityDiff);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setDirection(x, y, z) {
    this.vars.direction.set(x, y, z);
  }
}