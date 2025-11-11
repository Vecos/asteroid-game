import * as Phaser from 'phaser';
import { GameConfig } from '../config/gameConfig';
import { Player } from '../objects/Player';

export class WeaponManager {
  // private scene: Phaser.Scene;
  private player: Player;
  private lasers: Phaser.Physics.Arcade.Group;
  private fireButton: Phaser.Input.Keyboard.Key;
  private altKey: Phaser.Input.Keyboard.Key;
  private laserSound: Phaser.Sound.BaseSound;
  private strongLaserSound: Phaser.Sound.BaseSound;
  private lastFired = 0;
  private lastStrongFired = 0;

  constructor(scene: Phaser.Scene, player: Player) {
    // this.scene = scene;
    this.player = player;
    this.lasers = scene.physics.add.group();
    this.fireButton = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.altKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
    this.laserSound = scene.sound.add('laserSound', { volume: 0.5 });
    this.strongLaserSound = scene.sound.add('strongLaserSound', { volume: 0.5 });
  }

  update(time: number): void {
    this.handleFiring(time);
    this.cleanupLasers();
  }

  private handleFiring(time: number): void {
    if (this.fireButton.isDown && time > this.lastFired + GameConfig.FIRE_RATE) {
      this.fireLaser();
      this.lastFired = time;
    }

    if (this.altKey.isDown && time > this.lastStrongFired + GameConfig.STRONG_FIRE_RATE) {
      this.fireStrongLaser();
      this.lastStrongFired = time;
    }
  }

  private fireLaser(): void {
    const playerSprite = this.player.getSprite();
    const laser = this.lasers.create(
      playerSprite.x,
      playerSprite.y - playerSprite.height / 2,
      'laser'
    ) as Phaser.Physics.Arcade.Sprite;

    this.laserSound.play();
    laser.setVelocityY(GameConfig.LASER_SPEED);
    laser.setData('isStrong', false);
  }

  private fireStrongLaser(): void {
    const playerSprite = this.player.getSprite();
    const wingOffset = 20;

    [-wingOffset, wingOffset].forEach((offset) => {
      const strongLaser = this.lasers.create(
        playerSprite.x + offset,
        playerSprite.y - playerSprite.height / 2,
        'strongLaser'
      ) as Phaser.Physics.Arcade.Sprite;

      strongLaser.setVelocityY(GameConfig.STRONG_LASER_SPEED);
      strongLaser.setData('isStrong', true);
    });
    this.strongLaserSound.play();
  }

  private cleanupLasers(): void {
    this.lasers.getChildren().forEach((obj) => {
      const laser = obj as Phaser.Physics.Arcade.Sprite;
      if (laser.y < -50) laser.destroy();
    });
  }

  getLasers(): Phaser.Physics.Arcade.Group {
    return this.lasers;
  }

  getLastStrongFired(): number {
    return this.lastStrongFired;
  }
}