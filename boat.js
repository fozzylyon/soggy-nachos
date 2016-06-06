var util = require('util');
var EventEmitter = require('events').EventEmitter;
var five = require('johnny-five');
var Particle = require('particle-io');


function Boat() {
  EventEmitter.call(this);

  var board = new five.Board({
    io: new Particle({
      token: process.env.PARTICLE_TOKEN,
      deviceId: process.env.PARTICLE_DEVICE_ID
    })
  });
  
  
  board.on('ready', function () {
    console.log('Device Ready..');

    this.motorL = new five.Motor({ pin: 'A4'});
    this.motorR = new five.Motor({ pin: 'A5'});
    this.rudder = new five.Servo('D0');

    this.rudder.to(90); //straighten out
    
    this.emit('ready');

  }.bind(this));

  this.board = board;
}
util.inherits(Boat, EventEmitter);


Boat.prototype.forward = function(speed) {
  this.motorL.start(speed);
  this.motorR.start(speed);
};

Boat.prototype.stop = function(speed) {
  this.motorL.stop();
  this.motorR.stop();
};

Boat.prototype.turn = function(degree) {
  this.rudder.to(degree);
};



module.exports = Boat;