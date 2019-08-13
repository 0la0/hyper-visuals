// import { exposedApi, apiNamespace,  } from './ContinuousApi';

export function buildFunctionFromUserInput(userInputString, exposedApi, apiNamespace) {
  return new Function(`
    'use strict';
    return (${apiNamespace}) => (time) => ${userInputString};
  `)()(...exposedApi);
}
