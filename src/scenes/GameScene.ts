import * as Phaser from 'phaser';
import { AssetManager } from '../managers/AssetManager';
import { Player } from '../objects/Player';
import { WeaponManager } from '../managers/WeaponManager';
import { AsteroidManager } from '../managers/AsteroidManager';
import { UIManager } from '../managers/UIManager';
import { GameConfig } from '../config/gameConfig';

export default class GameScene extends Phaser.Scene {
  private player!: Player;
  private weaponManager!: WeaponManager;
  private asteroidManager!: AsteroidManager;
  private uiManager!: UIManager;
  private bgMusic!: Phaser.Sound.BaseSound;
  private backgrounds: Phaser.GameObjects.TileSprite[] = [];
  private score: number = 0;
  private revives: number = GameConfig.INITIAL_REVIVES;
  private isGameOver: boolean = false;
  private isPlayerInvicible: boolean = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    //  AssetManager.preloadAssets(this);
  }

  create(): void {
    const { width, height } = this.scale;

    // Setup background
    this.createBackgrounds();

    // Initialize game objects
    this.player = new Player(this, width / 2, height - 120);
    this.weaponManager = new WeaponManager(this, this.player);
    this.asteroidManager = new AsteroidManager(this);
    this.uiManager = new UIManager(this, () => this.restartGame());

    // Initialize UI
    this.uiManager.updateScore(this.score);
    this.uiManager.updateLives(this.revives);

    // Setup audio
    this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
    this.bgMusic.play();

    // Setup collisions
    this.setupCollisions();
  }

  private createBackgrounds(): void {
    const backgroundKeys = ['backgroundBlack', 'backgroundBlue', 'backgroundPurple', 'backgroundDarkPurple'];

    backgroundKeys.forEach((key, index) => {
      const bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, key)
        .setOrigin(0, 0);
      bg.alpha = index === 0 ? 1 : 0;
      this.backgrounds.push(bg);
    });

    // Setup background cycling
    let currentBackgroundIndex = 0;
    this.time.addEvent({
      delay: GameConfig.BACKGROUND_FADE_DELAY,
      loop: true,
      callback: () => {
        const previousIndex = currentBackgroundIndex;
        currentBackgroundIndex = (currentBackgroundIndex + 1) % this.backgrounds.length;

        // Fade out old, fade in new
        this.tweens.add({
          targets: this.backgrounds[previousIndex],
          alpha: 0,
          duration: GameConfig.BACKGROUND_FADE_DURATION,
          ease: 'Linear',
        });

        this.tweens.add({
          targets: this.backgrounds[currentBackgroundIndex],
          alpha: 1,
          duration: GameConfig.BACKGROUND_FADE_DURATION,
          ease: 'Linear',
        });
      }
    });
  }

  private setupCollisions(): void {
    // Player vs Asteroids
    this.physics.add.collider(
      this.player.getSprite(),
      this.asteroidManager.getAsteroids(),
      this.onPlayerHit,
      this.playerInvicible.bind(this),
      this
);

    // Laser vs Asteroids
    this.physics.add.overlap(
      this.weaponManager.getLasers(),
      this.asteroidManager.getAsteroids(),
      this.onLaserHitAsteroid,
      undefined,
      this
    );
  }

  update(time: number): void {
    if (!this.isGameOver) {
      this.player.update();
      this.weaponManager.update(time);
      this.asteroidManager.update();
      this.uiManager.updateCooldownBar(this.weaponManager.getLastStrongFired(), time);
    }
  }

  private onLaserHitAsteroid(
    laserGO: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    asteroidGO: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    const laser = laserGO as Phaser.Physics.Arcade.Sprite;
    const asteroid = asteroidGO as Phaser.Physics.Arcade.Sprite;

    // Determine damage
    const isStrong = laser.getData('isStrong') === true || laser.texture.key === 'strongLaser';
    const damage = isStrong ? 2 : 1;

    // Damage asteroid
    const wasDestroyed = this.asteroidManager.damageAsteroid(asteroid, damage);

    if (wasDestroyed) {
      this.addScore(this.getAsteroidPoints(asteroid.texture.key));
    }

    // Regular lasers are destroyed on hit, strong lasers penetrate
    if (!isStrong) {
      laser.destroy();
    }
  }

  private onPlayerHit(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    asteroid: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    const { width, height } = this.scale;

    this.revives--;
    this.uiManager.updateLives(this.revives);

    if (this.revives <= 0) {
      this.endGame();
    } else {
      this.player.setPosition(width / 2, height - 120);
      this.isPlayerInvicible = true;
      this.tweens.add({
        targets: this.player.getSprite(),
        alpha: 0.3,
        duration: 100,
        yoyo: true,
        repeat: 5
      })
      this.time.delayedCall(300, () => (this.isPlayerInvicible = false));
    }

    // Destroy the asteroid that hit the player
    const asteroidSprite = asteroid as Phaser.Physics.Arcade.Sprite;
    this.asteroidManager.damageAsteroid(asteroidSprite, 999);
  }
 private playerInvicible(): boolean
 {   
 return !this.isPlayerInvicible; 
 }
  private endGame(): void {
    this.isGameOver = true;
    this.physics.pause();
    this.uiManager.showGameOver();
    this.player.setVisible(false);
  }

  private restartGame(): void {
    const { width, height } = this.scale;

    // Reset game state
    this.revives = GameConfig.INITIAL_REVIVES;
    this.isGameOver = false;
    this.score = 0;

    // Reset player
    this.player.enableBody(true, width / 2, height - 120, true, true);
    this.player.setVisible(true);

    // Reset UI and physics
    this.uiManager.hideGameOver();
    this.physics.resume();
    this.asteroidManager.clear();

    // Update UI
    this.uiManager.updateScore(this.score);
    this.uiManager.updateLives(this.revives);
  }

  private getAsteroidPoints(asteroidKey: string): number {
    if (asteroidKey.includes('Big')) return 100;
    if (asteroidKey.includes('Med')) return 200;
    if (asteroidKey.includes('Small')) return 300;
    if (asteroidKey.includes('Tiny')) return 400;
    return 50;
  }

  private addScore(points: number): void {
    this.score += points;
    this.uiManager.updateScore(this.score);
  }
}