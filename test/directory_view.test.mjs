import test from 'node:test';
import assert from 'node:assert/strict';
import { group, ORDER_LABELS } from '../src/lib/directory_view.js';

test('group buckets each kind and ignores unknown kinds', () => {
  const items = [
    { kind: 'feed', name: 'a' }, { kind: 'feed', name: 'b' },
    { kind: 'block', name: 'c' }, { kind: 'mystery', name: 'd' }
  ];
  const g = group(items);
  assert.deepEqual(g.feed.map(i => i.name), ['a', 'b']);
  assert.deepEqual(g.list, []);
  assert.deepEqual(g.block.map(i => i.name), ['c']);
  assert.equal(Object.keys(g).length, 4);
  assert.equal(ORDER_LABELS.new, 'Nuevo');
});
