import AnimationScheduler, { AnimationSchedule } from './AnimationScheduler';

// class TestEventEmitter {
//   constructor() {
//     this.isOn = false;
//   }

//   start() {
//     this.isOn = true;
//     this.loop();
//   }

//   stop() {
//     this.isOn = false;
//   }

//   loop() {
//     if (!this.isOn) {
//       return;
//     }
//     const now = performance.now();
//     const eventData1 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now + 500, },
//       interpolate: false,
//     };
//     const eventData2 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now  + 1000, },
//       interpolate: false,
//     };
//     const eventData3 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now + 1500, },
//       interpolate: false,
//     };
//     const eventData4 = {
//       address: 'a',
//       note: Math.random(),
//       time: { audio: 0, midi: now  + 1800, },
//       interpolate: false,
//     };
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData1 }));
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData2 }));
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData3 }));
//     document.dispatchEvent(new CustomEvent('GLOBAL_EVENT', { detail: eventData4 }));
//     setTimeout(this.loop.bind(this), 2000);
//   }
// }

// const timer = new TestEventEmitter();
// timer.start();


export default class MessageAttribute {
  constructor(addr, cb = (() => {})) {
    this.addr = addr;
    this.eventHandler = (event) => {
      const message = event.detail;
      this.animationScheduler.submit(
        new AnimationSchedule(message.time.midi, message.note)
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
