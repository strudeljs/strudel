import Component from '../../../../src/decorators/component';
import Evt from '../../../../src/decorators/event';
import element from '../../__mocks';

describe('Decorator Event', () => {
  it('attaches event', () => {
    @Component('test')
    class TestComponent {
      @Evt('click .element1')
      method() {
        return 'element1';
      }

      @Evt('click .element2')
      method2() {
        return 'element2';
      }
    }

    const component = new TestComponent({ element });
    expect(Object.keys(component._events)).toEqual(['click .element1', 'click .element2']);
  });

  it('prevents default', () => {
    @Component('empty')
    class TestComponent {
      @Evt('click', true)
      test() { }
    }

    const event = { preventDefault: jasmine.createSpy() }
    const component = new TestComponent({ element });
    component._events['click'](event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('fails without descriptor', () => {
    @Component('empty')
    class Empty {
      @Evt()
      test() { }
    }

    expect('Event descriptor must be provided for Evt decorator').toHaveBeenWarned();
  });
});
