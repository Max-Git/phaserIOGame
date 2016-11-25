//'use strict';

var game = new Phaser.Game(2048, 512, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update });

// variables
var cursors;
var jumpCmd;
var horse;
var back;
var hills;
var grass;
var cloud;
var clouds;
var jumpTimer = 0;
var globalGravity = 9;
var isJumping = false;
var cloudTimer;
 
/**
 * Init / loading assets
 */
function preload() {
    game.scale.maxWidth = 2048;
    game.scale.maxHeight = 640;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // chargement des resources 
    game.load.image('background', 'assets/backgrounds/scroll_bg_far.png');
    game.load.image('hills', 'assets/backgrounds/hills-scroll.png');
    game.load.image('grass', 'assets/backgrounds/tile_grass.png');

    game.load.atlas('horse', 'assets/horse.png', 'assets/horse.json');
    game.load.atlas('clouds', 'assets/sprites/clouds.png', 'assets/sprites/clouds.json');
}

/**
 * Adding elements to the game
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    jumpCmd = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    back = game.add.tileSprite(0, 0, 2048, 640, 'background');
    hills = game.add.tileSprite(0, 160, 2048, 384, 'hills');
    grass = game.add.tileSprite(0, 384, 2048, 128, 'grass');
    
    horse = game.add.sprite(75, 284, 'horse', 'horse');

    game.physics.enable(horse, Phaser.Physics.ARCADE);
    clouds = game.add.physicsGroup(Phaser.Physics.ARCADE);

    horse.body.bounce.y = 0.3;

    var bendAnimFrames = Phaser.Animation.generateFrameNames('horse-bend-', 0, 3, '', 2);
    Phaser.Animation.generateFrameNames('horse-bend-', 2, 1, '', 2).forEach(function(element) {
        bendAnimFrames.push(element);
    }, this);
    
    horse.animations.add('run', Phaser.Animation.generateFrameNames('horse-run-', 0, 6, '', 2), 20, false);
    horse.animations.add('jump', Phaser.Animation.generateFrameNames('horse-jump-', 0, 6, '', 2), 10, true);
    horse.animations.add('bend', bendAnimFrames, 3, true);

    horse.animations.play('bend');

    cloudTimer = game.time.create(false);
    cloudTimer.loop(game.rnd.integerInRange(3500, 10000), newCloud, this);
    cloudTimer.start();
}

/**
 * main loop
 */
function update() {
    clouds.forEachAlive(function (cloud){
        cloud.body.x -= 1;
    });
    

    if (horse.y <= 270)
    {
        horse.body.velocity.y = 50;
    } 

    if (horse.y == 284)
    {
        horse.body.velocity.y = 0;
        isJumping = false;
    }

    if (cursors.right.isDown) 
    {
        back.tilePosition.x -= 1;
        hills.tilePosition.x -= 3;
        grass.tilePosition.x -= 6;
        clouds.forEachAlive(function (cloud){
            cloud.body.x -= 2;
        });

        if (jumpCmd.isDown && !isJumping) 
        {
            horse.animations.stop('run');
            horse.animations.play('jump');
            horse.body.velocity.y = -50;
            isJumping = true;
        }
        else
        {
            if (!isJumping)
                horse.animations.play('run');
            else
                horse.animations.play('jump');
        }
    }
    else
    {
        horse.animations.play('bend');
    }
}

function newCloud() {
    var cloudName = 'cloud-'+game.rnd.integerInRange(0, 2);
    var aCloud = clouds.create(1850, game.rnd.integerInRange(30, 60), 'clouds', cloudName);
    aCloud.body.collideWorldBounds=true;

    aCloud.body.onWorldBounds = new Phaser.Signal();
    aCloud.body.onWorldBounds.add(KillCloud, this);

    return aCloud;
}

function KillCloud(aCloud){
    aCloud.kill();
    //newCloud();
}