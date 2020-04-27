import AnimationScheduler, { AnimationSchedule } from './AnimationScheduler';

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
    const scheduledValue = this.animationScheduler.getLatestSchedule(performanceTime);
    if (scheduledValue === false) {
      return;
    }
    this.cb(scheduledValue);
  }

  dispose() {}
}
