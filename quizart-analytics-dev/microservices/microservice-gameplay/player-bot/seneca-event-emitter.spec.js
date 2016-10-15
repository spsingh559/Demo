const seneca = require('../test/seneca');
const should = require('should');

describe('Event Emitter', function() {
  it('Emit Ping Event', function(done) {
    const eventEmitter = seneca();
    eventEmitter.on('ping', function(msg) {
      msg.should.have.property('msg');
      msg.msg.should.be.exactly('ping');
      done();
    });
    eventEmitter.emit('ping', {msg: 'ping'});
  })
});
