"use strict";

// Project 3 Prototype
// by Che Tan
// A turn based RPG with cards and mini games

// which screen it is 0 = title, 1 = instructions, 2 = game, 3 = minigame, 4 = game over (win or lose);
let whichScreen = 0;

// sub screens for the game
// game: 0 = choose ability, 1 =  action text, 2 = aftermath text
let subScreen = 0;

// Whose turn it is, player (1) or enemy (-1)
let whoseTurn = 1;

// Which ability is chosen by the turn character
let chosenAbility;

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

// textTimer and textTimerAmount: how long the text stays on the screen
let textTimer = 0;
let textTimerAmount = 3000; // 3 seconds

// minigameTimer and minigameTimerAmount: how long the minigames last before changing to results
let minigameTimer = 0;
let minigameTimerAmount = 5000; // 5 seconds

// spawnTimer and spawnTimerAmount: how long until another minigame object is spawned
let spawnTimer = 0;
let spawnTimerAmount = 250; // 1/4 of a second

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
      rect(width/2, height-height/4, width/5, height/5);
      fill(0);
      textSize(width/10);
      textAlign(CENTER,CENTER);
      text("Play", width/2, height-height/4);
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
      rect(width/2, height-height/4, width/5, height/5);
      fill(0);
      textSize(width/15);
      textAlign(CENTER,CENTER);
      text("Fight!", width/2, height-height/4);
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
      switch (subScreen) {
        case 0: // choose ability
        // each of the five abilities the player can use
        for (var i = 0; i < abilitiesHave.length; i++) {
          abilitiesHave[i].displayInventory();
        }
          break;
        case 1: // character used X on Y
        if (millis() - textTimer < textTimerAmount) {
          push();
          fill(0);
          textAlign(CENTER,CENTER);
          textSize(width/30+height/30);
          text("char" + " used " + "abilityName" + " on " + "target" + "!", width/2, height-height/4);
          pop();
        } else {
            minigameTimer = millis();
            whichScreen = 3;
        }
          break;
        case 2: // character received X
        if (millis() - textTimer < textTimerAmount) {
        push();
        fill(0);
        textAlign(CENTER,CENTER);
        textSize(width/40+height/40);
        text("target" + " received " + "number" + " effect " + " from " + "char" + "'s " + "abilityName" + "!", width/2, height-height/4);
        pop();
      } else {
        if (whoseTurn === 1) {
          textTimer = millis();
          whoseTurn = -1;
          subScreen = 1;
        }
        else if (whoseTurn === -1) {
          textTimer = millis();
          whoseTurn = 1;
          subScreen = 0;
        }
      }
          break;
        default:
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
          if (millis() - minigameTimer < minigameTimerAmount) {
              // spawn targets and obstacles (random size and speed) at random at 2 per second, flow accross screen
          } else { // go to effect of ability
            textTimer = millis();
            subScreen = 2;
            whichScreen = 2;
          }
          break;
        case -1:
        if (millis() - minigameTimer < minigameTimerAmount) {
              // spawn bullets (random size and speed) that fly accross the screen 3 per second
          } else { // go to effect of ability
            textTimer = millis();
            subScreen = 2;
            whichScreen = 2;
          }
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
      if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
        // move to screen 1
        whichScreen = 1;
      }
      break;
    case 1:
      if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
        // move to screen 2
        whichScreen = 2;
      }
      break;
    case 2:
      if (subScreen === 0) { // if we are choosing to click on an ability
        for (var i = 0; i < abilitiesHave.length; i++) {
          if (mouseX > abilitiesHave[i].x-abilitiesHave[i].sizeX/2 && mouseX < abilitiesHave[i].x+abilitiesHave[i].sizeX/2 && mouseY > abilitiesHave[i].y-abilitiesHave[i].sizeY/2 && mouseY < abilitiesHave[i].y+abilitiesHave[i].sizeY/2) {
            // choose this ability and go to text
            chosenAbility = abilitiesHave[i];
            console.log(chosenAbility);
            textTimer = millis();
            subScreen = 1;
          }
        }
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
