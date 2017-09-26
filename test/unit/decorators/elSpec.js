import Component from '../../../src/decorators/component';
import El from '../../../src/decorators/el';

@Component('test')
class TestComponent {
  @El('test')
  test
}

describe('El Decorator', () => {
  it('binds element', () => {
    const component = new TestComponent();
    expect(component._els['test']).to.be.equal('test');
  });

  it('fails without selector', () => {
    expect(El()).to.throw('Selector must be provided for El decorator');
  });
});
