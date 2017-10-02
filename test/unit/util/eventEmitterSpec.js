import EventEmitter from '../../../src/util/eventEmitter';

describe('EventEmitter', () => {
  it('instantiates', () => {
    const emitter = new EventEmitter();
    expect(emitter).to.be.an.instanceof(EventEmitter);
  });

  it('add event listener', () => {
    const emitter = new EventEmitter();
    expect(Object.keys(emitter._listeners).length).to.be.equal(0);
    emitter.addListener('event', () => {});
    expect(Object.keys(emitter._listeners).length).to.be.equal(1);
  });

  it('remove event listener', () => {
    const emitter = new EventEmitter();
    const callback = () => {};
    emitter.addListener('event', callback);
    expect(emitter._listeners.event.length).to.be.equal(1);
    emitter.removeListener('event', callback);
    expect(emitter._listeners.event.length).to.be.equal(0);
  });

  it('emit event', () => {
    const emitter = new EventEmitter();
    let count = 0;
    emitter.addListener('event', (data) => {
      count = data.count;
    });
    emitter.emit('event', {
      count: 1
    });
    expect(count).to.be.equal(1);
  });
});
