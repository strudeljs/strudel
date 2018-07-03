import Component from '../../../src/decorators/component';
import OnInit from '../../../src/decorators/onInit';
import element from '../__mocks';

@Component('test')
class TestComponent {
  isInit = false;
  isSecondMethodFired = false;
  isFirstMethodFired = false;

  init() {
    this.isInit = true;
  }

  @OnInit
  method1() {
    this.isFirstMethodFired = true;
  }

  @OnInit
  method2() {
    this.isSecondMethodFired = true;
  }
}

describe('Decorator OnInit', () => {
  it('runs methods on init()', () => {
    const component = new TestComponent({ element });
    expect(component.isFirstMethodFired).to.be.equal(true);
    expect(component.isSecondMethodFired).to.be.equal(true);
  });

  it('does not override init() method', () => {
    const component = new TestComponent({ element });
    expect(component.isInit).to.be.equal(true);
  });
});
