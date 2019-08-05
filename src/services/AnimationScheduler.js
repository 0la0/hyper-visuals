export class AnimationSchedule {
  constructor(time, value) {
    this.time = time;
    this.value = value;
  }
}

export default class AnimationScheduler {
  constructor() {
    this.schedules = [];
  }

  submit(schedule) {
    if (!(schedule instanceof AnimationSchedule)) {
      throw new TypeError('AnimationSchedule.submit requires an AnimationSchedule');
    }
    this.schedules.push(schedule);
  }

  getLatestSchedule(now) {
    if (!this.schedules.length) {
      return false;
    }
    if (this.schedules[0].time > now) {
      return false;
    }
    if (this.schedules.length === 1) {
      const lastSchedule = this.schedules.pop();
      return lastSchedule.value;
    }
    let i = 1;
    while (i < this.schedules.length) {
      if (this.schedules[i].time > now) {
        const latestSchedule = this.schedules[i - 1];
        this.schedules.splice(0, i);
        return latestSchedule.value;
      }
      i++;
    }
    return false;
  }
}
