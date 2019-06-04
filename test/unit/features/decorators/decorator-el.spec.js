import Component from '../../../../src/decorators/component';
import El from '../../../../src/decorators/el';
import element from '../../__mocks';

describe('Decorator Element', () => {
  it('binds element', () => {
    @Component('test')
    class TestComponent {
      @El('test')
      test
    }

    const component = new TestComponent({ element });
    expect(component._els.test).toEqual('test');
  });

  it('fails without selector', () => {
    @Component('.empty')
    class Empty {
      @El()
      test;
    }

    const component = new Empty({ element });
    expect('[Strudel]: Selector must be provided for El decorator').toHaveBeenWarned();
  });
});
