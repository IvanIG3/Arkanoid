import gameoverImage from './assets/gameover.png';
import backgroundImage from './assets/background.png';
import platformImage from './assets/platform.png';
import ballImage from './assets/ball.png';
import bluebrick from './assets/brickBlue.png';
import blackbrick from './assets/brickBlack.png';
import greenbrick from './assets/brickGreen.png';
import orangebrick from './assets/brickOrange.png';
import congratulationsImage from './assets/congratulations.png';

import Ball from './components/ball';
import Platform from './components/platform';
import Bricks from './components/bricks';
import Score from './components/score';

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.ball = new Ball(this);
        this.platform = new Platform(this);
        this.bricks = new Bricks(this);
        this.score = new Score(this);
    }

    preload() {
        // Load images
        this.load.image('logo', gameoverImage);
        this.load.image('background', backgroundImage);
        this.load.image('gameover', gameoverImage);
        this.load.image('platform', platformImage);
        this.load.image('ball', ballImage);
        this.load.image('bluebrick', bluebrick);
        this.load.image('blackbrick', blackbrick);
        this.load.image('greenbrick', greenbrick);
        this.load.image('orangebrick', orangebrick);
        this.load.image('congratulations', congratulationsImage);
    }

    create() {
        // Background
        this.add.image(400, 250, 'background');

        // Gameover
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;
        this.congratsImage = this.add.image(400, 90, 'congratulations');
        this.congratsImage.visible = false;

        // Create components
        this.platform.create();
        this.ball.create();
        this.score.create();
        this.bricks.create({
            key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick'],
            frameQuantity: 10,
            gridAlign: {
                width: 10,
                height: 4,
                cellWidth: 67,
                cellHeight: 34,
                x: 112,
                y: 100
            }
        });

        // Keyboard cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // World
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.physics.add.collider(this.ball.get(), this.platform.get(), this.platformImpact, null, this);
        this.physics.add.collider(this.ball.get(), this.bricks.get(), this.brickImpact, null, this);
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

    platformImpact(ball, platform) {
        this.score.increaseCounter(1);
        const relativeImpact = ball.x - platform.x;
        ball.setVelocityX(10 * relativeImpact);
    }

    brickImpact(ball, brick) {
        brick.disableBody(true, true);
        this.score.increaseCounter(5);
        if(this.bricks.get().countActive() === 0) {
            this.congratsImage.visible = true;
            this.scene.pause();
        }
    }
}