var endState = {
    create: function() {
        // Add a background image
        game.add.image(0, 0, 'background');
        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, 80, ' Game over!!!',
        { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/2,
        'score: ' +score, { font: '25px Arial', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);
        // Explain how to start the game
        var startLabel = game.add.text(game.width/2, game.height-80,
        'press the up arrow key to return to the menu', { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        // Create a new Phaser keyboard variable: the up arrow key
        // When pressed, call the 'start'
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },
    start: function() {
        // Start the actual game
        scoreText.visible =true;
        score=0;
        game.state.start('menu');
    },
}; 