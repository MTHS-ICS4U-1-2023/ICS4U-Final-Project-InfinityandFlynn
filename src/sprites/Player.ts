/**
 * This is the class that makes the sprite the player plays.
 *
 * Author: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite
{
    public health: number = 100;
    public score: number;

    // The constructor initializes the player sprite.
    constructor (scene: Phaser.Scene, x: number, y: number, health: number, score: number)
    {

        super(scene, x, y, 'mainSprite');

        this.health = health;
        this.score = score;

        let player = this.physics.add.sprite(100, 450, 'mainSprite');

        player.setBounce(0.2);
        player.setGravityY(300);
        player.setCollideWorldBounds(true);
        this.scene.add.existing(this);
    }

    // Takes keyboard input and moves the player sprite accordingly.
    move (cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        if (cursors.left.isDown)
        {
            // move the sprites to the left
            this.x -= 5;
        } else if (cursors.right.isDown)
        {
            // move the sprites to the right
            this.x += 5;
        } else if (cursors.up.isDown) {
            // move the sprites up
            this.y += 5;
        }
    }

    // don't let the player move below 30 on the y axis
    update ()
    {
        if (this.y > 30)
        {
            this.y = 30;
        }
    }

    // if players health goes to 0, go to game over
    gameOver ()
    {
        if (this.health == 0)
        {
            this.scene.scene.start('GameOver');
        }
    }

    // if player collides with enemy, lose health
    collideEnemy ()
    {
        this.health -= 10;
    }

    // if player collides with coin, gain score and health
    collectCoin ()
    {
        this.score += 10;
        this.health += 5;
    }
}
export default Player;
