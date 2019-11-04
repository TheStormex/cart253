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

// The three prey images
let antelopeImage;
let zebraImage;
let beeImage;

// The hunters
let hunterOneImage;
let hunterTwoImage;
let bulletImage;

// The fruits
let apple;
let appleImage;
let peach;
let peachImage;
let banana;
let bananaImage;

// The character objects arrays
let hunterList = [];
let fruitList = [];
let bulletList = [];
let preyList = [];

// Respawn tiemrs
let hunterTimer;
let fruitTimer;
let preyTimer;

// How often preys, hunters and fruit spawns
let hunterSpawnRate = 5000;
let fruitSpawnRate = 1000;
let preySpawnRate = 1500;

// Background iamges
let backgroundImage;
let backgroundGameImage;

// Music and sound effects
let audioSong;
let audioButton;
let audioShoot;
let audioPredatorEatPrey;
let audioPredatorHurt;

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
  backgroundGameImage = loadImage("assets/images/backgroundGame.bmp");
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
  // set up audio
  audioSong = loadSound('assets/sounds/song.wav');
  audioButton = loadSound('assets/sounds/button.wav');
  audioShoot = loadSound('assets/sounds/shoot.wav');
  audioPredatorEatPrey = loadSound('assets/sounds/eat.wav');
  audioPredatorHurt = loadSound('assets/sounds/hurt.wav');

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
      image(backgroundImage, width / 2, height / 2, width, height);
      fill(255, 0, 0);
      textSize(width / 10);
      text("The Fittest Predator", width / 2, height / 5);
      fill(100, 255, 100);
      rect(width / 2, height - height / 4, width / 5, height / 5);
      fill(0);
      text("Play", width / 2, height - height / 4);
      image(tigerImage, width / 10, height - height / 5, width / 6, height / 5);
      image(snowLeopardImage, width / 4 + width / 20, height - height / 5, width / 6, height / 5);
      image(hunterOneImage, width - width / 4, height - height / 5, width / 6, height / 4);
      image(hunterTwoImage, width - width / 10, height - height / 5, width / 6, height / 4);
      image(appleImage, width / 4, height / 3, width / 10, height / 10);
      image(bananaImage, width / 3, height / 2, width / 10, height / 10);
      image(peachImage, width - width / 5, height / 2 - height / 10, width / 10, height / 10);
      image(antelopeImage, width - width / 3, height / 2, width / 10, height / 10);
      image(zebraImage, width / 2, height / 2, width / 10, height / 10);
      image(beeImage, width / 2, height / 3, width / 20, height / 20);
      pop();
      break;
    case 1: // Instructions
      push();
      image(backgroundImage, width / 2, height / 2, width, height);
      fill(255, 0, 0);
      textSize(width / 10);
      text("Instructions", width / 2, height / 10);
      fill(255);
      rect(width / 2, height / 2, width - width / 4, height / 2);
      fill(0);
      textSize(width / 30);
      text("Welcome to the great hunting season! ", width / 2, height / 4 + height / 20);
      text("Who shall be the greatest predator of them all?", width / 2, height / 4 + (height / 20) * 2);
      text("The fearsome tiger or the deadly snow leopard?", width / 2, height / 4 + (height / 20) * 3);
      text("Hunt down the bee, antelope and zebra!", width / 2, height / 4 + (height / 20) * 4);
      text("Avoid the hunter's bullets!", width / 2, height / 4 + (height / 20) * 5);
      text("Eat the hunter before it eats your prey!", width / 2, height / 4 + (height / 20) * 6);
      text("The fruits can be eaten by all characters!", width / 2, height / 4 + (height / 20) * 7);
      text("The last predator standing wins! Will it be you?", width / 2, height / 4 + (height / 20) * 8);
      text("Good luck out there! Top the food chain!", width / 2, height / 4 + (height / 20) * 9);
      fill(100, 255, 100);
      rect(width / 2, height - height / 8, width / 3, height / 5);
      fill(0);
      textSize(width / 25);
      text("Start The Hunt!", width / 2, height - height / 8);
      pop();
      break;
    case 2: // Game
      // temporary background
      image(backgroundGameImage, width / 2, height / 2, width, height);

      // Spawn any more of any objects
      respawn();

      // Handle input for the tiger
      tiger.handleInput();
      snowLeopard.handleInput();

      // Move the predators
      tiger.move();
      snowLeopard.move();

      // Prey actions
      for (var i = 0; i < preyList.length; i++) {
        // // Give each prey its correct index
        preyList[i].index = preyList.indexOf(preyList[i]);

        //  preyList[i].move();
        for (var i2 = 0; i2 < fruitList.length; i2++) {
          preyList[i].eatFruit(fruitList[i2]);
        }
        tiger.handleEating(preyList[i]);
        snowLeopard.handleEating(preyList[i]);
        for (var i3 = 0; i3 < hunterList.length; i3++) {
          hunterList[i3].handleEating(preyList[i])
        }
        preyList[i].display();
      }

      // Hunter actions
      for (var i = 0; i < hunterList.length; i++) {
        // // Give each hunter its correct index
        hunterList[i].index = hunterList.indexOf(hunterList[i]);
        hunterList[i].move();
        tiger.handleEating(hunterList[i]);
        snowLeopard.handleEating(hunterList[i]);
        hunterList[i].display();
      }

      // Display the predators
      tiger.display();
      snowLeopard.display();

      //  See if fuits are being eaten by preadtors then Display fruits
      for (var i = 0; i < fruitList.length; i++) {
        // // Give each fruit its correct index
        fruitList[i].index = fruitList.indexOf(fruitList[i]);
        tiger.handleEating(fruitList[i]);
        snowLeopard.handleEating(fruitList[i]);
        fruitList[i].display();
      }

      //  Bullet actions
      for (var i = 0; i < bulletList.length; i++) {
        bulletList[i].move();
        bulletList[i].harm(tiger);
        bulletList[i].harm(snowLeopard);
        bulletList[i].display();
      }

      break;
    case 3: // Game Over
      audioSong.stop();
      push();
      image(backgroundImage, width / 2, height / 2, width, height);
      fill(255, 0, 0);
      textSize(width / 10);
      text("The Hunt is Over!", width / 2, height / 5);
      fill(255);
      rect(width / 2, height / 2, width / 6, height / 4);
      fill(100, 255, 100);
      rect(width / 2, height - height / 4, width / 4, height / 5);
      fill(0);
      textSize(width / 20);
      text("Play Again", width / 2, height - height / 4);

      // Put the image of the winninf predator based on who lost
      textSize(width / 15);
      if (tiger.preyEaten > snowLeopard.preyEaten) {
        image(tigerImage, width / 2, height / 2, width / 8, height / 8);
        text("The Tiger Wins!", width / 2, height / 3);
      } else if (tiger.preyEaten < snowLeopard.preyEaten) {
        image(snowLeopardImage, width / 2, height / 2, width / 8, height / 8);
        text("The Snow Leopard Wins!", width / 2, height / 3);
      } else if (tiger.preyEaten === snowLeopard.preyEaten) {
        text("No Contest", width / 2, height / 2 - height / 6);
      }
      pop();
      break;
    default:
      break;
  }
}

