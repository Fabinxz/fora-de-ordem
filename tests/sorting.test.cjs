const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('function sortEngine(');
const end = html.indexOf('const $=', start);
assert(start >= 0 && end > start, 'Motor de ordenação não encontrado');
const context = vm.createContext({ performance });
vm.runInContext(html.slice(start, end), context);
const sort = context.sortEngine;
const keys = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];
let seed = 202601;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
const inputs = [
  [], [1], [2, 1], [4, 4, 4, 4], [-9, 0, 3, -2, 3], [0.5, -0.1, 1.25, 0],
  Array.from({ length: 50 }, (_, i) => i),
  Array.from({ length: 50 }, (_, i) => 50 - i),
  ...Array.from({ length: 30 }, () => Array.from({ length: 24 }, () => Math.floor(random() * 100) - 50)),
];

for (const key of keys) {
  test(`${key}: saída, entrada original e snapshots`, () => {
    for (const input of inputs) {
      const original = input.slice();
      const expected = input.slice().sort((a, b) => a - b);
      const traced = sort(key, input, true);
      const measured = sort(key, input, false);
      assert.deepEqual(Array.from(traced.a), expected);
      assert.deepEqual(Array.from(measured.a), expected);
      assert.deepEqual(input, original);
      assert.equal(traced.comparisons, measured.comparisons);
      assert.equal(traced.writes, measured.writes);
      assert(Object.isFrozen(traced.steps));
      assert.deepEqual(Array.from(traced.steps.at(-1).a), expected);
      for (const step of traced.steps) {
        assert(Object.isFrozen(step));
        assert(Object.isFrozen(step.a));
        for (const i of step.sorted) assert.equal(step.a[i], expected[i]);
        if (step.comparedValues) assert(Object.isFrozen(step.comparedValues));
      }
    }
  });
}

test('Bubble Sort encerra uma entrada já ordenada sem escrever', () => {
  const result = sort('bubble', [1, 2, 3, 4, 5], false);
  assert.equal(result.comparisons, 4);
  assert.equal(result.writes, 0);
});

test('Selection Sort compara todos os pares do trecho restante', () => {
  assert.equal(sort('selection', [5, 4, 3, 2, 1], false).comparisons, 10);
});

test('Uma troca de dois elementos registra duas escritas', () => {
  const result = sort('bubble', [2, 1], false);
  assert.equal(result.comparisons, 1);
  assert.equal(result.writes, 2);
});
