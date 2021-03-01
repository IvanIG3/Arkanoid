export default class Platform {

    constructor(scene) {
        this.scene = scene;
    }

    create() {
        this.platform = this.scene.physics.add.image(400, 460, 'platform');
        this.platform.body.allowGravity = false;
        this.platform.setImmovable();
        this.platform.setCollideWorldBounds(true);
    }

    get() {
        return this.platform;
    }

    update(cursors) {
        if (cursors.left.isDown) {
            this.platform.setVelocityX(-500);
        } else if (cursors.right.isDown) {
            this.platform.setVelocityX(500);
        } else {
            this.platform.setVelocityX(0);
        }
    }
}