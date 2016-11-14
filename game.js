var game = new Phaser.Game(2048, 512, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update });

/**
 * Initialisation / chargement des assets
 */
function preload() {
    // Mise à l'échelle
    game.scale.maxWidth = 2048;
    game.scale.maxHeight = 512;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // chargement des resources 
    game.load.image('background', 'assets/backgrounds/scroll_bg_far.png');
    game.load.image('hills', 'assets/backgrounds/hills-scroll.png');
}

/**
 * Création des éléments sur la zone de jeu
 */
function create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.back = this.game.add.tileSprite(0, 0, 2048, 512, 'background');
    this.hills = this.game.add.tileSprite(0, 256, 2048, 256, 'hills');
}

/**
 * Boucle principale (requestAnnimationFrame)
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
    } 
}