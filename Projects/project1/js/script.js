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
let playerMaxHealth = 500;
// Player fill color
let playerFill = 50;
// Check if the player is sprinting
let playerSprinting = false;
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
let garlicImage;
// Add sound effects
let audioEating;
let audioHurt;
let audioTeleport;
let audioCanTeleport;
let audioGameOver;
let audioEaten;

// Timer for refreshing teleport
let teleportCooldown = 0;
// If the player can currently teleport
let canTeleport = true;
// The time before teleport refreshes
let teleportCDTime = 2000;

// The rate at which the prey fires the projectile
let shootRate = 1;

// Variables for timing changing sprites
let playerSpriteChange = 0;
let preySpriteChange = 0;
let playerSpriteChangeSpeed = 500;

// Garlic location
let garlicX
let garlicY
let garlicVX;
let garlicVY;
let garlicSize = 20;


// preload()
//
// Sets up the images
function preload() {
  playerAImage = loadImage("assets/images/bat1.png")
  playerBImage = loadImage("assets/images/bat2.png")
  garlicImage = loadImage("assets/images/garlic.png")
  preyAImage = loadImage("assets/images/person1.png")
  preyBImage = loadImage("assets/images/person2.png")
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);
  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  setupGarlic();
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
  playerHealth = playerMaxHealth
  preyEaten = 0;
}

