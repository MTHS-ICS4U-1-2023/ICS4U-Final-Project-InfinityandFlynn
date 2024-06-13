/**
 * This is the class that makes the sprite the player plays.
 *
 * Author: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { Physics, Scene } from 'phaser';

interface PlayerConfig {
    scene: Scene;
    x: number;
    y: number;
    texture: string;
}

class Player extends Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
    public health: number = 100;
    public score: number;

    constructor(config: PlayerConfig, health: number, score: number) {
        super(config.scene, config.x, config.y, config.texture);

        // Enable physics
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        
        // Set collide with world bounds
        this.setCollideWorldBounds(true);

        // Create cursor keys
        this.cursors = config.scene.input.keyboard?.createCursorKeys() || null;
        
        // health and score
        this.health = health;
        this.score = score;

        // Apply gravity (have to clarify the type of body)
        (this.body as Phaser.Physics.Arcade.Body).setGravityY(300);

    }


    update() {
        if (!this.cursors) return;

        const speed = 100;

        // Horizontal movement
        if (this.cursors.left?.isDown) {
            this.setVelocityX(-speed);
        } else if (this.cursors.right?.isDown) {
            this.setVelocityX(speed);
        } else {
            this.setVelocityX(0);
        }

        // Jumping
        if (this.cursors.up?.isDown) {
            this.setVelocityY(-150);
        }
    }
}
export default Player;
