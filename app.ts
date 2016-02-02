// server.js
var express = require('express');
var app = express();
var httpServer = require("http").createServer(app);
import * as five from 'johnny-five';

var io = require('socket.io')(httpServer);

var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);
let relay;
//Arduino board connection
 
const board = new five.Board({ port: "COM3" });
board.on("ready", function() {
    console.log('Arduino connected');
    relay = new five.Relay(10);
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
 
 

// const board = new five.Board({ port: "COM3" });

// board.on("ready", function() {

//     let relay = new five.Relay(10);
//     this.repl.inject({
//         relay: relay
//     });
//     if (relay.isOn) {
//         console.log('turn off');
//         relay.off();
//     } else {
//         console.log('turn on');
//         relay.on();
//     }
//     console.log("Button pressed");
    
// });