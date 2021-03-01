export default class Score {

    constructor(scene) {
        this.scene = scene;
        this.score = 0;
    }

    create() {
        this.scoreText = this.scene.add.text(16, 16, `PUNTOS: ${this.score}`, {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
    }

    increaseCounter(value) {
        this.score += value;
        this.scoreText.setText(`PUNTOS: ${this.score}`);
    }

}