# asteroid-game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7.4-blue.svg)](https://www.typescriptlang.org/)
[![Phaser](https://img.shields.io/badge/Phaser-3.85.2-orange.svg)](https://phaser.io/)

Classic arcade style space shooter game built with Phaser 3 and TypeScript.

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v16.0.0 or higher) - [Download Here](https://nodejs.org/en/download)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)
- Git - [Download Here](https://git-scm.com/)
---
## Setup Steps
Clone the repository

```bash   
git clone git@github.com:Vecos/asteroid-game.git
   cd asteroid-game
```
Install dependencies

```bash
   yarn install
   # or
   npm install
```
Verify installation

```bash
   yarn server:start
   # or
   npm run server:start
```
Open in browser
Navigate to `http://localhost:8080` to see the game running locally.

## Live Demo

The game is hosted on Cloudflare Pages: [asteroid-game.pages.dev](https://asteroid-game.pages.dev/)

### Project structure 

```
spaceship/
├── src/
│   ├── config/
│   │   └── gameConfig.ts          # Game constants and configuration
│   ├── managers/
│   │   ├── AssetManager.ts        # Asset loading and management
│   │   ├── AsteroidManager.ts     # Asteroid spawning and lifecycle
│   │   ├── UIManager.ts           # UI elements and HUD
│   │   └── WeaponManager.ts       # Weapon systems and firing logic
│   ├── objects/
│   │   └── Player.ts              # Player spaceship entity
│   ├── scenes/
│   │   ├── MainMenu.ts            # Main menu scene
│   │   └── GameScene.ts           # Main game scene
│   └── entry/
│       └── index.ts               # Application entry point
├── assets/
│   ├── sprites/                   # Game sprites and images
│   ├── music/                     # Background music
│   └── sounds/                    # Sound effects
├── dist/                          # Production build output
├── webpack.config.js              # Webpack configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies
```


### Managers

- **AssetManager:** Handles preloading and caching of all game assets
- **AsteroidManager:** Controls asteroid spawning, movement, and destruction
- **WeaponManager:** Manages weapon systems, firing, and cooldowns
- **UIManager:** Handles all UI elements including score, lives, and game over screen

### Scenes

- **MainMenu:** Ship selection and game start
- **GameScene:** Main gameplay loop

### Objects

- **Player:** Player-controlled spaceship with movement and collision


| Astroid size | HP | Score value|
|---|---|---|
| Tiny  | 1HP   | 400 points |
| Small | 2HP   | 300 points |
| Medium | 3HP   | 200 points |
| Big   | 4HP   | 100 points |


|Key(s) | Action |
|---|---|
| ↑ ↓ ←  → | Move ship |
| SPACE | Fire laser |
| ALT   | Fire strong laser |



### Weapons

**Regular Laser**
- Fast fire rate
- 1 damage
- Destroyed on impact

**Strong Laser**
- Has cooldown
- 2 damage
- Penetrates asteroids

### Lives System
- Start with **3 lives**
- Lose 1 life when asteroid collides with ship
- Ship respawns at center of screen
- Game over when all lives are lost
- Asteroid is destroyed on collision
