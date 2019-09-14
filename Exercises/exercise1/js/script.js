// Exercise 1 - Movement
// Che Tan
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// Position variables and size for the first image
let imageAX;
let imageAY;
let imageASize = 100;

// Position variables and size for the second image
let imageBX;
let imageBY;
let imageBSize = 50;

// First Image variable
let movingImageA;

// Second Image variable
let movingImageB

// Text variable
let mouseText = "YAY!";

// preload()
//
// Nothing here

function preload() {

// Load in the image which will move from left to right
movingImageA = loadImage("assets/images/clown.png");

// Load in the image which will move from bottom to top
movingImageB = loadImage("assets/images/icon.png");

}

// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // Set the image mode to CENTER so everything crosses in the middle
  imageMode(CENTER);

  // Start the first image at middle left side
  imageAX = 0;
  imageAY = height/2;

  // Start the second image at bottom middle side
  imageBX = width/2;
  imageBY = 640;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

  // Set the size of the text to 30
  textSize(30);
  // Set the text to the middle of the mouse
  textAlign(CENTER);
}

// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  // Move the first image to the right
  imageAX += 1;
  // Display the image
  image(movingImageA, imageAX, imageAY);

  // Move the second image to the top
  imageBY -= 1;
  // Display the image
  image(movingImageB, imageBX, imageBY);

  // Display the text at the mouse location with black color
  fill(0);
  text(mouseText, mouseX, mouseY);
}
