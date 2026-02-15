import backgroundBlack from '../../assets/sprites/game/Backgrounds/black.png';
import backgroundBlue from '../../assets/sprites/game/Backgrounds/blue.png';
import backgroundDarkPurple from '../../assets/sprites/game/Backgrounds/darkPurple.png';
import backgroundPurple from '../../assets/sprites/game/Backgrounds/purple.png';
import playerImg from '../../assets/sprites/game/playerShip1_blue.png';
import playerImgRed from '../../assets/sprites/game/playerShip1_red.png';
import playerImgGreen from '../../assets/sprites/game/playerShip1_green.png';
import backgroundMusic from '../../assets/music/background_loop.mp3';
import laserImg from '../../assets/sprites/game/Lasers/laserBlue01.png';
import strongLaserImg from '../../assets/sprites/game/Lasers/laserGreen11.png';
import laserSound from '../../assets/sounds/sfx_laser1.mp3';
import strongLaserSound from '../../assets/sounds/sfx_laser2.mp3';
import asteroidBrownBig1 from '../../assets/sprites/game/Meteors/meteorBrown_big1.png';
import asteroidBrownBig2 from '../../assets/sprites/game/Meteors/meteorBrown_big2.png';
import asteroidBrownBig3 from '../../assets/sprites/game/Meteors/meteorBrown_big3.png';
import asteroidBrownBig4 from '../../assets/sprites/game/Meteors/meteorBrown_big4.png';
import asteroidBrownmed1 from '../../assets/sprites/game/Meteors/meteorBrown_med1.png';
import asteroidBrownmed2 from '../../assets/sprites/game/Meteors/meteorBrown_med3.png';
import asteroidBrownSmall1 from '../../assets/sprites/game/Meteors/meteorBrown_small1.png';
import asteroidBrownSmall2 from '../../assets/sprites/game/Meteors/meteorBrown_small2.png';
import asteroidBrownTiny1 from '../../assets/sprites/game/Meteors/meteorBrown_tiny1.png';
import asteroidBrownTiny2 from '../../assets/sprites/game/Meteors/meteorBrown_tiny2.png';
import strongLaserAbility from '../../assets/sprites/game/Power-ups/powerupGreen_bolt.png';
import asteroidShardFirst from '../../assets/sprites/game/Damage/playerShip3_damage3.png';
import asteroidShardMid from '../../assets/sprites/game/Damage/playerShip3_damage2.png';
import asteroidShardLast from '../../assets/sprites/game/Damage/playerShip3_damage1.png';

export class AssetManager {
  static preloadAssets(scene: Phaser.Scene): void {
    // Backgrounds
    scene.load.image('backgroundBlack', backgroundBlack);
    scene.load.image('backgroundBlue', backgroundBlue);
    scene.load.image('backgroundDarkPurple', backgroundDarkPurple);
    scene.load.image('backgroundPurple', backgroundPurple);

    // Player
    scene.load.image('player', playerImg);
    scene.load.image('playerRed', playerImgRed);
    scene.load.image('playerGreen', playerImgGreen);

    // Weapons
    scene.load.image('laser', laserImg);
    scene.load.image('strongLaser', strongLaserImg);

    // Asteroids - all sizes
    scene.load.image('asteroidBig1', asteroidBrownBig1);
    scene.load.image('asteroidBig2', asteroidBrownBig2);
    scene.load.image('asteroidBig3', asteroidBrownBig3);
    scene.load.image('asteroidBig4', asteroidBrownBig4);
    scene.load.image('asteroidMed1', asteroidBrownmed1);
    scene.load.image('asteroidMed2', asteroidBrownmed2);
    scene.load.image('asteroidSmall1', asteroidBrownSmall1);
    scene.load.image('asteroidSmall2', asteroidBrownSmall2);
    scene.load.image('asteroidTiny1', asteroidBrownTiny1);
    scene.load.image('asteroidTiny2', asteroidBrownTiny2);

    // Shard animation frames
    scene.load.image('shardFirst', asteroidShardFirst);
    scene.load.image('shardMid', asteroidShardMid);
    scene.load.image('shardLast', asteroidShardLast);

    // Audio
    scene.load.audio('bgMusic', backgroundMusic);
    scene.load.audio('laserSound', laserSound);
    scene.load.audio('strongLaserSound', strongLaserSound);

    // UI
    scene.load.image('strongLaserAbility', strongLaserAbility);
    
  }
}
