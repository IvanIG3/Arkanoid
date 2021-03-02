import Phaser from 'phaser';
import InitGameScene from './scenes/initgame';
import GameScene from './scenes/game';
import GameoverScene from './scenes/gameover';
import CongratulationsScene from './scenes/congratulations';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [InitGameScene, GameScene, GameoverScene, CongratulationsScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);