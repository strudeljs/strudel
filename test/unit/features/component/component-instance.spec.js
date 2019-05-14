import Component from '../../../../src/component/instance';
import Decorator from '../../../../src/decorators/component';
import element from '../../__mocks';

describe('Component Instance', () => {
  it('instantiates', () => {
    const component = new Component({ element });
    expect(component).toEqual(jasmine.any(Component));
  });

  it('uses events', () => {
    const subscriber = new Component({ element });
    const publisher = new Component({ element });
    let count = 0;
    subscriber.$on('event', (data) => {
      count = data.count;
    });
    publisher.$emit('event', {
      count: 1
    });
    expect(count).toEqual(1);
  });

  it('has beforeInit hook', () => {
    const component = new Component({ element });
    expect(component.beforeInit).toEqual(jasmine.any(Function));
  });

  it('has init hook', () => {
    const component = new Component({ element });
    expect(component.init).toEqual(jasmine.any(Function));
  });

  it('has beforeDestroy hook', () => {
    const component = new Component({ element });
    expect(component.beforeInit).toEqual(jasmine.any(Function));
  });

  it('has destroy hook', () => {
    const component = new Component({ element });
    expect(component.destroy).toEqual(jasmine.any(Function));
  });

  it('should teardown', () => {
    const component = new Component({ element });
    component.$teardown();
    expect(component.$element).not.toBeDefined();
  });

  it('handles errors', () => {
    @Decorator('test')
    class TestComponent {
      init() {
        this.asdf();
      }

      destroy() {
        this.asdf();
      }
    }

    const component = new TestComponent({ element });
    expect('TypeError: this.asdf is not a function').toHaveThrownError();
    component.$teardown();
    expect('TypeError: this.asdf is not a function').toHaveThrownError();
  });
});
