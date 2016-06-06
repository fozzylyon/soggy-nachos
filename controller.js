var five = require('johnny-five');
var Particle = require('particle-io');
var board = new five.Board({
  io: new Particle({
    token: '3e3919a9fe33b855693915a3d53ade83b04e1210',
    deviceId: '350035001847353236343033'
  })
});

board.on('ready', function() {
  console.log('Device Ready..');
  this.left = new five.Motor({
    pin: 'A4'
  });

  this.right = new five.Motor({
    pin: 'A5'
  });

  this.servo = new five.Servo('D0');
  this.weapon = new five.Servo('D3');

  this.repl.inject({
    left: this.left,
    right: this.right,
    servo: this.servo,
    weapon: this.weapon,
  });
});

module.exports = board;

