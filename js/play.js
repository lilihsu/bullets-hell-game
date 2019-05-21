var spacefield;
var backgroundv;

var player;
var cursors;

var bullets;
var bulletTime=0;
var fireButton;
var skillButton;

var enemyBullets;
var enemyBulletTime=0;

var enemies;
var livingEnemies=[];

var score = 0;
var scoreText;
var scoreString='';

var stateText;

var playerLife=5;
var lives;

var leveupTime=1000;

var skill=0;
var skillText;
var skillString='';

var emitter;

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
    // create emitter

    emitter=game.add.emitter(0,0,1000);
    emitter.makeParticles('pixel');
    emitter.setYSpeed(-150,150);
    emitter.setXSpeed(-150,150);

    emitter.setScale(2,0,2,0,800);
    emitter.gravity =0;
    //player animation
    player.animations.add('playerfly',[0,1,2,3],20,true);
    player.play('playerfly');
    //create bullet
    bullets = game.add.group();
    bullets.enableBody=true;
    bullets.physicsBodyType= Phaser.Physics.ARCADE;
    bullets.createMultiple(3000,'bullet');
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
    skillButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    //create enemy
    enemies =game.add.group();
    enemies.enableBody=true;
    enemies.physicsBodyType= Phaser.Physics.ARCADE;
    
    createEnemies();
    //score
    scoreString ='Score : ';
    scoreText = game.add.text(0,550,scoreString+score,{font: '32px Arial',fill: '#fff'});
    //life
    lives=game.add.group();
    //skill
    skillString ='Skill : ';
    skillText = game.add.text(0,50,scoreString+score,{font: '32px Arial',fill: '#fff'});

    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    for (var i = 0; i < 3; i++) 
    {
        var heart = lives.create(game.world.width - 150 + (50 * i), 60, 'heart');
        heart.anchor.setTo(0.5, 0.5);
        heart.alpha = 0.4;
    }
    
    //An explosion pool
    explosions= game.add.group();
    explosions.createMultiple(30,'kaboom');
    explosions.forEach(setupEnemy,this);
    },
    
    update:function(){



        player.body.velocity.x=0;
        spacefield.tilePosition.y+=backgroundv;
        if(player.alive){
            if(cursors.left.isDown){
                player.body.velocity.x=-350;
            }
            if(cursors.right.isDown){
                player.body.velocity.x=350;
            }
    
            //console.log(fireButton.isDown);
            if(fireButton.isDown){
                firebullet();
                
            }
            console.log(skillButton.isDown);
            if(skillButton.isDown&&skill>0){
                fireSkill();
            }
            if(game.time.now>enemyBulletTime){
                enemyFireBullet();
            }
            
            if(score>=1000){
                leveupTime=100;
            }
            if(score==1000){
                skill=2;
                skillText.text = skillString+skill;
            }
            game.physics.arcade.overlap(bullets,enemies,collisionHandler,null,this);
            game.physics.arcade.overlap(enemyBullets,player,enemyCollisionHandler,null,this);
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
            emitter.x=bullet.x;
            emitter.y=bullet.y;
            emitter.start(true,3000,null,15);
        }
    }
}
function fireSkill(){
    if(game.time.now>bulletTime){
        for (let i = 0; i < 10; i++) {
            var bullet = bullets.getFirstExists(false);
            if(bullet){
                bullet.reset(player.x,player.y);
                const speed = 400;
                let theta = game.rnd.frac() * 3.1415 / 2 - 3.1415 * 3 / 4;
                bullet.body.velocity.y = speed * Math.sin(theta);
                bullet.body.velocity.x = speed * Math.cos(theta);
            }
        }
        bulletTime = game.time.now+200;
        skill-=1;
        skillText.text = skillString+skill;
    }
}

function enemyFireBullet(){

    var enemyBullet = enemyBullets.getFirstExists(false);
    livingEnemies.length=0;

    enemies.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,120);
        enemyBulletTime = game.time.now + leveupTime;
        emitter.x=enemyBullet.x;
        emitter.y=enemyBullet.y;
        emitter.start(true,1000,null,15);
    }
           
        
    
}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function createEnemies(){
    for(var y =0;y<4;y++){
        for(var x=0;x<10;x++){
            var enemy = enemies.create(x*48,y*50,'enemy');
            enemy.anchor.setTo(0.5,0.5);
            enemy.animations.add('fly',[0,1,2,3],20,true);
            enemy.play('fly');
            enemy.body.moves=false;
            
        }
    }
    
    enemies.x= 100;
    enemies.y= 50;
    
    var tween = game.add.tween(enemies).to({x:200},2000,Phaser.Easing.Linear.None,true,0,1000,true);

    tween.onLoop.add(descend,this);
}

function setupEnemy (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}


function descend(){
    enemies.y+=10;
}

function collisionHandler(bullet,enemy){

    //kill enemy and bullet
    bullet.kill();
    enemy.kill();

    //increase score
    score +=100;
    scoreText.text = scoreString+score;

    // explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x,enemy.body.y);
    explosion.play('kaboom',30,false,true);

    if(enemies.countLiving()==0){
        score +=500;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        stateText.text = " You Won, \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
        game.state.start('end');

    }
}

function enemyCollisionHandler(player,enemyBullet){
    enemyBullet.kill();
    game.camera.shake(0.005,100);
    live =lives.getFirstAlive();

    if(live){
        live.kill();
    }

    //add explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
        game.state.start('end');
    }
}
