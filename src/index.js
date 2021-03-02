import Phaser from 'phaser';
import InitGameScene from './scenes/initgame';
import GameScene from './scenes/game';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [InitGameScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);