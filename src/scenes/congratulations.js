import RestartButton from '../components/restart-button';

export default class CongratulationsScene extends Phaser.Scene {

    constructor() {
        super({ key: 'congratulations' });
    }

    init() {
        this.restartButton = new RestartButton(this);
    }

    create() {
        this.add.image(400, 250, 'background');
        this.restartButton.create();
        this.add.image(400, 150, 'congratulations');
    }
}