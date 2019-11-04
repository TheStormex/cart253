// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, upKey, downKey, leftKey, rightKey, sprintKey, image) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;
    // How many preys eaten
    this.preyEaten = 0;
    // The image of the predator
    this.image = image;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Set health lost per move back to 0.1 if we were sprinting before
    this.healthLossPerMove = 0.1;
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    // Add sprint bonus speed if sprinting and lose health faster
    if (keyIsDown(this.sprintKey)) {
      this.vx *= 2;
      this.vy *= 2;
      // If the predator is moving when sprinting
      if (this.vx != 0 || this.vy != 0) {
        this.healthLossPerMove = 0.2;
      }
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    // this.health = this.health - this.healthLossPerMove;
    // this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey / Fruit / Hunter object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the eatble dies, it gets reset.
  handleEating(eatable) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, eatable.x, eatable.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + eatable.radius) {
      if (eatable.health > 0) {
        // Increase predator health and constrain it to its possible range
        this.health += this.healthGainPerEat;
        this.health = constrain(this.health, 0, this.maxHealth);
        // Decrease eatable health by the same amount
        eatable.health -= this.healthGainPerEat;
        // Check if the prey died and reset it if so and add 1 prey eaten
        if (eatable.health <= 0) {
          if (eatable instanceof Prey) {
            this.preyEaten += 1;
            audioPredatorEatPrey.play();
          }
        }
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  // Draw the image in the ellipse
  // Draw the anount of prey eaten in the middle
  // Draw only if alive
  // if dead, go to game over screen
  display() {
    if (this.health > 0) {
      push();
      noStroke();
      fill(this.fillColor);
      this.radius = this.health;
      ellipse(this.x, this.y, this.radius * 2);
      image(this.image, this.x, this.y, this.radius, this.radius);
      pop();
      push();
      textAlign(CENTER, CENTER);
      textSize(50);
      fill(random(0, 255), random(0, 255), random(0, 255));
      text(this.preyEaten, this.x, this.y - height / 20);
      pop();
    } else {
      whichScreen = 3;
    }
  }
}
