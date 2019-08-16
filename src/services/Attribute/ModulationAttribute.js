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
  }

  setCallback(cb) {
    this.cb = cb;
    this.update(0, 0);
  }

  update(elapsedTime, performanceTime) {}

  dispose() {}
}
