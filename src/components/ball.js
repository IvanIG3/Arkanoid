export default class Ball {

    constructor(scene) {
        this.scene = scene;
        this.isGlued = true;
    }

    create() {
        this.ball = this.scene.physics.add.image(385, 430, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
    }

    isLost() {
        return this.ball.y > 500;
    }

    get() {
        return this.ball;
    }

    eject(direction) {
        if (this.isGlued) {
            this.ball.setVelocity(direction, -300);
            this.isGlued = false;
        }
    }

    glue() {
        this.isGlued = true;
    }

    update(cursors) {
        if (cursors.left.isDown && this.isGlued) {
            this.ball.setVelocityX(-500);
        } else if (cursors.right.isDown && this.isGlued) {
            this.ball.setVelocityX(500);
        } else if (this.isGlued) {
            this.ball.setVelocityX(0);
        }
    }
}