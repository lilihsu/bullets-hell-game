var loadState ={
    preload:function(){
        var loadingLabel =game.add.text(game.width/2,150,'loading...',{font:'30px Arial',fill:'#ffffff'});
        loadingLabel.anchor.setTo(0.5,0.5);

        var progressBar = game.add.sprite(game.width/2,200,'progressBar');
        progressBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(progressBar);

        game.load.image('startfield',"assets/startfield.jpg");
        game.load.image('player',"assets/player.png");
        game.load.image('bullet',"assets/beam.png");
        game.load.image('enemyBullet',"assets/enemy_bullet.png");
        game.load.image('enemy',"assets/enemyShip.png");
    },
    create:function(){
        game.state.start('menu');
    }
}