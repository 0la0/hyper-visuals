import { Vector3 } from 'three';
import VectorAttribute from '../Attribute/VectorAttribute';
import { getRandomVector } from '../Math';

// TODO: map this to "speed" attribute
const coefficientWeight = 0.00001;

export default class ParticleFieldSwarm {
  constructor() {
    this.paramMap = {
      goal: new VectorAttribute(this.setGoal.bind(this)),
    };
    this.vars = {
      goal: new Vector3(),
    };
    this.meta = {
      bestPosition: getRandomVector(100),
      bestDistance: Number.MAX_SAFE_INTEGER,
      localCoefficient: 5,
      globalCoefficient: 1,
    };
  }
  
  update(elapsedTime, performanceTime, particles) {
    Object.values(this.paramMap).forEach(param => param.update(elapsedTime, performanceTime));
    particles.forEach(particle => this.applyToParticle(particle, elapsedTime));

    particles.forEach(particle => {
      const distanceFromGoal = this.vars.goal.clone().sub(particle.position).lengthSq();
      if (distanceFromGoal < particle.meta.bestDistance) {
        particle.meta.bestDistance = distanceFromGoal;
        particle.meta.bestPosition = particle.position.clone();
      }
      if (distanceFromGoal < this.meta.bestDistance) {
        this.meta.bestDistance = distanceFromGoal;
        this.meta.bestPosition = particle.position.clone();
      }
    });
    if (this.needsReset) {
      this.needsReset = false;
      particles.forEach(particle => particle.reset());
      this.meta.bestPosition = getRandomVector(100);
      this.meta.bestDistance = Number.MAX_SAFE_INTEGER;
    }
  }

  applyToParticle(particle, elapsedTime) {
    // v[] = v[] + c1 * rand() * (pbest[] - present[]) + c2 * rand() * (gbest[] - present[])
    
    const localDiff = particle.meta.bestPosition.clone()
      .sub(particle.position)
      .multiplyScalar(this.meta.localCoefficient * coefficientWeight * Math.random());

    const globalDiff = this.meta.bestPosition.clone()
      .sub(particle.position)
      .multiplyScalar(this.meta.globalCoefficient * coefficientWeight * Math.random());

    particle.positionVelocity = particle.positionVelocity.clone().add(localDiff).add(globalDiff);
    particle.update(elapsedTime);
  }

  setParam(name, value) {
    if (!this.paramMap[name]) {
      return;
    }
    this.paramMap[name].setValue(value);
  }

  setGoal(x, y, z) {
    this.vars.goal.set(x, y, z);
    this.needsReset = true;
  }
}