const five = require("johnny-five");
const board = new five.Board();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/** Express */
server.listen(80);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

/** Johnny Five */
board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",  // Sensor
    pin: 7
  });

  proximity.on("data", function() {
    var distanceCm = this.cm;
    io.sockets.emit('distanceData', distanceCm.toFixed())  // Socket.io
  });
});
