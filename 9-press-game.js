const five = require("johnny-five");

const board = new five.Board();

board.on("ready", function() {

  const teamWhiteButton = new five.Button(2);
  const teamBlackButton = new five.Button(3);

  let teamWhiteScore = 0;
  let teamBlackScore = 0;

  teamWhiteButton.on('down', addPointToTeamWhite );
  teamBlackButton.on('down', addPointToTeamBlack );

  function addPointToTeamWhite() {
    teamWhiteScore++;
    showScore();
  }

  function addPointToTeamBlack() {
    teamBlackScore++;
    showScore();
  }

  function showScore() {
    console.log(`WHITE ${teamWhiteScore} - ${teamBlackScore} BLACK`);
  }

  board.repl.inject({
    teamWhiteButton,
    teamBlackButton
  });

});