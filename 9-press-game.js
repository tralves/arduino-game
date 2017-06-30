const five = require("johnny-five");

const board = new five.Board();

board.on("ready", function() {

  const teamWhiteButton = new five.Button(2);
  const teamBlackButton = new five.Button(3);

  const teamWhiteLed = new five.Led(5);
  const teamBlackLed = new five.Led(6);

  const pointer = new five.Servo({pin: 10, center: true});

  let teamWhiteScore = 0;
  let teamBlackScore = 0;

  var io = require('socket.io')();
  var middleware = require('socketio-wildcard')();

  io.use(middleware);

  io.on('connection', function(socket){
    console.log('socket connected!');
    socket.on('clickWhite', addPointToTeamWhite);
    socket.on('clickBlack', addPointToTeamBlack);

    socket.on('*', function(packet){
      console.log(packet.data);
    });

  });
  io.listen(9000);

  teamWhiteButton.on('down', addPointToTeamWhite );
  teamBlackButton.on('down', addPointToTeamBlack );

  function addPointToTeamWhite() {
    teamWhiteScore++;
    teamWhiteLed.on(50);
    board.wait(50, () => {teamWhiteLed.stop().off()})
    showScore();
  }

  function addPointToTeamBlack() {
    teamBlackScore++;
    teamBlackLed.on(50);
    board.wait(50, () => {teamBlackLed.stop().off()})
    showScore();
  }

  function showScore() {
    pointer.to(teamWhiteScore - teamBlackScore + 90);
    console.log(`WHITE ${teamWhiteScore} - ${teamBlackScore} BLACK`);
  }

  board.repl.inject({
    teamWhiteButton,
    teamBlackButton
  });

});