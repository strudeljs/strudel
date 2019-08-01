import ComponentType from '../../../../src/component/instance';
import Component from '../../../../src/decorators/component';
import element from '../../__mocks';

describe('Component Mixins', () => {
  let TestComponent;

  const mixin = {
    beforeInit() { },

    init() { },

    beforeDestroy() { },

    destroy() { },

    method() {
      return this._selector;
    }
  };

  beforeEach(() => {
    @Component('test2')
    class TestComponentClass {
      mixins = [mixin]
    }

    TestComponent = TestComponentClass;
  });

  it('instantiates', () => {
    const component = new TestComponent({ element });
    expect(component).toEqual(jasmine.any(ComponentType));
  });

  it('has mixin methods', () => {
    const component = new TestComponent({ element });
    expect(component.method).toEqual(jasmine.any(Function));
  });

  it('runs init hooks', () => {
    spyOn(mixin, 'beforeInit');
    spyOn(mixin, 'init');
    const component = new TestComponent({ element });
    expect(mixin.beforeInit).toHaveBeenCalled();
    expect(mixin.init).toHaveBeenCalled();
  });

  it('runs destroy hooks', () => {
    spyOn(mixin, 'beforeDestroy');
    spyOn(mixin, 'destroy');
    const component = new TestComponent({ element });
    component.$teardown();
    expect(mixin.beforeDestroy).toHaveBeenCalled();
    expect(mixin.destroy).toHaveBeenCalled();
  });
});
