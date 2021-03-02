import gameoverImage from '../assets/gameover.png';
import backgroundImage from '../assets/background.png';
import platformImage from '../assets/platform.png';
import ballImage from '../assets/ball.png';
import bluebrickImage from '../assets/brickBlue.png';
import blackbrickImage from '../assets/brickBlack.png';
import greenbrickImage from '../assets/brickGreen.png';
import orangebrickImage from '../assets/brickOrange.png';
import congratulationsImage from '../assets/congratulations.png';
import arkanoidImage from '../assets/arkanoid.png';
import startImage from '../assets/playbutton.png';
import restartImage from '../assets/restart.png';

import StartButton from '../components/start-button';

export default class InitGameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'initgame' });
    }

    preload() {
        // Load images
        this.load.image('logo', gameoverImage);
        this.load.image('background', backgroundImage);
        this.load.image('gameover', gameoverImage);
        this.load.image('platform', platformImage);
        this.load.image('ball', ballImage);
        this.load.image('bluebrick', bluebrickImage);
        this.load.image('blackbrick', blackbrickImage);
        this.load.image('greenbrick', greenbrickImage);
        this.load.image('orangebrick', orangebrickImage);
        this.load.image('congratulations', congratulationsImage);
        this.load.image('arkanoid', arkanoidImage);
        this.load.spritesheet('start', startImage, { frameWidth: 190, frameHeight: 49 });
        this.load.spritesheet('restart', restartImage, { frameWidth: 190, frameHeight: 49 });
    }

    init() {
        this.startButton = new StartButton(this);
    }

    create() {
        this.add.image(400, 250, 'background');
        const arkanoidLogo = this.add.image(400, 150, 'arkanoid');
        arkanoidLogo.setScale(.4);
        this.startButton.create();
    }

}