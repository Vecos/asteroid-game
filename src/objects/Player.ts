import * as Phaser from 'phaser';
import { GameConfig } from '../config/gameConfig';

export class Player {
  private sprite: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerSpriteKey: string;

  constructor(scene: Phaser.Scene, x: number, y: number) {
  
    this.playerSpriteKey = scene.registry.get('playerSprite') || 'player';
    
    this.sprite = scene.physics.add.sprite(x, y, this.playerSpriteKey);
    this.sprite.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.handleMovement();
  }

  private handleMovement(): void {
    this.sprite.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-GameConfig.PLAYER_SPEED);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(GameConfig.PLAYER_SPEED);
    }

    if (this.cursors.up.isDown) {
      this.sprite.setVelocityY(-GameConfig.PLAYER_SPEED);
    } else if (this.cursors.down.isDown) {
      this.sprite.setVelocityY(GameConfig.PLAYER_SPEED);
    }
  }

  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }

  setPosition(x: number, y: number): void {
    this.sprite.setPosition(x, y);
  }

  setVisible(visible: boolean): void {
    this.sprite.setVisible(visible);
  }

  enableBody(reset: boolean, x: number, y: number, enableGameObject: boolean, showGameObject: boolean): void {
    this.sprite.enableBody(reset, x, y, enableGameObject, showGameObject);
    
    // Po respawne znovu nastav správny sprite
    this.sprite.setTexture(this.playerSpriteKey);
  }
}