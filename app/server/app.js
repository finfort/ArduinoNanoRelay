//  tsc --sourcemap --outDir .\app\server\ .\app\server\app.ts
var express = require("express");
var app = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var EtherPort = require("etherport");
var io = require('socket.io')(httpServer);
var favicon = require('serve-favicon');
// var Firmata = require("firmata").Board;
app.set('port', (process.env.PORT || 8000));
// var port = process.env.PORT || 8000;
process.on('SIGTERM', httpServer.close.bind(httpServer));
app.use(express.static(__dirname + '/client/public'));
app.use(favicon(__dirname + '/client/public/favicon.ico'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
});
// httpServer.listen(port);
// console.log('Server available at http://localhost:' + port);
// var hostname = process.env.HOSTNAME || 'localhost';
httpServer.listen(app.get('port'));
console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
//Arduino board connection
var board = new five.Board({
    port: new EtherPort(3030)
});
// var board = new Firmata(new EtherPort(3030));
// var board = new five.Board({ port: "COM3" });
var relay;
board.on("ready", function () {
    console.log('Arduino connected');
    relay = new five.Relay({
        pin: 6,
        type: "NC"
    });
    setInterval(function () {
        relay.toggle();
    }.bind(this), 500);
    // console.log("Arduino connected using Firmata.js!");
    // var state = 1;
    // this.pinMode(6, this.MODES.OUTPUT);
    // setInterval(function() {
    //     this.digitalWrite(6, (state ^= 1));
    // }.bind(this), 500);
});
// Socket connection handler
io.on('connection', function (socket) {
    console.log("socket id " + socket.id);
    socket.on('relay:on', function (data) {
        relay.on();
        console.log('relay ON RECEIVED');
    });
    socket.on('relay:off', function (data) {
        relay.off();
        console.log('relay OFF RECEIVED');
    });
});
console.log('Waiting for connection');
setInterval(function () {
    console.log('Waiting for connection');
}.bind(this), 1000);
