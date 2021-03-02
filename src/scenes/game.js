import Ball from '../components/ball';
import Platform from '../components/platform';
import Bricks from '../components/bricks';
import Score from '../components/score';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.ball = new Ball(this);
        this.platform = new Platform(this);
        this.bricks = new Bricks(this);
        this.score = new Score(this);
    }

    create() {
        // Background
        this.add.image(400, 250, 'background');

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
            this.bricks.get().setVisible(false);
            this.scene.start('gameover');
        }

        // Eject ball
        if (this.cursors.up.isDown) {
            const direction = this.ball.get().x - this.platform.get().x;
            this.ball.eject(direction * 10);
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
            this.scene.start('congratulations');
        }
    }
}