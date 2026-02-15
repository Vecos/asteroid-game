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

    console.log('Font loaded:', document.fonts.check('12px kenvector_future'));


    document.fonts.ready.then(() => {
      this.createMenu();
    });
  }

  private createMenu(): void {
    const { width, height } = this.scale;

    // Title
    this.add.text(width / 2, height / 3, 'ASTEROID\nPIF PAF GAME', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'kenvector_future',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);

    // Select Ship
    this.add.text(width / 2, height / 2 + 100, 'SELECT YOUR SHIP', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'kenvector_future'
    }).setOrigin(0.5);

    // Ship selection
    const ships = ['player', 'playerRed', 'playerGreen'];
    const shipSprites: Phaser.GameObjects.Image[] = [];

    ships.forEach((ship, i) => {
      const x = width / 2 + (i - 1) * 150;
      const sprite = this.add.image(x, height / 2, ship)
        .setScale(1)
        .setInteractive({ cursor: 'pointer' })
        .on('pointerdown', () => {
          this.selectedPlayerSprite = ship;
          shipSprites.forEach(s => s.setScale(1));
          sprite.setScale(1.2);
        });
      shipSprites.push(sprite);
      if (i === 0) sprite.setScale(1.2);
    });

    // Start button
    const startBtn = this.add.text(width / 2, height - 100, 'START GAME', {
      fontSize: '28px',
      color: '#00ff00',
      fontFamily: 'kenvector_future'
    })
    .setOrigin(0.5)
    .setInteractive({ cursor: 'pointer' })
    .on('pointerover', () => {
      startBtn.setColor('#66ff66');
      startBtn.setFontSize('32px');
    })
    .on('pointerout', () => {
      startBtn.setColor('#00ff00');
      startBtn.setFontSize('28px');
    })
    .on('pointerdown', () => {
      this.sound.unlock();
      this.scene.stop('MainMenu');
      this.registry.set('playerSprite', this.selectedPlayerSprite);
      this.scene.start('GameScene');
    });

    // Controls
    this.add.text(width / 2, height - 50, 'Arrows = Move | Space = Shoot | Alt = Strong Laser', {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'kenvector_future'
    }).setOrigin(0.5);
  }
}
