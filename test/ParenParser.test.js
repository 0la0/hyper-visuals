// import assert from 'assert';
// import { parseParens } from '../src/services/Attribute/ParamParser';

// describe('ParenParser', () => {
//   it('handles strings without parens', () => {
//     assert.deepStrictEqual(parseParens('hello'), { ok: false, value: '' });
//     assert.deepStrictEqual(parseParens('hel(lo'), { ok: false, value: '' });
//     assert.deepStrictEqual(parseParens('hel)lo'), { ok: false, value: '' });
//   });

//   it('handles strings with parens', () => {
//     assert.deepStrictEqual(parseParens('hello(world)'), { ok: true, value: 'world' });
//   });

//   it('only evaluates outer parens', () => {
//     assert.deepStrictEqual(parseParens('hello(wo(rld))'), { ok: true, value: 'wo(rld)' });
//     assert.deepStrictEqual(parseParens('hello((world)'), { ok: true, value: '(world' });
//     assert.deepStrictEqual(parseParens('hello((world)))'), { ok: true, value: '(world))' });
//   });
// });
