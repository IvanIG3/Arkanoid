import RestartButton from '../components/restart-button';

export default class GameoverScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameover' });
    }

    init() {
        this.restartButton = new RestartButton(this);
    }

    create() {
        this.add.image(400, 250, 'background');
        this.restartButton.create();
        this.add.image(400, 150, 'gameover');
    }

}