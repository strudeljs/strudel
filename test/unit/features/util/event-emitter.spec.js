import EventEmitter from '../../../../src/util/eventEmitter';

describe('Util EventEmitter', () => {
  beforeEach(() => {
    EventEmitter.removeAllListeners();
  });

  it('instantiates', () => {
    const emitter = new EventEmitter();
    expect(emitter).toEqual(jasmine.any(EventEmitter));
  });

  it('add event listener', () => {
    const emitter = new EventEmitter();
    expect(Object.keys(EventEmitter.getEvents()).length).toEqual(0);
    emitter.$on('event', () => {});
    expect(Object.keys(EventEmitter.getEvents()).length).toEqual(1);
  });

  it('remove event listener', () => {
    const emitter = new EventEmitter();
    const callback = () => {};
    emitter.$on('event', callback);
    expect(EventEmitter.getEvents().event.length).toEqual(1);
    emitter.$off('event', callback);
    expect(EventEmitter.getEvents().event.length).toEqual(0);
  });

  it('emit event', () => {
    const emitter = new EventEmitter();
    let count = 0;
    emitter.$on('event', (data) => {
      count = data.count;
    });
    emitter.$emit('event', {
      count: 1
    });
    expect(count).toEqual(1);
  });
});
