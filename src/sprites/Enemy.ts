import { Physics } from 'phaser';
import Player from './Player';

interface EnemyConfig {
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
}

class Enemy extends Physics.Arcade.Sprite {
    health: number;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

    constructor(config: EnemyConfig, health: number = 10) {
        super(config.scene, config.x, config.y, config.key);
        this.health = health;

        // Enable physics
        config.scene.physics.world.enable(this);

        // Set collide world bounds
        this.setCollideWorldBounds(true);
    }

    // Add enemy to the scene
    static addEnemy(scene: Phaser.Scene, x: number, y: number, key: string, health: number): Enemy {
        const enemy = new Enemy({ scene, x, y, key }, health);
        scene.add.existing(enemy);
        return enemy;
    }

    // If player hits enemy, enemy loses health
    hitEnemy(player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if (cursors.space.isDown) {
            this.health -= 10;
            player.score += 10;
        }
    }

    // if enemy hits player, player loses 10 health
    hitPlayer(player: Player){
        player.health -= 10;
    }

    // Generate random x value for enemy (between 500 and 924)
    static randomX(): number {
        return Math.floor(Math.random() * (924 - 500 + 1)) + 500;
    }

    update(player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        this.cursors = cursors;

        if (this.health <= 0) {
            this.destroy();
            player.score += 10;
            return;
        }

        // Make enemy move towards player if within 100 pixels
        const distanceToPlayer = Math.abs(this.x - player.x);
        if (distanceToPlayer < 300) {
            this.setVelocityX(this.x > player.x ? -50 : 50);
        } else {
            this.setVelocityX(0);
        }

        // Make enemy attack player if within 10 pixels
        if (distanceToPlayer < 15){
            if (cursors.space.isDown){
                this.health -= 10;
            } else if (distanceToPlayer < 10){
                player.health -= 10;
                this.x += 20;
            }
        }
    }
}

export default Enemy;
