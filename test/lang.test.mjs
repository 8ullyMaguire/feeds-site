import test from 'node:test';
import assert from 'node:assert/strict';
import { langFor } from '../src/lib/lang.js';

test('langFor defaults to English and honours the Spanish directory', () => {
  assert.equal(langFor('/directory'), 'en');
  assert.equal(langFor('/directory?order=new&kind=feed'), 'en');
  assert.equal(langFor('/es/directorio'), 'es');
  assert.equal(langFor('/es/directorio?order=popular'), 'es');
  assert.equal(langFor('/'), 'es');
  assert.equal(langFor('/guia'), 'es');
  assert.equal(langFor('/en'), 'en');
  assert.equal(langFor('/guide'), 'en');
});
