import Phaser from 'phaser';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export class Game extends Phaser.Scene {
    private camera: Phaser.Cameras.Scene2D.Camera;
    private background: Phaser.GameObjects.TileSprite;
    private healthText: Phaser.GameObjects.Text;
    private scoreText: Phaser.GameObjects.Text;
    private helpText: Phaser.GameObjects.Text;

    private player: Player | null = null;
    private enemies: Phaser.GameObjects.Group | null = null;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
    private finalScore: number = 0; // Property to store the final score

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 2048, 576); // Set bounds larger than the visible area

        // Add background as a TileSprite for repeating background
        this.background = this.add.tileSprite(0, 0, 2048, 576, 'gameBG').setOrigin(0, 0);
        this.background.setScrollFactor(0);

        // Set the world bounds so the player can't go below y = 450
        this.physics.world.setBounds(0, 0, 1048, 450);

        // Create player and add to scene
        this.player = new Player({
            scene: this,
            x: 100,
            y: 450,
            texture: 'playerSprite'
        }, 100, 0);

        // Add player to the scene
        this.add.existing(this.player);

        // Make the camera follow the player
        this.camera.startFollow(this.player, true, 0.5, 0.5); // Center the player

        // Initialize enemies group
        this.enemies = this.add.group();

        // Create cursors if input.keyboard is not null
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();

            // Enable physics for the player
            this.physics.add.existing(this.player);

            // Enable physics for the enemies
            if (this.enemies) {
                this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) => {
                    this.physics.add.existing(enemy);
                });
            }
        }

        // Create text for player's health
        this.healthText = this.add.text(850, 10, 'Health: ' + (this.player?.health ?? 0), {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0);

        // Create text for player's score
        this.scoreText = this.add.text(850, 30, 'Score: ' + (this.player?.score ?? 0), {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0);

        this.helpText = this.add.text(10, 10, 'Use arrow keys to move (up to jump) and space to attack', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0);

        // Create enemy and add to scene periodically
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                if (this.player) {
                    const enemyX = this.player.x - Phaser.Math.Between(200, 400);
                    const enemyY = 450; // Set y position of the enemy
                    const enemy = Enemy.addEnemy(this, enemyX, enemyY, 'enemySprite', 10); // Create and add enemy

                    // Add enemy to the group
                    if (this.enemies) {
                        this.enemies.add(enemy);
                    }
                }
            },
            loop: true
        });

        // Add 5 health to the player's health every 5 seconds
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                if (this.player) {
                    if (this.player.health < 95) {
                        this.player.health += 5;
                    }
                }
            },
            loop: true
        });
    }

    update() {
        if (this.player && this.cursors && this.enemies) {
            // Update player and enemies
            this.player.update();

            // Update all enemies
            this.enemies.getChildren().forEach((enemy: Phaser.GameObjects.GameObject) => {
                (enemy as Enemy).update(this.player as Player, this.cursors as Phaser.Types.Input.Keyboard.CursorKeys);
            });

            // Update the background's tile position based on player's movement
            if (this.player.body) {
                // Adjust the background's position to give the illusion of infinite scrolling
                this.background.tilePositionX += this.player.body.velocity.x * this.game.loop.delta / 1000;
            }

            // Check if player health is 0, go to game over
            if (this.player.health === 0) {
                this.finalScore = this.player.score; // Store the final score
                this.scene.start('GameOver', { score: this.finalScore }); // Pass the score to the GameOver scene
            }

            // Ensure the camera keeps the player centered
            this.camera.scrollX = this.player.x - this.camera.width / 2;
            this.camera.scrollY = this.player.y - this.camera.height / 2;

            // Update text displaying player's health and score
            this.healthText.setText('Health: ' + this.player.health);
            this.scoreText.setText('Score: ' + this.player.score);
        }
    }
}

export default Game;
