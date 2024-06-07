/**
 * Enemy class
 *
 * By: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { GameObjects } from 'phaser';
import Player from './Player';

class Enemey extends GameObjects.Sprite
{
    protected health: number = 10;

    // The constructor initializes the enemy sprite.
    constructor (scene: Phaser.Scene, x: number, y: number, health: number = 10)
    {
        super(scene, x, y, 'enemySprite');
        this.health = health;
    }

    // add enemy to the scene (random x, 450 y)
    addEnemy()
    {
        let enemy = this.physics.add.sprite(Math.floor(Math.random() * 1024), 450, 'enemySprite');
        enemy.setBounce(0.2);
        enemy.setGravityY(300);
        enemy.setCollideWorldBounds(true);
        this.scene.add.existing(this);
    }

    // Makes the enemy sprite move towards player if they're within 100 pixels 
    wakeUp (player: Player)
    {
        if (this.x - player.x < 100)
        {
            this.x -= 5;
        }
    }

    // if enemey hits player, player loses health
    hitPlayer (player: Player)
    {
        if (this.x - player.x < 10)
        {
            player.health -= 10;
        }
    }


    // if player hits enemy, enemy loses health
    hitEnemy(player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (player.x - this.x < 10 && cursors.space.isDown)
        {
            this.health -= 10;
            player.score += 10;
        }
    }


    // if the enemies health goes to 0, destroy the sprite
    dead ()
    {
        if (this.health == 0)
        {
            this.destroy();
        }
    }

}
export default Enemey;
