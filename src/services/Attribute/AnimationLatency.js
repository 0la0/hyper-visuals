
class LatencyContainer {
  constructor() {
    this.animationLatency = 0;
  }

  setAnimationLatency(animationLatency) {
    this.animationLatency = animationLatency;
  }

  getAnimationLatency() {
    return this.animationLatency;
  }
}

const instance = new LatencyContainer();
export default instance;
