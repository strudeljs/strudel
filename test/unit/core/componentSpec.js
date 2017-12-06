import Component from '../../../src/core/component';
import element from '../__mocks';

describe('Component', () => {
  it('instantiates', () => {
    const component = new Component({ element });
    expect(component).to.be.an.instanceof(Component);
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
    expect(count).to.be.equal(1);
  });

  it('has beforeInit hook', () => {
    const component = new Component({ element });
    expect(component.beforeInit).to.be.a('function');
  });

  it('has init hook', () => {
    const component = new Component({ element });
    expect(component.init).to.be.a('function');
  });

  it('has beforeDestroy hook', () => {
    const component = new Component({ element });
    expect(component.beforeInit).to.be.a('function');
  });

  it('has destroy hook', () => {
    const component = new Component({ element });
    expect(component.init).to.be.a('function');
  });

  it('should teardown', () => {
    const component = new Component({ element });
    component.$teardown();
    expect(component.$element).to.be.an('undefined');
  });
});
