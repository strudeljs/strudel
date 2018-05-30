import Registry from '../../../src/core/registry';
import Component from '../../../src/component/instance';

const registry = new Registry();

describe('Core Registry', () => {
  beforeEach(() => {
    registry.clear();
  });

  it('instantiates', () => {
    expect(registry).to.be.an.instanceof(Registry);
  });

  it('is singleton', () => {
    const registry2 = new Registry();
    expect(registry2).to.be.equal(registry);
  });

  it('adds component', () => {
    expect([...registry.getSelectors()].length).to.be.equal(0);
    registry.registerComponent('test', Component);
    expect([...registry.getSelectors()].length).to.be.equal(1);
  });

  it('returns component', () => {
    registry.registerComponent('test', Component);
    expect(registry.getComponent('test')).to.be.a('function');
  });

  it('clears components', () => {
    expect([...registry.getSelectors()].length).to.be.equal(0);
    registry.registerComponent('test', Component);
    expect([...registry.getSelectors()].length).to.be.equal(1);
    registry.clear();
    expect([...registry.getSelectors()].length).to.be.equal(0);
  });
});
