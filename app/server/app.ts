//  tsc --sourcemap --outDir .\app\server\ .\app\server\app.ts
var express = require('express');
// import * as express from 'express';
var app = express();
var httpServer = require("http").createServer(app);
 import * as five from 'johnny-five';
//var five = require('johnny-five');

var io = require('socket.io')(httpServer);

var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Server available at http://localhost:' + port);
var relay;
//Arduino board connection
 
// var board = new five.Board({ port: "COM3" });
// board.on("ready", function() {
//     console.log('Arduino connected');
//     relay = new five.Relay(10);
// });

// board.on("fail", function(event) {
//   /*
//     Event {
//       type: "info"|"warn"|"fail",
//       timestamp: Time of event in milliseconds,
//       class: name of relevant component class,
//       message: message [+ ...detail]
//     }
//   */
//   console.log("%s sent a 'fail' message: %s", event.class, event.message);
// });
 
// //Socket connection handler
// io.on('connection', function(socket) {
//     console.log(socket.id);
//     socket.on('relay:on', function(data) {
//         relay.on();
//         console.log('relay ON RECEIVED');
//     });

//     socket.on('relay:off', function(data) {
//         relay.off();
//         console.log('relay OFF RECEIVED');

//     });
// });

console.log('Waiting for connection');
 