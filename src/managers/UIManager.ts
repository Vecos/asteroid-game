import * as Phaser from 'phaser';
import { GameConfig } from '../config/gameConfig';

export class UIManager {
  private scene: Phaser.Scene;
  private gameOverText: Phaser.GameObjects.Text;
  private restartButton: Phaser.GameObjects.Text;
  private scoreText: Phaser.GameObjects.Text;
  private finalScoreText: Phaser.GameObjects.Text;
  private livesText: Phaser.GameObjects.Text;
  private strongLaserAbility: Phaser.GameObjects.Image;
  private maskShape: Phaser.GameObjects.Graphics;
  private onRestartCallback: () => void;

  constructor(scene: Phaser.Scene, onRestart: () => void) {
    this.scene = scene;
    this.onRestartCallback = onRestart;
    this.createUI();
  }

  private createUI(): void {
    const { width, height } = this.scene.scale;

    // Score display
    this.scoreText = this.scene.add.text(width / 2, 20, 'Score: 0', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial, sans-serif'
    }).setOrigin(1, 0).setDepth(1000);

    // Lives display
    this.livesText = this.scene.add.text(width - 100, 20, 'Lives: 3', {
      fontSize: '20px', color: '#ffffff', fontFamily: 'Arial, sans-serif'
    }).setOrigin(0, 0).setDepth(1000);

    // Game over UI
    this.gameOverText = this.scene.add.text(width / 2, height / 2 - 50, 'Game Over', {
      fontSize: '48px', color: '#ff6666', fontFamily: 'Arial, sans-serif',
      stroke: '#000000', strokeThickness: 4
    }).setOrigin(0.5).setVisible(false);

    this.finalScoreText = this.scene.add.text(width / 2, height / 2, 'Final Score: 0', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5).setVisible(false);

    this.restartButton = this.scene.add.text(width / 2, height / 2 + 60, 'Restart', {
      fontSize: '32px', color: '#00ff00', fontFamily: 'Arial, sans-serif'
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.onRestartCallback())
      .on('pointerover', () => this.restartButton.setColor('#66ff66'))
      .on('pointerout', () => this.restartButton.setColor('#00ff00'))
      .setVisible(false);

    this.setupCooldownUI();
  }

  private setupCooldownUI(): void {
    const x = 10, y = 20;
    this.strongLaserAbility = this.scene.add.image(x, y, 'strongLaserAbility')
      .setOrigin(0, 0).setDepth(1000);

    this.maskShape = this.scene.make.graphics({ x, y });
    this.strongLaserAbility.setMask(this.maskShape.createGeometryMask());
  }

  updateCooldownBar(lastStrongFired: number, currentTime: number): void {
    if (!this.strongLaserAbility || !this.maskShape) return;

    const timeSinceLastFire = currentTime - lastStrongFired;
    const progress = Phaser.Math.Clamp(timeSinceLastFire / GameConfig.STRONG_FIRE_RATE, 0, 1);

    const texture = this.scene.textures.get('strongLaserAbility');
    const sourceImage = texture.getSourceImage();
    const imageWidth = sourceImage.width;
    const imageHeight = sourceImage.height;

    this.maskShape.clear();
    this.maskShape.fillStyle(0xffffff);

    const progressHeight = imageHeight * progress;
    const startY = imageHeight - progressHeight;
    this.maskShape.fillRect(0, startY, imageWidth, progressHeight);
  }

  updateScore(score: number): void {
    this.scoreText.setText(`Score: ${score}`);
  }

  updateLives(lives: number): void {
    this.livesText.setText(`Lives: ${lives}`);
  }

  showGameOver(): void {
    const currentScore = this.scoreText.text.replace('Score: ', '');
    this.finalScoreText.setText(`Final Score: ${currentScore}`);

    this.gameOverText.setVisible(true);
    this.finalScoreText.setVisible(true);
    this.restartButton.setVisible(true);
  }

  hideGameOver(): void {
    this.gameOverText.setVisible(false);
    this.finalScoreText.setVisible(false);
    this.restartButton.setVisible(false);
  }
}