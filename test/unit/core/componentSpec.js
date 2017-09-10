import Component from '../../../src/core/component';

describe('Component', () => {
  it('instantiates', () => {
    const component = new Component({});
    expect(component).to.be.an.instanceof(Component);
  });

  it('uses events', () => {
    const subscriber = new Component({});
    const publisher = new Component({});
    let count = 0;
    subscriber.$on('event', (data) => (count = data.count));
    publisher.$emit('event', {
      count: 1
    });
    expect(count).to.be.equal(1);
  });
});
