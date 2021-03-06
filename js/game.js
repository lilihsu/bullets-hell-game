// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
// Define our global variable
game.global = { score: 0 };
// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('end', endState);
// Start the 'boot' state
game.state.start('boot');