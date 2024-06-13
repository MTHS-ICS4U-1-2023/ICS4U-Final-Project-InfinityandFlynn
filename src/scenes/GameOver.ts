import { Scene } from 'phaser';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    highScoreText: Phaser.GameObjects.Text;

    constructor() {
        super('GameOver');
    }

    // gets score from game scene, which was passed over when the scenes swithed
    create(data: { score: number }) {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000ff);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(512, 100, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.scoreText = this.add.text(512, 200, 'Score: ' + data.score, {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        });
        this.scoreText.setOrigin(0.5);

        // Assume highScore is stored somewhere globally, or retrieve it from a local storage
        let highScore = parseInt(localStorage.getItem('highScore') || '0', 10);
        if (data.score > highScore) {
            highScore = data.score;
            localStorage.setItem('highScore', highScore.toString());
        }

        this.highScoreText = this.add.text(512, 300, 'High Score: ' + highScore, {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        });
        this.highScoreText.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

export default GameOver;
