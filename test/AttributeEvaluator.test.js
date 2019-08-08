import assert from 'assert';
import { buildFunctionFromUserInput } from '../src/services/AttributeEvaluator';

describe('AttributeEvaluator', () => {
  describe('buildFunctionFromUserInput', () => {
    it('evaluates a basic expression', () => {
      const builtFunction = buildFunctionFromUserInput('2 + 2');
      assert.equal(typeof builtFunction, 'function');
      assert.equal(builtFunction(), 4);
    });

    it('evaluates a function with an exposed API function', () => {
      const builtFunction = buildFunctionFromUserInput('sin(time)');
      assert.equal(builtFunction(0), 0);
    });
  });
});
