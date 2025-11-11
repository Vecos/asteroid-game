import * as Phaser from 'phaser';
import { GameConfig } from '../config/gameConfig';

export class AsteroidManager {
  private scene: Phaser.Scene;
  private asteroids: Phaser.Physics.Arcade.Group;
  private shards: Phaser.Physics.Arcade.Group;
  private asteroidImages = ['asteroidBig1', 'asteroidBig2', 'asteroidBig3', 'asteroidBig4',
    'asteroidMed1', 'asteroidMed2', 'asteroidSmall1', 'asteroidSmall2',
    'asteroidTiny1', 'asteroidTiny2'];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.asteroids = scene.physics.add.group();
    this.shards = scene.physics.add.group();

    // Setup asteroid spawning
    scene.time.addEvent({
      delay: GameConfig.ASTEROID_SPAWN_RATE,
      loop: true,
      callback: () => this.spawnAsteroid(),
    });
  }

  private spawnAsteroid(): void {
    const { width } = this.scene.scale;
    const x = Phaser.Math.Between(40, width - 40);
    const randomKey = Phaser.Utils.Array.GetRandom(this.asteroidImages);
    const asteroid = this.asteroids.create(x, -50, randomKey) as Phaser.Physics.Arcade.Sprite;

    asteroid.setVelocityY(GameConfig.ASTEROID_SPEED);
    asteroid.setCollideWorldBounds(false);
    asteroid.setData('isAsteroid', true);

    // Set health based on asteroid type
    const health = GameConfig.ASTEROID_HEALTH[randomKey as keyof typeof GameConfig.ASTEROID_HEALTH];
    asteroid.setData('health', health);
    asteroid.setData('maxHealth', health);
  }

  update(): void {
    // Cleanup asteroids
    this.asteroids.getChildren().forEach((obj) => {
      const asteroid = obj as Phaser.Physics.Arcade.Sprite;
      if (asteroid.y > this.scene.scale.height + 50) asteroid.destroy();
    });

    // Cleanup shards
    // this.shards.getChildren().forEach((obj) => {
      // const shard = obj as Phaser.Physics.Arcade.Sprite;
      // if (shard.y > this.scene.scale.height + 50 ||
        // shard.x < -50 || shard.x > this.scene.scale.width + 50) {
        // shard.destroy();
      // }
    // });

    // Limit asteroid count
    if (this.asteroids.getChildren().length > GameConfig.MAX_ASTEROIDS) {
      this.asteroids.getChildren()
        .slice(0, this.asteroids.getChildren().length - GameConfig.MAX_ASTEROIDS)
        .forEach((child) => child.destroy());
    }
  }

  damageAsteroid(asteroid: Phaser.Physics.Arcade.Sprite, damage: number = 1): boolean {
    let currentHealth = asteroid.getData('health');
    currentHealth -= damage;
    asteroid.setData('health', currentHealth);

    // Visual damage feedback
    const maxHealth = asteroid.getData('maxHealth');
    const healthPercentage = currentHealth / maxHealth;

    if (healthPercentage <= 0.50) {
      asteroid.setTint(0xff6666); // Red tint when damaged
    }

    if (currentHealth <= 0) {
      this.shatterAsteroid(asteroid);
      asteroid.destroy();
      return true;
    }
    return false;
  }

  private shatterAsteroid(asteroid: Phaser.Physics.Arcade.Sprite): void {
    const { x, y } = asteroid;
    const shardSprites = ['shardFirst', 'shardMid', 'shardLast'];

    // Create shards
    for (let i = 0; i < GameConfig.SHARD_COUNT; i++) {
      const randomShardSprite = Phaser.Utils.Array.GetRandom(shardSprites);
      const shard = this.shards.create(x, y, randomShardSprite) as Phaser.Physics.Arcade.Sprite;

      // Random velocity and rotation
      const angle = Phaser.Math.Between(0, 360);
      const speed = Phaser.Math.Between(GameConfig.SHARD_SPEED * 0.5, GameConfig.SHARD_SPEED * 1.5);

      shard.setVelocity(
        Math.cos(angle * Math.PI / 180) * speed,
        Math.sin(angle * Math.PI / 180) * speed
      );
      shard.setAngularVelocity(Phaser.Math.Between(-200, 200));
      shard.setScale(Phaser.Math.Between(0.3, 0.7));

      // Fade out effect
      this.scene.tweens.add({
        targets: shard,
        alpha: 0,
        scale: shard.scale * 0.5,
        duration: GameConfig.SHARD_FADE_TIME,
        ease: 'Power2',
        onComplete: () => shard.destroy()
      });
    }
  }

  getAsteroids(): Phaser.Physics.Arcade.Group {
    return this.asteroids;
  }

  clear(): void {
    this.asteroids.clear(true, true);
    this.shards.clear(true, true);
  }
}