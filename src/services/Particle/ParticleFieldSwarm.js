import { Vector3 } from 'three';
import VectorAttribute from '../Attribute/VectorAttribute';
import { getRandomVector } from '../Math';

// TODO: map this to "speed" attribute
const coefficientWeight = 0.001;

export default class ParticleFieldSwarm {
  constructor() {
    this.paramMap = {
      position: new VectorAttribute(this.setPosition.bind(this)),
      rotation: new VectorAttribute(this.setRotation.bind(this)),
      size: new VectorAttribute(this.setSize.bind(this)),
      color: new VectorAttribute(this.setColor.bind(this)),
    };
    this.vars = {
      position: new Vector3(),
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
      const distanceFromGoal = this.vars.position.clone().sub(particle.position).lengthSq();
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

  setPosition(x, y, z) {
    this.vars.position.set(x, y, z);
    this.needsReset = true;
  }

  setRotation(x, y, z) {
    console.log('TODO: setRotation', x, y, z);
  }

  setSize(x, y, z) {
    console.log('TODO: setSize', x, y, z);
  }

  setColor(r, g, b) {
    console.log('TODO: setColor', r, g, b);
  }
}