//spawnPrey
//
// Create a Prey
function spawnPrey() {
  let whichPrey;
  let preyImage;
  whichPrey = floor(random(0, 3));
  let preyInfo;
  switch (whichPrey) {
    case 0:
      preyInfo = {
        x: random(0, width),
        y: random(0, height),
        speed: 10,
        color: color(255, 100, 10),
        radius: random(40, 50),
        image: antelopeImage
      }
      break;
    case 1:
      preyInfo = {
        x: random(0, width),
        y: random(0, height),
        speed: 15,
        color: color(255, 255, 255),
        radius: random(50, 60),
        image: zebraImage
      }
      break;
    case 2:
      preyInfo = {
        x: random(0, width),
        y: random(0, height),
        speed: 5,
        color: color(255, 255, 0),
        radius: random(10, 20),
        image: beeImage
      }
      break;
    default:
  }
  let newPrey = new Prey(preyInfo.x, preyInfo.y, preyInfo.speed, preyInfo.color, preyInfo.radius, preyInfo.image, preyList.length);
  preyList.push(newPrey);
}

// spawnFruit()
//
// Create a fruit
function spawnFruit() {
  let whichFruit;
  let fruitImage;
  whichFruit = floor(random(0, 3));
  let fruitInfo;
  switch (whichFruit) {
    case 0:
      fruitInfo = {
        x: random(0, width),
        y: random(0, height),
        color: color(255, 100, 10),
        radius: random(20, 30),
        image: appleImage
      }
      break;
    case 1:
      fruitInfo = {
        x: random(0, width),
        y: random(0, height),
        color: color(255, 255, 255),
        radius: random(25, 35),
        image: peachImage
      }
      break;
    case 2:
      fruitInfo = {
        x: random(0, width),
        y: random(0, height),
        color: color(255, 255, 0),
        radius: random(40, 50),
        image: bananaImage
      }
      break;
    default:
  }
  let newFruit = new Fruit(fruitInfo.x, fruitInfo.y, fruitInfo.speed, fruitInfo.color, fruitInfo.radius, fruitInfo.image, fruitList.length);
  fruitList.push(newFruit);
}

