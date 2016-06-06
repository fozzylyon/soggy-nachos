var controller = require('./controller');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('lodash');


server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/gamepad', function (req, res) {
  res.sendFile(__dirname + '/gamepad.html');
});

io.on('connection', function (socket) {
  socket.emit('hello', { hello: 'world' });
  
  socket.on('data', function(data) {
    console.log('data', data);
    if (_.isNumber(data.left)) {
      if (data.left > 45) controller.left.fwd(data.left);
      else if (data.left < -45) controller.left.rev(data.left);
      else controller.left.stop();
    }
    else if (_.isNumber(data.right)) {
      if (data.right > 45) controller.right.fwd(data.right);
      else if (data.right < -45) controller.right.rev(data.right);
      else controller.right.stop();
    }
    else if (_.isNumber(data.servo)) {
      controller.servo.to(data.servo);
    }
    else if (_.isNumber(data.weapon)) {
      controller.weapon.to(data.weapon);
    }
    if (data.hasOwnProperty('led')) {
      // controller.led 
    }

  });
});