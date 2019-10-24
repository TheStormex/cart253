"use strict";

// The Fittest Predator
// Che Tan
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let tiger; // control is WASD and Spacebar for sprint
let tigerImage;
let snowLeopard; // control is Arrow keys and numpad 0
let snowLeopardImage;

// The three prey
let antelope;
let antelopeImage;
let zebra;
let zebraImage;
let bee;
let beeImage;

// The hunters
let hunterOne;
let hunterOneImage;
let hunterTwo;
let hunterTwoImage;
let bullet;
let bulletImage;

// The fruits
let apple;
let appleImage;
let peach;
let peachImage;
let banana;
let bananaImage;

// Arrays
let hunterArray = [];
let fruitArray = [];
let bulletArray = [];
let preyArray = [];

// Background iamge
let backgroundImage;

// Which screen (title, instructions, game, game over)
let whichScreen = 0;

// preload()
//
// Load the images
function preload() {
tigerImage = loadImage("assets/images/tiger.jpg")
snowLeopardImage = loadImage("assets/images/snowLeopard.jpg")
antelopeImage = loadImage("assets/images/antelope.jpg")
zebraImage = loadImage("assets/images/zebra.png")
beeImage = loadImage("assets/images/bee.jpg")
appleImage = loadImage("assets/images/apple.jpg");
peachImage = loadImage("assets/images/peach.png");
bananaImage = loadImage("assets/images/banana.png");
hunterOneImage = loadImage("assets/images/hunter.png");
hunterTwoImage = loadImage("assets/images/hunter2.jpg");
bulletImage = loadImage("assets/images/bullet.jpg");
backgroundImage = loadImage("assets/images/background.bmp");
}

