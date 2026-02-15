
import '../../assets/html/style.css';
import '../css/fonts.css';

import * as Phaser from 'phaser';
import MainMenu from '../scenes/MainMenu';
import GameScene from '../scenes/GameScene';


const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,

    width: 1920,
    height: 1080,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [MainMenu,GameScene],
  render: {
    pixelArt: false,
    antialias: true
  },

};

export default new Phaser.Game(config);
export { config };