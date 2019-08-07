const exposedApi = [].concat(patternFunctions, eventGraphFunctions, utilFunctions);
const apiNamespace = exposedApi.map(fn => fn.name).join(', ');

// example functions:
// 10 * sin(time)
// 4 * cos(time * 2)
// 2 * squ(time)
// tri(time)
// tan(time) 

const exposedApi = [].concat(patternFunctions, eventGraphFunctions, utilFunctions);
const apiNamespace = exposedApi.map(fn => fn.name).join(', ');

export function buildFunctionFromUserInput(userInputString) {
  return Function(`
    'use strict';
    return (${apiNamespace}) => {
      const sequences = [];
      const audioGraphInlets = [];
      const seq = (...args) => sequences.push(args);
      ${exposedEventGraph}
      ${userInputString}
      return { sequences, audioGraphInlets };
    };
  `)()(...exposedApi);
}
