import { continuousApi } from './ContinuousApi';

const exposedApi = continuousApi.map(fn => fn.fn);
const apiNamespace = continuousApi.map(fn => fn.name).join(', ');

export function buildFunctionFromUserInput(userInputString) {
  return new Function(`
    'use strict';
    return (${apiNamespace}) => (time) => ${userInputString};
  `)()(...exposedApi);
}
