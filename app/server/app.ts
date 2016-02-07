//  tsc --sourcemap --outDir .\app\server\ .\app\server\app.ts
//  bower install angularjs#1.4.9 socket.io-client angular-socket-io  --save
var express = require('express');
// import * as express from "express";
var app = express();
var httpServer = require("http").createServer(app);
var five = require('johnny-five');
// import * as five from "johnny-five";
var EtherPort = require("etherport");
// import * as Etherport from "etherport";
var io = require('socket.io')(httpServer);

var Firmata = require("firmata").Board;

app.use(express.static(__dirname + '/client/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
});

var port = process.env.PORT || 8000;
httpServer.listen(port);
console.log('Server available at http://localhost:' + port);

var relay;
//Arduino board connection

var board = new five.Board({ 
  port: new EtherPort(3030) 
});
// var board = new Firmata(new EtherPort(3030));
// var board = new five.Board({ port: "COM3" });
board.on("ready", function() {
    console.log('Arduino connected');
    relay = new five.Relay(6);

    // console.log("Arduino connected using Firmata.js!");
    // var state = 1;

    // this.pinMode(6, this.MODES.OUTPUT);

    // setInterval(function() {
    //     this.digitalWrite(6, (state ^= 1));
    // }.bind(this), 500);
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
 