import * as Phaser from 'phaser';
import { AssetManager } from '../managers/AssetManager';

export default class MainMenu extends Phaser.Scene {
  private selectedPlayerSprite: string = 'player';

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(): void {
    AssetManager.preloadAssets(this);
  }

  create(): void {
    const { width, height } = this.scale;

    // Title
    this.add.text(width / 2, height / 3, 'JUST RANDOM ASTERPOID PIF PAF GAME', {
      fontSize: '42px',
      color: '#ffffff'
    }).setOrigin(0.5);


    this.add.text(width / 2, height / 2 + 100, 'SELECT YOUR SHIP', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Ship selection
    const ships = ['player', 'playerRed', 'playerGreen'];
    const shipSprites: Phaser.GameObjects.Image[] = [];
   

    ships.forEach((ship, i) => {
      const x = width / 2 + (i - 1) * 150;
      const sprite = this.add.image(x, height / 2, ship)
        .setScale(1)
        .setInteractive()
        .on('pointerdown', () => {
          this.selectedPlayerSprite = ship;
          shipSprites.forEach(s => s.setScale(1));
          sprite.scale = 1.2; // Highlight selected ship
        });
      
      shipSprites.push(sprite);
      if (i === 0) sprite.setScale(1.2);
    });

        // Start button
        const start: Phaser.GameObjects.Text = this.add.text(width / 2, height - 100, 'START GAME', {
    fontSize: '28px',
    color: '#00ff00'
    })
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerover', () => {
      start.setColor('#66ff66');
      start.setFontSize('32px');
    })
    .on('pointerout', () => {
      start.setColor('#00ff00');
      start.setFontSize('28px');
    })
    .on('pointerdown', () => {
    this.scene.stop('MainMenu');

    this.registry.set('playerSprite', this.selectedPlayerSprite);
    this.scene.start('GameScene');
    });

  

    // Controls
    this.add.text(width / 2, height - 50, 'Arrows = Move | Space = Shoot | Alt = Strong Laser', {
      fontSize: '14px',
      color: '#ffffffff'
    }).setOrigin(0.5);
  }
}