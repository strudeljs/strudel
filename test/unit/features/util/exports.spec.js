import { INIT_CLASS, INIT_SELECTOR, VERSION } from '../../../../src/module';

it('should export INIT_CLASS', () => {
  expect(INIT_CLASS).toBeDefined();
});

it('should export INIT_SELECTOR', () => {
  expect(INIT_SELECTOR).toBeDefined();
});

it('should export VERSION', () => {
  expect(VERSION).toBeDefined();
});