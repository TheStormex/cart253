"use strict";

// Project 3 Prototype
// by Che Tan
// A turn based RPG with cards and mini games

// which screen it is 0 = title, 1 = instructions, 2 = game, 3 = minigame, 4 = game over (win or lose);
let whichScreen = 4;

// Whose turn it is, player (1) or enemy (-1)
let whoseTurn = 1;

// Array of enemy bullets
let bullets = [];

// Array of targets the player must hit in the mini game
let targets = [];

// Array of obstacles the player must not hit in the mini game
let obstacles = [];

// Array of abilities the player currently has
let abilitiesHave = [];

// The player object
let player;
// The enemy object
let enemy;
// The button object
let button;
// The button's physical self
let theButton;

// setup()
//
// Sets up a canvas
function setup() {
  createCanvas(windowWidth, windowHeight);

  player = {
    name: "Hero",
    health: 50,
    maxHealth: 50
  }
  enemy = {
    name: "Monster",
    health: 50,
    maxHealth: 50
  }
  button = {
    x: width/2,
    y: height-height/4,
    size: width/5,
    text: "Play"
  }
  let abilityX = width/10;
  for (var i = 0; i < 5; i++) {
    let ability;
    let newAbility = new Ability(abilityX, "name");
    abilitiesHave.push(newAbility);
    abilityX += width/5;
  }
}

// draw()
//
// Handles input, movement and displaying for the system's objects
function draw() {
  // Clear the background to grey
  background(50);
  switch (whichScreen) {
    case 0: // Title
      // Play button
      push();
      rectMode(CENTER);
      noStroke();
      fill(0,0,255);
      rect(width/2, height-height/4, width/5, width/(15/2));
      fill(0);
      textSize(width/10);
      textAlign(CENTER,CENTER);
      text(button.text, button.x , button.y);
      pop();
      // Title text
      push();
      textSize(width/10);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Project 3", width/2, height/3);
      pop();
      break;
    case 1: // Instructions
      // Play button
      push();
      rectMode(CENTER);
      noStroke();
      fill(0,0,255);
      rect(button.x, button.y, button.size, button.size*2/3);
      fill(0);
      textSize(width/20);
      textAlign(CENTER,CENTER);
      text(button.text, button.x , button.y);
      pop();
      // Instruction text
      push();
      textSize(width/20);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Instructions", width/2, height/8);
      pop();
      break;
    case 2: // Game
      push()
      rectMode(CENTER);
      strokeWeight(20);
      rect(width/2, height-height/4, width, height/2);
      pop();
      //
      push();
      // the player avatar
      ellipseMode(CORNER);
      noStroke();
      fill(0,0,255);
      ellipse(width/50, height/2+height/30, width/30+height/30);
      // The player's name
      textAlign(CENTER,CENTER);
      fill(0);
      textSize(width/20);
      text(player.name,width/7.5,height/2+height/10);
      // the player's health bar
      rectMode(CORNER);
      strokeWeight(5);
      stroke(0);
      fill(255);
      rect(width/5, height/2+height/30, width-width/4, height/10);
      noStroke();
      fill(255,0,0);
      let lifeBarSizePlayer = map(player.health*100/player.maxHealth,0,100,0,width-width/4);
      rect(width/5, height/2+height/30, lifeBarSizePlayer, height/10);
      pop();
      // the enemy avatar
      push()
      ellipseMode(CENTER);
      noStroke();
      fill(255,255,0);
      ellipse(width/2, height/3, width/20+height/20);
      pop();
      // The enemy's name
      push();
      fill(255);
      textAlign(CENTER,CENTER);
      textSize(width/30);
      text(enemy.name,width/2,height/10);
      pop();
      // the enemy's health bar
      push();
      rectMode(CORNER);
      strokeWeight(5);
      stroke(0);
      fill(255);
      rect(width/2-width/16, height/6, width/8, height/20);
      noStroke();
      fill(255,0,0);
      let lifeBarSizeEnemy = map(enemy.health*100/enemy.maxHealth,0,100, 0,width/8);
      rect(width/2-width/16, height/6, lifeBarSizeEnemy, height/20);
      pop();
      // each of the five abilities the player can use
      for (var i = 0; i < abilitiesHave.length; i++) {
        abilitiesHave[i].display();
      }

      break;
    case 3: // Mini game
    // create a white canvas for minigame
      push();
      rectMode(CENTER);
      strokeWeight(5);
      stroke(0);
      fill(255);
      rect(width/2,height/2,width,height);
      pop();
      switch (whoseTurn) {
        case 1:
          // spawn targets and obstacles (random size and speed) at random at 2 per second, flow accross screen
          break;
        case -1:
          // spawn bullets (random size and speed) that fly accross the screen 3 per second
          break;
        default:

      }
      break;
    case 4: // Game over
      // see who won through switch, then present either happy or sad ending

      break;
    default:
  }
}

// mousePressed
//
// when the button is pressed
function mousePressed() {
  switch (whichScreen) {
    case 0:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        // move to screen 1
      }
      break;
    case 1:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        // move to screen 2
      }
      break;
    case 2:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        // use an ability
      }
      break;
    case 3:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        // move to screen 1
      }
      break;
    case 4:
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        // move to screen 1
      }
      break;
    default:

  }
}
