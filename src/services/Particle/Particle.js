import { Vector3 } from 'three';
import { getRandomVector } from '../Math';

const VELOCITY_AMOUNT = 0.5;

export default class Particle {
  constructor(color) {
    this.position = new Vector3();
    this.positionVelocity = getRandomVector(VELOCITY_AMOUNT);
    this.scale = new Vector3(1, 1, 1);
    this.rotation = new Vector3();
    this.color = color;
    this.ttl = 1000;
    this.meta = {
      bestPosition: getRandomVector(100),
      bestDistance: Number.MAX_SAFE_INTEGER,
    };
  }
  
  update(elapsedTime) {
    this.position = this.position.clone().add(this.positionVelocity);
    this.ttl = this.ttl - elapsedTime;
  }

  reset() {
    this.meta = {
      bestPosition: getRandomVector(100),
      bestDistance: Number.MAX_SAFE_INTEGER,
    };
  }
}