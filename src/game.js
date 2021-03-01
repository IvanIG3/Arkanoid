import gameoverImage from './assets/gameover.png';
import backgroundImage from './assets/background.png';
import platformImage from './assets/platform.png';
import ballImage from './assets/ball.png';

import Ball from './components/ball';
import Platform from './components/platform';

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.score = 0;
        this.ball = new Ball(this);
        this.platform = new Platform(this);
    }

    preload() {
        // Load images
        this.load.image('logo', gameoverImage);
        this.load.image('background', backgroundImage);
        this.load.image('gameover', gameoverImage);
        this.load.image('platform', platformImage);
        this.load.image('ball', ballImage);
    }

    create() {
        // Background
        this.add.image(400, 250, 'background');

        // Gameover
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;

        // Create components
        this.platform.create();
        this.ball.create();

        // Keyboard cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // Score
        this.scoreText = this.add.text(16, 16, `PUNTOS: ${this.score}`, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        // World
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.physics.add.collider(this.ball.get(), this.platform.get(), this.platformImpact, null, this);
    }

    update() {
        // Check if game over
        if (this.ball.isLost()) {
            this.gameoverImage.visible = true;
            this.scene.pause();
        }

        // Eject ball
        if (this.cursors.up.isDown) {
            this.ball.eject(-75);
        }

        this.ball.update(this.cursors);
        this.platform.update(this.cursors);
    }

    platformImpact() {
        this.score++;
        this.scoreText.setText(`PUNTOS: ${this.score}`);
        const relativeImpact = this.ball.get().x - this.platform.get().x;
        this.ball.get().setVelocityX(10 * relativeImpact);
    }
}