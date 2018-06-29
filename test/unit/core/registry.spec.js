import registry from '../../../src/core/registry';
import Component from '../../../src/component/instance';

describe('Core Registry', () => {
  beforeEach(() => {
    registry._registry = {};
  });

  it('registers component', () => {
    expect([...Object.keys(registry.getData())].length).to.be.equal(0);
    registry.registerComponent('test', Component);
    expect([...Object.keys(registry.getData())].length).to.be.equal(1);
  });

  it('returns component', () => {
    registry.registerComponent('test', Component);
    expect(registry.getComponent('test')).to.be.a('function');
  });

  it('returns registered selectors', () => {
    registry.registerComponent('selector', Component);
    registry.registerComponent('selector2', Component);
    expect(registry.getRegisteredSelectors()).to.include('selector');
    expect(registry.getRegisteredSelectors()).to.include('selector2');
  });
});
