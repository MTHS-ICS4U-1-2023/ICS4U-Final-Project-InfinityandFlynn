/**
 * This is the code for the enemy sprite.
 *
 * Author: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { GameObjects } from 'phaser';

class Enemy extends GameObjects.Sprite{
    enemySprite = this.scene.add.sprite(100, 450, 'enemySprite');
}
export default Enemy;