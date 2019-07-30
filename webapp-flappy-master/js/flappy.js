// the Game object used by the phaser.io library

var actions = { preload: preload, create: create, update: update };
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
// Global score variable initialised to 0.
var score = 0;
// Global variable to hold the text displaying the score.
var labelScore;
// Global player variable declared but not initialised.
var player;
// Global pipes variable initialised to the empty array.
var pipes = [];
// the interval (in seconds) at which new pipe columns are spawned var pipeInterval = 1.75;
var pipeInterval = 1.75;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg","../assets/flappy-cropped.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipe","../assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  game.stage.setBackgroundColor("#F3D3A3");
  game.add.text(20, 20, "Welcome to my game",
    {font: "30px Arial", fill: "#FFFFFF"});
  labelScore = game.add.text(20, 60, "0",
    {font: "30px Arial", fill: "#FFFFFF"});
  player = game.add.sprite(80, 200, "playerImg");

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 800;
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);

}

/*
 * This function updates the scene. It is called for every new frame.
 */


function update() {
  game.physics.arcade.overlap(player, pipes, gameOver);
}

function addPipeBlock(x, y) {
// make a new pipe block
var block = game.add.sprite(x,y,"pipe");
// insert it in the pipe array
pipes.push(block);
game.physics.arcade.enable(block);
block.body.velocity.x = -200;
}

function generatePipe() {
// Generate random integer between 1 and 5. This is the location of the // start point of the gap.
  var gapStart = game.rnd.integerInRange(1, 5);
// Loop 8 times because 8 blocks fit in the canvas.
  for (var count = 0; count < 8; count++) {
// If the value of count is not equal to the gap start point // or end point, add the pipe image.
    if(count != gapStart && count != gapStart+1){
            addPipeBlock(750, count * 50);
        }
}
    // Increment the score each time a new pipe is generated.
    changeScore();
}



function playerJump() {
  player.body.velocity.y = -300;
}


function changeScore() {
//increments global score variable by 1 score++;
  score++;
// updates the score label labelScore.setText(score.toString());
  labelScore.setText(score.toString());
}


function gameOver() {
// stop the game (update() function no longer called) game.destroy();
  game.destroy();
}
