export default class Bricks {

    constructor(scene) {
        this.scene = scene;
    }

    create(config) {
        this.bricks = this.scene.physics.add.staticGroup(config);
    }

    get() {
        return this.bricks;
    }

};