//'use strict';

var game = new Phaser.Game(2048, 512, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update });

// variables
var cursors;
var jumpCmd;
var horse;
var back;
var hills;
var jumpTimer = 0;
var globalGravity = 9;
 
/**
 * Init / loading assets
 */
function preload() {
    game.scale.maxWidth = 2048;
    game.scale.maxHeight = 512;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // chargement des resources 
    game.load.image('background', 'assets/backgrounds/scroll_bg_far.png');
    game.load.image('hills', 'assets/backgrounds/hills-scroll.png');

    game.load.atlas('horse', 'assets/horse.png', 'assets/horse.json');
}

/**
 * Adding elements to the game
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    jumpCmd = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    back = game.add.tileSprite(0, 0, 2048, 512, 'background');
    hills = game.add.tileSprite(0, 256, 2048, 256, 'hills');

    horse = game.add.sprite(75, 380, 'horse', 'horse');
    game.physics.enable(horse, Phaser.Physics.ARCADE);

    horse.animations.add('run', Phaser.Animation.generateFrameNames('horse-run-', 0, 6, '', 2), 20, false);
    horse.animations.add('jump', Phaser.Animation.generateFrameNames('horse-jump-', 0, 6, '', 2), 10, false);
    horse.animations.add('bend', Phaser.Animation.generateFrameNames('horse-bend-', 0, 3, '', 2), 10, true);

    horse.animations.play('bend');
}

/**
 * main loop
 */
function update() {
    
    if (cursors.right.isDown) 
    {
        back.tilePosition.x -= 2;
        hills.tilePosition.x -= 5;
        
        if (jumpCmd.isDown  ) // && game.time.now > jumpTimer && horse.body.onFloor()
        {
            horse.animations.stop('run');
            horse.animations.play('jump');
            //horse.body.gravity.y = globalGravity + 4;
            //jumpTimer = game.time.now + 150;
        }
        else
        {
            horse.animations.play('run');
        }
    }
    else
    {
        horse.animations.stop();
        horse.animations.play('bend');
        //horse.animations.frame = 19;
        //horse.body.gravity.y = globalGravity;
    }
}