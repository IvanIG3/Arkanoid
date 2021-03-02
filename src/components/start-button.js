
export default class StartButton {

    constructor(scene) {
        this.scene = scene;
    }

    create() {
        this.startButton = this.scene.add.sprite(400, 350, 'start');
        this.startButton.setInteractive();
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        });
        this.startButton.on('pointerdown', () => {
            this.scene.scene.start('game');
        });
    }

}