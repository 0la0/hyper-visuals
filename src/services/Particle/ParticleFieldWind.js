import { Vector3 } from 'three';
import { getRandomSign } from '../Math';

const MAGNITUDE = 1;

export default class ParticleFieldWind {
  constructor() {
    this.force = new Vector3(
      getRandomSign() * Math.random() * MAGNITUDE,
      getRandomSign() * Math.random() * MAGNITUDE,
      getRandomSign() * Math.random() * MAGNITUDE
    );
  }
  
  update(elapsedTime) {
    // console.log('apply force');
  }

  applyToParticle(particle) {
    const diff = this.force.clone().sub(particle.positionVelocity);
    particle.positionVelocity.add(diff);
  }

  setParam(attrName, stringValue) {
    const [ x, y, z ] = stringValue.trim().split(/\s+/);
    this.force.set(x, y, z);
  }
}