import Phaser from 'phaser';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export class Game extends Phaser.Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    player: Phaser.GameObjects.Sprite | null
    enemy: Phaser.GameObjects.Sprite | null
    platforms: Phaser.Physics.Arcade.StaticGroup | null
    coin: Phaser.Physics.Arcade.StaticGroup | null
    score: number

    constructor()
    {
        super('Game');

        this.player = null;
        this.enemy = null;
        this.platforms = null;
        this.coin = null;
        this.score = 0;

    }

    config: Phaser.Types.Scenes.SettingsConfig;

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 1024, 576);
        
        // make player 
        this.player = this.add.sprite(50, 100, 'playerSprite');
        let player = new Player({ scene: this, x: 100, y: 435, key: 'playerSprite' }, 100, 0);

        // make enemy (random x, 450 y)
        this.enemy = this.add.sprite(10, 100, 'enemySprite');
        let enemy = new Enemy({ scene: this, x: Enemy.randomX(), y: 435, key: 'enemySprite' }, 10);

        this.background = this.add.image(0, 0, 'gameBG').setOrigin(0, 0);
        this.background.setAlpha(1);

        // add player sprite
        Player.addPlayer(this, player);

        // every 10 seconds, add an enemy to the scene
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                enemy.addEnemy(this, enemy);
            },
            loop: true
        });

    }
}