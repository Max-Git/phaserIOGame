'use strict';

var game = new Phaser.Game(2048, 512, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update });

/**
 * Init / loading assets
 */
function preload() {
    this.game.scale.maxWidth = 2048;
    this.game.scale.maxHeight = 512;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // chargement des resources 
    this.game.load.image('background', 'assets/backgrounds/scroll_bg_far.png');
    this.game.load.image('hills', 'assets/backgrounds/hills-scroll.png');

    this.game.load.atlas('horse-run', 'assets/horse-run.png', 'assets/horse-run.json');
}

/**
 * Adding elements to the game
 */
function create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.back = this.game.add.tileSprite(0, 0, 2048, 512, 'background');
    this.hills = this.game.add.tileSprite(0, 256, 2048, 256, 'hills');

    this.horse = this.game.add.sprite(75, 380, 'horse-run', 'horse');
    this.horse.animations.add('run', Phaser.Animation.generateFrameNames('horse-run-', 0, 6, '', 2), 10, true);
}

/**
 * main loop
 */
function update() {
    if (this.cursors.left.isDown) 
    {
        //scroll the tile sprites by an amount of pixels on the X axis
        this.back.tilePosition.x += 2;
        this.hills.tilePosition.x += 5;
 
    } 
    else if (this.cursors.right.isDown) 
    {
        //scroll the tile sprites by an amount of pixels on the X axis
        this.back.tilePosition.x -= 2;
        this.hills.tilePosition.x -= 5;
        this.horse.animations.play('run');
    }
    else
    {
        this.horse.animations.stop('run');
    }
}