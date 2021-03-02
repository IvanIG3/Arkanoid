import Phaser from 'phaser';
import GameScene from './scenes/game';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);