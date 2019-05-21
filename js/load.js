var loadState ={
    preload:function(){
        var loadingLabel =game.add.text(game.width/2,150,'loading...',{font:'30px Arial',fill:'#ffffff'});
        loadingLabel.anchor.setTo(0.5,0.5);

        var progressBar = game.add.sprite(game.width/2,200,'progressBar');
        progressBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(progressBar);

        game.load.image('startfield',"assets/startfield.jpg");
        game.load.image('bullet',"assets/beam.png");
        game.load.image('enemyBullet',"assets/enemy_bullet.png");
        game.load.image('heart',"assets/heart.png");
        game.load.spritesheet('player',"assets/Lightning.png",32,32);
        game.load.spritesheet('enemy','assets/Paranoid.png',32,32);
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        
    },
    create:function(){
        game.state.start('menu');
    }
}