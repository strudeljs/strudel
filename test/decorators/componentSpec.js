import chai from 'chai';
import Component from '../../src/decorators/component.js';
import Registry from '../../src/core/registry.js';

let expect = chai.expect;

@Component({
  selector: 'test'
})
class TestComponent {
  method() {
    return 'test';
  }
}

describe('Component Decorator', () => {

  it('registers', () => {
    let registry = new Registry();
    expect(registry.getComponent('test')).to.be.a('function');
    registry.clear();
  });

  it('has selector', () => {
    let component = new TestComponent();
    expect(component._selector).to.be.equal('test');
  })

  it('has inherited properties', () => {
    let component = new TestComponent();
    expect(component.emit).to.be.a('function');
  })

  it('has own properties', () => {
    let component = new TestComponent();
    expect(component.method).to.be.a('function');
  })

});
