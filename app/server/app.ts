//  tsc --sourcemap --outDir .\app\server\ .\app\server\app.ts
var express = require('express');
var app = express();
var httpServer = require("http").createServer(app);
import * as five from 'johnny-five';
var EtherPort = require("etherport");
var io = require('socket.io')(httpServer);

var port = 3000;
app.use(express.static(__dirname + '/client/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);

var relay;
//Arduino board connection
var board = new five.Board({ 
  port: new EtherPort(3030) 
});
// var board = new five.Board({ port: "COM3" });
board.on("ready", function() {
    console.log('Arduino connected');
    relay = new five.Relay(6);
});
 
//Socket connection handler
io.on('connection', function(socket) {
    console.log(socket.id);
    socket.on('relay:on', function(data) {
        relay.on();
        console.log('relay ON RECEIVED');
    });

    socket.on('relay:off', function(data) {
        relay.off();
        console.log('relay OFF RECEIVED');

    });
});

console.log('Waiting for connection');
 