
var EtherPort = require("etherport");

var Firmata = require("firmata").Board;

var board = new Firmata(new EtherPort(3030));

var relay;

board.on("ready", function () {
    console.log("Arduino connected using Firmata.js!");
    var state = 1;
    this.pinMode(6, this.MODES.OUTPUT);
    setInterval(function () {
        this.digitalWrite(6, (state ^= 1));
    }.bind(this), 500);
});
board.on("error", function (msg) {
    console.log("Board Error:\n ", msg);
    process.exit(1);
});

console.log('Waiting for connection');
