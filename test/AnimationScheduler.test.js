import assert from 'assert';
import AnimationScheduler, { AnimationSchedule } from '../src/services/Attribute/AnimationScheduler.js';

describe('AnimationScheduler', () => {
  it('returns false when empty', () => {
    const animationScheduler = new AnimationScheduler();
    assert.equal(animationScheduler.schedules.length, 0);
    assert.ok(!animationScheduler.getLatestSchedule());
  });

  it('returns a single item', () => {
    const animationScheduler = new AnimationScheduler();
    animationScheduler.submit(new AnimationSchedule(0, 'a'));
    assert.equal(animationScheduler.getLatestSchedule(0), 'a');
    assert.equal(animationScheduler.schedules.length, 0);
    assert.ok(!animationScheduler.getLatestSchedule(1));
  });

  it('returns the latest item and clears the queue', () => {
    const animationScheduler = new AnimationScheduler();
    animationScheduler.submit(new AnimationSchedule(0, 'a'));
    assert.equal(animationScheduler.getLatestSchedule(0), 'a');
    assert.equal(animationScheduler.schedules.length, 0);
    assert.ok(!animationScheduler.getLatestSchedule(1));
    animationScheduler.submit(new AnimationSchedule(1, 'b'));
    animationScheduler.submit(new AnimationSchedule(2, 'c'));
    assert.equal(animationScheduler.getLatestSchedule(1), 'b');
    assert.equal(animationScheduler.schedules.length, 1);
    assert.equal(animationScheduler.getLatestSchedule(2), 'c');
    assert.equal(animationScheduler.schedules.length, 0);
    assert.ok(!animationScheduler.getLatestSchedule(3));
  });

  it('returns the latest item and clears the queue', () => {
    const animationScheduler = new AnimationScheduler();
    animationScheduler.submit(new AnimationSchedule(0, 'a'));
    animationScheduler.submit(new AnimationSchedule(1, 'b'));
    animationScheduler.submit(new AnimationSchedule(2, 'c'));
    animationScheduler.submit(new AnimationSchedule(3, 'd'));
    animationScheduler.submit(new AnimationSchedule(4, 'e'));
    assert.equal(animationScheduler.getLatestSchedule(2.1), 'c');
    assert.equal(animationScheduler.schedules.length, 2);
    assert.equal(animationScheduler.getLatestSchedule(3.9), 'd');
    assert.equal(animationScheduler.schedules.length, 1);
    assert.equal(animationScheduler.getLatestSchedule(4), 'e');
    assert.equal(animationScheduler.schedules.length, 0);
    assert.ok(!animationScheduler.getLatestSchedule(4.1));
  });
});
