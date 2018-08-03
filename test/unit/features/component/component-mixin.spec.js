import ComponentType from '../../../../src/component/instance';
import Component from '../../../../src/decorators/component';
import element from '../../__mocks';

describe('Component Mixins', () => {
  let TestComponent;

  const mixin = {
    init() {
      this.property = true;
    },

    method() {
      return this._selector;
    }
  };

  beforeEach(() => {
    @Component('test2')
    class TestComponentClass {
      mixins = [mixin]

      init() {
        this.mirror = this.property;
      }
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

  it('runs init', () => {
    const component = new TestComponent({ element });
    expect(component.property).toBeDefined();
  });

  it('inits before component', () => {
    const component = new TestComponent({ element });
    expect(component.mirror).toBeDefined();
  });
});
