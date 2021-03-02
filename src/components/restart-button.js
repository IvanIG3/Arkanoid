export default class RestartButton {

    constructor(scene) {
        this.scene = scene;
    }

    create() {
        this.restartButton = this.scene.add.sprite(400, 330, 'restart');
        this.restartButton.setInteractive();
        this.restartButton.on('pointerover', () => {
            this.restartButton.setFrame(1);
        });
        this.restartButton.on('pointerout', () => {
            this.restartButton.setFrame(0);
        });
        this.restartButton.on('pointerdown', () => {
            this.scene.scene.start('game');
        });
    }

}