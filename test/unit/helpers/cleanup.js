import registry from '../../../src/core/registry';

beforeAll(() => {
  window.onbeforeunload = jasmine.createSpy();
});

afterEach((done) => {
  registry._registry = {};
  registry._registrationQueue = {};
  done();
});
