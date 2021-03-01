import gameoverImage from './assets/gameover.png';
import backgroundImage from './assets/background.png';
import platformImage from './assets/platform.png';
import ballImage from './assets/ball.png';

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.score = 0;
    }

    preload() {
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

        // Platform
        this.platform = this.physics.add.image(400, 460, 'platform');
        this.platform.body.allowGravity = false;
        this.platform.setImmovable();
        this.platform.setCollideWorldBounds(true);

        // Ball
        this.ball = this.physics.add.image(385, 430, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setData('glue', true);

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
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
    }

    update() {
        // Check if game over
        if (this.ball.y > 500) {
            this.gameoverImage.visible = true;
            this.scene.pause();
        }

        // Eject ball
        if (this.cursors.up.isDown && this.ball.getData('glue')) {
            this.ball.setVelocity(-75, -300);
            this.ball.setData('glue', false);
        }

        // Cursor listener
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(-500);
            }
        } else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(500);
            }
        } else {
            this.platform.setVelocityX(0);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(0);
            }
        }
    }

    platformImpact() {
        this.score++;
        this.scoreText.setText(`PUNTOS: ${this.score}`);
        const relativeImpact = this.ball.x - this.platform.x;
        this.ball.setVelocityX(10 * relativeImpact);
    }
}