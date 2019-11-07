"use strict";

// Project 3 Prototype
// by Che Tan
//

// which screen it is 0 = title, 1 = instructions, 2 = game, 3 = minigame, 4 = game over (win or lose);
let whichScreen = 0;
// subScreen 0 = choosing an ability, 1 = using the ability
let subScreen = 0;
// If the elements that should appear on this screen have been created or not
let elementsHere = false;
// The player object
let player;
// The button object
let button;
// The randomised list of abilities
let abilitiesList = [];



// setup()
//
// Sets up a canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create our deck of cards for the abilities
  let abilityOneLeft = 5;
  let abilityTwoLeft = 5;
  let abilityThreeLeft = 5;
  let abilityFourLeft = 5;
  for (var i = 0; i < 20; i++) {
    let whichAbility = floor(random(0, 4);)
    switch (whichAbility) {
      case 0:
        let ability = new Ability();
        abilitiesList(push)
        break;
      case 1:

        break;
      case 2:

        break;
      case 3:

        break;
      default:
    }
  }
}

// draw()
//
// Handles input, movement and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);
  switch (whichScreen) {
    case 0: // Title
    if (!elementsHere) {
      button = new Button(width/2, height-height/4, width/5, "Play", "whichScreen = 1");
      elementsHere = true;
    }
      push();
      textSize(width/10);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Project 3", width/2, height/3);
      pop();
      button.display();
      break;
    case 1: // Instructions
    if (!elementsHere) {
      new Button(width/2, height-height/4, width/5, "Play", "whichScreen = 2");
      elementsHere = true;
    }
      break;
    case 2: // Game
      push()
      rectMode(CENTER);
      strokeWeight(20);
      rect(width/2, height-height/4, width, height/2);
      pop();
      if (!elementsHere) {
        player = new Player("Hero", 50, 2, color(100,100,100));
        elementsHere = true;
      }
        player.displayGame();

      switch (subScreen) {
        case 0:

          break;
        case 1:

          break;
        default:
      }

      break;
    case 3: // Mini game
      player.displayGame();
      break;
    case 4: // Game over

      break;
    default:
  }
}
