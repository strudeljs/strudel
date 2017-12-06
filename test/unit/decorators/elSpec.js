import Component from '../../../src/decorators/component';
import El from '../../../src/decorators/el';
import element from '../__mocks';

@Component('test')
class TestComponent {
  @El('test')
  test
}

describe('El Decorator', () => {
  it('binds element', () => {
    const component = new TestComponent({ element });
    expect(component._els.test).to.be.equal('test');
  });

  it('fails without selector', () => {
    expect(El()).to.throw('Selector must be provided for El decorator');
  });
});
