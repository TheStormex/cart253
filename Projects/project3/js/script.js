"use strict";

// Project 3 Prototype
// by Che Tan
// A turn based RPG with cards and mini games

// which screen / state it is
let whichScreen;

// sub screens for the game
// game: 0 = choose ability, 1 =  action text, 2 = aftermath text
let subScreen = 0;

// the states
let titleState;
let instructionsState;
let gameState;
let gameOverState;
let minigameState;

// Whose turn it is, player (1) or enemy (-1)
let whoseTurn = 1;

// Win or lose -1 = lose, 1 = win
let victory = 0;

// Which ability is chosen by the turn character
let chosenAbility;

// Array of enemy bullets
let bullets = [];

// How many bullets the player ran into / targets the player clicked on - obstacles
let minigameHits = 0;

// Array of targets the player must hit in the mini game
let targets = [];

// Array of obstacles the player must not hit in the mini game
let obstacles = [];

// Array of player bullets in the shooting minigame
let playerBullets = [];

// Array of enemy avatars to hit in the shooting minigame
let enemyAvatars = [];

// Array of abilities the player currently has in the inventory
let abilitiesHave = [];

// Array of abilities the player currently has in the deck
let abilitiesPlayerDeck = [];

let abilityX = 0;

// Array of abilities the enemy can get
let enemyAbilitiesHave = [];

// Images
let imagePlayer;
let imageLeaf;
let imagePlayerBullet;
let imageEnemy;
let imageEnemyBullet;
let imageEnemyBeam;
let imageEnemyBolt;

// Music and sound effects
let audioButton;
let audioHitByEnemy;
let audioWin;
let audioLose;
let audioGoodHit;
let audioBadHit;
let audioText;
let audioSongMenu;
let audioSongGame;

// The player object
let player;
// The enemy object
let enemy;

// textTimer and textTimerAmount: how long the text stays on the screen
let textTimer = 0;
let textTimerAmount = 3000; // 3 seconds

// minigameTimer and minigameTimerAmount: how long the minigames last before changing to results
let minigameTimer = 0;
let minigameTimerAmount = 5000; // 5 seconds

// spawnTimer: when the minigame's spawnSpeed is reached, spawn another object
let spawnTimer = 0;

// preload()
//
// Sets up the images
function preload() {
  imagePlayer = loadImage("assets/images/player.png")
  imageLeaf = loadImage("assets/images/leaf.png")
  imagePlayerBullet = loadImage("assets/images/playerBullet.png")
  imageEnemy = loadImage("assets/images/enemy.png")
  imageEnemyBullet = loadImage("assets/images/enemyBullet.png")
  imageEnemyBeam = loadImage("assets/images/enemyBeam.png")
  imageEnemyBolt = loadImage("assets/images/enemyBolt.png")
}

// setup()
//
// Sets up a canvas
function setup() {
  // Make the canvas fit the screen
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  // Set up the audio
  audioButton = loadSound('assets/sounds/button.wav');
  audioHitByEnemy = loadSound('assets/sounds/hitByEnemy.wav');
  audioWin = loadSound('assets/sounds/win.wav');
  audioLose = loadSound('assets/sounds/lose.wav');
  audioGoodHit = loadSound('assets/sounds/goodHit.wav');
  audioBadHit = loadSound('assets/sounds/badHit.wav');
  audioText = loadSound('assets/sounds/text.wav');
  audioSongMenu = loadSound('assets/sounds/bark.wav');
  audioSongGame = loadSound('assets/sounds/bark.wav');
  start();
}

// draw()
//
// Handles input, movement and displaying for the system's objects
function draw() {
  // Clear the background to grey
  background(50);
  whichScreen.draw();
}

// mousePressed
//
// when the button is pressed
function mousePressed() {
  whichScreen.mousePressed();
}

