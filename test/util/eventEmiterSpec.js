import chai from 'chai';
import EventEmitter from '../../src/util/eventemitter.js';

let expect = chai.expect;

describe('EventEmitter', () => {

  it('instantiates', () => {
    let emitter = new EventEmitter();
    expect(emitter).to.be.an.instanceof(EventEmitter);
  });

  it('add event listener', () => {
    let emitter = new EventEmitter();
    expect(emitter._listeners.size).to.be.equal(0);
    emitter.addListener('event', () => {});
    expect(emitter._listeners.size).to.be.equal(1);
  });

  it('remove event listener', () => {
    let emitter = new EventEmitter();
    const callback = () => {};
    emitter.addListener('event', callback);
    expect(emitter._listeners.get('event').length).to.be.equal(1);
    emitter.removeListener('event', callback);
    expect(emitter._listeners.get('event').length).to.be.equal(0);
  })

  it('emit event', () => {
    let emitter = new EventEmitter();
    let count = 0;
    emitter.addListener('event', (data) => count = data.count);
    emitter.emit('event', {
      count: 1
    });
    expect(count).to.be.equal(1);
  });

});
