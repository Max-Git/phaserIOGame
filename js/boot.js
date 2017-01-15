var bootState = {
    preload : function () {
        game.load.image('splashBg', 'assets/backgrounds/splash.png');
    },
    create : function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#bae0eb";

        splashBg = game.add.image(0, -50, 'splashBg');

        game.state.start('load');
    }
};