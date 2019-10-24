// Bullet
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Bullet {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, image) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Display properties
    this.fillColor = fillColor;
    this.radius = radius;
    // The bullets's image
    this.image = image;
  }

  // move
  //
  // Moves in a straight line until it hits a wall or a predator
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Exit if left screen
    this.exit();
  }

  // exit
  //
  // Checks if the bullet has gone off the canvas and
  // destroy it.
  exit() {
    // Off the left or right
    if (this.x < 0) {
      remove(this);
    }
    else if (this.x > width) {
      remove(this);
    }
    // Off the top or bottom
    if (this.y < 0) {
      remove(this);
    }
    else if (this.y > height) {
      remove(this);
    }
  }

  // harm
  //
  // Checks if touch a Predator, if so, hurt the predator
  harm(predator) {
    // Calculate distance from this predator to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease preadator health then disappear
      predator.health -= 15;
      }
    }

  // display
  //
  // Draw the bullet as an ellipse on the canvas
  // Draw the image in the ellipse
  display() {
      push();
      noStroke();
      fill(this.fillColor);
      ellipse(this.x, this.y, this.radius * 2);
      image(this.image, this.x, this.y, this.radius, this.radius);
      pop();
  }
}
