var spacefield;
var backgroundv;

var player;
var cursors;

var bullets;
var bulletTime=0;
var fireButton;

var enemyBullets;
var enemyBulletTime=0;

var enemies;

var score = 0;
var scoreText;
var winText;

var playerLife=5;
var lifeText;

var playState = {
    preload:function(){
    
    },

    create:function(){
    spacefield= game.add.tileSprite(0,0,800,600,'startfield');
    backgroundv = 5;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player =game.add.sprite(game.world.centerX,game.world.centerY+200, 'player');
    game.physics.enable(player,Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    //create bullet
    bullets = game.add.group();
    bullets.enableBody=true;
    bullets.physicsBodyType= Phaser.Physics.ARCADE;
    bullets.createMultiple(30,'bullet');
    bullets.setAll('anchor.x',0.5);
    bullets.setAll('anchor.y',1);
    bullets.setAll('outOfBoundsKill',true);
    bullets.setAll('checkWorldBounds',true);
    
    //create enemyBullet
    enemyBullets =game.add.group();
    enemyBullets.enableBody=true;
    enemyBullets.physicsBodyType=Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30,'enemyBullet');
    enemyBullets.setAll('anchor.x',0.5);
    enemyBullets.setAll('anchor.y',1);
    enemyBullets.setAll('outOfBoundsKill',true);
    enemyBullets.setAll('checkWorldBounds',true);
    

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    enemies =game.add.group();
    enemies.enableBody=true;
    enemies.physicsBodyType= Phaser.Physics.ARCADE;

    createEnemies();

    scoreText = game.add.text(0,550,'Score:',{font: '32px Arial',fill: '#fff'});
    lifeText = game.add.text(0,20,'Life:',{font: '32px Arial',fill: '#fff'});
    winText = game.add.text(game.world.centerX,game.world.centerY,'You win!',{font: '32px Arial',fill:'#fff'});
    winText.visible =false;
    },
    
    update:function(){

        game.physics.arcade.overlap(bullets,enemies,collisionHandler,null,this);
        game.physics.arcade.overlap(enemyBullets,player,enemyCollisionHandler,null,this);

        player.body.velocity.x=0;
        spacefield.tilePosition.y+=backgroundv;
        if(cursors.left.isDown){
            player.body.velocity.x=-350;
        }
        if(cursors.right.isDown){
            player.body.velocity.x=350;
        }


        if(fireButton.isDown){
            firebullet();
            
        }
        enemyFireBullet();

        scoreText.text ='Score:' +score;
        lifeText.text = 'Life:' +playerLife;
        if(score == 3200){
            winText.visible =true;
            scoreText.visible =false;
            game.state.start('end');
        }

    }
}

function firebullet(){
    if(game.time.now>bulletTime){
        var bullet = bullets.getFirstExists(false);
        if(bullet){
            bullet.reset(player.x,player.y);
            bullet.body.velocity.y =-400;
            bulletTime = game.time.now+200;
        }
    }
}

function enemyFireBullet(){
    if(game.time.now>enemyBulletTime){
        var enemyBullet = enemyBullets.getFirstExists(false);
        if(enemyBullet){
            
            enemyBullet.reset(enemies.x,enemies.y);
            enemyBullet.body.velocity.y =400;
            enemyBulletTime=game.time.now+200;
        }
           
        
    }
}


function createEnemies(){
    for(var y =0;y<8;y++){
        for(var x=0;x<10;x++){
            var enemy = enemies.create(x*48,y*50,'enemy');
            enemy.anchor.setTo(0.5,0.5);
        }
    }
    enemies.x= 100;
    enemies.y= 50;
    
    var tween = game.add.tween(enemies).to({x:200},2000,Phaser.Easing.Linear.None,true,0,1000,true);

    tween.onLoop.add(descend,this);
}

function descend(){
    enemies.y+=10;
}

function collisionHandler(bullet,enemy){
    bullet.kill();
    enemy.kill();

    score +=100;
}

function enemyCollisionHandler(player,enemyBullet){
    enemyBullet.kill();
    game.camera.shake(0.005,100);
}
