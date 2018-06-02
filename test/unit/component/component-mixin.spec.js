import ComponentType from '../../../src/component/instance';
import Component from '../../../src/decorators/component';
import element from '../__mocks';

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
    @Component('test')
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
    expect(component).to.be.an.instanceof(ComponentType);
  });

  it('has mixin methods', () => {
    const component = new TestComponent({ element });
    expect(component.method).to.be.a('function');
  });

  it('runs init', () => {
    const component = new TestComponent({ element });
    expect(component.property).to.exist; // eslint-disable-line no-unused-expressions
  });

  it('inits before component', () => {
    const component = new TestComponent({ element });
    expect(component.mirror).to.exist; // eslint-disable-line no-unused-expressions
  });
});
