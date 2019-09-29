"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerSize = 50;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
// Player health
let playerHealth;
let playerMaxHealth = 300;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preySize = 50;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 3;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
// Stats for noise
let tx;
let ty;
//  All game images
let playerAImage;
let playerBImage;
let preyAImage;
let preyBImage;
let projectileImage;
let garlicImage;
let holyWaterImage;

// Stats for projectiles
let ammo = 3;
let splashDiameter = width/5;
let shootRate = 1;

// preload()
//
// Sets up the images
function preload() {
  playerAImage = loadImage("assets/images/bat1.png")
  playerBImage = loadImage("assets/images/bat2.png")
  garlicImage = loadImage("assets/images/garlic.png")
  holyWaterImage = loadImage("assets/images/holyWater.png")
  preyAImage = loadImage("assets/images/person1.png")
  preyBImage = loadImage("assets/images/person2.png")
  projectileImage = loadImage("assets/images/blood.png")
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  // Set the noise stats for movement
  tx = random(0,1000);
  ty = random(0,1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  clear();
  background(245, 217, 155);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
    drawUI();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < height/8) {
    // Off the top, so add the height to reset to the bottom
    playerY = height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = height/8;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 1;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerSize + preySize) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      // Give it full health
      preyMaxHealth = 100*preyEaten/4+100;
      preyHealth = preyMaxHealth;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals using noise
  preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

  // Update prey position based on velocity, velocity increases more preys eaten
  preyX = preyX + preyVX*preyEaten/6+preyVX;
  preyY = preyY + preyVY*preyEaten/6+preyVY;

  // Change value for noise
  tx += 0.03;
  ty += 0.03;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < height/8) {
    preyY = height;
  }
  else if (preyY > height) {
    preyY = height/8;
  }
}

// drawPrey()
//
// Draw the prey with alpha based on health
function drawPrey() {
  image(preyAImage, preyX, preyY, preySize/3, preySize);
}

// drawPlayer()
//
// Draw the player with alpha value based on health
function drawPlayer() {
  image(playerAImage, playerX, playerY, playerSize, playerSize/3);
}

// drawUI()
//
// Draw the UI at the top of the page
function drawUI() {
  fill(255);
  rect(0,0,width-1,height/8);
  textSize(20);
  fill(0);
  text("Player Health: " + playerHealth + "/" + playerMaxHealth, width/50, height/20);
  text("Prey Health: " + preyHealth + "/" + preyMaxHealth, width/50, height/10);
  text("Ammo: " + ammo, width/2, height/20);
  text("Prey Eaten: " + preyEaten, width/2, height/10);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
