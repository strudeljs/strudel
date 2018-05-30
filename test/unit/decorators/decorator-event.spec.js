import Component from '../../../src/decorators/component';
import Evt from '../../../src/decorators/event';
import element from '../__mocks';

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

describe('Decorator Event', () => {
  it('attaches event', () => {
    const component = new TestComponent({ element });
    expect(Object.keys(component._events)).to.deep.equal(['click .element1', 'click .element2']);
  });

  it('fails without descriptor', () => {
    expect(Evt()).to.throw('Event descriptor must be provided for Evt decorator');
  });
});
