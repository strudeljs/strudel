import Component from '../../../../src/decorators/component';
import ComponentType from '../../../../src/component/instance';
import registry from '../../../../src/core/registry';
import element from '../../__mocks';

describe('Decorator Component', () => {
  let TestComponent;

  beforeEach(() => {
    @Component('test')
    class TestComponentClass {
      property = 1;

      method() {
        return 'test';
      }
    }

    TestComponent = TestComponentClass;
  });

  it('registers', () => {
    expect(registry.getComponent('test')[0]).toEqual(jasmine.any(Function));
  });

  it('requires class', () => {
    class Test {
      @Component('test')
      method() { }
    }

    expect('[Strudel]: Decorator works only for classes').toHaveBeenWarned();
  })

  it('fails without selector', () => {
    @Component()
    class ComponentClass {}

    expect('Selector must be provided for Component decorator').toHaveBeenWarned();
  });

  it('has selector', () => {
    const component = new TestComponent({ element });
    expect(component._selector).toEqual('test');
  });

  it('has inherited properties', () => {
    const component = new TestComponent({ element });
    expect(component.$emit).toEqual(jasmine.any(Function));
  });

  it('is instance of Component', () => {
    const component = new TestComponent({ element });
    expect(component).toEqual(jasmine.any(ComponentType));
  });

  it('has own properties', () => {
    const component = new TestComponent({ element });
    expect(component.property).toEqual(1);
  });

  it('has own methods', () => {
    const component = new TestComponent({ element });
    expect(component.method).toEqual(jasmine.any(Function));
  });
});
