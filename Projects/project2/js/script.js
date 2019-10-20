// Predator-Prey Simulation
// by Pippin Barr (remixed by Che Tan)
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

// preload()
//
// Load the images
function preload() {
tigerImage = loadImage("assets/images/tiger.jpg")
snowLeopardImage = loadImage("assets/images/snowLeopard.jpg")
antelopeImage = loadImage("assets/images/antelope.jpg")
zebraImage = loadImage("assets/images/zebra.png")
beeImage = loadImage("assets/images/bee.jpg")
}

// setup()
//
// Sets up a canvas
// Creates objects for the 2 predators and three prey
// One
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER, CENTER);
  tiger = new Predator(width/2-width/3, height/2, 5, color(255, 0, 0), 40, 87, 83, 65, 68, 32, tigerImage);
  snowLeopard = new Predator(width/2+width/3, height/2, 5, color(0, 0, 255), 40, 38, 40, 37, 39, 96, snowLeopardImage);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50, antelopeImage);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60, zebraImage);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10, beeImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();
  snowLeopard.handleInput();

  // Move all the "animals"
  tiger.move();
  snowLeopard.move();
  antelope.move();
  zebra.move();
  bee.move();

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
}