// spawn()
//
// create objects in the mini games
function spawn(minigameName) {
  let whichMinigame = minigameName;
  if (millis() - spawnTimer > chosenAbility.spawnSpeed) {
    if (whoseTurn === 1) {
      switch (whichMinigame) {
        case "click":
          let whichObject = floor(random(0,2));
          if (whichObject === 0) {
            let newTarget = new Target(random(0, width), 0, random(width/30+height/30, width/16+height/16), random(-12, 12), random(8, 12), image);
            targets.push(newTarget);
          } else if (whichObject === 1) {
            let newObstacle = new Obstacle(random(0, width), 0, random(width/30+height/30, width/16+width/16), random(-12, 12), random(8, 12), image);
            obstacles.push(newObstacle);
          }
          break;
        case "shoot":
          console.log("not yet");
          break;
        case "collect":
          let newTarget = new Target(random(0, width), 0, random(width/30+height/30, width/16+height/16), random(-12, 12), random(8, 12), imageLeaf);
          targets.push(newTarget);
          break;
      }
    }
    if (whoseTurn === -1) {
      let bulletImage;
      switch (whichMinigame) {
        case "bulletStorm":
          bulletImage = imageEnemyBullet;
          break;
        case "neutronBeam":
          bulletImage = imageEnemyBeam;
          break;
        case "staticBolt":
          bulletImage = imageEnemyBolt;
          break;
      }
      let newBullet = new Bullet(random(0, width), 0, random(width/40+height/40, width/30+height/30), random(-12, 12), random(15, 18), bulletImage);
      bullets.push(newBullet);
    }
  spawnTimer = millis();
  }
}

// enemyChooseAbility()
//
// the enemy randomly chooses which ability to use
function enemyChooseAbility() {
  let enemyAbility = floor(random(0, 3));
  chosenAbility = enemyAbilitiesHave[enemyAbility];
}

// abilityHappens()
//
// The ability's effect take place
function abilityHappens() {
  let whichEffect;
  let abilityTargets;
  whichEffect = chosenAbility.effect;
  abilityTargets = chosenAbility.targets;
  chosenAbility.totalAmount = chosenAbility.amount*minigameHits;
  switch (whichEffect) {
    case "damage":
      chosenAbility.totalAmount = round(chosenAbility.totalAmount + chosenAbility.totalAmount*0.01*abilityTargets.incoming);
      abilityTargets.health -= chosenAbility.totalAmount;
      abilityTargets.incoming = 0; // set incoming back to 0
      abilityTargets.health = constrain(abilityTargets.health, 0, abilityTargets.maxHealth);
      break;
    case "heal":
      abilityTargets.health += chosenAbility.totalAmount;
      abilityTargets.health = constrain(abilityTargets.health, 0, abilityTargets.maxHealth);
      break;
    case "stun":
      if (minigameHits >= chosenAbility.amount) {
        abilityTargets.stun = true;
        chosenAbility.statusCause = true;
        abilityTargets.stunLeft += 2;
      }
      break;
    case "% incoming":
      abilityTargets.incoming += chosenAbility.totalAmount;
      break;
    default:
  }
}

// goToPlayerTurn()
//
// Go from the enemy's turn to the player's turn
function goToPlayerTurn() {
  textTimer = millis();
  // the player gets another ability from the deck
  abilitiesHave.push(abilitiesPlayerDeck[0]);
  abilitiesPlayerDeck.splice(0, 1);
  chosenAbility = 0;
  whoseTurn = 1;
  subScreen = 0;
}

// goToEnemyTurn()
//
// Go from the player's turn to the enemy's turn
function goToEnemyTurn() {
  enemyChooseAbility();
  textTimer = millis();
  player.x = width/2;
  player.y = height/2;
  whoseTurn = -1;
  subScreen = 1;
}

// playerClickMinigame()
//
// the player's clicking minigame
function playerClickMinigame() {
  let minigameName = "click"
  spawn(minigameName); // spawn targets and obstacles (random size and speed) at random at 2 per second, flow accross screen
  for (var i = 0; i < targets.length; i++) {
    targets[i].index = targets.indexOf(targets[i]);
    targets[i].move();
    targets[i].display();
  }
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].index = obstacles.indexOf(obstacles[i]);
    obstacles[i].move();
    obstacles[i].display();
  }
}

