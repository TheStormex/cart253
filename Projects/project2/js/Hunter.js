// Hunter
//
// A class that represents a simple hunter that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by predator objects as well as
// Shoot out bullet objects more nad more frequently as time goes on
// Spawns more the longer the game goes on

class Hunter {

  // constructor
  //
  // Sets the initial values for the hunter's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, image) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    // The hunter's image
    this.image = image;
  }

  // move
  //
  // Sets velocity based on the noise() function and the hunter's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the hunter has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // shoot
  //
  // Shoots a bullet which harms the predator
  shoot() {

  }

  // display
  //
  // Draw the hunter as an ellipse on the canvas
  // with a radius the same size as its current health.
  // Draw the image in the ellipse
  // Draw only if alive
  display() {
    if (this.health > 0) {
      push();
      noStroke();
      fill(this.fillColor);
      this.radius = this.health;
      ellipse(this.x, this.y, this.radius * 2);
      image(this.image, this.x, this.y, this.radius, this.radius);
      pop();
    }
  }
}
