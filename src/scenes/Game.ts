import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    config: Phaser.Types.Scenes.SettingsConfig;

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 1024, 576);

        this.background = this.add.image(0, 0, 'gameBG').setOrigin(0, 0);
        this.background.setAlpha(1);

        // add player sprite (centers on 47, 417)
        

    }
}
