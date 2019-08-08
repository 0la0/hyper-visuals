const TWO_PI = 2 * Math.PI;

const period = Math.PI;
const amplitude = 2;

const fnBuilder = {
  cos: x => Math.cos(x),
  sin: x => Math.sin(x),
  squ: x => Math.sin(x) > 0 ? 1 : -1,
  saw: x => (x % TWO_PI) / period - 0.5,
  tri: x => (amplitude / period) * (period - Math.abs(x % (2 * period) - period)) - 1,
};

function buildFunction(name) {
  const scopedFuncitonName = `${name}`;
  return { [scopedFuncitonName]: function(...args) {
    return fnBuilder[name](...args);
  } }[scopedFuncitonName];
}

export const continuousApi = [
  'cos',
  'sin',
  'squ',
  'saw',
  'tri',
].map(name => ({ name, fn: buildFunction(name) }));
