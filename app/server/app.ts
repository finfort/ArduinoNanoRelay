//  tsc --sourcemap --outDir .\app\server\ .\app\server\app.ts
import * as express from "express";
var app = express();
var httpServer = require("http").createServer(app);
import * as five from "johnny-five";
var EtherPort = require("etherport");
var io = require('socket.io')(httpServer);
var favicon = require('serve-favicon');
var Firmata = require("firmata").Board;
app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/client/public'));
app.use(favicon(__dirname + '/client/public/favicon.ico'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
});


// httpServer.listen(port);
// console.log('Server available at http://localhost:' + port);
// var hostname = process.env.HOSTNAME || 'localhost';
//*****
httpServer.listen(app.get('port'));
console.log("Express server listening on port http://localhost:%d in %s mode", app.get('port'), app.settings.env);

//Arduino board connection

var board = new five.Board({
    port: new EtherPort(3030)
});
// var board = new Firmata(new EtherPort(3030));
// var board = new five.Board({ port: "COM3" });
var relay;
// try {
    

board.on("ready", function() {
    console.log('Arduino connected');
    relay = new five.Relay({
        pin: 6,
        type: "NO"
    });
    
    // setInterval(function() {
    //     relay.toggle();
    // }.bind(this), 500);
    
    // console.log("Arduino connected using Firmata.js!");
    // var state = 1;
    // this.pinMode(6, this.MODES.OUTPUT);
    // setInterval(function() {
    //     this.digitalWrite(6, (state ^= 1));
    // }.bind(this), 500);
});
board.on("error", function(msg) {
    console.log("Board Error:\n ", msg);
    process.exit(1);
});
// } catch (error) {
//     console.log("Catch error \n" + error);
// }
// // Socket connection handler
io.on('connection', function(socket) {
    console.log("socket id " + socket.id);
    socket.on('relay:on', function(data) {
        relay.on();
        console.log('relay ON RECEIVED');
    });

    socket.on('relay:off', function(data) {
        relay.off();
        console.log('relay OFF RECEIVED');

    });
    var id = setInterval(function() {
        let message =JSON.stringify(new Date());
        console.log(message);
        socket.emit('foo', message);
        // socket.emit(JSON.stringify(new Date()), function() { })
    }, 3000)


    socket.on("disconnect", function() {
        console.log("websocket connection close")
        clearInterval(id)
    })
});

console.log('Waiting for connection');
// setInterval(function() {
//     console.log('Waiting for connection');
// }.bind(this), 3000);
 