// playerShootMinigame()
//
// the player's shooting minigame
function playerShootMinigame() {
  let minigameName = "shoot"
  spawn(minigameName); // spawn enemy avatars flying accross screen from left to right
  // for (var i = 0; i < enemyAvatars.length; i++) {
  //   enemyAvatars[i].index = enemyAvatars.indexOf(enemyAvatars[i]);
  //   enemyAvatars[i].move();
  //   enemyAvatars[i].display();
  //   enemyAvatars[i].hit();
  // }
  let shootButtons = ["Q", "W", "E", "R"];
    push();
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(width/50+height/50);
    strokeWeight(2);
    stroke(0);
    for (var i = 0; i < shootButtons.length; i++) {
      fill(255);
      rect(width/4 * i + width/8, height-height/10, width/4, height/5);
      fill(0);
      text(shootButtons[i], width/4 * i + width/8, height-height/10);
    }
    pop();
    // if press the corresponding key, a player projectile is fired from the center of the quadrant
    if (keyIsDown(81)) {
      console.log("1");
    }

    if (keyIsDown(87)) {
      console.log("2");
    }

    if (keyIsDown(69)) {
      console.log("3");
    }

    if (keyIsDown(82)) {
      console.log("4");
    }
}

// playerCollectMinigame()
//
// the player's collecting minigame
function playerCollectMinigame() {
  let minigameName = "collect";
  spawn(minigameName); // spawn targets and obstacles (random size and speed) at random at 2 per second, flow accross screen
  minigamePlayer();
  for (var i = 0; i < targets.length; i++) {
    targets[i].index = targets.indexOf(targets[i]);
    targets[i].move();
    targets[i].display();
    targets[i].touched();
  }
}


// enemyBulletStormMinigame
//
// minigame for bulletStorm
function enemyBulletStormMinigame() {
  let minigameName = "bulletStorm";
  spawn(minigameName); // spawn bullets (random size and speed) that fly accross the screen 3 per second
  minigamePlayer();
  // move and display all bullets and check if they touch the player
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].index = bullets.indexOf(bullets[i]);
    bullets[i].move();
    bullets[i].display();
    bullets[i].touchPlayer();
  }
}

// enemyNeutronBeamMinigame()
//
// minigame for neutron beam
function enemyNeutronBeamMinigame() {
  let minigameName = "neutronBeam";
  spawn(minigameName); // spawn bullets (random size and speed) that fly accross the screen 3 per second
  minigamePlayer();
  // move and display all bullets and check if they touch the player
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].index = bullets.indexOf(bullets[i]);
    bullets[i].move();
    bullets[i].bounce();
    bullets[i].display();
    bullets[i].touchPlayer();
  }
}

// enemyStaticBoltMinigame()
//
// minigame for static bolt
function enemyStaticBoltMinigame() {
  let minigameName = "staticBolt";
  spawn(minigameName); // spawn bullets (random size and speed) that fly accross the screen 3 per second
  minigamePlayer();
  // move and display all bullets and check if they touch the player
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].index = bullets.indexOf(bullets[i]);
    bullets[i].wave();
    bullets[i].move();
    bullets[i].display();
    bullets[i].touchPlayer();
  }
}

// minigamePlayer()
//
// Moving and displaying the player in applicable minigames
function minigamePlayer() {
  // move and display the player
  player.vx = 0;
  player.vy = 0;
  if (keyIsDown(87)) {
    player.vy = -player.speed;
  }
  if (keyIsDown(65)) {
    player.vx = -player.speed;
  }
  if (keyIsDown(83)) {
    player.vy = player.speed;
  }
  if (keyIsDown(68)) {
    player.vx = player.speed;
  }
  player.x += player.vx;
  player.y += player.vy;
  // Make sure the player does not go outside the borders
  if (player.x-player.size/2 <= 0) {
    player.x = player.size/2;
  }
  if (player.x+player.size/2 > width) {
    player.x = width-player.size/2;
  }
  if (player.y-player.size/2 < 0) {
    player.y = player.size/2;
  }
  if (player.y+player.size/2 > height) {
    player.y = height-player.size/2;
  }
  // Draw the player
  push();
  imageMode(CENTER);
  image(imagePlayer, player.x, player.y, player.size, player.size);
  pop();
}

