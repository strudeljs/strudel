import Component from '../../../src/decorators/component';
import ComponentType from '../../../src/core/component';
import Registry from '../../../src/core/registry';

@Component('test')
class TestComponent {
  property = 1;

  method() {
    return 'test';
  }
}

describe('Component Decorator', () => {
  it('registers', () => {
    const registry = new Registry();
    expect(registry.getComponent('test')).to.be.a('function');
    registry.clear();
  });

  it('fails without selector', () => {
    expect(Component()).to.throw('Selector must be provided for Component decorator');
  });

  it('has selector', () => {
    const component = new TestComponent();
    expect(component._selector).to.be.equal('test');
  });

  it('has inherited properties', () => {
    const component = new TestComponent();
    expect(component.$emit).to.be.a('function');
  });

  it('is instance of Component', () => {
    const component = new TestComponent();
    expect(component).to.be.instanceof(ComponentType);
  });

  it('has own properties', () => {
    const component = new TestComponent();
    expect(component.property).to.be.equal(1);
  })

  it('has own methods', () => {
    const component = new TestComponent();
    expect(component.method).to.be.a('function');
  });
});
