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
    expect(registry.getComponent('test')[0]).toEqual(jasmine.any(Function));
  });

  it('returns registered selectors', () => {
    registry.registerComponent('selector', Component);
    registry.registerComponent('selector2', Component);
    expect(registry.getSelectorsFromRegistrationQueue()).toContain('selector');
    expect(registry.getSelectorsFromRegistrationQueue()).toContain('selector2');
  });

  it('moves entires from registration queue to permanent registry', () => {
    registry.registerComponent('selector', Component);
    expect(registry.getSelectorsFromRegistrationQueue()).toContain('selector');
    expect(registry.getRegisteredSelectors()).not.toContain('selector');

    registry.setSelectorsAsRegistered();
    expect(registry.getSelectorsFromRegistrationQueue()).not.toContain('selector');
    expect(registry.getRegisteredSelectors()).toContain('selector');
  });

  it('properly adds multiple entries from queue to permanent registry', () => {
    registry.registerComponent('selector', Component);
    expect(registry.getSelectorsFromRegistrationQueue()).toContain('selector');

    registry.setSelectorsAsRegistered();
    registry.registerComponent('selector2', Component);
    expect(registry.getRegisteredSelectors()).toContain('selector');
    expect(registry.getSelectorsFromRegistrationQueue()).toContain('selector2');

    registry.setSelectorsAsRegistered();
    expect(registry.getRegisteredSelectors()).toContain('selector');
    expect(registry.getRegisteredSelectors()).toContain('selector2');
    expect(registry.getSelectorsFromRegistrationQueue().length).toEqual(0);
  });

  // it('warns duplicates selectors', () => {
  //   registry.registerComponent('selector', Component);
  //   registry.registerComponent('selector', Component);
  //   expect('Component registered under selector: selector already exists').toHaveBeenWarned();
  // });
});
