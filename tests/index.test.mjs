import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('reference factor', () => {
  assert.deepEqual(
    api.cholesky([
      [4, 12, -16],
      [12, 37, -43],
      [-16, -43, 98],
    ]),
    [
      [2, 0, 0],
      [6, 1, 0],
      [-8, 5, 3],
    ],
  );
});
test('scalar square root', () => {
  assert.deepEqual(api.cholesky([[9]]), [[3]]);
});
test('indefinite rejection', () => {
  assert.throws(() =>
    api.cholesky([
      [1, 2],
      [2, 1],
    ]),
  );
});
test('nonsymmetric rejection', () => {
  assert.throws(() =>
    api.cholesky([
      [2, 1],
      [0, 2],
    ]),
  );
});
test('invalid bounds', () => {
  assert.throws(() => api.cholesky([]));
  assert.throws(() => api.cholesky([[1]], 0));
});
test('SPD reconstruction oracle', () => {
  const a = [
      [6, 2, 1],
      [2, 5, 2],
      [1, 2, 4],
    ],
    l = api.cholesky(a);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      assert.ok(Math.abs(l[i].reduce((s, x, k) => s + x * l[j][k], 0) - a[i][j]) < 1e-12);
});
