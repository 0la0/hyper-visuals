import { exposedApi, apiNamespace,  } from './ContinuousApi';
import { buildFunctionFromUserInput } from './AttributeEvaluator';

export default class ContinuousAttribute {
  constructor(stringValue, cb = (() => {})) {
    this.stringValue = stringValue;
    this.cb = cb;
    this.evalFunction = buildFunctionFromUserInput(stringValue, exposedApi, apiNamespace);
  }

  setCallback(cb) {
    this.cb = cb;
    this.update(0, 0);
  }

  update(elapsedTime, performanceTime) {
    const testTime = performanceTime * 0.005;
    const evaluated = this.evalFunction(testTime);
    this.cb(evaluated);
  }

  dispose() {}
}
