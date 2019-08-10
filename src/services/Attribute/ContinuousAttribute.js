import { buildFunctionFromUserInput } from './AttributeEvaluator';

export default class ContinuousAttribute {
  constructor(stringValue, cb = (() => {})) {
    this.stringValue = stringValue;
    this.cb = cb;
    this.evalFunction = buildFunctionFromUserInput(stringValue);
  }

  setCallback(cb) {
    this.cb = cb;
  }

  update(elapsedTime, performanceTime) {
    const testTime = performanceTime * 0.005;
    const evaluated = this.evalFunction(testTime);
    this.cb(evaluated);
  }

  dispose() {}
}
