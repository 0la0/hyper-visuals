import { exposedApi, apiNamespace, } from './ContinuousApi';

function buildFunctionFromUserInput(userInputString, exposedApi, apiNamespace) {
  return new Function(`
    'use strict';
    return (${apiNamespace}) => (time, {x, y, z}) => ${userInputString};
  `)()(...exposedApi);
}

export default class ModulationAttribute {
  constructor(stringValue, cb = (() => {})) {
    this.stringValue = stringValue;
    this.cb = cb;
    this.evalFunction = buildFunctionFromUserInput(stringValue, exposedApi, apiNamespace);
    console.log('modulationAttribute', this);
  }

  setCallback(cb) {
    this.cb = cb;
    this.update(0, 0);
  }

  update(elapsedTime, performanceTime) {
    // console.log('cool', elapsedTime, performanceTime)
    // const testTime = performanceTime * 0.005;
    // const evaluated = this.evalFunction(testTime);
    // this.cb(evaluated);
  }

  dispose() {}
}