function setupGarlic() {
  garlicVX = 1;
  garlicVY = 1;
  garlicSize = 20;
  garlicX = int(random(0, width-garlicSize));
  garlicY = int(random(height/8, height-garlicSize));
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
  background(225, 255, 255);

  if (!gameOver) {
    handleInput();

    teleportTimer();
    movePlayer();
    movePrey();

    updateHealth();
    checkEating();
    checkHit();

    drawPrey();
    drawPlayer();
    drawGarlic();
    drawUI();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks WASD keys and adjusts player velocity accordingly
function handleInput() {
  // Check if the player is sprinting with the Spacebar
  if (keyIsDown(32)) {
    playerSprinting = true;
    playerMaxSpeed = 4;
    playerSpriteChangeSpeed = 250;
  }
  if (!keyIsDown(32)) {
    playerSprinting = false;
    playerMaxSpeed = 2;
    playerSpriteChangeSpeed = 500;
  }
  // Check for horizontal movement
  if (keyIsDown(65)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(68)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(87)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(83)) {
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
  // Reduce player health depending on if player is sprinting
  if (!playerSprinting) {
    playerHealth = playerHealth - 1;
  }
  if (playerSprinting) {
    playerHealth = playerHealth - 2;
  }
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
      // Increase the speed of the garlic
      if (garlicVX > 0) {
        garlicVX = int(random(preyEaten+1*0.5, preyEaten+1*1.5));
      }
      if (garlicVX < 0) {
        garlicVX = -(int(random(preyEaten+1*0.5, preyEaten+1*1.5)));
      }
      if (garlicVY > 0) {
        garlicVY = int(random(preyEaten+1*0.5, preyEaten+1*1.5));
      }
      if (garlicVY < 0) {
        garlicVY = -(int(random(preyEaten+1*0.5, preyEaten+1*1.5)));
      }
      // Give it full health
      preyMaxHealth = 100*preyEaten/4+100;
      preyHealth = preyMaxHealth;
    }
  }
}

// checkHit()
//
// Check if player is hitting obstacles like the Holy Water or Garlic
function checkHit() {
    // Check if the player is hit by the garlic
    let hitDistance = dist(playerX, playerY, garlicX, garlicY);
    // Check for overlap
    if (hitDistance < playerSize + garlicSize) {
      // Move garlic to prey location
      garlicX = random(0, width-garlicSize);
      garlicY = random(height/8, height-garlicSize);
      // Player loses health
      playerHealth -= 50
      // Constrain to the possible range
      playerHealth = constrain(playerHealth, 0, playerMaxHealth);
      // Check if the player is dead (0 health)
      if (playerHealth === 0) {
        // If so, the game is over
        gameOver = true;
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
  preyX = preyX + preyEaten/6+preyVX;
  preyY = preyY + preyEaten/6+preyVY;

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

// teleportTimer()
//
// If teleport is used up, refresh in 2 seconds at first, faster for each prey we eat
function teleportTimer() {
  teleportCDTime = 2000-preyEaten*100;
  if (!canTeleport) {
    if (millis() - teleportCooldown >= teleportCDTime) {
      canTeleport = true;;
      teleportCooldown = millis();
    }
  }
}

// drawPrey()
//
// Draw the prey which changes sprite every half second
function drawPrey() {
  if (millis() - preySpriteChange < 500) {
    image(preyAImage, preyX, preyY, preySize/3, preySize);
  }
  if (millis() - preySpriteChange >= 500) {
    image(preyBImage, preyX, preyY, preySize/3, preySize);
  }
  if (millis() - preySpriteChange >= 1000) {
    preySpriteChange = millis();
  }
}

// drawPlayer()
//
// Draw the player which changes sprite every half second, 2x faster if sprinting
function drawPlayer() {
  if (millis() - playerSpriteChange < playerSpriteChangeSpeed) {
    image(playerAImage, playerX, playerY, playerSize, playerSize/3);
  }
  if (millis() - playerSpriteChange >= playerSpriteChangeSpeed) {
    image(playerBImage, playerX, playerY, playerSize, playerSize/3);
  }
  if (millis() - playerSpriteChange >= playerSpriteChangeSpeed*2) {
    playerSpriteChange = millis();
  }
}

// drawGarlic()
//
// Draw the garlic obstacle which bounces on the walls
function drawGarlic(){
  if (garlicX + garlicSize + garlicVX > width || garlicX + garlicVX < 0) {
    garlicVX *= random(0.8,1.2);
    if (garlicVX > 0) {
      garlicVX = constrain(garlicVX, preyEaten+1, preyEaten+1.5);
    }
    if (garlicVX < 0) {
      garlicVX = constrain(garlicVX, -preyEaten-1.5, -preyEaten-1);
    }
    garlicVX *= -1;
  }
  if (garlicY + garlicSize + garlicVY > height || garlicY + garlicVY < height/8) {
    garlicVY *= random(0.8,1.2);
    if (garlicVY > 0) {
      garlicVY = constrain(garlicVY, preyEaten+1, preyEaten+1.5);
    }
    if (garlicVY < 0) {
      garlicVY = constrain(garlicVY, -preyEaten-1.5, -preyEaten-1);
    }
    garlicVY *= -1;
  }
  garlicX += garlicVX;
  garlicY += garlicVY;
  garlicSize = preyEaten/2+20;
  image(garlicImage, garlicX, garlicY, garlicSize, garlicSize);
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
  text("Teleport: " + canTeleport, width/2-width/20, height/20);
  text("Prey Eaten: " + preyEaten, width/2-width/20, height/10);
  text("Sprinting? " + playerSprinting, width-width/3.5, height/20);
}

// mousePressed()
//
// Teleport the player, click the replay button
function mousePressed() {
  if (!gameOver) {
    if (canTeleport) {
      canTeleport = false;
      playerX = mouseX;
      playerY = mouseY;
      teleportCooldown = millis();
    }
  }
  if (gameOver) {
    if (mouseX > width/2-width/8 && mouseX < width/2-width/8+width/3) {
      if (mouseY > height-height/4 && mouseY < height-height/4+height/10) {
        gameOver = false;
        resetGame();
      }
    }
  }
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
  // Display play again box
  fill(0,255,0);
  rect(width/2-width/6, height-height/4, width/3, height/10);
  fill(0);
  text("Play Again", width/2, height-height/5);
}

// resetGame()
//
// Reset the game after pressing the Play Again button
function resetGame() {
  clear();
  setupPrey();
  setupPlayer();
  setupGarlic();
  textAlign(LEFT, BASELINE);
}
