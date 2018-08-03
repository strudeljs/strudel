import registry from '../../../../src/core/registry';
import Component from '../../../../src/component/instance';

describe('Core Registry', () => {
  it('registers component', () => {
    expect([...Object.keys(registry.getData())].length).toEqual(0);
    registry.registerComponent('test', Component);
    expect([...Object.keys(registry.getData())].length).toEqual(1);
  });

  it('returns component', () => {
    registry.registerComponent('test', Component);
    expect(registry.getComponent('test')).toEqual(jasmine.any(Function));
  });

  it('returns registered selectors', () => {
    registry.registerComponent('selector', Component);
    registry.registerComponent('selector2', Component);
    expect(registry.getRegisteredSelectors()).toContain('selector');
    expect(registry.getRegisteredSelectors()).toContain('selector2');
  });

  it('warns duplicates selectors', () => {
    registry.registerComponent('selector', Component);
    registry.registerComponent('selector', Component);
    expect('Component registered under selector: selector already exists').toHaveBeenWarned();
  });
});
