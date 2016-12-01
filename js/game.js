//'use strict';

var game = new Phaser.Game(2048, 512, Phaser.CANVAS, 'gameDiv');

//game.state.add('boot', bootState);
//game.state.add('load', loadState);
//game.state.add('menu', menuState);
game.state.add('play', playState);
//game.state.add('win', winState);

game.state.start('play');