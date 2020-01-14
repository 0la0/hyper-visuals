import { Vector3 } from 'three';
import { getRandomSign } from '../Math';

const VELOCITY_AMOUNT = 0.5;

export default class Particle {
  constructor(color) {
    this.position = new Vector3();
    this.positionVelocity = new Vector3(
      getRandomSign() * Math.random() * VELOCITY_AMOUNT,
      getRandomSign() * Math.random() * VELOCITY_AMOUNT,
      getRandomSign() * Math.random() * VELOCITY_AMOUNT
    );
    this.scale = new Vector3(1, 1, 1);
    this.rotation = new Vector3();
    this.color = color;
    this.ttl = 1000;
  }
  
  update(elapsedTime) {
    this.position = this.position.clone().add(this.positionVelocity);
    this.ttl = this.ttl - elapsedTime;
  }
}