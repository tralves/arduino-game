var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` component instance
  var led = new five.Led(6);

  led.blink(500);

  board.repl.inject({
    led: led
  });
});