// reset()
//
// Reset all stats and start the game again
function reset() {
  subScreen = 0;
  whoseTurn = 1;
  victory = 0;
  chosenAbility = 0;
  bullets = [];
  minigameHits = 0;
  targets = [];
  obstacles = [];
  abilitiesHave = [];
  abilitiesPlayerDeck = [];
  abilityX = 0;
  enemyAbilitiesHave = [];
  // start the game again
  start();
}

// start()
//
// Set up the game
function start() {
  // Create the states
  titleState = new TitleState();
  instructionsState = new InstructionsState();
  gameState = new GameState();
  gameOverState = new GameOverState();
  minigameState = new MinigameState();

  // set the current state to title
  whichScreen = titleState;

  // create the player and enemy objects
  player = {
    name: "Player",
    image: imagePlayer,
    health: 200,
    maxHealth: 200,
    incoming: 0,
    stun: false,
    stunLeft: 0,
    x: width/2,
    y: height/2,
    size: width/20+height/20,
    speed: 10,
    vx: 0,
    vy: 0
  }
  enemy = {
    name: "Enemy",
    image: imageEnemy,
    health: 500,
    maxHealth: 500,
    incoming: 0,
    stun: false,
    stunLeft: 0
  }

  // Create the player's deck of abilities (20)
  for (var i = 0; i < 8; i++) {
    let fireSpear = new Ability("Fire Spear", "Deal damage", player, enemy, "damage", "number", 8, playerShootMinigame, color(255,0,0), 80);
    abilitiesPlayerDeck.push(fireSpear);
  }
  for (var i = 0; i < 3; i++) {
    let cleanse = new Ability("Cleanse", "Heal self", player, player, "heal", "number", 6, playerCollectMinigame, color(0,255,255), 80);
    abilitiesPlayerDeck.push(cleanse);
  }
  for (var i = 0; i < 3; i++) {
    let paralyse = new Ability("Paralyse", "Stun for 2 turns", player, enemy, "stun", "status", 10, playerClickMinigame, color(255,255,0), 80);
    abilitiesPlayerDeck.push(paralyse);
  }
  for (var i = 0; i < 3; i++) {
    let shield = new Ability("Shield", "Protect self", player, player, "% incoming", "number", -5, playerCollectMinigame, color(0,255,0), 80);
    abilitiesPlayerDeck.push(shield);
  }
  for (var i = 0; i < 3; i++) {
    let curse = new Ability("Curse", "Weaken enemy", player, enemy, "% incoming", "number", 5, playerClickMinigame, color(255,0,255), 80);
    abilitiesPlayerDeck.push(curse);
  }
  // Shuffle the player's deck
  abilitiesPlayerDeck = shuffle(abilitiesPlayerDeck);
  // The player draws the 5 card starting hand
  for (var i = 0; i < 5; i++) {
    abilitiesHave.push(abilitiesPlayerDeck[0]);
    abilitiesPlayerDeck.splice(0, 1);
  }
  console.log(abilitiesHave);
  console.log(abilitiesPlayerDeck);
  // create the list of enemy abilities
  let newEnemyAbility = new Ability("Neutron Beam", "weaken player by 10% per hit", enemy, player, "% incoming", "number", 10, enemyNeutronBeamMinigame, color(random(0, 255), random(0, 255), random(0, 255)), 300);
  enemyAbilitiesHave.push(newEnemyAbility);
  newEnemyAbility = new Ability("BulletStorm", "deal damage", enemy, player, "damage", "number", 10, enemyBulletStormMinigame, color(0), 80);
  enemyAbilitiesHave.push(newEnemyAbility);
  newEnemyAbility = new Ability("Static Bolt", "stun player if touch 3 times", enemy, player, "stun", "status", 3, enemyStaticBoltMinigame, color(255, 255, 0), 150);
  enemyAbilitiesHave.push(newEnemyAbility);
}
