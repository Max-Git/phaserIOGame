var loadState = {
    preload : function () {
        var loadingLabel = game.add.text(game.world.centerX, 380, 'Loading...', {font: '30px Courrier', fill: 'white'});

        // chargement des resources   
        game.load.image('background', 'assets/backgrounds/scroll_bg_far.png');
        game.load.image('hills', 'assets/backgrounds/hills-scroll.png');
        game.load.image('grass', 'assets/backgrounds/tile_grass.png');

        game.load.atlas('horse', 'assets/sprites/horse.png', 'assets/sprites/horse.json');
        game.load.atlas('clouds', 'assets/sprites/clouds.png', 'assets/sprites/clouds.json');
    },

    create: function () {
        splashBg = game.add.image(0, -50, 'splashBg');
        game.state.start('menu');
    }
};