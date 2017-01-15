var menuState = {
    create : function() {
        splashBg = game.add.image(0, -50, 'splashBg');
        var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        sKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}