/**
 * Enemy class
 *
 * By: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { GameObjects } from 'phaser';
import Player from './Player';

class Enemy extends GameObjects.Sprite
{
    protected health: number = 10;

    // The constructor initializes the enemy sprite.
    constructor (config: { scene: Phaser.Scene, x: number, y: number, key: string }, health: number)
    {
        super(config.scene, config.x, config.y, config.key);
        this.health = health;
    }

    // add enemy to the scene
    public addEnemy(scene: Phaser.Scene, enemy: Enemy)
    {
        scene.add.existing(enemy);
        scene.physics.add.existing(enemy);
    }

    // generate random x value for enemy (between 500 and 924)
    static randomX()
    {
        return Math.floor(Math.random() * (924 - 500) + 500);
    }

    // Makes the enemy sprite move towards player if they're within 100 pixels 
    public wakeUp (player: Player)
    {
        if (this.x - player.x < 100)
        {
            this.x -= 5;
        }
    }

    // if enemey hits player, player loses health
    public hitPlayer (player: Player)
    {
        if (this.x - player.x < 10)
        {
            player.health -= 10;
        }
    }


    // if player hits enemy, enemy loses health
    public hitEnemy(player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (player.x - this.x < 10 && cursors.space.isDown)
        {
            this.health -= 10;
            player.score += 10;
        }
    }


    // if the enemies health goes to 0, destroy the sprite
    public dead ()
    {
        if (this.health == 0)
        {
            this.destroy();
        }
    }

}
export default Enemy;
