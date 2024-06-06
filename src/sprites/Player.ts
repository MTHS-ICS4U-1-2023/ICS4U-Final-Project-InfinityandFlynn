/**
 * This is the code for the player character.
 *
 * Author: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { GameObjects } from 'phaser';
import { Physics } from 'phaser';

class Player extends GameObjects.Sprite{
    playerSprite = this.scene.add.sprite(100, 450, 'playerSprite');
    
}
export default Player;
