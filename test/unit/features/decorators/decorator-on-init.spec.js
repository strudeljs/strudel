import Component from '../../../../src/decorators/component';
import OnInit from '../../../../src/decorators/onInit';
import element from '../../__mocks';

describe('Decorator OnInit', () => {
  let TestComponent;

  beforeEach(() => {
    @Component('test')
    class TestComponentClass {
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

    TestComponent = TestComponentClass;
  })

  it('runs methods on init()', () => {
    const component = new TestComponent({ element });
    expect(component.isFirstMethodFired).toEqual(true);
    expect(component.isSecondMethodFired).toEqual(true);
  });

  it('does not override init() method', () => {
    const component = new TestComponent({ element });
    expect(component.isInit).toEqual(true);
  });
});
