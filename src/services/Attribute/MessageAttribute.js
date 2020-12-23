import AnimationScheduler, { AnimationSchedule } from './AnimationScheduler';
import latency from './AnimationLatency';

export default class MessageAttribute {
  constructor(addr, cb = (() => {})) {
    this.eventHandler = ({ detail, }) => {
      if (detail.address !== addr) {
        return;
      }
      this.animationScheduler.submit(
        new AnimationSchedule(detail.time, detail.note)
      );
    };
    this.cb = cb;
    this.animationScheduler = new AnimationScheduler();
    document.addEventListener('GLOBAL_EVENT', this.eventHandler);
  }

  setCallback(cb) {
    this.cb = cb;
  }

  update(elapsedTime, performanceTime) {
    const adjustedTime = performanceTime + latency.getAnimationLatency();
    const scheduledValue = this.animationScheduler.getLatestSchedule(adjustedTime);
    if (scheduledValue === false) {
      return;
    }
    this.cb(scheduledValue);
  }

  dispose() {}
}