// spawnHunter
//
// Create a hunter
function spawnHunter() {
  let whichHunter;
  let hunterImage;
  whichHunter = floor(random(0, 2));
  let hunterInfo;
  switch (whichHunter) {
    case 0:
      hunterInfo = {
        x: random(0, width),
        y: random(0, height),
        speed: 10,
        color: color(0, 255, 0),
        radius: random(30, 40),
        image: hunterOneImage
      }
      break;
    case 1:
      hunterInfo = {
        x: random(0, width),
        y: random(0, height),
        speed: 10,
        color: color(0, 255, 0),
        radius: random(50, 60),
        image: hunterTwoImage
      }
      break;
    default:
  }
  let newHunter = new Hunter(hunterInfo.x, hunterInfo.y, hunterInfo.speed, hunterInfo.color, hunterInfo.radius, hunterInfo.image, hunterList.length);
  hunterList.push(newHunter);
}

// reset()
//
// Reset all stats and start the game over
function reset() {
  tiger = new Predator(width / 2 - width / 3, height / 2, 5, color(255, 0, 0), 40, 87, 83, 65, 68, 32, tigerImage);
  snowLeopard = new Predator(width / 2 + width / 3, height / 2, 5, color(0, 0, 255), 40, 38, 40, 37, 39, 96, snowLeopardImage);
  // If there were a previous game, delete all preys, fruits, bullets and hunters
  preyList = [];
  hunterList = [];
  fruitList = [];
  bulletList = [];
  // Spawn 10 prey
  for (var i = 0; i < 10; i++) {
    spawnPrey();
  }
  // Spawn 6 fruits
  for (var i = 0; i < 6; i++) {
    spawnFruit();
  }
  // Spawn 4 Hunters
  for (var i = 0; i < 4; i++) {
    spawnHunter();
  }
}

// mousePressed()
//
// When mouse is pressed when over a button
function mousePressed() {
  switch (whichScreen) {
    case 0:
      if (mouseX > width / 2 - width / 10 && mouseX < width / 2 + width / 10 && mouseY > height - height / 4 - height / 10 && mouseY < height - height / 4 + height / 10) {
        audioButton.play();
        whichScreen = 1;
      }
      break;
    case 1:
      if (mouseX > width / 2 - width / 6 && mouseX < width / 2 + width / 6 && mouseY > height - height / 8 - height / 10 && mouseY < height - height / 8 + height / 10) {
        // Start the timers
        hunterTimer = millis();
        fruitTimer = millis();
        preyTimer = millis();
        audioButton.play();
        // Play song
        audioSong.loop();
        whichScreen = 2;
      }
      break;
    case 2:
      break;
    case 3:
      if (mouseX > width / 2 - width / 8 && mouseX < width / 2 + width / 8 && mouseY > height - height / 4 - height / 10 && mouseY < height - height / 4 + height / 10) {
        reset();
        hunterTimer = millis();
        fruitTimer = millis();
        preyTimer = millis();
        audioButton.play();
        // Play song
        audioSong.loop();
        fruitSpawnRate = 3000;
        hunterSpawnRate = 5000;
        preySpawnRate = 3000;
        whichScreen = 2;
      }
      break;
    default:
      break;
  }
}

// respawn()
//
// Create more preys, hunters and fruits as well as shoot bullets from hunters
// And increase or decrease timers slightly to make game more difficult as time goes on
function respawn() {
  fruitSpawnRate += 2;
  fruitSpawnRate = constrain(fruitSpawnRate, 1000, 3000);
  hunterSpawnRate -= 2;
  hunterSpawnRate = constrain(hunterSpawnRate, 2000, 5000);
  preySpawnRate += 2;
  preySpawnRate = constrain(preySpawnRate, 500, 1000);
  for (var i = 0; i < hunterList.length; i++) {
    if (millis() - hunterList[i].bulletTimer >= hunterList[i].bulletSpawnRate) {
      hunterList[i].shoot();
      hunterList[i].bulletTimer = millis();
    }
  }
  if (millis() - fruitTimer >= fruitSpawnRate) {
    spawnFruit();
    fruitTimer = millis();
  }
  if (millis() - hunterTimer >= hunterSpawnRate) {
    spawnHunter();
    hunterTimer = millis();
  }
  if (millis() - preyTimer >= preySpawnRate) {
    spawnPrey();
    preyTimer = millis();
  }
}
