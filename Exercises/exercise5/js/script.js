// Predator-Prey Simulation
// by Pippin Barr (remixed by Che Tan)
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let tiger; // control is WASD and Spacebar for sprint
let snowLeopard; // control is Arrow keys and numpad 0

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the 2 predators and three prey
// One
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(width/2-width/3, height/2, 5, color(255, 0, 0), 40, 87, 83, 65, 68, 32);
  snowLeopard = new Predator(width/2+width/3, height/2, 5, color(0, 0, 255), 40, 38, 40, 37, 39, 96);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
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
