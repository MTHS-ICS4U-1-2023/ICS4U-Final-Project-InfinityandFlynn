/**
 * This is the class that makes the sprite the player plays.
 *
 * Author: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { GameObjects } from 'phaser';

class Player extends GameObjects.Sprite
{
    public health: number = 100;
    public score: number;
    static x: number;
    static y: number;

    // The constructor initializes the player sprite.
    constructor (config: { scene: Phaser.Scene, x: number, y: number, key: string }, health: number, score: number)
    {
        super(config.scene, config.x, config.y, config.key);
        this.health = health;
        this.score = score;
    }

    // add player
    static addPlayer(scene: Phaser.Scene, player: Player)
    {
        scene.add.existing(player);
        scene.physics.add.existing(player);
    }


    // Takes keyboard input and moves the player sprite accordingly.
    static move(cursors: Phaser.Types.Input.Keyboard.CursorKeys)
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
    update()
    {
        if (this.y > 30)
        {
            this.y = 30;
        }
    }

    // if players health goes to 0, go to game over
    gameOver()
    {
        if (this.health == 0)
        {
            this.scene.scene.start('GameOver');
        }
    }

    // if player collides with enemy, lose health
    collideEnemy()
    {
        this.health -= 10;
    }

    // if player collides with coin, gain score and health
    collectCoin()
    {
        this.score += 10;
        this.health += 5;
    }
}
export default Player;