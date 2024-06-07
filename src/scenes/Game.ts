import { Scene } from 'phaser';
import { Player } from '../sprites/Player';
import { Enemy } from '../sprites/Enemy';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    player: Phaser.Physics.Arcade.Sprite | null
    enemy: Phaser.Physics.Arcade.Sprite | null
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
        
        // gave me an error when i just did this.add.sprite, ai suggested this way. fix later
        this.player = this.add.sprite(100, 450, 'playerSprite') as Phaser.Physics.Arcade.Sprite & Phaser.Physics.Arcade.Components.Acceleration;
        this.physics.add.existing(this.player);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(300);
        this.player.setBounce(0.2);

        // enemy (same issue as above)
        this.enemy = this.add.sprite(100, 450, 'enemySprite') as Phaser.Physics.Arcade.Sprite & Phaser.Physics.Arcade.Components.Acceleration;
        this.physics.add.existing(this.enemy);
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setGravityY(300);
        this.enemy.setBounce(0.2);

        this.background = this.add.image(0, 0, 'gameBG').setOrigin(0, 0);
        this.background.setAlpha(1);

        // add player sprite (centered around 100, 450)
        this.player = new Player(this, 100, 450, 100, 0);

            // every 10 seconds, add an enemy to the scene
            this.time.addEvent({
                delay: 10000,
                callback: () => {
                    let enemy = new Enemy(this, 0, 0, 10);
                    enemy.addEnemy();
                },
                loop: true
            });

    }
}