// setup()
//
// Sets up a canvas
// Creates objects for the 2 predators and three prey
// One
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER, CENTER);
  imageMode(CENTER, CENTER);
  textAlign(CENTER, CENTER);
  reset();

  // a fast small and a big slow hunter
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);
  switch (whichScreen) {
    case 0: // Title
        // Draw the game title
      push();
      image(backgroundImage, width/2 , height/2 , width, height);
      fill(255, 0, 0);
      textSize(width/10);
      text("The Fittest Predator", width/2, height/5);
      fill(100, 255, 100);
      rect(width/2, height-height/4, width/5, height/5);
      fill(0);
      text("Play", width/2, height-height/4);
      image(tigerImage, width/10, height-height/5, width/6, height/5);
      image(snowLeopardImage, width/4+width/20, height-height/5, width/6, height/5);
      image(hunterOneImage, width-width/4, height-height/5, width/6, height/4);
      image(hunterTwoImage, width-width/10, height-height/5, width/6, height/4);
      image(appleImage, width/4, height/3, width/10, height/10);
      image(bananaImage, width/3, height/2, width/10, height/10);
      image(peachImage, width-width/5, height/2-height/10, width/10, height/10);
      image(antelopeImage, width-width/3, height/2, width/10, height/10);
      image(zebraImage, width/2, height/2, width/10, height/10);
      image(beeImage, width/2, height/3, width/20, height/20);
      pop();
      break;
    case 1: // Instructions
      push();
      image(backgroundImage, width/2 , height/2 , width, height);
      fill(255, 0, 0);
      textSize(width/10);
      text("Instructions", width/2, height/10);
      fill(255);
      rect(width/2, height/2, width-width/4, height/2);
      fill(0);
      textSize(width/30);
      text("Welcome to the great hunting season! ", width/2, height/4+height/20);
      text("Who shall be the greatest predator of them all?", width/2, height/4+(height/20)*2);
      text("The fearsome tiger or the deadly snow leopard?", width/2, height/4+(height/20)*3);
      text("Hunt down the bee, antelope and zebra!", width/2, height/4+(height/20)*4);
      text("Avoid the hunter's bullets!", width/2, height/4+(height/20)*5);
      text("Eat the hunter before it eats your prey!", width/2, height/4+(height/20)*6);
      text("The fruits can be eaten by all characters!", width/2, height/4+(height/20)*7);
      text("The last predator standing wins! Will it be you?", width/2, height/4+(height/20)*8);
      text("Good luck out there! Top the food chain!", width/2, height/4+(height/20)*9);
      fill(100, 255, 100);
      rect(width/2, height-height/8, width/3, height/5);
      fill(0);
      textSize(width/25);
      text("Start The Hunt!", width/2, height-height/8);
      pop();
      break;
    case 2: // Game
      // Handle input for the tiger
      tiger.handleInput();
      snowLeopard.handleInput();

      // Move all the "animals"
      tiger.move();
      snowLeopard.move();
      antelope.move();
      zebra.move();
      bee.move();
      hunterOne.move();
      hunterTwo.move();

      // Handle the tiger eating any of the prey
      tiger.handleEating(antelope);
      tiger.handleEating(zebra);
      tiger.handleEating(bee);
      snowLeopard.handleEating(antelope);
      snowLeopard.handleEating(zebra);
      snowLeopard.handleEating(bee);

      // Display all the "animals"
      tiger.display();
      snowLeopard.display();
      antelope.display();
      zebra.display();
      bee.display();
      break;
    case 3: // Game Over
      push();
      image(backgroundImage, width/2 , height/2 , width, height);
      fill(255, 0, 0);
      textSize(width/10);
      text("The Hunt is Over!", width/2, height/5);
      fill(255);
      rect(width/2, height/2, width/6, height/4);
      fill(100, 255, 100);
      rect(width/2, height-height/4, width/4, height/5);
      fill(0);
      textSize(width/20);
      text("Play Again", width/2, height-height/4);

      // Put the image of the winninf predator based on who lost
      textSize(width/15);
      if (tiger.preyEaten > snowLeopard.preyEaten) {
        image(tigerImage, width/2, height/2, width/8, height/8);
        text("The Tiger Wins!", width/2, height/3);
      }
      else if (tiger.preyEaten < snowLeopard.preyEaten) {
        image(snowLeopardImage, width/2, height/2, width/8, height/8);
        text("The Snow Leopard Wins!", width/2, height/3);
      }
      else if (tiger.preyEaten === snowLeopard.preyEaten) {
        text("No Contest", width/2, height/2-height/6);
      }
      pop();
      break;
    default:
    break;

  }
}
// reset()
//
// Reset all stats and start the game over
function reset() {
  tiger = new Predator(width/2-width/3, height/2, 5, color(255, 0, 0), 40, 87, 83, 65, 68, 32, tigerImage);
  snowLeopard = new Predator(width/2+width/3, height/2, 5, color(0, 0, 255), 40, 38, 40, 37, 39, 96, snowLeopardImage);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50, antelopeImage);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60, zebraImage);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10, beeImage);
  apple = new Fruit(100, 100, 20, color(255, 255, 0), 10, appleImage);
  banana = new Fruit(100, 100, 20, color(255, 255, 0), 10, bananaImage);
  peach = new Fruit(100, 100, 20, color(255, 255, 0), 10, peachImage);
  hunterOne = new Hunter(100, 100, 20, color(255, 255, 0), 10, hunterOneImage);
  hunterTwo = new Hunter(100, 100, 20, color(255, 255, 0), 10, hunterTwoImage);
}

// mousePressed()
//
// When mouse is pressed
function mousePressed () {
  switch (whichScreen) {
    case 0:
      if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
        whichScreen = 1;
      }
      break;
    case 1:
      if (mouseX > width/2-width/6 && mouseX < width/2+width/6 && mouseY > height-height/8-height/10 && mouseY < height-height/8+height/10) {
        whichScreen = 2;
      }
      break;
    case 2:

      break;
    case 3:
    if (mouseX > width/2-width/8 && mouseX < width/2+width/8 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
      reset();
      whichScreen = 2;
    }
      break;
    default:
      break;
  }
}
