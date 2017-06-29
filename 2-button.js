const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
  const button = new five.Button(2);

  button.on("down", function() {
    console.log("down");
  });

  button.on("hold", function() {
    console.log("hold");
  });

  button.on("up", function() {
    console.log("up");
  });

  board.repl.inject({
    button: button
  });
});